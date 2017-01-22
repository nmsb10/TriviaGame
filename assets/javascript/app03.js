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
	wins:[],
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
		timer.answer = true;
		document.getElementById('exam-answer-form').innerHTML = '<form id = "form-input-answer">'+
			'$<input type = "number" id="input-answer" placeholder="your answer" title="please type your numerical answer here">'+
			' <input id = "answer-button" type = "submit" value = "submit" title="after typing your answer, '+
			'click this button (or press the enter key on your keyboard) to submit your answer"></form>';
		document.getElementById('sb-center').style.color = "lime";
		clearBoard();
		allowDifficultySelection();
	});
}

function clearBoard(){
	stats.streak = 0;
	stats.bank = 0;
	stats.wins = [];
	stats.meanWin = 0;
	stats.medianWin = 0;
	stats.maxbank = 0;
	stats.accuracy = 0.00;
	stats.correct = 0;
	stats.incorrect = 0;
	stats.questions = 0;
	stats.bonusCount = 0;
	stats.bonusTotal = 0;
	updateAllStats();
}

function updateAllStats(){
	document.getElementById('streak-count').innerText = stats.streak;
	document.getElementById('player-bank').innerText = stats.bank;
	document.getElementById('mean-winnings').innerText = stats.meanWin;
	document.getElementById('median-winnings').innerText = stats.medianWin;
	document.getElementById('max-bank').innerText = stats.maxbank;
	document.getElementById('accuracy').innerText = stats.accuracy;
	document.getElementById('answers-correct').innerText = stats.correct;
	document.getElementById('answers-incorrect').innerText = stats.incorrect;
	document.getElementById('total-questions').innerText = stats.questions;
	document.getElementById('bonus-count').innerText = stats.bonusCount;
	document.getElementById('bonus-total').innerText = stats.bonusTotal;
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
			generateQuestion('easy');
			break;
		case 'dmedium':
			generateQuestion('medium');
			break;
		case 'dhard':
			generateQuestion('hard');
			break;
		default:
			console.log('unknown difficulty');
			break;
	}
}

function generateQuestion(difficulty){
	var diffChoice = difficulty;
	//reset timer.win
	timer.win = 500;
	stats.maxbank += timer.win;
	timer.answer = false;
	//1 decide on roll based on dice probability
	var call = diceRoll();
	var question = 'Call: ' + call + '<br>The point is: ' + call;
	//this particular bet will be a multiple of 5 between 5 and 25
	//also, for all future bets, ensure the bet is ONLY AN INTEGER!!
	var betAmount = parseInt(Math.floor((Math.random()*5) + 1) * 5);
	question += '<br>Pass line: $' + betAmount;
	question += '<br>Pass line odds: $' + parseInt(Math.floor((Math.random()*5) + 1) * 10);
	question += '<br><br>Winnings paid = ?';
	document.getElementById('exam-question').innerHTML = question;
	//2 decide on type of bet (come, dc, pass, odds, place)
	//3 calculate answer
	//4. populate dom with question & start winnings timer
	timer.interval();
	//5. on answer submission, log current winnings timer value
	//6. compare answer to calculated answer
	//6.5 update dom with answer and explanation.
	//6.6 update stats accordingly
	//6.75 replace answer form with button for "next"
	
	enterAnswer();
}

function diceRoll(){
	var num = Math.random();
	//2 = 1/36
	//3 = 2/36
	//4 = 3/36
	//5 = 4/36
	//6 = 5/36
	//7 = 6/36
	//8 = 5/36
	//9 = 4/36
	//10 = 3/36
	//11 = 2/36
	//12 = 1/36
	// switch(num){
	// 	case num<(1/36):
	// 		roll = 2;
	// 		break;
	// 	case num<(3/36):
	// 		roll = 3;
	// 		break;
	// 	case num<(6/36):
	// 		roll = 4;
	// 		break;
	// 	case num<(10/36):
	// 		roll = 5;
	// 		break;
	// 	case num<(15/36):
	// 		roll = 6;
	// 		break;
	// 	case num<(21/36):
	// 		roll = 7;
	// 		break;
	// 	case num<(13/18):
	// 		roll = 8;
	// 		break;
	// 	case num<(5/6):
	// 		roll = 9;
	// 		break;
	// 	case num<(11/13):
	// 		roll = 10;
	// 		break;
	// 	case num<(35/36):
	// 		roll = 11;
	// 		break;
	// 	case num<1:
	// 		roll = 12;
	// 		break;
	// 	default:
	// 		console.log('unknown roll');
	// 		break;
	// }
	//return roll;
	if(num<(1/36)){
		return 2;
	}else if(num<(3/36)){
		return 3;
	}else if(num<(6/36)){
		return 4;
	}else if(num<(10/36)){
		return 5;
	}else if(num<(15/36)){
		return 6;
	}else if(num<(21/36)){
		return 7;
	}else if(num<(13/18)){
		return 8;
	}else if(num<(5/6)){
		return 9;
	}else if(num<(11/13)){
		return 10;
	}else if(num<(35/36)){
		return 11;
	}else if(num<1){
		return 12;
	}else{
		console.log('unknown roll');
	}
}

function betType(roll){
	switch(roll){
		case 2:
			//
			break;
	}

}

