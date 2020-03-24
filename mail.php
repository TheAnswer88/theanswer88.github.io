<?php

$mailTpl = file_get_contents('https://theanswer88.github.io/Email/Custom%20Upakovka/index.html');

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";

$emails = ['magicnity@gmail.com'];

foreach ($emails as $email) {
	mail($email, "Тема письма 1", $mailTpl, $headers);
}