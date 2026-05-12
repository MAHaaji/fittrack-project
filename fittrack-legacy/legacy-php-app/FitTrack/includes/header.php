<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Fittrack | <?php echo isset($pageTitle) ? $pageTitle : ''; ?></title>
    <link rel="icon" href="./assets/favicon.png" type="image/x-icon">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <!-- Styles -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>
    <!-- Custom Styles -->
    <link rel="stylesheet" href="css/style.css">
    <!-- Scripts -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
</head>
<body>
    <header class="shadow-sm">
        <nav id="navbar" class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <!-- Logo -->
                <a class="navbar-brand" href="index.php?p=home">
                    <img src="./assets/logo.png" alt="Logo" class="site-logo">
                </a>
                <div class="d-inline-flex gap-2 align-items-center">
                    <?php if (isset($_SESSION['is_loggedin']) && $_SESSION['is_loggedin']) { ?>
                        <?php
                            $profile_image = $_SESSION['user_data']['user_image'] ?? null;
                            $user_first_name = $_SESSION['user_data']['first_name'] ?? null;
                            $user_last_name = $_SESSION['user_data']['last_name'] ?? null;
                        ?>
                        <span class="nav-item dropdown d-lg-none">
                            <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="userMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <?php if ($profile_image) : ?>
                                    <img
                                        src="./uploads/users/<?php echo $profile_image; ?>"
                                        alt="<?php echo $user_first_name; ?>"
                                        class="rounded-circle nav-user-img">
                                <?php else : ?>
                                    <span
                                        class="d-flex justify-content-center align-items-center text-white rounded-circle nav-user-icon">
                                        <i class="fa-solid fa-user"></i>
                                    </span>
                                <?php endif; ?>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
                                <li><a class="dropdown-item" href="index.php?p=account">My Account</a></li>
                                <li><a class="dropdown-item" href="index.php?p=logout">Logout</a></li>
                            </ul>
                        </span>
                    <?php } ?>
                    <!-- Toggler for mobile view -->
                     <button
                        id="customToggler"
                        class="navbar-toggler"
                        type="button"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>

                <!-- Navbar content -->
                <div class="collapse navbar-collapse" id="navbarContent">
                    <!-- Menu Links -->
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 ps-lg-5">
                        <li class="nav-item">
                            <a class="nav-link" href="index.php?p=home">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="index.php?p=categories">Categories</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="index.php?p=weather">Weather</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="index.php?p=football">Football</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="index.php?p=NBA">NBA</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="index.php?p=F1">F1</a>
                        </li>
                    </ul>

                    <!-- Search Bar -->
                    <form class="d-flex me-3 align-items-center search-form" action="index.php?p=search" method="post" style="border-bottom: 1px solid #ccc;">
                        <input
                            class="form-control border-0 shadow-none search-input"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            name="query">
                        <button
                            class="btn p-0 ms-2 search-icon"
                            type="submit">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>

                    <!-- User Menu -->
                    <ul class="navbar-nav">
                        <?php if (isset($_SESSION['is_loggedin']) && $_SESSION['is_loggedin']) : ?>
                            <?php
                                $profile_image = $_SESSION['user_data']['user_image'];
                                $user_first_name = $_SESSION['user_data']['first_name'];
                                $user_last_name = $_SESSION['user_data']['last_name'];
                            ?>
                            <li class="nav-item dropdown hide d-lg-block">
                                <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="userMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <?php if ($profile_image) : ?>
                                        <img
                                            src="./uploads/users/<?php echo $profile_image; ?>"
                                            alt="<?php echo $user_first_name; ?>"
                                            class="rounded-circle nav-user-img">
                                    <?php else : ?>
                                        <span
                                            class="d-flex justify-content-center align-items-center text-white rounded-circle nav-user-icon">
                                            <i class="fa-solid fa-user"></i>
                                        </span>
                                    <?php endif; ?>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
                                    <li><a class="dropdown-item" href="index.php?p=account">My Account</a></li>
                                    <li><a class="dropdown-item" href="index.php?p=logout">Logout</a></li>
                                </ul>
                            </li>
                        <?php else : ?>
                            <li class="nav-item pt-3 pt-lg-0">
                                <a class="btn text-white btn-success btn-login" href="javascript:void()" data-bs-toggle="modal" data-bs-target="#loginModal">Login</a>
                            </li>
                        <?php endif; ?>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
