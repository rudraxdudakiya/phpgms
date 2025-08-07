<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// ✅ CORS Headers - must be first
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// ✅ Handle OPTIONS preflight (for fetch with JSON)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ✅ Start session AFTER headers
session_start();

// ✅ Enable error reporting
ini_set('display_errors', 1);
error_reporting(E_ALL);

// ✅ Read and decode JSON input
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

// ✅ Input validation
if (!isset($data['email']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(["message" => "Missing email or password."]);
    exit;
}

$email = trim($data['email']);
$password = trim($data['password']);
$remember = isset($data['remember']) && $data['remember'];

// ✅ Connect to MySQL
require 'db-conn.php'; 


// ✅ Query for user
$stmt = $conn->prepare("SELECT id, password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {
    if (password_verify($password, $user['password'])) {
        // ✅ Set session
        $_SESSION['user_id'] = $user['id'];

        // ✅ Set "Remember Me" cookie (for 30 days)
        if ($remember) {
            setcookie("remembered_user", $email, time() + (86400 * 30), "/", "", false, true);
        } else {
            setcookie("remembered_user", "", time() - 3600, "/", "", false, true);
        }

        echo json_encode(["message" => "Login successful"]);
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Invalid password."]);
    }
} else {
    http_response_code(401);
    echo json_encode(["message" => "User not found."]);
}

$stmt->close();
$conn->close();
