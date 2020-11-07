const collection = firebase.firestore().collection('stories');

// fetch('https://api.airtable.com/v0/apppWQcOe5ZLgfcpZ/Table%201?api_key=keyf2wfsXxVRjlcsT')
// 	.then(response => response.json())
// 	.then(function (data) {
// 		// console.log(data);
// 		let records = data.records;

// 		for (var i = 0; i < records.length; i++) {

// 			collection.add(records[i].fields)
// 			.then(function (docRef) {
// 				console.log("Document written with ID: ", docRef.id);
// 			})
// 			.catch(function (error) {
// 				console.error("Error adding document: ", error);
// 			});

// 		}	

// 	});




async function getStories() {
	const snapshot = await collection.get();
	return snapshot.docs.map(doc => doc.data());
}

getStories().then(function (stories) {
	for (let i = 0; i < stories.length; i++) {
		var dbEntry = stories[i];

		var newDiv = document.createElement("div");

		for (const [key, value] of Object.entries(stories[i])) {
			if(key != "Attachments"){
				var text = document.createTextNode(value);
				var label = document.createElement("h3");
				label.appendChild(document.createTextNode(key));
				newDiv.appendChild(label);
				newDiv.appendChild(text);
				
			} else {
				var attachments = dbEntry.Attachments
				var label = document.createElement("h3");
				label.appendChild(document.createTextNode("Attachments"));
				newDiv.appendChild(label);
				for (var j = 0; j < attachments.length; j++) {
					var img = document.createElement("img");
					img.setAttribute('src', attachments[j].url);
					newDiv.appendChild(img);
				}
			}
		}
		newDiv.setAttribute("class", "story");
		// var name = document.createTextNode(dbEntry.Name);

		// var header = document.createElement("h3");
		// header.appendChild(document.createTextNode("Name"))
		// newDiv.appendChild(header);
		// newDiv.appendChild(name);

		// var name = document.createTextNode(dbEntry.Email);
		// newDiv.appendChild(document.createElement("h2").appendChild(document.createTextNode("Email")));
		// newDiv.appendChild(name);

		// var text = document.createTextNode(dbEntry.Description);
		// newDiv.appendChild(document.createElement("h2").appendChild(document.createTextNode("Story")));
		// newDiv.appendChild(text);
		// newDiv.setAttribute("class", "story")

		// var attachments = dbEntry.Attachments
		// if (attachments) {
		// 	for (var j = 0; j < attachments.length; j++) {
		// 		var img = document.createElement("img");
		// 		img.setAttribute('src', dbEntry.Attachments[j].url);
		// 		newDiv.appendChild(img);
		// 	}
		// }

		document.getElementById("stories").appendChild(newDiv);
	}
});



