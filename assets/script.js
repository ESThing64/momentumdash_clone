let backgroundImgEl = document.getElementById("background-img")

fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
.then(function (response) {
  return response.json();
})
.then(function (data) {
    document.body.style.backgroundImage = `url(${data.urls.full})`
//     backgroundImgEl.src = data.urls.full
//   console.log(data.urls.full);
});

