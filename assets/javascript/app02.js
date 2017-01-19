//REMEMBER: CODE EVERYTHING ONLY ONCE
//Do not Repeat Yourself = DRY
document.addEventListener("DOMContentLoaded", function(event) {
	//http://stackoverflow.com/questions/799981/document-ready-equivalent-without-jquery
	showDate();
	// enterRequest();
	begin();
	//activateRoll();
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
	rollNumber:0,
	comeOut: true,
	point:0,
	streak:0,
	history:[]
};

//resolve bets based on tableBets.
var tableBets = {
	passline: [],//include odds as one of the object elements
	dontpass: [],//[{player: playerName, type: 'dontpass', flatbet: betamount, layOdds:0, active:true, number:null, rollnumber: rollnumber},{player: playerTwoName, flatBet:0, layOdds:0, active: true} ]
	come: [],
	dontcome: [],
	place: {
		4:[],
		5:[],
		6:[],
		8:[],
		9:[],
		10:[]
	}
};

function begin(){
	console.log('come out roll!!!!! Let\'s play.');
	updateRollButton();
	var extraPlayers = 	generateAdditionalPlayers(2);
	// extraPlayers.map(displaybalance);
	// function displaybalance(item, index){
	// 	return console.log(item.balance);
	// }
	displayExtraPlayers(extraPlayers);
	acceptBets(extraPlayers);
	activateRoll(extraPlayers);
}

function generateAdditionalPlayers(newPlayers){
	var more = [];
	for(var i = 0; i < newPlayers; i++){
		var player = new Player();
		//because the human player will be named player1
		player.name = 'player' + (i+2);
		player.balance = Math.floor(Math.random()*100)*5+2000;
		console.log(player.name + " balance = " + player.balance);
		player.currentBets = new PlayerBets();
		player.bettingProfile = new BettingProfile();
		more.push(player);
	}
	return more;
}

//store all bets, balance, betting patterns and preferences by an individual player
var Player = function(){
	this.name = name;
	this.balance = 0;
	this.currentBets = {};//equal to PlayerBets
	this.bettingProfile = {};//equal to Betting Profile
};

//stores all bets (and active or off status) made by all players
var PlayerBets = function(){
	this.passline = [];
	this.dontpass = [];//{flatBet:0, layOdds:0, active:true, rollNumber: 1}
	this.come = [];
	this.dontcome = [];
	this.place = {
		4:[],
		5:[],
		6:[],
		8:[],
		9:[],
		10:[]
	};
};

var BettingProfile = function(){
	this.makePassLineBet = true;
	this.makePassLineOdds = true;
	this.makeDontPassBet = false;
	this.makeDPOdds = false;
	this.makeComeBet = true;
	this.makeComeBetOdds = true;
	this.makePlaceBets = false;
	this.place4 = false;
	this.place5 = false;
	this.place6 = false;
	this.place8 = false;
	this.place9 = false;
	this.place10 = false;
};

function displayExtraPlayers(players){
	for(var i = 0; i < players.length; i++){
		var stuff = '<div class = "bet-summary" id="bet-summary-'+ players[i].name + '"><div class = "player-heading"><div class = "player-name">'+ players[i].name + ':</div><div class = '+
		'"player-balance" id = "balance-' + players[i].name + '">$' + players[i].balance + '</div></div><div class = "lacinato"><div class = '+
		'"lacinato-header">don\'t pass b12 (1 to 1)</div><div class = "lacinato-content">good job on this important task completion</div></div>';
		document.getElementById('player-bets').innerHTML += stuff;
	}
}

function acceptBets(players){
	if(rollStatus.comeOut){
		for(var i = 0; i < players.length; i++){
			if(players[i].bettingProfile.makePassLineBet){
				//this particular bet will be a multiple of 5 between 5 and 25
				//also, for all future bets, ensure the bet is ONLY AN INTEGER!!
				var betAmount = parseInt(Math.floor((Math.random()*5) + 1) * 5);
				console.log(players[i].name + ' balance: ' + players[i].balance);
				if(checkFunds(players[i].balance, betAmount)){
					//remove funds from player balance
					players[i].balance -= betAmount;
					//update player's balance displayed on DOM
					console.log(players[i].name + ' passline bet of: ' + betAmount + ' and current balance: ' + players[i].balance);

					updateBalance(players[i].name, players[i].balance);
					var bet = new IndividualBet(betAmount, 0, true, rollStatus.rollNumber);
					var publicBet = new Bet(players[i].name, 'passline', betAmount, 0, true, null, rollStatus.rollnumber);
					//add bet to this players' bet
					players[i].currentBets.passline.push(bet);
					//add bet to table bets
					tableBets.passline.push(publicBet);
					//display bet on DOM
					displayBet(players[i].name, 'passline', betAmount);
				}
			}
		}
	}else{
		return;
	}

}

function checkFunds(balance, bet){
	return balance > bet ? true: console.log('insufficient funds for that bet amount');
}

function payForBet(player, bet){
	console.log(player.balance);
	player.balance -= bet;
	updateBalance(player, bet);
	//update balance in DOM
}

function updateBalance(player, balance){
	var whichPlayerBalance = 'balance-' + player;
	document.getElementById(whichPlayerBalance).innerText = '$' + balance;
}

var IndividualBet = function(amount, odds, active, rollnumber){
	this.flatbet = amount;
	this.odds = odds;
	this.active = active;
	this.rollnumber = rollnumber;
};

//added to tableBets
var Bet = function(player, type, amount, odds, active, number, rollnumber){
	this.player = player;
	this.type = type;
	this.flatbet = amount;
	this.odds = odds;
	this.active = active;
	this.number = number;
	this.rollNumber = rollnumber;
};

function displayBet(player, type, amount){
	switch(type){
		case 'passline':
			var passlinebet = '<div class = "lacinato passline"><div class = "lacinato-header">pass line (1 to 1)</div><div class = "lacinato-content">'+
				'pass line bet: $' + amount + '</div></div>';
			var whichBetSummary = 'bet-summary-' + player;
			document.getElementById(whichBetSummary).innerHTML += passlinebet;
			break;
		default:
			console.log('unknown bet');
			break;
	}
}

function activateRoll(xtraplayers){
	document.getElementById('roll-button').addEventListener('click', function(event){
		console.log(tableBets);
		console.log(rollStatus);
		rollStatus.rollNumber ++;
		var dice = {
			one: Math.floor(Math.random()*6)+1,
			two: Math.floor(Math.random()*6)+1
		};
		var twoDiceDisplay = "<div class='two-dice'><div class='dice-result'>" + dice.one + "</div><div class='dice-result'>" + dice.two + "</div></div>";
		document.getElementById('roll-results').innerHTML += twoDiceDisplay;
		//https://cssanimation.rocks/list-items/
		//http://www.w3schools.com/jsref/met_element_setattribute.asp
		// document.getElementsByClassName("dice-result").setAttribute("style", "background-color: rgba(255, 0, 0, 0.85);");
		//document.getElementsByClassName("dice-result").style.backgroundColor = 'rgba(255, 0, 0, 0.85)';
		resolveBets(dice.one, dice.two, xtraplayers);
		updateRollStatus(dice.one, dice.two);
		updateRollButton();
		acceptBets(xtraplayers);
		// event.preventDefault();
	});
}

function updateRollButton(){
	if(rollStatus.comeOut){
		document.getElementById('roll-description').innerText = 'come out';
		document.getElementById('point-number').innerText = 'no point';
	}else{
		document.getElementById('roll-description').innerText = 'point is';
		document.getElementById('point-number').innerText = rollStatus.point;
	}
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

function resolveBets(one, two, players){
	var total = one + two;
	if(rollStatus.comeOut){
		if(total === 7 || total === 11){
			console.log(tableBets);
			for(var i = 0; i < tableBets.passline.length; i++){
				var winningPlayer = tableBets.passline[i].player;
				var betAmount = tableBets.passline[i].flatbet;
				for(var j = 0; j < players.length; j++){
					if(players[j].name === winningPlayer){
						//increase player balance by the amount of the bet PLUS winnings
						//1 * betAmount because this bet pays 1 to 1 
						players[j].balance += betAmount + (1 * betAmount);
						//remove this bet from playerBets
						players[j].currentBets.passline.splice(0,1);
						//update player's balance displayed on DOM
						updateBalance(players[j].name, players[j].balance);
					}
				}
			}
			//remove all passline bets from tableBets and from the DOM
			var elements = document.getElementsByClassName('passline');
			while(elements.length > 0){
				elements[0].parentNode.removeChild(elements[0]);
			}
			tableBets.passline = [];
			console.log(tableBets);
		}else if(total === 2 || total === 3 || total ===12){
			console.log('pass line bets lose');
			//remove passline bets from individual playerbets
			for(var k = 0; k < players.length; k++){
				if(players[k].passline){
					players[k].passline = [];
				}
			}
			//remove passline bets from tableBets and the DOM
			document.getElementsByClassName('passline').parentNode.removeChild('passline');
			tableBets.passline = [];
			console.log(tableBets);
		}
	}else if(!rollStatus.comeOut){
		if(total === 7){
			//pass line bets lose
			console.log('pass line bets lose');
			//remove passline bets from individual playerbets
			for(var l = 0; l < players.length; l++){
				if(players[l].passline){
					players[l].passline = [];
				}
			}
			console.log(players);
			//remove passline bets from tableBets and the DOM
			//document.getElementsByClassName('passline').parentNode.removeChild('passline');
			var elements2 = document.getElementsByClassName('passline');
			while(elements2.length > 0){
				elements2[0].parentNode.removeChild(elements2[0]);
			}
			tableBets.passline = [];
			console.log(tableBets);
		}else if (total === rollStatus.point){
			//this is copied from when a front line winner wins code above
			console.log(tableBets);
			for(var m = 0; m < tableBets.passline.length; m++){
				//increase player balance by the amount of the bet
				var winner = tableBets.passline[m].player;
				var woo = tableBets.passline[m].flatbet;
				for(var n = 0; n < players.length; n++){
					if(players[n].name === winner){
						//increase player balance by the amount of the bet PLUS winnings
						//1 * betAmount because this bet pays 1 to 1 
						players[n].balance += woo + (1 * woo);
						//remove this bet from playerBets
						players[n].currentBets.passline.splice(0,1);
						//update player's balance displayed on DOM
						updateBalance(players[n].name, players[n].balance);
					}
				}
			}
			//remove all passline bets from tableBets and from the DOM
			var chicken = document.getElementsByClassName('passline');
			while(chicken.length > 0){
				chicken[0].parentNode.removeChild(chicken[0]);
			}
			tableBets.passline = [];
			console.log(tableBets);
		}
	}
}

function submitBet(bet){
	//turn bet.amount into a string
	var betAmount = '$' + bet.amount;
	switch(bet.type){
		case 'passline':
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


function updatePlayerBalance(player){
	//add commas to the balance number
	//http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
	var balance = '$' + player.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	document.getElementById('player-balance').innerText = balance;
}





// function MultiwordBet(){
// 	this.bet = false;
// 	this.pass = false;
// 	this.passline = false;
// 	this.line = false;
// 	this.do = false;
// 	this.not = false;
// 	this.dont = false;
// 	this.place = false;
// 	this.odds = false;
// 	this.lay = false;
// 	this.come = false;
// }



// function enterRequest(){
// 	document.getElementById('add-bet-button').addEventListener('click', function(event){
// 		//return false;
// 		//event.preventDefault() prevents the page from refreshing because
// 		//refreshing the page is the default after submitting a form
// 		event.preventDefault();
// 		var bet = document.getElementById('input-bet').value;
// 		document.getElementById('input-bet').value = '';
// 		//evaluate the request
// 		var requestArray = bet.split(' ');
// 		var numbersArray = [];
// 		var stringsArray = [];
// 		//separate the request into an array of strings, and a separate array of numbers
// 		for(var i = 0; i<requestArray.length; i++){
// 			//parseFloat?
// 			if(parseInt(requestArray[i])){
// 				numbersArray.push(requestArray[i]);
// 			}else{
// 				stringsArray.push(requestArray[i]);
// 			}
// 		}
// 		var currentBet = new Bet(false, false, false);
// 		if(stringsArray.length === 1){
// 			switch(stringsArray[0]){
// 				case 'pass':
// 				case 'passline':
// 				case 'pl':
// 					currentBet.type = 'passline';
// 					break;
// 				case 'don\'tpass':
// 				case 'dontpass':
// 				case 'dp':
// 					currentBet.type = 'donotpassline';
// 					break;
// 				case 'place':
// 					currentBet.type = 'place';
// 					break;
// 				case 'odds'://note if user only specifies odds, it is assumed this is for a pass line bet, and not laying odds or placing odds on a come bet
// 				case 'placeodds':
// 					currentBet.type = 'placeodds';
// 					break;
// 				case 'lo':
// 				case 'layodds':
// 					currentBet.type = 'layodds';
// 					break;
// 				case 'come':
// 				case 'comebet':
// 					currentBet.type = 'come';
// 					break;
// 				case 'dc':
// 				case 'dontcome':
// 					currentBet.type = 'dontcome';
// 					break;
// 				default:
// 					console.log('unknown bet TYPE: ' + stringsArray[0]);
// 					break;
// 			}
// 		}else if (stringsArray.length > 1){
// 			//ALTERNATIVE METHOD 'branch approach':
// 				//1. Place MultiwordBet words in an array
// 				//2. have "most used" (eg come, pass) words first
// 				//3. since stringsArray will be shorter than the multiwordbet array, starting with the first stringsArray word, compare with all the multiwordbet array words
// 				//4. if a word matches, then compare the 2nd stringsArray word to the logical additional words that would be used with the first word.
// 				//5. continue to narrow down until you are certain of the requested option
// 			//you must have a multiword bet if the strings array length is > 1
// 			var mwbet = new MultiwordBet();
// 			//check if any of the words is a part of the possible multi-word bet words from the options in the MultiwordBet constructor
// 			for(var j = 0; j < stringsArray.length; j++){
// 				switch(stringsArray[j]){
// 					case 'bet':
// 						mwbet.bet = true;
// 						break;
// 					case 'pass':
// 						mwbet.pass = true;
// 						break;
// 					case 'passline':
// 						mwbet.passline = true;
// 						break;
// 					case 'line':
// 						mwbet.line = true;
// 						break;
// 					case 'do':
// 						mwbet.do = true;
// 						break;
// 					case 'not':
// 						mwbet.not = true;
// 						break;
// 					case 'dont':
// 					case 'don\'t':
// 						mwbet.dont = true;
// 						break;
// 					case 'place':
// 						mwbet.place = true;
// 						break;
// 					case 'odds':
// 						mwbet.odds = true;
// 						break;
// 					case 'lay':
// 						mwbet.lay = true;
// 						break;
// 					case 'come':
// 						mwbet.come = true;
// 						break;
// 					default:
// 						console.log('unknown WORD used in bet request: '+ stringsArray[j]);
// 						break;
// 				}
// 			}
// 			//evaluate mwbet to properly assign currentBet.type
// 			//should I have a return after each else if statement?
// 			for(var key in mwbet){
// 				console.log('searching mwbet now!!!');
// 				if((mwbet.do && mwbet.not && mwbet.pass) || (mwbet.dont && mwbet.pass) || (mwbet.dont && mwbet.pass && mwbet.bet) || (mwbet.do && mwbet.not && mwbet.passline) || (mwbet.do && mwbet.not && mwbet.passline && mwbet.bet)){
// 					currentBet.type = 'donotpassline';
// 				}else if((mwbet.pass && mwbet.line) || (mwbet.passline && mwbet.bet) || (mwbet.pass && mwbet.line && mwbet.bet)){
// 					//MUST check for a "plain" pass line bet AFTER don't pass
// 					currentBet.type = 'passline';
// 				}else if(mwbet.place && mwbet.odds){
// 					currentBet.type = 'placeodds';
// 				}else if(mwbet.lay && mwbet.odds){
// 					currentBet.type = 'layodds';
// 				}else if((mwbet.dont && mwbet.come) || (mwbet.dont && mwbet.come && mwbet.bet) || (mwbet.do && mwbet.not && mwbet.come) || (mwbet.do && mwbet.not && mwbet.come && mwbet.bet)){
// 					currentBet.type = 'dontcome';
// 				}else if(mwbet.come && mwbet.bet){//MUST check for a "plain" come bet AFTER don't come
// 					currentBet.type = 'come';
// 				}else if(mwbet.place && mwbet.bet){
// 					currentBet.type = 'place';
// 				}
// 			}
// 		}
// 		//evaluate for the number and bet amount
// 		//screen and correct for numbers with commas or - values
// 		//if the bet has a type, then proceed with assigning amount and number
// 		if(currentBet.type){
// 			if(numbersArray.length === 1 && (currentBet.type === 'donotpassline' || currentBet.type === 'passline' || currentBet.type === 'come' || currentBet.type === 'dontcome' || currentBet.type === 'placeodds' || currentBet.type === 'layodds')){
// 				if(parseInt(numbersArray[0]) > 0){
// 					currentBet.amount = parseInt(numbersArray[0]);
// 					currentBet.number = true;
// 				}
// 			//there should be both an amount AND number
// 			//check that the numbers are positive
// 			}else if(numbersArray.length > 1 && parseInt(numbersArray[0]) > 0 && parseInt(numbersArray[1]) > 0){
// 				currentBet.number = parseInt(numbersArray[0]);
// 				currentBet.amount = parseInt(numbersArray[1]);
// 			}
// 		}
// 		//evaluate the constructor using the submitBet function IF currentBet has all necessary factors
// 		//submitBet(currentBet.type, currentBet.amount, currentBet.number);
// 		if(currentBet.type && currentBet.amount && currentBet.number){
// 			submitBet(currentBet);
// 			console.log('bet successful: ');
// 		}else{
// 			console.log('bet NOT successful: ');
// 		}
// 		console.log(currentBet);
// 	});
// }































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