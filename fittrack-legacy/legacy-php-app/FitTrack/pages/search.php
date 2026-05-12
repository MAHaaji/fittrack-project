<?PHP
    $Activity = new Activity($Conn);
    $activities = $Activity->searchActivities($_POST['query']);
    $pageTitle = "Search Results for " . $_POST['query'];
?>

<main id="pageSearch" class="py-5">
    <div class="container">
        <h1 class="mb-4 pb-2">Search results for "<?php echo $_POST['query']; ?>"</h1>

        <div class="row g-4">
            <?php foreach ($activities as $activity) { ?>
            <div class="col-md-3">
                <div class="card rounded-4 h-100 border-light">
                    <!-- Activity Image -->
                    <a href="index.php?p=activity&id=<?php echo $activity['activity_id']; ?>" class="stretched-link">
                        <img 
                            src="./activity-images/<?php echo $activity['activity_image']; ?>" 
                            alt="<?php echo $activity['activity_name']; ?>" 
                            class="card-img-top img-fluid">
                    </a>

                    <!-- Activity Name -->
                    <div class="card-body text-center">
                        <a href="index.php?p=activity&id=<?php echo $activity['activity_id']; ?>" class="text-decoration-none">
                            <h5 class="card-title"><?php echo $activity['activity_name']; ?></h5>
                        </a>
                    </div>
                </div>
            </div>
            <?php } ?>
        </div>
    </div>
</main>