<?php

$method = $_SERVER['REQUEST_METHOD'];

//Script Foreach
$c = true;
if ( $method === 'POST' ) {
    
    $phone = trim(mysqli_real_escape_string($_POST['phone']));
    $name = trim(mysqli_real_escape_string($_POST['name']));
    $email = trim(mysqli_real_escape_string($_POST['email']));
    $mes = trim(mysqli_real_escape_string($_POST['message']));
    $check = trim(mysqli_real_escape_string($_POST['agreement']));
    

	foreach ( $_POST as $key => $value ) {
        if($value != "" && $key != "agreement"){
            $message .= "
                " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
                </tr>
                ";
            
        }
	}
} 

$message = "<table style='width: 100%;'>$message</table>";

function adopt($text) {
	return '=?UTF-8?B?'.Base64_encode($text).'?=';
}

$headers = "MIME-Version: 1.0" . PHP_EOL .
"Content-Type: text/html; charset=utf-8" . PHP_EOL .
'From: '.adopt($project_name).' <'.$admin_email.'>' . PHP_EOL .
'Reply-To: '.$admin_email.'' . PHP_EOL;

mail('manager.ua.online@gmail.com', 'Отправили форму(картины)', $message, $headers );


exit();