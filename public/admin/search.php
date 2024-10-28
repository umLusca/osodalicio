<?php


if ($_SESSION["UserAdmin"] !== true) {
	header('Location: /admin/login/');
}


if (!empty($_POST["query"])) {
	$con = con();
	switch ($_POST["query"]) {
		default:
			break;
		case "apagar":
			$token = $con->real_escape_string($_POST["token"]);
			$s = $con->prepare("SELECT * FROM albuns WHERE token = ?");
			$s->execute([$token]);
			$s = $s->get_result();
			if ($s->num_rows) {
				$album = $s->fetch_assoc();

				$a = $con->prepare("DELETE FROM albuns WHERE token = ?");
				$a->execute([$token]);

				unlink($album["local"]);
				exit();


			}
			break;
	}

}


?>
<!doctype html>
<html lang="pt-BR" data-bs-theme="dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Procurar Álbum</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" integrity="sha512-b2QcS5SsA8tZodcDtGRELiGv5SaKSk1vDHDaQRda0htPYWZ6046lr3kJ5bAAQdpV2mmA/4v0wQF9MyU6/pDIAg==" crossorigin="anonymous" referrerpolicy="no-referrer"/>
    <link rel="stylesheet" href="/assets/css/main.css" referrerpolicy="no-referrer"/>

    <style>

        .tooltip-inner {
            padding: 1rem 1rem 0.75rem 1rem !important;
            border-radius: 0;
            color: #ffffff;
        }

        .tooltip {
            --bs-tooltip-opacity: 1;
            --bs-tooltip-bg: #2b2b2b;
            --bs-tooltip-arrow-height: 10px;
            --bs-tooltip-arrow-width: 15px;

        }

        .tooltip.show {
            opacity: 1;
        }

        .container {
            height: calc(100vh - 45px);
        }

    </style>
</head>
<body>
<?= echoheader("Listar Álbum") ?>
<div class="container-md">
    <div class="card card-body m-5">

        <h3 class="text-center">Lista de Álbum</h3>
        <div class="d-flex justify-content-center">
            <div class="col-md-6">
                <div class="m-3 ">
                    <label class="w-100 form-floating">
                        <input class="form-control" placeholder="Pesquisar por album" id="searchInput"/>
                        <label>Pesquisar por: Nome, Álbum...</label>
                    </label>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center">

            <div class="table-responsive">
                <table class="table table-striped table-hover table-bordered" style="min-width: 800px;" id="resultados">
                    <thead>
                    <tr>
                        <th scope="col">Título</th>
                        <th scope="col">Arquivo</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <colgroup>

                        <col>

                        <col>

                        <col style="width: 0;">
                    </colgroup>
                    <tbody>


                    </tbody>
                </table>
            </div>

        </div>
    </div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.2/js/bootstrap.bundle.min.js" integrity="sha512-X/YkDZyjTf4wyc2Vy16YGCPHwAY8rZJY+POgokZjQB2mhIRFJCckEGc6YyX9eNsPfn0PzThEuNs+uaomE5CO6A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="/assets/js/jquery.js"></script>
