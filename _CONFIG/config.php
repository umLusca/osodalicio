<?php
$dir = __DIR__;
$folders = explode(DIRECTORY_SEPARATOR, $dir);
foreach ($folders as $folder) {
    if (str_contains($folder, 'datalyte')) {
        $site = $folder;
    }
}


//WebHook Key
$_CONFIG["WK"] = "";

$_CONFIG["TPK"] = "TEST-9b503f80-73ca-4db1-ad72-30375fd61afb";
$_CONFIG["TAT"] = "TEST-7185865758372727-100215-e8dcaedcf78ab59860488a4120040ddf-152546527";


$_CONFIG["PK"] = ""; //Production Public Key
$_CONFIG["AT"] = ""; //Production Access Token

define("PUBLIC_KEY", $_CONFIG["TPK"]);
define("ACCESS_TOKEN", $_CONFIG["TAT"]);
define("WEBHOOK_KEY", $_CONFIG["WK"]);



ini_set("memory_limit", "128M");
