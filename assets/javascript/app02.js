//REMEMBER: CODE EVERYTHING ONLY ONCE
//Do not Repeat Yourself = DRY
document.addEventListener("DOMContentLoaded", function(event) {
	//http://stackoverflow.com/questions/799981/document-ready-equivalent-without-jquery
	showDate();
	displayPlayerBalance(playerBets);
	updateRollButton();
	enterRequest();
	roll();
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
	document.getElementById('beet').innerHTML = updatedFooter;
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

var rollStatus = {
	comeOut: true,
	point:0,
	rollNumber:0
};

function Bet(type, amount, number){
	this.type = type;
	this.amount = amount;
	this.number = number;
}

function MultiwordBet(){
	this.bet = false;
	this.pass = false;
	this.passline = false;
	this.line = false;
	this.do = false;
	this.not = false;
	this.dont = false;
	this.place = false;
	this.odds = false;
	this.lay = false;
	this.come = false;
}

var playerBets = {
	balance: 5057700,
	passline: [],
	donotpassline: [],
	come:[],
	dontcome:[],
};

function updateRollButton(){
	if(rollStatus.comeOut){
		document.getElementById('roll-description').innerText = 'come out';
		document.getElementById('point-number').innerText = 'no point';
	}else{
		document.getElementById('roll-description').innerText = 'point is';
		document.getElementById('point-number').innerText = rollStatus.point;
	}
}

function enterRequest(){
	document.getElementById('add-bet-button').addEventListener('click', function(event){
		var bet = document.getElementById('input-bet').value;
		document.getElementById('input-bet').value = '';
		//evaluate the request
		var requestArray = bet.split(' ');
		var numbersArray = [];
		var stringsArray = [];
		//separate the request into an array of strings, and a separate array of numbers
		for(var i = 0; i<requestArray.length; i++){
			//parseFloat?
			if(parseInt(requestArray[i])){
				numbersArray.push(requestArray[i]);
			}else{
				stringsArray.push(requestArray[i]);
			}
		}
		var currentBet = new Bet();
		if(stringsArray.length === 1){
			switch(stringsArray[0]){
				case 'pass':
				case 'passline':
				case 'pl':
					currentBet.type = 'passline';
					break;
				case 'don\'tpass':
				case 'dontpass':
				case 'dp':
					currentBet.type = 'donotpassline';
					break;
				case 'place':
					currentBet.type = 'place';
					break;
				case 'odds'://note if user only specifies odds, it is assumed this is for a pass line bet, and not laying odds or placing odds on a come bet
				case 'placeodds':
					currentBet.type = 'placeodds';
					break;
				case 'lo':
				case 'layodds':
					currentBet.type = 'layodds';
					break;
				case 'come':
				case 'comebet':
					currentBet.type = 'come';
					break;
				case 'dc':
				case 'dontcome':
					currentBet.type = 'dontcome';
					break;
				default:
					console.log('unknown bet TYPE');
					break;
			}
		}else if (stringsArray.length > 1){
			//you must have a multiword bet if the strings array length is > 1
			var mwbet = new MultiwordBet();
			//check if any of the words is a part of the possible multi-word bet words from the options in the MultiwordBet constructor
			for(var j = 0; j < stringsArray.length; j++){
				switch(stringsArray[j]){
					case 'bet':
						mwbet.bet = true;
						break;
					case 'pass':
						mwbet.pass = true;
						break;
					case 'passline':
						mwbet.passline = true;
						break;
					case 'line':
						mwbet.line = true;
						break;
					case 'do':
						mwbet.do = true;
						break;
					case 'not':
						mwbet.not = true;
						break;
					case 'dont':
					case 'don\'t':
						mwbet.dont = true;
						break;
					case 'place':
						mwbet.place = true;
						break;
					case 'odds':
						mwbet.odds = true;
						break;
					case 'lay':
						mwbet.lay = true;
						break;
					case 'come':
						mwbet.come = true;
						break;
					default:
						console.log('unknown WORD used in bet request: '+ stringsArray[j]);
						break;
				}
			}
			console.log(mwbet);
			//evaluate mwbet to properly assign currentBet.type
			//should I have a return after each else if statement?
			for(var key in mwbet){
				console.log('searching mwbet now!!!');
				if((mwbet.do && mwbet.not && mwbet.pass) || (mwbet.dont && mwbet.pass) || (mwbet.dont && mwbet.pass && mwbet.bet) || (mwbet.do && mwbet.not && mwbet.passline) || (mwbet.do && mwbet.not && mwbet.passline && mwbet.bet)){
					currentBet.type = 'donotpassline';
				}else if((mwbet.pass && mwbet.line) || (mwbet.passline && mwbet.bet) || (mwbet.pass && mwbet.line && mwbet.bet)){
					//MUST check for a "plain" pass line bet AFTER don't pass
					currentBet.type = 'passline';
				}else if(mwbet.place && mwbet.odds){
					currentBet.type = 'placeodds';
				}else if(mwbet.lay && mwbet.odds){
					currentBet.type = 'layodds';
				}else if((mwbet.dont && mwbet.come) || (mwbet.dont && mwbet.come && mwbet.bet) || (mwbet.do && mwbet.not && mwbet.come) || (mwbet.do && mwbet.not && mwbet.come && mwbet.bet)){
					currentBet.type = 'dontcome';
				}else if(mwbet.come && mwbet.bet){//MUST check for a "plain" come bet AFTER don't come
					currentBet.type = 'come';
				}else if(mwbet.place && mwbet.bet){
					currentBet.type = 'place';
				}
			}
		}
		//evaluate for the number and bet amount
		if(numbersArray.length === 1){
			currentBet.amount = numbersArray[0];
		}else{
			currentBet.amount = numbersArray[1];
			currentBet.number = numbersArray[0];
		}
		//evaluate the constructor using the submitBet function
		//submitBet(currentBet.type, currentBet.amount, currentBet.number);
		submitBet(currentBet);
		document.getElementById('input-bet').value = '';
		//return false;
		event.preventDefault();
	});
}

function roll(){
	document.getElementById('roll-button').addEventListener('click', function(event){
		rollStatus.rollNumber ++;
		var dice = {
			one: Math.floor(Math.random()*6)+1,
			two: Math.floor(Math.random()*6)+1
		};
		var twoDiceDisplay = "<div class='two-dice'><div class='dice-result'>" + dice.one + "</div><div class='dice-result'>" + dice.two + "</div></div>";
		document.getElementById('roll-results').innerHTML += twoDiceDisplay;
		resolveBets(dice.one, dice.two);
		updateRollStatus(dice.one, dice.two);
		updateRollButton();
		// event.preventDefault();
	});
}

function resolveBets(one, two){

}

function updateRollStatus(dieOne, dieTwo){
	var rollTotal = dieOne + dieTwo;
	if(rollStatus.comeOut){
		if(rollTotal === 7 || rollTotal === 11){
			console.log('front line winner');
		}else if (rollTotal === 2 || rollTotal === 3 || rollTotal === 12){
			console.log('front line loses');
		}else{
			console.log('point is ' + rollTotal);
			rollStatus.point = rollTotal;
			rollStatus.comeOut = false;
		}
	}else{
		if(rollTotal===7){
			console.log('pass line loses.');
			rollStatus.comeOut = true;
		}else if(rollTotal === rollStatus.point){
			console.log('pass line wins.');
			rollStatus.comeOut = true;
		}
	}
}

function submitBet(bet){
	//turn bet.amount into a string
	var betAmount = '$' + Math.floor(bet.amount);
	console.log(bet.type);
	switch(bet.type){
		case 'passline':
			console.log('passline bet');
			var betDisplay = "<div class = 'lacinato'><div class = 'lacinato-header' id = 'passline-bet'>pass line (1 to 1)</div><div class = 'lacinato-content'>"+
				"pass line bet: " + betAmount + "</div></div>";
			document.getElementById('bet-summary-primary').innerHTML += betDisplay;
			break;
		case 'donotpassline':
			console.log('don\'t pass bet');
			break;
		case 'placeodds':
			console.log('place odds bet');
			break;
		case 'layodds':
			console.log('lay odds bet');
			break;
		case 'come':
			console.log('come bet');
			break;
		case 'dontcome':
			console.log('don\'t come bet');
			break;
		case 'place':
			console.log('place bet');
			break;
		default:
			console.log('unknown bet type');
			break;
	}
}
function displayPlayerBalance(player){
	//add commas to the balance number
	//http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
	var balance = '$' + player.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	document.getElementById('player-balance').innerText = balance;
}


//answer for keeping the chat thing scrolled to bottom unless user scrolls otherwise
	//http://stackoverflow.com/questions/18614301/keep-overflow-div-scrolled-to-bottom-unless-user-scrolls-up

//document.getElementsByClassName("example");
//.value, .innerHTML
//document.queryselector??
//use a switch statement??
//functions that return values??
//indexOf (returns -1 if not in there)

//add class to an element:
// var d = document.getElementById("div1");
// d.className += " otherclass"; NB the space before the otherclass name



// arrayName.indexOf("elementInTheArray") = returns the
// index number of that element

		// function vowelChecker(x){
		// 	var wordSplit = x.split("");
		// 	var firstLetter = wordSplit[0];
		// 	if(firstLetter.toLowerCase() ==="a" || firstLetter.toLowerCase() ==="e" || firstLetter.toLowerCase()==="i" || firstLetter.toLowerCase() ==="o" || firstLetter.toLowerCase()==="u"){
		// 		console.log("the first letter in " + x + " is a vowel.")
		// 	}
		// 	else{
		// 		console.log("the first letter in " + x + " is NOT a vowel.")				
		// 	}
		// }
		//firstCharacter = x.toLowerCase().charAt(0);

//http://www.w3schools.com/howto/howto_css_modals.asp
//http://www.w3schools.com/jsref/dom_obj_document.asp
//http://www.w3schools.com/jsref/jsref_statements.asp
//http://www.w3schools.com/jsref/dom_obj_event.asp

//https://rush.uber.com/enterprise*/
//https://www.chase.com/*/

//new app: enter numbers, display numbers entered, then press button
//to calculate mean and median
//(or generate eg 10 or 11 random numbers, then press button to calculate)
//FOR THE FUTURE:
//2. display record end balance in a table: "Top Producers" (aka luckiest players): user name | end balance | time spent playing (seconds)
//3. in firebase, ref('users').child(playerName): log time spent, end balance, start price, end price, etc
//on disconnect: ref('formerPlayers').set(playerName).child with player name, time spent, end balance, start price, priceend, total transactions, etc, then remove playerName from 'users'
//7. on bottom, have "your History" table of transactions (set height, with overflow scroll bar). newer entries are on top, older entries on bottom.
//transaction number, basis, number shares purchased, total cost, number shared sold, sold amount, ending unit balance
//8. use canva.com to create your own images???