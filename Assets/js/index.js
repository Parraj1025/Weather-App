const searchbox = document.getElementById('searchbox')
const searchbtn = document.getElementById('searchBtn')
const cityInfo = document.getElementById('cityInfo')
const weatherinfo = document.getElementById('currentConditions')
const forecast = document.getElementById('forecast')
const APIKey = '1f84a10cb7da5db222b9d855961dbfd7'

const cities = []
const weatherhistory = []
const forecasthistory = []
const currentwind = []
//take input from search box and store it into city

async function getCity (city) {
    // let currentcity = searchbox.value
    if (!city) {
    }
    else {
    const weatherApi = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`)
    const weatherdata = await weatherApi.json()
    // currentConditions.push(weatherdata.main);
    const forecastApi = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=imperial`)
    const forecastdata = await forecastApi.json()
    let cityweather = weatherdata.main
    let windspeed = weatherdata.wind
    currentwind.push(windspeed)
    let cityforecast = forecastdata.list
    cities.push(city)
    weatherhistory.push(cityweather)
     let fivedayforecast = {
        today: cityforecast[0],
        tomorrow: cityforecast[1],
        twodays: cityforecast[2],
        threedays: cityforecast[3],
        fourdays: cityforecast[4]
     }
     forecasthistory.push(fivedayforecast)
    }
} 




async function postdata () { 
    await getCity(searchbox.value)
            let i = ((cities.length) - 1);
            let currentcity = cities[i];
            let currentconditions = weatherhistory[i];
            let windspeed = currentwind[i].speed
            //let currentforecast = forecasthistory[i]
          
            let main = document.createElement('div')
            main.setAttribute('class','cityinfo')
            
            let cityname = document.createElement('div')
            cityname.innerText = currentcity
            main.appendChild(cityname)
           
            let cityinfo = document.createElement('div')
            
            let temp = document.createElement('div')
            temp.setAttribute('class','temp')
            temp.innerText = `CurrentTemp: ${currentconditions.temp} degrees Farenheight`
            cityinfo.appendChild(temp)
            
            let humidity = document.createElement('div')
            humidity.innerText = `Currenty humidity: ${currentconditions.humidity} %`
            cityinfo.appendChild(humidity)
            
            let wind = document.createElement('div')
            wind.innerText = `Wind Speed ${windspeed} MPH`
            main.appendChild(wind)


            main.appendChild(cityinfo)
            cityInfo.appendChild(main)
}

//async function getforecast (city) {
   // const currentcity = await getCity()
   
    //const forecast = await fetch(api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key})


//load weatherinfo for city and send to HTML file displaying 5 day forecast, currentdate, windspeed,humdity

//store search history



    //const weatherinfo = await fetch(weatherAPI)


