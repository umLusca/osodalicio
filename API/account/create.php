<?php


use MercadoPago\Client\Customer\CustomerClient;
use MercadoPago\Exceptions\MPApiException;
use MercadoPago\Net\MPSearchRequest;

$email = postreat("login", "l");
$telefone = postreat("telefone");
$password = postreat("password");
$cpassword = postreat("cpassword");
$name = postreat("name", "w");


$ok = true;


if (empty($email) || empty($password) || empty($telefone) || empty($cpassword) || empty($name)) {
	$return["msg"] = "Preencha todos os campos";
	$return["status"] = 400;
	$ok = false;
}


if ($ok && $cpassword !== $password) {
	$return["status"] = 400;
	$return["msg"] = "As senhas não são iguais";
	$ok = false;

}


if ($ok) {
	$c = con();
	$a = $c->prepare("SELECT * FROM users WHERE userEmail = :email;");
	$a->execute([":email" => $email]);
	if ($a->rowCount()) {
		$return["status"] = 403;
		$return["msg"] = "Esse usuário já existe";
		$ok = false;
	}
}

if ($ok) {

	if (strlen($password) < 8) {
		$ok = false;
		$return["status"] = 400;
		$return["msg"] = "Essa senha é muito curta.";
	} else
		if (preg_match("/^[a-zA-Z]*$/", $password)) {
			$ok = false;
			$return["status"] = 400;
			$return["msg"] = "Sua senha precisa ter letras.";
		} else
			if (preg_match("/^\d*$/", $password)) {
				$ok = false;
				$return["status"] = 400;
				$return["msg"] = "Sua senha precisa ter pelo menos um número.";
			}
}

if ($ok) try {


	/* GERAR CUSTOMER MERCADOPAGO*/
	$customerConstructor = new CustomerClient();
	$searchByEmail = new MPSearchRequest(1, 0, ["email" => $email]);
	$resultEmail = $customerConstructor->search($searchByEmail);
	if (empty($resultEmail->results)) {
		$customer = $customerConstructor->create([
			"email"          => $email,
		]);
	} else {
		$customer = $resultEmail->results[0];
	}

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

if ($ok) {

	$c = con();
	$a = $c->prepare("INSERT INTO users(userName,userPhone,mp_id, userEmail, userPassword) VALUES (?,?,?,?,?);");
	$ok = !!$a->execute([$name, $telefone, $customer->id, $email, password_hash($password, PASSWORD_DEFAULT)]);
}
if ($ok){
	session_start();
	$_SESSION["UserID"] = $c->lastInsertId();

	$user = $c->query("SELECT * FROM users WHERE id = {$_SESSION["UserID"]}")->fetch(2);
	login($user);

	$_SESSION["UserName"] = $name;
	$_SESSION["UserEmail"] = $email;
	$_SESSION["UserMPID"] = null;
	$return["status"] = 200;
	$return["msg"] = "Cadastro realizado com sucesso.";


}

