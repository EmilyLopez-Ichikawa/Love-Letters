// window.onload = function() {
// 	fetch('https://api.airtable.com/v0/apppWQcOe5ZLgfcpZ/Table%201?api_key=keyf2wfsXxVRjlcsT')
// 	.then(response => response.json())
// 	.then(function(data) {
// 		console.log(data);
// 		let records = data.records;
// 		for(let i = 0; i < records.length; i++) {
// 			var entry = document.createElement("div");
// 			var text = document.createTextNode(records[i].fields.Description);
// 			entry.appendChild(text);
// 			entry.setAttribute("class", "story")

// 			var attachments = records[i].fields.Attachments
// 			if(attachments) {
// 				for(var j = 0; j < attachments.length; j++) {
// 					var img = document.createElement("img");
// 					img.setAttribute('src', records[i].fields.Attachments[j].url);
// 					entry.appendChild(img);
// 				}
// 			}

// 			document.getElementById("stories").appendChild(entry);
// 		}
// 	});
// }

const db = firebase.firestore();

// Reference the document
const myPost = db.collection('stories').doc('cYaDbo2IOGUIEP5A4X5X');

// Listen to realtime changes 
myPost.onSnapshot(doc => {

	const data = doc.data();
	console.log(data);
})
