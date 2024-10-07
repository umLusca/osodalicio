<?php

use PHPMailer\PHPMailer\PHPMailer;
use SendGrid\Mail\Mail;
use SendGrid\Mail\Personalization;
use SendGrid\Mail\To;
use SendGrid\Mail\TypeException;



function sendDynamic($ass,$emailid,$recipients,&$response = null){
    //Bem-vindo = d-79166e125f244201ac994810cdb83e85;
    //disparo = d-07aaf9920ed84195a1a63b46d221e98e

    $response = [];
    $email = new Mail();
    try {
        $sendgrid = new SendGrid($_ENV['SendGridAPI']);

        $email->setFrom('no-reply@datalyte.app', 'Datalyte Informa');
        $email->setSubject($ass);
        $email->setTemplateId($emailid);

    } catch (Exception $e){
        $response['retorno'] = $e;
        return false;
    }
    $falhas = [];
/*
    $recipients = [
        ['email' => 'example1@test.com', 'name' => 'Recipient 1', 'data' => ['first_name' => 'Alice', 'city' => 'Boston']],
        ['email' => 'example2@test.com', 'name' => 'Recipient 2', 'data' => ['first_name' => 'Bob', 'city' => 'Chicago']]
    ];
{
    'title': 'Campanha Mário Heinz',
    'body': 'Com a gente, você se mantém informado da nossa política de verdade',
    'unsub': 'https://datalyte.app/unsub/asdasd/asdasdasd/',
    'unlink': 'https://datalyte.app/unlink/asdasd/asdasdasd/'
}

{

    'first_name': 'Usuário',
    'last_name': '',
    'email': 'você',
    'ajudaURL': 'https://datalyte.app/ajuda',
    'termosURL': 'https://datalyte.app/termos',
    'privacidadeURL': 'https://datalyte.app/termos',
    'unlink': '',
    'unsub': ''
    }
*/
    foreach ($recipients as $recipient) {
        $personalization = new Personalization();
        $personalization->setSubject($ass);
        $personalization->addTo(new To($recipient['email'], $recipient['name']));
        foreach ($recipient['data'] as $key => $value) {
            $personalization->addDynamicTemplateData($key, $value);
        }
        $email->addPersonalization($personalization);
    }

    $response = ['falhas' => $falhas];

    try {
        $response['retorno'] = $sendgrid->send($email);
        if ($response['retorno']->statusCode() === 202) {
            return true;
        }
    } catch (Exception $e) {
        $response['retorno'] = $e;
    }
    return false;

}
function sendEmail($ass, $msg, array $to,&$response = null): bool
{
    $response = [];
    $email = new Mail();
    try {

        $email->setFrom('no-reply@datalyte.app', 'Datalyte');
        $email->setSubject($ass);

        $email->addContent('text/html', $msg);
        $sendgrid = new SendGrid($_ENV['SendGridAPI']);
    } catch (Exception $e){
        $response['retorno'] = $e;
        return false;
    }
    $falhas = [];

    foreach ($to as $recipient) {
        $personalization = new Personalization();
        try {
            $personalization->addTo(new To($recipient));
            $email->addPersonalization($personalization);
        } catch (Exception $e) {
            $falhas[] = ["email"=>$recipient,"mot"=>$e->getMessage()];
        }
    }

    $response = ["falhas" => $falhas];

    try {
        $response["retorno"] = $sendgrid->send($email);
        if ($response['retorno']->statusCode() === 202) {
            return true;
        }
    } catch (Exception $e) {
        $response["retorno"] = $e;
    }

    return false;
}


