// TODO: Entry your vaild API KEY
const apiKey = '';
const url = 'https://api.openweathermap.org/data/2.5/weather';
const cities = ['Lodz, PL', 'Warszawa, PL',
            'Berlin, DE', 'New York, US', 'London, UK'];
let current = 0; 
const widget = document.getElementsByClassName('weather-widget')[0];

// Create DOM elements for widget
let icon = document.createElement('img');
let wrapper = document.createElement('div');
let city = document.createElement('span');
let weather = document.createElement('span');
let temp = document.createElement('span');


function initDOM(){
    icon.className = 'weather-widget__icon';
    widget.appendChild(icon);
    wrapper.className = 'weather-widget__info';
    widget.appendChild(wrapper);
    city.className = 'weather-widget__city';
    wrapper.appendChild(city);  
    weather.className = 'weather-widget__weather';
    wrapper.appendChild(weather);
    temp.className = 'weather-widget__temp';
    widget.appendChild(temp);
}

// Update data in DOM fetched from API
function updateDOM(_city, _temp, _weather, _id){
    if(_weather.indexOf('snow')>-1){
        icon.src = './assets/img/snowy.svg';
    } 
    else if(_weather.indexOf('rain')>-1){
        icon.src = './assets/img/rainy.svg';
    } 
    else if(_weather.indexOf('sun')>-1 || _weather.indexOf('clear')>-1){
        icon.src = './assets/img/sunny.svg';
    } else if(_weather.indexOf('mist')>-1){
        icon.src = './assets/img/mist.svg';
    } else{
        icon.src = './assets/img/cloudy.svg';
    } 
    city.innerHTML = _city;
    weather.innerHTML = _weather;
    temp.innerHTML = _temp;
    widget.href = ` https://openweathermap.org/city/${_id}`
}

// Getting data from API and passing into DOM
function getWeather(){
    fetch(`${url}?q=${cities[current]}&appid=${apiKey}`)
    .then(res => res.json())
    .then(data =>{
        let temp = Math.round(parseFloat(data['main']['temp'])-273.15);
        let weather = data['weather'][0]['main'].toLowerCase();
        updateDOM(cities[current],temp,weather,data['id']);

    })

    setTimeout(getWeather, 10000);
}


// Main
initDOM();
getWeather()
setInterval(()=>{
    if(current < cities.length-1){
        current++;
    }else{
        current = 0;
    }
}, 60000);
