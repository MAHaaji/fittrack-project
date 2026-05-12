<?php
session_start();
require_once(__DIR__.'/../includes/autoloader.php');
require_once(__DIR__.'/../includes/database.php');

$User = new User($Conn);

$input = json_decode(file_get_contents('php://input'), true);

// Check if the action is login
if (isset($input['action']) && $input['action'] === 'login') {
    $User->processLogin();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid action.']);
}

?>