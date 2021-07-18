function writeForecastToPage(forecast){
  const forecastDiv = document.getElementById('forecast');
  document.getElementById('address').value = '';
  forecastDiv.innerText = forecast
}


async function getForecast(address) {
  try{
    const response = await fetch(`/weather?address=${address}`);
    const data = await response.json();
    
    if(data.error) throw data;
    const {location, current} = data;
    const forecast = `It is currently ${current.weather_descriptions[0].toLowerCase()} with a temperature of ${current.temperature} degrees in ${location.name}, ${location.region}. It feels like ${current.feelslike} degrees outside. There is a ${current.precip}% chance of rain.` 
    writeForecastToPage(forecast);
  } catch(err) {
    console.error(`${err.error}: ${err.message}`);
    const errMsg = 'We apologize something went wrong with your search! Please try again!';
    writeForecastToPage(errMsg);
  }
}

const weatherForm = document.querySelector('form');
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const address = document.getElementById('address').value;
  console.log(address);
  getForecast(address);
})