<?php
// ✅ 1. Handle preflight OPTIONS request early and exit
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    http_response_code(200);
    exit();
}

// ✅ 2. CORS headers for actual POST request
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// ✅ 3. Database credentials
$host = "localhost";
$user = "root";
$pass = "";
$db = "gms";

// ✅ 4. Connect to the database
require 'db-conn.php'; 


// ✅ 5. Parse incoming JSON data
$data = json_decode(file_get_contents("php://input"), true);

// ✅ 6. Validate input
$name = $data["name"] ?? null;
$email = $data["email"] ?? null;
$password = $data["password"] ?? null;

if (!$name || !$email || !$password) {
    http_response_code(400);
    echo json_encode(["message" => "Missing required fields"]);
    exit();
}

// ✅ 7. Check if email already exists
$check = $conn->prepare("SELECT id FROM users WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    http_response_code(409);
    echo json_encode(["message" => "Email already exists"]);
    exit();
}

// ✅ 8. Hash the password
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// ✅ 9. Insert new user
$stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $hashedPassword);

if ($stmt->execute()) {
    echo json_encode(["message" => "Signup successful"]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Signup failed"]);
}

// ✅ 10. Close DB connection
$conn->close();
?>
