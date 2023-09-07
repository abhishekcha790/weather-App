const temperatureFeild = document.querySelector(".weather1");
const cityFeild = document.querySelector(".weather2 p");
const dateFeild = document.querySelector(".weather2 span");
const emojiFeild = document.querySelector(".weather3 img");
const weatherFeild = document.querySelector(".weather3 span");
const searchFeild = document.querySelector(".search");
const form = document.querySelector("form");


let target = "delhi";

const fetchData = async(target)=>{

    try {
    const url = `https://api.weatherapi.com/v1/current.json?key=3c5ac9f6a4004451b6b111345231607&q=${target}`

    const response = await fetch(url);
    const data = await response.json(); 

    const{
        current:{temp_c,condition:{text,icon}},
        location:{name,localtime},
    } = data;

    updateDom(temp_c,name,localtime,icon,text);
    
    } catch (error) {
       alert("Location not found"); 
    }
};

function updateDom(temperature,city,time,emoji,text){
    temperatureFeild.innerText = temperature;
    cityFeild.innerText = city;

    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    
    const exactDay = new Date(exactDate).getDay();
    

    dateFeild.innerText = `${exactTime} - ${getDayFullName(exactDay)} ${exactDate}`
    emojiFeild.src= emoji;
    weatherFeild.innerText = text;
}
fetchData(target);


function getDayFullName (num){
    switch (num) {
        case 0:
            return "Sunday"
        case 1:
            return "Monday"
        case 2:
            return "Tuesday"
        case 3:
            return "Wednesday"
        case 4:
            return "Thursday"
        case 5:
            return "Friday"
        case 6:
            return "Saturday"
    
        default:
            return "Don't know";
    }
}

const search =(e)=>{
   e.preventDefault();
   
   target = searchFeild.value;

   fetchData(target);
}

form.addEventListener("submit", search);