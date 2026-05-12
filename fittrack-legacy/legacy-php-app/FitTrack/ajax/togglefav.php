<?php
session_start();
require_once(__DIR__.'/../includes/autoloader.php');
require_once(__DIR__.'/../includes/database.php');

if(isset($_SESSION['user_data'])){
    $activity_id = (int) $_POST['activity_id'];
    
    if($activity_id) {
        $Favourite = new Favourite($Conn);
    $toggle = $Favourite->toggleFavourite($_POST['activity_id']);
if($toggle) {
    echo json_encode(array(
        "success" => true,
        "reason" => "Activity was added to users favourites."
    ));
}else{
    echo json_encode(array(
        "success" => true,
        "reason" => "Activity was removed from users favourites."
    ));
}


        
    }else{
        echo json_encode(array(
            "success" => false,
            "reason" => "Activity ID not provided."
        ));
    }


}else{
    echo json_encode(array(
        "success" => false,
        "reason" => "User not logged in."
    ));
}

