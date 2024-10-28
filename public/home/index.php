<?php
session_start();
var_dump($_SESSION);
use MercadoPago\Exceptions\MPApiException;use MercadoPago\Net\MPSearchRequest;


$result = [];

$havePlan = false;
if (!empty($_SESSION["UserMPID"])) try {
	$PAC = new MercadoPago\Client\PreApproval\PreApprovalClient();
	$search = new MPSearchRequest(100, 0, [
		"payer_id"            => $_SESSION["UserMPID"],
		"status"              => "authorized",
		"preapproval_plan_id" => "2c9380849250c843019258f4d28402c2",
	]);
	$result = $PAC->search($search)->results;
	$havePlan = $result;
} catch (MPApiException|Exception|Throwable $e) {
	$havePlan = false;
}

?><!doctype html>
<html lang="br" data-bs-theme="dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <style>


        [data-bs-theme=dark] {
            color-scheme: unset;
        }
    </style>
</head>
<body>

<nav class="navbar navbar-expand-md bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav me-auto m-2 mb-md-0">
                <li class="nav-item me-auto">
                    <a class="nav-link active" aria-current="page" href="#">Inicio</a>
                </li>

				<?php if (isset($_SESSION["UserID"])) { ?>

                    <li class="nav-item">
                        <a class="nav-link" href="/sair/">Sair</a>
                    </li>


				<?php } else { ?>

                    <li class="nav-item">
                        <button class="nav-link" data-bs-toggle="modal" data-bs-target="#registerModal">Register</button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
                    </li>

				<?php } ?>
            </ul>
        </div>
    </div>
</nav>

<div class="main">
    <div class="rounded-3 container mt-3">
        <h1 class="text-center">O Sodalício</h1>
		<?php
		if (!$havePlan) {
			?>
            <div class="row justify-content-evenly row-cols-auto">
                <div class="col">
                    <div>Plano Anual Digital</div>
                    <button class="btn btn-sm btn-success" onclick="comprar('digital')">Comprar R$ 14,99 por mês</button>
                </div>
                <div class="col">
                    <div>Plano Anual Físico</div>
                    <button class="btn btn-sm btn-success" onclick="comprar('fisico')">Comprar R$ 24,99 por mês</button>

                </div>
            </div>

			<?php
		}
		?>
        <hr class="my-5">
        <h3 class="text-center">Últimos Jornais</h3>
        <div class="">

			<?php
			$c = con();
			$a = $c->prepare("SELECT * FROM news WHERE dataPostagem < NOW()");
			$a->execute([]);
			if ($a->rowCount()) {
				$news = $a->fetchAll(2);
				foreach ($news as $new) {
					?>
                    <div class="card card-body">
                        <h5 class="text-center"><?= $new["titulo"] ?></h5>
                        <p><?= $new["resumo"] ?></p>
                        <a href="/newspaper/<?= $new["uid"] ?>/" class="btn btn-sm btn-success">Ver</a>
                    </div>

					<?php
				}

			}
			?>

        </div>
    </div>
</div>


<!-- Modal -->
<div class="modal fade" id="pagamento" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-xxl">
        <div class="modal-content">
            <div class="modal-header border-0">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Pagamento</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0">


                <div id="cardPaymentBrick_container"></div>
            </div>
        </div>
    </div>
</div>

<?php

include ROOT . "/_COMPONENTS/modal_login.php";
include ROOT . "/_COMPONENTS/modal_endereco.php";
include ROOT . "/_COMPONENTS/essencial/scripts.php";

