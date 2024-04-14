console.log('test')
// Single letter variables used for numbers are z, x and i
// used for weather array
const z = 0

// tells js what and where for the litener app
const myform = document.getElementById('myform')

// looks for the id's for appending cards to
const todayC = document.querySelector('#today');
const days = document.querySelector('#day5');
const leftLane = document.getElementById('leftLane')

// retrives list of cities from storage
let cities = JSON.parse(localStorage.getItem('favCities'))

// creates a saved button when they succefully search a city
function addButton(data){
  // Create a button element
  const button = document.createElement('button');

  // Set the button's text
  button.innerText = data.city.name;

  // give the button the necesay class and id
  button.classList.add('cityButton');
  button.setAttribute('id', 'cityButton');

  button.addEventListener('click', function() {
    alert(button.innerText);
  });

  // Append the button to the section
  leftLane.appendChild(button);
}




// adds the city to storage
function addCityStorage(){
  // checks if cities array has been made otherwise makes it
  if (cities === null){
    cities = [];
  }
  // checks if city is already in storage and cancels function if it is
  if (cities.incudes(data.city.name)){
    alert("city already selected")
    return;
  }
  // adds city to storage
  cities.push(data.city.name);
  let citiesStringified = JSON.stringify(cities);
  localStorage.setItem('favCities', citiesStringified);
}

// creates cars for 5 days of weather
function createCard(data){
  for(let i = 0; i < 5; i++){
    
    let x = (i*8);
    // Selects the weather Icon from the list and creates an image to pe appended to a card
    // turn into function
    const unfilteredIcon = data.list[x].weather[z].icon;
    const filteredIcon = unfilteredIcon.replace(/"/g, '');
    const iIcon = new Image();
    iIcon.src = `./assets/images/${filteredIcon}.png`

    // creates the card for weather || Note move to seperate function later
    // const cityB = document.createElement('div')
    const dayCard = document.createElement('div');
    const head2 = document.createElement('h2');
    const tempP = document.createElement('p');
    const windP = document.createElement('p');
    const humidityP = document.createElement('p');

    // sets the div's class to card
    dayCard.setAttribute("class", "card");

    // Populates the information from the object to the fields
    head2.textContent = data.city.name +" " + data.list[x].weather[z].description;
    head2.appendChild(iIcon);
    tempP.textContent = "The temperature is " + data.list[x].main.temp + '\u00B0C' ;
    windP.textContent = "The windspeed is " + data.list[x].wind.speed + "KPH";
    humidityP.textContent = data.list[x].main.humidity + "%";

    // appends the div to the today field
    if (i === 0){
      todayC.appendChild(dayCard);
    } 
    // appends the card to the 5 day forcast
    if (i !== 0){
      days.appendChild(dayCard);
    }
    

    // appends the fields with data to the card
    dayCard.appendChild(head2);
    dayCard.appendChild(tempP);
    dayCard.appendChild(windP);
    dayCard.appendChild(humidityP);
    console.log(x)
  }
}

myform.addEventListener("submit", function(event) {
    event.preventDefault();


    // gets the value from the input field
    const city = document.getElementById('citySearch');
    console.log(city.value);

     // the url for the search term
     const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value},AU&appid=cdfa38b1cec3b4eb7313441f0358baa1&units=metric`;

    //  used for testing url + api key
    // console.log(apiUrl);

    fetch(apiUrl)
    
    .then(function (response) {
        if (response.status !== 200) {
            alert(`Invalid city`);
          }
          
      return response.json();
    })
    .then(function (data) {
      // used for tessting data return
      console.log(data);
      // console.log(data.list[0].main.temp);
      // console.log(data.list[0].main.humidity);
      // console.log(data.list[0].wind.speed);
      // console.log(data.list[0].weather[0].description);

      createCard(data);
      addButton(data);


      
    });
});



// confirms script ran without issues
console.log("Test2");