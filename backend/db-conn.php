<?php
$conn = new mysqli("localhost", "root", "", "gms");
if ($conn->connect_error) {
  echo json_encode(["success" => false, "message" => "DB connection failed"]);
  exit;
}