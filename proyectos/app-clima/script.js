
// ===== CONFIGURATION =====
const API_KEY = 'e8b47c21d15e6fee9dab924c14fed3e1'; // Reemplaza esto con tu API Key de OpenWeatherMap https://openweathermap.org/api
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// ===== ELEMENTOS DEL DOM =====
const elements = {
    cityInput: document.getElementById('city-input'),
    searchBtn: document.getElementById('search-btn'),
    locationBtn: document.getElementById('location-btn'),
    themeToggle: document.getElementById('theme-toggle'),
    loading: document.getElementById('loading'),
    error: document.getElementById('error'),
    errorMessage: document.getElementById('error-message'),
    weatherContainer: document.getElementById('weather-container'),
    forecastContainer: document.getElementById('forecast-container'),
    forecastGrid: document.getElementById('forecast-grid'),
    // Clima actual
    weatherIcon: document.getElementById('weather-icon'),
    temperature: document.getElementById('temperature'),
    description: document.getElementById('description'),
    cityName: document.getElementById('city-name'),
    country: document.getElementById('country'),
    currentDate: document.getElementById('current-date'),
    feelsLike: document.getElementById('feels-like'),
    humidity: document.getElementById('humidity'),
    wind: document.getElementById('wind'),
    visibility: document.getElementById('visibility'),
    pressure: document.getElementById('pressure'),
    sunrise: document.getElementById('sunrise'),
    tempMin: document.getElementById('temp-min'),
    tempMax: document.getElementById('temp-max')
};

// ===== ICONOS DEL CLIMA =====
const weatherIcons = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️'
};

// ===== FUNCIONES DE UI =====
function showLoading() {
    elements.loading.classList.remove('hidden');
    elements.error.classList.add('hidden');
    elements.weatherContainer.classList.add('hidden');
    elements.forecastContainer.classList.add('hidden');
}

function hideLoading() {
    elements.loading.classList.add('hidden');
}

function showError(message) {
    hideLoading();
    elements.error.classList.remove('hidden');
    elements.errorMessage.textContent = message;
    elements.weatherContainer.classList.add('hidden');
    elements.forecastContainer.classList.add('hidden');
}

function showWeather() {
    hideLoading();
    elements.error.classList.add('hidden');
    elements.weatherContainer.classList.remove('hidden');
    elements.forecastContainer.classList.remove('hidden');
}

// ===== CHECK API KEY =====
function checkApiKey() {
    if (API_KEY === 'TU_API_KEY_AQUI') {
        showError('Falta la API Key. Por favor configura tu API Key en script.js');
        return false;
    }
    return true;
}

// ===== FORMATEAR FECHA =====
function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('es-ES', options);
}

function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

function getDayName(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('es-ES', { weekday: 'short' });
}

// ===== OBTENER CLIMA POR CIUDAD =====
async function getWeatherByCity(city) {
    if (!checkApiKey()) return;
    showLoading();
    
    try {
        const response = await fetch(`${API_BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=es`);
        
        if (!response.ok) {
            throw new Error('Ciudad no encontrada');
        }
        
        const data = await response.json();
        displayWeather(data);
        getForecast(city);
        
    } catch (error) {
        console.error('Error:', error);
        showError('No se pudo encontrar la ciudad. Intenta de nuevo.');
    }
}

// ===== OBTENER CLIMA POR COORDENADAS =====
async function getWeatherByCoords(lat, lon) {
    if (!checkApiKey()) return;
    showLoading();
    
    try {
        const response = await fetch(`${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`);
        
        if (!response.ok) {
            throw new Error('Error al obtener el clima');
        }
        
        const data = await response.json();
        displayWeather(data);
        getForecastByCoords(lat, lon);
        
    } catch (error) {
        console.error('Error:', error);
        showError('No se pudo obtener el clima de tu ubicación.');
    }
}

// ===== OBTENER PRONÓSTICO =====
async function getForecast(city) {
    try {
        const response = await fetch(`${API_BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=es`);
        
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        }
    } catch (error) {
        console.error('Error al obtener pronóstico:', error);
    }
}

async function getForecastByCoords(lat, lon) {
    try {
        const response = await fetch(`${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`);
        
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        }
    } catch (error) {
        console.error('Error al obtener pronóstico:', error);
    }
}

// ===== MOSTRAR CLIMA =====
function displayWeather(data) {
    const iconCode = data.weather[0].icon;
    
    elements.weatherIcon.textContent = weatherIcons[iconCode] || '🌡️';
    elements.temperature.textContent = Math.round(data.main.temp);
    elements.description.textContent = data.weather[0].description;
    elements.cityName.textContent = data.name;
    elements.country.textContent = data.sys.country;
    elements.currentDate.textContent = formatDate(data.dt);
    elements.feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    elements.humidity.textContent = `${data.main.humidity}%`;
    elements.wind.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    elements.visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    elements.pressure.textContent = `${data.main.pressure} hPa`;
    elements.sunrise.textContent = formatTime(data.sys.sunrise);
    elements.tempMin.textContent = `${Math.round(data.main.temp_min)}°C`;
    elements.tempMax.textContent = `${Math.round(data.main.temp_max)}°C`;
    
    showWeather();
}

// ===== MOSTRAR PRONÓSTICO =====
function displayForecast(data) {
    // Agrupar por día (tomar uno por día)
    const dailyData = {};
    
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toDateString();
        // Solo tomamos un pronóstico por día (prefiriendo el del mediodía)
        if (!dailyData[date] || item.dt_txt.includes("12:00:00")) {
            dailyData[date] = item;
        }
    });
    
    const days = Object.values(dailyData).slice(1, 6); // Próximos 5 días
    
    elements.forecastGrid.innerHTML = days.map(day => `
        <div class="forecast-card">
            <div class="forecast-day">${getDayName(day.dt)}</div>
            <div class="forecast-icon">${weatherIcons[day.weather[0].icon] || '🌡️'}</div>
            <div class="forecast-temps">
                <span class="forecast-max">${Math.round(day.main.temp_max)}°</span>
                <span class="forecast-min">${Math.round(day.main.temp_min)}°</span>
            </div>
        </div>
    `).join('');
}

// ===== GEOLOCALIZACIÓN =====
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                getWeatherByCoords(latitude, longitude);
            },
            (error) => {
                console.error('Error de geolocalización:', error);
                showError('No se pudo obtener tu ubicación. Permite el acceso o busca una ciudad.');
            }
        );
    } else {
        showError('Tu navegador no soporta geolocalización.');
    }
}

// ===== TEMA OSCURO/CLARO =====
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    elements.themeToggle.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

function loadTheme() {
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        elements.themeToggle.textContent = '☀️';
    }
}

// ===== EVENT LISTENERS =====
elements.searchBtn.addEventListener('click', () => {
    const city = elements.cityInput.value.trim();
    if (city) {
        getWeatherByCity(city);
    }
});

elements.cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = elements.cityInput.value.trim();
        if (city) {
            getWeatherByCity(city);
        }
    }
});

elements.locationBtn.addEventListener('click', getLocation);
elements.themeToggle.addEventListener('click', toggleTheme);

// Ciudades populares
document.querySelectorAll('.city-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const city = btn.dataset.city;
        elements.cityInput.value = city;
        getWeatherByCity(city);
    });
});

// ===== INICIALIZACIÓN =====
loadTheme();

// Cargar ciudad por defecto
getWeatherByCity('Monteria');