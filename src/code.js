function changeToC(event) {
  event.preventDefault();
  let currentW = document.querySelector("#current-temp");
  let temperatureF = Math.round(temperature * (9 / 5) + 32);
  currentW.innerHTML = temperatureF;

  let currentD = document.querySelector("#degreesC");
  currentD.className = "degrees";
  let changedTo = document.querySelector("#degreesF");
  changedTo.className = "chosen-degree";
}
function changeToF(event) {
  event.preventDefault();
  let currentW = document.querySelector("#current-temp");
  currentW.innerHTML = temperature;

  let currentD = document.querySelector("#degreesF");
  currentD.className = "degrees";
  let changedTo = document.querySelector("#degreesC");
  changedTo.className = "chosen-degree";
}
function capitalize(words) {
   let separate = words.toLowerCase().split(" ");
   for (let i = 0; i < separate.length; i++) {
     separate[i] = separate[i].charAt(0).toUpperCase() + separate[i].substring(1);
   }
   return separate.join(" ");
}
function changeCityinHTML(city) {
  let currentCity = document.querySelector("#shown-city");
  let cityNew = capitalize(city);
  currentCity.innerHTML = `${cityNew}`;
}
function changeCity(event){
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-city");
  if (searchInput.value) {
    changeCityinHTML(searchInput.value);
    getTempe(searchInput.value);
  }
}

//city temperature
function getTempe(city) {
  let apiKey = "92161eb593fedf6f773cc741f318b677";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeTempe);
}

function changeTempe(recieved) {
  let currentTemp = document.querySelector("#current-temp");
  let tempe = Math.round(recieved.data.main.temp);
  currentTemp.innerHTML = `${tempe}`;
  temperature = tempe;
  //main.humidity
  let currentH = document.querySelector("#humidity");
  let hum = recieved.data.main.humidity;
  currentH.innerHTML = `${hum}%`;
  //wind.speed i wind.deg

  //weather.description & weather.icon
  let currentSun = document.querySelector("#sunny");
  let sun = recieved.data.weather[0].description;
  currentSun.innerHTML = `${sun}`;
  let sunIcon = recieved.data.weather[0].icon;
  document.getElementById("sun-icon").src =`images/${sunIcon}.png`;
}
function beginSearch() {
  navigator.geolocation.getCurrentPosition(seachLoc, errorLoc);
}
function seachLoc(pos) {
  let lon = pos.coords.longitude;
  let lat = pos.coords.latitude;
  let apiKey = "92161eb593fedf6f773cc741f318b677";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(changeTempe);
  axios.get(apiUrl).then(getCityName);
  //changeCityinHTML(cityName);
  //getTempe(cityName);
}
function getCityName(cityData) {
  let city = cityData.data.name;
  changeCityinHTML(city);
}
function errorLoc() {
  alert("We couldn't get your location.");
}
let currentDayData = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let nowD = days[currentDayData.getDay()];
let nowH = currentDayData.getHours();
let nowM = currentDayData.getMinutes();
if (nowM < 10) {
  nowM = `0${nowM}`;
}
let temperature = 33;
//current time and day
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${nowD} ${nowH}:${nowM}`;
//degrees change
let currentC = document.querySelector("#degreesC");
currentC.addEventListener("click", changeToF);
let currentF = document.querySelector("#degreesF");
currentF.addEventListener("click", changeToC);
//city search
let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);
//button-GPS
let gpsLoc = document.querySelector("#button-addon2");
gpsLoc.addEventListener("click", beginSearch);
//top city
let londo = document.querySelector(".child-1");
londo.onclick = function() {
	//do stuff
  changeCityinHTML("London");
  getTempe("London");
}
let newY = document.querySelector(".child-2");
newY.onclick = function() {
	changeCityinHTML("New York");
  getTempe("New York");
}


