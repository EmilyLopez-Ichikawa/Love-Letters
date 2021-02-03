export const STL_COORDS = { lat: 38.6300000, lng: -90.2400000 };
export const STL_BOUNDS = {
    north: 38.86,
    south: 38.46,
    west: -90.86,
    east: -89.7,
};


export const ZOOM_LEVEL = 15;

export const FORM_STRING =
    '<div id="form">' +
    '<form id="letterForm">' +
    '<div class="form-group">' +
    '<label for="locationTitle">Location Title*</label>' +
    '<input type="text" class="form-control" id="locationTitle" name="locationTitle">' +
    '</div>' +

    '<div class="form-group">' +
    '<label for="letterText">Letter*</label>' +
    '<textarea type="text" class="form-control"id="letterText" rows="5" name="letterText"></textarea>' +
    '</div>' +

    '<div class="form-group">' +
    '<label for="author">Name</label>' +
    '<input type="text" class="form-control"id="author" name="author">' +
    '</div>' +

    '<div class="form-group">' +
    '<label for="email">Email</label>' +
    '<input type="text" class="form-control"id="email" name="email">' +
    '</div>' +

    '<input type="submit" class="btn btn-primary">' +
    '</form>' +
    '</div>';