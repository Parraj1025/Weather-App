const searchbar = document.getElementById('searchbar')
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
const icon = []
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
    let weathericon = weatherdata.weather[0].icon
    icon.push(weathericon)
    
    let windspeed = weatherdata.wind
    currentwind.push(windspeed)
    let cityforecast = forecastdata.list
    cities.push(city)
    weatherhistory.push(cityweather)
     let fivedayforecast = [
        cityforecast[0],
        cityforecast[8],
        cityforecast[16],
        cityforecast[24],
        cityforecast[32]
     ]
     forecasthistory.push(...fivedayforecast)
    }
} 


let n = 0

async function postdata () { 
    cityInfo.innerHTML = '';
    await getCity(searchbox.value)
            let i = ((cities.length) - 1);
            let currentcity = cities[i];
            let currentconditions = weatherhistory[i];
            let windspeed = currentwind[i].speed
            //let currentforecast = forecasthistory[i]
            
            let main = document.createElement('div')
            main.setAttribute('class','cityinfo')
            
            let cityname = document.createElement('h1')
            cityname.innerText = currentcity
            main.appendChild(cityname)
           
            let cityinfo = document.createElement('div')
            
            let temp = document.createElement('div')
            temp.setAttribute('class','temp')
            temp.innerText = `CurrentTemp: ${currentconditions.temp} degrees Farenheight`
            cityinfo.appendChild(temp)
            
            let icons = document.createElement('img')
            icons.setAttribute('src',`https://openweathermap.org/img/wn/${icon[i]}@2x.png`)
            main.appendChild(icons)
            
            let humidity = document.createElement('div')
            humidity.innerText = `Currenty humidity: ${currentconditions.humidity} %`
            cityinfo.appendChild(humidity)
            
            let wind = document.createElement('div')
            wind.innerText = `Wind Speed ${windspeed} MPH`
            main.appendChild(wind)

            main.appendChild(cityinfo)
            cityInfo.appendChild(main)

            let fiveday = document.createElement('div')
            fiveday.innerText = 'FIVE DAY FORECAST'
            
            
            for (d=n; d<forecasthistory.length;d++) {
                let day = document.createElement('div')

                let iconlocation = forecasthistory[d].weather[0].icon
                let iconspot = document.createElement('img')
                iconspot.setAttribute('src',`https://openweathermap.org/img/wn/${iconlocation}@2x.png`)
                day.appendChild(iconspot)


                let temp = forecasthistory[d].main.temp
                let forecasttemp = document.createElement('h3')
                forecasttemp.innerText = `Temp: ${temp} degrees farenheight`
                day.appendChild(forecasttemp)
                let feelslike = document.createElement('h3')
                feelslike.innerText = `Feels like: ${forecasthistory[d].main.feels_like} degrees farenheight`
                day.appendChild(feelslike)
                let forecasthumidty = document.createElement('h3')
                forecasthumidty.innerText = `Humidity: ${forecasthistory[d].main.humidity} % humidity`
                day.appendChild(forecasthumidty)
                let forecastwind = document.createElement('h3')
                forecastwind.innerText = `WindSpeed: ${forecasthistory[d].wind.speed} MPH`
                day.appendChild(forecastwind)
                let date = document.createElement('h1')
                date.innerText = `Date: ${forecasthistory[d].dt_txt}`
                day.appendChild(date)
                fiveday.appendChild(day)
            }
            n+=5
            forecast.appendChild(fiveday)
            
            }


searchbtn.addEventListener('click',(event => {
    event.preventDefault()

    forecast.innerHTML = ''
    postdata()
    searchbox.value = ''
}))

//         forecasthistory.forEach(() => {
//             let fiveday = document.createElement('div')
//             fiveday.
//         })

//async function getforecast (city) {
   // const currentcity = await getCity()
   
    //const forecast = await fetch(api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key})


//load weatherinfo for city and send to HTML file displaying 5 day forecast, currentdate, windspeed,humdity

//store search history



    //const weatherinfo = await fetch(weatherAPI)


