<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173'); 
header('Access-Control-Allow-Credentials: true');

require 'db-conn.php'; 

if (!isset($conn) || $conn->connect_errno) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

// Query distinct categories from products table
$sql = "SELECT DISTINCT category FROM products ORDER BY category ASC";
$result = $conn->query($sql);

if (!$result) {
    echo json_encode(['success' => false, 'message' => 'Query failed']);
    exit;
}

$categories = [];
while ($row = $result->fetch_assoc()) {
    $categories[] = $row['category'];
}

echo json_encode(['success' => true, 'categories' => $categories]);

$conn->close();
?>
