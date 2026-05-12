<?php
    $pageTitle = "Welcome to Home Page";
?>
<main id="homepage">
    <div class="container-fluid p-0">
        <div id="heroCarousel" class="swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" style="background-image: url(assets/carousel/carousel-1.jpg)">
                    <div class="slider-content container text-center">
                        <h2>Welcome to FitTrack</h2>
                        <h3>Your ultimate fitness tracker destination!</h3>
                        <p>Discover a wide range of exercises, track your progress, and achieve your fitness goals with ease. Whether you're a beginner or a fitness enthusiast, FitTrack has everything you need to stay motivated and on track.</p>
                    </div>
                </div>
                <div class="swiper-slide" style="background-image: url(assets/carousel/carousel-2.jpg)">
                    <div class="slider-content container text-center">
                        <h2>We Track Your Progress</h2>
                        <h3>Your ultimate fitness tracker destination!</h3>
                        <p>Discover a wide range of exercises, track your progress, and achieve your fitness goals with ease. Whether you're a beginner or a fitness enthusiast, FitTrack has everything you need to stay motivated and on track.</p>
                    </div>
                </div>
                <div class="swiper-slide" style="background-image: url(assets/carousel/carousel-3.jpg)">
                    <div class="slider-content container text-center">
                        <h2>Improve Your Health</h2>
                        <h3>Your ultimate fitness tracker destination!</h3>
                        <p>Discover a wide range of exercises, track your progress, and achieve your fitness goals with ease. Whether you're a beginner or a fitness enthusiast, FitTrack has everything you need to stay motivated and on track.</p>
                    </div>
                </div>
            </div>

            <!-- If we need navigation buttons -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>

            <!-- If we need scrollbar -->
            <div class="swiper-scrollbar"></div>
        </div>
    </div>
    <script>
        const swiper = new Swiper('.swiper', {
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 5000,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            scrollbar: {
                el: '.swiper-scrollbar',
            },
        });
    </script>

    <section class="py-5">
        <div class="container">
            <div class="row g-4">
                <!-- Card 1 -->
                <div class="col-md-6">
                    <div class="card shadow rounded-4 h-100 border-light">
                        <img src="assets/plate.png" class="card-img-top img-fluid" alt="Are you trying to get FIT?">
                        <div class="card-body text-center">
                            <h3 class="card-title">Are you trying to get FIT?</h3>
                            <p class="card-text">Well you're in the right place!</p>
                        </div>
                        <div class="card-footer text-center bg-transparent border-0">
                            <a href="index.php?p=categories" class="btn btn-primary">Browse Fitness</a>
                        </div>
                    </div>
                </div>

                <!-- Card 2 -->
                <div class="col-md-6">
                    <div class="card shadow rounded-4 h-100 border-light">
                        <img src="assets/track.png" class="card-img-top img-fluid" alt="Are you trying to track your fitness?">
                        <div class="card-body text-center">
                            <h3 class="card-title">Are you trying to track your fitness?</h3>
                            <p class="card-text">Track it Here!</p>
                        </div>
                        <div class="card-footer text-center bg-transparent border-0">
                            <?php if (isset($_SESSION['is_loggedin']) && $_SESSION['is_loggedin']) { ?>
                            <a href="index.php?p=account" class="btn btn-primary">Browse Tracker</a>
                            <?php } else { ?>
                            <a class="btn text-white btn-success btn-login" href="javascript:void()" data-bs-toggle="modal" data-bs-target="#loginModal">Browse Tracker</a>
                            <?php } ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>


