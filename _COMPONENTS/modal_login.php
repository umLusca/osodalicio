<form class="modal fade " id="loginModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true" data-refresh="true" novalidate action="/API/account/login/" ajax>
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header border-0">
				<h1 class="modal-title fs-5" id="staticBackdropLabel">Fazer Login</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="row mx-auto row-cols-1 g-3">
					<div>
						<div class="return alert m-0" style="display: none"></div>
					</div>
					<div>
						<label class="w-100 form-floating">
							<input class="form-control" placeholder="Login" name="login" type="text" maxlength="255" required/>
							<label>Email</label>
						</label>
					</div>
					<div>
						<label class="w-100 form-floating">
							<input class="form-control" placeholder="Senha" name="password" type="password" maxlength="128" minlength="8" required/>
							<label>Senha</label>
						</label>
					</div>
				</div>
			</div>
			<div class="modal-footer border-0">
				<button type="submit" class="btn btn-primary">Entrar</button>
			</div>
		</div>
	</div>
</form>


<form class="modal fade " id="registerModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true" data-refresh="true" novalidate action="/API/account/create/" ajax>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header border-0">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Fazer Login</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row mx-auto row-cols-1 g-3">
                    <div>
                        <div class="return alert m-0" style="display: none"></div>
                    </div>
                    <div>
                        <label class="w-100 form-floating">
                            <input class="form-control" placeholder="Nome" name="name" type="text" maxlength="100" required/>
                            <label>Nome</label>
                        </label>
                    </div>
                    <div>
                        <label class="w-100 form-floating">
                            <input class="form-control" placeholder="Login" name="login" type="email" maxlength="255" required/>
                            <label>Email</label>
                        </label>
                    </div>
                    <div>
                        <label class="w-100 form-floating">
                            <input class="form-control" placeholder="Senha" name="password" type="password" maxlength="128" minlength="8" required/>
                            <label>Senha</label>
                        </label>
                    </div>
                    <div>
                        <label class="w-100 form-floating">
                            <input class="form-control" placeholder="Senha" name="cpassword" type="password" maxlength="128" minlength="8" required/>
                            <label>Confirmar Senha</label>
                        </label>
                    </div>
                </div>
            </div>
            <div class="modal-footer border-0">
                <button type="submit" class="btn btn-primary">Entrar</button>
            </div>
        </div>
    </div>
</form>
