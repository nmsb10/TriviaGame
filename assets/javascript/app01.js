// Initialize Firebase
var config = {
	apiKey: "AIzaSyDAS0Xz8HkMaa1RgK_QVar2uw1C0QEgad4",
	authDomain: "app01-14e02.firebaseapp.com",
	databaseURL: "https://app01-14e02.firebaseio.com",
	storageBucket: "app01-14e02.appspot.com",
	messagingSenderId: "1011624775302"
};
firebase.initializeApp(config);

//create variable to represent firebase.database();
var fdb = firebase.database();

//variables global
var havePlayer = false;
var userName = '';
var assetPriceInitial = 0;
var assetPriceCurrent = 0;
var pricesMostRecent = [];

//REMEMBER: CODE EVERYTHING ONLY ONCE
$(document).ready(function(){
	showDate();

	//add a player
	$("#add-player-button").on("click", function(){
		if($("#input-username").val()===""){
			alert("you forgot to type your name.");
			return false;
		}else if(!havePlayer){
			var playerName = $("#input-username").val().trim();
			userName = playerName;
			console.log('welcome player: ' + userName);
			var playerInfo = {
				//timeStart: fdb.ServerValue.TIMESTAMP(),
				timeSpent: 0,
				balancePlayerEnd: 0,
				priceAssetStart: 0,
				priceAssetCurrent: 0,
				priceAssetEnd: 0,
				transactionsTotal: 0,
				showUniqueName: true,
				playing: true
			};
			//difference between .set and .push??
			//use .push to upload new player information to firebase
			//inside .ref, create the "child" of the database called 'players'
			//.set overwrites data at the specified location
		 	//fdb.ref('players').child('playersActive').child(playerName).set(playerInfo);

		 	//create custom user updates fields for delivering messages to player and showing the most recent asset price changes
		 	var userUpdates = '<div class="user-message" id="user-message-' + playerName + '" title="communications exclusively for '+ playerName + '"></div><div class="price-asset-history" id="price-asset-history-'+ playerName +'" title = "asset price history"><div id="recent-prices"></div></div>';
		 	$('#updates-user').html(userUpdates);
		 	//this javascript was refreshing the page!!!!! but wanted to use instead of jquery right above
		 	//document.getElementById('updates-user').innerHTML(userUpdates);

		 	//
		 	//var initialPriceCustom = '<div class="asset-value" id="asset-value-' + playerName + '"</div>';
		 	//console.log(initialPriceCustom);
		 	//$('#asset-value').replaceWith(initialPriceCustom);
		 	havePlayer = true;
		 	activateAsset();
		 	//must have return false so user may press enter to play
		 	return false;
		}
		//enables user to press enter key and not refresh page by doing so
		return false;
	});
});

