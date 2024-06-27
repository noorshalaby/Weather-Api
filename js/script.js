"use strict";
// *elements
const forecastContainer = document.querySelector(".forecast-container");
const searchIn = document.querySelector(".search");

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function whereAmI() {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    const geo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
    );
    const geodata = await geo.json();
    const temp = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=e6e8f84769574c859a712124242606&q=${geodata.city}&days=3`
    );
    const tempdata = await temp.json();
    return tempdata;
  } catch (err) {
    console.log("err");
  }
}
(async function () {
  try {
    const data = await whereAmI();
    const date = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const todayName = days[date.getDay()];
    const tommorwName = days[date.getDay() + 1];
    const afterTommorowName = days[date.getDay() + 2];
    const date2 = new Intl.DateTimeFormat("en-us", {
      day: "numeric",
      month: "short",
    }).format(date);
    forecastContainer.innerHTML = "";
    const [today, tommorow, afterTommorow] = data.forecast.forecastday;
    const todayimg = today.day.condition.icon;
    const tommorowimg = tommorow.day.condition.icon;
    const afterTommorowimg = afterTommorow.day.condition.icon;
    forecastContainer.insertAdjacentHTML(
      "beforeend",
      `
  <div class="today forecast">
  <div class="forecast-header">
    <div class="day">${todayName}</div>
    <div class="date">${date2}</div>
  </div> <!-- .forecast-header -->
  <div class="forecast-content">
    <div class="location">${data.location.name}</div>
    <div class="degree">
      <div class="num">${today.day.maxtemp_c}<sup>o</sup>C</div>
      <div class="forecast-icon">
        <img src='https:${todayimg}' alt="" width=90>
        </div>	
        </div>
        <p class="blue">${today.day.condition.text}</p>
    <span><img src="images/icon-umberella.png" alt="">20%</span>
    <span><img src="images/icon-wind.png" alt="">18km/h</span>
    <span><img src="images/icon-compass.png" alt="">East</span>
  </div>
  </div>
  <div class="forecast">
  <div class="forecast-header">
    <div class="day">${tommorwName}</div>
  </div> <!-- .forecast-header -->
  <div class="forecast-content">
    <div class="forecast-icon">
      <img src="https:${tommorowimg}" alt="" width=48>
      <p class="blue">${tommorow.day.condition.text}</p>
    </div>
    <div class="degree">${tommorow.day.maxtemp_c}<sup>o</sup>C</div>
    <small>${tommorow.day.mintemp_c}<sup>o</sup>c</small>
  </div>
  </div>
  <div class="forecast">
  <div class="forecast-header">
    <div class="day">${afterTommorowName}</div>
  </div> <!-- .forecast-header -->
  <div class="forecast-content">
    <div class="forecast-icon">
      <img src="https:${afterTommorowimg}" alt="" width=48>
      <p class="blue">${afterTommorow.day.condition.text}</p>
    </div>
    <div class="degree">${afterTommorow.day.maxtemp_c}<sup>o</sup>C</div>
    <small>${afterTommorow.day.mintemp_c}<sup>o</sup>c</small>
  </div>
  </div>
  `
    );
  } catch (err) {
    console.log(err);
  }
})();

async function getCity(city) {
  const temp = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=adef4456af434f56bee84914241806&q=${city}&days=3`
  );
  const tempdata = await temp.json();
  return tempdata;
}

