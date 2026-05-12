<?php
    $Category = new Category($Conn);
    $categories = $Category->getAllCategories();
    $pageTitle = "Categories";
?>

<main id="pageCategories" class="py-5">
    <div class="container">
        <h1 class="mb-4 pb-2">Fitness Categories</h1>

        <div class="row g-4">
            <?php foreach ($categories as $category) { ?>
            <div class="col-md-3">
                <div class="card rounded-4 h-100 border-light">
                    <img
                        src="./category-images/<?php echo $category['category_image']; ?>"
                        class="card-img-top img-fluid"
                        alt="<?php echo $category['category_name']; ?>">
                    <div class="card-body text-center">
                        <a href="index.php?p=activities&id=<?php echo $category['category_id']; ?>" class="stretched-link">
                            <h3 class="card-title"><?php echo $category['category_name']; ?></h3>
                        </a>
                    </div>
                </div>
            </div>
            <?php } ?>
        </div>
    </div>
</main>