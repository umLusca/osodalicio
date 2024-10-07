<?php

use MercadoPago\Client\Common\RequestOptions;
use MercadoPago\Client\PreApproval\PreApprovalClient;
use MercadoPago\Exceptions\MPApiException;
use MercadoPago\MercadoPagoConfig;


MercadoPagoConfig::setAccessToken(ACCESS_TOKEN);


$ok = true;
$rawBody = file_get_contents("php://input");
$body = null;

if (empty($rawBody)) {
	$ok = false;
	$return["msg"] = "Nada recebido...";
	$return["status"] = 400;
}
if ($ok) {
	$body = json_decode($rawBody, true);
	if (empty($body)) {
		$ok = false;
		$return["msg"] = "Nada recebido...";
		$return["status"] = 400;
	}
}


if ($ok) {

	try {

		$headeruid = uuid();
		$paymentuid = uuid();
		$itemuid = uuid();

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


		$customerConstructor = new \MercadoPago\Client\Customer\CustomerClient();
		$searchByID = new \MercadoPago\Net\MPSearchRequest(1, 0, [
			"identification" => [
				"type"   => $body["payer"]["identification"]["type"],
				"number" => $body["payer"]["identification"]["number"],
			]]);
		$searchByEmail = new \MercadoPago\Net\MPSearchRequest(1, 0, ["email" => $body["payer"]["email"]]);

		$resultID = $customerConstructor->search($searchByID);
		$resultEmail = $customerConstructor->search($searchByEmail);



		if (!empty($resultID->results) || !empty($resultEmail->results)) {
			if ($resultID->results === $resultEmail->results) {
				$customer = $resultID->results[0];
			} else {
				$customer = $resultEmail->results[0];
				if (empty($resultEmail->results)){
					$customer =  $resultID->results[0];
					$customer->email = $body["payer"]["email"];
					$customer = $customerConstructor->create([
						"email"          => $body["payer"]["email"],
						"identification" => [
							"type"   => $body["payer"]["identification"]["type"],
							"number" => $body["payer"]["identification"]["number"],
						],
						"default_card"   => $body["token"],
					]);


				}


			}
		} else {
			$customer = $customerConstructor->create([
				"email"          => $body["payer"]["email"],
				"identification" => [
					"type"   => $body["payer"]["identification"]["type"],
					"number" => $body["payer"]["identification"]["number"],
				],
				"default_card"   => $body["token"],
			]);
		}


		$c = con();



		$a = $c->prepare("SELECT * FROM users WHERE userEmail = ? ;");
		$a->execute([$customer->email]);
		$userUid = uuid();

		if (!$a->rowCount()) {
			$b = $c->prepare("INSERT INTO users(userName, userEmail, userPassword, mp_id, isActive) VALUES ('', ?, '', ?, 0); ");
			$b->execute([$customer->email,$customer->id]);
		} else {
			$b = $c->prepare("UPDATE users SET mp_id = ? WHERE userEmail = ?;");
			$b->execute([$customer->id, $customer->email]);
		}


		$return["customer"] = $customer;
		/*
		$urlRegistration = "https://osodalicio.com.br/registrar/" . $userUid;
		if (sendEmail("Crie sua conta", emailHTML("Crie sua conta", "Para criar sua conta clique no botão abaixo.", "Criar Conta", $urlRegistration), [$customer->email])) {

		}
*/


		$request_options = new RequestOptions();
		$request_options->setCustomHeaders(["X-Idempotency-Key: $headeruid"]);
		$subscription = new PreApprovalClient();
		$subscription = $subscription->create([
			"preapproval_plan_id" => "2c9380849250c843019258f4d28402c2", //$subscriptionPlan->id,
			"external_reference"  => $paymentuid,
			"payer_email"         => $body["payer"]["email"],
			"card_token_id"       => $body["token"],
			"status"              => "authorized"
		], $request_options);


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

	} catch (Exception $e) {
	}

	$return["body"] = $body;
	$return["payment"] = $subscription;


}
