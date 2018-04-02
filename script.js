function initMap() {
  // Display map
  var origin = {lat: 50.8429, lng: -0.1313};
  var destination = null;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: origin
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
  calculateAndDisplayRoute(directionsService, directionsDisplay, origin, destination);

  // Add event listener for user travel mode selection
  document.getElementById('mode').addEventListener('change', function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay, origin, destination);
  });

  // Create the search box and link it to the UI element
  var input = document.getElementById('destination-input');
  var autocomplete = new google.maps.places.Autocomplete(input);

  // Add event listener for user destination selection
  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    destination = place.geometry.location;
    calculateAndDisplayRoute(directionsService, directionsDisplay, origin, destination);
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      origin = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(origin);
      calculateAndDisplayRoute(directionsService, directionsDisplay, origin, destination);
    }, function(error) {
      // Browser doesn't support geolocation
      alert("I don't know where you are, sorry. Let's say that you are in Brighton.");
      console.log(error);
    });
  }
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, origin, destination) {
  // Take user selection
  var selectedMode = document.getElementById('mode').value;

  // Set Oxford as default destination
  if (destination === null) {
    destination = {lat: 51.7519, lng: -1.2578};
  }

  // Display route to Oxford
  directionsService.route({
    origin: origin,
    destination: destination,
    travelMode: google.maps.TravelMode[selectedMode]
  }, function(response, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
