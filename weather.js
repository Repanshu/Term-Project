const weatherForm = document.querySelector(".weatherForm");
const city = document.querySelector(".city");
const card = document.querySelector(".card");




weatherForm.addEventListener("submit",async event=>{
    event.preventDefault();
    const apiKey = (await fetch('apis.json').then(response => response.json()))[0];
    console.log(apiKey)
    event.preventDefault();

    const sheher = city.value;

    if(sheher){
        try{
            const weatherData = await getWeatherData(sheher,apiKey);
            displayWeatherInfo(weatherData);

        }
        catch(error){
            console.log(error);
            displayError(error);
        }

    }
    else{
        displayError("Please enter a city");
    }

});

async function getWeatherData(sheher,apiKey){

    try {
        const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${sheher}&limit=1&appid=${apiKey}`;
        const response = await fetch(apiUrl);
        const rawdata = await response.json();
        const data = [rawdata[0]?.lat, rawdata[0]?.lon];
      
        if (!data[0] || !data[1]) {
            throw new Error('Latitude or Longitude is not defined.');
          }
      
        const apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${data[0]}&lon=${data[1]}&appid=${apiKey}`;
        const response2 = await fetch(apiUrl2);
        return await response2.json();
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
          return null;
        }
      };

function displayWeatherInfo(data){
    const{name: city,
          main: {temp,humidity},
          weather: [{description, id}]} = data;
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp-273.15).toFixed(1)} °C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");
    

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

};

function getWeatherEmoji(weatherId){
    console.log(weatherId);
    if(200<=weatherId && weatherId<300){
        return "⛈️"
    }
    else if(400<=weatherId && weatherId<500){return "🌦️"}
    else if(500<=weatherId && weatherId<600){return "🌧️"}
    else if(600<=weatherId && weatherId<700){return "❄️"}
    else if(700<=weatherId && weatherId<800){return "🌫️"}
    else if(weatherId === 800){return "☀️"}
    else if(weatherId > 800){return "⛅"}

};

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

};
