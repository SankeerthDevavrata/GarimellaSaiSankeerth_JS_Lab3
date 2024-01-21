const api = {
  key: "2bd0d32bcdbfee9974cfa52bcfdc894f",
  base: "https://api.openweathermap.org/data/2.5/"
}

window.onload = function () {
  getResults('Tirumala');
};

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
    searchbox.value = '';
  }
}

async function getResults(query) {
  try {
    const response = await fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`);
    const weather = await response.json();
    console.log(weather);
    displayResults(weather);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    alert('Error fetching weather data , ' + error.message);
  }
}

// function getResults (query) {
//   fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
//     .then(weather => {
//       return weather.json();
//     }).then((response)=>{
//       console.log(response)
//       displayResults(response)});
// }

function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;
  updateBackground(weather.weather[0].main);

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

function updateBackground(weatherCondition) {
  var body = document.body;
  console.log(weatherCondition);
  if (weatherCondition.toLowerCase() === 'clouds') {
    body.style.backgroundImage = "url('./Cloud.jpg')";
  } else if (weatherCondition.toLowerCase() === 'clear'){
    body.style.backgroundImage = "url('./clear.webp')";
  }else if (weatherCondition.toLowerCase() === 'drizzle'){
    body.style.backgroundImage = "url('./drizzle.webp')";
  }else if (weatherCondition.toLowerCase() === 'rain'){
    body.style.backgroundImage = "url('./rain.webp')";
  }else if (weatherCondition.toLowerCase() === 'snow'){
    body.style.backgroundImage = "url('./snow.webp')";
  }else if (weatherCondition.toLowerCase() === 'thunderstorm'){
    body.style.backgroundImage = "url('./thunderstorm.png')";
  }else{
    body.style.backgroundImage = "url('./atmospher.webp')";
  }
}

// async function getWeatherData() {
//   try{
//     const weatherData = await fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`);
//     const weatherDataJSON = await weatherData.json();
//     console.log(weatherDataJSON);
//     displayResults(weatherDataJSON);
//   }catch(error){
//     console.log(error.message);
//     alert("enter correct city name :" + error.message);
//   }
// }