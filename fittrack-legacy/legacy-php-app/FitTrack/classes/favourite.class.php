<?php
class Favourite {
    protected $Conn;

    public function __construct($Conn){
        $this->Conn = $Conn;
    }
    public function isFavourite($activity_id){
        if (!isset($_SESSION['user_data']['user_id'])) {
            // Return false if no user is logged in.
            return false;
        }
        $query = "SELECT * FROM user_favourites WHERE user_id = :user_id AND activity_id = :activity_id";
        $stmt = $this->Conn->prepare($query);
        $stmt->execute([
            "user_id" => $_SESSION['user_data']['user_id'],
            "activity_id" => $activity_id
        ]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    public function toggleFavourite($activity_id){
        if (!isset($_SESSION['user_data']['user_id'])) {
            throw new Exception("User not logged in.");
        }
        // Check if activity is already favourite
        $is_favourite = $this->isFavourite($activity_id);

        if($is_favourite) {
            // Is already favourite - so remove.
            $query = "DELETE FROM user_favourites WHERE user_fav_id = :user_fav_id";
            $stmt = $this->Conn->prepare($query);
            $stmt->execute([
                "user_fav_id" => $is_favourite['user_fav_id']
            ]);
            return false; // Return false for "removed"
        }else{
            // Is not favourite - so add
            $query = "INSERT INTO user_favourites (user_id, activity_id) VALUES (:user_id, :activity_id)";
            $stmt = $this->Conn->prepare($query);


            return $stmt->execute([
                "user_id" => $_SESSION['user_data']['user_id'],
                "activity_id" => $activity_id
            ]);
        }
        
}
public function getAllFavouritesForUser() {
    if (!isset($_SESSION['user_data']) || !isset($_SESSION['user_data']['user_id'])) {
        // Handle the case where the session data is missing
        throw new Exception("User data is not available in the session.");
    }

    $query = "SELECT * FROM user_favourites 
              LEFT JOIN activities ON user_favourites.activity_id = activities.activity_id 
              WHERE user_favourites.user_id = :user_id";
    $stmt = $this->Conn->prepare($query);
    $stmt->execute([
        "user_id" => $_SESSION['user_data']['user_id']
    ]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

}