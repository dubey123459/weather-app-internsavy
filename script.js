const $ = document;
$.querySelector(".container2").style.color = "black";

const apiUrlforecast = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q="
const apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const api_key = "eaa87ad729c383896280db3849caa75f";
const iconurl = "https://openweathermap.org/img/wn/";

//fetching city name from input field 
const searchBox = $.querySelector(".search input");
const searchBtn = $.querySelector(".search button");

const audio = new Audio("./sound/rain.mp3");
const audio2 = new Audio("./sound/thunder.mp3");


function backGroundCover(){
    $.querySelector("#card").style.backgroundSize = "cover";
}



// checking current weather
async function checkweather(city) {
    const response = await fetch(apiUrlCurrent + city + `&appid=${api_key}`);
    const data = await response.json();

    const maxTemp = Math.round(Number(data.main.temp_max)); //fetching max temp and changing into number from string
    const minTemp = Math.round(Number(data.main.temp_min));//fetching min temp and changing into number from string

    const main = data.weather[0].main;
    const iconid = data.weather[0].icon; //iconid for images of current weather
    const dayNightId = iconid.slice(2);

    // changing background as per weather
    if (main == "Clear" && dayNightId == "n") {

        $.querySelector("#card").style.backgroundImage = `url("./images/Weatherimages/clearnight.png")`
        backGroundCover();
        $.querySelector("#card").style.color = "white";

    } else if (main == "Clear" && dayNightId == "d") {

        $.querySelector("#card").style.backgroundImage = `url("./images/Weatherimages/clear1.png")`;
        backGroundCover();
    } else if (main == "Clouds" && dayNightId == "d") {

        $.querySelector("#card").style.backgroundImage = `url("./images/Weatherimages/cloudy.png")`;
        backGroundCover();
        $.querySelector("#card").style.color = "white";


    } else if (main == "Clouds" && dayNightId == "n") {

        $.querySelector("#card").style.backgroundImage = `url("./images/Weatherimages/cloudnight.png")`;
        backGroundCover();
        $.querySelector("#card").style.color = "white";

    } else if (main == "Thunderstorm" && dayNightId == "d") {

        $.querySelector("#card").style.backgroundImage = `url("./images/Weatherimages/thunderday.png")`;
        backGroundCover();
        audio2.play();

    } else if (main == "Thunderstorm" && dayNightId == "n") {

        $.querySelector("#card").style.backgroundImage = `url("./images/Weatherimages/thundernight.png")`;
        backGroundCover();
        $.querySelector("#card").style.color = "white";

        audio2.play();

    } else if (main == "Haze" && dayNightId == "d") {

        $.querySelector("#card").style.backgroundImage = `url("./images/Weatherimages/haze1.png")`;
        backGroundCover();

    } else if (main == "Rain" && dayNightId == "d") {

        $.querySelector("#card").style.backgroundImage = `url("./images/Weatherimages/rainday.png")`;
        backGroundCover();
        audio.play()


    } else if (main == "Rain" && dayNightId == "n") {

        $.querySelector("#card").style.backgroundImage = `url("./images/Weatherimages/rainnight.png")`;
        backGroundCover();
        $.querySelector("#card").style.color = "white";
        audio.play();

    } else if (main == "Mist" && dayNightId == "d") {

        $.querySelector("#card").style.backgroundImage = `url("./images/Weatherimages/mist.jpg")`;
        backGroundCover();
        $.querySelector("#card").style.color = "black";

    } else if (main == "Mist" && dayNightId == "n") {

        $.querySelector("#card").style.backgroundImage = `url("./images/Weatherimages/clearnight.png")`;
        backGroundCover();
        $.querySelector("#card").style.color = "white";

    } else if (dayNightId == "n") {

        $.querySelector("#card").style.backgroundImage = `url("./images/Weatherimages/commonnight.png")`;
        backGroundCover();
        $.querySelector("#card").style.color = "white";

    } else {
        $.querySelector("#card").style.backgroundImage = `url("./images/Weatherimages/common.png")`
        backGroundCover();

    }

    $.querySelector(".temp").innerHTML = Math.floor(data.main.temp);// showing main temp
    $.querySelector(".city").innerHTML = data.name;//showing city name

    //showing max and min temp with description like rain,cloud etc
    $.querySelector(".description").innerHTML = main + " " + maxTemp + "°/" + minTemp + "°";


    $.querySelector(".weather-icon").src = iconurl + iconid + "@2x.png";//fetching icon as per current weather



    const sunrise_date = new Date(Number(data.sys.sunrise) * 1000);
    const sun_set = new Date(Number(data.sys.sunset) * 1000);

    const dt = sunrise_date.getHours() + ":" + sunrise_date.getMinutes()//fetching sunrise time as per local time
    const dt2 = sun_set.getHours() + ":" + sun_set.getMinutes();//fetching sunset time as per local time
    $.querySelector(".sunrise").innerHTML = dt + " Sunrise";
    $.querySelector(".sunset").innerHTML = dt2 + " Sunset";


    $.querySelector(".humidity").innerHTML = data.main.humidity + "%";//showing humidity


    //function for getting direction of wind from angle
    const getCardinalDirection = (angle) => {
        const directions = [' ↑N', ' ↗NE', ' →E', ' ↘SE', ' ↓S', ' ↙SW', ' ←W', ' ↖NW'];
        return directions[Math.round(angle / 45) % 8];
    }
    const degree = data.wind.deg;
    const wind = Math.round(Number(data.wind.speed) * 3.6);
    $.querySelector(".wind").innerHTML = wind + "km/h" + getCardinalDirection(degree);


    // real feel temp fetching
    $.querySelector(".realfeel").innerHTML = Math.floor(data.main.feels_like) + "°C";



}


