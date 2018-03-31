function initMap() {
  var center = {lat: 0, lng: 0};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: center
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
    }, function(error) {
      // Browser doesn't support Geolocation
      alert("I don't know where you are, sorry.");
      console.log(error);
    });
  }
}
