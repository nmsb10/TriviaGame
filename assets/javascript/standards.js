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
	document.getElementById('footer').innerHTML = updatedFooter;
}

var thoughts =
[
	//{thought , picked}
	{q: 'Do not expect anyone to hold your hand in "real life."', p: false},
	{q: 'Nothing is sacred.', p: false},
	{q: 'Focus on the nutrition of your mind.', p: false},
	{q: 'Do more for others than anyone else does for them.', p: false},
	{q: 'I must earn my clients and friends every day. Never take a relationship (business or friend) for granted.', p: false},
	{q: 'Go beyond "the normal," especially when serving others.', p: false},
	{q: 'What I do, not what I have, defines who and what I am.', p: false},
	{q: 'Assume you are being recorded everywhere and that such recordings shall exist forever.', p: false},
	{q: 'Is time the scarcest resource of all?', p: false},
	{q: 'Does 1 minute of your time during one part of the day have a different value than the same length of time (1 minute) during a different time of the day?', p: false},
	{q: 'Seek only positive energy.', p: false},
	{q: 'Be the "calming force."', p: false},
	{q: 'Through complaining, one embraces their identity as a "victim."', p: false},
	{q: 'Less is more.', p: false},
	{q: '"Conduct your life as though your every act were to become a universal law for all people."', p: false},
	{q: 'Everyone is entitled to their beliefs. But holding a belief does not necessarily make it true. Or does it?', p: false},
	{q: '"Truth is in the eye of the beholder." Do you make a distinction between truth and reality?', p: false}
];

function showThoughts(array){
	timer.currentArray = timer.generateRandomArrayOrder(array);
	timer.interval();
}

var timer =
{
	shownThoughts: 0,
	currentArray: [],
	generateRandomArrayOrder: function(array){
		//http://www.w3schools.com/js/js_array_sort.asp
		array.sort(function(a, b){
			return 0.5 - Math.random();
		});
		return array;
	},
	interval: function(){
		counter = setInterval(timer.showAThought, 8000);
	},
	showAThought: function(){
		//remove the current thought:
		document.getElementById('thoughts-container').innerText = '';
		var container = document.getElementById('thoughts-container');
		var newThought = document.createElement('div');
		newThought.innerText = timer.currentArray[timer.shownThoughts].q;
		newThought.id = "one-thought";
		container.appendChild(newThought);
		if(timer.shownThoughts < timer.currentArray.length-1){
			timer.shownThoughts ++;
		}else{
			//must display the final quote in the array here. Otherwise if the quote is displayed in  the
			//above if statement, then for this interval, the last quote will display for double the quantity of the time
			//the following one line of code was the only code here prior to adding the css 'show' animation
			//document.getElementById('thoughts-container').innerText = timer.currentArray[timer.shownThoughts].q;
			// setTimeout(function(){
			// 	newThought.className = newThought.className + 'show';
			// });
			//must stop this counter, otherwise will continue to perform showThoughts function while also performing it again and again, simultaneously
			timer.shownThoughts = 0;
			timer.stop();
			showThoughts(thoughts);
		}
	},
	stop: function(){
		clearInterval(counter);
	}
};

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

//THE ORIGINAL CONVOLUTED METHOD OF PICKING A RANDOM QUOTE FROM THE QUOTES ARRAY:
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


//=================================================================
//pete's suggestion for selecting random array element only once, then being able to repeat once every element selected once
// function randoArrayThing(){
// 	var theQuotes = [
// 	{t: 'jhsdvcskhjdvc', id: new Date().getTime() + 1},
// 	{t: 'what what', id: new Date().getTime() + 2},
// 	{t: 'ok tgehn', id: new Date().getTime() + 3},
// 	{t: 'stuff ', id: new Date().getTime() + 4},
// 	{t: 'pizza', id: new Date().getTime() + 5},
// 	{t: 'cosmos', id: new Date().getTime() + 6}
// 	];
//     function getQ(){
//     	var newQ = theQuotes[Math.floor(Math.random() * theQuotes.length)];
//     	theQuotes = theQuotes.filter(function(qt) {
//     		return qt.id !== newQ.id;
//     	});
//     	return newQ;
//     }
//     return {
//     	see: function(){
//     		console.log(theQuotes);
//     	},
//     	getQuote: function(){
//     		 console.log(getQ().t);
//     	}, 
//     	addQuote: function(text){
//     		if(!text){
//     			console.log('add letters!');
//     			return;
//     		}
//     		theQuotes.push({t: text , id: new Date().getTime()});
//     	}    
//     };
// }

// var quoteThing = randoArrayThing();
// quoteThing.addQuote('hi');