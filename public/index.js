import { ZOOM_LEVEL, FORM_STRING } from './constants.js';
import { Letter } from './letter.js';
let map;
const collection = firebase.firestore().collection('letters');

window.initMap = function initMap() {
    const stlCoords = { lat: 38.6300000, lng: -90.2400000 };

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: stlCoords,
    });

    // var styles = [{ "featureType": "landscape", "stylers": [{ "saturation": -100 }, { "lightness": 65 }, { "visibility": "on" }] }, { "featureType": "poi", "stylers": [{ "saturation": -100 }, { "lightness": 51 }, { "visibility": "simplified" }] }, { "featureType": "road.highway", "stylers": [{ "saturation": -100 }, { "visibility": "simplified" }] }, { "featureType": "road.arterial", "stylers": [{ "saturation": -100 }, { "lightness": 30 }, { "visibility": "on" }] }, { "featureType": "road.local", "stylers": [{ "saturation": -100 }, { "lightness": 40 }, { "visibility": "on" }] }, { "featureType": "transit", "stylers": [{ "saturation": -100 }, { "visibility": "simplified" }] }, { "featureType": "administrative.province", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "labels", "stylers": [{ "visibility": "on" }, { "lightness": -25 }, { "saturation": -100 }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "hue": "#ffff00" }, { "lightness": -25 }, { "saturation": -97 }] }];
    // map.set('styles', styles);
    const marker = new google.maps.Marker({
        position: stlCoords,
        map: map
    });

    const infowindow = new google.maps.InfoWindow({
        content: FORM_STRING
    });

    function placeMarker(location) {
        marker.setPosition(location);
        if (map.getZoom() < ZOOM_LEVEL) {
            map.setZoom(ZOOM_LEVEL);
        }
        map.panTo(location);
    }

    map.addListener('click', function (e) {
        placeMarker(e.latLng, map);
    });

    marker.addListener('click', function (e) {
        infowindow.open(map, marker);
    });

    google.maps.event.addListener(infowindow, 'domready', function () {
        let form = document.getElementById("letterForm");
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const formData = new FormData(form);
            let position = infowindow.getPosition();
            let location = new firebase.firestore.GeoPoint(position.lat(), position.lng());

            addStoryToDb(formData, location);
            infowindow.close();
            form.reset();
        });
    });
}

function addStoryToDb(formData, location) {
    for (var pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }
    let object = {};
    formData.forEach((value, key) => object[key] = value);
    object.location = location;
    object.published = false;
    console.log(object);
    collection.add(object);
}

// async function getStories() {
//     const snapshot = await collection.get();
//     return snapshot.docs.map(doc => doc.data());
// }

// getStories().then(function (stories) {
//     for (let i = 0; i < stories.length; i++) {
//         var dbEntry = stories[i];

//         var newDiv = document.createElement("div");

//         for (const [key, value] of Object.entries(stories[i])) {
//             if (key != "Attachments") {

//                 var text = document.createTextNode(value);
//                 var label = document.createElement("h3");
//                 label.appendChild(document.createTextNode(key));
//                 newDiv.appendChild(label);
//                 newDiv.appendChild(text);

//             } else {
//                 var attachments = dbEntry.Attachments
//                 var label = document.createElement("h3");
//                 label.appendChild(document.createTextNode("Attachments"));
//                 newDiv.appendChild(label);
//                 for (var j = 0; j < attachments.length; j++) {
//                     var img = document.createElement("img");
//                     img.setAttribute('src', attachments[j].url);
//                     newDiv.appendChild(img);
//                 }
//             }
//         }
//         newDiv.setAttribute("class", "story");

//         document.getElementById("stories").appendChild(newDiv);
//     }
// });

