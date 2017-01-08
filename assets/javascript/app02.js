//REMEMBER: CODE EVERYTHING ONLY ONCE
//Do not Repeat Yourself = DRY
document.addEventListener("DOMContentLoaded", function(event) {
	//http://stackoverflow.com/questions/799981/document-ready-equivalent-without-jquery
	showDate();
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
		if(dayNumber<10){
			return '0'+ dayNumber;
		}else{
			return dayNumber;
		}
	}
};

document.getElementById('add-bet-button').addEventListener("click", function(){
	var bet = document.getElementById('input-bet').value;
	
	console.log(paper);
	document.getElementById('input-bet').value = '';
	return;
});

//.value, .innerHTML
//document.queryselector??
//use a switch statement??
//functions that return values??
//indexOf (returns -1 if not in there)

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

//new app: enter numbers, display numbers entered, then press button
//to calculate mean and median
//(or generate eg 10 or 11 random numbers, then press button to calculate)
//FOR THE FUTURE:
//1. if player shares = 0, then disable the sell button (on: hover has the naught sign and button is "washed out")
//2. display record end balance in a table: "Top Producers" (aka luckiest players): user name | end balance | time spent playing (seconds)
//3. in firebase, ref('users').child(playerName): log time spent, end balance, start price, end price, etc
//on disconnect: ref('formerPlayers').set(playerName).child with player name, time spent, end balance, start price, priceend, total transactions, etc, then remove playerName from 'users'
//4. in table, show sum of all ups and sum of all downs
//show total of ups plus downs, total time elapsed, percentage of ups/total and percentage of downs/total
//5. in table, show median price for purchased and sold, as well as mean price purchased and sold
//6. for short sale div, include time remaining to buy (up to 00.00 seconds), and number of shorted shares remaining to be resolved
//7. on bottom, have "your History" table of transactions (set height, with overflow scroll bar). newer entries are on top, older entries on bottom.
//transaction number, basis, number shares purchased, total cost, number shared sold, sold amount, ending unit balance
//8. use canva.com to create your own images???