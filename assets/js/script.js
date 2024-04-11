console.log('test')
// tells js what and where for the litener app
const myform = document.getElementById('myform')


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
      console.log(data);
      console.log(data.list[0].main.temp)
    
    });
});

