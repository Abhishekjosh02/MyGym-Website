<?php
header('Content-Type: application/json');

// Sample member database
$members = [
    101 => ["name" => "Amit Sharma", "lastPaid" => "2025-04-01", "nextDue" => "2025-05-01T00:00:00"],
    102=> ["name" => "Priya Mehra", "lastPaid" => "2025-04-10", "nextDue" => "2025-05-10T00:00:00"],
    103 => ["name" => "Rohan Patel", "lastPaid" => "2025-04-20", "nextDue" => "2025-05-10T00:00:00"],
    104 => ["name" => "Rohan Patel", "lastPaid" => "2025-04-20", "nextDue" => "2025-08-10T00:00:00"]
];

// Get member ID from GET parameter
if (!isset($_GET['memberId'])) {
    echo json_encode(["error" => "Member ID is required"]);
    exit;
}

$memberId = intval($_GET['memberId']);

if (!array_key_exists($memberId, $members)) {
    echo json_encode(["error" => "Member not found"]);
    exit;
}

echo json_encode($members[$memberId]);
?>