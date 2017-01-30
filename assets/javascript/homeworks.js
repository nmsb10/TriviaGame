//REMEMBER: CODE EVERYTHING ONLY ONCE
//Do not Repeat Yourself = DRY
document.addEventListener("DOMContentLoaded", function(event) {
	//http://stackoverflow.com/questions/799981/document-ready-equivalent-without-jquery
	showDate();
});

function showDate(){
	//http://www.w3schools.com/jsref/jsref_obj_date.asp
	var d = new Date();
	var yearCurrent = d.getFullYear();
	var updatedFooter = '<div id="footer-content">Copyright &copy; 2016 - ' + yearCurrent +
	' <a class="footer-link" href="https://www.linkedin.com/in/jonathonnagatani" target="_blank"' + 
	' title="Jonathon on LinkedIn">Jonathon Nagatani</a>. All Rights Reserved.</div>';
	// $('#footer-content').replaceWith(updatedFooter);
	document.getElementById('footer').innerHTML = updatedFooter;
}


	//var button = document.getElementById('buttonID')
	//button.addEventListener('click', function(){});
	//button.classList.add('show');
	//button.classList.remove('hide');
	//appendchild??
// 	**http://www.w3schools.com/js/js_datatypes.asp
// **http://www.w3schools.com/jsref/jsref_map.asp
// **http://www.w3schools.com/jsref/jsref_forEach.asp
// **http://www.w3schools.com/jsref/jsref_reduce.asp
// **http://www.w3schools.com/jsref/jsref_join.asp
// **filter
// **slice
// **http://www.w3schools.com/js/js_comparisons.asp
// **http://www.w3schools.com/js/js_bitwise.asp
//event.which and event.key

//http://www.w3schools.com/jsref/met_document_addeventlistener.asp
		// document.addEventListener("mouseover", myFunction);
		// document.addEventListener("click", someOtherFunction);
		// document.addEventListener("mouseout", someOtherFunction);


//modals???



//to copy an array: arrayCopy = originalArray.slice(0);

//answer for keeping the chat thing scrolled to bottom unless user scrolls otherwise
	//http://stackoverflow.com/questions/18614301/keep-overflow-div-scrolled-to-bottom-unless-user-scrolls-up

//document.getElementsByClassName("example");
//.value, .innerHTML
//document.queryselector??
//use a switch statement??
//functions that return values??

//add class to an element:
// var d = document.getElementById("div1");
// d.className += " otherclass"; NB the space before the otherclass name


//http://www.w3schools.com/howto/howto_css_modals.asp
//http://www.w3schools.com/jsref/dom_obj_document.asp
//http://www.w3schools.com/jsref/jsref_statements.asp
//http://www.w3schools.com/jsref/dom_obj_event.asp








//first create an array of questions or topics, and answers or notes
var topics = [
	{
		id: 0,
		question: "homework one",
		answer: "description of homework one here"
	},
	{
		id: 1,
		question: "homework two",
		answer: "description of homework two here."
	},
	{
		id: 2,
		question: "homework three",
		answer: "description of homework three here."
	},
	{
		id: 3,
		question: "homework four",
		answer: "description of homework four here."
	},
	{
		id: 4,
		question: "homework five",
		answer: "description of homework five here."
	},
];

//populate the DOM with the questions from topics.
generateTopics();

//take the questions in the topics array, and create divs in the HTML
function generateTopics(){
	for(var i = 0; i<topics.length; i++){
		//create a newQuestion. Can make all these divs be in the same class.
		//jQuery will automatically create the ending </div> tag.
		var newQuestion = $('<div class="question question-inside">');
		//add a data-attribute equal to the topic
		newQuestion.attr('data-questionID', topics[i].id);
		//make the content of the div equal to the topic's question
		newQuestion.text(topics[i].question);
		//append div to the inside of the main-content section
		$("#main-content").append(newQuestion);
	}
}

//when user clicks on a question div, the page show the corresponding answer
//but first hide all currently displayed answers
$(document).on('click','.question', function(){
	//first hide the main-content section of any answers
	$(".answer").fadeOut();
	$(".answer").hide();
	//create a newAnswer. Can make all these divs be in the same class.
	//jQuery will automatically create the ending </div> tag.
	var newAnswer = $('<div class="answer answer-inside">');
	var answerID = $(this).attr("data-questionID");
	//make the content of the div equal to the topic's question
	newAnswer.text(topics[answerID].answer);
	//append div to the inside of the main-content section
	//have the newAnswer div fadeIn???
	$(this).append(newAnswer);
	return false;
});


// 	//take the data-name attribute from the button, make the variable
// 	//topic equal to the data-name attribute
// 	var topic = $(this).data("name");
// 	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic +
// 	"&api_key=dc6zaTOxFJmzC&limit=10";

// 	//create an AJAX call
// 	$.ajax({url: queryURL, method: 'GET'}).done(function(response){
// 	//or could use eg response.data.morecriteriahere
// 	var results = response.data;
// 		for(var i = 0; i<results.length; i++){
// 			//make a div to hold the gif and rating
// 			var happyDiv = $('<div class="gif-div">');
// 			happyDiv.attr('data-name', topic);
// 			happyDiv.attr("data-id", results[i].id);
// 			happyDiv.attr("data-animated", "still");
// 			//make a p element to hold the rating of the gif
// 			var rating = $('<p>').text("Rating: " + results[i].rating);
// 			//create an image to contain the gif
// 			var gifImage = $('<img>');
// 			gifImage.attr('src', results[i].images.fixed_height_still.url);

// 			//append the gif image and rating to the happyDiv
// 			happyDiv.append(gifImage);
// 			happyDiv.append(rating);

// 			//append each happyDiv to div with id animals
// 			$("#animals").append(happyDiv);
// 		}
// 	});
// 	return false;
// });

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
	console.log(this);
	if(animated==="still"){
		console.log(this);
		$.ajax({url: queryURL, method: 'GET'}).done(function(response){
			console.log(this);
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
			console.log(divID);
			console.log(this);
			console.log(happyDiv);

			$("#picked").replaceWith(happyDiv);
			//reset the id to empty (so no longer has id picked)
			$("#picked").attr("id", "");
		});
	}
	else if(animated==="animated"){
		console.log("it's animated!");
		$.ajax({url: queryURL, method: 'GET'}).done(function(response){
			console.log(this);
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
			console.log(divID);
			console.log(this);
			console.log(happyDiv);

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