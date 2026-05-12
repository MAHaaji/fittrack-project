<?php

// Initialize cURL session
$ch = curl_init();

// API key for the Basketball API
$apikey = '2da8f0145de4de6f731a931d94aa0f30'; // Replace with your actual API key

// Set cURL options
curl_setopt_array($ch, array(
    CURLOPT_URL => 'https://v1.basketball.api-sports.io/players?team=1&season=2023-2024', // Add season query to the URL
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',
    CURLOPT_HTTPHEADER => array(
        'x-rapidapi-key: ' . $apikey,
        'x-rapidapi-host: v1.basketball.api-sports.io'
    ),
));

// Execute cURL request
$output = curl_exec($ch);

// Close cURL session
curl_close($ch);

// Decode JSON response
$output = json_decode($output, true);

// Set page title
$pageTitle = "NBA Player Statistics";

?>

<main id="pageNBA">
    <section class="api-banner" style="background-image: url(assets/nba.png);">
        <div class="container">
            <h1 class="mb-4">NBA Players</h1>
        </div>
    </section>
    <div class="container py-5">
            <?php
            // Check if there are any errors or if the response contains valid data
            if (isset($output['errors']) && !empty($output['errors'])) {
                // Display errors if any exist
                echo "<p>Error: " . implode(", ", $output['errors']) . "</p>";
            } elseif (isset($output['response']) && !empty($output['response'])) {
                ?>
                <ul  class="api-list">
                <?php
                // Loop through each player and display their name only
                foreach ($output['response'] as $player) {
                    $playerName = isset($player['name']) ? $player['name'] : 'Unknown Player';
                    ?>
                    <li>
                        <strong><?php echo $playerName; ?></strong>
                    </li>
                    <?php
                }
                ?>
                </ul>
                <?php
            } else {
                // Handle error or empty response
                echo "<p>Sorry, we couldn't retrieve the NBA player statistics. Please try again later.</p>";
            }
            ?>
        </div>
    </div>
</main>
