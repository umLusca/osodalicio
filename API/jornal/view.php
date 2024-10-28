<?php

$uid = $folders[2];


ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
ini_set('error_reporting', 0);
$ok = true;

if (empty($uid)) {
	$ok = false;
	$return["status"] = 404;
	$return["msg"] = "Não encontrado";
}

if ($ok) {

	$c = con();
	$a = $c->prepare("SELECT * FROM news WHERE uid = ?");
	$a->execute([$uid]);
	if (!$a->rowCount()) {
		$ok = false;
		$return["status"] = 404;
		$return["msg"] = "Folha não encontrada.";
	}
}
if ($ok) {

	$dados = $a->fetch(2);

	$path = ROOT.$dados["local"];
	if (is_file($path)) {

		http_response_code(200);
		$mime = mime_content($path);

		header('Content-Type: ' . $mime);
		if (str_starts_with($mime, 'image')) {
			header('Content-Disposition: inline; filename="' . basename($path) . '"');
		}
		readfile($path);
		exit(200);
	}

}