//forecast weather fetching
async function checkforecast(city) {
    const response = await fetch(apiUrlforecast + city + `&appid=${api_key}`);
    const data = await response.json();

    const secondDay = data.list[4].dt;
    const thirdDay = data.list[12].dt;
    const fourthDay = data.list[20].dt;

    const iconid2 = data.list[4].weather[0].icon;
    const iconid3 = data.list[12].weather[0].icon;
    const iconid4 = data.list[20].weather[0].icon;

    const secondDayDate = new Date(Number(secondDay) * 1000);
    const thirdDayDate = new Date(Number(thirdDay) * 1000);
    const fourthDayDate = new Date(Number(fourthDay) * 1000);

    const secondDate = secondDayDate.getDate() + "/" + (secondDayDate.getMonth() + 1);
    const thirdDate = thirdDayDate.getDate() + "/" + (thirdDayDate.getMonth() + 1);
    const fourthDate = fourthDayDate.getDate() + "/" + (fourthDayDate.getMonth() + 1);

    // function for getting day name from unix time
    function checkdays(days) {
        const i = 0;
        const dayDatas = { list: [{ dt: days }] };
        const dayData = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayNum = new Date(dayDatas.list[i].dt * 1000).getDay();
        const result = dayData[dayNum];
        return result;
    }

    // showing three days with date
    $.querySelectorAll("#day1 p")[0].innerHTML = checkdays(secondDay).slice(0, 3);
    $.querySelectorAll("#day1 p")[1].innerHTML = secondDate;
    $.querySelectorAll("#day2 p")[0].innerHTML = checkdays(thirdDay).slice(0, 3);
    $.querySelectorAll("#day2 p")[1].innerHTML = thirdDate;
    $.querySelectorAll("#day3 p")[0].innerHTML = checkdays(fourthDay).slice(0, 3);
    $.querySelectorAll("#day3 p")[1].innerHTML = fourthDate;

    // showing icon as per weather   
    $.querySelectorAll(".grid2 img")[0].src = iconurl + iconid2 + "@2x.png";
    $.querySelectorAll(".grid2 img")[1].src = iconurl + iconid3 + "@2x.png";
    $.querySelectorAll(".grid2 img")[2].src = iconurl + iconid4 + "@2x.png";


    // showing main temp of three day
    $.querySelectorAll("#day1 p")[2].innerHTML = Math.round(data.list[4].main.temp) + "°";
    $.querySelectorAll("#day2 p")[2].innerHTML = Math.round(data.list[12].main.temp) + "°";
    $.querySelectorAll("#day3 p")[2].innerHTML = Math.round(data.list[20].main.temp) + "°";


    const getCardinalDirection = (angle) => {
        const directions = [' ↑ N', ' ↗ NE', ' → E', ' ↘ SE', ' ↓ S', ' ↙ SW', ' ← W', ' ↖ NW'];
        return directions[Math.round(angle / 45) % 8];
    }
    const degree1 = data.list[4].wind.deg;
    const degree2 = data.list[12].wind.deg;
    const degree3 = data.list[20].wind.deg;

    const windSpeed1 = Math.round(Number(data.list[4].wind.speed) * 3.6); //converting km/h
    const windSpeed2 = Math.round(Number(data.list[12].wind.speed) * 3.6); //converting km/h
    const windSpeed3 = Math.round(Number(data.list[20].wind.speed) * 3.6); //converting km/h

    $.querySelectorAll("#day1 p")[3].innerHTML = windSpeed1 + "km/h" + getCardinalDirection(degree1);
    $.querySelectorAll("#day2 p")[3].innerHTML = windSpeed2 + "km/h" + getCardinalDirection(degree2);
    $.querySelectorAll("#day3 p")[3].innerHTML = windSpeed3 + "km/h" + getCardinalDirection(degree3);


    // showing description of weather like rain cloud etc.
    $.querySelectorAll("#day1 h6")[0].innerHTML = data.list[4].weather[0].main;
    $.querySelectorAll("#day2 h6")[0].innerHTML = data.list[12].weather[0].main;
    $.querySelectorAll("#day3 h6")[0].innerHTML = data.list[20].weather[0].main;
}

