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
	}
};

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
		document.getElementById('sb-center').style.color = "lime";
		clearBoard();
		prepareForQuestion();
		allowDifficultySelection();
	});
}

function prepareForQuestion(){
	//setting timer.answer = true stops the timer counter if you click the start button during a countdown
	timer.answer = true;
	document.getElementById('countdown').className = 'content-header';
	document.getElementById('exam-answer-form').innerHTML = '<form id = "form-input-answer">'+
		'$<input type = "number" id="input-answer" placeholder="your answer" title="please type your numerical answer here">'+
		' <input id = "answer-button" type = "submit" value = "submit" title="after typing your answer, '+
		'click this button (or press the enter key on your keyboard) to submit your answer"></form>';
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
	timer.answer = false;
	timer.win = 500;
	var diffChoice = difficulty;
	stats.maxbank += timer.win;
	stats.questions ++;
	var generatedQ = developQuestion(diceRoll());
	console.log(generatedQ);
	var generatedA = developAnswer(generatedQ);
	populateDomWithQuestion(generatedQ);
	timer.interval();
	enableAnswer(generatedA);
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

function developQuestion(roll){
	//function to generate question object and answer object
	var betQ = {
		call: roll,
		point:0,
		type: '',
		comment: '',
		comment2: '',
		flatBetName: '',
		flatAmount: 0,
		other: '',
		otherAmount: 0,
		end:''
	};
	var pick = Math.random();
	var rollResponses = {
		four: ['Four, came the hard way. Two 2s. Hard four.', '3-1. Four came the easy way.', 'Four the easy way.'],
		five: ['Five! 5 dollar footlong!','Five. No field.'],
		six: ['3-3. Six hard. Hard six.', 'Six, no field.','Six, came easy.','Six easy.','Easy six.'],
		seven: ['Seven. 6-1 no more fun.','Seven, out seven.','Red. Out seven.','Seven out. Take the line, pay the do nots.','Seven. Seven out. Last comes get some.','Seven out.','Seven.'],
		eight: ['4-4. Hard eight.', 'Eight, came the easy way.','Eight, take the field.', 'Eight came easy.','Easy eight.'],
		nine: ['Nine. Sixty-three.','Nine, center field.','Nine. 5-4.','Nine.'],
		ten: ['Ten, the hard way. Two 5s','Ten, easy. Easy ten.','Ten came easy.']
	};
	var betAmountsEasy = {
		//this particular bet will be a multiple of 5 between 5 and 25
		passAndComeFlat: parseInt(Math.floor((Math.random()*5) + 1) * 5),
		//this bet will be a multiple of 5, from 15 to 80
		passAndComeOdds: parseInt(Math.floor((Math.random()*14) + 3) * 5),
		//make odds on 5 and 9 even amounts only for easy version
		passAndComeOdds59: parseInt(Math.floor((Math.random()*21) + 5) * 2),
		//this particular bet will be a multiple of 25 between 25 and 100
		buyFourAndTen: parseInt(Math.floor((Math.random()*4) + 1) * 25),
		//this particular bet will be a multiple of 20 between 20 and 100
		buyFiveAndNine: parseInt(Math.floor((Math.random()*5) + 1) * 20),
		//this particular bet will be a multiple of 5 between 5 and 25
		placeFourAndTen: parseInt(Math.floor((Math.random()*5) + 1) * 5),
		//this particular bet will be a multiple of 5 between 5 and 35
		placeFiveAndNine: parseInt(Math.floor((Math.random()*7) + 1) * 5),
		//this particular bet will be a multiple of 6 between 12 and 36
		placeSixAndEight: parseInt(Math.floor((Math.random()*5) + 2) * 6),
		//this particular bet will be a multiple of 1 between 1 and 15
		hardway: parseInt(Math.floor((Math.random()*15) + 1) * 1),
		//this particular bet will be a multiple of 1 between 1 and 20
		hardwayHop: parseInt(Math.floor((Math.random()*20) + 1) * 1),
		//this particular bet will be a multiple of 1 between 1 and 10
		easywayHop: parseInt(Math.floor((Math.random()*10) + 1) * 1)
	};

	//betAmountsMedium:
	//user "presses" eg 3 units.
	//betamountshard:
	//user takes down a bet? use odd values for odds on 5 and 9
	//larger values
	//player wins a come bet w/odds, has a new come bet on the table
	switch(roll){
		case 2:
			if(pick<0.5){
				betQ.type = 'don\'t pass';
				betQ.comment = 'Take the line.';
				betQ.comment2 = 'Pay the don\'ts.';
				betQ.flatBetName = 'Don\'t pass: $';
				//this particular bet will be a multiple of 5 between 5 and 25
				betQ.flatAmount = parseInt(Math.floor((Math.random()*5) + 1) * 5);
				betQ.other = '';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}else if(pick<1){
				//dont come flat
				betQ.type = 'don\'t come';
				betQ.comment = '2 craps 2.';
				betQ.comment2 = '';
				betQ.flatBetName = 'Don\'t come: $';
				//this particular bet will be a multiple of 5 between 5 and 25
				betQ.flatAmount = parseInt(Math.floor((Math.random()*5) + 1) * 5);
				betQ.other = '';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}
			break;
		case 3:
			if(pick<0.5){
				betQ.type = 'don\'t pass';
				betQ.comment = 'Take the line.';
				betQ.comment2 = 'Pay the don\'ts.';
				betQ.flatBetName = 'Don\'t pass: $';
				//this particular bet will be a multiple of 5 between 5 and 25
				betQ.flatAmount = parseInt(Math.floor((Math.random()*5) + 1) * 5);
				betQ.other = '';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}else if(pick<1){
				//dont come flat
				betQ.type = 'don\'t come';
				betQ.comment = '3 craps 3.';
				betQ.comment2 = '';
				betQ.flatBetName = 'Don\'t come: $';
				//this particular bet will be a multiple of 5 between 5 and 25
				betQ.flatAmount = parseInt(Math.floor((Math.random()*5) + 1) * 5);
				betQ.other = '';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}
			break;
		case 4:
			if(pick<0.25){
				betQ.type = 'passline';
				betQ.comment = 'Front line winner.';
				betQ.comment2 = 'The point is ' + betQ.call + '.';
				betQ.flatBetName = 'Pass line: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
				betQ.other = 'Pass line odds: $';
				betQ.otherAmount = betAmountsEasy.passAndComeOdds;
				betQ.end = 'Winnings paid = ?';
			}else if(pick <0.45){
				betQ.type = 'come bet';
				betQ.comment = rollResponses.four[Math.floor(Math.random()*rollResponses.four.length)];
				betQ.comment2 = '';
				betQ.flatBetName = 'Come bet on the four: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
				betQ.other = 'Odds on the four: $';
				betQ.otherAmount = betAmountsEasy.passAndComeOdds;
				betQ.end = 'Winnings paid = ?';
			}else if(pick <0.7){
				//buy bet
				betQ.type = 'buy bet';
				betQ.comment = rollResponses.four[Math.floor(Math.random()*rollResponses.four.length)];
				betQ.comment2 = '';
				betQ.flatBetName = 'Buy the four: $';
				betQ.flatAmount = betAmountsEasy.buyFourAndTen;
				betQ.other = 'Same bet!';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}else if(pick <0.75){
				//place bet
				betQ.type = 'place bet';
				betQ.comment = rollResponses.four[Math.floor(Math.random()*rollResponses.four.length)];
				betQ.comment2 = '';
				betQ.flatBetName = 'Place four: $';
				betQ.flatAmount = betAmountsEasy.placeFourAndTen;
				betQ.other = 'Same bet.';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}else if(pick <0.85){
				betQ.type = 'hard way bet';
				betQ.comment = rollResponses.four[0];
				betQ.comment2 = '';
				betQ.flatBetName = 'four hard: $';
				betQ.flatAmount = betAmountsEasy.hardway;
				betQ.other = '';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}else if(pick<0.95){
				betQ.type = 'hard way hop';
				betQ.comment = rollResponses.four[0];
				betQ.comment2 = '';
				betQ.flatBetName = 'HOPPING hard four: $';
				betQ.flatAmount = betAmountsEasy.hardwayHop;
				betQ.other = '';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}else{
				betQ.type = 'easy way hop';
				//only select one of the 2 last possible responses from the rollResponses.four array
				betQ.comment = rollResponses.four[Math.floor(Math.random()*(rollResponses.four.length-1))+1];
				betQ.comment2 = '';
				betQ.flatBetName = 'HOPPING easy four: $';
				betQ.flatAmount = betAmountsEasy.easywayHop;
				betQ.other = '';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}
			break;
		case 5:
			if(pick<0.25){
				betQ.type = 'passline';
				betQ.comment = 'Front line winner.';
				betQ.comment2 = 'The point is ' + betQ.call + '.';
				betQ.flatBetName = 'Pass line: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
				betQ.other = 'Pass line odds: $';
				betQ.otherAmount = betAmountsEasy.passAndComeOdds59;
				betQ.end = 'Winnings paid = ?';
			}else if(pick <0.5){
				betQ.type = 'come bet';
				betQ.comment = rollResponses.five[Math.floor(Math.random()*rollResponses.five.length)];
				betQ.comment2 = '';
				betQ.flatBetName = 'Come bet on the five: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
				betQ.other = 'Odds on the five: $';
				betQ.otherAmount = betAmountsEasy.passAndComeOdds59;
				betQ.end = 'Winnings paid = ?';
			}else if(pick <0.55){
				//buy bet
				betQ.type = 'buy bet';
				betQ.comment = rollResponses.five[Math.floor(Math.random()*rollResponses.five.length)];
				betQ.comment2 = '';
				betQ.flatBetName = 'Buy the five: $';
				betQ.flatAmount = betAmountsEasy.buyFiveAndNine;
				betQ.other = 'Same bet!';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}else if(pick <0.9){
				//place bet
				betQ.type = 'place bet';
				betQ.comment = rollResponses.five[Math.floor(Math.random()*rollResponses.five.length)];
				betQ.comment2 = '';
				betQ.flatBetName = 'Place five: $';
				betQ.flatAmount = betAmountsEasy.placeFiveAndNine;
				betQ.other = 'Same bet.';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}else{
				betQ.type = 'easy way hop';
				//only select one of the 2 last possible responses from the rollResponses.four array
				betQ.comment = rollResponses.five[Math.floor(Math.random()*rollResponses.five.length)];
				betQ.comment2 = '';
				betQ.flatBetName = 'HOPPING five: $';
				betQ.flatAmount = betAmountsEasy.easywayHop;
				betQ.other = 'Five easy.';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}
			break;
		case 6:
			if(pick<0.25){
				betQ.type = 'passline';
				betQ.comment = 'Front line winner.';
				betQ.comment2 = 'The point is ' + betQ.call + '.';
				betQ.flatBetName = 'Pass line: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
				betQ.other = 'Pass line odds: $';
				betQ.otherAmount = betAmountsEasy.passAndComeOdds;
				betQ.end = 'Winnings paid = ?';
			}else if(pick <0.4){
				betQ.type = 'come bet';
				betQ.comment = rollResponses.six[Math.floor(Math.random()*rollResponses.six.length)];
				betQ.comment2 = '';
				betQ.flatBetName = 'Come bet on the six: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
				betQ.other = 'Odds on the six: $';
				betQ.otherAmount = betAmountsEasy.passAndComeOdds;
				betQ.end = 'Winnings paid = ?';
			// }else if(pick <0.45){
			// 	//buy bet
			// 	betQ.type = 'buy bet';
			// 	betQ.comment = rollResponses.six[Math.floor(Math.random()*rollResponses.six.length)];
			// 	betQ.comment2 = '';
			// 	betQ.flatBetName = 'Buy the six: $';
			// 	//this particular bet will be a multiple of 25 between 25 and 100
			// 	betQ.flatAmount = parseInt(Math.floor((Math.random()*4) + 1) * 25);
			// 	betQ.other = 'Same bet!';
			// 	betQ.otherAmount = '';
			// 	betQ.end = 'Winnings paid = ?';
			}else if(pick <0.8){
				//place bet
				betQ.type = 'place bet';
				betQ.comment = rollResponses.six[Math.floor(Math.random()*rollResponses.six.length)];
				betQ.comment2 = '';
				betQ.flatBetName = 'Place six: $';
				betQ.flatAmount = betAmountsEasy.placeSixAndEight;
				betQ.other = 'Same bet.';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}else if(pick <0.9){
				betQ.type = 'hard way bet';
				betQ.comment = rollResponses.six[0];
				betQ.comment2 = '';
				betQ.flatBetName = 'six hard: $';
				betQ.flatAmount = betAmountsEasy.hardway;
				betQ.other = '';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}else if(pick<0.95){
				betQ.type = 'hard way hop';
				betQ.comment = rollResponses.six[0];
				betQ.comment2 = '';
				betQ.flatBetName = 'HOPPING hard six: $';
				betQ.flatAmount = betAmountsEasy.hardwayHop;
				betQ.other = '';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}else{
				betQ.type = 'easy way hop';
				//only select any possible responses from the rollResponses.six array EXCEPT for the first response
				betQ.comment = rollResponses.six[Math.floor(Math.random()*(rollResponses.six.length-1))+1];
				betQ.comment2 = '';
				betQ.flatBetName = 'HOPPING easy six: $';
				betQ.flatAmount = betAmountsEasy.easywayHop;
				betQ.other = '';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}
			break;
		case 8:
			if(pick<0.25){
				betQ.type = 'passline';
				betQ.comment = 'Front line winner.';
				betQ.comment2 = 'The point is ' + betQ.call + '.';
				betQ.flatBetName = 'Pass line: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
				betQ.other = 'Pass line odds: $';
				betQ.otherAmount = betAmountsEasy.passAndComeOdds;
				betQ.end = 'Winnings paid = ?';
			}else if(pick <0.4){
				betQ.type = 'come bet';
				betQ.comment = rollResponses.eight[Math.floor(Math.random()*rollResponses.eight.length)];
				betQ.comment2 = '';
				betQ.flatBetName = 'Come bet on the eight: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
				betQ.other = 'Odds on the eight: $';
				betQ.otherAmount = betAmountsEasy.passAndComeOdds;
				betQ.end = 'Winnings paid = ?';
			}else if(pick <0.8){
				//place bet
				betQ.type = 'place bet';
				betQ.comment = rollResponses.eight[Math.floor(Math.random()*rollResponses.eight.length)];
				betQ.comment2 = '';
				betQ.flatBetName = 'Place eight: $';
				betQ.flatAmount = betAmountsEasy.placeSixAndEight;
				betQ.other = 'Same bet.';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}else if(pick <0.9){
				betQ.type = 'hard way bet';
				betQ.comment = rollResponses.eight[0];
				betQ.comment2 = '';
				betQ.flatBetName = 'eight hard: $';
				betQ.flatAmount = betAmountsEasy.hardway;
				betQ.other = '';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}else if(pick<0.95){
				betQ.type = 'hard way hop';
				betQ.comment = rollResponses.eight[0];
				betQ.comment2 = '';
				betQ.flatBetName = 'HOPPING hard eight: $';
				betQ.flatAmount = betAmountsEasy.hardwayHop;
				betQ.other = '';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}else{
				betQ.type = 'easy way hop';
				//only select any possible responses from the rollResponses.eight array EXCEPT for the first response
				betQ.comment = rollResponses.eight[Math.floor(Math.random()*(rollResponses.eight.length-1))+1];
				betQ.comment2 = '';
				betQ.flatBetName = 'HOPPING easy eight: $';
				betQ.flatAmount = betAmountsEasy.easywayHop;
				betQ.other = '';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}
			break;
		case 9:
			if(pick<0.25){
				betQ.type = 'passline';
				betQ.comment = 'Front line winner.';
				betQ.comment2 = 'The point is ' + betQ.call + '.';
				betQ.flatBetName = 'Pass line: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
				betQ.other = 'Pass line odds: $';
				betQ.otherAmount = betAmountsEasy.passAndComeOdds59;
				betQ.end = 'Winnings paid = ?';
			}else if(pick <0.5){
				betQ.type = 'come bet';
				betQ.comment = rollResponses.nine[Math.floor(Math.random()*rollResponses.nine.length)];
				betQ.comment2 = '';
				betQ.flatBetName = 'Come bet on the nine: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
				betQ.other = 'Odds on the nine: $';
				betQ.otherAmount = betAmountsEasy.passAndComeOdds59;
				betQ.end = 'Winnings paid = ?';
			}else if(pick <0.55){
				//buy bet
				betQ.type = 'buy bet';
				betQ.comment = rollResponses.nine[Math.floor(Math.random()*rollResponses.nine.length)];
				betQ.comment2 = '';
				betQ.flatBetName = 'Buy the nine: $';
				betQ.flatAmount = betAmountsEasy.buyFiveAndNine;
				betQ.other = 'Same bet!';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}else if(pick <0.9){
				//place bet
				betQ.type = 'place bet';
				betQ.comment = rollResponses.nine[Math.floor(Math.random()*rollResponses.nine.length)];
				betQ.comment2 = '';
				betQ.flatBetName = 'Place nine: $';
				betQ.flatAmount = betAmountsEasy.placeFiveAndNine;
				betQ.other = 'Same bet.';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}else{
				betQ.type = 'easy way hop';
				betQ.comment = rollResponses.nine[Math.floor(Math.random()*rollResponses.nine.length)];
				betQ.comment2 = '';
				betQ.flatBetName = 'HOPPING nine: $';
				betQ.flatAmount = betAmountsEasy.easywayHop;
				betQ.other = 'Nine easy.';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}
			break;
		case 10:
			if(pick<0.25){
				betQ.type = 'passline';
				betQ.comment = 'Front line winner.';
				betQ.comment2 = 'The point is ' + betQ.call + '.';
				betQ.flatBetName = 'Pass line: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
				betQ.other = 'Pass line odds: $';
				betQ.otherAmount = betAmountsEasy.passAndComeOdds;
				betQ.end = 'Winnings paid = ?';
			}else if(pick <0.45){
				betQ.type = 'come bet';
				betQ.comment = rollResponses.ten[Math.floor(Math.random()*rollResponses.ten.length)];
				betQ.comment2 = '';
				betQ.flatBetName = 'Come bet on the ten: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
				betQ.other = 'Odds on the ten: $';
				betQ.otherAmount = betAmountsEasy.passAndComeOdds;
				betQ.end = 'Winnings paid = ?';
			}else if(pick <0.7){
				//buy bet
				betQ.type = 'buy bet';
				betQ.comment = rollResponses.ten[Math.floor(Math.random()*rollResponses.ten.length)];
				betQ.comment2 = '';
				betQ.flatBetName = 'Buy the ten: $';
				betQ.flatAmount = betAmountsEasy.buyFourAndTen;
				betQ.other = 'Same bet!';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}else if(pick <0.75){
				//place bet
				betQ.type = 'place bet';
				betQ.comment = rollResponses.ten[Math.floor(Math.random()*rollResponses.ten.length)];
				betQ.comment2 = '';
				betQ.flatBetName = 'Place ten: $';
				betQ.flatAmount = betAmountsEasy.placeFourAndTen;
				betQ.other = 'Same bet.';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}else if(pick <0.85){
				betQ.type = 'hard way bet';
				betQ.comment = rollResponses.ten[0];
				betQ.comment2 = '';
				betQ.flatBetName = 'ten hard: $';
				betQ.flatAmount = betAmountsEasy.hardway;
				betQ.other = '';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}else if(pick<0.95){
				betQ.type = 'hard way hop';
				betQ.comment = rollResponses.ten[0];
				betQ.comment2 = '';
				betQ.flatBetName = 'HOPPING hard ten: $';
				betQ.flatAmount = betAmountsEasy.hardwayHop;
				betQ.other = '';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}else{
				betQ.type = 'easy way hop';
				//only select one of the 2 last possible responses from the rollResponses.ten array
				betQ.comment = rollResponses.ten[Math.floor(Math.random()*(rollResponses.ten.length-1))+1];
				betQ.comment2 = '';
				betQ.flatBetName = 'HOPPING easy ten: $';
				betQ.flatAmount = betAmountsEasy.easywayHop;
				betQ.other = '';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}
			break;
		case 12:
			if(pick<1){
				betQ.type = 'don\'t pass';
				betQ.comment = 'Take the line.';
				betQ.comment2 = '12 craps 12';
				betQ.flatBetName = 'Don\'t pass: $';
				//this particular bet will be a multiple of 5 between 5 and 25
				betQ.flatAmount = parseInt(Math.floor((Math.random()*5) + 1) * 5);
				betQ.other = '';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}
			break;
		case 7 || 11:
			if(pick<1){
				betQ.type = 'don\'t pass';
				betQ.comment = rollResponses.seven[Math.floor(Math.random()*rollResponses.seven.length)];
				betQ.comment2 = 'Pay the don\'ts.';
				betQ.flatBetName = 'Don\'t come: $';
				//this particular bet will be a multiple of 5 between 5 and 25
				betQ.flatAmount = parseInt(Math.floor((Math.random()*5) + 1) * 5);
				betQ.other = 'don\'t come laying the odds: $';
				betQ.otherAmount = '';
				betQ.end = 'Winnings paid = ?';
			}
			break;
		default:
			console.log('unknown roll in generateQA');
			break;
	}
	return betQ;
}

function developAnswer(question){
	//remember: here the input question = betQ object from developQuestion
	//analyze the bet to calculate the solution and explanation
	//return an answer object
	var betA = {
		answer: 55,//have numerical answer total amount here
		flatBetExplanation: 'The pass line bet pays even money.',
		otherBetExplanation: 'Odds on 8 pay the fair 6 to 5 because there are six ways to roll a 7 and five ways to roll the 8.',
		showMath:'pass line of $10: 1 to 1 = $10<br>Odds taken on 8 of $20: (6/5) * $20 = $24<br>TOTAL = $34'
	};
	return betA;
}

function populateDomWithQuestion(question){
	var show = 'Call: ' + question.call;
	show += '<br>' + question.comment;
	show += '<br>' + question.comment2;
	show += '<br>' + question.flatBetName + question.flatAmount;
	show += '<br>' + question.other + question.otherAmount;
	show += '<br><br>' + question.end;
	document.getElementById('exam-question').innerHTML = show;
	document.getElementById('explanation-content').innerHTML = 'good luck!';
}

function enableAnswer(answer){
	document.getElementById('answer-button').addEventListener('click', function(event){
		event.preventDefault();
		timer.answer = true;
		//populate DOM with answer explanation
		displayAnswerOnDOM(answer);
	});
}

function arrayElements(array){
	if(array.length === 0){
		return 0;
	}else{
		return array.length -1;
	}
}

function displayAnswerOnDOM(correctAnswer){
	var comments = {
		correct:['That\'s right!', 'Good job.', 'You got it.', 'Correct.', 'Excellent.'],
		incorrect:['Are you sure? Check the explanation.','Sorry, review the explanation.','Does this number look more accurate?']
	};
	var currentWin = timer.win;
	var userAnswer = parseInt(document.getElementById('input-answer').value);
	if(!userAnswer){
		userAnswer = 'nothing';
	}
	document.getElementById('exam-question').innerHTML += '<br><br><div class = "answer-div">You entered: $' + userAnswer + '</div>';
	//develop answer explanation
	var solution = 'ANSWER: $' + correctAnswer.answer;
	solution += '<br>' + correctAnswer.flatBetExplanation;
	solution += '<br>' + correctAnswer.otherBetExplanation;
	solution += '<hr>Calculation:<br>' + correctAnswer.showMath;
	if(correctAnswer.answer === userAnswer){
		stats.streak ++;
		//now, analyze stats.streak value
		//offer "activate bonus" where is eg streak of 5 questions, bonus points received.
		//ALTERNATIVE: once a streak occurs, beginning amount of winnings for each question increases
		//http://www.w3schools.com/jsref/met_document_addeventlistener.asp
		// document.addEventListener("mouseover", myFunction);
		// document.addEventListener("click", someOtherFunction);
		// document.addEventListener("mouseout", someOtherFunction);
		stats.bank += currentWin;
		addToArrayAsc(stats.wins, currentWin, 0, arrayElements(stats.wins));
		stats.correct ++;
		document.getElementById('exam-question').innerHTML += comments.correct[Math.floor(Math.random()*comments.correct.length)];
	}else if(userAnswer !== correctAnswer.answer){
		stats.streak = 0;
		addToArrayAsc(stats.wins, 0, 0, 0);
		stats.incorrect ++;
		document.getElementById('exam-question').innerHTML += comments.incorrect[Math.floor(Math.random()*comments.incorrect.length)];
	}
	if(currentWin === 0){
		stats.streak = 0;
	}
	stats.medianWin = calculateMedian(stats.wins).toFixed(2);
	stats.meanWin = calculateMean(stats.wins, stats.questions, 2);
	stats.accuracy = (stats.correct * 100 / stats.questions).toFixed(2);
	updateAllStats();
	//show answer with explanation on DOM
	document.getElementById('exam-question').innerHTML += '<br><div class = "answer-div">ANSWER: $' + correctAnswer.answer + '</div>';
	document.getElementById('explanation-content').innerHTML = solution;
	



	//document.getElementById('input-answer').value = '';
	//document.getElementById('input-answer').placeholder = 'next';
	//document.getElementById('input-answer').title = 'please press enter for the next question.';
	//document.getElementById('answer-button').value = 'next question';
	//document.getElementById('answer-button').title = 'press enter or click here for the next question.';
	//document.getElementById('answer-button').id = 'next-button';
	document.getElementById('form-input-answer').innerHTML = '<input id = "next-button" type = "submit" value = "next question" title = "press enter or click here for the next question.">';
	document.getElementById('next-button').addEventListener('click', function(event){
		event.preventDefault();
		prepareForQuestion();
		generateQuestion();
	});
}

var timer =
{
	win: 500,
	answer: false,
	interval: function(){
		//every second, decrease 1/15 of 500 = 33 1/3
		//1000 milliseconds / 33 1/3
		document.getElementById('countdown').className += ' enhanced';
		counter = setInterval(timer.updatePossWin, 30);
	},
	updatePossWin: function(){
		document.getElementById('countdown').innerText = timer.win;
		timer.win --;
		if(timer.answer){
			timer.stop();
			document.getElementById('countdown').className = 'content-header';
			return;
		}else if(timer.win === 0){
			document.getElementById('countdown').innerText = '-0-';
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

function addToArrayAsc(array, newEntry, low, high){
	var difference = high-low;
	//for an array with an even number of elements, this middleIndex will be the element just below the middle
	var middleIndex = Math.floor((low + high)/2);
	if(difference < 2){
		if(newEntry <= array[low]){
			array.splice(low, 0, newEntry);
			return;
		}else{
			//use middleIndex here instead of high
			//could also just use low + 1
			array.splice(middleIndex + 1, 0, newEntry);
			return;
		}
	}else if(newEntry === array[middleIndex]){
		array.splice(middleIndex, 0, newEntry);
		return;
	}else if(newEntry > array[middleIndex]){
		addToArrayAsc(array, newEntry, middleIndex, high);
	}else{
		addToArrayAsc(array, newEntry, low, middleIndex);
	}
	//can also do this to sort an unsorted array:
	// array.push(newEntry);
	// array.sort(function(a, b){return a-b;});
}

function calculateMedian(array){
	if(array.length%2 !== 0){//odd number
		return array[Math.floor(array.length/2)];
	}else{
		return (array[Math.floor(array.length/2)]+array[Math.floor(array.length/2)-1])/2;
	}
}