class Loader {

    _id = crypto.randomUUID();
    _el = $(`<div id="loadingModal${this._id}" class='modal fade' tabindex='-1'>
    <div class='modal-dialog modal-responsive modal-dialog-centered'>
        <div class='modal-content'>
            <div class='modal-body'>
                <div class='row m-2'>
                    <div class='col-auto align-self-center justify-content-center icon'>
                        <i class='far fa-spin fa-spinner fa-2x'></i>
                    </div>
                    <div class='col align-self-center justify-content-center text'>
                        <span class='fs-5'>Aguarde...</span>
                    </div>
                    <div class='col-auto close button' style='display: none'>
                        <button class='btn btn-success' data-bs-dismiss='modal' type='button'><i
                                    class='far fa-arrow-right'></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`).appendTo($("body"));
    _modal = new bootstrap.Modal('#loadingModal' + this._id, {focus: true, backdrop: 'static', keyboard: false});

    options = {
        icon: 1,
        message: "Carregou com sucesso!",
        autoSkip: 0,
        callback: () => {
        },
    };
    _isLoading = true;
    isModalOpening = false;
    isModalOpened = false;

    isModalClosing = false;
    isModalClosed = true;

    isFinishing = false;
    isFinished = false;

    start(message) {
        this._el.find(".icon").html("<i class='far fa-spin fa-spinner fa-2x'></i>");
        this._el.find(".text").html(`<span>${(message)}</span>`);
        this._el.find(".hide").show();
        this._el.find(".button").hide().attr('href', '');
        this.showModal();
    }

    showModal() {
        this.isModalOpening = true
        if (!this.isFinished) {
            if (this.isModalClosed) {
                this._modal.show();
                this._el.one("shown.bs.modal", () => {
                    this.handleEvent("modalOpened");
                })
            }
        }
    }

    hideModal() {
        this.isModalClosing = true;
        if (this.isModalOpened) {
            this._modal.hide();
            this._el.one("hidden.bs.modal", () => {
                this.handleEvent("modalClosed");
                if (this.isFinishing) {
                    this.handleEvent("finish");
                }
            })
        }

    }

    handleEvent(e) {
        switch (e) {
            case "modalOpened":
                this.isModalOpened = true;
                this.isModalOpening = false;
                if (this.isModalClosing) {
                    this.hideModal();
                }
                break;
            case "modalClosed":
                this.isModalClosing = false;
                this.isModalClosed = true;
                if (this.isModalOpening) {
                    this.showModal();
                }
                break;
            case "finish":
                this.isFinished = true;
                this.options.callback();
                this.selfDestroy();

                break;
        }
    }

    selfDestroy() {
        this._modal.dispose();
        this._el.remove();

    }

    finish(options = {
        icon: 1, message: "Carregou com sucesso!", callback: () => {
        }, autoSkip: 0
    }) {
        options = {

            icon: 1,
            message: "Carregou com sucesso!",
            callback: () => {
            },
            autoSkip: 0,

            ...options
        }

        let i = '';
        switch (options.icon) {
            default:
                i = "<i class='far fa-spin fa-spinner fa-2x'></i>";
                break;
            case 1:
            case true:
            case 'success':
                i = "<i class='text-success far fa-check fa-2x'></i>"
                break;

            case 2:
            case false:
            case 'danger':
                i = "<i class='text-danger far fa-x fa-2x'></i>"
                break;
            case 'info':
                i = "<i class='text-info far fa-info fa-2x'></i>"
                break;
            case 3:
            case 'warning':
            case 'alert':
                i = "<i class='text-warning far fa-triangle-exclamation fa-2x'></i>"
                break;
        }

        this._el.find(".icon").html(i);
        this._el.find(".text").html(`<span>${(options.message)}</span>`);

        this.options.callback = options.callback;
        // todo fix timeout aki
        if (options.autoSkip) {
            setTimeout(async () => {
                this.isFinishing = true;
                await this.hideModal();
            }, options.autoSkip);
        } else {
            this._el.find(".button").show();
            this._el.find(".button .btn").one('click', () => {
                this.isFinishing = true;
                this.hideModal();
            });
        }

    }

}

