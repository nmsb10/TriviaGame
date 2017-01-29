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
	//create new rollStatus object to track rolls
	//ie start with come out, then subsequent rolls status depends on prior roll/ whether there is a point, etc
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
	var generatedQ = developQuestion(diceRoll());
	console.log('generated question printed from generateQuestion function:');
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
	//function to generate question object
	var betQ = {
		call: roll,
		type1: '',
		type2: false,
		comment1: '',
		comment2: false,
		flatBetName: '',
		flatAmount: 0,
		other: false,
		otherAmount: 0,
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
			//if seven is rolled on a non comeout roll, then next roll will be a comeout roll
			if(!rollStatus.comeOut){
				rollStatus.comeOut = true;
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
			if(pick<1){
				betQ.type1 = 'hardwayhop';
				betQ.comment1 = rollResponses.two[Math.floor(Math.random()*rollResponses.two.length)];
				betQ.comment2 = '(hard way hop)';
				betQ.flatBetName = 'Two: $';
				betQ.flatAmount = betAmountsEasy.hardwayHop;
			}else if(pick<0.8){
				betQ.type1 = 'dontpass';
				betQ.comment2 = false;
				betQ.flatBetName = 'Don\'t pass: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
			}else if(pick < 0.4){
				betQ.type1 = 'dontcome';
				betQ.flatBetName = 'Don\'t come: $';
			}
			break;
		case 3:
			if(pick<1){
				betQ.type1 = 'easywayhop';
				betQ.comment1 = rollResponses.three[Math.floor(Math.random()*rollResponses.three.length)];
				betQ.comment2 = '(easy way hop)';
				betQ.flatBetName = 'Three: $';
				betQ.flatAmount = betAmountsEasy.easywayHop;
			}else if(pick<0.8){
				betQ.type1 = 'dontpass';
				betQ.comment2 = false;
				betQ.flatBetName = 'Don\'t pass: $';
				betQ.flatAmount = betAmountsEasy.passAndComeFlat;
			}else if(pick < 0.4){
				betQ.type1 = 'dontcome';
				betQ.flatBetName = 'Don\'t come: $';
			}
			break;
		case 12:
			betQ.type1 = 'hardwayhop';
			betQ.comment1 = rollResponses.twelve[Math.floor(Math.random()*rollResponses.twelve.length)];
			betQ.comment2 = '(hard way hop)';
			betQ.flatBetName = 'Twelve: $';
			betQ.flatAmount = betAmountsEasy.hardwayHop;
			break;
		case 4:
		case 5:
		case 6:
		case 8:
		case 9:
		case 10:
			if(rollStatus.comeOut){
				rollStatus.point = roll;
				rollStatus.comeOut = false;
			}
			if(roll === rollStatus.point){
				rollStatus.comeOut = true;
			}
			break;
		default:
			console.log('unknown roll in generateQA');
			break;
	}


// var betQ = {
// 		call: roll,
// 		type1: '',
// 		type2: false,
// 		comment1: '',
// 		comment2: false,
// 		flatBetName: '',
// 		flatAmount: 0,
// 		other: false,
// 		otherAmount: 0,
// 		end:''
// 	};


	betQ.end = 'Winnings paid = ?';
	rollStatus.rollNumber ++;
	rollStatus.history.push(roll);
	console.log('bet question object from developQuestion function:');
	console.log(betQ);
	console.log(rollStatus);
	return betQ;



	
	// switch(roll){
	// 	case 2:
	// 		if(pick<0.4){
	// 			betQ.type = 'don\'t pass';
	// 			betQ.comment = 'Take the line.';
	// 			betQ.comment2 = 'Pay the don\'ts.';
	// 			betQ.flatBetName = 'Don\'t pass: $';
	// 			//this particular bet will be a multiple of 5 between 5 and 25
	// 			betQ.flatAmount = parseInt(Math.floor((Math.random()*5) + 1) * 5);
	// 			betQ.other = '';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else if(pick<0.8){
	// 			//dont come flat
	// 			betQ.type = 'don\'t come';
	// 			betQ.comment = '2 craps 2.';
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'Don\'t come: $';
	// 			//this particular bet will be a multiple of 5 between 5 and 25
	// 			betQ.flatAmount = parseInt(Math.floor((Math.random()*5) + 1) * 5);
	// 			betQ.other = '';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else if(pick<1){
	// 			betQ.type = 'hard way hop';
	// 			betQ.comment = 'Aces. 2 craps 2. ';
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'Aces: $';
	// 			betQ.flatAmount = betAmountsEasy.hardwayHop;
	// 			betQ.other = '';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}
	// 		break;
	// 	case 3:
	// 		if(pick<0.45){
	// 			betQ.type = 'don\'t pass';
	// 			betQ.comment = 'Take the line.';
	// 			betQ.comment2 = 'Pay the don\'ts.';
	// 			betQ.flatBetName = 'Don\'t pass: $';
	// 			//this particular bet will be a multiple of 5 between 5 and 25
	// 			betQ.flatAmount = parseInt(Math.floor((Math.random()*5) + 1) * 5);
	// 			betQ.other = '';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else if(pick<0.9){
	// 			//dont come flat
	// 			betQ.type = 'don\'t come';
	// 			betQ.comment = '3 craps 3.';
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'Don\'t come: $';
	// 			//this particular bet will be a multiple of 5 between 5 and 25
	// 			betQ.flatAmount = parseInt(Math.floor((Math.random()*5) + 1) * 5);
	// 			betQ.other = '';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else if(pick<1){
	// 			betQ.type = 'easy way hop';
	// 			betQ.comment = '3. Ace - deuce.';
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'Ace-deuce: $';
	// 			betQ.flatAmount = betAmountsEasy.easywayHop;
	// 			betQ.other = '';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}
	// 		break;
	// 	case 4:
	// 		if(pick<0.25){
	// 			betQ.type = 'passline';
	// 			betQ.comment = 'Front line winner.';
	// 			betQ.comment2 = 'The point is ' + betQ.call + '.';
	// 			betQ.flatBetName = 'Pass line: $';
	// 			betQ.flatAmount = betAmountsEasy.passAndComeFlat;
	// 			betQ.other = 'Pass line odds: $';
	// 			betQ.otherAmount = betAmountsEasy.passAndComeOdds;
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else if(pick <0.45){
	// 			betQ.type = 'come bet';
	// 			betQ.comment = rollResponses.four[Math.floor(Math.random()*rollResponses.four.length)];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'Come bet on the four: $';
	// 			betQ.flatAmount = betAmountsEasy.passAndComeFlat;
	// 			betQ.other = 'Odds on the four: $';
	// 			betQ.otherAmount = betAmountsEasy.passAndComeOdds;
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else if(pick <0.7){
	// 			//buy bet
	// 			betQ.type = 'buy bet';
	// 			betQ.comment = rollResponses.four[Math.floor(Math.random()*rollResponses.four.length)];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'Buy the four: $';
	// 			betQ.flatAmount = betAmountsEasy.buyFourAndTen;
	// 			betQ.other = 'Same bet!';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else if(pick <0.75){
	// 			//place bet
	// 			betQ.type = 'place bet';
	// 			betQ.comment = rollResponses.four[Math.floor(Math.random()*rollResponses.four.length)];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'Place four: $';
	// 			betQ.flatAmount = betAmountsEasy.placeFourAndTen;
	// 			betQ.other = 'Same bet.';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else if(pick <0.85){
	// 			betQ.type = 'hard way bet';
	// 			betQ.comment = rollResponses.four[0];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'four hard: $';
	// 			betQ.flatAmount = betAmountsEasy.hardway;
	// 			betQ.other = '';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
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
	// 		break;
	// 	case 5:
	// 		if(pick<0.25){
	// 			betQ.type = 'passline';
	// 			betQ.comment = 'Front line winner.';
	// 			betQ.comment2 = 'The point is ' + betQ.call + '.';
	// 			betQ.flatBetName = 'Pass line: $';
	// 			betQ.flatAmount = betAmountsEasy.passAndComeFlat;
	// 			betQ.other = 'Pass line odds: $';
	// 			betQ.otherAmount = betAmountsEasy.passAndComeOdds59;
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else if(pick <0.5){
	// 			betQ.type = 'come bet';
	// 			betQ.comment = rollResponses.five[Math.floor(Math.random()*rollResponses.five.length)];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'Come bet on the five: $';
	// 			betQ.flatAmount = betAmountsEasy.passAndComeFlat;
	// 			betQ.other = 'Odds on the five: $';
	// 			betQ.otherAmount = betAmountsEasy.passAndComeOdds59;
	// 			betQ.end = 'Winnings paid = ?';
	// 		// }else if(pick <0.55){
	// 		// 	//buy bet
	// 		// 	betQ.type = 'buy bet';
	// 		// 	betQ.comment = rollResponses.five[Math.floor(Math.random()*rollResponses.five.length)];
	// 		// 	betQ.comment2 = '';
	// 		// 	betQ.flatBetName = 'Buy the five: $';
	// 		// 	betQ.flatAmount = betAmountsEasy.buyFiveAndNine;
	// 		// 	betQ.other = 'Same bet!';
	// 		// 	betQ.otherAmount = '';
	// 		// 	betQ.end = 'Winnings paid = ?';
	// 		}else if(pick <0.9){
	// 			//place bet
	// 			betQ.type = 'place bet';
	// 			betQ.comment = rollResponses.five[Math.floor(Math.random()*rollResponses.five.length)];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'Place five: $';
	// 			betQ.flatAmount = betAmountsEasy.placeFiveAndNine;
	// 			betQ.other = 'Same bet.';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else{
	// 			betQ.type = 'easy way hop';
	// 			//only select one of the 2 last possible responses from the rollResponses.four array
	// 			betQ.comment = rollResponses.five[Math.floor(Math.random()*rollResponses.five.length)];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'HOPPING five: $';
	// 			betQ.flatAmount = betAmountsEasy.easywayHop;
	// 			betQ.other = 'Five easy.';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}
	// 		break;
	// 	case 6:
	// 		if(pick<0.25){
	// 			betQ.type = 'passline';
	// 			betQ.comment = 'Front line winner.';
	// 			betQ.comment2 = 'The point is ' + betQ.call + '.';
	// 			betQ.flatBetName = 'Pass line: $';
	// 			betQ.flatAmount = betAmountsEasy.passAndComeFlat;
	// 			betQ.other = 'Pass line odds: $';
	// 			betQ.otherAmount = betAmountsEasy.passAndComeOdds;
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else if(pick <0.4){
	// 			betQ.type = 'come bet';
	// 			betQ.comment = rollResponses.six[Math.floor(Math.random()*rollResponses.six.length)];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'Come bet on the six: $';
	// 			betQ.flatAmount = betAmountsEasy.passAndComeFlat;
	// 			betQ.other = 'Odds on the six: $';
	// 			betQ.otherAmount = betAmountsEasy.passAndComeOdds;
	// 			betQ.end = 'Winnings paid = ?';
	// 		// }else if(pick <0.45){
	// 		// 	//buy bet
	// 		// 	betQ.type = 'buy bet';
	// 		// 	betQ.comment = rollResponses.six[Math.floor(Math.random()*rollResponses.six.length)];
	// 		// 	betQ.comment2 = '';
	// 		// 	betQ.flatBetName = 'Buy the six: $';
	// 		// 	//this particular bet will be a multiple of 25 between 25 and 100
	// 		// 	betQ.flatAmount = parseInt(Math.floor((Math.random()*4) + 1) * 25);
	// 		// 	betQ.other = 'Same bet!';
	// 		// 	betQ.otherAmount = '';
	// 		// 	betQ.end = 'Winnings paid = ?';
	// 		}else if(pick <0.8){
	// 			//place bet
	// 			betQ.type = 'place bet';
	// 			betQ.comment = rollResponses.six[Math.floor(Math.random()*rollResponses.six.length)];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'Place six: $';
	// 			betQ.flatAmount = betAmountsEasy.placeSixAndEight;
	// 			betQ.other = 'Same bet.';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else if(pick <0.9){
	// 			betQ.type = 'hard way bet';
	// 			betQ.comment = rollResponses.six[0];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'six hard: $';
	// 			betQ.flatAmount = betAmountsEasy.hardway;
	// 			betQ.other = '';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else if(pick<0.95){
	// 			betQ.type = 'hard way hop';
	// 			betQ.comment = rollResponses.six[0];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'HOPPING hard six: $';
	// 			betQ.flatAmount = betAmountsEasy.hardwayHop;
	// 			betQ.other = '';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else{
	// 			betQ.type = 'easy way hop';
	// 			//only select any possible responses from the rollResponses.six array EXCEPT for the first response
	// 			betQ.comment = rollResponses.six[Math.floor(Math.random()*(rollResponses.six.length-1))+1];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'HOPPING easy six: $';
	// 			betQ.flatAmount = betAmountsEasy.easywayHop;
	// 			betQ.other = '';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}
	// 		break;
	// 	case 8:
	// 		if(pick<0.25){
	// 			betQ.type = 'passline';
	// 			betQ.comment = 'Front line winner.';
	// 			betQ.comment2 = 'The point is ' + betQ.call + '.';
	// 			betQ.flatBetName = 'Pass line: $';
	// 			betQ.flatAmount = betAmountsEasy.passAndComeFlat;
	// 			betQ.other = 'Pass line odds: $';
	// 			betQ.otherAmount = betAmountsEasy.passAndComeOdds;
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else if(pick <0.4){
	// 			betQ.type = 'come bet';
	// 			betQ.comment = rollResponses.eight[Math.floor(Math.random()*rollResponses.eight.length)];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'Come bet on the eight: $';
	// 			betQ.flatAmount = betAmountsEasy.passAndComeFlat;
	// 			betQ.other = 'Odds on the eight: $';
	// 			betQ.otherAmount = betAmountsEasy.passAndComeOdds;
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else if(pick <0.8){
	// 			//place bet
	// 			betQ.type = 'place bet';
	// 			betQ.comment = rollResponses.eight[Math.floor(Math.random()*rollResponses.eight.length)];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'Place eight: $';
	// 			betQ.flatAmount = betAmountsEasy.placeSixAndEight;
	// 			betQ.other = 'Same bet.';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else if(pick <0.9){
	// 			betQ.type = 'hard way bet';
	// 			betQ.comment = rollResponses.eight[0];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'eight hard: $';
	// 			betQ.flatAmount = betAmountsEasy.hardway;
	// 			betQ.other = '';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else if(pick<0.95){
	// 			betQ.type = 'hard way hop';
	// 			betQ.comment = rollResponses.eight[0];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'HOPPING hard eight: $';
	// 			betQ.flatAmount = betAmountsEasy.hardwayHop;
	// 			betQ.other = '';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else{
	// 			betQ.type = 'easy way hop';
	// 			//only select any possible responses from the rollResponses.eight array EXCEPT for the first response
	// 			betQ.comment = rollResponses.eight[Math.floor(Math.random()*(rollResponses.eight.length-1))+1];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'HOPPING easy eight: $';
	// 			betQ.flatAmount = betAmountsEasy.easywayHop;
	// 			betQ.other = '';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}
	// 		break;
	// 	case 9:
	// 		if(pick<0.25){
	// 			betQ.type = 'passline';
	// 			betQ.comment = 'Front line winner.';
	// 			betQ.comment2 = 'The point is ' + betQ.call + '.';
	// 			betQ.flatBetName = 'Pass line: $';
	// 			betQ.flatAmount = betAmountsEasy.passAndComeFlat;
	// 			betQ.other = 'Pass line odds: $';
	// 			betQ.otherAmount = betAmountsEasy.passAndComeOdds59;
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else if(pick <0.5){
	// 			betQ.type = 'come bet';
	// 			betQ.comment = rollResponses.nine[Math.floor(Math.random()*rollResponses.nine.length)];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'Come bet on the nine: $';
	// 			betQ.flatAmount = betAmountsEasy.passAndComeFlat;
	// 			betQ.other = 'Odds on the nine: $';
	// 			betQ.otherAmount = betAmountsEasy.passAndComeOdds59;
	// 			betQ.end = 'Winnings paid = ?';
	// 		// }else if(pick <0.55){
	// 		// 	//buy bet
	// 		// 	betQ.type = 'buy bet';
	// 		// 	betQ.comment = rollResponses.nine[Math.floor(Math.random()*rollResponses.nine.length)];
	// 		// 	betQ.comment2 = '';
	// 		// 	betQ.flatBetName = 'Buy the nine: $';
	// 		// 	betQ.flatAmount = betAmountsEasy.buyFiveAndNine;
	// 		// 	betQ.other = 'Same bet!';
	// 		// 	betQ.otherAmount = '';
	// 		// 	betQ.end = 'Winnings paid = ?';
	// 		}else if(pick <0.9){
	// 			//place bet
	// 			betQ.type = 'place bet';
	// 			betQ.comment = rollResponses.nine[Math.floor(Math.random()*rollResponses.nine.length)];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'Place nine: $';
	// 			betQ.flatAmount = betAmountsEasy.placeFiveAndNine;
	// 			betQ.other = 'Same bet.';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else{
	// 			betQ.type = 'easy way hop';
	// 			betQ.comment = rollResponses.nine[Math.floor(Math.random()*rollResponses.nine.length)];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'HOPPING nine: $';
	// 			betQ.flatAmount = betAmountsEasy.easywayHop;
	// 			betQ.other = 'Nine easy.';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}
	// 		break;
	// 	case 10:
	// 		if(pick<0.25){
	// 			betQ.type = 'passline';
	// 			betQ.comment = 'Front line winner.';
	// 			betQ.comment2 = 'The point is ' + betQ.call + '.';
	// 			betQ.flatBetName = 'Pass line: $';
	// 			betQ.flatAmount = betAmountsEasy.passAndComeFlat;
	// 			betQ.other = 'Pass line odds: $';
	// 			betQ.otherAmount = betAmountsEasy.passAndComeOdds;
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else if(pick <0.45){
	// 			betQ.type = 'come bet';
	// 			betQ.comment = rollResponses.ten[Math.floor(Math.random()*rollResponses.ten.length)];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'Come bet on the ten: $';
	// 			betQ.flatAmount = betAmountsEasy.passAndComeFlat;
	// 			betQ.other = 'Odds on the ten: $';
	// 			betQ.otherAmount = betAmountsEasy.passAndComeOdds;
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else if(pick <0.7){
	// 			//buy bet
	// 			betQ.type = 'buy bet';
	// 			betQ.comment = rollResponses.ten[Math.floor(Math.random()*rollResponses.ten.length)];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'Buy the ten: $';
	// 			betQ.flatAmount = betAmountsEasy.buyFourAndTen;
	// 			betQ.other = 'Same bet!';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else if(pick <0.75){
	// 			//place bet
	// 			betQ.type = 'place bet';
	// 			betQ.comment = rollResponses.ten[Math.floor(Math.random()*rollResponses.ten.length)];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'Place ten: $';
	// 			betQ.flatAmount = betAmountsEasy.placeFourAndTen;
	// 			betQ.other = 'Same bet.';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else if(pick <0.85){
	// 			betQ.type = 'hard way bet';
	// 			betQ.comment = rollResponses.ten[0];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'ten hard: $';
	// 			betQ.flatAmount = betAmountsEasy.hardway;
	// 			betQ.other = '';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else if(pick<0.95){
	// 			betQ.type = 'hard way hop';
	// 			betQ.comment = rollResponses.ten[0];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'HOPPING hard ten: $';
	// 			betQ.flatAmount = betAmountsEasy.hardwayHop;
	// 			betQ.other = '';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else{
	// 			betQ.type = 'easy way hop';
	// 			//only select one of the 2 last possible responses from the rollResponses.ten array
	// 			betQ.comment = rollResponses.ten[Math.floor(Math.random()*(rollResponses.ten.length-1))+1];
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'HOPPING easy ten: $';
	// 			betQ.flatAmount = betAmountsEasy.easywayHop;
	// 			betQ.other = '';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}
	// 		break;
	// 	case 11:
	// 		if(pick<0.4){
	// 			betQ.type = 'passline';
	// 			betQ.comment = 'Eleven. Front line winner.';
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'Pass line: $';
	// 			betQ.flatAmount = betAmountsEasy.passAndComeFlat;
	// 			betQ.other = '';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else if(pick<0.8){
	// 			betQ.type = 'come bet';
	// 			betQ.comment = '11. Yo-leven.';
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'Come bet: $';
	// 			betQ.flatAmount = betAmountsEasy.passAndComeFlat;
	// 			betQ.other = '';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}else if(pick<1){
	// 			betQ.type = 'easy way hop';
	// 			betQ.comment = 'Yo-leven.';
	// 			betQ.comment2 = '';
	// 			betQ.flatBetName = 'Eleven: $';
	// 			betQ.flatAmount = betAmountsEasy.easywayHop;
	// 			betQ.other = '';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}
	// 		break;
	// 	case 12:
	// 		if(pick<1){
	// 			betQ.type = 'don\'t pass';
	// 			betQ.comment = 'Take the line.';
	// 			betQ.comment2 = '12 craps 12';
	// 			betQ.flatBetName = 'Don\'t pass: $';
	// 			//this particular bet will be a multiple of 5 between 5 and 25
	// 			betQ.flatAmount = parseInt(Math.floor((Math.random()*5) + 1) * 5);
	// 			betQ.other = '';
	// 			betQ.otherAmount = '';
	// 			betQ.end = 'Winnings paid = ?';
	// 		}
	// 		break;
	// 	case 7:
	// 		if(pick<1){
	// 			betQ.type = 'don\'t pass';
	// 			betQ.comment = rollResponses.seven[Math.floor(Math.random()*rollResponses.seven.length)];
	// 			betQ.comment2 = 'Pay the don\'ts.';
	// 			//10 combined ways to roll 6 or 8, 8 combined ways to roll 5 or 9, 6 combined ways to roll 4 or 10; 24 total combinations
	// 			betQ.point = 8;//must change this so point number changes with same frequency as numbers would actually be made
	// 			betQ.flatBetName = 'Don\'t come: $';
	// 			//this particular bet will be a multiple of 5 between 5 and 25
	// 			betQ.flatAmount = parseInt(Math.floor((Math.random()*5) + 1) * 5);
	// 			betQ.other = 'don\'t come laying the odds: $';
	// 			betQ.otherAmount = '';//laying the odds amount depends on the point so here, "easy" amounts will be laid against the point
	// 			betQ.end = 'Winnings paid = ?';
	// 		}
	// 		break;
	// 	default:
	// 		console.log('unknown roll in generateQA');
	// 		break;
	// }
}

function developAnswer(question){
	//remember: here the input question = betQ object from developQuestion
	//analyze the bet to calculate the solution and explanation
	//return an answer object
	var betA = {
		flatBetExplanation: '',
		otherBetExplanation: false,
		odds: false,//'Odds taken on ' + 'Odds layed on ',
		oddsString: '',
		flatMultiple:0,
		oddsMultiple:0,
		answer:0,
		showMath:''
	};

	// var betQ = {
// 		call: roll,
// 		type1: '',
// 		type2: false,
// 		comment1: '',
// 		comment2: false,
// 		flatBetName: '',
// 		flatAmount: 0,
// 		other: false,
// 		otherAmount: 0,
// 		end:''
// 	};

	switch(question.type1){
		case 'passline':
			betA.flatBetExplanation = 'Pass line bets pay even money.';
			betA.flatMultiple = 1;
			break;
		case 'comebet':
			betA.flatBetExplanation = 'Come bets pay even money.';
			betA.flatMultiple = 1;
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
		default:
			console.log('unknown question type1 as analyzed in developAnswer function');
			break;
	}
	betA.answer = question.flatAmount * betA.flatMultiple + question.otherAmount * betA.oddsMultiple;
	betA.showMath = question.flatBetName + question.flatAmount + ' * ' + betA.flatMultiple + ' = $' + question.flatAmount * betA.flatMultiple;
	if(betA.odds){
		betA.showMath += '<br>' + betA.odds + rollStatus.point + ': $' + question.otherAmount + ' * ' + betA.oddsString + ' = $' + question.otherAmount * betA.oddsMultiple;
	}
	betA.showMath += '<br>TOTAL = $' + betA.answer;
	var answer = {
		answer: 55,//have numerical answer total amount here
		flatBetExplanation: 'The pass line bet pays even money.',
		otherBetExplanation: 'Odds on 8 pay the fair 6 to 5 because there are six ways to roll a 7 and five ways to roll the 8.',
		showMath:'pass line of $10: 1 to 1 = $10<br>Odds taken on 8 of $20: (6/5) * $20 = $24<br>TOTAL = $34'
	};
	return betA;
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
		show += '<br>' + question.other + question.otherAmount;
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