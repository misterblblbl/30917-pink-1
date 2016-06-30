/**
 * Created by alexandra on 04/05/16.
 */
function initialize() {
  var mapCanvas = document.getElementById('map');
  var mapOptions = {
    center: new google.maps.LatLng(59.938536,30.3224549),
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false
  };
  var map = new google.maps.Map(mapCanvas, mapOptions)
  var pointer = new google.maps.LatLng(59.938536,30.3224549);
  var marker = new google.maps.Marker({
    position: pointer,
    map: map,
    icon: 'img/icon-map-marker.svg'
  })
}
google.maps.event.addDomListener(window, 'load', initialize);
