/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",us&appid=9aae1adc99b0c613588bbe571588031d";

// Create a new date instance dynamically with JS
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let d = new Date();
let newDate = months[d.getMonth()]+' '+ d.getDate()+' '+ d.getFullYear();

// Event Listener - Click on Element with ID 'generate'
document.getElementById('generate').addEventListener('click', performAction)

// Event Listener Callback Function: performAction
function performAction(event) {
  const zip = document.getElementById('zip').value;
  const response = document.getElementById('feelings').value;
  getWeather(baseURL, zip, apiKey)
    .then(function(data) {
      postData('/', {temp: data.main.temp, date: newDate, entry: response});
    })
    .then(() => updateUI());
}


// Async function that uses fetch() to make a GET request to the OpenWeatherMap API
const getWeather = async (baseURL, zip, apiKey) => {
  const res = await fetch(baseURL+zip+apiKey);
  try {
    const data = await res.json();
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
    return newData;
  } catch(error) {
    console.log("error", error);
  }
}

const updateUI = async () => {
  const req = await fetch('/add');
  try {
    const allData = await req.json();
    document.getElementById('date').textContent = "Today's Date: " + allData.date;
    document.getElementById('temp').textContent = "Temperature: " + Math.round((1.8 * (allData.temp - 273) + 32));
    document.getElementById('content').textContent = "I'm feeling: " + allData.entry;
  } catch(error) {
    console.log("error", error);
  }
}
