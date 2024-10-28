<?php

if ($_SESSION["UserAdmin"] !== true){
    header('Location: /admin/login/');
}



?>
<!doctype html>
<html lang="pt-BR" data-bs-theme="dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Brasil Álbum</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" integrity="sha512-b2QcS5SsA8tZodcDtGRELiGv5SaKSk1vDHDaQRda0htPYWZ6046lr3kJ5bAAQdpV2mmA/4v0wQF9MyU6/pDIAg==" crossorigin="anonymous" referrerpolicy="no-referrer"/>
    <link rel="stylesheet" href="../assets/css/main.css" referrerpolicy="no-referrer"/>
</head>
<body>

<?=echoheader("Cadastrar Álbum")?>
<div class="container">
    <div class="card card-body m-5 text-center">
        <h3>Upload de Álbum</h3>
        <div class="d-flex justify-content-center">
            <form method="post" class="col-md-4" enctype="multipart/form-data" id="albumUploader">
                <div class="m-4">
                    <label class="w-100 form-floating">
                        <input type="text" placeholder="" maxlength="200" name="nome" class="form-control" minlength="2" required>
                        <label>Título</label>
                    </label>
                </div>
                <div class="m-4">
                    <canvas id="the-canvas" style="border:1px solid black; display: none"></canvas>
                    <label class="w-100">
                        <input type="file" accept="application/pdf" name="file" id="pdf" class="form-control">
                    </label>
                </div>

                <div class="mt-3" id="progressista"></div>

                <div class="mt-4 text-center">
                    <button type="submit" class="btn btn-primary">
                        Upload
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/js/bootstrap.min.js" integrity="sha512-WW8/jxkELe2CAiE4LvQfwm1rajOS8PHasCCx+knHG0gBHt8EXxS6T6tJRTGuDQVnluuAvMxWF4j8SNFDKceLFg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="/assets/js/jquery.js"></script>
<script src="/assets/js/pdf.js"></script>

<script type="text/javascript">
    PDFJS.disableWorker = false;

    //
    // Asynchronous download PDF as an ArrayBuffer
    //
    var pdf = document.getElementById('pdf');
    pdf.onchange = function(ev) {
        if (file = document.getElementById('pdf').files[0]) {
            fileReader = new FileReader();
            fileReader.onload = function(ev) {
                console.log(ev);

                PDFJS.getDocument(fileReader.result).then(function getPdfHelloWorld(pdf) {

                    console.log(pdf)
                    pdf.getPage(1).then(function getPageHelloWorld(page) {
                        var scale = 0.25;
                        var viewport = page.getViewport(scale);



                        var canvas = document.getElementById('the-canvas');
                        var context = canvas.getContext('2d');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;


                        var task = page.render({canvasContext: context, viewport: viewport})
                        task.promise.then(function(){
                            $(canvas).show();
                            console.log(canvas.toDataURL('image/jpeg'));
                        });
                    });
                }, function(error){
                    console.log(error);
                });
            };
            fileReader.readAsArrayBuffer(file);
        }
    }




let files = {};
    $(() => {


        $("#albumUploader input[name=file]").on("change", (event) => {
                console.log(event)


                for (const file of event.target.files) {
                    // For individual Files
                    if (file.name.toLowerCase().endsWith(".pdf")) {
                        files[$(event.target).attr("name")] = file;
                        const progressBar = $("<div/>").attr("class", "progress my-2").css("height", "20px");
                        const progress = $("<div/>").attr("class", "progress-bar bg-secondary").css("width", "100%").text(`${file.name}`).appendTo(progressBar);

                        $("#progressista").append(progressBar);
                    }

                    //For folders only
                    /*
                    let folders = file.webkitRelativePath.split("/");
                    if (folders.length === 3 && folders[2].endsWith(".jpg")) {
                        if (!files[folders[1]]) files[folders[1]] = []
                        files[folders[1]][files[folders[1]].length] = file;
                        const progressBar = $("<div/>").attr("class", "progress my-2").css("height", "20px");
                        const progress = $("<div/>").attr("class", "progress-bar bg-secondary").css("width", "100%").text( `${folders[1]} => ${folders[2]}`).appendTo(progressBar);

                        $("#progressista").append(progressBar);

                    }

                     */
                }
                console.log(files)
            }
        );
        $("#albumUploader").on("submit", (e) => {
            e.preventDefault();
            e.stopPropagation()

            console.log("enviando")
            const formData = new FormData();
            Object.keys(files).forEach(function (pasta, index) {

                console.log(pasta, index)
                $(files[pasta]).each((i, e) => {
                    formData.append(pasta, files[pasta] = e);
                })
            });

            const maxSimultaneousUploads = 10;
            let currentIndex = 0;

            (function uploadBatch(startIndex) {


                let batch = [];

                if (currentIndex === 0) {
                    let ir = 0;
                    for (const value of formData) {
                        if (ir > maxSimultaneousUploads - 1) break;
                        batch[ir] = value;
                        ir++
                    }
                    currentIndex = startIndex + maxSimultaneousUploads;
                } else {
                    let ir = 0;
                    for (const value of formData) {
                        if (ir !== currentIndex) {
                            ir++;
                            continue;
                        }
                        batch[ir] = value;
                        ir++
                    }
                    currentIndex++;
                }

                if (batch.length === 0) return;
                console.log(batch)

                batch.map((data, index) => {
                    $($('.progress-bar')[index]).removeClass("bg-secondary").addClass("bg-primary").css("width", '0%');

                    console.log(
                        currentIndex, index, data
                    )
                    const form = new FormData($("#albumUploader")[0]);
                    //form.append('file', data[1]);


                    $.ajax({
                        async: true,
                        method: "post",
                        url: "/api/jornal/upload/",
                        data: form,
                        cache: false,
                        processData: false,
                        contentType: false,
                        dataType: "json",
                        xhr: () => {

                            var xhru = $.ajaxSettings.xhr();
                            console.log(xhru)
                            // Configura a barra de progresso
                            if (xhru.upload) {
                                xhru.upload.addEventListener("progress", (e) => {
                                    if (e.lengthComputable) {
                                        const percentComplete = Math.round((e.loaded / e.total) * 100);
                                        $($('.progress')[index]).children().css("width", percentComplete + '%');
                                        if (percentComplete === 100) {
                                            $($('.progress-bar')[index]).removeClass("bg-primary").addClass("bg-success");

                                        }
                                    }
                                });
                            }
                            return xhru;
                            //xhr.send.onerror = (e)=>{console.log(e);}xhr.onload = function () {uploadBatch(currentIndex);};
                        },
                        success: (d) => {
                            console.log(d)
                        },
                        error: (e) => {
                            console.log(e)
                        }


                    })


                });


            })(0);


        })

    })
</script>
</body>
</html>
