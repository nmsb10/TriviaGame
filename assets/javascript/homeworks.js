//REMEMBER: CODE EVERYTHING ONLY ONCE
//Do not Repeat Yourself = DRY
document.addEventListener("DOMContentLoaded", function(event) {
	//http://stackoverflow.com/questions/799981/document-ready-equivalent-without-jquery
	showDate();
	changeBackgroundColor('summary-content');
	//https://cssanimation.rocks/list-items/
	displayHWIndex.interval(homeworks);
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

//http://www.w3schools.com/jsref/dom_obj_style.asp
function changeBackgroundColor(element){
	timer.interval(element);
}

// function displayHWIndex(arr){
// 	var container = document.getElementById('homeworks-index');
// 	for(var i = 0; i < arr.length; i ++){
// 		var li = document.createElement('li');
// 		var a = document.createElement('a');
// 		a.innerText = arr[i].number;
// 		a.className = 'index-a';
// 		//to properly create the href, add a #, then replace the space with a dash
// 		a.setAttribute('href', '#' + arr[i].number.split(' ').join('-'));
// 		a.setAttribute('title', arr[i].number);
// 		li.appendChild(a);
// 		container.appendChild(li);
// 	}
// }
var displayHWIndex = {
	hwcount: 0,
	displayed: 0,
	counter:'',
	interval: function(array){
		displayHWIndex.hwcount = array.length;
		displayHWIndex.counter = setInterval(function(){displayHWIndex.display();}, 300);
	},
	display: function(){
		if(displayHWIndex.displayed < displayHWIndex.hwcount){
			var li = document.createElement('li');
			var a = document.createElement('a');
			a.innerText = homeworks[displayHWIndex.displayed].number;
			a.className = 'index-a';
			//to properly create the href, add a #, then replace the space with a dash
			a.setAttribute('href', '#' + homeworks[displayHWIndex.displayed].number.split(' ').join('-'));
			a.setAttribute('title', homeworks[displayHWIndex.displayed].number);
			li.appendChild(a);
			document.getElementById('homeworks-index').appendChild(li);
			setTimeout(function(){
			//if there were multiple classes, must have a space before show ie ' show'
				li.className = 'show';
			});
			displayHWIndex.displayed ++;
		}else{
			displayHWIndex.stop();
		}
	},
	stop: function(){
		clearInterval(displayHWIndex.counter);
	}
};

var timer =
{
	element: '',
	//set timer.bc initial background-color to near white
	bc: [250, 250, 250, 1],
	counter: '',
	interval: function(element){
		timer.element = element;
		timer.counter = setInterval(timer.changeColor, 1500);
	},
	changeColor: function(){
		//obtain the element's current rgba
		for(var i = 0; i < timer.bc.length; i ++){
			timer.bc[i] = timer.changeValue(timer.bc[i], 21);
		}
		//for now, set a (opacity) to 1
		timer.bc[3] = 1;
		//set background color to new values
		// document.getElementById(element).style.backgroundColor = 'rgba(' + [255,0,0, 0.5].join(',') + ')';
		document.getElementById(timer.element).style.backgroundColor = 'rgba(' + timer.bc + ')';
	},
	changeValue: function(value, mag){
		//with equal probability, increase or decrease each of the 3 values by mag
		if(Math.random() < 0.5){
			value = value - mag;
		}else{
			value = value + mag;
		}
		if(value < 0){
			value = 0;
		}
		if(value > 255){
			value = 255;
		}
		return value;
	},
	stop: function(){
		clearInterval(timer.counter);
	}
};

var homeworks = [
	{
		id: 3,
		number: "homework three",
		desc: "description of homework three here",
		tech: 'technologies and concepts used'
	},
	{
		id: 4,
		number: "homework four",
		desc: "description of homework four here.",
		tech: 'technologies and concepts used'
	},
	{
		id: 5,
		number: "homework five",
		desc: "description of homework five here.",
		tech: 'technologies and concepts used'
	},
	{
		id: 6,
		number: "homework six",
		desc: "description of homework six here.",
		tech: 'technologies and concepts used'
	},
	{
		id: 7,
		number: "homework seven",
		desc: "description of homework seven here.",
		tech: 'technologies and concepts used'
	},
	{
		id: 10,
		number: "homework ten",
		desc: "description of homework ten here.",
		tech: 'technologies and concepts used'
	},
	{
		id: 12,
		number: "homework twelve",
		desc: "description of homework twelve here.",
		tech: 'technologies and concepts used'
	},
];


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


//TO COPY AN ARRAY:
//var copyOfArray = thoughts.slice(0);



//to iterate through an array to search for an element:
//var found = thoughts.find(function (item){
	//return item.item_id === answer.item_id;
//});



//add one letter at a time
//for(var i= 0; i<quote.length; i++){
//timer function (eg every 250 milliseconds) for the following:
//document.getElementById('wherequotewillbe').innerText +=quote[i];
//}






























//populate the DOM with the questions from topics.
//generateTopics();

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
// $(document).on('click','.question', function(){
// 	//first hide the main-content section of any answers
// 	$(".answer").fadeOut();
// 	$(".answer").hide();
// 	//create a newAnswer. Can make all these divs be in the same class.
// 	//jQuery will automatically create the ending </div> tag.
// 	var newAnswer = $('<div class="answer answer-inside">');
// 	var answerID = $(this).attr("data-questionID");
// 	//make the content of the div equal to the topic's question
// 	newAnswer.text(topics[answerID].answer);
// 	//append div to the inside of the main-content section
// 	//have the newAnswer div fadeIn???
// 	$(this).append(newAnswer);
// 	return false;
// });


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
// $(document).on("click",".gif-div", function(){
// 	var id = $(this).attr("data-id");
// 	//create a variable animated equal to the data-animated attribute
// 	var animated = $(this).attr("data-animated");
// 	var queryURL = "https://api.giphy.com/v1/gifs/" + id +"?api_key=dc6zaTOxFJmzC";
// 	//give the selected gif-div the id of picked.
// 	$(this).attr("id", "picked");
// 	console.log(this);
// 	if(animated==="still"){
// 		console.log(this);
// 		$.ajax({url: queryURL, method: 'GET'}).done(function(response){
// 			console.log(this);
// 			var result = response.data;
// 			//create a new div just like the original, except with the animated src
// 			var happyDiv = $('<div class="gif-div">');
// 			happyDiv.attr("data-id", result.id);
// 			happyDiv.attr("data-animated", "animated");
// 			//make a p element to hold the rating of the gif
// 			var rating = $('<p>').text("Rating: " + result.rating);
// 			//create an image to contain the gif
// 			var gifImage = $('<img>');
// 			//give the gifImage the animated link to the same gif
// 			gifImage.attr('src', result.images.fixed_height.url);
// 			//append the gif image and rating to the happyDiv
// 			happyDiv.append(gifImage);
// 			happyDiv.append(rating);

// 			//replace the clicked gif-div with the new animated happyDiv
// 			var divID = "#"+id;
// 			console.log(divID);
// 			console.log(this);
// 			console.log(happyDiv);

// 			$("#picked").replaceWith(happyDiv);
// 			//reset the id to empty (so no longer has id picked)
// 			$("#picked").attr("id", "");
// 		});
// 	}
// 	else if(animated==="animated"){
// 		console.log("it's animated!");
// 		$.ajax({url: queryURL, method: 'GET'}).done(function(response){
// 			console.log(this);
// 			var result = response.data;
// 			//create a new div just like the original, except with the non-animated src
// 			var happyDiv = $('<div class="gif-div">');
// 			happyDiv.attr("data-id", result.id);
// 			happyDiv.attr("data-animated", "still");
// 			//make a p element to hold the rating of the gif
// 			var rating = $('<p>').text("Rating: " + result.rating);
// 			//create an image to contain the gif
// 			var gifImage = $('<img>');
// 			//give the gifImage the non-animated (still) link to the same gif
// 			gifImage.attr('src', result.images.fixed_height_still.url);
// 			//append the gif image and rating to the happyDiv
// 			happyDiv.append(gifImage);
// 			happyDiv.append(rating);

// 			//replace the clicked gif-div with the new animated happyDiv
// 			var divID = "#"+id;
// 			console.log(divID);
// 			console.log(this);
// 			console.log(happyDiv);

// 			$("#picked").replaceWith(happyDiv);
// 			$("#picked").attr("id", "");
// 		});
// 	}
// });

//finally, add a form that takes the value from the user input box, and pushes it
//into the topics array.
//then make a function call that takes all the topics in the array and remakes
//the buttons on the page.
// $("#add-animal").on("click", function() {
// 	if($("#animal-input").val()===""){
// 		alert("you forgot to add something.");
// 		// IMPORTANT! We have this line so that users can hit "enter" instead
// 		//of clicking on the button AND it won't move to the next page
// 		return false;
// 	}
// 	else{
// 		var newAnimal = $("#animal-input").val().trim();
// 		topics.push(newAnimal);
// 		var newButton = $('<button class="special-button">');
// 		//add a data-attribute equal to the topic
// 		newButton.attr('data-name', newAnimal);
// 		//make the content of the button equal to the topic
// 		newButton.text(newAnimal);
// 		//append all the buttons to the inside of the animalButtons div
// 		$("#animalButtons").append(newButton);
// 		//clear the animal-input field
// 		$("#animal-input").val("");
// 		// We have this line so that users can hit "enter" instead of clicking on the
// 		//button and it won't move to the next page
// 		//return false;
// 	}
// 	return false;
// 	//calling the makeButtons function here didn't update the buttons!!
// 	//makeButtons();
// });