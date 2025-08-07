<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"));

if (isset($data->email) && filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
    $email = $data->email;

    file_put_contents("subscribers.txt", $email . PHP_EOL, FILE_APPEND);

    echo json_encode(["message" => "✅ Subscribed successfully!"]);
} else {
    echo json_encode(["message" => "❌ Invalid email address."]);
}
?>
