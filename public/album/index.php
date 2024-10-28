<?php

use MercadoPago\Exceptions\MPApiException;use MercadoPago\Net\MPSearchRequest;

if (empty($_SESSION["UserMPID"])){
    echo "Você não adquiriu nenhum pacote";
    exit();
}
$result = [];

try {
	$PAC = new MercadoPago\Client\PreApproval\PreApprovalClient();
	$search = new MPSearchRequest(100, 0, [
		"payer_id"            => $_SESSION["UserMPID"],
		"status"              => "authorized",
		"preapproval_plan_id" => "2c9380849295664c0192afb3bc8d0773",
	]);

	$result = $PAC->search($search)->results;


} catch (MPApiException $e) {
	var_dump($e);
} catch (Exception|Throwable $e) {

}
if (empty($result)) {
   echo("Nenhuma assinatura encontrada...");
   exit;
}

if (isset($result[0]->summarized->semaphore) && $result[0]->summarized->semaphore !== "green") {
    echo "Existe algum pagamento pendente ou em processamento";
    exit;
}




?><!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link href="/assets/css/flipper.css" rel="stylesheet" type="text/css">

    <title><?= $dados["titulo"] ?: "Sem título" ?> - Brasil Álbum</title>
    <style>
        body, html {
            height: 100vh;
            width: 100vw;
            margin: 0;
            font-family: 'Roboto', sans-serif;
            background: rgba(0, 0, 0, 1);
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-position: right top;
            position: fixed;
        }

        .df-ui-wrapper, .df-ui-btn {
            Color: #999999;
        }

        @media only screen and (min-width: 771px) {
            #container {
                position: absolute;
                width: -moz-calc(100%);
                width: -webkit-calc(100%);
                width: calc(100%);
                height: 100%;
                z-index: 1;
            }

            #container2 {
                position: absolute;
                width: -moz-calc(100%);
                width: -webkit-calc(100%);
                width: calc(100%);
                height: 100%;
            }

            .ratings {
                font-size: 12px;
                font-family: 'Open Sans', sans-serif;
                position: fixed;
                bottom: 5px;
                right: -2px;
                z-index: 9999;
            }

            .poweredbyX {
                font-size: 12px;
                font-family: 'Roboto', sans-serif;
                position: fixed;
                bottom: 105px;
                right: 125px;
                z-index: 9999;
            }

            .viewsX {
                font-size: 12px;
                color: #000;
                font-family: 'Open Sans', sans-serif;
                position: fixed;
                bottom: 43px;
                right: 5px;
                z-index: 9999;
            }

            .cornerX {
                font-size: 12px;
                color: #000;
                font-family: 'Open Sans', sans-serif;
                position: fixed;
                bottom: -1px;
                right: 0px;
                z-index: 9998;
            }

            @-moz-document url-prefix() {
                .cornerX {
                    font-size: 12px;
                    color: #000;
                    font-family: 'Open Sans', sans-serif;
                    position: fixed;
                    bottom: -4px;
                    right: 0px;
                    z-index: 9998;
                }
            }

            .logodivX {
                position: fixed;
                bottom: -5px;
                left: 0px;
                z-index: 9998;
            }

            #adBottom {
                left: 0;
                position: fixed;
                text-align: center;
                bottom: 0px;
                width: 1px;
                height: 1px;
                z-index: 999;
                background-color: #000;
            }

            .vertical-center {
                display: none;
            }

            #RightFloatAds {
                float: right;
                right: 0px;
                position: fixed;
                text-align: center;
                top: 8px;
                margin: 5px 14px;
                z-index: 0;
            }

            #poweredby {
                float: right;
                right: 0px;
                position: fixed;
                bottom: 29px;
                margin: 5px 188px;
                z-index: 9999;
                visibility: hidden;
            }
        }

        @media only screen and (max-width: 770px) {
            #container {
                position: absolute;
                height: -moz-calc(100%);
                height: -webkit-calc(100%);
                height: calc(100%);
                width: 100%;
                z-index: 1;
            }

            #adBottom {
                left: 0;
                position: fixed;
                text-align: center;
                bottom: 0px;
                width: 100%;
                height: 100px;
                z-index: 999;
                background-color: #000;
            }

            #toplogo {
                position: fixed;
                top: 0;
                left: 50%;
                margin-top: 0px;
                margin-left: -58px;
                z-index: 9999;
            }
        }

        p {
            font-family: 'Raleway', sans-serif;
        }

        #book {
            background-size: 75px;
            background-position: 50% 90%;
            transform: ;
            background-repeat: no-repeat;
        }

        .footer {
            bottom: 0px;
            background: #1d1d1d;
            height: 20px;
            text-justify: newspaper;
            padding: 3px 10px;
            text-align: center;
            color: #535353;
            font-size: 0.8rem;
            justify-content: center;
        }
    </style>
</head>
<body>
<div class="" style="height: calc(100% - 20px) /* FROM FOOTER!*/">

    <div id="book"></div>
</div>
<div class="footer">Brasil Álbum from Brasil Image - Made with ♥ by TheBunker</div>
<script src="/assets/js/jquery.js" type="text/javascript"></script>
<script src="/assets/js/bookjs.js" type="">

</script>
<script src="/assets/js/simalbum.js" type="text/javascript"></script>

<script type="module">

    var flipBook;
    jQuery(document).ready(function () {

        console.log(FLIPBOOKPROCOM);

        FLIPBOOKPROCOM.defaults = {
            ...FLIPBOOKPROCOM.defaults,

            pdfjsSrc: "/assets/js/pdf.js",
            pdfjsCompatibilitySrc: "/assets/js/compatibility.js",
            pdfjsWorkerSrc: "/assets/js/pdf.worker.js",
            threejsSrc: "/assets/js/THREE.js",
            mockupjsSrc: "/assets/js/mockup.js",
        }
        flipBook = $("#book").simAlbum('/api/jornal/view/<?=$dados["uid"]?>/', {
            backgroundColor: "#3B3E45",
            links: [],
            html: [],
            backgroundImage: "/assets/img/logo_brasilimage.svg",
            singlePageMode: false,
            pageMode: 1,
            downloadName: "<?=$dados["nomeOriginal"]?>",
            pdfRenderQuality: 10,
        });
        //*/
    });
</script>

</body>
</html>
