/* Global Variables */
const baseURL = "api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",us&appid=9aae1adc99b0c613588bbe571588031d";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event Listener - Click on Element with ID 'generate'
document.getElementById('generate').addEventListener('click', performAction)

// Async function that uses fetch() to make a GET request to the OpenWeatherMap API
const getWeather = async(baseURL, zip, apiKey) => {
  const res = await fetch(baseURL+zip+apiKey)
  try {
    const data = await res.json();
    return data;
  } catch(error) {
    console.log("error", error);
  }
}
