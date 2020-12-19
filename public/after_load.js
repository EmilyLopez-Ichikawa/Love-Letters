var storageRef = firebase.storage().ref("image/stlflag.jpg");
var fileUpload = document.getElementById("fileUpload");
// function uploadFile (files){
//     var firstFile = files.items(0); // get the first file uploaded
//     var uploadTask = storageRef.put(firstFile);
// }

function uploadFile(files) {
    const storageRef = firebase.storage().ref();
    const imgRef = storageRef.child('image/img.png');

    const file = files.item(0);
    var uploadTask = imgRef.put(file);

    // successful upload
    uploadTask.then(snapshot => {
        const url = snapshot.downloadURL
    })

    // monitor progress
    uploadTask.on('state_changed', snapshot => {
        console.log(snapshot)

    })
}