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
                    const desc = selectedForecast.weather[0].description;
                    const humi = selectedForecast.main.humidity;

                    weather.textContent = desc;
                    temperature.textContent = `${weathertemp}°C`;
                    humidity.textContent = `${humi}%`;

                    //obsługa wyboru ikonki
                    switch(selectedForecast.weather[0].main){
                        case "Clouds":
                            photo.src = "./img/cloud.png";
                            break;
                        case "Rain":
                            photo.src = "./img/rain.png";
                            break;
                        case "Thunderstorm":
                            photo.src = "./img/thunderstorm.png";
                            break;
                        case "Clear":
                            photo.src = "./img/sun.png";
                            break;
                        case "Ice":
                            photo.src = "./img/ice.png";
                            break;
                        case "Fog":
                            photo.src = "./img/fog.png";
                            break;
                        case "Drizzle":
                            photo.src = "./img/drizzle.png";
                            break;
                        default:
                            photo.src = "./img/unknown.png";
                            break;
                            
                    }

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
