
let title = document.getElementById("title");
let date = document.getElementById("date");
let media = document.getElementById("media");
let description = document.getElementById("description");
let readMore = document.getElementById("readMore");

let fullDescription = "";

fetch("https://science.nasa.gov/wp-json/wp/v2/apod-basic")
    .then(response => response.json())
    .then(data => {

        console.log(data);

        // Get the newest picture
        let picture = data[0];

        // Display title and date
        title.textContent = picture.title;
        date.textContent = picture.date;

        // Store description
        let temp = document.createElement("div");
        temp.innerHTML = picture.explanation;
        fullDescription = temp.textContent;

        description.textContent =
            fullDescription.substring(0, 200) + "...";

        // Display image
        let image = document.createElement("img");
        image.src = picture.hdurl;
        image.alt = picture.alt;

        media.appendChild(image);

    })
    .catch(error => {
        console.log("Error:", error);
        title.textContent = "Unable to load space discovery.";
    });


// Read more button
readMore.addEventListener("click", function() {

    if (description.dataset.expanded !== "true") {

        description.textContent = fullDescription;
        description.dataset.expanded = "true";
        readMore.textContent = "Show Less";

    } else {

        description.textContent =
            fullDescription.substring(0, 200) + "...";

        description.dataset.expanded = "false";
        readMore.textContent = "Read Full Description";

    }

});