searchIn.addEventListener("input", async function () {
  const data = await getCity(searchIn.value);
  const date = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const todayName = days[date.getDay()];
  const tommorwName = days[date.getDay() + 1];
  const afterTommorowName = days[date.getDay() + 2];
  const date2 = new Intl.DateTimeFormat("en-us", {
    day: "numeric",
    month: "short",
  }).format(date);
  forecastContainer.innerHTML = "";
  const [today, tommorow, afterTommorow] = data.forecast.forecastday;
  const todayimg = today.day.condition.icon;
  const tommorowimg = tommorow.day.condition.icon;
  const afterTommorowimg = afterTommorow.day.condition.icon;
  forecastContainer.insertAdjacentHTML(
    "beforeend",
    `
  <div class="today forecast">
  <div class="forecast-header">
    <div class="day">${todayName}</div>
    <div class="date">${date2}</div>
  </div> <!-- .forecast-header -->
  <div class="forecast-content">
    <div class="location">${data.location.name}</div>
    <div class="degree">
      <div class="num">${today.day.maxtemp_c}<sup>o</sup>C</div>
      <div class="forecast-icon">
        <img src='https:${todayimg}' alt="" width=90>
        </div>	
        </div>
        <p class="blue">${today.day.condition.text}</p>
    <span><img src="images/icon-umberella.png" alt="">20%</span>
    <span><img src="images/icon-wind.png" alt="">18km/h</span>
    <span><img src="images/icon-compass.png" alt="">East</span>
  </div>
  </div>
  <div class="forecast">
  <div class="forecast-header">
    <div class="day">${tommorwName}</div>
  </div> <!-- .forecast-header -->
  <div class="forecast-content">
    <div class="forecast-icon">
      <img src="https:${tommorowimg}" alt="" width=48>
      <p class="blue">${tommorow.day.condition.text}</p>
    </div>
    <div class="degree">${tommorow.day.maxtemp_c}<sup>o</sup>C</div>
    <small>${tommorow.day.mintemp_c}<sup>o</sup>c</small>
  </div>
  </div>
  <div class="forecast">
  <div class="forecast-header">
    <div class="day">${afterTommorowName}</div>
  </div> <!-- .forecast-header -->
  <div class="forecast-content">
    <div class="forecast-icon">
      <img src="https:${afterTommorowimg}" alt="" width=48>
      <p class="blue">${afterTommorow.day.condition.text}</p>
    </div>
    <div class="degree">${afterTommorow.day.maxtemp_c}<sup>o</sup>C</div>
    <small>${afterTommorow.day.mintemp_c}<sup>o</sup>c</small>
  </div>
  </div>
  `
  );
})(async function () {
  try {
    const data = await whereAmI();
    const date = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const todayName = days[date.getDay()];
    const tommorwName = days[date.getDay() + 1];
    const afterTommorowName = days[date.getDay() + 2];
    const date2 = new Intl.DateTimeFormat("en-us", {
      day: "numeric",
      month: "short",
    }).format(date);
    forecastContainer.innerHTML = "";
    const [today, tommorow, afterTommorow] = data.forecast.forecastday;
    const todayimg = today.day.condition.icon;
    const tommorowimg = tommorow.day.condition.icon;
    const afterTommorowimg = afterTommorow.day.condition.icon;
    forecastContainer.insertAdjacentHTML(
      "beforeend",
      `
<div class="today forecast">
<div class="forecast-header">
  <div class="day">${todayName}</div>
  <div class="date">${date2}</div>
</div> <!-- .forecast-header -->
<div class="forecast-content">
  <div class="location">${data.location.name}</div>
  <div class="degree">
    <div class="num">${today.day.maxtemp_c}<sup>o</sup>C</div>
    <div class="forecast-icon">
      <img src='https:${todayimg}' alt="" width=90>
      </div>	
      </div>
      <p class="blue">${today.day.condition.text}</p>
  <span><img src="images/icon-umberella.png" alt="">20%</span>
  <span><img src="images/icon-wind.png" alt="">18km/h</span>
  <span><img src="images/icon-compass.png" alt="">East</span>
</div>
</div>
<div class="forecast">
<div class="forecast-header">
  <div class="day">${tommorwName}</div>
</div> <!-- .forecast-header -->
<div class="forecast-content">
  <div class="forecast-icon">
    <img src="https:${tommorowimg}" alt="" width=48>
    <p class="blue">${tommorow.day.condition.text}</p>
  </div>
  <div class="degree">${tommorow.day.maxtemp_c}<sup>o</sup>C</div>
  <small>${tommorow.day.mintemp_c}<sup>o</sup>c</small>
</div>
</div>
<div class="forecast">
<div class="forecast-header">
  <div class="day">${afterTommorowName}</div>
</div> <!-- .forecast-header -->
<div class="forecast-content">
  <div class="forecast-icon">
    <img src="https:${afterTommorowimg}" alt="" width=48>
    <p class="blue">${afterTommorow.day.condition.text}</p>
  </div>
  <div class="degree">${afterTommorow.day.maxtemp_c}<sup>o</sup>C</div>
  <small>${afterTommorow.day.mintemp_c}<sup>o</sup>c</small>
</div>
</div>
`
    );
  } catch (err) {
    console.log(err);
  }
})();

// ******************
