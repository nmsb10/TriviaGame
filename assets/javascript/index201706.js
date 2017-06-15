//REMEMBER: CODE EVERYTHING ONLY ONCE
//Do not Repeat Yourself = DRY
document.addEventListener("DOMContentLoaded", function(event) {
	//http://stackoverflow.com/questions/799981/document-ready-equivalent-without-jquery
	displayName('jonathon nagatani');
	showDate();
});

function showDate(){
	//http://www.w3schools.com/jsref/jsref_obj_date.asp
	var d = new Date();
	var yearCurrent = d.getFullYear();
	var monthCurrent = dateFunc.calculateMonth(d.getMonth());
	var dayCurrent = dateFunc.dayTwoDigits(d.getDate());
	var date = dayCurrent + ' ' + monthCurrent + ' ' + yearCurrent;
	document.getElementById('ft-copy-year').innerHTML = '2016 - ' + yearCurrent + ' ';
}

var dateFunc = {
	calculateMonth: function(monthNumber){
		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		for(var i = 0; i<months.length; i++){
			if(monthNumber===i){
				return months[i];
			}
		}
	},
	dayTwoDigits: function(dayNumber){
		if(dayNumber<10){
			return '0'+ dayNumber;
		}else{
			return dayNumber;
		}
	}
};

function displayName(name){
	var primeNameDiv = document.getElementById('name-primary');
	var lettersArray = stringToArray(name);
	var totalLetters = lettersArray.length;
	gradualLetters(lettersArray, 0, totalLetters, primeNameDiv);
}

function gradualLetters(lettersArray, startIndex, wordLength, nameDiv){
	var showLetters = setInterval(function(){displayOneLet();}, 200);
	var letterIndex = startIndex;
	var currLetArrIndex = 0;
	function displayOneLet(){
		if(currLetArrIndex < wordLength){
			var span = document.createElement('span');
			span.className = 'header-letter';
			span.dataset.letter = letterIndex;
			span.innerHTML = lettersArray[currLetArrIndex];
			nameDiv.appendChild(span);
			currLetArrIndex ++;
			letterIndex ++;
		}else{
			clearInterval(showLetters);
			nameDiv.addEventListener('click', displayLastLetters, false);
		}
	}
}

function stringToArray(str){
	var arr = [];
	for(var i = 0; i<str.length; i++){
		arr.push(str[i]);
	}
	return arr;
}

function displayLastLetters(e){
	var wholeName = document.getElementById('name-primary');
	wholeName.removeEventListener('click', displayLastLetters); 
	var letter = e.target.dataset.letter;
	var nameLength = wholeName.childNodes.length;
	//must compare letter+1 because childNodes.length takes into account whitespace as a node
	var selection = parseInt(letter)+1;
	var lastLetters = [];
	for(var i = selection; i<nameLength; i++){
		lastLetters.push(wholeName.childNodes[selection].innerHTML);
		wholeName.removeChild(wholeName.childNodes[selection]);
	}
	gradualLetters(lastLetters, letter, lastLetters.length, wholeName);
}

// Get the modal
var modal = document.getElementById('myModal');
var modalAboutMe = document.getElementById('modalAboutMe');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
    modal.style.backgroundColor = 'rgba(0,0,0,0.35)';
};

// When the user clicks anywhere outside of the modal OR the X span, close the modal
window.onclick = function(event) {
    if (event.target === modal || event.target === span) {
    	if(modalAboutMe.className === 'modal-content animate-down'){
    		modalAboutMe.className = 'modal-content animate-up';
    		modal.style.backgroundColor = 'rgba(0,0,0,0)';
    		setTimeout(function(){
    			modal.style.display = "none";
    			modalAboutMe.className = 'modal-content animate-down';
    		}, 350);
    	}
    }
}; 