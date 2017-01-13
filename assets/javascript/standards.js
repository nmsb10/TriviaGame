//REMEMBER: CODE EVERYTHING ONLY ONCE
//Do not Repeat Yourself = DRY
document.addEventListener("DOMContentLoaded", function(event) {
	//http://stackoverflow.com/questions/799981/document-ready-equivalent-without-jquery
	showDate();
	showThoughts(thoughts);
});

function showDate(){
	//http://www.w3schools.com/jsref/jsref_obj_date.asp
	var d = new Date();
	var yearCurrent = d.getFullYear();
	var updatedFooter = '<div id="footer-content">Copyright &copy; 2016 - ' + yearCurrent +
	' <a class="footer-link" href="https://www.linkedin.com/in/jonathonnagatani" target="_blank"' + 
	' title="Jonathon on LinkedIn">Jonathon Nagatani</a>. All Rights Reserved.</div>';
	// $('#footer-content').replaceWith(updatedFooter);
	document.getElementById('ginger').innerHTML = updatedFooter;
}

var order = [];
var shownThoughts = 0;
var thoughts =
[
	//{thought , picked}
	{q: 'Do not expect anyone to hold your hand in "real life."', p: false},
	{q: 'Nothing is sacred.', p: false},
	{q: 'Focus on the nutrition of your mind.', p: false},
	{q: 'Do more for others than anyone else does for them.', p: false},
	{q: 'I must earn my clients and friends every day. Never take a relationship (business or friend) for granted.', p: false},
	{q: 'Go beyond "the normal."', p: false},
	{q: 'What I do, not what I have, defines who and what I am.', p: false},
	{q: 'Assume you are being recorded everywhere and that such recordings shall exist forever.', p: false},
	{q: 'Is time the scarcest resource of all?', p: false},
	{q: 'Does 1 minute of your time during one part of the day have a different value than the same length of time (one minute) during a different time of the day?', p: false},
	{q: 'Seek only positive energy.', p: false},
	{q: 'Be the "calming force."', p: false},
	{q: 'Through complaining, people embrace turning themselves into a "victim."', p: false},
	{q: 'Less is more.', p: false},
	{q: '"Conduct your life as though your every act were to become a universal law for all people."', p: false}
];

function showThoughts(array){
	order = genRandomOrderArray(array);
	console.log(order);
	timer.interval();
}

function genRandomOrderArray(input){
	var orderArray = [];
	for(var i = 0; i<input.length; i++){
		orderArray.push(i);
	}
	//http://www.w3schools.com/js/js_array_sort.asp
	orderArray.sort(function(a, b){
		return 0.5 - Math.random();
	});
	return orderArray;
}

var timer =
{
	interval: function(){
		counter = setInterval(timer.showAThought, 5500);
	},
	showAThought: function(){
		var uniqueThought = '';
		console.log(shownThoughts);
		if(shownThoughts < thoughts.length){
			uniqueThought = thoughts[order[shownThoughts]].q;
			shownThoughts ++;
			console.log(shownThoughts + ": " + uniqueThought);
			document.getElementById('thoughts-container').innerText = uniqueThought;
		}else{
			shownThoughts = 0;
			//must stop this counter, otherwise will continue to perform showThoughts function while also performing it again and again, simultaneously
			timer.stop();
			showThoughts(thoughts);
		}
	},
	stop: function(){
		clearInterval(counter);
	}
};



// function pickOne(silver){
// 	if(shown<silver.length){
// 		var whichPick = Math.floor(Math.random()*silver.length);
// 		console.log(whichPick);
// 		//if the quote was already picked, then perform recursive
// 		if(silver[whichPick].p){
// 			pickOne(thoughts);
// 			return;
// 		}else{
// 			var quote = silver[whichPick].q;
// 			silver[whichPick].p = true;
// 			shown++;
// 			console.log('which pick: ' + whichPick + " shown: " + shown);
// 			console.log(quote);
// 			return quote;
// 		}
// 	}else{
// 		//after all thoughts have been displayed once, reset "picked" key
// 		//values for all thoughts to false
// 		//and reset shown to 0
// 		shown = 0;
// 		thoughts.map(resetArray);
// 		timer.showAThought();
// 	}
// }

// function resetArray(item, index){
// 	return item.p = false;
// }


//add one letter at a time
//for(var i= 0; i<quote.length; i++){
	//timer function (eg every 250 milliseconds) for the following:
	//document.getElementById('wherequotewillbe').innerText +=quote[i];
//}