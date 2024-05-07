const searchbar = document.getElementById('searchbar')
const searchlist = document.getElementById('list')
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


//take input from search box, pull and organize data from API.
// https fix
async function getCity (city) {
    if (!city) {
    }
    else {
    const weatherApi = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`)
    const weatherdata = await weatherApi.json()
    const forecastApi = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=imperial`)
    const forecastdata = await forecastApi.json()
 //current weather conditions and sent up to global storage
    let cityweather = weatherdata.main
    let weathericon = weatherdata.weather[0].icon
    let windspeed = weatherdata.wind
// pushed variables up to lcoal storage
    icon.push(weathericon)  
    currentwind.push(windspeed)
    weatherhistory.push(cityweather)
    cities.push(city)
// built an array for a 5 day forecast and sent up to global storage
    let cityforecast = forecastdata.list
     let fivedayforecast = [
        cityforecast[7],
        cityforecast[15],
        cityforecast[23],
        cityforecast[31],
        cityforecast[39]
     ]
     forecasthistory.push(...fivedayforecast)
    }
} 

//set variable to track 
let n = 0

//function for placing data into objects

async function postdata () { 
    cityInfo.innerHTML = '';
    await getCity(searchbox.value)
            let i = ((cities.length) - 1);
            let currentcity = cities[i];
            let currentconditions = weatherhistory[i];
            let windspeed = currentwind[i].speed

            let history = document.createElement('div')
            history.setAttribute('class','history')
            for (h=0;h<cities.length;h++) {
                let cityname = document.createElement('button')
                cityname.setAttribute('class',`${cities[h]}`)
                cityname.innerText = `${cities[h]}`
                history.appendChild(cityname)
            }
            searchlist.appendChild(history)
            
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

            let infotext = document.createElement('div')
            infotext.innerText = '5 day forecast'

            let fiveday = document.createElement('div')
            fiveday.setAttribute('class','fiveday')

            
            
            for (d=n; d<forecasthistory.length;d++) {
                let day = document.createElement('div')
                day.setAttribute('class','date')
                let iconlocation = forecasthistory[d].weather[0].icon
                let iconspot = document.createElement('img')
                iconspot.setAttribute('src',`https://openweathermap.org/img/wn/${iconlocation}@2x.png`)
                day.appendChild(iconspot)


                let temp = forecasthistory[d].main.temp
                let forecasttemp = document.createElement('p')
                forecasttemp.innerText = `Temp: ${temp} degrees`
                day.appendChild(forecasttemp)
                let feelslike = document.createElement('p')
                feelslike.innerText = `Feels like: ${forecasthistory[d].main.feels_like} degrees`
                day.appendChild(feelslike)
                let forecasthumidty = document.createElement('p')
                forecasthumidty.innerText = `Humidity: ${forecasthistory[d].main.humidity} %`
                day.appendChild(forecasthumidty)
                let forecastwind = document.createElement('p')
                forecastwind.innerText = `WindSpeed: ${forecasthistory[d].wind.speed} MPH`
                day.appendChild(forecastwind)
                let date = document.createElement('p')
                date.innerText = `Date: ${forecasthistory[d].dt_txt}`
                day.appendChild(date)
                fiveday.appendChild(day)
            }
            n+=5
            infotext.appendChild(fiveday)
            forecast.appendChild(infotext)
            
            }


searchbtn.addEventListener('click',(event => {
    event.preventDefault()
    searchlist.innerHTML = ''
    forecast.innerHTML = ''
    postdata()
    searchbox.value = ''
}))

searchlist.addEventListener('click',event => {
    searchlist.innerHTML = ''
    forecast.innerHTML = ''
    let buttons = event.target
    let inputcity = buttons.innerText
    searchbox.value = `${inputcity}`
    console.log(inputcity)
    postdata()
    searchbox.value = ''
})

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


