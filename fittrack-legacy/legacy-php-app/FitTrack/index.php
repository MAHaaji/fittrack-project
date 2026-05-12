<?php 
error_reporting(E_ALL & ~E_NOTICE);
ini_set('display_errors', 'On');

session_start();
require_once(__DIR__.'/includes/autoloader.php');
require_once(__DIR__.'/includes/database.php');
// Check if 'user_data' exists in the session
if (!isset($_SESSION['user_data'])) {
    $_SESSION['user_data'] = null; // Initialize 'user_data' to avoid warnings
}

if ($_SESSION['user_data']) {
    $User = new User($Conn);
    $user_data = $User->getUser();
    $_SESSION['user_data'] = $user_data;
}

$page = isset($_GET['p']) ? $_GET['p'] : "home";
$pagePath = __DIR__ . '/pages/' . $page . '.php';

if (!file_exists($pagePath)) {
    $pagePath = __DIR__ . '/pages/404.php';
    $pageTitle = "Page Not Found";
}

ob_start();
require_once($pagePath);
$pageContent = ob_get_clean();

require_once(__DIR__ . '/includes/header.php');
echo $pageContent;
require_once(__DIR__ . '/includes/loginModal.php');
require_once(__DIR__ . '/includes/footer.php');

