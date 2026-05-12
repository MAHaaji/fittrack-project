<?php
    if (isset($_SESSION['user_data'])) {
        // redirect to home page
        header("Location: index.php?p=home");
        exit();
    }
    $pageTitle = "Register";
    $createUser = false
?>

<main id="pageRegister" class="py-5">
    <div class="container">
        <h1 class="pb-2">Register</h1>
        <?php
            $User = new User($Conn);
            $error = '';
            if ($_POST) {
                // Check if 'reg' exists in the $_POST array
                if (isset($_POST['reg']) && $_POST['reg']) {
                    // Registration form submitted
                    if (!$_POST['first_name']) {
                        $error = "Please provide your first name";
                    } else if (!$_POST['last_name']) {
                        $error = "Please provide your last name";
                    } else if (!isset($_POST['email']) || !$_POST['email']) {
                        $error = "Email not set";
                    } else if(!$_POST['password']) {
                        $error = "Password not set";
                    } else if(!$_POST['password_confirm']) {
                        $error = "Confirm password not set";
                    } else if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
                        $error = "Email address is not valid";
                    } else if ($_POST['password'] !== $_POST['password_confirm']) {
                        $error = "Password and Confirm Password do not match";
                    } else if (strlen($_POST['password']) < 8) {
                        $error = "Password must be at least 8 characters in length";
                    }
                    if($error) {
                        ?>
                        <div class="alert alert-danger" role="alert">
                            <?php echo $error; ?>
                        </div>
                        <?php
                    } else {
                        $existing = $User->checkExisting($_POST['email']);
                        if($existing) {
                            ?>
                                <div class="alert alert-danger" role="alert">
                                    This email is already in use. Please use a different one.
                                </div>
                            <?php
                        } else {
                            // Register user
                            $createUser = $User->createUser($_POST);
                            if ($createUser) {
                                ?>
                                <div class="alert alert-success" role="alert">
                                    User created - please <a href="javascript:void();" data-bs-toggle="modal" data-bs-target="#loginModal">login</a>!
                                </div>
                                <?php
                            } else {
                            ?>
                                <div class="alert alert-danger" role="alert">
                                    An error occurred, please try again later.
                                </div>
                            <?php
                            }
                        }
                    }
                }
            }
        if (!$createUser) {
        ?>
        <div class="row">
            <div class="col-md-4">
                <form id="registration-form"  method="post" action="">
                    <div class="form-group pb-2">
                        <label for="reg_first_name">First name</label>
                        <input type="text" class="form-control pb-2" id="reg_first_name" name="first_name" value="<?php echo $_POST['first_name'] ?? ''; ?>">
                    </div>
                    <div class="form-group pb-2">
                        <label for="reg_last_name">Last name</label>
                        <input type="text" class="form-control pb-2" id="reg_last_name" name="last_name" value="<?php echo $_POST['last_name'] ?? ''; ?>">
                    </div>
                    <div class="form-group pb-2">
                        <label for="reg_email">Email address</label>
                        <input type="email" class="form-control pb-2" id="reg_email" name="email" value="<?php echo $_POST['email'] ?? ''; ?>">
                    </div>
                    <div class="form-group pb-2">
                        <label for="reg_password">Password</label>
                        <input type="password" class="form-control pb-2" id="reg_password" name="password" value="">
                    </div>
                    <div class="form-group pb-2">
                        <label for="reg_password_confirm">Confirm Password</label>
                        <input type="password" class="form-control pb-2" id="reg_password_confirm" name="password_confirm" value="">
                    </div>
                    <button type="submit" name="reg" value="1" class="btn btn-primary">Register</button>
                </form>
                <p class="text-muted small mt-5">Already registered? <a href="javascript:void();" data-bs-toggle="modal" data-bs-target="#loginModal">Login</a>.</p>
            </div>
        </div>
        <?php } ?>
    </div>
</main>