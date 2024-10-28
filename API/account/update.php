<?php


$password = postreat("password");
$cpassword = postreat("cpassword");
$telefone = postreat("telefone");

$resetToken = postreat("account");

$cep = postreat("endCep");
$bairro = postreat("endBairro");
$cidade = postreat("endCidade");
$estado = postreat("endEstado");
$endereco = postreat("endRua");
$numero = postreat("endNumero");
$complemento = postreat("endComplemento");

$ok = true;

if (empty($telefone)) {
	$return["msg"] = "Preencha todos os campos";
	$return["status"] = 400;
	$ok = false;
}


session_start();
if (empty($_SESSION["UserID"])) {
	$return["msg"] = "Sua sessão expirou, tente novamente.";
	$return["refresh"] = true;
	$return["status"] = 401;
	$ok = false;
}


if ($ok) {

	$c = con();
	$a = $c->prepare("SELECT * FROM users WHERE id = :id");
	$a->execute([":id" => $_SESSION["UserID"]]);
	if (!$a->rowCount()) {
		$return["status"] = 403;
		$return["msg"] = "Esse usuário não existe";
		$ok = false;
	}
}

if ($ok) {
	$user = $a->fetch(2);
	$c->beginTransaction();

	//Update Password + Require Reset Token
	if (empty($resetToken) && empty($password)) {
		$ok = false;
		$return["msg"] = "Para trocar a senha, solicite um email de recuperação.";
		$return["status"] = 403;
	} else {
		$t = $c->prepare("SELECT * from extenalTokens WHERE uid = ?");
		$t->execute([$resetToken]);
		if ($t->rowCount()) {
			$reset = $t->fetch(2);
			if (strtotime($reset["expire_in"]) < strtotime("now")) {
				$ok = false;
				$return["msg"] = "Esse formulário expirou";
				$return["status"] = 401;
			}

			if ($reset["isUsed"]) {
				$ok = false;
				$return["msg"] = "Esse formulário não é mais válido.";
				$return["status"] = 401;
			}

		}
	}
}

if ($ok) {
	//Update Telefone
	$o = $c->prepare("UPDATE users SET userPhone = :telefone WHERE id = :id ;");
	$o->execute([":telefone" => $telefone, ":id" => $_SESSION["UserID"]]);

	//Update Endereço
	if (!empty($cep)) {
		$k = $c->prepare("UPDATE users SET userPostalCode = ?, userState = ?, userCity =?, userDistrict =? , userAddress =?, userNumber =?, userComplement =?   WHERE id = ?;");
		$k->execute([$cep, $estado, $cidade, $bairro, $endereco, $numero, $complemento, $_SESSION["UserID"]]);
	}

	//Update Senha
	if ($reset) {
		if ($password !== $cpassword) {
			$return["status"] = 400;
			$return["msg"] = "Senhas diferentes";
			$ok = false;
		}
		if (strlen($password) < 8) {
			$return["status"] = 400;
			$return["msg"] = "Senhas deve conter no minimo 8 caracteres";

			$ok = false;
		}

		$u = $c->prepare("Update users SET userPassword = :password , isActive= 1 WHERE id = :id;");
		$u->execute([":password" => password_hash($password, PASSWORD_DEFAULT), ":id" => $_SESSION["UserID"]]);
	}

}

if ($ok) {
	$user = $c->query("SELECT * FROM users WHERE id = {$_SESSION['UserID']};")->fetch(2);

	login($user);
	$return["refresh"] = true;
	$return["status"] = 200;
	$return["msg"] = "Atualizado com sucesso";

	$c->commit();
}