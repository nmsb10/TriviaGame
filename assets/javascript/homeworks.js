//REMEMBER: CODE EVERYTHING ONLY ONCE
//Do not Repeat Yourself = DRY
document.addEventListener("DOMContentLoaded", function(event) {
	//http://stackoverflow.com/questions/799981/document-ready-equivalent-without-jquery
	showDate();
	//background-color change
	bcChange.interval('summary-content', [250, 250, 250, 1], 13, 3000);
	displayHWIndex.interval(homeworks);
	displayHWHeaders(homeworks);
	enableHWdisplay();
});

function showDate(){
	//http://www.w3schools.com/jsref/jsref_obj_date.asp
	var d = new Date();
	var yearCurrent = d.getFullYear();
	var updatedFooter = '<div id="footer-content">Copyright &copy; 2016 - ' + yearCurrent +
	' <a class="footer-link" href="https://www.linkedin.com/in/jonathonnagatani" target="_blank"' + 
	' title="Jonathon on LinkedIn">Jonathon Nagatani</a>. All Rights Reserved.</div>';
	document.getElementById('footer').innerHTML = updatedFooter;
}

var bcChange =
{
	element: '',
	bc: [],
	mag: 0,
	counter: '',
	interval: function(element, initialRGBA, mag, interval){
		bcChange.element = element;
		bcChange.bc = initialRGBA;
		bcChange.mag = mag;
		bcChange.counter = setInterval(bcChange.changeColor, interval);
	},
	changeColor: function(){
		//obtain the element's current rgba
		for(var i = 0; i < bcChange.bc.length; i ++){
			bcChange.bc[i] = bcChange.changeValue(bcChange.bc[i], bcChange.mag);
		}
		//for now, set a (opacity) to 1
		bcChange.bc[3] = 1;
		//set background color to new values
		// document.getElementById(element).style.backgroundColor = 'rgba(' + [255,0,0, 0.5].join(',') + ')';
		//http://www.w3schools.com/jsref/dom_obj_style.asp
		document.getElementById(bcChange.element).style.backgroundColor = 'rgba(' + bcChange.bc + ')';
	},
	changeValue: function(value, mag){
		//with equal probability, increase or decrease each of the 3 values by mag
		if(Math.random() < 0.5){
			value = value - mag;
		}else{
			value = value + mag;
		}
		if(value < 0){
			value = Math.floor(Math.random()*mag);
		}
		if(value > 255){
			value = 255 - Math.floor(Math.random()*mag);
		}
		return value;
	},
	stop: function(){
		clearInterval(bcChange.counter);
	}
};

function displayHWHeaders(arr){
	for(var i = 0; i < arr.length; i ++){
		var li = document.createElement('li');
		var div = document.createElement('div');
		div.className = 'homework-header';
		div.setAttribute('hw', i);
		div.id = arr[i].number.split(' ').join('-');
		div.innerText = arr[i].number;
		li.appendChild(div);
		document.getElementById('homeworks-content').appendChild(li);
	}
}

function enableHWdisplay(){
	var indexElems = document.getElementsByClassName('ind-homework-header');
	var homeworkHElems = document.getElementsByClassName('homework-header');
	//http://www.w3schools.com/jsref/dom_obj_event.asp
	for (var j = 0; j < homeworkHElems.length; j++) {
		homeworkHElems[j].addEventListener('click', displayDescription, false);
	}
	//need to set timeout so we ensure all the indexElems load on the dom first, before attaching the event listener!
	setTimeout(function(){
		for (var i = 0; i < indexElems.length; i++) {
			indexElems[i].addEventListener('click', displayDescriptionFromIndexClick, false);
		}
	}, homeworks.length * 300);
}

function displayDescription(){
	removehwd();
	var whichHW = this.getAttribute('hw');
	var description = displayHWContent(whichHW);
	this.className += ' hh-open';
	this.parentNode.appendChild(description);
}

function displayDescriptionFromIndexClick(){
	var whichHW = this.getAttribute('hw');
	var specificHWHeader = '';
	var homeworkHElems = document.getElementsByClassName('homework-header');
	for (var i = 0; i < homeworkHElems.length; i++) {
		var hw = homeworkHElems[i].getAttribute('hw');
		console.log(homeworkHElems[i]);
		if(whichHW === hw){
			removehwd();
			var description = displayHWContent(whichHW);
			homeworkHElems[i].className += ' hh-open';
			homeworkHElems[i].parentNode.appendChild(description);
			return;
		}
	}
}

//remove any currently openhomework-description element currently in dom
function removehwd(){
	var openDesc = document.getElementById('homework-description');
	if(openDesc){
		openDesc.parentNode.firstChild.className = 'homework-header';
		openDesc.parentNode.removeChild(openDesc);
	}else{
		return;
	}
}

