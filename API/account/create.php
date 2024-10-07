<?php


$email = postreat("login", "l");
$password = postreat("password");
$cpassword = postreat("cpassword");
$name = postreat("name", "w");


$ok = true;


if (empty($email) || empty($password) || empty($cpassword) || empty($name)) {
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


if ($ok) {
	$c = con();
	$a = $c->prepare("INSERT INTO users(userName, userEmail, userPassword) VALUES (?,?,?);");
	$a->execute([$name, $email, password_hash($password, PASSWORD_DEFAULT)]);

	$userId = $c->lastInsertId();


	session_start();

	$_SESSION["UserID"] = $userId;
	$_SESSION["UserName"] = $name;
	$_SESSION["UserEmail"] = $email;
	$return["status"] = 200;
	$return["msg"] = "Cadastro realizado com sucesso.";


}

