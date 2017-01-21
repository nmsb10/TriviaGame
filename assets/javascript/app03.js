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
