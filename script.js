const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const APIkey = "063347538cb74b0c984a59afe0749fee";
const city = "Krakow";

button.addEventListener('click', () => {
    const city = input.value;
    if (city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=metric`;
        
        axios.get(apiUrl)
            .then(response => {
                console.log(response);
                const data = response.data;
                const weatherData = data.list[0].main.temp;
                const mainData = data.main;

                cityName.textContent = data.city.name;
                weather.textContent = weatherData;
                temperature.textContent = `Temperature: ${weatherData}°C`;
                humidity.textContent = `Humidity: %`;

                warning.textContent = '';
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
