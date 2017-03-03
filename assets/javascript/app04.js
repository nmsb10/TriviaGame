//REMEMBER: CODE EVERYTHING ONLY ONCE
//Do not Repeat Yourself = DRY
document.addEventListener("DOMContentLoaded", function(event) {
	showDate();
});

function showDate(){
	var d = new Date();
	var yearCurrent = d.getFullYear();
	var updatedFooter = '<div id="footer-content">Copyright &copy; 2016 - ' + yearCurrent +
	' <a class="footer-link" href="https://www.linkedin.com/in/jonathonnagatani" target="_blank"' + 
	' title="Jonathon on LinkedIn">Jonathon Nagatani</a>. All Rights Reserved.</div>';
	document.getElementById('footer').innerHTML = updatedFooter;
}

//sequelize documentation:
//http://docs.sequelizejs.com/en/v3/

//hello. what would you like to teach me today?
//(evaluates the answer, compares to "known facts,", also weighs whether to accept/add the fact to "known facts" based on compatibility with already "known facts," AND credibility of the fact giver.)
//perhaps assign "known facts" with different weights based on how "hard" they are (a measure of their "perceived truth").
//facts have associated origins as well?
//fact: has the 1. content of the fact; 2. source(s) of the fact; 3. (likely changing) credibility / perceived truth level of this fact (which changes relative to other facts and based on sources of this fact)

//code a "seed". Design your "seed."
//prime directives: courteous, respectful (in speech, action); how to actually define this?
//a seed contains all the information / knowledge it needs to grow.
//-it takes in water and nutrients.
//-then it "grows"
//-it becomes a plant, uses sun, understands photosynthesis
//-has biological (and chemical? physical?) changes, in accordance with it's "rules"
//-eg a carrot seed will not grow into a parsley plant
//-although seeds from the same plant will grow into "that particular plant," they will not be identical to each other when they mature
//-also, depending on other variables, mutations can occur (either due to genetic variances within the seed, or environmental differences like radioactive soil or unusual nutrients, or a combination, to create mutations)
//being able to predict what effect a certain action will have. then chaining actions and effects with probabilities to arrive at estimation for likelihood of a certain event in the future


//add one letter at a time (use setinterval?)
//USE THE TRANSFORM AND PERSPECTIVE CSS PROPERTIES?? ",


	//button.classList.add('show');
	//button.classList.remove('hide');
	// //if there were multiple classes, must have a space before show ie ' show'
	// 	li.className = 'show';
// 	**http://www.w3schools.com/js/js_datatypes.asp
// **http://www.w3schools.com/jsref/jsref_map.asp
// **http://www.w3schools.com/jsref/jsref_forEach.asp
// **http://www.w3schools.com/jsref/jsref_reduce.asp
// **http://www.w3schools.com/jsref/jsref_join.asp
// **filter
// **slice
// **http://www.w3schools.com/js/js_comparisons.asp
// **http://www.w3schools.com/js/js_bitwise.asp
//object.assign
//event.which and event.key

//http://www.w3schools.com/jsref/met_document_addeventlistener.asp
// document.addEventListener("mouseover", myFunction);
// document.addEventListener("click", someOtherFunction);
// document.addEventListener("mouseout", someOtherFunction);

//answer for keeping the chat thing scrolled to bottom unless user scrolls otherwise
	//http://stackoverflow.com/questions/18614301/keep-overflow-div-scrolled-to-bottom-unless-user-scrolls-up


//modals???
//http://www.w3schools.com/howto/howto_css_modals.asp
//http://www.w3schools.com/jsref/dom_obj_document.asp
//http://www.w3schools.com/jsref/jsref_statements.asp
//http://www.w3schools.com/jsref/dom_obj_event.asp


//TO COPY AN ARRAY:
//var copyOfArray = originalArray.slice(0);

//TO ITERATE THROUGH AN ARRAY SEARCHING FOR A SPECIFIC ELEMENT:
//var found = thoughts.find(function (item){
	//return item.item_id === answer.item_id;
//});

//========================================================================
//pete: offeritup.com
//all API calls should happen from the server on node NOT the front end (see image)
//amcharts: box 2D
//"gravity animation"
//see the nerds test
//"file zone" to enable drop file here to load
//passport.js (see on github, by Jared Hanson (creator)); passport v. everyauth?

//==========================================================================
// REST APIs (Sean Callahan career presenters)
// -only two base URLs per resource
// --eg /dogs for collections
// --eg /dogs/fido for individual elements
// -prefer nouns to verbs
// --nouns refer to resources
// -verbs acceptable for actions or calculations not tied with a specific resource
// --eg /login /logout /search
// -prefer plural forms eg /dogs/234 versus /dog/234
// -avoid confusing odd singular versus plural forms (person, people; goose, geese)
// -relations in the URLs
// --/dogs/fido/owners/blondelady
// ---the owner of the dog named fido
// --/owners/blondelady/dogs/fido
// --- the dog fido based on the owner
// -sweep variations after the ? in the URL
// -verbs (HTTP methods):
// --two important concepts: safety and idempotence
// --get, post, put, delete