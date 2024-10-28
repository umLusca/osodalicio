<?php

$ok = true;

$target_dir = "/storage/newspaper/";

$titulo = postreat("titulo");
session_start();

if ($_SESSION["UserAdmin"] !== true) {
	$ok = false;
	$return["status"] = 401;
	$return["msg"] = "Sem permissão para acessar";
}

if ($ok && !empty($titulo)) {
	$ok = false;
	$return["status"] = 400;
	$return["msg"] = "Escreva um título.";
}
if ($ok && !isset($_FILES["file"])) {
	$ok = false;
	$return["status"] = 400;
	$return["msg"] = "Não foi possível encontar upload";
}

if ($ok) {

	$FILE = $_FILES["file"];

	$uidFile = uuid();
	$fileHash = hash_file("XXH128", $_FILES["file"]["tmp_name"]);

	$array = explode(".", $FILE["name"]);
	$file = $target_dir . $uidFile . "-" . $fileHash."." . array_pop($array);

	$fileType = strtolower(pathinfo($_FILES["file"]["tmp_name"], PATHINFO_EXTENSION));

	if ($fileType !== "pdf") {
		$return["status"] = 400;
		$return["msg"] = "Arquivo não suportado (somente pdf)";
	}
}
if ($ok) {
	move_uploaded_file($FILE["tmp_name"], $file);

	if (move_uploaded_file($FILE["tmp_name"], ROOT.$file)) {

		$return["msg"] = "Arquivo foi salvo e pode ser visualizado";
		$return["status"] = 200;

		$con = con();
		$c = $con->prepare("INSERT INTO news(uid, hash, titulo,  local, nomeOriginal ) VALUES (?,?,?,?,?);");

		$c->execute([$uidFile, $fileHash, $titulo, $file, $FILE["name"]]);


	} else {
		$return["msg"] = "Não foi possível salvar";
		$return["status"] = 500;
		$ok = false;
	}

}