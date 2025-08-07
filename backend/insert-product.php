<?php
$data = json_decode(file_get_contents("products.json"), true);

require 'db-conn.php'; 

foreach ($data as $item) {
    $stmt = $conn->prepare("INSERT INTO products (id, category, name, price, original_price, image, rating, stock, about) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param(
        "issddsdiss",
        $item["id"],
        $item["category"],
        $item["name"],
        $item["price"],
        $item["original_price"],
        $item["image"],
        $item["rating"],
        $item["stock"],
        $item["about"]
    );
    $stmt->execute();
}

echo "Products inserted successfully.";
