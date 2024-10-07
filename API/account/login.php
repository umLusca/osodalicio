<?php
$login = postreat("login");
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

	$_SESSION["UserID"] = $user["id"];
	$_SESSION["UserName"] = $user["userName"];
	$_SESSION["UserEmail"] = $user["userEmail"];

}