function showDate(){
	//http://www.w3schools.com/jsref/jsref_obj_date.asp
	var d = new Date();
	console.log(d);
	var yearCurrent = d.getFullYear();
	var monthCurrent = dateFun.calculateMonth(d.getMonth());
	var dayCurrent = dateFun.dayTwoDigits(d.getDate());
	var date = dayCurrent + ' ' + monthCurrent + ' ' + yearCurrent;
	$('#date-today').text(date);
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

function activateAsset(){
	timer.interval('setAssetPrice');	
	//special alternative situations could be: with a particular probability, when buy or sell, actual price used is higher or lower than the current price. Or only a fraction of the shares designated is actually used. or opposite of buy/sell occurs.
	//shortsell: player chooses to sell x shares; must choose to buy a total of those shares within eg 20 seconds. or else program automatically buys any shares remaining to satisfy the short sale.
}

var timer =
{
	interval: function(action){
		//set how frequently to perform timer.changeAssetValue()
		//1000 = once every 1000 milliseconds = once per 1 second
		if(action==='setAssetPrice'){
			assetPrice.setPriceInitial();
			updateUserMessage('welcome');
			timer.setTimer('welcomeTimer');
			counterWelcome = setInterval(timer.welcomeCountdown, 1000);
		}
		if(action==='changeAssetValue'){
			counterAssetValueChange = setInterval(assetPrice.changeValue, 500);
		}
	},
	timerWelcome:  0,
	setTimer: function(hello){
		if(hello==='welcomeTimer'){
			timer.timerWelcome = 5;
		}
	},
	welcomeCountdown: function(){
		if(timer.timerWelcome>1){
			$('.price-asset-history').html('prepare to begin trading in ' + timer.timerWelcome + ' seconds.');
			timer.timerWelcome --;
		}else if(timer.timerWelcome===1){
			$('.price-asset-history').html('prepare to begin trading in ' + timer.timerWelcome + ' second!');
			timer.timerWelcome --;
		}else if(timer.timerWelcome === 0){
			timer.stop('welcomeCounter');
			timer.interval('changeAssetValue');
		}
	},//stops a particular timer:
	stop: function(specificCounter){
		if(specificCounter==='welcomeCounter'){
			clearInterval(counterWelcome);
		}
		if(specificCounter==='changeAssetValueCounter'){
			clearInterval(counterAssetValueChange);
		}
	}
};

var assetPrice = {
	//sets initial asset price to random number between 20 and 200, with 2 decimal places
	setPriceInitial: function(){
		//must turn assetPriceInitial into number, otherwise without parseFloat
		//this "sometimes" returns a string? Why?
		assetPriceInitial = parseFloat((Math.random()*180 + 20).toFixed(2));
		//console.log(typeof assetPriceInitial);
		//console.log('assetpriceinitial = ' + assetPriceInitial);
		$('#asset-value').text(assetPriceInitial);
		assetPriceCurrent = assetPriceInitial;
		//console.log(typeof assetPriceCurrent);
		//console.log('asset price current = ' + assetPriceCurrent);
	},
	changeValue: function(){
		var currentPrice = assetPrice.calculateValueChange();
		//console.log('current price = ' + currentPrice);	
		$('#asset-value').text(currentPrice);
		// if("userLeavesYYYYY"){
		// 	timer.stop('changeAssetValueCounter');
		// }
	},
	calculateValueChange: function(){
		var up = null;
		var changeRatio = 0.02;
		var maxChange = changeRatio*assetPriceCurrent;
		//defines if price should go up or down. NB upChange and downChange could be 0.
		up = Math.floor(Math.random()*2);
		if(up){
			var upChange = Math.random()*maxChange;
			assetPriceCurrent += upChange;
			addToRecentPricesArray({direction: "up", change: upChange.toFixed(2)});
		} else {
			var downChange = Math.random()*maxChange;
			if((assetPriceCurrent-downChange)>=0){
				assetPriceCurrent -= downChange;
				addToRecentPricesArray({direction: "down", change: downChange.toFixed(2)});
			}else{//if no change, then will show a green 0
				addToRecentPricesArray({direction: "up", change: 0});
			}
		}
		showPricesRecent();
		return assetPriceCurrent.toFixed(2);
	}
};

function updateUserMessage(message){
	if(message==='welcome'){
		$('.user-message').html("Welcome <b>" + userName + '</b>. Your Objective: Increase your units.');
	}
}

function addToRecentPricesArray(entry){
	if(pricesMostRecent.length===10){
	//pop removes the last element of the array
	//pricesMostRecent.pop();
		pricesMostRecent.splice(0,1);
		//pricesMostRecent.unshift(entry);
		pricesMostRecent.push(entry);
	}else if(pricesMostRecent.length<10){
		pricesMostRecent.push(entry);
	}
}

function showPricesRecent(){
	//take the 10 values from pricesMostRecent array (array should already be only max length 10, per addToRecentPricesArray function)
	$('.price-asset-history').text('');
	for(var i = 0; i<pricesMostRecent.length; i++){
		var recentPrice = '';
		//var priceDiv = $('<div class="price-historic">');
		//console.log(pricesMostRecent[i].change);
		//to make sure only display actual prices, make sure entry in the array exists
		if(pricesMostRecent[i].direction==="up"){
			recentPrice = pricesMostRecent[i].change;
			//priceDiv.addClass('price-historic-up');
			var priceDiv = $('<div class="price-historic-up">');
			//priceDiv.text(recentPrice);
			//$('#recent-prices').append(priceDiv);
			//white spaces not being accounted for! argh!
			if(i===0){
				priceDiv.text(recentPrice + ' | ');
			}else if(i<9){
				priceDiv.text(' | ' + recentPrice + ' | ');
			}else{
				priceDiv.text(' | ' + recentPrice);
			}
			$('.price-asset-history').append(priceDiv);
			// if(i<9){
			// 	var spaceDiv = $('<div> hello </div>');
			// 	$('.price-asset-history').append(spaceDiv);
			// }
		}else if(pricesMostRecent[i].direction==="down"){
			recentPrice = pricesMostRecent[i].change;
			var priceDiv = $('<div class="price-historic-down">');
			if(i===0){
				priceDiv.text(recentPrice + ' | ');
			}
			else if(i<9){
				priceDiv.text(' | ' + recentPrice + ' | ');
			}else{
				priceDiv.text(' | ' + recentPrice);
			}
			//$('#recent-prices').append(priceDiv);
			$('.price-asset-history').append(priceDiv);
		}
	}
}


//check the database if the player exists.
// fdb.ref('players').child('playersActive').on('value', function(snapshot) {
// 	if(snapshot.child(userName).child('showUniqueName').exists()){
// 		console.log(userName + " exists.");
// }else{
// 	console.log("player not in firebase yet");
// }
// 	//userName = 43212345;
// 	//var doFunction = snapshot.child(userName).child('showUniqueName').val();
// 	if(doFunction){
// 		showUniqueNameFunction();
// 	}
// 	console.log("will this work?");
// 	console.log(userName);
// 	// if(snapshot.child(userName).exists()){
// 	// 	console.log("exists");
// 	// 	if(snapshot.child(playerName).child(showUniqueName).val()===true){
// 	// 		showUniqueNameFunction();
// 	// 	}
// 	// }
// });
//on disconnect, take all active player info, add to formerPlayer info, and remove user from activePlayers
//then update "record end balance": User; End Balance; Time Spent





//for youtube api inspect: https://stormy-retreat-65982.herokuapp.com/

