<?php
class Activity {
 
    protected $Conn;
 
    public function __construct($Conn){
        $this->Conn = $Conn;
    }
 
    public function getAllActivities($category_id){        
        $query = "SELECT * FROM activities WHERE category_id = :category_id";
        $stmt = $this->Conn->prepare($query);
        $stmt->execute([
            "category_id" => $category_id
        ]);        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
 
    public function getActivities($activity_id){
        $query = "SELECT * FROM activities WHERE activity_id = :activity_id";
        $stmt = $this->Conn->prepare($query);
        $stmt->execute([
        "activity_id" => $activity_id
        ]);
        $activity_data = $stmt->fetch(PDO::FETCH_ASSOC);
        $query = "SELECT * FROM activity_images WHERE activity_id = :activity_id";
        $stmt = $this->Conn->prepare($query);
        $stmt->execute([
        "activity_id" => $activity_id
        ]);
        $activity_data['images'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $activity_data;
    }
    public function searchActivities($query_string) {
        $query = "SELECT * FROM activities WHERE activity_name LIKE :query_string";
        $stmt = $this->Conn->prepare($query);
        $stmt->execute([
        "query_string" => "%".$query_string."%"
       ]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
}