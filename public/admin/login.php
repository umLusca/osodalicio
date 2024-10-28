<?php


if (isset($_SESSION["UserAdmin"]) && $_SESSION["UserAdmin"] === true)header("Location: /admin/pesquisar/");

if (!empty($_POST["login"]) && !empty($_POST["senha"])){
    if (
        $_POST["login"] === "admin" &&
        $_POST["senha"] === "brasil@@@album"
    ) {
        $_SESSION["UserAdmin"] = true;
        header("Location: ./admin/pesquisar");
    }
    $error = true;
}

?>



<!doctype html>
<html lang="pt-BR" data-bs-theme="dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Acessar Painel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
</head>

<body>
<div class="container p-5" style="max-width: 600px;">
    <div class="text-center mb-4">
        <img class="" src="/assets/img/logo_brasilimage.svg" style="width: 120px;" />
    </div>
    <form class="card mx-auto" style="max-width: 300px" method="post">
        <div class="card-header">
            <h4>Credenciais</h4>
        </div>
        <div class="card-body">
            <?=$error?'<div class="m-3 alert alert-danger">Credenciais Inválidas</div>':""?>
            <div class="m-3">
                <div class="m-2">
                    <label class="form-floating w-100">
                        <input type="text" class="form-control" placeholder="Login" name="login"/>
                        <label>Login</label>
                    </label>
                </div>
                <div class="m-2">
                    <label class="form-floating w-100">
                        <input type="password" class="form-control" placeholder="Senha" name="senha"/>
                        <label>Senha</label>
                    </label>
                </div>
            </div>
        </div>
        <div class="card-footer d-grid">
            <button class="btn btn-lg btn-primary fw-bold" type="submit">Entrar</button>
        </div>
    </form>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
</body>
</html>
