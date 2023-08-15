    const exc_name_form_value = document.querySelector('#excursion-name').value.trim();
    const date_form_value = document.querySelector('#excursion-date').value.trim();
    const time_form_value = document.querySelector('#excursion-time').value.trim();
    const description_form_value = document.querySelector('#excursion-description').value.trim();
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
        

    });


//////////// FORM ////////////////////////////////

const newExcursionFormHandler = async (event) => {
    event.preventDefault();

  //get all values from the form

    

    //send all values to the server
    
    if (exc_name_form_value && date_form_value) {
      const response = await fetch(`/api/excursion`, {
        method: 'POST',
        body: JSON.stringify({ exc_name_form_value, date_form_value, time_form_value, description_form_value}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/trip'); ///?
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
        document.location.replace('/trip');
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
  