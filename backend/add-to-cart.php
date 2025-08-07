<?php
// Allow requests from your frontend (React)
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "User not logged in"]);
    exit;
}

require 'db-conn.php'; 


$user_id = $_SESSION['user_id'];

$data = json_decode(file_get_contents("php://input"), true);
$product_id = $data['product_id'] ?? null;
$quantity = $data['quantity'] ?? 1;

if (!$product_id || $quantity <= 0) {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
    exit;
}

$checkQuery = "SELECT id, quantity FROM cart WHERE user_id = ? AND product_id = ?";
$stmt = $conn->prepare($checkQuery);
$stmt->bind_param("ii", $user_id, $product_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $newQty = $row['quantity'] + $quantity;

    $updateQuery = "UPDATE cart SET quantity = ? WHERE id = ?";
    $updateStmt = $conn->prepare($updateQuery);
    $updateStmt->bind_param("ii", $newQty, $row['id']);
    $updateStmt->execute();

    echo json_encode(["success" => true, "message" => "Cart updated"]);
} else {
    $insertQuery = "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)";
    $insertStmt = $conn->prepare($insertQuery);
    $insertStmt->bind_param("iii", $user_id, $product_id, $quantity);
    $insertStmt->execute();

    echo json_encode(["success" => true, "message" => "Item added to cart"]);
}
?>
