//REMEMBER: CODE EVERYTHING ONLY ONCE
//Do not Repeat Yourself = DRY
document.addEventListener("DOMContentLoaded", function(event) {
	//http://stackoverflow.com/questions/799981/document-ready-equivalent-without-jquery
	showDate();
	showThoughts();
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

function showThoughts(){
	timer.interval();
}

var shown = 0;

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

var timer =
{
	interval: function(){
		counter = setInterval(timer.showAThought, 5000);
	},
	showAThought: function(){
		var uniqueThought = pickOne(thoughts);
		console.log(uniqueThought);
		document.getElementById('thoughts-container').innerText = uniqueThought;
	}
};

function pickOne(silver){
	if(shown<silver.length){
		var whichPick = Math.floor(Math.random()*silver.length);
		console.log(whichPick);
		//if the quote was already picked, then perform recursive
		if(silver[whichPick].p){
			pickOne(silver);
		}else{
			var quote = silver[whichPick].q;
			console.log(whichPick);
			silver[whichPick].p = true;
			shown++;
			console.log(typeof quote);
			return quote;
		}
	}else{
		//after all thoughts have been displayed once, rest "picked" key
		//values for all thoughts to false
		//and reset shown to 0
		shown = 0;
		thoughts.map(resetArray);
		timer.showAThought();
	}
}

function resetArray(item, index){
	return item.p = false;
}