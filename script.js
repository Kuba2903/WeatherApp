const input = document.querySelector('input')
const daysInput = document.querySelector('#days')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')
const forecastSelect = document.querySelector('#forecast-select');

const APIkey = "063347538cb74b0c984a59afe0749fee";


button.addEventListener('click', () => {
    const city = input.value;
    if (city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=metric`;

        axios.get(apiUrl)
            .then(response => {
                console.log(response);
                const data = response.data;
                cityName.textContent = data.city.name;
                warning.textContent = '';
                //wartości domyślne początkowe
                weather.textContent = data.list[0].weather[0].description;
                temperature.textContent = `${data.list[0].main.temp}°C`;
                humidity.textContent = `${data.list[0].main.humidity}%`;

                forecastSelect.innerHTML = '<option value="" disabled selected>Wybierz datę...</option>';

                // utwórz select liste
                data.list.forEach((forecast, index) => {
                    const option = document.createElement('option');
                    option.value = index;
                    option.textContent = forecast.dt_txt;
                    forecastSelect.appendChild(option);
                });

                // obsługa wyboru konkretnej prognozy
                forecastSelect.addEventListener('change', () => {
                    const selectedIndex = forecastSelect.value;
                    const selectedForecast = data.list[selectedIndex];
                    const weathertemp = selectedForecast.main.temp;
                    const date = selectedForecast.weather[0].description;
                    const humi = selectedForecast.main.humidity;

                    weather.textContent = date;
                    temperature.textContent = `${weathertemp}°C`;
                    humidity.textContent = `${humi}%`;
                });
            })
            .catch(error => {
                warning.textContent = 'City not found. Please try again.';
                cityName.textContent = '';
                weather.textContent = '';
                temperature.textContent = '';
                humidity.textContent = '';
                photo.src = '';
                photo.alt = '';
            });
    } else {
        warning.textContent = 'Please enter a city name.';
    }
});


// https://openweathermap.org/
// https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL
