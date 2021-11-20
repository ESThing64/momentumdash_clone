const imgAuthEl = document.getElementById("img-auth")
let backgroundUrl = "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=banana"
const wrongUrl = "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=naturfghfghe"
const stockUrl = "https://api.polygon.io/v1/open-close/AAPL/2020-10-14?adjusted=true&apiKey=386U_EAyyi_HmpaTSQPXvjYIBTSLU_Js"
const timeNow = luxon.DateTime.local().toFormat("hh:mm a");
const now = luxon.DateTime.now();

console.log(now.toString());
console.log(now.toString(luxon.DateTime.DATETIME_MED));
const timeEl = $('#time')
const stockEl = $('#stock')
const city = "Houston"
let theme = "nature"
const cityEl = $('#city');
const iconEl = $('#icon')
const tempTEl = $('#temp');
const humTEl = $('#hum');

let lat;
let lon;

 backgroundUrl = "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=" + theme 

timeEl.text(timeNow)


// let stockUrl
function getBackground(theme){

    const storedTheme = JSON.parse(localStorage.getItem("theme"));

    if (storedTheme !== null) {
        theme = storedTheme;
      }

    backgroundUrl = "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=" + theme 
fetch(backgroundUrl)
    .then(function(response) {
        return response.json()
            .then(function(data) {

                

                document.body.style.backgroundImage = `url(${data.urls.full})`
                imgAuthEl.textContent = "By: " + data.user.name

            })
    })
    .catch(function() {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1605666807892-8c11d020bede?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzcyODcwMTY&ixlib=rb-1.2.1&q=85)`
    })
}
    fetch(stockUrl)
    .then(function(response) {
        return response.json()
            .then(function(data) {
                console.log(data)
                if (data.status != "OK"){
                    throw Error("Something weird happend. Please try again or something")
                }
                stockEl.html(`
                <span>  ${data.symbol}</span>
                <span>High: ${data.high}</span>
                <span>Low: ${data.low}</span>
                `)
            })
    })
    .catch(err => console.error(err)) 

  function getWeatherByCity(){
      
        const WeatherByCityApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=569b83e02c16eca2296eee261eebaa02"
        $.ajax({
            url: WeatherByCityApi,
            method: 'GET',
        }).then(function(response) {
            const lat = response.coord.lat
            const lon = response.coord.lon
                  
            getWeatherDatabyLatlon(lat, lon)
        });
    }
    
    
    function getWeatherDatabyLatlon(lat, lon) {

       
        const weatherDatabyLatlon = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=569b83e02c16eca2296eee261eebaa02"
        $.ajax({
            url: weatherDatabyLatlon,
            method: 'GET',
        }).then(function(response) {
            console.log(response)
           
            const temp = response.current.temp;
            const humidity = response.current.humidity;
            const icont = "http://openweathermap.org/img/wn/" + response.daily[0].weather[0].icon + "@2x.png"
    
            iconEl.attr("src", icont)
            tempTEl.text("Temp: " + temp + "°F");
            humTEl.text("Humidity: " + humidity + "%");
            cityEl.text(response.name)
        });
    
    }

    function getCityByLatLon(){                                  
        const getCityApi = "http://api.openweathermap.org/geo/1.0/reverse?lat=" + lat + "&lon=" + lon + "&limit=1&appid=569b83e02c16eca2296eee261eebaa02"
        $.ajax({
            url: getCityApi,
            method: 'GET',
        }).then(function(response) {
            console.log(response)
            cityEl.text(response[0].name)
        });
    }

    $('#settings-btn').on('click', async function () {

            
        const themeUpdate = $('#theme').val()
        localStorage.setItem("theme", JSON.stringify(themeUpdate));
      
        console.log(theme)
        getBackground(themeUpdate)
        

      })
    

    function getWeatherByCityorGeo() {

    navigator.geolocation.getCurrentPosition(position => {
        
        lat = position.coords.latitude
        lon = position.coords.longitude
        getCityByLatLon()
        getWeatherDatabyLatlon(lat, lon)
    });
    getWeatherByCity() 

    }
    


getWeatherByCityorGeo()
getBackground()