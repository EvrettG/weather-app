console.log('test')
// tells js what and where for the litener app
const myform = document.getElementById('myform')

// looks for the today id for appending cards to
const todayC = document.querySelector('#today');

myform.addEventListener("submit", function(event) {
    event.preventDefault();

    // used for weather array
    z = 0
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
      console.log(data);
      console.log(data.list[0].main.temp)
      console.log(data.list[0].main.humidity)
      console.log(data.list[0].wind.speed)
      console.log(data.list[0].weather[0].description)

      // Selects the weather Icon from the list and creates an image to pe appended to a card
      const unfilteredIcon = data.list[0].weather[z].icon;
      const filteredIcon = unfilteredIcon.replace(/"/g, '');
      const iIcon = new Image();
      iIcon.src = `./assets/images/${filteredIcon}.png`

      // creates the card for weather || Note move to seperate function later
      const dayCard = document.createElement('div');
      const head2 = document.createElement('h2');
      const tempP = document.createElement('p');
      const windP = document.createElement('p');
      const humidityP = document.createElement('p');

      // sets the div's class to card
      dayCard.setAttribute("class", "card");

      // Populates the information from the object to the fields
      head2.textContent = data.city.name +" " + data.list[0].weather[z].description;
      head2.appendChild(iIcon);
      tempP.textContent = "The tempretur is " + data.list[0].main.temp + '\u00B0C' ;
      windP.textContent = "The windspeed is " + data.list[0].wind.speed + "KPH";
      humidityP.textContent = data.list[0].main.humidity + "%";

      // appends the div to the today field
      todayC.appendChild(dayCard);

      // appends the fields with data to the card
      dayCard.appendChild(head2);
      dayCard.appendChild(tempP);
      dayCard.appendChild(windP);
      dayCard.appendChild(humidityP);

      
    });
});



