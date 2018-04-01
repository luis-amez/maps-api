function initMap() {
  var center = {lat: 50.8429, lng: -0.1313};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: center
  });

  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;
  directionsDisplay.setMap(map);

  calculateAndDisplayRoute(directionsService, directionsDisplay, center);
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
      // Browser doesn't support Geolocation
      alert("I don't know where you are, sorry. Let's say that you are in Brighton.");
      console.log(error);
    });
  }
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, origin) {
  var selectedMode = document.getElementById('mode').value;
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