function enterAnswer(){
	document.getElementById('answer-button').addEventListener('click', function(event){
		event.preventDefault();
		timer.answer = true;
		displayAnswer();
	});
}

function displayAnswer(){
	var currentWin = timer.win;
	console.log(currentWin);
	stats.questions ++;
	//remember: updateMedian will automatically add the currentWin to the stats.wins array, in ascending order.
	stats.medianWin = updateMedian(stats.wins, currentWin).toFixed(2);
	stats.meanWin = calculateMean(stats.wins, stats.questions,2);
	//document.getElementById('answer-button').removeEventListener('click', enterAnswer, false);
	var answer = document.getElementById('input-answer').value;
	console.log('answer provided: ' + answer);
	console.log(stats);
	updateAllStats();
	//document.getElementById('input-answer').value = '';
	//document.getElementById('input-answer').placeholder = 'next';
	//document.getElementById('input-answer').title = 'please press enter for the next question.';
	//document.getElementById('answer-button').value = 'next question';
	//document.getElementById('answer-button').title = 'press enter or click here for the next question.';
	//document.getElementById('answer-button').id = 'next-button';
	// document.getElementById('next-button').addEventListener('click', function(event){
	// 	event.preventDefault();
	// 	document.getElementById('exam-answer-form').innerHTML = '<form id = "form-input-answer">'+
	// 		'$<input type = "number" id="input-answer" placeholder="your answer" title="please type your numerical answer here">'+
	// 		' <input id = "answer-button" type = "submit" value = "submit" title="after typing your answer, '+
	// 		'click this button (or press the enter key on your keyboard) to submit your answer"></form>';
	// 	document.getElementById('next-button').removeEventListener('click', false);
	// 	generateQuestion();
	// });
	//showAnswer() and explanation;

	document.getElementById('form-input-answer').innerHTML = '<input id = "next-button" type = "submit" value = "next question" title = "press enter or click here for the next question.">';
	document.getElementById('next-button').addEventListener('click', function(event){
		event.preventDefault();
		document.getElementById('countdown').className = 'content-header';
		document.getElementById('exam-answer-form').innerHTML = '<form id = "form-input-answer">'+
			'$<input type = "number" id="input-answer" placeholder="your answer" title="please type your numerical answer here">'+
			' <input id = "answer-button" type = "submit" value = "submit" title="after typing your answer, '+
			'click this button (or press the enter key on your keyboard) to submit your answer"></form>';
		generateQuestion();
	});

}

var timer =
{
	win: 500,
	answer: false,
	interval: function(){
		//every second, decrease 1/15 of 500 = 33 1/3
		document.getElementById('countdown').className += ' enhanced';
		counter = setInterval(timer.updatePossWin, 30);
	},
	updatePossWin: function(){
		document.getElementById('countdown').innerText = '$' + timer.win;
		timer.win --;
		if(timer.answer){
			timer.stop();
			document.getElementById('countdown').className = 'content-header';
			return;
		}else if(timer.win === 0){
			document.getElementById('countdown').innerText = '$-0-';
			timer.stop();
			return;
		}
	},
	stop: function(){
		clearInterval(counter);
	}
};

function calculateMean(array, entries, decimalPlaces){
	//forEach? reduce?
	var sum = 0;
	for(var i = 0; i<array.length; i++){
		sum += array[i];
	}
	return (sum / entries).toFixed(decimalPlaces);
}

function updateMedian(array, newEntry){
	//first correctly add newEntry to the (already sorted) array
	// if(array.length === 0){
	// 	array.push(newEntry);
	// 	return array[0];
	// }else if(array.length === 1){
	// 	if(array[0]<newEntry){
	// 		array.push(newEntry);
	// 	}else{
	// 		//splice: at position 0: Add newEntry and Remove 0 items
	// 		array.splice(0,0,newEntry);
	// 	}
	// 	return calculateMean(array, array.length, 2);
	// }else if(array.length === 2){
	// 	var added = false;
	// 	for(var i = 0; i < 2; i++){
	// 		if(array[i]>newEntry){
	// 			array.splice(i,0,newEntry);
	// 			added = true;
	// 		}
	// 	}
	// 	if(!added){
	// 		array.push(newEntry);
	// 	}
	// 	return array[Math.floor(array.length/2)];
	// }else{
	// 	//array has 3 or more entries
	// 	//correctly add newEntry, then return the median
	// 	//first check if array has even or odd number of items
	// 	var middle;
	// 	if(array.length%2 !== 0){//odd number
	// 		middle = array[Math.floor(array.length/2)];
	// 	}else{//even number
	// 		middle = (array[Math.floor(array.length/2)]+array[Math.floor(array.length/2)-1])/2;
	// 	}
	// 	if(newEntry === middle){
	// 		array.splice(middle,0,newEntry);
	// 	}else if(newEntry > middle){

	// 	}

	// }

	array.push(newEntry);
	//same way to sort an unsorted array:
	array.sort(function(a, b){return a-b;});
	if(array.length%2 !== 0){//odd number
		return array[Math.floor(array.length/2)];
	}else{
		return (array[Math.floor(array.length/2)]+array[Math.floor(array.length/2)-1])/2;
	}
}