?>
<script>
    const mp = new MercadoPago("<?=PUBLIC_KEY?>", {
        locale: 'pt-BR',

    });

    const bricksBuilder = mp.bricks({theme: 'dark'});

    async function comprar(plano) {
        let preco = 24.99;
        switch (plano) {
            case "fisico":
                preco = 24.99;
                break;
            case "digital":
                preco = 14.99;
                break;
        }
        $("#pagamento").modal("toggle");
        window.cardPaymentBrickController = await bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', {
            initialization: {
                amount: preco, // valor total a ser pago
                payer: {
                    email: "<?= $_SESSION["UserEmail"]?>",
                },
                //    identification: {type: '', number: '',},
            },
            customization: {
                visual: {
                    hideFormTitle: false,
                    style: {
                        customVariables: {

                            "textPrimaryColor": "a",
                            "textSecondaryColor": "",
                            "inputBackgroundColor": "",
                            "formBackgroundColor": "#00000000",
                            "baseColor": "#4487e9",
                            "baseColorFirstVariant": "",
                            "baseColorSecondVariant": "",
                            "errorColor": "",
                            "successColor": "",
                            "outlinePrimaryColor": "",
                            "outlineSecondaryColor": "",
                            "buttonTextColor": "",
                            "fontSizeExtraSmall": "",
                            "fontSizeSmall": "",
                            "fontSizeMedium": "",
                            "fontSizeLarge": "",
                            "fontSizeExtraLarge": "",
                            "fontWeightNormal": "",
                            "fontWeightSemiBold": "",
                            "formInputsTextTransform": "",
                            "inputVerticalPadding": "",
                            "inputHorizontalPadding": "",
                            "inputFocusedBoxShadow": "",
                            "inputErrorFocusedBoxShadow": "",
                            "inputBorderWidth": "",
                            "inputFocusedBorderWidth": "",
                            "borderRadiusSmall": "",
                            "borderRadiusMedium": "",
                            "borderRadiusLarge": "",
                            "borderRadiusFull": "",
                            "formPadding": ""

                        }
                    },
                    texts: {
                        "formTitle": "Insira os seus dados",
                        "emailSectionTitle": "",
                        "installmentsSectionTitle": "",
                        "cardholderName": {
                            "label": "",
                            "placeholder": ""
                        },
                        "email": {
                            "label": "",
                            "placeholder": ""
                        },
                        "cardholderIdentification": {
                            "label": ""
                        },
                        "cardNumber": {
                            "label": ""
                        },
                        "expirationDate": {
                            "label": ""
                        },
                        "securityCode": {
                            "label": ""
                        },
                        "selectInstallments": "",
                        "selectIssuerBank": "",
                        "formSubmit": "Pagar com MercadoPago"
                    },
                },
                paymentMethods: {
                    minInstallments: 1,
                    maxInstallments: 12,
                }
            },
            callbacks: {
                onReady: () => {

                },
                onSubmit: (cardFormData) => {
                    console.log(cardFormData);
                    cardFormData["plano"] = plano;
                    let l = new Loader();
                    $.ajax({
                        url: "/API/payments/create/",
                        data: cardFormData,
                        dataType: "json",
                        method: "post",
                        beforeSend: () => {
                            l.start("Enviando");
                            $("#pagamento").modal("hide");
                            window.cardPaymentBrickController.unmount();
                        },
                        success: (d) => {
                            if (d.status === 200) {
                                l.finish({
                                    message: d.msg,
                                    icon: "success",
                                    autoSkip: 3,
                                    callback: () => {
                                        console.log(d);
                                        if (d.account) {
                                            $("#cepModal").data("account", d.account).modal("show");
                                            if (plano !== "fisico") {
                                                $("#cepModal").find(".ceparea").html("");
                                            }
                                        }
                                    }
                                });
                            } else {
                                l.finish({
                                    message: d.msg,
                                    icon: 3,
                                    autoSkip: false,
                                    callback: () => {
                                    }
                                });
                            }
                        },
                        error: (d) => {
                            let msg = "Falha ao enviar...";
                            console.log(d);
                            if (d["responseJSON"] && d["responseJSON"]["msg"]) {
                                msg = d["responseJSON"]["msg"];
                            }
                            l.finish({
                                message: msg,
                                icon: 2,
                            })
                        },
                        complete: () => {

                        }
                    })
                    return true;
                },
                onError: (error) => {

                    l.finish({
                        message: "Houve um erro no MercadoPago, tente novamente...",
                        icon: "error",
                        autoSkip: false,
                        callback: () => {
                            window.refresh();

                        }
                    });
                    // callback chamado para todos os casos de erro do Brick
                },
            },
        });
    }

    $("#pagamento").on("hide.bs.modal", () => {
        window.cardPaymentBrickController.unmount();
    })

</script>

</body>
</html>