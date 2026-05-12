<?php
    if (!isset($_SESSION['is_loggedin']) && !$_SESSION['is_loggedin']) {
        // redirect to home page
        header("Location: index.php?p=home");
        exit();
    }
    $pageTitle = "Account";
?>
<main id="pageAccount" class="py-5">
    <div class="container">

        <div class="row g-5 justify-content-between">
            <div class="col-md-6">
                <h1 class="mb-4 pb-2">My Account</h1>
                <p>Welcome to your account! You can view your favorite exercises and update your profile here.</p>
                <!-- User Image -->
                <div class="mb-4">
                    <?php if (isset($_SESSION['user_data']) && isset($_SESSION['user_data']['user_image']) && !empty($_SESSION['user_data']['user_image'])) { ?>
                    <img class="mb-3 rounded-circle account-profile-photo"  src="./uploads/users/<?php echo htmlspecialchars($_SESSION['user_data']['user_image']); ?>" />
                    <?php } else { ?>
                        <img class="mb-3 rounded-circle account-profile-photo" src="default-profile.png" alt="Default Profile Image" />
                    <?php } ?>
                    <p><a class="btn btn-primary" href="index.php?p=editprofileimage">Edit Profile Image</a></p>
                </div>

                <div>
                    <form id="profileForm" action="update_profile.php" method="post">
                        <!-- First Name -->
                        <div class="mb-3">
                            <label for="first_name" class="form-label">First Name</label>
                            <input type="text" class="form-control" id="first_name" name="first_name" value="<?php echo $user_data['first_name']; ?>" required>
                        </div>

                        <!-- Last Name -->
                        <div class="mb-3">
                            <label for="last_name" class="form-label">Last Name</label>
                            <input type="text" class="form-control" id="last_name" name="last_name" value="<?php echo $user_data['last_name']; ?>" required>
                        </div>

                        <!-- Email (Read-Only) -->
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" name="email" value="<?php echo $user_data['user_email']; ?>" readonly>
                        </div>

                        <!-- Submit Button -->
                         <div class="text-end">
                            <button type="submit" class="btn btn-primary">Update</button>
                         </div>
                    </form>
                </div>
            </div>
            <div class="col-md-4">
                <!-- User Favourites -->
                <h2 class="mb-4 ">My Favourites</h2>
                <div class="fav-activity">
                    <?php
                        // Check if the user is logged in and has favourites
                        if (isset($_SESSION['user_data']) && isset($_SESSION['user_data']['user_id'])) {
                            $Favourite = new Favourite($Conn);
                            $user_favs = $Favourite->getAllFavouritesForUser();

                            // Display the user's favourite exercises
                            if ($user_favs) {
                                foreach ($user_favs as $activity) {
                                ?>
                                <div class="row">
                                    <div class="card rounded-4 h-100 border-light d-flex">
                                        <img
                                            src="./activity-images/<?php echo $activity['activity_image']; ?>"
                                            class="card-img-top img-fluid"
                                            alt="<?php echo $activity['activity_name']; ?>">
                                        <div class="card-body text-center">
                                            <a href="index.php?p=activity&id=<?php echo $activity['activity_id']; ?>" class="stretched-link">
                                                <h3 class="card-title"><?php echo $activity['activity_name']; ?></h3>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <?php
                                }
                            } else {
                                echo 'No favourites added yet';
                            }
                        }
                    ?>
                </div>
            </div>
        </div>
    </div>
    <script>
        // Handle form submission using AJAX
        $('#profileForm').on('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = {
                action: 'updateProfile',
                first_name: formData.get('first_name'),
                last_name: formData.get('last_name')
            };

            $.ajax({
                url: './ajax/updateProfile.php',
                type: 'POST',
                data: JSON.stringify(data),
                success: function(response) {
                    var data = JSON.parse(response);
                    if (data.success) {
                        alert(data.message);
                        location.reload();
                    } else {
                        alert(data.message);
                        console.log(data)
                    }
                },
                error: function() {
                    alert('Error updating profile.');
                }
            });
        });
    </script>
</main>
