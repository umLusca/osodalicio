console.log("main.js");
let sendingPost = false;


function uuidv4() {
    return (Crypto && Crypto.randomUUID) ? Crypto.randomUUID() : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c => (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16));
}

function minTwoDigits(n) {
    return (n < 10 ? '0' : '') + n;
}

function secondsToHms(d) {
    const h = Math.floor(d / 360);
    const m = Math.floor(d / 60);
    const s = Math.floor(d % 60);

    const hDisplay = minTwoDigits(h) + ":";
    const mDisplay = minTwoDigits(m);
    const sDisplay = s > 0 ? ":" + minTwoDigits(s) : ":00";
    return hDisplay + mDisplay + sDisplay;
}

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

$.fn.getFormObject = function () {
    return $(this).serializeArray().reduce(function (obj, item) {
        const name = item.name.replace("[]", "");
        if (typeof obj[name] !== "undefined") {
            if (!Array.isArray(obj[name])) {
                obj[name] = [obj[name], item.value];
            } else {
                obj[name].push(item.value);
            }
        } else {
            obj[name] = item.value;
        }
        return obj;
    }, {});
}

$(() => {

    $(".inputTel").each((i, e) => {
        let mask = '(00) 0000-00009';
        if ($(e).val().length === 15) {
            mask = '(00) 00000-0000'
        }
        $(e).prop("inputmode", "tel").mask(mask, {
            onKeyPress: (val, e, field, options) => {
                let mask = '(00) 0000-00009';
                if (val.length === 15) {
                    mask = '(00) 00000-0000'
                }
                field.mask(mask, options)
            }
        })
    })

    $("form[ajax]").on("submit", (e) => {
        console.log(e);
        e.preventDefault();
        e.stopPropagation();
        $(e.target).addClass("was-validated");
        if (!sendingPost && e.target.checkValidity()) {
            sendingPost = true;
            let $this = e.currentTarget;
            //Crie um div com display none no formulário, ele vai ter o retorno
            $(".return").slideUp().text("").removeClass("alert-danger alert-info alert-success");

            let data = $($this).getFormObject();
            for (const [key, value] of Object.entries($($this).data())) {
                if (value && typeof value === 'string' && value.indexOf('$carrinho') > -1) {
                    let [, token] = value.split(".");
                    data["token"] = token

                    data[key] = localStorage.getItem("carrinho");
                } else {
                    data[key] = value;
                }
            }

            //por padrão é o do formulário.
            data["query"] = $($this).attr("action");
            if (e.originalEvent) {

                //Ele poderá ser substituido pelo o do botão, caso exista.
                let buttonAction = $(e.originalEvent.submitter).attr("formaction");
                if (typeof buttonAction === "string" && buttonAction.length >= 2) {
                    data["query"] = buttonAction;
                }
            }
            $($this).find(".return").addClass("alert-info").removeClass("alert-danger").text("Aguarde...").slideDown();

            let ajax = () => {
                $.ajax({
                    method: "POST",
                    url: data["query"],
                    data: data,
                    dataType: "json",
                    success: (d) => {
                        if (data.callback) {
                            if (window[data.callback]) window[data.callback](d)
                        }
                        if (d.status) {
                            $($this).find(".return").addClass("alert-success").removeClass("alert-danger alert-info");
                            if (data.refresh || d.refresh) {
                                setTimeout(
                                    () => {
                                        window.location.reload()
                                    }, 500);
                            }
                            if (data.redirect || data.redirect === "") {
                                let redi = "";
                                if (d.redirect) {
                                    redi = d.redirect;
                                }
                                window.location.href = data.redirect + redi;
                            }
                        } else {
                            $($this).find(".return").addClass("alert-danger").removeClass("alert-success alert-info");

                        }
                        $($this).find(".return").html(d.msg).slideDown()
                    },
                    error: (err) => {
                        if (err.responseJSON && err.responseJSON.msg) {
                            $($this).find(".return").addClass("alert-danger").removeClass("alert-success alert-info").text(err.responseJSON.msg).slideDown();
                        } else {
                            $($this).find(".return").addClass("alert-danger").removeClass("alert-success alert-info").text(err.status + " | Houve um erro ao comunicar com o servidor...").slideDown();
                        }
                    },

                    complete: () => {
                        sendingPost = false;
                    }

                });
            }
            ajax();


        }


    })
        .on("hidden.bs.modal", (e) => {
            $(e.currentTarget).trigger("reset").removeClass("was-validated").find(".return").hide();
        })
        .on("keydown", (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();  // Prevenir o envio padrão

                $(e.currentTarget).trigger("submit");
            }
        });


    $(".inputCep").each((i, e) => {

        $(e).data("cleave", new Cleave(e, {
            numericOnly: true,
            delimiter: '-',
            blocks: [5, 3],
            delimiterLazyShow: true,
        })).prop("inputmode", "numeric");
    })
    $(".ceparea").on("input", "input.inputCep", (e) => {

        let t = $(e.target);
        let ca = t.parents(".ceparea");
        let val = t.data("cleave").getRawValue()
        if (val.length === 8) {
            $.getJSON("https://viacep.com.br/ws/" + val + "/json/?callback=?", function (dados) {

                if (!("erro" in dados)) {
                    $(e.target).addClass("is-valid").removeClass("is-invalid");
                    e.target.setCustomValidity("");

                    ca.find('.ruaCorreios').val(dados.logradouro);
                    ca.find('.address').val(dados.logradouro).prop("readonly", !!dados.logradouro.length);
                    ca.find('.district').val(dados.bairro).prop("readonly", !!dados.bairro.length);
                    ca.find('.state').val(dados.uf).prop("readonly", !!dados.uf.length);
                    ca.find('.city').val(dados.localidade).prop("readonly", !!dados.localidade.length);

                    ca.find('.completeAddress').slideDown();
                    ca.find('.nocepcontainer').slideUp();

                } else {
                    $(e.target).addClass("is-invalid").removeClass("is-valid");
                    e.target.setCustomValidity("Precisa preencher com um cep existente");
                }
            });
        }
    }).on("change", ".nocep", (e) => {
        let a = $(e.target).parents(".ceparea");
        let d = $(e.target).is(":checked")
        a.find(".inputCep").prop("readonly", d);
        a.find(".searchaddress").prop("readonly", !d);
        a.find(".latitude").prop("readonly", !d);
        a.find(".longitude").prop("readonly", !d);
        if (d) {
            a.find('.cepinputcontainer').slideUp();
            a.find('.googleSearch').slideDown();
        } else {
            a.find('.cepinputcontainer').slideDown();
            a.find('.googleSearch').slideUp();

        }
    })
})

