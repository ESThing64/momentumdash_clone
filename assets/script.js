let imgAuthEl = document.getElementById("img-auth")
let backgroundUrl = "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
let wrongUrl = "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=naturfghfghe"


fetch(backgroundUrl)
    .then(function (response) {
        return response.json()
        .then(function (data) {

            document.body.style.backgroundImage = `url(${data.urls.full})`
            imgAuthEl.textContent = "By: " + data.user.name 
            
        })
    })
    .catch(function () {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDE2NzA&ixlib=rb-1.2.1&q=80&w=1080)`
    })



