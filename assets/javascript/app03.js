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

var rollStatus = {
	rollNumber:0,
	comeOut: true,
	point:0,
	history:[]
};

function begin(){
	document.getElementById('start-button-div').addEventListener('click', function(event){
		event.preventDefault();
		document.getElementById('sb-center').style.color = "lime";
		clearBoard();
		clearRollStatus();
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

function clearRollStatus(){
	rollStatus.rollNumber = 0;
	rollStatus.comeOut = true;
	rollStatus.point = 0;
	rollStatus.history = [];
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
	console.log(stats.wins);
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
	var generatedA = developAnswer(generatedQ);
	populateDomWithQuestion(generatedQ);
	timer.interval();
	enableAnswer(generatedA);
}

function diceRoll(){
	var num = Math.random();
	if(num<(1/36)){//2 = 1/36
		return 2;
	}else if(num<(3/36)){//3 = 2/36
		return 3;
	}else if(num<(6/36)){//4 = 3/36
		return 4;
	}else if(num<(10/36)){//5 = 4/36
		return 5;
	}else if(num<(15/36)){//6 = 5/36
		return 6;
	}else if(num<(21/36)){//7 = 6/36
		return 7;
	}else if(num<(13/18)){//8 = 5/36
		return 8;
	}else if(num<(5/6)){//9 = 4/36
		return 9;
	}else if(num<(11/13)){//10 = 3/36
		return 10;
	}else if(num<(35/36)){//11 = 2/36
		return 11;
	}else if(num<1){//12 = 1/36
		return 12;
	}else{
		console.log('unknown roll');
	}
}

function developQuestion(roll){
	//function to generate question object
	updateRollStatus(roll);
	var betQ = {
		call: roll,
		type1: '',
		type2: false,
		comment1: '',
		comment2: false,
		flatBetName: '',
		flatAmount: 0,
		other: false,
		otherAmount: false,
		commission:false,
		end:''
	};
	var rollResponses = {
		two: ['Two craps Two.', 'Aces. Two craps Two.'],
		three: ['Three craps Three.', 'Three. Ace - deuce.'],
		four: ['Four, came the hard way. Two 2s. Hard four.', '3-1. Four came the easy way.', 'Four the easy way.'],
		five: ['Five! Five dollar footlong!','Five. No field.'],
		six: ['3-3. Six hard. Hard six.', 'Six, no field.','Six, came easy.','Six easy.','Easy six.'],
		seven: ['Seven. Front line winner.','Seven. Take the don\'ts, pay the line. Pay behind.', 'Seven, winner.'],
		sevenOut:['Seven. 6-1 no more fun.','Seven, out seven.','Red. Out seven.','Seven out. Take the line, pay the do nots.','Seven. Seven out. Last comes get some.','Seven out.','Seven.'],
		eight: ['4-4. Hard eight.', 'Eight, came the easy way.','Eight, take the field.', 'Eight came easy.','Easy eight.'],
		nine: ['Nine. Sixty-three.','Nine, center field.','Nine. 5-4.','Nine.'],
		ten: ['Ten, the hard way. Two 5s','Ten, easy. Easy ten.','Ten came easy.'],
		eleven:['Eleven.','Yo-leven.','Yo-leven. Good come, take the don\'ts'],
		elevenComeOut:['Eleven. Front line winner.','Yo-leven. Take the don\'ts, pay the line.'],
		twelve:['Twelve craps Twelve.','Twelve. Boxcars', 'Twelve, midnight.']
	};
	var betAmountsEasy = {
		//this particular bet will be a multiple of 5 between 5 and 25
		passAndComeFlat: parseInt(Math.floor((Math.random()*5) + 1) * 5),
		//this bet will be a multiple of 5, from 15 to 80
		passAndComeOdds: parseInt(Math.floor((Math.random()*14) + 3) * 5),
		//make odds on 5 and 9 even amounts only for easy version
		// passAndComeOdds59: parseInt(Math.floor((Math.random()*21) + 5) * 2),
		passAndComeOdds59: parseInt(Math.floor((Math.random()*5) + 1) * 10),
		dontodds59: parseInt(Math.floor((Math.random() * 11) + 5) * 3),
		dontodds68: parseInt(Math.floor((Math.random() * 7) + 2) * 6),
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
		//this particular bet will be a multiple of 1 between 1 and 10
		hardwayHop: parseInt(Math.floor((Math.random()*10) + 1) * 1),
		//this particular bet will be a multiple of 1 between 1 and 10
		easywayHop: parseInt(Math.floor((Math.random()*10) + 1) * 1)
	};
	//betAmountsMedium:
	//user "presses" eg 3 units.
	//betamountshard:
	//user takes down a bet? use odd values for odds on 5 and 9
	//larger values
	//player wins a come bet w/odds, has a new come bet on the table
	var pick = Math.random();
	switch(roll){
		case 7:
			if(rollStatus.comeOut || rollStatus.point === 0){
				//initially set question to come out win (or if there is NO point)
				betQ.type1 = 'passline';
				betQ.comment1 = rollResponses.seven[Math.floor(Math.random()*rollResponses.seven.length)];
				betQ.flatBetName = 'Pass line bet: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
			}//on a seven out, with 20% chance make a come bet
			if(!rollStatus.comeOut && pick <= 0.2){
				betQ.type1 = 'comebet';
				betQ.comment1 = rollResponses.sevenOut[Math.floor(Math.random()*rollResponses.sevenOut.length)];
				betQ.flatBetName = 'Come bet: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
			}
			//with probability 50% on a comeout roll WITH a point existing OR 80% chance on a seven out, make the question a winning don't pass bet
			if((rollStatus.comeOut && pick < 0.5 && rollStatus.point !== 0) || (!rollStatus.comeOut && pick > 0.2)){
				betQ.type1 = 'dontpass';
				betQ.type2 = 'dontodds';
				betQ.comment1 = rollResponses.sevenOut[Math.floor(Math.random()*rollResponses.sevenOut.length)];
				betQ.comment2 = 'Number was: ' + rollStatus.point;
				betQ.flatBetName = 'Don\'t pass: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
				betQ.other = 'Don\'t pass laying the odds: $';
				//laying the odds amount depends on the point so here, "easy" amounts will be laid against the point
				if(rollStatus.point === 4 || rollStatus.point === 10){
					betQ.otherAmount = betAmountsEasy.passAndComeOdds59;
				}else if(rollStatus.point === 5 || rollStatus.point === 9){
					betQ.otherAmount = betAmountsEasy.dontodds59;
				}else if(rollStatus.point === 6 || rollStatus.point === 8){
					betQ.otherAmount = betAmountsEasy.dontodds68;
				}
			}
			//with 40% chance on a roll of 7 on a seven out roll, make question a don't come bet instead of don't pass
			if(pick > 0.2 && pick < 0.6 && !rollStatus.comeOut){
				betQ.type1 = 'dontcome';
				betQ.flatBetName = 'Don\'t come: $';
				betQ.other = 'Don\'t come laying the odds: $';
			}
			break;
		case 6:
			betQ.comment1 = rollResponses.six[Math.floor(Math.random()*rollResponses.six.length)];
			if(pick < 0.25){
				betQ.type1 = 'passline';
				betQ.type2 = 'passodds';
				betQ.comment2 = 'The point is ' + betQ.call + '. Front line winner.';
				betQ.flatBetName = 'Pass line: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
				betQ.other = 'Pass line odds: $';
				betQ.otherAmount = betAmountsEasy.passAndComeOdds;
			}else{
				betQ.type1 = 'comebet';
				betQ.type2 = 'comeodds';
				betQ.comment2 = false;
				betQ.flatBetName = 'Come bet on the six: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
				betQ.other = 'Odds on the six: $';
				betQ.otherAmount = betAmountsEasy.passAndComeOdds;
				if(pick > 0.4){
					betQ.type1 = 'buybet';
					betQ.type2 = false;
					betQ.flatBetName = 'Buy the six: $';
					betQ.flatAmount = betAmountsEasy.placeFiveAndNine;
					betQ.other = 'Same bet!';
					betQ.commission = 0.05;
					betQ.otherAmount = 0;
				}
				if(pick > 0.45){
					betQ.type1 = 'placebet';
					betQ.flatBetName = 'Place bet on six: $';
					betQ.flatAmount = betAmountsEasy.placeSixAndEight;
					betQ.commission = false;
				}
				if(pick > 0.90){
					betQ.type1 = 'hardway';
					betQ.comment1 = rollResponses.six[0];
					betQ.flatBetName = 'six hard: $';
					betQ.flatAmount = betAmountsEasy.hardway;
				}
				//options for hardway hop and easy way hop
			}
			break;
		case 8:
			betQ.comment1 = rollResponses.eight[Math.floor(Math.random()*rollResponses.eight.length)];
			if(pick < 0.25){
				betQ.type1 = 'passline';
				betQ.type2 = 'passodds';
				betQ.comment2 = 'The point is ' + betQ.call + '. Front line winner.';
				betQ.flatBetName = 'Pass line: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
				betQ.other = 'Pass line odds: $';
				betQ.otherAmount = betAmountsEasy.passAndComeOdds;
			}else{
				betQ.type1 = 'comebet';
				betQ.type2 = 'comeodds';
				betQ.comment2 = false;
				betQ.flatBetName = 'Come bet on the eight: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
				betQ.other = 'Odds on the eight: $';
				betQ.otherAmount = betAmountsEasy.passAndComeOdds;
				if(pick > 0.4){
					betQ.type1 = 'buybet';
					betQ.type2 = false;
					betQ.flatBetName = 'Buy the eight: $';
					betQ.flatAmount = betAmountsEasy.placeFiveAndNine;
					betQ.other = 'Same bet!';
					betQ.commission = 0.05;
					betQ.otherAmount = 0;
				}
				if(pick > 0.45){
					betQ.type1 = 'placebet';
					betQ.flatBetName = 'Place bet on eight: $';
					betQ.flatAmount = betAmountsEasy.placeSixAndEight;
					betQ.commission = false;
				}
				if(pick > 0.90){
					betQ.type1 = 'hardway';
					betQ.comment1 = rollResponses.eight[0];
					betQ.flatBetName = 'eight hard: $';
					betQ.flatAmount = betAmountsEasy.hardway;
				}
				//options for hardway hop and easy way hop
			}
			break;
		case 5:
			betQ.comment1 = rollResponses.five[Math.floor(Math.random()*rollResponses.five.length)];
			if(pick < 0.25){
				betQ.type1 = 'passline';
				betQ.type2 = 'passodds';
				betQ.comment2 = 'The point is ' + betQ.call + '. Front line winner.';
				betQ.flatBetName = 'Pass line: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
				betQ.other = 'Pass line odds: $';
				betQ.otherAmount = betAmountsEasy.passAndComeOdds59;
			}else{
				betQ.type1 = 'comebet';
				betQ.type2 = 'comeodds';
				betQ.comment2 = false;
				betQ.flatBetName = 'Come bet on the five: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
				betQ.other = 'Odds on the five: $';
				betQ.otherAmount = betAmountsEasy.passAndComeOdds59;
				if(pick > 0.5){
					betQ.type1 = 'buybet';
					betQ.type2 = false;
					betQ.flatBetName = 'Buy the five: $';
					betQ.flatAmount = betAmountsEasy.buyFiveAndNine;
					betQ.other = 'Same bet!';
					betQ.commission = 0.05;
					betQ.otherAmount = 0;
				}
				if(pick > 0.55){
					betQ.type1 = 'placebet';
					betQ.flatBetName = 'Place bet on five: $';
					betQ.flatAmount = betAmountsEasy.placeFiveAndNine;
					betQ.commission = false;
				}
				//options for easy way hop
			}
			break;
		case 9:
			betQ.comment1 = rollResponses.nine[Math.floor(Math.random()*rollResponses.nine.length)];
			if(pick < 0.25){
				betQ.type1 = 'passline';
				betQ.type2 = 'passodds';
				betQ.comment2 = 'The point is ' + betQ.call + '. Front line winner.';
				betQ.flatBetName = 'Pass line: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
				betQ.other = 'Pass line odds: $';
				betQ.otherAmount = betAmountsEasy.passAndComeOdds59;
			}else{
				betQ.type1 = 'comebet';
				betQ.type2 = 'comeodds';
				betQ.comment2 = false;
				betQ.flatBetName = 'Come bet on the nine: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
				betQ.other = 'Odds on the nine: $';
				betQ.otherAmount = betAmountsEasy.passAndComeOdds59;
				if(pick > 0.5){
					betQ.type1 = 'buybet';
					betQ.type2 = false;
					betQ.flatBetName = 'Buy the nine: $';
					betQ.flatAmount = betAmountsEasy.buyFiveAndNine;
					betQ.other = 'Same bet!';
					betQ.commission = 0.05;
					betQ.otherAmount = 0;
				}
				if(pick > 0.55){
					betQ.type1 = 'placebet';
					betQ.flatBetName = 'Place bet on nine: $';
					betQ.flatAmount = betAmountsEasy.placeFiveAndNine;
					betQ.commission = false;
				}
				//options for easy way hop
			}
			break;
		case 4:
			betQ.comment1 = rollResponses.four[Math.floor(Math.random()*rollResponses.four.length)];
			if(pick < 0.25){
				betQ.type1 = 'passline';
				betQ.type2 = 'passodds';
				betQ.comment2 = 'The point is ' + betQ.call + '. Front line winner.';
				betQ.flatBetName = 'Pass line: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
				betQ.other = 'Pass line odds: $';
				betQ.otherAmount = betAmountsEasy.passAndComeOdds;
			}else{
				betQ.type1 = 'comebet';
				betQ.type2 = 'comeodds';
				betQ.comment2 = false;
				betQ.flatBetName = 'Come bet on the four: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
				betQ.other = 'Odds on the four: $';
				betQ.otherAmount = betAmountsEasy.passAndComeOdds;
				if(pick > 0.55){
					betQ.type1 = 'buybet';
					betQ.type2 = false;
					betQ.flatBetName = 'Buy the four: $';
					betQ.flatAmount = betAmountsEasy.buyFourAndTen;
					betQ.other = 'Same bet!';
					betQ.commission = 0.05;
					betQ.otherAmount = 0;
				}
				if(pick > 0.83){
					betQ.type1 = 'placebet';
					betQ.flatBetName = 'Place bet on four: $';
					betQ.flatAmount = betAmountsEasy.placeFourAndTen;
					betQ.commission = false;
				}
				if(pick > 0.9){
					betQ.type1 = 'hardway';
					betQ.comment1 = rollResponses.four[0];
					betQ.flatBetName = 'four hard: $';
					betQ.flatAmount = betAmountsEasy.hardway;
				}
				//options for hardway hop and easy way hop
			}
	// 		}else if(pick<0.95){
	// 			betQ.type = 'hard way hop';
	// 			betQ.comment = rollResponses.four[0];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'HOPPING hard four: $';
	// 			betQ.flatAmount = betAmountsEasy.hardwayHop;
	// 			betQ.other = '';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else{
	// 			betQ.type = 'easy way hop';
	// 			//only select one of the 2 last possible responses from the rollResponses.four array
	// 			betQ.comment = rollResponses.four[Math.floor(Math.random()*(rollResponses.four.length-1))+1];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'HOPPING easy four: $';
	// 			betQ.flatAmount = betAmountsEasy.easywayHop;
	// 			betQ.other = '';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}
	 		break;
	 	case 10:
	 		betQ.comment1 = rollResponses.ten[Math.floor(Math.random()*rollResponses.ten.length)];
			if(pick < 0.25){
				betQ.type1 = 'passline';
				betQ.type2 = 'passodds';
				betQ.comment2 = 'The point is ' + betQ.call + '. Front line winner.';
				betQ.flatBetName = 'Pass line: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
				betQ.other = 'Pass line odds: $';
				betQ.otherAmount = betAmountsEasy.passAndComeOdds;
			}else{
				betQ.type1 = 'comebet';
				betQ.type2 = 'comeodds';
				betQ.comment2 = false;
				betQ.flatBetName = 'Come bet on the ten: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
				betQ.other = 'Odds on the ten: $';
				betQ.otherAmount = betAmountsEasy.passAndComeOdds;
				if(pick > 0.5){
					betQ.type1 = 'buybet';
					betQ.type2 = false;
					betQ.flatBetName = 'Buy the ten: $';
					betQ.flatAmount = betAmountsEasy.buyFourAndTen;
					betQ.other = 'Same bet!';
					betQ.commission = 0.05;
					betQ.otherAmount = 0;
				}
				if(pick > 0.75){
					betQ.type1 = 'placebet';
					betQ.flatBetName = 'Place bet on ten: $';
					betQ.flatAmount = betAmountsEasy.placeFourAndTen;
					betQ.commission = false;
				}
				if(pick > 0.92){
					betQ.type1 = 'hardway';
					betQ.comment1 = rollResponses.four[0];
					betQ.flatBetName = 'ten hard: $';
					betQ.flatAmount = betAmountsEasy.hardway;
				}
				//options for hardway hop and easy way hop
			}
			break;
		case 3:
			if(pick<0.25){
				betQ.type1 = 'easywayhop';
				betQ.comment1 = rollResponses.three[Math.floor(Math.random()*rollResponses.three.length)];
				betQ.comment2 = '(easy way hop)';
				betQ.flatBetName = 'Three: $';
				betQ.flatAmount = betAmountsEasy.easywayHop;
			}else{
				betQ.type1 = 'dontpass';
				betQ.comment2 = false;
				betQ.flatBetName = 'Don\'t pass: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
				if(pick > 0.55){
					betQ.type1 = 'dontcome';
					betQ.flatBetName = 'Don\'t come: $';
				}
				if(pick > 0.85){
					betQ.type1 = 'field';
					betQ.flatBetName = 'Field bet: $';
					betQ.flatAmount = betAmountsEasy.passAndComeOdds;
				}
			}
			break;
		case 11:
			if(rollStatus.comeOut){
				betQ.type1 = 'passline';
				betQ.comment1 = rollResponses.elevenComeOut[Math.floor(Math.random()*rollResponses.elevenComeOut.length)];
				betQ.flatBetName = 'Pass line bet: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
			}
			if(!rollStatus.comeOut){
				betQ.type1 = 'comebet';
				betQ.comment1 = rollResponses.eleven[Math.floor(Math.random()*rollResponses.eleven.length)];
				betQ.flatBetName = 'Come bet: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
			}
			//40% chance on any roll of 11
			if(pick < 0.4){
				betQ.type1 = 'easywayhop';
				betQ.comment1 = rollResponses.eleven[Math.floor(Math.random()*rollResponses.eleven.length)];
				betQ.comment2 = '(easy way hop)';
				betQ.flatBetName = 'Eleven: $';
				betQ.flatAmount = betAmountsEasy.easywayHop;
			}
			break;
		case 2:
			if(pick<0.15){
				betQ.type1 = 'hardwayhop';
				betQ.comment1 = rollResponses.two[Math.floor(Math.random()*rollResponses.two.length)];
				betQ.comment2 = '(hard way hop)';
				betQ.flatBetName = 'Two: $';
				betQ.flatAmount = betAmountsEasy.hardwayHop;
			}else{
				betQ.type1 = 'dontpass';
				betQ.comment2 = false;
				betQ.flatBetName = 'Don\'t pass: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
				if(pick > 0.5){
					betQ.type1 = 'dontcome';
					betQ.flatBetName = 'Don\'t come: $';
				}
				if(pick > 0.8){
					betQ.type1 = 'field';
					betQ.flatBetName = 'Field bet: $';
					betQ.flatAmount = betAmountsEasy.passAndComeOdds;
				}
			}
			break;
		case 12:
			if(pick < 0.2){
				betQ.type1 = 'field';
				betQ.comment1 = rollResponses.twelve[Math.floor(Math.random()*rollResponses.twelve.length)];
				betQ.flatBetName = 'Field bet: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
			}else{
				betQ.type1 = 'hardwayhop';
				betQ.comment1 = rollResponses.twelve[Math.floor(Math.random()*rollResponses.twelve.length)];
				betQ.comment2 = '(hard way hop)';
				betQ.flatBetName = 'Twelve: $';
				betQ.flatAmount = betAmountsEasy.hardwayHop;
			}
			break;
		default:
			console.log('unknown roll in generateQA');
			break;
	}
	betQ.end = 'Winnings paid = ?';
	return betQ;
}

function developAnswer(question){
	var betA = {
		flatBetExplanation: '',
		otherBetExplanation: false,
		odds: false,//'Odds taken on ' + 'Odds layed on ',
		oddsString: '',
		flatMultiple:0,
		oddsMultiple:0,
		commission:0,
		commissionString:false,
		placeString:false,
		answer:0,
		showMath:''
	};
	switch(question.type1){
		case 'passline':
			betA.flatBetExplanation = 'Pass line bets pay even money.';
			betA.flatMultiple = 1;
			if(question.type2){
				betA = oddsTaken(betA, question);
			}
			break;
		case 'comebet':
			betA.flatBetExplanation = 'Come bets pay even money.';
			betA.flatMultiple = 1;
			if(question.type2){
				betA = oddsTaken(betA, question);
			}
			break;
		case 'buybet':
			betA = buyBetAnswer(betA, question);
			break;
		case 'hardway':
			betA = hardwayAnswer(betA, question);
			break;
		case 'placebet':
			betA = placeBetAnswer(betA, question);
			break;
		case 'easywayhop':
			betA.flatBetExplanation = 'Easy way hop bets pay 15 to 1.';
			betA.otherBetExplanation = 'There are only 2 of 36 ways to roll the ' + question.call + '.';
			betA.flatMultiple = 15;
			break;
		case 'hardwayhop':
			betA.flatBetExplanation = 'Hard way hop bets pay 30 to 1.';
			betA.otherBetExplanation = 'There are only 1 of 36 ways to roll the ' + question.call + '.';
			betA.flatMultiple = 30;
			break;
		case 'field':
			if(question.call !== 2 && question.call !== 12){
				betA.flatBetExplanation = 'Field bets pay even money with a roll of 3, 4, 9, 10, or 11.';
				betA.flatMultiple = 1;
			}else if(question.call === 2){
				betA.flatBetExplanation = 'Field bets pay 2 to 1 with a roll of 2.';
				betA.flatMultiple = 2;
			}else if(question.call === 12){
				betA.flatBetExplanation = '(generous) Field bets pay 3 to 1 with a roll of 12.';
				betA.flatMultiple = 3;
			}
			break;
		case 'dontpass':
			betA.flatBetExplanation = 'The don\'t pass flat bet pays even money.';
			betA.flatMultiple = 1;
			if(question.type2){
				betA.odds = 'Odds layed on ';//need a space
				if(rollStatus.point === 4){
					betA.otherBetExplanation = 'Odds layed on a point of four pay the fair 1 to 2 because there are 3 ways to roll a four, and 6 ways to roll a seven.';
					betA.oddsMultiple = 1/2;
					betA.oddsString = '1/2';
				}else if(rollStatus.point === 5){
					betA.otherBetExplanation = 'Odds layed on a point of five pay the fair 2 to 3 because there are 4 ways to roll a five, and 6 ways to roll a seven.';
					betA.oddsMultiple = 2/3;
					betA.oddsString = '2/3';
				}else if(rollStatus.point === 6){
					betA.otherBetExplanation = 'Odds layed on a point of six pay the fair 5 to 6 because there are 5 ways to roll a six, and 6 ways to roll a seven.';
					betA.oddsMultiple = 5/6;
					betA.oddsString = '5/6';
				}else if(rollStatus.point === 8){
					betA.otherBetExplanation = 'Odds layed on a point of eight pay the fair 5 to 6 because there are 5 ways to roll an eight, and 6 ways to roll a seven.';
					betA.oddsMultiple = 5/6;
					betA.oddsString = '5/6';
				}else if(rollStatus.point === 9){
					betA.otherBetExplanation = 'Odds layed on a point of nine pay the fair 2 to 3 because there are 4 ways to roll a nine, and 6 ways to roll a seven.';
					betA.oddsMultiple = 2/3;
					betA.oddsString = '2/3';
				}else if(rollStatus.point === 10){
					betA.otherBetExplanation = 'Odds layed on a point of ten pay the fair 1 to 2 because there are 3 ways to roll a ten, and 6 ways to roll a seven.';
					betA.oddsMultiple = 1/2;
					betA.oddsString = '1/2';
				}
			}
			break;
		case 'dontcome':
			betA.flatBetExplanation = 'The don\'t come flat bet pays even money.';
			betA.flatMultiple = 1;
			if(question.type2){
				betA.odds = 'Odds layed on ';//need a space
				if(rollStatus.point === 4){
					betA.otherBetExplanation = 'Odds layed on a point of four pay the fair 1 to 2 because there are 3 ways to roll a four, and 6 ways to roll a seven.';
					betA.oddsMultiple = 1/2;
					betA.oddsString = '1/2';
				}else if(rollStatus.point === 5){
					betA.otherBetExplanation = 'Odds layed on a point of five pay the fair 2 to 3 because there are 4 ways to roll a five, and 6 ways to roll a seven.';
					betA.oddsMultiple = 2/3;
					betA.oddsString = '2/3';
				}else if(rollStatus.point === 6){
					betA.otherBetExplanation = 'Odds layed on a point of six pay the fair 5 to 6 because there are 5 ways to roll a six, and 6 ways to roll a seven.';
					betA.oddsMultiple = 5/6;
					betA.oddsString = '5/6';
				}else if(rollStatus.point === 8){
					betA.otherBetExplanation = 'Odds layed on a point of eight pay the fair 5 to 6 because there are 5 ways to roll an eight, and 6 ways to roll a seven.';
					betA.oddsMultiple = 5/6;
					betA.oddsString = '5/6';
				}else if(rollStatus.point === 9){
					betA.otherBetExplanation = 'Odds layed on a point of nine pay the fair 2 to 3 because there are 4 ways to roll a nine, and 6 ways to roll a seven.';
					betA.oddsMultiple = 2/3;
					betA.oddsString = '2/3';
				}else if(rollStatus.point === 10){
					betA.otherBetExplanation = 'Odds layed on a point of ten pay the fair 1 to 2 because there are 3 ways to roll a ten, and 6 ways to roll a seven.';
					betA.oddsMultiple = 1/2;
					betA.oddsString = '1/2';
				}
			}
			break;
		default:
			console.log('unknown question type1 as analyzed in developAnswer function');
			break;
	}
	//this initially sets the showMath string to the basic bet
	betA.showMath = question.flatBetName + question.flatAmount + ' * ' + betA.flatMultiple + ' = $' + parseInt(question.flatAmount * betA.flatMultiple);
	//for a bet with NO commission involved:
	if(!question.commission){
		//if a place bet, replace the showMath with the string version for the winnings multiple
		if(betA.placeString){
			betA.showMath = question.flatBetName + question.flatAmount + ' * ' + betA.placeString + ' = $' + parseInt(question.flatAmount * betA.flatMultiple);
			betA.answer = parseInt(question.flatAmount * betA.flatMultiple);
		}else{
			betA.answer = question.flatAmount * betA.flatMultiple + question.otherAmount * betA.oddsMultiple;
			//appropriate insert for a don't bet with layed odds how the odds were laid against a certain point number
			if(question.type1 === 'dontpass' || question.type1 === 'dontcome'){
				if(betA.odds){
					betA.showMath += '<br>' + betA.odds + rollStatus.point + ': $' + question.otherAmount + ' * ' + betA.oddsString + ' = $' + question.otherAmount * betA.oddsMultiple;
				}
			//otherwise, if there are odds for a pass line or come bet, then insert the winning call number (not a point)
			}else if(question.type1 === 'passline' || question.type1 === 'comebet'){
				if(betA.odds){
					betA.showMath += '<br>' + betA.odds + question.call + ': $' + question.otherAmount + ' * ' + betA.oddsString + ' = $' + question.otherAmount * betA.oddsMultiple;
				}
			}
		}
	}else{//if a buy bet or lay bet (meaning a commission is involved)
		var vig = question.flatAmount*betA.commission;
		betA.answer = question.flatAmount * betA.flatMultiple - Math.floor(vig);
		betA.showMath += '<br>Commission: $' + question.flatAmount + ' * ' + betA.commissionString + ' = $' + vig.toFixed(2);
		if(vig % 1 !== 0){
			betA.showMath += ' Rounded down = $' + Math.floor(vig);
		}
	}	
	betA.showMath += '<br>TOTAL = $' + betA.answer;
	return betA;
}

function oddsTaken(answer, point){
	var number = '';
	if(point.call === 4 || point.call === 10){
		if(point.call === 4){
			number = 'four';
		}else{
			number = 'ten';
		}
		answer.otherBetExplanation = 'Odds taken on a point of ' + number + ' pay the fair 2 to 1 because there are 6 ways to roll a seven and only 3 ways to roll a ' + number + '.';
		answer.oddsMultiple = 2;
		answer.oddsString = '2';
	}else if(point.call === 5 || point.call === 9){
		if(point.call === 5){
			number = 'five';
		}else{
			number = 'nine';
		}
		answer.otherBetExplanation = 'Odds taken on a point of ' + number + ' pay the fair 3 to 2 because there are 6 ways to roll a seven and only 4 ways to roll a ' + number + '.';
		answer.oddsMultiple = 3/2;
		answer.oddsString = '3/2';
	}else if(point.call === 6 || point.call === 8){
		if(point.call === 6){
			number = 'six';
		}else{
			number = 'eight';
		}
		answer.otherBetExplanation = 'Odds taken on a point of ' + number + ' pay the fair 6 to 5 because there are 6 ways to roll a seven and only 5 ways to roll a ' + number + '.';
		answer.oddsMultiple = 6/5;
		answer.oddsString = '6/5';
	}
	answer.odds = 'Odds taken on ';
	return answer;
}

function buyBetAnswer(answer, point){
	var number = '';
	if(point.call === 4 || point.call === 10){
		if(point.call === 4){
			number = 'four';
		}else{
			number = 'ten';
		}
		answer.flatBetExplanation = 'A buy bet on ' + number + ' pays the fair 2 to 1, minus a 5% commission (vigorish).';
		answer.flatMultiple = 2;
	}else if(point.call === 5 || point.call === 9){
		if(point.call === 5){
			number = 'five';
		}else{
			number = 'nine';
		}
		answer.flatBetExplanation = 'A buy bet on ' + number + ' pays the fair 3 to 2, minus a 5% commission (vigorish).';
		answer.flatMultiple = 3/2;
	}else if(point.call === 6 || point.call === 8){
		if(point.call === 6){
			number = 'six';
		}else{
			number = 'eight';
		}
		answer.flatBetExplanation = 'A buy bet on ' + number + ' pays the fair 6 to 5, minus a 5% commission (vigorish).';
		answer.flatMultiple = 6/5;
	}
	answer.commission = 0.05;
	answer.commissionString = '0.05';
	return answer;
}

function placeBetAnswer(answer, question){
	var number = '';
	if(question.call === 4 || question.call === 10){
		if(question.call === 4){
			number = 'four';
		}else{
			number = 'ten';
		}
		answer.flatBetExplanation = 'A place bet on ' + number + ' pays 9 to 5.';
		answer.flatMultiple = 9/5;
		answer.placeString = '9/5';
	}else if(question.call === 5 || question.call === 9){
		if(question.call === 5){
			number = 'five';
		}else{
			number = 'nine';
		}
		answer.flatBetExplanation = 'A place bet on ' + number + ' pays 7 to 5.';
		answer.flatMultiple = 7/5;
		answer.placeString = '7/5';
	}else if(question.call === 6 || question.call === 8){
		if(question.call === 6){
			number = 'six';
		}else{
			number = 'eight';
		}
		answer.flatBetExplanation = 'A place bet on ' + number + ' pays 7 to 6.';
		answer.flatMultiple = 7/6;
		answer.placeString = '7/6';
	}
	return answer;
}

function hardwayAnswer(answer, question){
	var number = '';
	if(question.call === 4 || question.call === 10){
		answer.flatMultiple = 7;
		if(question.call === 4){
			number = 'four';
		}else{
			number = 'ten';
		}
		answer.flatBetExplanation = 'Hard way bets on ' + number + ' pay 7 to 1. There are 8 combined ways to roll a ' + question.call + ' easy or a 7, and only 1 way to roll the ' + question.call + ' hard.';
	}else if(question.call === 6 || question.call === 8){
		answer.flatMultiple = 9;
		if(question.call === 6){
			number = 'six';
		}else{
			number = 'eight';
		}
		answer.flatBetExplanation = 'Hard way bets on ' + number + ' pay 9 to 1. There are 10 combined ways to roll a ' + question.call + ' easy or a 7, and only 1 way to roll the ' + question.call + ' hard.';
	}
	return answer;
}

function populateDomWithQuestion(question){
	var show = 'Call: ' + question.call;
	//IF BET IS DONTCOME, DONTPASS, ETC, LIST WHAT IS THE POINT
	show += '<br>' + question.comment1;
	if(question.comment2){
		show += '<br>' + question.comment2;
	}
	show += '<br>' + question.flatBetName + question.flatAmount;
	if(question.other){
		show += '<br>' + question.other;
	}
	if(question.otherAmount){
		show += question.otherAmount;
	}
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
	if(!userAnswer && userAnswer !== 0){
		userAnswer = 'nothing';
	}
	document.getElementById('exam-question').innerHTML += '<br><br><div class = "answer-div">You entered: $' + userAnswer + '</div>';
	//develop answer explanation
	var solution = 'ANSWER: $' + correctAnswer.answer;
	solution += '<br>' + correctAnswer.flatBetExplanation;
	if(correctAnswer.otherBetExplanation){
		solution += '<br>' + correctAnswer.otherBetExplanation;
	}
	solution += '<hr>Calculation:<br>' + correctAnswer.showMath;
	var bonus = {
		message: false,
		amount: 0
	};
	if(correctAnswer.answer === userAnswer){
		stats.streak ++;
		//analyze stats.streak value
		bonus = evaluateStreak(stats.streak, bonus);
		currentWin += bonus.amount;
		stats.bank += currentWin;
		//note the arrayElements function returns 0 if array length is 0, otherwise reqturns array.length-1
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
	if(bonus.message){
		document.getElementById('exam-question').innerHTML += '<br>' + bonus.message;
	}
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

function evaluateStreak(streak, bonus){
	//SPECIAL NOTE ABOUT STREAKS:
	//on a streak eligible question, if the user gets the question correct, but time runs out, as bonus points are awarded to the win, the
	//streak count will continue as in this case the currentWin was 0, but became >0 with the bonus points added.
	//this means a user has unlimited time to submit an answer on a streak eligible question.
	//ALTERNATIVE: once a streak occurs, beginning amount of winnings for each question increases
	if(streak === 5){
		stats.bonusCount ++;
		stats.bonusTotal += 200;
		bonus.message = 'Congratulations! Streak of 5 correct answers! You win 200 bonus points on this question.';
		bonus.amount = 200;
	}else if(streak === 10){
		stats.bonusCount ++;
		stats.bonusTotal += 700;
		bonus.message = 'Congratulations! Streak of 10 correct answers! You win 700 bonus points on this question.';
		bonus.amount = 700;
	}else if(streak === 20){
		stats.bonusCount ++;
		stats.bonusTotal += 1000;
		bonus.message = 'Congratulations! Streak of 20 correct answers! You win 1,000 bonus points on this question.';
		bonus.amount = 1000;
	}else if(streak === 30){
		stats.bonusCount ++;
		stats.bonusTotal += 2500;
		bonus.message = 'Congratulations! Streak of 30 correct answers! You win 2,500 bonus points on this question.';
		bonus.amount = 2500;
	}else if(streak === 50){
		stats.bonusCount ++;
		stats.bonusTotal += 50000;
		bonus.message = 'Congratulations! Streak of 50 correct answers! You win 50,000 bonus points on this question.';
		bonus.amount = 50000;
	}else if(streak === 75){
		stats.bonusCount ++;
		stats.bonusTotal += 1000000;
		bonus.message = 'You are a CRAPS MASTER DEALER. Here is your 1,000,000 point award for your extraordinary efforts and knowledge.';
		bonus.amount = 1000000;
	}else if(streak === 100){
		stats.bonusCount ++;
		stats.bonusTotal += 250000;
		bonus.message = 'You win 250,000 bonus points and your own title. Take a look. Enjoy!';
		bonus.amount = 250000;
		document.getElementById('stats-header').innerHTML = 'CRAPS MASTER<br>PERFORMANCE STATISTICS';
	}
	return bonus;
}

function updateRollStatus(roll){
	if(rollStatus.comeOut){
		if(roll === 7 || roll === 11){
			//console.log('front line winner');
		}else if (roll === 2 || roll === 3 || roll === 12){
			//console.log('front line loses');
		}else{
			rollStatus.point = roll;
			rollStatus.comeOut = false;
		}
	}else{
		if(roll === 7){
			rollStatus.comeOut = true;
		}else if(roll === rollStatus.point){
			rollStatus.comeOut = true;
		}
	}
	//this ensures rollStatus will always have a point number (so don't come and don't pass questions populate with odds)...
	var points = [4, 5, 6, 8, 9, 10];
	var point = points[Math.floor(Math.random()*points.length)];
	rollStatus.point = point;
	rollStatus.rollNumber ++;
	rollStatus.history.push(roll);
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
	// var difference = high-low;
	// //for an array with an even number of elements, this middleIndex will be the element just below the middle
	// var middleIndex = Math.floor((low + high)/2);
	// if(difference < 2){
	// 	if(newEntry <= array[low]){
	// 		array.splice(low, 0, newEntry);
	// 		return;
	// 	}else{
	// 		//use middleIndex here instead of high
	// 		//could also just use low + 1
	// 		array.splice(middleIndex + 1, 0, newEntry);
	// 		return;
	// 	}
	// }else if(newEntry === array[middleIndex]){
	// 	array.splice(middleIndex, 0, newEntry);
	// 	return;
	// }else if(newEntry > array[middleIndex]){
	// 	addToArrayAsc(array, newEntry, middleIndex, high);
	// }else{
	// 	addToArrayAsc(array, newEntry, low, middleIndex);
	// }
	//can also do this to sort an unsorted array:
	array.push(newEntry);
	array.sort(function(a, b){return a-b;});
}

function calculateMedian(array){
	if(array.length%2 !== 0){//odd number
		return array[Math.floor(array.length/2)];
	}else{
		return (array[Math.floor(array.length/2)]+array[Math.floor(array.length/2)-1])/2;
	}
}