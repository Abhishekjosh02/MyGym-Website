<?php
// Database connection
$host = 'localhost';
$username = 'root'; // default XAMPP username
$password = '';     // default XAMPP has no password
$dbname = 'gym_db';

$conn = new mysqli($host, $username, $password, $dbname);

// Check DB connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Sanitize form data
$name = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$age = (int)$_POST['age'];
$plan = $_POST['plan'];
$payment_method = $_POST['paymentMethod'];

$card_number_last4 = null;
$upi_id = null;

if ($payment_method === 'card') {
    $card_number = $_POST['cardNumber'];
    $card_number_last4 = substr(preg_replace('/\D/', '', $card_number), -4); // store only last 4 digits
} elseif ($payment_method === 'upi') {
    $upi_id = htmlspecialchars($_POST['upiId']);
}

// Prepared statement to insert data
$stmt = $conn->prepare("INSERT INTO members (name, email, age, plan, payment_method, card_number_last4, upi_id)
                        VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssissss", $name, $email, $age, $plan, $payment_method, $card_number_last4, $upi_id);

if ($stmt->execute()) {
    echo "<h2 style='text-align:center; color:green;'>✅ Registration successful!</h2>";
    echo "<p style='text-align:center;'>Thank you, <strong>" . $name . "</strong>, for joining our gym.</p>";
} else {
    echo "<h2 style='text-align:center; color:red;'>❌ Error saving your information.</h2>";
    echo "Details: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
