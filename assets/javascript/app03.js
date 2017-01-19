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
	document.getElementById('romaine').innerHTML = updatedFooter;
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

function begin(){
	document.getElementById('start-button-div').addEventListener('click', function(event){
		event.preventDefault();
		timer.interval();
	});
}


var timer =
{
	valueStart: 500,
	interval: function(){
		//every second, decrease 1/10 of 500 = 50
		document.getElementById('countdown').className = ' enhanced';
		counter = setInterval(timer.updatePossWin, 20);
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


//ALTERNATIVE FOR NEW 'MATH TESTS':
//GAME: GOAL IS MAXIMIZE POINTS OR $
//1. PRESENT POSSIBLE SITUATION EG PLACE BET ON 9 $70
//2. MAX POSSIBLE POINTS / $ IS EG 200
//THEN FOR EACH SECOND THAT PASSES, POSSIBLE POINTS EARNED DECREASES BY 20
//THEREFORE ONE POINT PER 50 MILLISECONDS
//ONCE CORRECT ANSWER ENTERED, 'WINNINGS' INCREASES BY CURRENT POINT LEVEL FOR THE QUESTION
