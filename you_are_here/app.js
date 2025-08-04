document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    const flagsContainer = document.querySelector('.flags');
    const btn = document.querySelector('.footer__btn');
    const USER_NAME = 'lordroman';
    const sound = new Audio('snd.mp3');

    document.addEventListener('click', function(e) {
        const flag = e.target.closest('.flag');
        if(flag) {
            sound.play();
            if (flag.classList.contains('active')) {
                flag.classList.remove('active');
            } else {
                flag.classList.add('active');
                // setTimeout( function() {
                //     flagsContainer.querySelectorAll('.flag').forEach(function(item) {
                //         if(item !== flag && item.classList.contains('active')) {
                //             item.classList.remove('active');
                //             sound.currentTime = 0;
                //             sound.play();
                //         }
                //     })
                // }, 300);
            }
        }
        else{
            flagsContainer.querySelectorAll('.flag').forEach(function(item) {
                if(item.classList.contains('active')) {
                    item.classList.remove('active');
                    sound.currentTime = 0;
                    sound.play();
                }
            })
        }
    });
    btn.addEventListener('click', function() {
        flagsContainer.innerHTML  = '';
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position);
            const {latitude, longitude} = position.coords
            displayCountryByGPS(latitude, longitude)
        },
        function(){
            displayCountryByGPS(0, 0)
        }
        )
    })
    async function displayCountryByGPS(lat, lng){
        // 
        const response = await fetch(`https://api.geonames.org/countryCodeJSON?lat=${lat}&lng=${lng}&username=${USER_NAME}`);
        if(!response.ok) return;
        const { countryName } = await response.json();
        displayCountryData(countryName.toLowerCase());
    }

    function displayCountryData(country){
        fetch(`https://restcountries.com/v3.1/name/${country}`).then(function(response){
            if(!response.ok) throw 'Error!';
            return response.json()
        }).then(function([data]){
            displayCountryFlag(data);
            return Promise.all(data.borders.map(function(border){
                return fetch(`https://restcountries.com/v3.1/alpha/${border}`);
            }))
        }).then(function(borderResponses) {
            return Promise.all(
                borderResponses.map(function(response){
                    return response.json();
            }))
        }).then(function(countries){
            countries.forEach(function([country]){
                displayCountryFlag(country, true)
            })
        })
    }

    function displayCountryFlag(data, neighbour = false){
        const html = `
        <div class="flag${neighbour ? ' flag-neighbour': ''}">
        <div class="flag__front">
        <h3 class="country__name">${data.name.common}</h3>
          <img
            class="flag__img"
            src="${data.flags.png}" />
            <h4 class="country__text">${neighbour ? 'Тут твой сосед': 'Ты здесь'}</h3>
        </div>
        <div class="flag__back">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <div class="country__info-img">&#128106;</div>
          <p class="country__info">${data.population}</p>
          <div class="country__info-img">&#128539;</div>
          <p class="country__info">${Object.values(data.languages).join('<br/>')}</p>
          <div class="country__info-img">&#128181;</div>
          <p class="country__info">${Object.values(data.currencies).map(function(currency){
            return `${currency.symbol}: ${currency.name}`
          }).join('<br/>')}</p>
        </div>
      </div>`;
      flagsContainer.insertAdjacentHTML("beforeend", html);
    }
    
} 