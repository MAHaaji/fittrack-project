<?php

// Initialize cURL session
$ch = curl_init();

// API key for the F1 API
$apikey = '2da8f0145de4de6f731a931d94aa0f30'; // Replace with your actual API key

// Set cURL options
curl_setopt_array($ch, array(
    CURLOPT_URL => 'https://v1.formula-1.api-sports.io/competitions', // F1 Competitions endpoint
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',
    CURLOPT_HTTPHEADER => array(
        'x-rapidapi-key: ' . $apikey,
        'x-rapidapi-host: v1.formula-1.api-sports.io'
    ),
));

// Execute cURL request
$output = curl_exec($ch);

// Close cURL session
curl_close($ch);

// Decode JSON response
$output = json_decode($output, true);

// Set page title
$pageTitle = "F1 Competitions";

?>

<main id="pageF1">
    <section class="api-banner" style="background-image: url(assets/f1.png);">
        <div class="container">
            <h1 class="mb-4">F1 Competitions</h1>
        </div>
    </section>
    <div class="container py-5">
                <?php
                // Check if the response contains valid data
                if (isset($output['response']) && !empty($output['response'])) {
                ?>
                <ul  class="api-list">
                <?php
                    // Loop through the competitions and display their data
                    foreach ($output['response'] as $competition) {
                        // Extract competition name
                        $competitionName = isset($competition['name']) ? $competition['name'] : '';

                        // Only display competitions that have a valid name
                        if ($competitionName) {
                            // Display the competition name
                            echo "<li><strong>$competitionName</strong></li>";
                        }
                    }
                ?>
                </ul>
                <?php
                } else {
                    // Handle error or empty response
                    echo "<p>Sorry, we couldn't retrieve the F1 competition data. Please try again later.</p>";
                }
                ?>
        </div>
    </div>
</main>
