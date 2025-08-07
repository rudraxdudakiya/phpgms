  <?php
  header("Access-Control-Allow-Origin: http://localhost:5173");
  header("Access-Control-Allow-Credentials: true");
  header("Access-Control-Allow-Headers: Content-Type");
  header("Access-Control-Allow-Methods: POST, OPTIONS");

  if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
  }

  ini_set('display_errors', 1);
  error_reporting(E_ALL);

  session_start();
  header("Content-Type: application/json");

  if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit;
  }

  $data = json_decode(file_get_contents("php://input"), true);

  if (!isset($data['cart_id'])) {
    echo json_encode(["success" => false, "message" => "Cart ID missing"]);
    exit;
  }

  require 'db-conn.php'; 

  $user_id = $_SESSION['user_id'];
  $cart_id = intval($data['cart_id']);

  // Debug log
  file_put_contents("debug.txt", "UID: $user_id, CID: $cart_id\n", FILE_APPEND);

  $stmt = $conn->prepare("DELETE FROM cart WHERE user_id = ? AND id = ?");
  $stmt->bind_param("ii", $user_id, $cart_id);

  if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Item removed from cart"]);
  } else {
    echo json_encode(["success" => false, "message" => "Failed to remove item"]);
  }
  ?>
