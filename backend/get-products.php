<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require 'db-conn.php'; 

$search = $_GET['search'] ?? '';
$category = $_GET['category'] ?? '';
$sort = $_GET['sort'] ?? '';

$maxPrice = $_GET['maxPrice'] ?? '1000'; 

$query = "SELECT * FROM products WHERE 1=1";


//search box
if (!empty($search)) {
    $safeSearch = $conn->real_escape_string($search);
    $query .= " AND name LIKE '%$safeSearch%'";
}

//category dropdown
if (!empty($category)) {
    $safeCategory = $conn->real_escape_string($category);
    $query .= " AND category = '$safeCategory'";
}

//order dropdown
if ($sort === 'asc' || $sort === 'desc') {
    $query .= " ORDER BY price $sort";
}

//max price range

$result = $conn->query($query);

$products = [];

while ($row = $result->fetch_assoc()) {
    $row['price'] = (float)$row['price'];
    $row['original_price'] = (float)$row['original_price'];
    $row['rating'] = (float)$row['rating'];
    $row['stock'] = (int)$row['stock'];
    $products[] = $row;
}

echo json_encode($products);
?>
