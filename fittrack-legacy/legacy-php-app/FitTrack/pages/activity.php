<?php
session_start();
$Review = new Review($Conn);
$all_review_data = $Review->getReviewsByActivity($_GET['id']);
if ($_SESSION['user_data']) {
    $user_review_data = $Review->getReviewByUser($_SESSION['user_data']['user_id'], $_GET['id']);
}
$user_review = $user_review_data['review'] ?? null;
$user_rating = $user_review_data['review_rating'] ?? null;

if ((isset($_POST['rating']) && $_POST['rating']) || (isset($_POST['review']) && $_POST['review'])) {
    $user_review = $_POST['review'] ?? null;
    $user_rating = $_POST['rating'] ?? null;
    $Review->saveReview([
        "activity_id" => (int) $_GET['id'],
        "review_rating" => $user_rating,
        "review" => $user_review
    ]);
}

$Activity = new Activity($Conn);
$activity_data = $Activity->getActivities($_GET['id']);

$pageTitle = "Activity";
?>

<main id="pageActivity" class="py-5">
    <div class="container">
        <h1 class="mb-4 pb-2"><?php echo $activity_data['activity_name']; ?></h1>
        <div class="row g-4">
            <div class="col-lg-12">
                    <!-- Activity Images Section -->
                    <?php if (!empty($activity_data['images'])) { ?>
                    <div class="row">
                        <div class="activity-header">
                            <div class="activity-cover p-0">
                                <img src="./activity-images/<?php echo $activity_data['activity_image']; ?>" alt="Activity Image">
                                <!-- Activity Features -->
                                <ul class="list-unstyled mb-4 activity-meta">
                                    <?php
                                        $Review = new Review($Conn);
                                        $avg_rating_data = $Review->calculateRating($_GET['id'] ?? null);
                                        $avg_rating = $avg_rating_data['avg_rating'] ?? null;
                                        $avg_rating = is_numeric($avg_rating) ? round($avg_rating, 1) : null;
                                    ?>
                                    <li class="mb-2">
                                        <i class="fas fa-star text-warning me-2"></i>
                                        <strong><?php echo $avg_rating ? $avg_rating . ' Stars' : 'No Rating'; ?></strong> 
                                    </li>
                                    <li class="mb-2">
                                        <i class="far fa-clock text-muted me-2"></i>
                                        <?php echo $activity_data['activity_time'] ?? 'N/A'; ?>
                                    </li>
                                    <li class="mb-2">
                                        <i class="fas fa-users text-muted me-2"></i>
                                        <?php echo $activity_data['activity_people'] ?? 'N/A'; ?> people
                                    </li>
                                    <li class="mb-2">
                                        <i class="fas fa-dollar-sign text-muted me-2"></i>
                                        <?php echo $activity_data['activity_price'] ?? 'N/A'; ?>
                                    </li>
                                    <li class="mb-2">
                                        <i class="fas fa-tags text-muted me-2"></i>
                                        <?php echo $activity_data['activity_tags'] ?? 'N/A'; ?>
                                    </li>
                                </ul>
                            </div>
                            <!-- Favorite Button -->
                            <?php
                            $Favourite = new Favourite($Conn);
                            $is_fav = $Favourite->isFavourite($_GET['id']);
                            if (isset($_SESSION['is_loggedin']) && $_SESSION['is_loggedin']) {
                            ?>
                            <button id="<?php echo $is_fav ? 'removeFav' : 'addFav'; ?>"
                                    type="button"
                                    class="btn btn-<?php echo $is_fav ? 'danger' : 'primary'; ?> add-to-fav"
                                    data-activityid="<?php echo $_GET['id']; ?>">
                                <?php echo $is_fav ? 'Remove from favourites' : 'Add to favourites'; ?>
                            </button>
                            <?php } else {?>
                                <a class="btn text-white btn-success btn-login add-to-fav" href="javascript:void()" data-bs-toggle="modal" data-bs-target="#loginModal">Add to favourites</a>
                            <?php }?>
                        </div>
                    </div>
                    <?php } ?>
                    <!-- Activity Details Section -->
                    <div class="activity-body px-2 py-4">
                        <p class="mb-4"><?php echo nl2br($activity_data['activity_instructions']); ?></p>
                    </div>
            </div>
        </div>


        <!-- Review Section -->
        <h2>Leave a review</h2>
        <?php
        if (isset($_SESSION['is_loggedin']) && $_SESSION['is_loggedin']) {

            if (!empty($user_review) || !empty($user_rating)) {
        ?>
            <p>You already gave a review. Changed your mind? Feel free to update it!</p>
            <?php } ?>
            <form action="" method="post">
                <div class="row">
                    <div class="form-group col-md-9">
                        <label for="review" class="d-inline-block mb-2">Review</label><br>
                        <textarea id="review" class="review-message" name="review"><?php echo $user_review; ?></textarea>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="rating" class="d-inline-block mb-2">Rating</label><br>
                        <select class="form-control" id="rating" name="rating">
                            <option value="1" <?php echo $user_rating == 1 ? 'selected' : ''; ?>>1 Star (Very bad)</option>
                            <option value="2" <?php echo $user_rating == 2 ? 'selected' : ''; ?>>2 Star (Bad)</option>
                            <option value="3" <?php echo $user_rating == 3 ? 'selected' : ''; ?>>3 Star (Okay)</option>
                            <option value="4" <?php echo $user_rating == 4 ? 'selected' : ''; ?>>4 Star (Good)</option>
                            <option value="5" <?php echo $user_rating == 5 ? 'selected' : ''; ?>>5 Star (Very Good)</option>
                        </select>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary mt-3"><?php echo !empty($user_review_data['review']) ? 'Update review' : 'Add review' ?></button>
            </form>
        <?php } else { ?>
            <p><a class="btn-login" href="javascript:void()" data-bs-toggle="modal" data-bs-target="#loginModal">Login</a> to add your review. </p>
        <?php
        }
        if ($all_review_data) { ?>
        <h2 class="mt-5 mb-3">What people say</h2>
        <?php ?>
        <div class="row g-3 m-0">
            <?php
            foreach ($all_review_data as $review) {
                $full_name = $review['first_name'] . ' ' . $review['last_name'];
            ?>
            <div class="col-md-4 d-flex">
                <div class="px-4 py-3 rounded-3 d-flex flex-grow-1 align-items-start gap-3 review-card">
                    <?php
                        $user_image = !empty($review['user_image']) ? $review['user_image'] : 'default_user.png';
                    ?>
                    <img src="./uploads/users/<?php echo $user_image; ?>"
                    alt="<?php echo $full_name; ?>"
                    class="rounded-circle review-user-img">
                    <div>
                        <p><i>"<?php echo $review['review']; ?>"</i> - <strong><?php echo $full_name; ?></strong></p>
                        <span>
                            <?php for ($x = 0; $x < $review['review_rating']; $x++) { ?>
                                <i class="fas fa-star text-warning"></i>
                            <?php } ?>
                        </span>
                    </div>
                </div>
            </div>
            <?php } ?>
        </div>
        <?php } ?>
    </div>
    <script src="./js/activity_fav.js"></script>
</main>
