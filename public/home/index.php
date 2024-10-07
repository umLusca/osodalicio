<?php



?><!doctype html>
<html lang="en">
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
<body data-bs-theme="dark">

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

				<?php

				if (isset($_SESSION["UserID"])) {

					?>

                    <li class="nav-item">
                        <a class="nav-link" href="/sair/">Sair</a>
                    </li>


					<?php


				} else {
					?>

                    <li class="nav-item">
                        <button class="nav-link" data-bs-toggle="modal" data-bs-target="#registerModal">Register</button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
                    </li>

					<?php


				}

				?>
            </ul>
        </div>
    </div>
</nav>

<div class="main">
    <div class="rounded-3 container">
        <h1>O Sodalicio</h1>
        <div class="row">
            <div class="col-6">
                <div>Plano Anual Digital</div>
                <button class="btn btn-sm btn-success" onclick="comprar('digital')">Comprar R$ 14,99 por mês</button>
            </div>
            <div class="col-6">
                <div>Plano Anual Físico</div>
                <button class="btn btn-sm btn-success" onclick="comprar('fisico')">Comprar R$ 24,99 por mês</button>

            </div>
        </div>


    </div>
</div>


<!-- Modal -->
<div class="modal fade" id="pagamento" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-xxl">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">


                <div id="cardPaymentBrick_container"></div>

            </div>
        </div>
    </div>
</div>

<?php

include ROOT . "/_COMPONENTS/modal_login.php";

?>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script>


<script src="https://sdk.mercadopago.com/js/v2"></script>

<script src="/assets/js/main.js"></script>
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
                identification: {
                    type: '',
                    number: '',
                },
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
                    // callback chamado quando o Brick estiver pronto
                },
                onSubmit: (cardFormData) => {

                    return new Promise((resolve, reject) => {
                        fetch("/api/payments/create/", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(cardFormData)
                        })
                            .then((response) => {
                                console.log(response)
                                resolve(true);
                            })
                            .catch((error) => {
                                console.log(error)
                                // lidar com a resposta de erro ao tentar criar o pagamento
                                reject();
                            })
                    });
                },
                onError: (error) => {
                    // callback chamado para todos os casos de erro do Brick
                },
            },
        });
    }


</script>

</body>
</html>