<script src="/assets/js/pdf.js"></script>
<script>

    let tooltipList;
    let loades = []
    PDFJS.disableAutoFetch = true

    function refreshTooltips() {
        $("[data-bs-toggle='tooltip']").unbind();
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipList = [...tooltipTriggerList].map((e) => {


            $(e).on("show.bs.tooltip", (e) => {
                let tooltip = bootstrap.Tooltip.getInstance(e.target) // Returns a Bootstrap tooltip instance

                if (tooltip._newContent) {

                } else {
                    if ($(e.target).attr("data-local")) {
                        let local = $(e.target).attr("data-local");
                        if (!loades.includes(local)) {
                            loades.push(local);

                            PDFJS.getDocument({url: $(e.target).attr("data-local"), disableAutoFetch: true, disableStream: true}).then((pdf) => {
                                pdf.getPage(1).then(function getPageHelloWorld(page) {
                                    var scale = 0.25;
                                    var viewport = page.getViewport(scale);

                                    let canvas = $("<canvas />");
                                    var context = canvas[0].getContext('2d');
                                    canvas[0].height = viewport.height;
                                    canvas[0].width = viewport.width;

                                    console.log(canvas[0])
                                    var task = page.render({canvasContext: context, viewport: viewport})
                                    task.promise.then(function () {
                                        tooltip.setContent({'.tooltip-inner>div': $('<div/>').append(canvas)})
                                    });
                                });
                            }, function (error) {
                                console.log(error);
                            });
                        }
                    }

                }
                console.log(e.target);
            });

            if (bootstrap.Tooltip.getInstance(e)) {
                return bootstrap.Tooltip.getInstance(e);
            } else {
                return new bootstrap.Tooltip(e)
            }
        })

    }

    function copyToClipboard(text, t) {
        console.log(this)
        if (window.clipboardData && window.clipboardData.setData) {
            // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
            return window.clipboardData.setData("Text", text);
        } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
            var textarea = document.createElement("textarea");
            textarea.textContent = text;
            textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
            document.body.appendChild(textarea);
            textarea.select();
            try {
                return document.execCommand("copy");  // Security exception may be thrown by some browsers.
            } catch (ex) {
                console.warn("Copy to clipboard failed.", ex);
                return prompt("Copy to clipboard: Ctrl+C, Enter", text);
            } finally {
                document.body.removeChild(textarea);
            }
        }
    }

    let timeWritting = 500;
    let timeout

    function apagar(token) {
        if (confirm("Deseja apagar?")) {
            $.ajax({
                method: "post",
                data: {query: 'apagar', token: token},
                complete: (e) => {
                    window.location.reload();
                }
            })
        }
    }

    function pesquisar(text) {
        console.log("Pesquisando por:" + text);

        $.ajax({
            url: "/api/jornal/get/",
            method: "post",
            dataType: "json",
            data: {search: text},
            success: (d) => {
                if (d.status === 200) {
                    $("#resultados tbody").html("");
                    $(d.data).each((i, e) => {
                        $("#resultados tbody").append(`
                    <tr>
                        <th data-bs-toggle="tooltip" data-local="${e.local}" data-bs-html="true" data-bs-placement="left" data-bs-title="<div>Carregando...</div>">
                            <a href="./../..?t=${e.token}">${e.titulo ? e.titulo : "Sem título"}</a>
                        </th>
                        <td>${e.nomeOriginal}</td>


                        <td style="text-align: center">
                            <div class="d-flex d-inline-flex gap-2">
                                <button class="btn btn-sm p-0" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Apagar" onclick="apagar('${e.token}')">
                                    <svg xmlns="http://www.w3.org/2000/svg" style="width: 16px" viewBox="0 0 215.01 215.01">
                                        <title>close</title>
                                        <circle style="fill:#a5a5a5;" class="cls-1" cx="107.5" cy="107.5" r="107.5"/>
                                        <g style="color:#212529;"><rect class="cls-2" x="228.86" y="408.18" width="137.55" height="25.53" rx="12.76" transform="translate(-400.61 20.31) rotate(-45)"/><rect class="cls-2" x="228.86" y="408.18" width="137.55" height="25.53" rx="12.76" transform="translate(20.31 615.62) rotate(-135)"/></g
                                    </svg>

                                </button>
                                <button class="btn btn-sm p-0" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Copiar Link" onclick="copyToClipboard('https://brasilimage.com/album/?t=${e.token}');$(this).addClass('text-primary');setTimeout(()=>$(this).removeClass('text-primary'),200);let a = bootstrap.Tooltip.getInstance(this);a.setContent({'.tooltip-inner': 'Copiado!'})">
                                    <svg viewBox="0 0 24 24" fill="none" class="dig-UIIcon dig-UIIcon--standard" width="20" height="20" focusable="false" aria-label="Copiar link">
                                        <path d="m16.909 5.35-.258-.258a3.754 3.754 0 0 0-5.303 0L8.591 7.85a3.754 3.754 0 0 0 0 5.303l.258.258a3.734 3.734 0 0 0 4.406.654l.033-.033a.79.79 0 0 0 0-1.06 1.309 1.309 0 0 0-.468-.4 2.25 2.25 0 0 1-2.911-.221l-.258-.258a2.252 2.252 0 0 1 0-3.181l2.758-2.762a2.253 2.253 0 0 1 3.181 0l.258.258a2.246 2.246 0 0 1 .184 2.958c.06.054.122.106.18.163l.258.258c.215.216.41.45.585.7a3.75 3.75 0 0 0-.146-5.137Z" fill="currentColor" vector-effect="non-scaling-stroke"></path>
                                        <path d="M15.15 10.591a3.754 3.754 0 0 0-4.395-.665l-.044.044a.75.75 0 0 0 0 1.06l.258.258c.06.06.132.108.21.142a2.235 2.235 0 0 1 2.911.221l.258.258a2.252 2.252 0 0 1 0 3.182l-2.757 2.76a2.252 2.252 0 0 1-3.182 0l-.258-.259a2.246 2.246 0 0 1-.183-2.957c-.06-.055-.122-.106-.18-.164l-.258-.258a5.25 5.25 0 0 1-.584-.703 3.75 3.75 0 0 0 .145 5.14l.258.258a3.754 3.754 0 0 0 5.303 0l2.757-2.758a3.754 3.754 0 0 0 0-5.302l-.259-.257Z" fill="currentColor" vector-effect="non-scaling-stroke"></path>
                                    </svg>
                                </button>
                                <a class="btn btn-sm" href="/admin/edit/${e.uid}">Editar</a>

                            </div>
                        </td>
                    </tr>
                        `)
                        console.log(i, e);
                    })
                    refreshTooltips();

                }
            },
            error: (e) => {
                console.log(e);
            }
        })
    }

    $(() => {

        $("#searchInput").on("keyup", (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => pesquisar($(e.target).val()), timeWritting);
        })
        pesquisar(" ")
    })
</script>
</body>
</html>
