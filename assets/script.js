const imgAuthEl = document.getElementById("img-auth")
const backgroundUrl = "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=meditation"
const wrongUrl = "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=naturfghfghe"

const stockEl = $('#stock')
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
                <p>${data.symbol}</p>
                <p>High: ${data.high}</p>
                <p>Low: ${data.low}</p>
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
      