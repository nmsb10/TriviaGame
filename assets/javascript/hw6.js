//$(document).ready(function(){
//});

//first create an array of strings, of interesting topics
var topics = ["alton brown","anthony hopkins","amy sedaris","woodpecker", "sunflower","german shepherd","cupcake","chocolate","coffee","pomegranate"];

makeButtons();

//take the topics in the topics array, and create buttons in the HTML
//try using a loop that appends a button for each string in the array
function makeButtons(){
	//$("#animalButtons").empty();
	for(var i = 0; i<topics.length; i++){
		//create a newButton. Can make all these buttons be in the same class.
		//jQuery will automatically create the ending </button> tag.
		var newButton = $('<button class="special-button">');
		//add a data-attribute equal to the topic
		newButton.attr('data-name', topics[i]);
		//make the content of the button equal to the topic
		newButton.text(topics[i]);
		//append all the buttons to the inside of the animalButtons div
		$("#animalButtons").append(newButton);
	}
}

//when user clicks on a button, the page should grab 10 static, non-animated
//gif images from the GIPHY api and place them on the page
$(document).on('click','.special-button', function(){
	//first empty the animals div of any prior gifs
	$("#animals").empty();
	//take the data-name attribute from the button, make the variable
	//topic equal to the data-name attribute
	var topic = $(this).data("name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic +
	"&api_key=dc6zaTOxFJmzC&limit=10";

	//create an AJAX call
	$.ajax({url: queryURL, method: 'GET'}).done(function(response){
	//or could use eg response.data.morecriteriahere
	var results = response.data;
		for(var i = 0; i<results.length; i++){
			//make a div to hold the gif and rating
			var happyDiv = $('<div class="gif-div">');
			happyDiv.attr('data-name', topic);
			happyDiv.attr("data-id", results[i].id);
			happyDiv.attr("data-animated", "still");
			//make a p element to hold the rating of the gif
			var rating = $('<p>').text("Rating: " + results[i].rating);
			//create an image to contain the gif
			var gifImage = $('<img>');
			gifImage.attr('src', results[i].images.fixed_height_still.url);

			//append the gif image and rating to the happyDiv
			happyDiv.append(gifImage);
			happyDiv.append(rating);

			//append each happyDiv to div with id animals
			$("#animals").append(happyDiv);
		}
	});
	return false;
});

//just using this does NOT work. Must have this function within $(document).on...
// $(".special-button").on('click', function(){
// });

//just using this does NOT work. Must have this function within $(document).on...
// $('.gif-div').on('click', function(){
// });

//when the user clicks one of still GIPHY images, the gif should animate
//if an animated gif image is clicked again, it should stop playing	
$(document).on("click",".gif-div", function(){
	var id = $(this).attr("data-id");
	//create a variable animated equal to the data-animated attribute
	var animated = $(this).attr("data-animated");
	var queryURL = "https://api.giphy.com/v1/gifs/" + id +"?api_key=dc6zaTOxFJmzC";
	//give the selected gif-div the id of picked.
	$(this).attr("id", "picked");
	if(animated==="still"){
		$.ajax({url: queryURL, method: 'GET'}).done(function(response){
			var result = response.data;
			//create a new div just like the original, except with the animated src
			var happyDiv = $('<div class="gif-div">');
			happyDiv.attr("data-id", result.id);
			happyDiv.attr("data-animated", "animated");
			//make a p element to hold the rating of the gif
			var rating = $('<p>').text("Rating: " + result.rating);
			//create an image to contain the gif
			var gifImage = $('<img>');
			//give the gifImage the animated link to the same gif
			gifImage.attr('src', result.images.fixed_height.url);
			//append the gif image and rating to the happyDiv
			happyDiv.append(gifImage);
			happyDiv.append(rating);

			//replace the clicked gif-div with the new animated happyDiv
			var divID = "#"+id;

			$("#picked").replaceWith(happyDiv);
			//reset the id to empty (so no longer has id picked)
			$("#picked").attr("id", "");
		});
	}
	else if(animated==="animated"){
		$.ajax({url: queryURL, method: 'GET'}).done(function(response){
			var result = response.data;
			//create a new div just like the original, except with the non-animated src
			var happyDiv = $('<div class="gif-div">');
			happyDiv.attr("data-id", result.id);
			happyDiv.attr("data-animated", "still");
			//make a p element to hold the rating of the gif
			var rating = $('<p>').text("Rating: " + result.rating);
			//create an image to contain the gif
			var gifImage = $('<img>');
			//give the gifImage the non-animated (still) link to the same gif
			gifImage.attr('src', result.images.fixed_height_still.url);
			//append the gif image and rating to the happyDiv
			happyDiv.append(gifImage);
			happyDiv.append(rating);

			//replace the clicked gif-div with the new animated happyDiv
			var divID = "#"+id;
			// console.log(divID);
			// console.log(this);
			// console.log(happyDiv);

			$("#picked").replaceWith(happyDiv);
			$("#picked").attr("id", "");
		});
	}
});

//finally, add a form that takes the value from the user input box, and pushes it
//into the topics array.
//then make a function call that takes all the topics in the array and remakes
//the buttons on the page.
$("#add-animal").on("click", function() {
	if($("#animal-input").val()===""){
		alert("you forgot to add something.");
		// IMPORTANT! We have this line so that users can hit "enter" instead
		//of clicking on the button AND it won't move to the next page
		return false;
	}
	else{
		var newAnimal = $("#animal-input").val().trim();
		topics.push(newAnimal);
		var newButton = $('<button class="special-button">');
		//add a data-attribute equal to the topic
		newButton.attr('data-name', newAnimal);
		//make the content of the button equal to the topic
		newButton.text(newAnimal);
		//append all the buttons to the inside of the animalButtons div
		$("#animalButtons").append(newButton);
		//clear the animal-input field
		$("#animal-input").val("");
		// We have this line so that users can hit "enter" instead of clicking on the
		//button and it won't move to the next page
		//return false;
	}
	return false;
	//calling the makeButtons function here didn't update the buttons!!
	//makeButtons();
});