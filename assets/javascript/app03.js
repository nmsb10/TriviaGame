//REMEMBER: CODE EVERYTHING ONLY ONCE
//Do not Repeat Yourself = DRY
document.addEventListener("DOMContentLoaded", function(event) {
	//http://stackoverflow.com/questions/799981/document-ready-equivalent-without-jquery
	showDate();
	begin();
});

function showDate(){
	//http://www.w3schools.com/jsref/jsref_obj_date.asp
	var d = new Date();
	var yearCurrent = d.getFullYear();
	var monthCurrent = dateFun.calculateMonth(d.getMonth());
	var dayCurrent = dateFun.dayTwoDigits(d.getDate());
	var date = dayCurrent + ' ' + monthCurrent + ' ' + yearCurrent;
	document.getElementById('date-today').innerHTML = date;
	var updatedFooter = '<div id="footer-content">Copyright &copy; 2016 - ' + yearCurrent +
	' <a class="footer-link" href="https://www.linkedin.com/in/jonathonnagatani" target="_blank"' + 
	' title="Jonathon on LinkedIn">Jonathon Nagatani</a>. All Rights Reserved.</div>';
	// $('#footer-content').replaceWith(updatedFooter);
	document.getElementById('footer').innerHTML = updatedFooter;
}

var dateFun = {
	calculateMonth: function(monthNumber){
		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		for(var i = 0; i<months.length; i++){
			if(monthNumber===i){
				return months[i];
			}
		}
	},
	dayTwoDigits: function(dayNumber){
		return dayNumber<10 ? '0' + dayNumber : dayNumber;
		// if(dayNumber<10){
		// 	return '0'+ dayNumber;
		// }else{
		// 	return dayNumber;
		// }
	}
};

//NOTE: the current streak counts correct consecutive answers. ends if a question has bank = 0, OR if an answer is wrong.
//offer "activate bonus" where is eg streak of 5 questions, bonus points received.
//ALTERNATIVE: once a streak occurs, beginning amount of winnings for each question increases
//http://www.w3schools.com/jsref/met_document_addeventlistener.asp
// document.addEventListener("mouseover", myFunction);
// document.addEventListener("click", someOtherFunction);
// document.addEventListener("mouseout", someOtherFunction);
var stats = {
	streak: 0,
	bank:0,
	meanWin:0,
	medianWin:0,
	maxbank:0,
	accuracy:0,
	correct:0,
	incorrect:0,
	questions:0,
	bonusCount:0,
	bonusTotal:0
};

function begin(){
	document.getElementById('start-button-div').addEventListener('click', function(event){
		event.preventDefault();
		document.getElementById('sb-center').style.color = "lime";
		clearBoard();
		allowDifficultySelection();
	});
}

function clearBoard(){
	document.getElementById('streak-count').innerText = 0;
	document.getElementById('player-bank').innerText = '-0-';
	document.getElementById('mean-winnings').innerText = 0;
	document.getElementById('median-winnings').innerText = 0;
	document.getElementById('max-bank').innerText = 0;
	document.getElementById('accuracy').innerText = 0.00;
	document.getElementById('answers-correct').innerText = 0;
	document.getElementById('answers-incorrect').innerText = 0;
	document.getElementById('total-questions').innerText = 0;
	document.getElementById('bonus-count').innerText = 0;
	document.getElementById('bonus-total').innerText = 0;
}

function allowDifficultySelection(){
	//this didn't work:
	//document.getElementsByClassName('dif-button').className += ' full-opacity';
	//http://stackoverflow.com/questions/18294759/use-javascript-to-add-a-css-class-to-all-elements-with-another-class-name
	var buttons = document.getElementsByClassName('dif-button');
	var length = buttons !== null ? buttons.length : 0;
	for(var i = 0; i < length; i++) {
		//rename the class for each button, in case the user has re-selected the start button
		//and need to clear the 'selected-difficulty' class
		buttons[i].className = "dif-button full-opacity";
		buttons[i].addEventListener('click', selectDifficulty, false);
	}
}

function selectDifficulty(){
	console.log(this.id);
	var difficulty = this.id;
	var buttons = document.getElementsByClassName('dif-button');
	var length = buttons !== null ? buttons.length : 0;
	for(var i = 0; i < length; i++) {
		buttons[i].className = 'dif-button';
		buttons[i].removeEventListener('click', selectDifficulty, false);
	}
	this.className += ' selected-difficulty';
	startGame(difficulty);
}

function startGame(difficulty){
	switch(difficulty){
		case 'deasy':
			//function
			break;
		case 'dmedium':
			//function
			break;
		case 'dhard':
			//function
			break;
		default:
			console.log('unknown difficulty');
			break;
	}
}

function generateQuestion(){
	//1 decide on roll based on dice probability
	//2 decide on type of bet (come, dc, pass, odds, place)
	//3 calculate answer
	//4. populate dom with question & start winnings timer
	//5. on answer submission, log current winnings timer value
	//6. compare answer to calculated answer
	//6.5 update dom with answer and explanation.
	//6.6 update stats accordingly
	//6.75 replace answer form with button for "next"
	var call = 0;
}

function enterRequest(){
	document.getElementById('answer-button').addEventListener('click', function(event){
		event.preventDefault();
		var answer = document.getElementById('input-answer').value;
		document.getElementById('input-bet').value = '';
		//evaluate the request
	});
}
var timer =
{
	valueStart: 500,
	interval: function(){
		//every second, decrease 1/15 of 500 = 33 1/3
		document.getElementById('countdown').className += ' enhanced';
		counter = setInterval(timer.updatePossWin, 30);
	},
	updatePossWin: function(){
		if(timer.valueStart === 0){
			document.getElementById('countdown').innerText = '$-0-';
			timer.stop();
			return;
		}
		document.getElementById('countdown').innerText = '$' + timer.valueStart;
		timer.valueStart --;
	},
	stop: function(){
		clearInterval(counter);
	}
};
