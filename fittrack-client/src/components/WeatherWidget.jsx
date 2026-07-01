import { useEffect, useState } from "react";


// Reference: https://open-meteo.com/en/docs (WMO Weather interpretation codes)
function describeWeather(code) {
  if (code === 0) return { label: "Clear sky",  };
  if ([1, 2, 3].includes(code)) return { label: "Partly cloudy", };
  if ([45, 48].includes(code)) return { label: "Foggy", };
  if ([51, 53, 55, 56, 57].includes(code)) return { label: "Drizzle",};
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { label: "Rain",  };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { label: "Snow",};
  if ([95, 96, 99].includes(code)) return { label: "Thunderstorm" ,};
  return { label: "Unknown", icon: "🌡️" };
}

// A short, friendly note about whether it's a good day to train outside.
function workoutTip(code, temp) {
  if ([61, 63, 65, 95, 96, 99, 71, 73, 75].includes(code))
    return "Might be one for the gym today.";
  if (temp >= 25) return "Warm out — stay hydrated.";
  if (temp <= 2) return "Bundle up if you're heading out.";
  return "Good conditions for an outdoor workout.";
}

function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Default to London if the browser won't share a location.
    const fallback = { lat: 51.5072, lon: -0.1276 };

    function fetchWeather({ lat, lon }) {
      const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}` +
        `&longitude=${lon}&current=temperature_2m,weather_code`;

      fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error("weather request failed");
          return res.json();
        })
        .then((data) => {
          setWeather({
            temp: Math.round(data.current.temperature_2m),
            code: data.current.weather_code,
          });
        })
        .catch(() => setError("Couldn't load today's weather."));
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          fetchWeather({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          }),
        () => fetchWeather(fallback) // user denied / unavailable -> use London
      );
    } else {
      fetchWeather(fallback);
    }
  }, []);

  const cardStyle = {
    background: "#fff",
    borderRadius: "14px",
    border: "1px solid #ebebeb",
    padding: "24px",
    marginBottom: "32px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  };

  if (error) {
    return (
      <div style={cardStyle}>
        <span style={{ fontSize: "13px", color: "#aaa" }}>{error}</span>
      </div>
    );
  }

  if (!weather) {
    return (
      <div style={cardStyle}>
        <span style={{ fontSize: "13px", color: "#aaa" }}>
          Loading today's conditions…
        </span>
      </div>
    );
  }

  const { label, icon } = describeWeather(weather.code);

  return (
    <div style={cardStyle}>
      <span style={{ fontSize: "40px", lineHeight: 1 }}>{icon}</span>
      <div>
        <p
          style={{
            fontSize: "12px",
            color: "#aaa",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: "4px",
          }}
        >
          Today's Conditions
        </p>
        <p
          style={{
            fontFamily: "'Anton', serif",
            fontSize: "24px",
            color: "#1a1a1a",
          }}
        >
          {weather.temp}°C · {label}
        </p>
        <p style={{ fontSize: "13px", color: "#6ebc67", marginTop: "2px" }}>
          {workoutTip(weather.code, weather.temp)}
        </p>
      </div>
    </div>
  );
}

export default WeatherWidget;