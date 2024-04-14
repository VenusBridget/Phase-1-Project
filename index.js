// Setting up authentication using local storage
const signUp = (e) => {
    let userName = document.getElementById("userName").value;
    let password = document.getElementById("password").value;

    const user = {
        userName: userName,
        password: password
    }

    let json = JSON.stringify(user);
    localStorage.setItem(user, json);
    console.log("user added")
}

// Declare the div for popular-destinations
const popularDestinations = document.querySelector(".popular-destinations")
// Declare the endpoint url
const url = "http://localhost:3000/destinations";
//  Use fetch to get destinations from server
fetch(url)
    .then(response => {
        return response.json();
    }).then(

        // Write a function to show how different data will be used to create a card
        function displayDestinations(destinations) {
            popularDestinations.innerHTML = "";
            // Use for each method to create a card
            destinations.forEach(destination => {
                const card = createDestinationCard(destination);
                popularDestinations.appendChild(card);
            });
        })

// Create the card for different destinations
function createDestinationCard(destination) {
    // Use destructuring method to get the keys
    const { id, name, location, capacity, tickets_sold, price, days, date, prebook, info, image } = destination;

    const card = document.createElement("div");
    card.classList.add("destination-card");
    card.setAttribute("data-destination-id", id);

    const container = document.createElement("div");
    container.classList.add("destination-card_container");

    const favBtn = document.createElement("div");
    favBtn.classList.add("destination-card_btn", "fav");
    favBtn.innerHTML = '<button onclick= "likeButton()" class="like"><i class="fa fa-heart" aria-hidden="true" id="like-btn"></i></button>';

    // Create image div
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("destination-card_img");
    const img = document.createElement("img");
    img.src = image;
    imgContainer.appendChild(img);
    //Append the contents to the container 
    container.appendChild(favBtn);
    container.appendChild(imgContainer);

    // Add the descriptions
    const description = document.createElement("div");
    description.classList.add("destination-card_description");
    description.innerHTML = `
        <div class="destination-card_name"><span>${name}</span></div>
        <div class="destination-card_location">${location}</div>
        <div class="destination-card_info">${info}</div>
        <div class="destination-card_days">${days}</div>
        <div class="destination-card_price">${price}</div>
        <div class="destination-card_day">${date}</div>
        <div class="destination-card_offer">${prebook}</div>
        <div><span id="ticket-num">${capacity - tickets_sold}</span> tickets</div>
    `;
    const extraContent = document.createElement("div");
    extraContent.classList.add("extra", "content");
    extraContent.innerHTML = '<button onclick="getAlert()" id="buy-ticket">BOOK NOW</button>'

    // Append all contents to the card 
    card.appendChild(container);
    card.appendChild(description);
    card.appendChild(extraContent);

    // To display the cards
    return card;
}

//Declare variables for search button and search input
const searchInput = document.getElementById("srch");
const searchButton = document.getElementById("search");

// Add an event listener to the click button to return results when clicked
searchButton.addEventListener("click", () => {
    const searchDest = searchInput.value.trim().toLowerCase();
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // Use find method to loop through the array and return search result
            const destination = data.find(destination => destination.name.toLowerCase() === searchDest);
            if (destination) {
                console.log("Found:", destination)
            } else {
                console.log("not found");
            }
        })
        .catch(error => console.error("error fetching data:", error))
});


// Set-up book button to generate an alert on how to pay
function getAlert() {
    // console.log("clickyy")
    let payToMpesa = alert("PAY TO MPESA PAYBILL 740636117");
    console.log(payToMpesa)
};
document.getElementById("buy-ticket").addEventListener("click", function () {
    getAlert()
});

// Change colour of like button
function likeButton() {
    console.log("clicked");
    const favButton = document.getElementById("like-btn");
// If color is black change to red if red change to black
    if(favButton.classList.contains("black-btn")){
        favButton.classList.remove("black-btn");
        favButton.classList.add("red-btn");
    }
    else{
        favButton.classList.remove("red-btn");
        favButton.classList.add("black-btn");
    }
}
document.getElementById("like-btn").addEventListener("click", function () {
    likeButton();
});


