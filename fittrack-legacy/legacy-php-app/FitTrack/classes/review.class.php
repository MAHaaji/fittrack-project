<?php
class Review {
    protected $Conn;

    public function __construct($Conn){
        $this->Conn = $Conn;
    }
    public function saveReview($review_data) {
        // Check if a review exists for the user and activity
        $checkQuery = "SELECT COUNT(*) FROM reviews WHERE user_id = :user_id AND activity_id = :activity_id";
        $checkStmt = $this->Conn->prepare($checkQuery);
        $checkStmt->execute(array(
            'user_id' => $_SESSION['user_data']['user_id'],
            'activity_id' => $review_data['activity_id']
        ));
        $exists = $checkStmt->fetchColumn();

        if ($exists) {
            // Update the existing review
            $updateQuery = "UPDATE reviews SET review_rating = :review_rating, review = :review WHERE user_id = :user_id AND activity_id = :activity_id";
            $updateStmt = $this->Conn->prepare($updateQuery);
            return $updateStmt->execute(array(
                'user_id' => $_SESSION['user_data']['user_id'],
                'activity_id' => $review_data['activity_id'],
                'review_rating' => $review_data['review_rating'],
                'review' => $review_data['review']
            ));
        } else {
            // Insert a new review
            $insertQuery = "INSERT INTO reviews (user_id, activity_id, review_rating, review) VALUES (:user_id, :activity_id, :review_rating, :review)";
            $insertStmt = $this->Conn->prepare($insertQuery);
            return $insertStmt->execute(array(
                'user_id' => $_SESSION['user_data']['user_id'],
                'activity_id' => $review_data['activity_id'],
                'review_rating' => $review_data['review_rating'],
                'review' => $review_data['review']
            ));
        }
    }

    public function calculateRating($activity_id) {
        $query = "SELECT AVG(review_rating) AS avg_rating FROM reviews WHERE activity_id = :activity_id";
        $stmt = $this->Conn->prepare($query);
        $stmt->execute(array(
            'activity_id' => $activity_id,
        ));
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getReviewsByActivity($activity_id) {
        $query = "
        SELECT r.review_rating, r.review, u.first_name, u.last_name, u.user_image
        FROM reviews r
        LEFT JOIN users u
        ON r.user_id = u.user_id
        WHERE r.activity_id = :activity_id";
        $stmt = $this->Conn->prepare($query);
        $stmt->execute(array(
            'activity_id' => $activity_id,
        ));
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getReviewByUser($user_id, $activity_id) {
        $query = "SELECT * FROM reviews WHERE user_id = :user_id AND activity_id = :activity_id";
        $stmt = $this->Conn->prepare($query);
        $stmt->execute(array(
            'user_id' => $user_id,
            'activity_id' => $activity_id,
        ));
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}

