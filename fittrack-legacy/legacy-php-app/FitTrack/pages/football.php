<?php

$ch = curl_init();

$apikey = '2da8f0145de4de6f731a931d94aa0f30';

curl_setopt_array($ch, array(
  CURLOPT_URL => 'https://v3.football.api-sports.io/leagues',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_HTTPHEADER => array(
    'x-rapidapi-key: ' . $apikey,
    'x-rapidapi-host: v3.football.api-sports.io'
  ),
));

$output = curl_exec($ch);

curl_close($ch);

$output = json_decode($output, true);
$pageTitle = "Football Leagues";
?>
<main id="pageFootball">
    <section class="api-banner" style="background-image: url(assets/football.png);">
        <div class="container">
            <h1 class="mb-4">Available Football Leagues</h1>
        </div>
    </section>
    <div class="container py-5">
        <?php
        if (isset($output['response']) && !empty($output['response'])) {
            ?>
            <ul class="api-list">
                <?php
                foreach ($output['response'] as $league) {
                    $league_name = $league['league']['name'];
                    $country = $league['country']['name'];
                    $season = $league['seasons'][0]['year'];
                    echo "<li><strong>$league_name</strong> - $country (Season: $season)</li>";
                }
                ?>
            </ul>
            <?php
        } else {
            echo "<p>Sorry, we couldn't retrieve the football leagues information. Please try again later.</p>";
        }
        ?>
    </div>
</main>
