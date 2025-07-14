<<<<<<< HEAD

# ⛅ Weather App

A stylish and animated React + TypeScript weather application that fetches real-time weather data and displays it beautifully with themed UI, cloud-based loaders, and interactive forecast modals.

---

## 🌟 Features

- 🔍 **Search for Any City**  
  Real-time weather information for cities worldwide.

- ⏳ **Animated Preloader**  
  3D rotating cloud loader with starry background using Three.js.

- 🎨 **Dynamic Weather Themes**  
  Background glow and particle effects change based on temperature:

  - Sunny → sun rays
  - Rainy → raindrops
  - Cold → snow particles
  - Windy → moving clouds

- 📅 **5-Day Forecast**  
  Opens in a styled modal with icons and daily breakdown.

- ⚠️ **Error Handling**  
  Handles invalid city names or API errors with clear feedback.

- 📱 **Mobile Responsive**  
  Fully responsive design with clean UI for all screen sizes.

---

## 🛠️ Tech Stack

| Stack            | Tools Used                                      |
| ---------------- | ----------------------------------------------- |
| **Frontend**     | React, TypeScript                               |
| **3D / Visuals** | Three.js, @react-three/fiber, @react-three/drei |
| **API**          | OpenWeather API                                 |
| **Styling**      | CSS Modules (custom animations & effects)       |

---

## 📁 Folder Structure (Highlights)

weather-app/
│
├── public/
│ └── index.html
│
├── src/
│ ├── components/
│ │ ├── Home.tsx
│ │ └── Preloader.tsx
│ ├
│ ├── styles/
│ │ └── home.css
│ │ └── preloader.css
│ └── App.tsx
│
├── .env ✅ stores API key
├── package.json
└── README.md 📄 you're here

1. **Clone the repo**

```bash
git clone https://github.com/Santhich/weather-app.git
cd weather-app


# Create .env file

REACT_APP_OPENWEATHER_KEY=c102f5928976116ea6a950cbbdc40209


# 🌩️ Visual polish: Responsive animations and design.

# ⌛ Loader delay: 1-second delay added before API fetch to simulate real-world experience and show loading state.

# 🎯 Code clarity: Fully commented and well-structured.

# 💡 Extra effort: Custom Three.js cloud preloader, forecast modal with icons, and condition-based UI animations.


Author
Santhi Ch
Front-End Developer | React Enthusiast
GitHub: @Santhich
```

=======
