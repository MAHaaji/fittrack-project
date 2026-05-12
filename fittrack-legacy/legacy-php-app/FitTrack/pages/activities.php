<?php
$category_id = $_GET['id'];
if (empty($category_id)) {
    header('Location: index.php?p=categories');
}
$Activity = new Activity($Conn);
$activities = $Activity->getAllActivities($category_id);
$Category = new Category($Conn);
$category_data = $Category->getCategoryData($category_id);
$pageTitle = $category_data['category_name'];
?>

<main id="pageActivities">
    <div class="container py-5">
        <h1 class="mb-4 pb-2"><?php echo $category_data['category_name']; ?></h1>
        <p class="mb-5">Browse our wide range of activities for this sport below.</p>

        <div class="row g-4">
            <?php foreach ($activities as $activity) { ?>
            <div class="col-md-4 col-lg-3">
                <div class="card h-100 shadow rounded-4 border-light">
                    <img 
                        src="./activity-images/<?php echo $activity['activity_image']; ?>" 
                        class="card-img-top img-fluid" 
                        alt="<?php echo $activity['activity_name']; ?>" 
                        style="height: 200px; object-fit: cover;">
                    <div class="card-body text-center">
                        <h5 class="card-title"><?php echo $activity['activity_name']; ?></h5>
                        <p class="card-text text-muted">Explore this activity to learn more.</p>
                        <a href="index.php?p=activity&id=<?php echo $activity['activity_id']; ?>" class="btn btn-primary">View Activity</a>
                    </div>
                </div>
            </div>
            <?php } ?>
        </div>
    </div>
</main>
