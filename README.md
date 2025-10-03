# Climax 🌦️

A mobile **weather forecast app** built with **React Native**, **Expo**, and **TypeScript**.  
It requests the user's location to provide **accurate, real-time meteorological data** using the [OpenWeatherMap API](https://openweathermap.org/).

---

## 🎯 Objective

**Climax** was created for users who:

- Want **real-time weather updates** anywhere in the world  
- Prefer **location-based forecasts** without manual city search  
- Need a **simple, clean, and fast UI** for daily use  

---

## 📱 Features

- 📍 Requests **user location permission** in real-time  
- ☁️ Fetches live weather data from **OpenWeatherMap**  
- 🌍 Provides **current location forecast** instantly  
- 📊 Displays **temperature, humidity, wind speed, and conditions**  

---

## 🛠️ Tech Stack

- [Expo](https://expo.dev/)  
- [React Native](https://reactnative.dev/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [OpenWeatherMap API](https://openweathermap.org/)  

---

## 🔐 Permissions

Climax requests:  

- **Location Access** – to detect the user's current position and fetch weather data for that exact location  

---

## 🚀 How It Works

1. The app requests permission to access the device’s **GPS location**  
2. Once granted, it fetches the **latitude** and **longitude**  
3. Sends the coordinates to **OpenWeatherMap API**  
4. Displays **real-time weather forecast** on the mobile screen  

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/Adyllsxn/climax.git

# Navigate into project
cd climax

# Install dependencies
npm install

# Start with Expo
npx expo start
