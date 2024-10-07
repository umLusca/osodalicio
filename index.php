<?php

use MercadoPago\MercadoPagoConfig;

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ERROR);
define("ROOT", dirname(__FILE__));
require_once ROOT . "/_CONFIG/config.php";
require_once ROOT . "/vendor/autoload.php";
require_once ROOT . "/_CONFIG/functions/autoload.php";
try {
	MercadoPagoConfig::setRuntimeEnviroment(MercadoPagoConfig::LOCAL);
} catch (\MercadoPago\Exceptions\InvalidArgumentException $e) {
}


$URLPath = $_SERVER['REDIRECT_SCRIPT_URL'] ?: $_SERVER['REDIRECT_URL'];
$folders = array_values(array_filter(explode("/", $URLPath)));


$startSession = true;
switch (mb_strtolower($folders ? $folders[0] : "")) {
	default:
		notFound:
		$title = 'Não Encontrado';
		//ERROR NOT FOUND.
		$file = "/public/error/404.php";
		break;
	case "":
	case "inicio":
		$title = 'Inicio';
		$file = "/public/home/index.php";
		break;
	case "error":
		switch (mb_strtolower($folders[1])) {
			default:
				$file = "/public/error/404.php";
				break;
		}
		break;
	case "api":
		//Except for api, requires manual session start for optimization purposes.
		$startSession = false;
		$title = 'API v1';
		$file = "/API/index.php";
		break;
	case 'assets':

		ini_set('display_errors', 0);
		ini_set('display_startup_errors', 0);
		ini_set('error_reporting', 0);

		$path = ROOT . DIRECTORY_SEPARATOR . "public" . $URLPath;
		if (file_exists($path)) {
			http_response_code(200);
			$mime = mime_content($path);
			header('Content-Type: ' . $mime);

			if (str_starts_with($mime, 'image')) {
				header('Content-Disposition: inline; filename="' . basename($path) . '"');
			}
			readfile($path);
			exit(200);
		}

		exit(404);
		break;
	case "sair":
		session_start();
		session_destroy();
		header("Location: /");
		break;
}

try {

	$startSession && session_start();

	//require file
	$filepath = ROOT . $file;
	if (file_exists($filepath)) {


		require $filepath;
	} else  {
		require ROOT . '/public/error/404.php';
	}
	exit;

} catch (Exception $e) {


	include ROOT . '/public/error/500.php';
	exit;

}
