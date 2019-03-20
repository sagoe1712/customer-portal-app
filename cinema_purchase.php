<?php

$signature = $_POST['signature'];
$quantity = $_POST['quantity'];
$price = $_POST['price'];
$email= $_POST['email'];
$phone_no= $_POST['phone_no'];



$url = 'http://rewardsboxnigeria.com/rewardsbox/api/v1/?api=cinema_purchase';
//$passcode = $_POST['passcode'];
//$token = $_POST['token'];
$token = 1000;
//$category_id = $_POST['category_id'];


$fields = array(
    'price'=>$price,
    'signature'=>$signature,
    'email'=>$email,
    'phone_no'=>$phone_no,
    'quantity'=>$quantity
);


//$token ="7e23ab97ec2c68e46f315bf37d2b5177";

$field_string = $fields;


$ch = curl_init();
$timeout = 30;
curl_setopt($ch, CURLOPT_URL, $url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($field_string));
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-type= application/json"));
curl_setopt($ch, CURLOPT_HTTPHEADER, array('token:'.$token));
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
$result = curl_exec($ch);
curl_close($ch);


$response = json_decode($result, true);

echo $result;

?>