const imgAuthEl = document.getElementById("img-auth")
const backgroundUrl = "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=meditation"
const wrongUrl = "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=naturfghfghe"

const timeNow = luxon.DateTime.local().toFormat("hh:mm a");
const timeEl = $('#time')
const stockEl = $('#stock')
const city = "Houston"

const cityEl = $('#city');
const iconEl = $('#icon')
const tempTEl = $('#temp');
const humTEl = $('#hum');


timeEl.text(timeNow)
let stockUrl

fetch(backgroundUrl)
    .then(function(response) {
        return response.json()
            .then(function(data) {

                document.body.style.backgroundImage = `url(${data.urls.full})`
                imgAuthEl.textContent = "By: " + data.user.name

            })
    })
    .catch(function() {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1582177199344-a05724b6e775?crop=entropy&amp;cs=srgb&amp;fm=jpg&amp;ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzcyMDA3MDM&amp;ixlib=rb-1.2.1&amp;q=85&quot)`
    })

    fetch(stockUrl)
    .then(function(response) {
        return response.json()
            .then(function(data) {

                if (data.status != "OK"){
                    throw Error("Something weird happend. Please try again or something")
                }


                stockEl.html(`
                <span>  ${data.symbol}</span>
                <span>High: ${data.high}</span>
                <span>Low: ${data.low}</span>
                `)

              console.log(data)

            })
    })
    .catch(err => console.error(err))
   
    // $.ajax({
    //     url: backgroundUrl,
    //     method: 'GET',
    //   }).then(function (response) {
    //     return response.json()
    //     .then(function(data) {

    //         document.body.style.backgroundImage = `url(${data.urls.full})`
    //         imgAuthEl.textContent = "By: " + data.user.name

    //     })
        


    //   });
      


    // weather


  function getWeatherByCity(){
      
        const WeatherByCityApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=569b83e02c16eca2296eee261eebaa02"
        $.ajax({
            url: WeatherByCityApi,
            method: 'GET',
        }).then(function(response) {
            const lat = response.coord.lat
            const lon = response.coord.lon
            const cityName = response.name + "(" + timeNow.toLocaleString() + ")"
           

            getWeatherDatabyLatlon(lat, lon)
        });
    }
    
    
    function getWeatherDatabyLatlon(lat, lon) {
        const weatherDatabyLatlon = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=569b83e02c16eca2296eee261eebaa02"
        $.ajax({
            url: weatherDatabyLatlon,
            method: 'GET',
        }).then(function(response) {
           
            const temp = response.current.temp;
            const wind = response.current.wind_speed;
            const humidity = response.current.humidity;
            const uv = response.current.uvi;
            const icont = "http://openweathermap.org/img/wn/" + response.daily[0].weather[0].icon + "@2x.png"
    
            iconEl.attr("src", icont)
            tempTEl.text("Temp: " + temp + "°F");
            humTEl.text("Humidity: " + humidity + "%");

    
            // for (i = 1; i < 6; i++) {
    
            //     let icon1 = "http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png"
            //     $("#temp" + i).text("Temp:" + response.daily[i].temp.max + "°F");
            //     $("#hum" + i).text("Humidity:" + response.daily[i].humidity + "%");
            //     $("#wind" + i).text('Wind: "' + response.daily[i].wind_speed + " MPH")
            //     $('#icon' + i).attr("src", icon1)
            //     $('#day' + i).text(timeNow.plus({ days: i }).toLocaleString())
    
    
            // }
    
    
    
        });
    
    }
    

    getWeatherByCity()