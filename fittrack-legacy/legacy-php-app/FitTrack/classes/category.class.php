<?php
	class Category {
        protected $Conn;

        public function __construct($Conn) {
            $this->Conn = $Conn;

	}
    public function getAllCategories() {
        $query = "SELECT * FROM activity_categories";
        $stmt = $this->Conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getCategoryData($id) {
        $query = "SELECT * FROM activity_categories WHERE category_id = :category_id";
        $stmt = $this->Conn->prepare($query);
        $stmt->execute([
            "category_id" => $id
        ]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
