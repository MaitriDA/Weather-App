const weatherAPI={
    key: "562d0d8fb48d8a5c91c48c4658463ac8",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

const daysArray=['Sun','Mon','Tues','Wed','Thur','Fri','Sat'];
const monthArray=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const todayDate=new Date();

console.log(todayDate);
const date=todayDate.getDate();
const monthRaw=todayDate.getMonth();
const month=monthArray[monthRaw]
;
const year=todayDate.getFullYear();
const dayRaw=todayDate.getDay();
const day=daysArray[dayRaw];
console.log(month);
console.log(day);

var hour=todayDate.getHours();
var min=todayDate.getMinutes();
var timeType;

if(hour>11){
    timeType='PM';
}
else{
    timeType='AM';
}
if(hour>11){
    hour=hour-12;
}
if(min<10){
    min='0'+min;
}


const dateNew=document.getElementById('date');
dateNew.innerHTML=`${day}  |  ${date}/${month}/${year}`;

const currTime=document.getElementById('time');
currTime.innerHTML=`${hour}:${min} ${timeType}`;
//Event Listner Function on keypress
//function1-Get Weather report
//function2-Show weather report
//function3-Date related

const searchCity=document.getElementById('inputCity');
searchCity.addEventListener('keypress',(event)=>{
    if(event.keyCode==13){
        console.log(searchCity.value);
        getWeatherReport(searchCity.value);
    }
});

function getWeatherReport(city){
    fetch(`${weatherAPI.baseUrl}?q=${city}&appid=${weatherAPI.key}&units=metric`)
    .then(weather =>{
        return weather.json();
    })
    .then(showWeatherReport);
}

function showWeatherReport(weather){
    console.log(weather);
    
    let city=document.getElementById('city');
    city.innerHTML=`${weather.name},${weather.sys.country}`;
    
    let temperature=document.getElementById('temp');
    temperature.innerHTML=`${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp=document.getElementById('minMax');
    minMaxTemp.innerHTML=`${Math.round(weather.main.temp_min)}&deg;C (min) / ${Math.round(weather.main.temp_max)}&deg;C (max)`;

    let weatherType=document.getElementById('status');
    weatherType.innerHTML=`${weather.weather[0].main}`;
    
    //Changing the background dynamically
    if(weatherType.textContent=='Clear'){
        document.body.style.backgroundImage="url('images/clear.jpg')";
    } 
}
