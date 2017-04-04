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

// function displayDescriptionFromIndexClick(){
// 	var whichHW = this.getAttribute('hw');
// 	var homeworkHElems = document.querySelectorAll('.homework-header');
// 	for (var i = 0; i < homeworkHElems.length; i++) {
// 		var hw = homeworkHElems[i].getAttribute('hw');
// 		if(whichHW === hw){
// 			removehwd();
// 			var description = displayHWContent(whichHW);
// 			homeworkHElems[i].className += ' hh-open';
// 			homeworkHElems[i].parentNode.appendChild(description);
// 			return;
// 		}
// 	}
// }
function displayDescriptionFromIndexClick(event){
	console.log('event:', event);
	console.log('event.target: ', event.target);


	var whichHW = this.getAttribute('hw');
	var homeworkHElems = document.querySelectorAll('.homework-header');
	for (var i = 0; i < homeworkHElems.length; i++) {
		var hw = homeworkHElems[i].getAttribute('hw');
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
	div.innerHTML = homeworks[hw].desc + '<br><br><u>' + 'Technologies used:' + '<u><br>';
	var ul = document.createElement('ul');
	for(var i = 0; i < homeworks[hw].tech.length; i ++){
		var techli = document.createElement('li');
		techli.innerText = homeworks[hw].tech[i];
		ul.appendChild(techli);
	}
	div.appendChild(ul);
	div.innerHTML += '<br>';
	divBottomLinks = document.createElement('div');
	var hwlink = document.createElement('a');
	hwlink.className = 'hw-link';
	hwlink.setAttribute('href', homeworks[hw].staticlink);
	hwlink.setAttribute('target','_blank');
	hwlink.setAttribute('title','opens in a new browser window');
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
		desc: 'A "hangman" style game. Homework three represents an exercise in javascript basics, as well as requiring continued advancement in html and css. This assignment involved organizing the game code as an object. While playing, users enter letters from their keyboard as they guess which letters are contained in the current word. Guesses are validated against prior guesses, so the letters guessed count does not decrement with repeat guesses on the same word. As correct letters are entered, the word replaces the placeholders with the correctly guessed letters in the appropriate locations within the current word. Once all letters for the current word are entered within the allotted guess limit, the user "wins" the word and the next word begins.',
		tech: ['HTML5', 'CSS3', 'JavaScript']
	},
	{
		id: 4,
		number: "homework four",
		staticlink: 'homeworks/hw4.html',
		desc: 'The player wins with both skill and luck, by correctly calculating how many "crystals" of random values, will give them a total score equal to a randomly generated "goal score." This assignment further refines and explores my capabilities with JavaScript, while introducing the use of jQuery. jQuery enabled DOM manipulation (rendering, appending, updating, etc) through "simpler" code. Also had to properly include the jQuery CDN to enable the jQuery functionality.',
		tech: ['HTML5', 'CSS3', 'JavaScript', 'jQuery']
	},
	{
		id: 5,
		number: "homework five",
		staticlink: 'homeworks/hw5.html',
		desc: 'This "trivia" application navigates the user through a series of timed questions. Once a user selects an answer (or if time remaining reaches 0), their answer is compared to the correct answer. After time is provided for the user to read the answer and explanation, the next timed question begins automatically. Once the user exhausts all questions and answers, the user\'s score is presented, and the user may select the option to try the quiz again. This assignment required more advanced JavaScript programming and continued the use of jQuery. I added additional features to this homework, including questions being randomly generated every time the quiz begins, and the application displaying a corresponding answer explanation whenever an answer was displayed. To complete this homework, success required correctly applying the use of JavaScript timers and enhanced understanding of JavaScript arrays and objects.',
		tech: ['HTML5', 'CSS3', 'JavaScript', 'jQuery']
	},
	{
		id: 6,
		number: "homework six",
		staticlink: 'homeworks/hw6.html',
		desc: 'Take a look at popular giphys of a certain topic from a predetermined list, or add your own new topic to the list. After selecting a topic, the DOM populates with giphys corresponding to the selected topic, and you may click on a particular giphy image to see the animated version of that giphy. Then click an animated giphy to return it to the still image version. This homework involved creating AJAX calls to the giphy api to get the proper images and animated images. An AJAX call required properly formulating the query URL, then filtering the returned data and using jQuery to populate the DOM with the images corresponding to the topic. This application also involved assigning custom attributes to different html elements so the animate/still functionality would work as expected.',
		tech: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'AJAX (Asynchronous JavaScript and XML)', 'API (application programming interface)']
	},
	{
		id: 7,
		number: "homework seven",
		staticlink: 'homeworks/hw7.html',
		desc: 'Find a partner and play "Rock, Paper, Scissors," anywhere connected to the internet, on different computers and browsers. Use the chat feature to send messages. Additional spectators may view the results of each round and add their own commentary to the messaging system. This homework utilizes Firebase like a server in that each user "posts" and "gets" information to and from the Firebase database to enjoy the features of this application. The game works by assigning each user\'s DOM elements ids or data attributes unique to them, so Firebase can send them the appropriate information. Firebase understands whose turn it is, or what to display on different browsers, based on internal variables. Firebase "listens" for specific actions to send the appropriate information to the intended users. I also added timer functionality so subsequent games occur automatically rather than requiring explicit consent from the players (eg "next button") to start a new round. This enhances the game experience.',
		tech: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Google Firebase']	},
	{
		id: 10,
		number: "homework ten",
		staticlink: 'https://youtu.be/M3w1Te47G5o',
		desc: 'This homework involved "creating an Amazon-like storefront with mySQL. The application takes in orders from customers and depletes stock from the store\'s inventory. The application also tracks product sales across departments and can provide a summary of the highest-grossing departments in the store." Preliminary steps included creating a package.json file and installing and saving the NPM packages (libraries) "mysql" for creating a mySQL connection, "inquirer" for the CLI interface, and "cli-table" for the "Supervisor View." I also added a .gitignore file so when pushing updates to github, the node_modules repository was not added. In MySQL Workbench, I created a database, specified using that particular database, then created a table with columns including an item_id primary key auto_incremented column, as well as product name, department name, price, and stock quantity columns. The JavaScript code first created a mySQL connection using the mysql object, then used inquirer and the mysql packages to obtain data from the products table and allow the user through the CLI to manipulate the table data in various ways, as demonstrated in the video. A second table was added to the same database which reflected total department sales and "profit," which would be updated whenever a change occured in the first products table. Success on this homework required extensive use of promises, anonymous functions, and callback functions, in addition to crafting appropriate mySQL queries and utilizing placeholders when necessary.',
		tech: ['JavaScript', 'Node.js', 'NPM libraries/packages: inquirer, mysql, cli-table', 'mySQL']
	},
	{
		id: 12,
		number: "homework twelve",
		staticlink: 'https://jn1.herokuapp.com/',
		desc: 'Add new burgers, "devour" burgers, and make burgers available for devouring again. This homework involved creating my own server.',
		tech: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'mySQL', 'express', 'handlebars', 'heroku']
	},
	{
		id: 13,
		number: "group project two",
		staticlink: 'https://enhajolist.herokuapp.com/',
		desc: 'description coming soon. please feel free to visit and explore.',
		tech: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'mySQL', 'express', 'handlebars', 'heroku']
	},
	{
		id: 14,
		number: "homework fourteen",
		staticlink: 'https://homework14jn.herokuapp.com/',
		desc: 'description coming soon. please feel free to visit and explore.',
		tech: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'express', 'mongoose', 'cheerio', 'heroku']
	},
	{
		id: 15,
		number: "homework fifteen",
		//staticlink: 'https://homework15jn.herokuapp.com/',
		staticlink: 'https://nyt-jn.herokuapp.com/',
		//1. a description of this homework (what does it do).
		//2 how to use it.
		//3. how it does it/ how it was made.
		desc: 'A Single Page Application using React with a node and express server. This application searches the New York Times API, and stores user-saved articles in a mongo database using mongoose models. Front-end framework designed using Twitter Bootstrap.',
		tech: ['React', 'Node.js', 'express', 'JSX', 'mongodb', 'mongoose', 'axios', 'Twitter Bootstrap', 'CSS3', 'JavaScript', 'heroku']
	},
	{
		id: 16,
		number: "project three",
		//staticlink: 'https://raspberryrealty.herokuapp.com/',
		staticlink: 'https://avm-jn.herokuapp.com/',
		//1. a description of this homework (what does it do).
		//2 how to use it.
		//3. how it does it/ how it was made.
		desc: 'A Single Page Application using React.js with a node and express server. Enter a description of a property, then receive statistics related to that property in addition to a Comparative Market Analysis. Searches enabled by accessing a mongo database of mongoose schemas / models; collections are populated with documents of actual property listings. Front-end framework custom designed using CSS3.',
		tech: ['React', 'Node.js', 'express', 'JSX', 'mongodb', 'mongoose', 'axios', 'd3', 'CSS3', 'JavaScript', 'react-router', 'babel', 'webpack', 'css-loader','heroku']
	}
];


