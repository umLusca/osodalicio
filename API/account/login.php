<?php

use MercadoPago\Client\Customer\CustomerClient;
use MercadoPago\Exceptions\MPApiException;
use MercadoPago\Net\MPSearchRequest;

$login = postreat("email");
$password = postreat("password");
$ok = true;
if (empty($login) || empty($password)) {
	$return["msg"] = "Preencha todos os campos";
	$return["status"] = 400;
	$ok = false;
}
if ($ok) {
	$c = con();
	$a = $c->prepare("SELECT * FROM users WHERE userEmail = :login and isActive = 1;");
	$a->execute([":login" => $login]);
	if (!$a->rowCount()) {
		$return["status"] = 403;
		$return["msg"] = "Esse usuário não existe";
		$ok = false;
	}
}
if ($ok) {
	$user = $a->fetch(2);
	if (!password_verify($password, $user["userPassword"])) {
		$return["msg"] = "Senha incorreta.";
		$return["status"] = 401;
		$ok = false;
	}
}

if ($ok) {

	$return["status"] = 200;
	$return["msg"] = "Entrou com sucesso";

	session_start();
	if (empty($user["mp_id"]))
		try {
			$customerClient = new CustomerClient();
			$search = new MPSearchRequest(1, 0, ["email" => $user["userEmail"]]);

			$result = $customerClient->search($search);

			if (empty($result->results)) {

				$usernames = explode(" ", $user["userName"]);
				$customer = $customerClient->create([
					"email"      => $user["userEmail"],
					"first_name" => array_shift($usernames),
					"last_name"  => array_pop($usernames),
					"phone"      => $user["userPhone"],
				]);
			} else {

				$customer = $result->results[0];
			}

			$d = $c->prepare("UPDATE users SET mp_id = ? WHERE id = ?");
			$d->execute([$customer->id, $user["id"]]);
			$user["mp_id"] = $customer->id;

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

			$return["status"] = $e->getApiResponse()->getStatusCode();
			$return["msg"] = "MercadoPago: " . $return["error"]["ApiContent"]["message"];
		} catch (Exception|Throwable $e) {
			$return["error"] = [
				"code"    => $e->getCode(),
				"message" => $e->getMessage(),
				"line"    => $e->getLine(),
				"trace"   => $e->getTraceAsString(),
				"file"    => $e->getFile(),


			];

		}
	login($user);
}