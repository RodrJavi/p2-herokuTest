// When post button is clicked, postFormHandler is run
const postFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector("#post-content").value.trim();
  const postDate = new Date();

  var backgroundImage;

  // Tries to get user position,it can assign the default background post image
  try {
    const userPosition = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    // If we are able to get user position, we run the function to get the background image
    if (userPosition) {
      const lat = userPosition.coords.latitude;
      const lon = userPosition.coords.longitude;

      backgroundImage = await getbackGround(lat, lon);
    }
  } catch {
    backgroundImage = "/assets/images/default.jpeg";
  }

  // Post method to the route for the users post
  if (content) {
    const response = await fetch("/api/users/post", {
      method: "POST",
      body: JSON.stringify({ content, postDate, backgroundImage }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Error posting");
    }
  } else {
    alert("Post can not be empty");
  }
};

// Function to get the forecast data
async function getForecast(lat, lon) {
  const weatherURL = `/api/weather?lat=${lat}&lon=${lon}`;

  return fetch(weatherURL).then(function (response) {
    return response.json();
  });
}

// function that gets the background image url
async function getbackGround(lat, lon) {
  var imgString;

  const data = await getForecast(lat, lon);

  var ID = data.list[0].weather[0].id;

  if (ID >= 200 && ID <= 232) {
    imgString = "/assets/images/stormyphoto.jpg";
  } else if (ID >= 300 && ID <= 321) {
    imgString = "/assets/images/stormyphoto.jpg";
  } else if (ID >= 500 && ID <= 531) {
    imgString = "/assets/images/stormyphoto.jpg";
  } else if (ID >= 600 && ID <= 622) {
    imgString = "/assets/images/snowyphoto.jpg";
  } else if (ID == 701) {
    imgString = "/assets/images/cloudyphoto.JPG";
  } else if (ID == 11) {
    imgString = "/assets/images/cloudyphoto.JPG";
  } else if (ID == 721) {
    imgString = "/assets/images/cloudyphoto.JPG";
  } else if (ID == 731) {
    imgString = "/assets/images/cloudyphoto.JPG";
  } else if (ID == 741) {
    imgString = "/assets/images/cloudyphoto.JPG";
  } else if (ID == 751) {
    imgString = "/assets/images/stormyphoto.jpg";
  } else if (ID == 761) {
    imgString = "/assets/images/stormyphoto.jpg";
  } else if (ID == 762) {
    imgString = "/assets/images/volcanophoto.jpeg";
  } else if (ID == 771) {
    imgString = "/assets/images/stormyphoto.jpg";
  } else if (ID == 781) {
    imgString = "/assets/images/tornadophoto.jpeg";
  } else if (ID == 800) {
    imgString = "/assets/images/sunnyphoto.jpeg";
  } else if (ID >= 801 && ID <= 804) {
    imgString = "/assets/images/cloudyphoto.JPG";
  }

  return imgString;
}

document
  .querySelector(".post-form")
  .addEventListener("submit", postFormHandler);