function displayHWContent(hw){
	var div = document.createElement('div');
	div.id = 'homework-description';
	div.innerHTML = homeworks[hw].desc + '<br>' + 'technologies used:' + '<br>';
	var ul = document.createElement('ul');
	for(var i = 0; i < homeworks[hw].tech.length; i ++){
		var techli = document.createElement('li');
		techli.innerText = homeworks[hw].tech[i];
		ul.appendChild(techli);
	}
	div.appendChild(ul);
	divBottomLinks = document.createElement('div');
	var hwlink = document.createElement('a');
	hwlink.className = 'hw-link';
	hwlink.setAttribute('href', homeworks[hw].staticlink);
	hwlink.innerText = 'see ' + homeworks[hw].number;
	var gototop = document.createElement('a');
	gototop.className = 'hw-link';
	gototop.setAttribute('href', '#main-content');
	gototop.setAttribute('title', 'back to page top');
	gototop.className = 'hw-link close-desc';
	gototop.innerText = 'top of page';
	var thirdlink = document.createElement('a');
	thirdlink.className = 'hw-link';
	thirdlink.setAttribute('href', '#');
	thirdlink.innerText = 'third link';
	divBottomLinks.appendChild(hwlink);
	divBottomLinks.appendChild(gototop);
	divBottomLinks.appendChild(thirdlink);
	div.appendChild(divBottomLinks);
	return div;
}

var displayHWIndex = {
	hwcount: 0,
	displayed: 0,
	counter:'',
	interval: function(array){
		displayHWIndex.hwcount = array.length;
		displayHWIndex.counter = setInterval(function(){displayHWIndex.display();}, 300);
	},
	display: function(){
		if(displayHWIndex.displayed < displayHWIndex.hwcount){
			var li = document.createElement('li');
			var a = document.createElement('a');
			li.className = 'ind-homework-header';
			//set a 'hw' attribute to the homeworks array index of this particular homework
			li.setAttribute('hw', displayHWIndex.displayed);
			a.innerText = homeworks[displayHWIndex.displayed].number;
			a.className = 'index-a';
			//to properly create the href for an id, add a #, then replace the space with a dash
			a.setAttribute('href', '#' + homeworks[displayHWIndex.displayed].number.split(' ').join('-'));
			a.setAttribute('title', homeworks[displayHWIndex.displayed].number);
			li.appendChild(a);
			document.getElementById('homeworks-index').appendChild(li);
			displayHWIndex.displayed ++;
		}else{
			displayHWIndex.stop();
		}
	},
	stop: function(){
		clearInterval(displayHWIndex.counter);
	}
};

var homeworks = [
	{
		id: 3,
		number: "homework three",
		staticlink: 'homeworks/hw3.html',
		desc: "description of homework three here",
		tech: ['technologies and concepts used one', 'technologies and concepts used two', 'technologies and concepts used three']
	},
	{
		id: 4,
		number: "homework four",
		staticlink: 'homeworks/hw4.html',
		desc: "first read a description of this homework. what it does, how it does it, how to use it. how it was made. explain the homework; summary and technologies used; text-align justify line height more than 100%? explain the homework here. USE THE TRANSFORM AND PERSPECTIVE CSS PROPERTIES?? ",
		tech: ['technologies and concepts used one', 'technologies and concepts used two', 'technologies and concepts used three']
	},
	{
		id: 5,
		number: "homework five",
		staticlink: 'homeworks/hw5.html',
		desc: "description of homework five here.",
		tech: ['technologies and concepts used one', 'technologies and concepts used two', 'technologies and concepts used three']
	},
	{
		id: 6,
		number: "homework six",
		staticlink: 'homeworks/hw6.html',
		desc: "description of homework six here.",
		tech: ['technologies and concepts used one', 'technologies and concepts used two', 'technologies and concepts used three']
	},
	{
		id: 7,
		number: "homework seven",
		staticlink: 'homeworks/hw7.html',
		desc: "description of homework seven here.",
		tech: ['technologies and concepts used one', 'technologies and concepts used two', 'technologies and concepts used three']
	},
	{
		id: 10,
		number: "homework ten",
		staticlink: 'https://youtu.be/M3w1Te47G5o',
		desc: "description of homework ten here.",
		tech: ['technologies and concepts used one', 'technologies and concepts used two', 'technologies and concepts used three']
	},
	{
		id: 12,
		number: "homework twelve",
		staticlink: 'https://jn1.herokuapp.com/',
		desc: "description of homework twelve here.",
		tech: ['technologies and concepts used one', 'technologies and concepts used two', 'technologies and concepts used three']
	},
];


	//var button = document.getElementById('buttonID')
	//button.addEventListener('click', function(){});
	//button.classList.add('show');
	//button.classList.remove('hide');
	// //if there were multiple classes, must have a space before show ie ' show'
	// 	li.className = 'show';
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

//http://www.w3schools.com/jsref/met_document_addeventlistener.asp
		// document.addEventListener("mouseover", myFunction);
		// document.addEventListener("click", someOtherFunction);
		// document.addEventListener("mouseout", someOtherFunction);


//modals???



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


//TO COPY AN ARRAY:
//var copyOfArray = thoughts.slice(0);



//to iterate through an array to search for an element:
//var found = thoughts.find(function (item){
	//return item.item_id === answer.item_id;
//});



//add one letter at a time
//for(var i= 0; i<quote.length; i++){
//timer function (eg every 250 milliseconds) for the following:
//document.getElementById('wherequotewillbe').innerText +=quote[i];
//}