//PETE'S SUGGESTION FOR TAKING THE ARRAY OF NODE ELEMENTS, AND TURNING IT INTO AN ARRAY
//SO THEN YOU CAN RUN ARRAY FUNCTIONS ON THOSE ELEMENTS
// Document.prototype.getAll = function(selector){
// 	   var domElemList = document.querySelectorAll(selector);
// 	   if(!domElemList.length){
// 	   	console.log("could not find elements with selector: " + selector);
// 	   	return [];
// 	   }
// 	   var jsArray = [];
// 	   for(var i = 0; i < domElemList.length; i++){
// 	   		jsArray.push(domElemList[i]);
// 	   }
// 	   return jsArray;
// 	}

//consider: .dataset instead of .attribute
//can set multiple eg style with {} instead of setting one style attribute at a time?
//how about setting multiple attributes at one time?

//===========================================================
//MORE PETE WORK:
// var hwObject = homeworks.reduce(function(hwOB,hw){
//    hwOB[hw.id] = { cb: function(){
//    	console.log('callback for ' + hw.number, hw);
//    }
// }
//    return hwOB;
// }, {});
// console.log('hwObject', hwObject);
// document.getElementById('homeworks-index').innerHTML = homeworks.map(function(hw, ind){
// 	return '<li id="homework_'+hw.id+'" data-hw="'+hw.id+'" style="font-size:16px;">' +hw.number+'</li>';
// }).join('');
// document.getElementById('homeworks-index').onclick = function(e){
// 	console.log(e.target);
// 	var hwkey = e.target.dataset.hw;
// 	console.log('hwkey',hwkey);
// 	if(hwkey){
// 		hwObject[hwkey].cb();
// 	}
// };


// //HOW TO CREATE AN OBJECT OF THE HOMEWORKS-INDEX LI CHILDREN ELEMENTS, SO YOU CAN REFER TO THEM BY ITM.ID
// var things = {}
// document.getElementById('homeworks-index').querySelectorAll('li').forEach((itm) => { things[itm.id] = itm})
// things["homework_3"]