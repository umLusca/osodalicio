<?php

/**
 * @throws \Random\RandomException
 */
function gerarToken($tamanho, $verify = true): string
{
    return random_bytes($tamanho);

}

function uuid(): string
{
    if (function_exists('com_create_guid') === true)
    {
        return trim(com_create_guid(), '{}');
    }

    return vsprintf('%s%s-%s-4000-8%.3s-%s%s%s0',str_split(dechex( microtime(true) * 1000 ) . bin2hex( random_bytes(8) ),4));
}
