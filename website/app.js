/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",us&appid=9aae1adc99b0c613588bbe571588031d";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event Listener - Click on Element with ID 'generate'
document.getElementById('generate').addEventListener('click', performAction)

// Event Listener Callback Function: performAction
function performAction(event) {
  const zip = document.getElementById('zip').value;
  const response = document.getElementById('feelings').value;
  getWeather(baseURL, zip, apiKey)
    .then(function(data) {
      console.log(data);
      postData('/', {temp: data.main.temp, date: newDate, entry: response});
    })
}

// Async function that uses fetch() to make a GET request to the OpenWeatherMap API
const getWeather = async (baseURL, zip, apiKey) => {
  const res = await fetch(baseURL+zip+apiKey);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch(error) {
    console.log("error", error);
  }
}

// Async function that uses fetch() to make a POST request to add the API data to the app
const postData = async (url = "", data = {}) => {
  console.log(data);
  const res = await fetch(url, {
    method: 'POST', // access the POST route setup in server side code
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data), // how we access data on the server side - data sent to a web server has to be a STRING and it is attached to the body of the request
  });

  try {
    const newData = await res.json();
    console.log(newData);
    return newData;
  } catch(error) {
    console.log("error", error);
  }
}
