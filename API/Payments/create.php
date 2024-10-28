<?php

use MercadoPago\Client\Common\RequestOptions;
use MercadoPago\Client\Customer\CustomerClient;
use MercadoPago\Client\PreApproval\PreApprovalClient;
use MercadoPago\Exceptions\MPApiException;
use MercadoPago\MercadoPagoConfig;
use MercadoPago\Net\MPSearchRequest;


MercadoPagoConfig::setAccessToken(ACCESS_TOKEN);


$ok = true;

$ct = postreat("token");
$issuer_id = postreat("issuer_id");
$installments = postreat("installments");
$payer = $_POST["payer"];
$plano = postreat("plano");

if (empty($_POST)) {
	$ok = false;
	$return["msg"] = "Nada recebido...";
	$return["status"] = 400;
}
if ($ok) {
	if (empty($issuer_id) || empty($payer)) {
		$ok = false;
		$return["msg"] = "Não foi possível identificar a compra...";
		$return["status"] = 400;
	}
}

session_start();
if (!empty($_SESSION["UserID"])) {

	$userEmail = $_SESSION["UserEmail"];

	if (mb_strtolower($payer["email"]) !== mb_strtolower($_SESSION["UserEmail"])) {
		$ok = false;
		$return["msg"] = "Email de pagamento diferente do email da conta.";
		$return["status"] = 400;
	}
	if ($ok) {

		$c = con();

		$a = $c->prepare("SELECT * FROM users WHERE userEmail = ?;");
		$a->execute([$_SESSION["UserID"]]);
		if ($a->rowCount()) {
			$user = $a->fetch(2);

			if (!empty($user["mp_id"])) {
				$_SESSION["UserMPFID"] = $user["mp_id"];
				$_SESSION["UserMPID"] = explode("-", $user["mp_id"]);
			}

		} else {
			$ok = false;
			$return["status"] = 403;
			$return["msg"] = "Não foi possível encontrar sua conta...";
		}
	}
} else {
	$userEmail = vartreat($payer["email"],"l");
	if ($ok) {

		$c = con();

		$a = $c->prepare("SELECT * FROM users WHERE userEmail = ?;");
		$a->execute([$userEmail]);
		if ($a->rowCount()) {
			$user = $a->fetch(2);
			$_SESSION["UserID"] = $user["id"];
			if ($user["isActive"] && empty($_SESSION["UserEmail"])) {
				$ok = false;
				$return["status"] = 401;
				$return["msg"] = "Essa conta de email, já tem conta, entre e tente novamente.";
			}

		} else {
			$b = $c->prepare("INSERT INTO users(uid,userName, userEmail, userPassword, isActive) VALUES (?,'', ?, '', 0); ");
			if ($b->execute([$_SESSION["UserToken"], $userEmail ])) {
				$_SESSION["UserID"] = $c->lastInsertId();
				$return["account"] = uuid();

				$d = $c->prepare("INSERT INTO extenalTokens(userID, uid, expire_in) values (?,?, DATE_ADD(NOW(), INTERVAL 7 DAY))");
				$d->execute([$_SESSION["UserID"], $return["account"]]);

				sendMail($userEmail,"Finalizar Cadastro", "Se você não finalizou seu cadastro, finalize aki https://osodalicio.com.br/conta/finalizar/".$return["account"]);
			} else {
				$ok = false;
				$return["status"] = 401;
				$return["msg"] = "Falha ao criar conta...";
				session_abort();
			}
		}
		if ($ok) {
			$aa = $c->prepare("SELECT * FROM users WHERE id = ?;");
			$aa->execute([$_SESSION["UserID"]]);
			if ($aa->rowCount()) {
				$user = $aa->fetch(2);
				$_SESSION["UserID"] = $user["id"];
				$_SESSION["UserToken"] = $user["uid"];


			} else {
				$return["status"] = 500;
				$return["msg"] = "Falha ao criar conta...";
			}
		}
	}
}
if ($ok) try {
	$headerST = uuid();
	$paymentUID = uuid();


	/*


	$subscriptionPlan = new PreApprovalPlanClient();

	$subscriptionPlan = $subscriptionPlan->create([
		"reason"         => "Sodalicio Digital Anual",                          //OK
		"back_url"       => "https://osodalicio.com.br/api/mercadopago/planos", //Averiguar
		"auto_recurring" => [
			"frequency"                => 2,
			"frequency_type"           => "months",
			"repetitions"              => null,
			"billing_day"              => 10,
			"billing_day_proportional" => false,
			"transaction_amount"       => 1.00,
			"currency_id"              => "BRL", //Reais
			//"free_trial"               => ["frequency"      => null, "frequency_type" => null,],
		],

	]);

	//*/

	/* GERAR CUSTOMER MERCADOPAGO*/
	$customerConstructor = new CustomerClient();
	$searchByEmail = new MPSearchRequest(1, 0, ["email" => $userEmail]);
	$resultEmail = $customerConstructor->search($searchByEmail);
	if (empty($resultEmail->results)) {
		$customer = $customerConstructor->create([
			"email"          => $userEmail,
			"identification" => [
				"type"   => $payer["identification"]["type"],
				"number" => $payer["identification"]["number"],
			],
			"default_card"   => $ct,
		]);
	} else {
		$customer = $resultEmail->results[0];

		$customer =  $customerConstructor->update($customer->id, [
			"default_card" => $ct,
		]);
		if ((int) $resultEmail->results[0]->identification->number !== $payer["identification"]["number"]) {
			$customer = $customerConstructor->update($resultEmail->results[0]->id, [
				"identification" => [
					"type"   => $payer["identification"]["type"],
					"number" => $payer["identification"]["number"],
				]
			]);
		}
	}

	$_SESSION["UserMPID"] = explode("-", $customer->id)[0];



	$subSearch = new MPSearchRequest(null, null, [
		"payer_id" => $_SESSION["UserMPID"],
		"status"   => "authorized",
	]);


	//todo fazer pagamento da primeira parcela

	$subscriptionConstructor = new PreApprovalClient();

	$subsResults = $subscriptionConstructor->search($subSearch);

	if (!empty($subsResults->results)) {
		$subscription = $subsResults->results[0];
	} else {
		$request_options = new RequestOptions();
		$request_options->setCustomHeaders(["X-Idempotency-Key: $headerST"]);
		$subscription = $subscriptionConstructor->create([
			"preapproval_plan_id" => "2c9380849295664c0192afb3bc8d0773", //$subscriptionPlan->id,
			"external_reference"  => $paymentUID,
			"payer_email"         => $userEmail,
			"card_token_id"       => $ct,
			"status"              => "authorized",
			"back_url"            => "https://osodalicio.com.br",
		], $request_options);

	}

	$return["status"] = 200;
	$return["msg"] = "Tudo certo, agora só aproveitar o conteúdo";

	// Step 7: Handle exceptions
} catch (MPApiException $e) {


	$return["error"] = [
		"code"    => $e->getCode(),
		"message" => $e->getMessage(),
		"line"    => $e->getLine(),
		"trace"   => $e->getTraceAsString(),
		"file"    => $e->getFile(),

		"Apicode"    => $e->getApiResponse()->getStatusCode(),
		"ApiContent" => $e->getApiResponse()->getContent(),
	];

	$ok = false;
	$return["status"] = 500;
	$return["msg"] = "MercadoPago: " . $return["error"]["ApiContent"]["message"];
} catch (Exception|Throwable $e) {
	$return["error"] = [
		"code"    => $e->getCode(),
		"message" => $e->getMessage(),
		"line"    => $e->getLine(),
		"trace"   => $e->getTraceAsString(),
		"file"    => $e->getFile(),


	];

	$ok = false;
	$return["status"] = 500;
	$return["msg"] = "Houve um erro em nosso servidor.. Estamos analisando";


}
if (!$ok) {
	session_abort();

}