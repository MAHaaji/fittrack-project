<?php
	class User {
        protected $Conn;

        public function __construct($Conn) {
            $this->Conn = $Conn;

	}

    public function checkExisting($email) {
        $query = "SELECT * FROM users WHERE user_email = :user_email";
        $stmt = $this->Conn->prepare($query);
        $stmt->execute(array('user_email' => $email));
        $result = $stmt->fetch();
        if($result) {
            return true;
        } else {
            return false;
        }
    }

    public function createUser($user_data){
        $default_user = 'default_user.png';
        $sec_password = password_hash($user_data['password'], PASSWORD_DEFAULT);
        $query = "INSERT INTO users (first_name, last_name, user_email, user_pass, user_image) VALUES (:first_name, :last_name, :user_email, :user_pass, :user_image)";
        $stmt = $this->Conn->prepare($query);

        $result = $stmt->execute(array(
            'first_name' => $user_data['first_name'],
            'last_name' => $user_data['last_name'],
            'user_email' => $user_data['email'],
            'user_pass' => $sec_password,
            'user_image' => $default_user
        ));

        if($result) {
            return true;
        } else {
            return false;
        }
    }

    public function loginUser($user_data) {
        $query = "SELECT * FROM users WHERE user_email = :user_email";
        $stmt = $this->Conn->prepare($query);
        $stmt->execute(array('user_email' => $user_data['email']));
        $attempt = $stmt->fetch();

        if ($attempt && password_verify($user_data['password'], $attempt['user_pass'])) {
            return $attempt;
        } else {
            return false;
        }
    }

    public function getUser() {
        if (!isset($_SESSION)) {
            session_start();
        }

        if (isset($_SESSION['user_data']['user_id'])) {
            $query = "SELECT * FROM users WHERE user_id = :user_id";
            $stmt = $this->Conn->prepare($query);
            $stmt->execute(array(':user_id' => $_SESSION['user_data']['user_id']));
            return $stmt->fetch();
        } else {
            return false;
        }
    }

    public function processLogin() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $user_data = json_decode(file_get_contents('php://input'), true);

            if (!isset($user_data['email']) || !isset($user_data['password'])) {
                echo json_encode(['success' => false, 'message' => 'Invalid input.']);
                return;
            }

            $result = $this->loginUser($user_data);

            if ($result) {
                if (!isset($_SESSION)) {
                    session_start();
                }
                $_SESSION['user_data'] = $result;
                $_SESSION['is_loggedin'] = true;

                echo json_encode(['success' => true, 'message' => 'Login successful.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid email or password.']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
        }
    }


    public function updateUserProfilePhoto($file_name) {
        if (!isset($_SESSION)) {
            session_start();
        }

        if (isset($_SESSION['user_data']['user_id'])) {
            $query = "UPDATE users SET user_image = :user_image WHERE user_id = :user_id";
            $stmt = $this->Conn->prepare($query);

            $stmt->execute(array(
                'user_image' => $file_name,
                'user_id' => $_SESSION['user_data']['user_id']
            ));

            return true;
        } else {
            return false;
        }
    }

    public function updateUserData() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $user_data = json_decode(file_get_contents('php://input'), true);

            $first_name = $user_data['first_name'];
            $last_name = $user_data['last_name'];

            if (!empty($first_name) && !empty($last_name)) {
                $query = "UPDATE users SET first_name = :first_name, last_name = :last_name WHERE user_id = :user_id";
                $stmt = $this->Conn->prepare($query);

                $stmt->execute(array(
                    'first_name' => $first_name,
                    'last_name' => $last_name,
                    'user_id' => $_SESSION['user_data']['user_id']
                ));

                echo json_encode(['success' => true, 'message' => 'Profile Updated.']);

            } else {
                echo json_encode(['success' => false, 'message' => 'Name cannot be empty']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
        }
    }
}


