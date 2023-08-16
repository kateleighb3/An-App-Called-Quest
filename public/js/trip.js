   
    const cityForecast = document.getElementById('city_forecast');
    const locationName = document.getElementById('location-hbr');
    const cityMain = document.getElementById('city_main');
    const API_KEY = "de0d75ceee768bc79a63e37a19a280d3";


  //   function loadPage() {
  //     cityForecast.style.display="flex";
  // }
  
  // window.onload = loadPage()

  const city = locationName.textContent;
  console.log(city);

  // callRequestedCity(cityAskedFor);

  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + API_KEY + '&units=imperial')
    .then((response) => response.json())
    .then(data => {
        console.log(data);

        const cityMainInfoList = document.createElement('div');

        cityMain.appendChild(cityMainInfoList);
        const now = dayjs().format('ddd, MMMM D, YYYY');

        cityMainInfoList.innerHTML = "<p><h1>" + now + "</h1></p>" +
                                    "<p><h2>" + data.name + "</h2></p>" +
                                    "<img src= https://openweathermap.org/img/w/" + data.weather[0].icon + ".png>" +
                                    "<p>Temperature: " + data.main.temp + " F/</p>" +
                                    "<p>Humidity: " + data.main.humidity + "% </p>" +
                                    "<p>Wind Speed: " + data.wind.speed + " MPH </p>";
        
                                    const lat = data.coord.lat;
                                    const lon = data.coord.lon;
                                    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + API_KEY + '&units=imperial')
                                    .then((response) => response.json())
                                    .then(fiveData => {
                                        console.log("five...", fiveData);
                            
                                    const dayOne = dayjs(fiveData.list[0].dt_txt).format('ddd, MMMM D');
                                    const dayTwo = dayjs(fiveData.list[10].dt_txt).format('ddd, MMMM D');
                                    const dayThree = dayjs(fiveData.list[18].dt_txt).format('ddd, MMMM D');
                                    const dayFour = dayjs(fiveData.list[26].dt_txt).format('ddd, MMMM D');
                                    const dayFive = dayjs(fiveData.list[32].dt_txt).format('ddd, MMMM D');
                                    //const dayOneDate = document.querySelector('.day_one_date');
                            
                                    const forecastDayOne = document.getElementById('forecast_day1');
                                    const forecastDayTwo = document.getElementById('forecast_day2');
                                    const forecastDayThree = document.getElementById('forecast_day3');
                                    const forecastDayFour = document.getElementById('forecast_day4');
                                    const forecastDayFive = document.getElementById('forecast_day5');
                            
                                    forecastDayOne.innerHTML = "<p>" + dayOne + "</p>" +
                                                                "<img src= https://openweathermap.org/img/w/" + fiveData.list[0].weather[0].icon + ".png>" +
                                                                "<p>Temp: " + fiveData.list[0].main.temp + " F </p>" +
                                                                "<p>Humidity: " + fiveData.list[0].main.humidity + "% </p>";
                                    
                                    forecastDayTwo.innerHTML = "<p>" + dayTwo + "</p>" +
                                                                "<img src= https://openweathermap.org/img/w/" + fiveData.list[10].weather[0].icon + ".png>" +
                                                                "<p>Temp: " + fiveData.list[10].main.temp + " F </p>" +
                                                                "<p>Humidity: " + fiveData.list[10].main.humidity + "% </p>";
                            
                                    forecastDayThree.innerHTML = "<p>" + dayThree + "</p>" +
                                                                "<img src= https://openweathermap.org/img/w/" + fiveData.list[18].weather[0].icon + ".png>" +
                                                                "<p>Temp: " + fiveData.list[18].main.temp + " F </p>" +
                                                                "<p>Humidity: " + fiveData.list[18].main.humidity + "% </p>";
                            
                                    forecastDayFour.innerHTML = "<p>" + dayFour + "</p>" +
                                                                "<img src= https://openweathermap.org/img/w/" + fiveData.list[26].weather[0].icon + ".png>" +
                                                                "<p>Temp: " + fiveData.list[26].main.temp + " F </p>" +
                                                                "<p>Humidity: " + fiveData.list[26].main.humidity + "% </p>";
                                  
                                    forecastDayFive.innerHTML = "<p>" + dayFive + "</p>" +
                                                                "<img src= https://openweathermap.org/img/w/" + fiveData.list[32].weather[0].icon + ".png>" +
                                                                "<p>Temp: " + fiveData.list[32].main.temp + " F </p>" +
                                                                "<p>Humidity: " + fiveData.list[32].main.humidity + "% </p>";
                                   // dayOneDate.textContent = dayOne;
                                    
                                    });
                            
                            
                                });



//////////// FORM ////////////////////////////////

const newExcursionFormHandler = async (event) => {
    event.preventDefault();

    const exc_name_form_value = document.querySelector('#excursion-name').value.trim();
    const date_form_value = document.querySelector('#excursion-date').value.trim();
    const time_form_value = document.querySelector('#excursion-time').value.trim();
    const description_form_value = document.querySelector('#excursion-description').value.trim();
    const trip_id = document.querySelector('.new-excursion-form').dataset.trip;
    console.log("trip id", trip_id);
    if (exc_name_form_value && date_form_value) {
      const response = await fetch(`/api/excursion`, {
        method: 'POST',
        body: JSON.stringify({ exc_name_form_value, date_form_value, time_form_value, description_form_value, trip_id}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/trip/' + trip_id); ///?
      } else {
        alert('Failed to create excursion');
      }
      
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/excursion/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/trip/' + trip_id); ///
      } else {
        alert('Failed to delete excursion');
      }

    }
  };
  
  
  document
    .querySelector('.new-excursion-form')
    .addEventListener('submit', newExcursionFormHandler);
  
  document
    .querySelector('.excursion-list')
    .addEventListener('click', delButtonHandler);
  