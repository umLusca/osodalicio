<?php

$search = postreat("search");

$valor = str_replace(" ", "%", $search);
$valor = "%$valor%";

$c = con();

$q = $c->prepare("SELECT news.uid,news.hash,news.titulo,news.nomeOriginal FROM news                   
         WHERE nomeOriginal like ? OR titulo like ? group by news.id order by news.id desc");
$q->execute([$valor, $valor]);

if ($q->rowCount()) {
	$return["status"] = 200;
	$return["msg"] = "";
	$return["data"] = $q->fetchAll(2);


} else {
	$return["status"] = 200;
	$return["data"] = [];
	$return["msg"] = "Nada encontrado...";
}

