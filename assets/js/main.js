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
        })
})


$.extend($.fn.dataTable.ext.type.order, {
    "resolution-asc": function (a, b) {
        console.log(a, b);
        let x = a.split("x");
        let y = b.split("x");

        if (a === b) return 0;
        let aw = parseInt(x[0]);
        let ah = parseInt(x[1]);

        let bw = parseInt(y[0]);
        let bh = parseInt(y[1]);
        if (aw < bw) {
            return -1;
        }
        if (aw > bw) {
            return 1;
        }
        if (ah < bh) {
            return -1;
        }
        if (ah > bh) {
            return 1;
        }
        return 0;

    },

    "resolution-desc": function (b, a) {
        let x = a.split("x");
        let y = b.split("x");

        if (a === b) return 0;
        let aw = parseInt(x[0]);
        let ah = parseInt(x[1]);

        let bw = parseInt(y[0]);
        let bh = parseInt(y[1]);
        if (aw < bw) {
            return -1;
        }
        if (aw > bw) {
            return 1;
        }
        if (ah < bh) {
            return -1;
        }
        if (ah > bh) {
            return 1;
        }
        return 0;
    }
});

const ptbr = {
    'emptyTable': 'Nenhum registro encontrado',
    'info': '_START_ - _END_ | Total <span class="fw-bold">_TOTAL_</span>',
    'infoFiltered': '(Filtrados de <span class="fw-bold">_MAX_</span> registros)',
    'infoThousands': '.',
    'loadingRecords': '<i class="fas fa-xl fa-spinner-third fa-spin my-2"></i>',
    'zeroRecords': 'Nenhum registro encontrado',
    'search': '',
    'paginate': {
        'next': "<i class='fal fa-chevron-right'></i>",
        'previous': "<i class='fal fa-chevron-left'></i>",
        'first': "<i class='fal fa-chevrons-left'></i>",
        'last': "<i class='fal fa-chevrons-right'></i>"
    },
    'aria': {
        'sortAscending': ': Ordenar colunas de forma ascendente',
        'sortDescending': ': Ordenar colunas de forma descendente'
    },
    'select': {
        'rows': {
            '0': '',
            '_': ' | Selecionado <span class="fw-bold">%d registros</span>',
            '1': ' | Selecionado <span class="fw-bold">%d registro</span>'
        },
        'cells': {
            '0': '',
            '1': '1 célula selecionada',
            '_': '%d células selecionadas'
        },
        'columns': {
            '0': '',
            '1': '1 coluna selecionada',
            '_': '%d colunas selecionadas'
        }
    },
    'buttons': {
        'copySuccess': {
            '1': 'Uma linha copiada com sucesso',
            '_': '%d linhas copiadas com sucesso'
        },
        'collection': "Coleção  <span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"><\/span>",
        'colvis': 'Visibilidade da Coluna',
        'colvisRestore': 'Restaurar Visibilidade',
        'copy': 'Copiar',
        'copyKeys': 'Pressione ctrl ou u2318 + C para copiar os dados da tabela para a área de transferência do sistema. Para cancelar, clique nesta mensagem ou pressione Esc..',
        'copyTitle': 'Copiar para a área de Transferência',
        'csv': 'CSV',
        'excel': 'Excel',
        'pageLength': {
            '-1': 'Mostrar todos os registros',
            '_': 'Mostrar %d registros'
        },
        'pdf': 'PDF',
        'print': 'Imprimir',
        'createState': 'Criar estado',
        'removeAllStates': 'Remover todos os estados',
        'removeState': 'Remover',
        'renameState': 'Renomear',
        'savedStates': 'Estados salvos',
        'stateRestore': 'Estado %d',
        'updateState': 'Atualizar'
    },
    'autoFill': {
        'cancel': 'Cancelar',
        'fill': 'Preencher todas as células com',
        'fillHorizontal': 'Preencher células horizontalmente',
        'fillVertical': 'Preencher células verticalmente'
    },
    'lengthMenu': 'Exibir _MENU_ resultados por página',
    'searchBuilder': {
        'add': 'Adicionar Condição',
        'button': {
            '0': 'Construtor de Pesquisa',
            '_': 'Construtor de Pesquisa (%d)'
        },
        'clearAll': 'Limpar Tudo',
        'condition': 'Condição',
        'conditions': {
            'date': {
                'after': 'Depois',
                'before': 'Antes',
                'between': 'Entre',
                'empty': 'Vazio',
                'equals': 'Igual',
                'not': 'Não',
                'notBetween': 'Não Entre',
                'notEmpty': 'Não Vazio'
            },
            'number': {
                'between': 'Entre',
                'empty': 'Vazio',
                'equals': 'Igual',
                'gt': 'Maior Que',
                'gte': 'Maior ou Igual a',
                'lt': 'Menor Que',
                'lte': 'Menor ou Igual a',
                'not': 'Não',
                'notBetween': 'Não Entre',
                'notEmpty': 'Não Vazio'
            },
            'string': {
                'contains': 'Contém',
                'empty': 'Vazio',
                'endsWith': 'Termina Com',
                'equals': 'Igual',
                'not': 'Não',
                'notEmpty': 'Não Vazio',
                'startsWith': 'Começa Com',
                'notContains': 'Não contém',
                'notStartsWith': 'Não começa com',
                'notEndsWith': 'Não termina com'
            },
            'array': {
                'contains': 'Contém',
                'empty': 'Vazio',
                'equals': 'Igual á ',
                'not': 'Não',
                'notEmpty': 'Não vazio',
                'without': 'Não possui'
            }
        },
        'data': 'Data',
        'deleteTitle': 'Excluir regra de filtragem',
        'logicAnd': 'E',
        'logicOr': 'Ou',
        'title': {
            '0': 'Construtor de Pesquisa',
            '_': 'Construtor de Pesquisa (%d)'
        },
        'value': 'Valor',
        'leftTitle': 'Critérios Externos',
        'rightTitle': 'Critérios Internos'
    },
    'searchPanes': {
        'clearMessage': 'Limpar Tudo',
        'collapse': {
            '0': 'Painéis de Pesquisa',
            '_': 'Painéis de Pesquisa (%d)'
        },
        'count': '{total}',
        'countFiltered': '{shown} ({total})',
        'emptyPanes': 'Nenhum Painel de Pesquisa',
        'loadMessage': 'Carregando Painéis de Pesquisa...',
        'title': 'Filtros Ativos',
        'showMessage': 'Mostrar todos',
        'collapseMessage': 'Fechar todos'
    },
    'thousands': '.',
    'datetime': {
        'previous': 'Anterior',
        'next': 'Próximo',
        'hours': 'Hora',
        'minutes': 'Minuto',
        'seconds': 'Segundo',
        'amPm': [
            'am',
            'pm'
        ],
        'unknown': '-',
        'months': {
            '0': 'Janeiro',
            '1': 'Fevereiro',
            '10': 'Novembro',
            '11': 'Dezembro',
            '2': 'Março',
            '3': 'Abril',
            '4': 'Maio',
            '5': 'Junho',
            '6': 'Julho',
            '7': 'Agosto',
            '8': 'Setembro',
            '9': 'Outubro'
        },
        'weekdays': [
            'Domingo',
            'Segunda-feira',
            'Terça-feira',
            'Quarta-feira',
            'Quinte-feira',
            'Sexta-feira',
            'Sábado'
        ]
    },
    'editor': {
        'close': 'Fechar',
        'create': {
            'button': 'Novo',
            'submit': 'Criar',
            'title': 'Criar novo registro'
        },
        'edit': {
            'button': 'Editar',
            'submit': 'Atualizar',
            'title': 'Editar registro'
        },
        'error': {
            'system': "Ocorreu um erro no sistema (<a target=\"\\\" rel=\"nofollow\" href=\"\\\">Mais informaçáes<\/a>)."
        },
        'multi': {
            'noMulti': 'Essa entrada pode ser editada individualmente, mas não como parte do grupo',
            'restore': 'Desfazer alteraçáes',
            'title': 'Multiplos valores',
            'info': 'Os itens selecionados contêm valores diferentes para esta entrada. Para editar e definir todos os itens para esta entrada com o mesmo valor, clique ou toque aqui, caso contrário, eles manterão seus valores individuais.'
        },
        'remove': {
            'button': 'Remover',
            'confirm': {
                '_': 'Tem certeza que quer deletar %d linhas?',
                '1': 'Tem certeza que quer deletar 1 linha?'
            },
            'submit': 'Remover',
            'title': 'Remover registro'
        }
    },
    'decimal': ',',
    'stateRestore': {
        'creationModal': {
            'button': 'Criar',
            'columns': {
                'search': 'Busca de colunas',
                'visible': 'Visibilidade da coluna'
            },
            'name': 'Nome:',
            'order': 'Ordernar',
            'paging': 'Paginação',
            'scroller': 'Posição da barra de rolagem',
            'search': 'Busca',
            'searchBuilder': 'Mecanismo de busca',
            'select': 'Selecionar',
            'title': 'Criar novo estado',
            'toggleLabel': 'Inclui:'
        },
        'emptyStates': 'Nenhum estado salvo',
        'removeConfirm': 'Confirma remover %s?',
        'removeJoiner': 'e',
        'removeSubmit': 'Remover',
        'removeTitle': 'Remover estado',
        'renameButton': 'Renomear',
        'renameLabel': 'Novo nome para %s:',
        'renameTitle': 'Renomear estado',
        'duplicateError': 'Já existe um estado com esse nome!',
        'emptyError': 'Não pode ser vazio!',
        'removeError': 'Falha ao remover estado!'
    },
    'infoEmpty': '',
    'processing': 'Carregando...',
    'searchPlaceholder': 'Pesquisar...'
};

