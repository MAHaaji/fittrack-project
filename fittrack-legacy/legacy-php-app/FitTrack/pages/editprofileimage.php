<?php
    $pageTitle = "Upload Profile Image";
?>

<main id="pageEditprofileimage" class="py-5">
    <div class="container">
        <h1>Update Profile Photo</h1>

        <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
                $allowed_mime = array('image/gif', 'image/jpeg', 'image/png');
                if (!in_array($_FILES['photo']['type'], $allowed_mime)) {
                    echo '<div class="alert alert-danger" role="alert">Only GIF, JPEG, and PNG files are allowed.</div>';
                } else {

                    $random = substr(str_shuffle(MD5(microtime())), 0, 10);
                    $new_filename = $random . $_FILES['photo']['name'];

                    if (move_uploaded_file($_FILES["photo"]["tmp_name"], __DIR__.'/../uploads/users/'.$new_filename)) {
                        $User = new User($Conn);
                        $User->updateUserProfilePhoto($new_filename);
                        echo '<div class="alert alert-success" role="alert">Profile photo updated.</div>';
                    } else {
                        echo '<div class="alert alert-danger" role="alert">There was an error moving the file. Only GIF, JPEG, and PNG files are allowed.</div>';
                    }
                }
            } else {
                if ($_FILES['photo']['error'] !== UPLOAD_ERR_NO_FILE) {
                    echo '<div class="alert alert-danger" role="alert">There was an error uploading your file.</div>';
                } else {
                    echo '<div class="alert alert-warning" role="alert">No file chosen.</div>';
                }
            }
        }
        ?>

        <form method="post" action="" enctype="multipart/form-data">
            <div class="form-group pt-3">
                <input type="file" class="form-control-file" name="photo" id="photo">
            </div>
            <button type="submit" class="btn btn-success mt-4">Update Profile Photo</button>
            <a class="btn btn-danger mt-4" href="index.php?p=account">Cancel</a>
        </form>
    </div>
</main>
