<form class="modal fade" id="cepModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true" data-refresh="true" novalidate action="/API/account/update/" ajax>
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header border-0">
				<h1 class="modal-title fs-5">Complete seu Cadastro</h1>
			</div>
			<div class="modal-body">
				<div class="row mx-auto row-cols-1 g-3">
					<div>
						<div class="return alert m-0" style="display: none"></div>
					</div>

                    <div>
                        <label class="w-100 form-floating">
                            <input class="form-control inputTel" placeholder="Telefone" minlength="14" maxlength="15" type="text" inputmode="tel" name="telefone" required/>
                            <label>Telefone</label>
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
                    <div class="ceparea">
                        <div class="cepinputcontainer">
                            <label class="form-floating d-block" style="">
                                <input class="form-control form-control-lg inputCep" name='endCep' placeholder="Codigo postal ou CEP" required/>
                                <label>CEP</label>
                            </label>
                        </div>
                        <div class='completeAddress' style="display: none">
                            <div class="row g-2 mt-1">
                                <div class='col-9'>
                                    <label class='form-floating d-block'>
                                        <input class='form-control form-control-lg address' maxlength='100' name='endRua' placeholder="Endereço"/>
                                        <label>Endereço</label>
                                    </label>
                                </div>
                                <div class='col-3'>
                                    <label class='form-floating d-block'>
                                        <input class='form-control form-control-lg' maxlength='10' name='endNumero' placeholder="Número da casa"/>
                                        <label>Nº</label>
                                    </label>
                                </div>
                                <div class='col-12'>
                                    <label class='form-floating d-block'>
                                        <input class='form-control form-control-lg district' maxlength='50' name='endBairro' placeholder="Bairro"/>
                                        <label>Bairro</label>
                                    </label>
                                </div>
                                <div class='col-6'>
                                    <label class='form-floating d-block'>
                                        <input class='form-control form-control-lg state' maxlength='50' name='endEstado' placeholder="Estado"/>
                                        <label>Estado</label>
                                    </label>
                                </div>
                                <div class='col-6'>
                                    <label class='form-floating d-block'>
                                        <input class='form-control form-control-lg city' maxlength='50' name='endCidade' placeholder="Cidade"/>
                                        <label>Cidade</label>
                                    </label>
                                </div>
                                <div class='col-12'>
                                    <label class='form-floating d-block'>
                                        <input class='form-control form-control-lg' maxlength='100' name='endComplemento' placeholder="Complemento"/>
                                        <label>Complemento</label>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
				</div>
			</div>
			<div class="modal-footer border-0">
				<button type="submit" class="btn btn-primary">Salvar</button>
			</div>
		</div>
	</div>
</form>