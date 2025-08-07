<?php
// update-cart-quantity.php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Credentials: true');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    exit(0);
}

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

ini_set('display_errors', 0);
error_reporting(0);

session_start();

require 'db-conn.php';

if (!isset($conn) || $conn->connect_errno) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['cart_id']) || !isset($input['quantity'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

$cart_id = $input['cart_id'];
$quantity = $input['quantity'];

if (!is_int($quantity) || $quantity < 1) {
    echo json_encode(['success' => false, 'message' => 'Quantity must be a positive integer']);
    exit;
}

$productQuery = $conn->prepare("SELECT product_id FROM cart WHERE id = ?");
if (!$productQuery) {
    echo json_encode(['success' => false, 'message' => 'Failed to prepare product query']);
    exit;
}
$productQuery->bind_param("i", $cart_id);
$productQuery->execute();
$productResult = $productQuery->get_result();
if ($productResult->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'Cart item not found']);
    exit;
}
$productRow = $productResult->fetch_assoc();
$product_id = $productRow['product_id'];
$productQuery->close();

$stockQuery = $conn->prepare("SELECT stock FROM products WHERE id = ?");
if (!$stockQuery) {
    echo json_encode(['success' => false, 'message' => 'Failed to prepare stock query']);
    exit;
}
$stockQuery->bind_param("i", $product_id);
$stockQuery->execute();
$stockResult = $stockQuery->get_result();
if ($stockResult->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'Product not found']);
    exit;
}
$stockRow = $stockResult->fetch_assoc();
$stock = $stockRow['stock'];
$stockQuery->close();

if ($quantity > $stock) {
    echo json_encode(['success' => false, 'message' => 'Requested quantity exceeds available stock']);
    exit;
}

$stmt = $conn->prepare("UPDATE cart SET quantity = ? WHERE id = ?");
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Failed to prepare update statement']);
    exit;
}

$stmt->bind_param("ii", $quantity, $cart_id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Quantity updated successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to update quantity']);
}

$stmt->close();
$conn->close();
?>