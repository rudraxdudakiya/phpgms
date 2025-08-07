<?php
session_start();

// Handle preflight (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    exit(0);
}

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Handle logout via POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $_SESSION = [];
    session_destroy();

    // Clear cookies
    setcookie('emailcookie', '', time() - 3600, "/");
    setcookie('passwordcookie', '', time() - 3600, "/");
    setcookie('remember', '', time() - 3600, "/");
    setcookie('remembered_user', '', time() - 3600, "/");

    if (isset($_POST['logout'])) {
        echo '<script>alert("You Are Logged Out");</script>';
        exit;
    }

    echo json_encode(["message" => "Logout successful"]);
    exit;
}

http_response_code(405);
echo json_encode(["message" => "Method not allowed"]);