function emailHTML($title, $text, $linktext, $link)
{
    return '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
  <head>
    <!-- Compiled with Bootstrap Email version: 1.4.0 --><meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <style type="text/css">
      body,table,td{font-family:Helvetica,Arial,sans-serif !important}.ExternalClass{width:100%}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div{line-height:150%}a{text-decoration:none}*{color:inherit}a[x-apple-data-detectors],u+#body a,#MessageViewBody a{color:inherit;text-decoration:none;font-size:inherit;font-family:inherit;font-weight:inherit;line-height:inherit}img{-ms-interpolation-mode:bicubic}table:not([class^=s-]){font-family:Helvetica,Arial,sans-serif;mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;border-collapse:collapse}table:not([class^=s-]) td{border-spacing:0px;border-collapse:collapse}@media screen and (max-width: 600px){.w-full,.w-full>tbody>tr>td{width:100% !important}*[class*=s-lg-]>tbody>tr>td{font-size:0 !important;line-height:0 !important;height:0 !important}.s-2>tbody>tr>td{font-size:8px !important;line-height:8px !important;height:8px !important}.s-5>tbody>tr>td{font-size:20px !important;line-height:20px !important;height:20px !important}}
    </style>
  </head>
  <table class="bg-transparent container" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" bgcolor="transparent">
    <tbody>
      <tr>
        <td align="center" style="line-height: 24px; font-size: 16px; margin: 0; padding: 0 16px;" bgcolor="transparent">
          <!--[if (gte mso 9)|(IE)]>
            <table align="center" role="presentation">
              <tbody>
                <tr>
                  <td width="600">
          <![endif]-->
          <table align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; margin: 0 auto;">
            <tbody>
              <tr>
                <td style="line-height: 24px; font-size: 16px; margin: 0;" align="left">
                  <table class="bg-transparent container body" role="presentation" border="0" cellpadding="0" cellspacing="0" style="outline: 0; width: 100%; min-width: 100%; height: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Helvetica, Arial, sans-serif; line-height: 24px; font-weight: normal; font-size: 16px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; color: #000000; margin: 0; padding: 0; border-width: 0;" bgcolor="transparent">
                    <tbody>
                      <tr>
                        <td align="center" style="line-height: 24px; font-size: 16px; margin: 0; padding: 0 16px;" bgcolor="transparent">
                          <!--[if (gte mso 9)|(IE)]>
                            <table align="center" role="presentation">
                              <tbody>
                                <tr>
                                  <td width="600">
                          <![endif]-->
                          <table align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; margin: 0 auto;">
                            <tbody>
                              <tr>
                                <td style="line-height: 24px; font-size: 16px; margin: 0;" align="left">
                                </td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td valign="top" style="line-height: 24px; font-size: 16px; margin: 0;" align="left">
                                  <table class="s-5 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                    <tbody>
                                      <tr>
                                        <td style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; margin: 0;" align="left" width="100%" height="20">
                                          &#160;
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table class="card" role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-radius: 6px; border-collapse: separate !important; width: 100%; overflow: hidden; border: 1px solid #e2e8f0;" bgcolor="#ffffff">
                                    <tbody>
                                      <tr>
                                        <td style="line-height: 24px; font-size: 16px; width: 100%; margin: 0;" align="left" bgcolor="#ffffff">
                                          <table class="card-body" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                                            <tbody>
                                              <tr>
                                                <td style="line-height: 24px; font-size: 16px; width: 100%; margin: 0; padding: 20px;" align="left">
                                                  <h1 class="h3" style="padding-top: 0; padding-bottom: 0; font-weight: 500; vertical-align: baseline; font-size: 28px; line-height: 33.6px; margin: 0;" align="left">' . htmlentities($title) . '</h1>
                                                  <table class="s-2 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                                    <tbody>
                                                      <tr>
                                                        <td style="line-height: 8px; font-size: 8px; width: 100%; height: 8px; margin: 0;" align="left" width="100%" height="8">
                                                          &#160;
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  <table class="s-5 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                                    <tbody>
                                                      <tr>
                                                        <td style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; margin: 0;" align="left" width="100%" height="20">
                                                          &#160;
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  <table class="hr" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                                                    <tbody>
                                                      <tr>
                                                        <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; height: 1px; width: 100%; margin: 0;" align="left">
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  <table class="s-5 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                                    <tbody>
                                                      <tr>
                                                        <td style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; margin: 0;" align="left" width="100%" height="20">
                                                          &#160;
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  <div class="space-y-3">
                                                    <p class="text-gray-700" style="line-height: 24px; font-size: 16px; color: #4a5568; width: 100%; margin: 0;" align="left">' . htmlentities($text) . '</p>
                                                  </div>
                                                  <table class="s-5 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                                    <tbody>
                                                      <tr>
                                                        <td style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; margin: 0;" align="left" width="100%" height="20">
                                                          &#160;
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  <table class="hr" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                                                    <tbody>
                                                      <tr>
                                                        <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; height: 1px; width: 100%; margin: 0;" align="left">
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  <table class="s-5 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                                    <tbody>
                                                      <tr>
                                                        <td style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; margin: 0;" align="left" width="100%" height="20">
                                                          &#160;
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  <div class="text-center" style="" align="center">
                                                    <table class="btn btn-primary" role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-radius: 6px; border-collapse: separate !important;">
                                                      <tbody>
                                                        <tr>
                                                          <td style="line-height: 24px; font-size: 16px; border-radius: 6px; margin: 0;" align="center" bgcolor="#0d6efd">
                                                            <a href="' . $link . '" target="_blank" style="color: #ffffff; font-size: 16px; font-family: Helvetica, Arial, sans-serif; text-decoration: none; border-radius: 6px; line-height: 20px; display: block; font-weight: normal; white-space: nowrap; background-color: #0d6efd; padding: 8px 12px; border: 1px solid #0d6efd;">' . htmlentities($linktext) . '</a>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </div>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table class="s-5 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                    <tbody>
                                      <tr>
                                        <td style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; margin: 0;" align="left" width="100%" height="20">
                                          &#160;
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <!--[if (gte mso 9)|(IE)]>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                          <![endif]-->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <!--[if (gte mso 9)|(IE)]>
          </td>
        </tr>
      </tbody>
    </table>
          <![endif]-->
        </td>
      </tr>
    </tbody>
  </table>
</html>


';
}
