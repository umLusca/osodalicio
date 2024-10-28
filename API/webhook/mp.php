<?php


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

if ($ok){
	if (!$body["live_mode"]){
		$ok = false;
		$return["msg"] = "Must have to be live mode.";
		$return["status"] = 200;
	}


}
if ($ok) {
	switch ($body["type"]) {
		default:
			$ok = false;
			$return["msg"] = "Requisição não encontrada...";
			$return["status"] = 401;
			break;
		case "payment":
		case "subscription_preapproval":
			$ok = true;
			$pid = $body["id"];
			$did = $body["data"]["id"];
			$userId = $body["userId"];
			$return["status"] = 200;
			$return["msg"]= "OK.";

			break;
	}

}