//  getting current location of user
async function getData(position) {

    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    const response2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${long}&appid=eaa87ad729c383896280db3849caa75f`);
    const data1 = await response2.json();
    checkweather(data1.name);
    checkforecast(data1.name);

}
function failedToGet() {
    console.log("error")
}

window.addEventListener("load", async () => {

    navigator.geolocation.getCurrentPosition(getData, failedToGet)
})



searchBtn.addEventListener("click", function () {
    const value = searchBox.value;

    if (value == "") {
        checkweather("Delhi");
        checkforecast("Delhi")
    } else {
        checkweather(value);
        checkforecast(value);
    }

    $.querySelector(".search input").value = "";
})


const onClickEnterBtn = searchBox;
onClickEnterBtn.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        searchBtn.click();
    }
})

// const countryStateList = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe", "Andhra Pradesh",
// "Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",  "Gujarat","Haryana","Himachal Pradesh","jammu","Kashmir","Jharkhand",
// "Karnataka","Kerala","Madhya Pradesh", "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Telangana","Tripura","Uttarakhand","Uttar Pradesh","West Bengal","Andaman and Nicobar Islands","Chandigarh", "Dadra and Nagar Haveli","Daman and Diu","Delhi","Lakshadweep","Puducherry"];               
                
// // const searchInput  = $.querySelector(".search1");
// // const options = document.querySelector(".options");

// const optionels = document.querySelectorAll(".options");
// const searchel = document.querySelector(".search1");

// const search = () => {
//     optionels.forEach(
//         (e) => 
//         (
//             e.style.display = e.innerHTML.toUpperCase().indexOf(searchel.value.toUpperCase()) > -1 ? "" : "none"
//         )
//     )
// }
                
                
                
                
                
                
                
                
                
                
               
                
                
                
                




