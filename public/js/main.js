const cityName = document.getElementById("cityName");
const submitBtn = document.getElementById("submitBtn");
const city_name = document.getElementById("city_name");

const temp_real_value = document.getElementById("temp_real_value");
const temp_status = document.getElementById("temp_status");
const datahide = document.querySelector(".middle_layer");


const getInfo = async(event)=>{
    event.preventDefault();
    let cityVal = cityName.value; 
    if(cityVal === ""){
        datahide.classList.add("data_hide");
        city_name.innerText =  `Please write the city name before search`;
    }else{
        try{
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=c50e5ced20f429cfd9d441769d6cbe2d`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name},${arrData[0].sys.country} `;
            temp.innerText = arrData[0].main.temp;
            temp_status.innerText = arrData[0].weather[0].main;
            
            const tempMood = arrData[0].weather[0].main;
            
            // condition to check sunny or cloudy
            if(tempMood == "Clear"){
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>"
            } else if(tempMood == "Clouds"){
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>"
            } else if(tempMood == "Rain"){
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>"
            } else {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #eccc68;'></i>"
            }

            datahide.classList.remove("data_hide");
        }
        catch(err){
            datahide.classList.add("data_hide");
            city_name.innerText =  `Please enter the city name properly`;
            console.log(err);
        }
        
    } 
};

submitBtn.addEventListener("click", getInfo);