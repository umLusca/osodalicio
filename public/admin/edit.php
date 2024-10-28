<?php

//Save uploaded pdf
require "./../../config/con.php";
if ($_SESSION["admin"] !== true){
    header('Location: /album/admin/');
}
include ROOT.'/_components/header.php';

if (!empty($_GET["t"])) {

    $con = con();
    $token = mysqli_real_escape_string($con, $_GET["t"]);

} else {
    header("Location: ./../pesquisar");
    exit;
}

if (isset($_FILES["file"])) {

    $nome = basename($_POST['nome']);

    $return = [
        "status" => false,
        "msg" => "Erro não especificado",
    ];



    $u1 = $con->prepare("UPDATE albuns SET titulo = ? WHERE token = ?");
    if ($u1->execute([$nome, $token])){
        $return["status"] = true;
        $return["msg"] = 'Atualizado com sucesso!';
    }


    if (!empty($_FILES["file"]) && $_FILES["file"]["error"] !==4) {
        $FILE = $_FILES["file"];
        $target_dir = ROOT . "/pdfs/";
        $target_file = $target_dir . uniqid("pdf", true) . ".pdf";
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
        if ($imageFileType !== "pdf") {
            $return["msg"] = "Esse arquivo não é pdf.";
        } else {
            if (move_uploaded_file($FILE["tmp_name"], $target_file)) {
                $c = $con->prepare("update albuns SET local = ?, nomeOriginal = ? WHERE token = ?");
                $c->execute( [ $target_file,$FILE["name"],$token]);

                $return["msg"] = "Arquivo foi salvo e pode ser visualizado";
                $return["status"] = true;
            } else {
                $return["msg"] = "Não foi possível salvar";
            }
        }
        $u1 = $con->prepare("UPDATE albuns SET titulo = ? WHERE token = ?");
        $u1->execute([$nome, $token]);

    }



}


$q = $con->prepare("SELECT * FROM albuns WHERE token  = ?;");
$q->execute([$token]);
$q = $q->get_result();
if ($q->num_rows) {
    $dados = $q->fetch_assoc();

} else {

    header("Location: ./../pesquisar");
    exit;
}
?>
<!doctype html>
<html lang="pt-BR" data-bs-theme="dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Editar Álbum <?= $dados["titulo"] ?></title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" integrity="sha512-b2QcS5SsA8tZodcDtGRELiGv5SaKSk1vDHDaQRda0htPYWZ6046lr3kJ5bAAQdpV2mmA/4v0wQF9MyU6/pDIAg==" crossorigin="anonymous" referrerpolicy="no-referrer"/>
    <link rel="stylesheet" href="../../assets/css/main.css" referrerpolicy="no-referrer"/>
</head>
<body>

<?=echoheader("Cadastrar Álbum")?>
<div class="container">
    <div class="card card-body m-5 text-center">
        <h3>Editar Álbum</h3>
        <div class="d-flex justify-content-center">
            <form method="post" class="col-md-4" enctype="multipart/form-data">
               <?php if ($return){?>
                   <div class="alert alert-<?=$return['status']?"success":"danger"?>">
                    <?=$return["msg"]?>
                </div>
                <?php }?>
                <div class="m-4">
                    <label class="w-100 form-floating">
                        <input type="text" placeholder="" maxlength="200" name="nome" class="form-control" value="<?= $dados["titulo"] ?>" required>
                        <label>Alterar Título</label>
                    </label>
                </div>
                <div class="m-4">
                    <label class="w-100">Substituir arquivo
                        <input type="file" accept="application/pdf" name="file" class="form-control">
                        <br>
                        <span>Original: <?=$dados["nomeOriginal"]?></span>
                    </label>
                </div>
                <div class="mt-4 text-center">
                    <button type="submit" class="btn btn-primary">
                        Atualizar
                    </button>
                </div>
            </form>
        </div>

    </div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/js/bootstrap.min.js" integrity="sha512-WW8/jxkELe2CAiE4LvQfwm1rajOS8PHasCCx+knHG0gBHt8EXxS6T6tJRTGuDQVnluuAvMxWF4j8SNFDKceLFg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="./../../assets/js/jquery-3.7.1.min.js"></script>
<script>

</script>
</body>
</html>
