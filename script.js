function initMap() {
  // Display map
  var center = {lat: 50.8429, lng: -0.1313};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: center
  });

  // Init directions
  var directionsDisplay = new google.maps.DirectionsRenderer({
    polylineOptions: {
      strokeColor: "yellow"
    }
  });;
  var directionsService = new google.maps.DirectionsService;
  directionsDisplay.setMap(map);

  // Show route for default coordinates
  calculateAndDisplayRoute(directionsService, directionsDisplay, center);

  // Add event listener for user selection
  document.getElementById('mode').addEventListener('change', function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay, center);
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(center);
      calculateAndDisplayRoute(directionsService, directionsDisplay, center);
    }, function(error) {
      // Browser doesn't support geolocation
      alert("I don't know where you are, sorry. Let's say that you are in Brighton.");
      console.log(error);
    });
  }
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, origin) {
  // Take user selection
  var selectedMode = document.getElementById('mode').value;

  // Display route to Oxford
  directionsService.route({
    origin: origin,
    destination: {lat: 51.7519, lng: -1.2578},
    travelMode: google.maps.TravelMode[selectedMode]
  }, function(response, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
