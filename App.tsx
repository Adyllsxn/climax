import { StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import axios from 'axios';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = '898ed05fb37d9de4b3665d124dc27e7c'


interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
}

export default function App() {
  const [weather, setWeather] = useState<WeatherData | undefined>();

  useEffect(() => {
    getLocation();
  }, []);

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      // Você precisa declarar setErrorMsg ou remover esta linha
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const response = await axios.get(API_URL, {
      params: {
        lat: location.coords.latitude,
        lon: location.coords.longitude,
        appid: API_KEY,
        units: 'metric',
        lang: 'pt_br'
      }
    });

    setWeather(response.data);
  }

  const getBackgroundColor = () => {
    if (!weather || !weather.weather || !weather.weather[0]) return '#6495ED';
    
    const main = weather.weather[0].main.toLowerCase();
    if (main.includes('rain')) return '#4A7C8E';
    if (main.includes('cloud')) return '#8B95A1';
    if (main.includes('clear')) return '#87CEEB';
    return '#6495ED';
  }

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <Text style={styles.cityName}>{weather?.name}</Text>
      <Text style={styles.temperature}>{Math.round(weather?.main?.temp || 0)}°C</Text>
      <Text style={styles.description}>{weather?.weather[0]?.description}</Text>

      <View style={styles.infoContainer}>

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Sensação</Text>
          <Text style={styles.infoValue}>{Math.round(weather?.main?.feels_like || 0)}°C</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Umidade</Text>
          <Text style={styles.infoValue}>{Math.round(weather?.main?.humidity || 0)}%</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Vento</Text>
          <Text style={styles.infoValue}>{weather?.wind?.speed || 0} m/s</Text>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cityName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10
  },
  temperature: {
    fontSize: 72,
    fontWeight: '300',
    color: '#fff',
    marginBottom: 10
  },
  description: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
    textTransform: 'capitalize'
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  infoBox: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    minWidth: 80
  },
  infoLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  infoValue: {
    fontSize: 20,
    color: '#fff',
    opacity: 0.8,
    fontWeight: 'bold'
  }
});