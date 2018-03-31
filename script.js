function initMap() {
  var center = {lat: 50.8429, lng: -0.1313};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: center
  });

  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;
  directionsDisplay.setMap(map);

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
      calculateAndDisplayRoute(directionsService, directionsDisplay, pos);
    }, function(error) {
      // Browser doesn't support Geolocation
      alert("I don't know where you are, sorry. Let's say that you are in Brighton.");
      console.log(error);
    });
  }

  calculateAndDisplayRoute(directionsService, directionsDisplay, center);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, origin) {
  // var selectedMode = document.getElementById('mode').value;
  var selectedMode = "WALKING";
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
