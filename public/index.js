import { STL_COORDS, ZOOM_LEVEL, FORM_STRING } from './constants.js';
let marker;
let map;
let storyWindow;
const collection = firebase.firestore().collection('letters');

window.initMap = function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: STL_COORDS,
        gestureHandling: "greedy"
    });
    // var styles = [{ "featureType": "landscape", "stylers": [{ "saturation": -100 }, { "lightness": 65 }, { "visibility": "on" }] }, { "featureType": "poi", "stylers": [{ "saturation": -100 }, { "lightness": 51 }, { "visibility": "simplified" }] }, { "featureType": "road.highway", "stylers": [{ "saturation": -100 }, { "visibility": "simplified" }] }, { "featureType": "road.arterial", "stylers": [{ "saturation": -100 }, { "lightness": 30 }, { "visibility": "on" }] }, { "featureType": "road.local", "stylers": [{ "saturation": -100 }, { "lightness": 40 }, { "visibility": "on" }] }, { "featureType": "transit", "stylers": [{ "saturation": -100 }, { "visibility": "simplified" }] }, { "featureType": "administrative.province", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "labels", "stylers": [{ "visibility": "on" }, { "lightness": -25 }, { "saturation": -100 }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "hue": "#ffff00" }, { "lightness": -25 }, { "saturation": -97 }] }];
    // map.set('styles', styles);

    map.addListener('click', function(e) {
        formWindow.close();
        storyWindow.close();
        if (marker) {
            placeMarker(e.latLng);
        } else {
            marker = new google.maps.Marker({
                map: map
            });
            marker.addListener('click', function(e) {
                formWindow.open(map, marker);
            });
            placeMarker(e.latLng, map);
        }
    });

    function placeMarker(location) {
        marker.setVisible(true);
        marker.setPosition(location);
        if (map.getZoom() < ZOOM_LEVEL) {
            map.setZoom(ZOOM_LEVEL);
        }
        map.panTo(location);
    }

    const formWindow = new google.maps.InfoWindow({
        maxWidth: 500,
        minWidth: 300,
        content: FORM_STRING
    });

    storyWindow = new google.maps.InfoWindow();

    google.maps.event.addListener(formWindow, 'domready', function() {
        let form = document.getElementById("letterForm");
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const formData = new FormData(form);
            let position = formWindow.getPosition();
            let location = new firebase.firestore.GeoPoint(position.lat(), position.lng());

            addStoryToDb(formData, location);
            formWindow.close();
            form.reset();
            marker.setVisible(false);
        });
    });
}

function addStoryToDb(formData, location) {
    let object = {};
    formData.forEach((value, key) => object[key] = value);
    object.location = location;
    object.published = true;
    collection.add(object);
}

function getStories() {
    collection.where("published", "==", true)
        .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                addStoriesToMap(doc.data());
            });
        });
}

getStories();


function addStoriesToMap(storyEntry) {
    let storyPin = new google.maps.Marker({
        map: map,
        position: { lat: storyEntry.location.h_, lng: storyEntry.location.c_ },
        icon: "https://api.geoapify.com/v1/icon/?type=material&color=%23ef2870&size=small&icon=envelope&iconType=awesome&apiKey=38a74f2c2e344d0ca7b18ca97a53c829",
        data: {
            author: storyEntry.author,
            email: storyEntry.email,
            letterText: storyEntry.letterText,
            locationTitle: storyEntry.locationTitle
        }
    });
    storyPin.addListener('click', function(e) {
        if (marker) {
            marker.setVisible(false);
        }

        const STORY_WINDOW_STRING = createStoryWindowString(storyPin.data);
        storyWindow.setContent(STORY_WINDOW_STRING);
        storyWindow.open(map, storyPin);
    });

    // console.log(storyEntry.author);
    // console.log(storyEntry.email);
    // console.log(storyEntry.letterText);
    // console.log(storyEntry.locationTitle);
}

function createStoryWindowString(data) {
    let str = "<div>";
    for (const [key, value] of Object.entries(data)) {
        str += "<h3>" + key + "</h3>";
        str += "<p>" + value + "</p>";
    }

    str += "</div>"
    return str;
}