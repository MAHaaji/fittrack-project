<?php

$ch = curl_init();

$location = 'Ipswich';
$apikey = 'd120db2c3032a0a2c056b950c8f51aa2';

curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_URL, 'http://api.openweathermap.org/data/2.5/weather?q='.$location.'&appid='.$apikey);

$output = curl_exec($ch);

curl_close($ch);

$output = json_decode($output, true);
$pageTitle = "Weather";
?>
<main id="pageWeather" class="py-5">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-md-6">
            <?php
            if ($output['cod'] == 200) {
                $weather = $output['weather'][0]['main'];
                $description = $output['weather'][0]['description'];
                $temperature = $output['main']['temp'] - 273.15;
                $humidity = $output['main']['humidity'];
                $wind_speed = $output['wind']['speed'];
                $city = $output['name'];
            ?>
                <h1>Weather in <?php echo $city; ?></h1>
                <p>The weather is currently <?php echo $weather .'('.$description.')'; ?></p>
                <p>Humidity: <?php echo $humidity; ?>%</p>
                <p>Wind Speed: <?php echo $wind_speed; ?> m/s</p>
                <p>Temperature: <?php echo round($temperature, 1); ?>°C</p>
            <?php
            } else {
                echo "<p>Sorry, we couldn't retrieve the weather information. Please try again later.</p>";
            }
            ?>
            </div>
            <div class="col-md-6">
                <img src="assets/weather.png" alt="weather" class="img-fluid">
            </div>
        </div>
    </div>
</main>
