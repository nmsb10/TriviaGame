$(document).ready(function(){
	$("#start-button").on("click",function(){
		$("#start-button").hide();
		//console.log(game.qa);
		// game.qa = qaOriginal;
		$("#timer").html("[timer]");
		game.generateQuestion();
	});
});

var game =
{
	qaOriginal:
	[
		{
			question: "Why do informed renters work with a real estate broker?",
			answersIncorrect: ["They prefer to search tons of websites and drive around everywhere by themself.","They enjoy personally interacting with countless landlords, landlord's real estate brokers, and management company employees.","Working with a real estate broker means the landlord and/or their broker will take advantage of me."],
			answer: "They want an advocate on their team who works only for them, to achieve the best outcome possible.",
			explanation: "A renter who works with a broker, enjoys having an advocate on their side, to help them find the best rental possible at the fairest rent price, with lease terms most agreeable to the client."
		},
		{
			question: "What would a renter pay Jonathon for his brokerage services?",
			answersIncorrect: ["one month's rent","one-half month's rent","flat $500 fee","first born child"],
			answer: "$0",
			explanation: "Renters have no out-of-pocket costs to hire Jonathon. In return for their client relationship and trust, Jonathon gives his clients the advantages of fully understanding the salient market, seeing all rental listings fitting their criteria, and helping them find the best rental possible at the fairest rent price. Plus, Jonathon handles the hassle of organizing and scheduling all showings. In addition, renters receive negotiating advice, guidance with the lease application, lease contract, addendums, disclosures and everything else related to their lease."
		},
		{
			question: "Does Jonathon send me every listing that matches my search criteria from the Multiple Listing Service (MLS)?",
			answersIncorrect: ["false"],
			answer: "true",
			explanation: "Of the thousands of member brokerages and individual real estate broker and leasing agent members of the MLS, Jonathon sends his renters EVERY listing that matches the client's home criteria, regardless of who the listing broker or brokerage is. This means renters rely on Jonathon to receive the most comprehensive selection of properties possible from which to choose their new home."
		},
		{
			question: "What does a renter working with Jonathon do if their rental situation or needs change?",
			answersIncorrect: ["Keep Jonathon working on the old search criteria.","Start working with another broker for the \"new search\".", "Just stop corresponding with Jonathon.", "Begin calling on rental listings directly with the landlords or the landlord brokers."],
			answer: "Inform Jonathon immediately.",
			explanation: "If Jonathon's clients decide they want to modify any of their search criteria (increase or decrease #bedrooms, neighborhood, amenities, property type, specific building(s), location, budget, etc) or have new / updated preferences, Jonathon can accommodate anything and send you updated listings right away. Jonathon's clients receive top-notch brokerage service and representation."
		},
		{
			question: "What is a \"pocket listing\" or an \"exempt listing\"?",
			answersIncorrect: ["listing for a home that fits in a pocket","a listing only for rich people","listings only for people the landlord personally likes"],
			answer: "a listing not yet activated in the MLS",
			explanation: "The time between when a landlord signs a listing agreement with their broker and when the broker \"activates\" the listing in the MLS, is considered the listing's exempt period. The landlord's broker might advertise the listing during this time, but usually the landlord's broker prepares marketing materials and ensures the property is in the best condition possible for when they officially activate the listing in the MLS."
		},
		{
			question: "If I rent directly from the landlord (or even the landlord's broker), shouldn't I be able to get a better deal because I just eliminated at least one of the \"brokerage middlemen\"?",
			answersIncorrect: ["true"],
			answer: "false",
			explanation: "Economically, rentals rented at Market Rates take into account this broker compensation. Landlords usually act benevolently only if it benefits them (and reducing the rent usually does not benefit the landlord). Why would a renter work with the landlord or the landlord's broker, when those parties only care about the landlord's interests? Jonathon fully protects and advocates for his clients' interests."
		},
		{
			question: "These factors enhance my desirability from the landlord's perspective EXCEPT:",
			answersIncorrect: ["I would consider a multi-year lease","The rent + my monthly debt obligations, divided by my gross monthly income, is less than 30%","I'm a non-smoker and have no pets","My FICO score is 800+"],
			answer: "I have a history of trashing where I live, and the landlord needs to \"trust\" me that my income supports the asking rent.",
			explanation: "Rational landlords consider two primary factors when evaluating potential renters. One: will the renter pay the rent as agreed in full and on time? Two: will the renter treat the property with respect?"
		},
		{
			question: "With Chicagoland rentals, these items are typically included in the monthly rent EXCEPT:",
			answersIncorrect: ["water","the refrigerator, stove, dishwasher","basic cable television","other appliances such as in-unit clothes washer and dryer"],
			answer: "electricity",
			explanation: "Most landlords (both for single family homes and condos) require the tenant to pay for their own electricity use. Some renters moving from outside the Chicagoland area are surprised to learn appliances currently in the property will remain in the property for the duration of the lease. With many condo building rentals, basic cable is usually included, and sometimes heat, AC, and cooking gas (but confirm first with the individual property)."
		}
	],
	qa: [{
			question: "Why do informed renters work with a real estate broker?",
			answersIncorrect: ["They prefer to search tons of websites and drive around everywhere by themself.","They enjoy personally interacting with countless landlords, landlord's real estate brokers, and management company employees.","Working with a real estate broker means the landlord and/or their broker will take advantage of me."],
			answer: "They want an advocate on their team who works only for them, to achieve the best outcome possible.",
			explanation: "A renter who works with a broker, enjoys having an advocate on their side, to help them find the best rental possible at the fairest rent price, with lease terms most agreeable to the client."
		},
		{
			question: "What would a renter pay Jonathon for his brokerage services?",
			answersIncorrect: ["one month's rent","one-half month's rent","flat $500 fee","first born child"],
			answer: "$0",
			explanation: "Renters have no out-of-pocket costs to hire Jonathon. In return for their client relationship and trust, Jonathon gives his clients the advantages of fully understanding the salient market, seeing all rental listings fitting their criteria, and helping them find the best rental possible at the fairest rent price. Plus, Jonathon handles the hassle of organizing and scheduling all showings. In addition, renters receive negotiating advice, guidance with the lease application, lease contract, addendums, disclosures and everything else related to their lease."
		},
		{
			question: "Does Jonathon send me every listing that matches my search criteria from the Multiple Listing Service (MLS)?",
			answersIncorrect: ["false"],
			answer: "true",
			explanation: "Of the thousands of member brokerages and individual real estate broker and leasing agent members of the MLS, Jonathon sends his renters EVERY listing that matches the client's home criteria, regardless of who the listing broker or brokerage is. This means renters rely on Jonathon to receive the most comprehensive selection of properties possible from which to choose their new home."
		},
		{
			question: "What does a renter working with Jonathon do if their rental situation or needs change?",
			answersIncorrect: ["Keep Jonathon working on the old search criteria.","Start working with another broker for the \"new search\".", "Just stop corresponding with Jonathon.", "Begin calling on rental listings directly with the landlords or the landlord brokers."],
			answer: "Inform Jonathon immediately.",
			explanation: "If Jonathon's clients decide they want to modify any of their search criteria (increase or decrease #bedrooms, neighborhood, amenities, property type, specific building(s), location, budget, etc) or have new / updated preferences, Jonathon can accommodate anything and send you updated listings right away. Jonathon's clients receive top-notch brokerage service and representation."
		},
		{
			question: "What is a \"pocket listing\" or an \"exempt listing\"?",
			answersIncorrect: ["listing for a home that fits in a pocket","a listing only for rich people","listings only for people the landlord personally likes"],
			answer: "a listing not yet activated in the MLS",
			explanation: "The time between when a landlord signs a listing agreement with their broker and when the broker \"activates\" the listing in the MLS, is considered the listing's exempt period. The landlord's broker might advertise the listing during this time, but usually the landlord's broker prepares marketing materials and ensures the property is in the best condition possible for when they officially activate the listing in the MLS."
		},
		{
			question: "If I rent directly from the landlord (or even the landlord's broker), shouldn't I be able to get a better deal because I just eliminated at least one of the \"brokerage middlemen\"?",
			answersIncorrect: ["true"],
			answer: "false",
			explanation: "Economically, rentals rented at Market Rates take into account this broker compensation. Landlords usually act benevolently only if it benefits them (and reducing the rent usually does not benefit the landlord). Why would a renter work with the landlord or the landlord's broker, when those parties only care about the landlord's interests? Jonathon fully protects and advocates for his clients' interests."
		},
		{
			question: "These factors enhance my desirability from the landlord's perspective EXCEPT:",
			answersIncorrect: ["I would consider a multi-year lease","The rent + my monthly debt obligations, divided by my gross monthly income, is less than 30%","I'm a non-smoker and have no pets","My FICO score is 800+"],
			answer: "I have a history of trashing where I live, and the landlord needs to \"trust\" me that my income supports the asking rent.",
			explanation: "Rational landlords consider two primary factors when evaluating potential renters. One: will the renter pay the rent as agreed in full and on time? Two: will the renter treat the property with respect?"
		},
		{
			question: "With Chicagoland rentals, these items are typically included in the monthly rent EXCEPT:",
			answersIncorrect: ["water","the refrigerator, stove, dishwasher","basic cable television","other appliances such as in-unit clothes washer and dryer"],
			answer: "electricity",
			explanation: "Most landlords (both for single family homes and condos) require the tenant to pay for their own electricity use. Some renters moving from outside the Chicagoland area are surprised to learn appliances currently in the property will remain in the property for the duration of the lease. With many condo building rentals, basic cable is usually included, and sometimes heat, AC, and cooking gas (but confirm first with the individual property)."
		}],
	correctAnswerResponse: ["Good job.", "Correct.","That's right.","Yes.","That's right!"],
	incorrectAnswerResponse: ["The correct answer is:","The right answer is:"],
	userCorrectAnswers: 0,
	userIncorrectAnswers: 0,
	userUnansweredAnswers: 0,
	currentSelection: 0,
	currentQuestion: "",
	correctAnswerPlace:0,
	userSelection:"",
	percentageCorrect:0,
	questionTimer:0,
	answerTimer:0,
	userScores:[],
	gameAttempts:0,
	// counter:0,
	answeredQuestion:false,
	//http://www.w3schools.com/jsref/met_win_setinterval.asp
	generateQuestion: function(){
		//console.log(game.questionsRemaining() + ": questions are remaining");
		game.answeredQuestion = false;
		if(game.questionsRemaining()){
			game.setQuestionTimer();
			game.timeTheUserOnQuestion();
			//randomly choose a question from remaining elements in the game.qa array
			game.currentSelection = Math.floor(Math.random()*game.qa.length);
			game.currentQuestion = game.qa[game.currentSelection].question;
			//console.log(game.currentSelection);
			//choose the random array element location of (game.qa[game.currentSelection].answersIncorrect.length+1) answers for the correct answer
			game.correctAnswerPlace = Math.floor(Math.random()*(game.qa[game.currentSelection].answersIncorrect.length + 1));
			//console.log("correct answer place is " + game.correctAnswerPlace);
			var totalAnswerCount = game.qa[game.currentSelection].answersIncorrect.length + 1;
			//console.log("total answers for this question are: " + totalAnswerCount);
			//create a currentAnswers array to hold all incorrect and the one correct answer, for the current question.
			var currentAnswers = [];
			//populate currentAnswers array with answers randomly presented
			//WHY will statement 2 in this for loop not take the content of the totalAnswerCount variable instead???
			for(var i = 0; i < totalAnswerCount; i++){
				var chooseRandomWrongAnswer = 0;
				if(i === game.correctAnswerPlace){
					currentAnswers.push(game.qa[game.currentSelection].answer);
				}
				else{
					chooseRandomWrongAnswer = Math.floor(Math.random()*game.qa[game.currentSelection].answersIncorrect.length);
					//console.log(chooseRandomWrongAnswer);
					currentAnswers.push(game.qa[game.currentSelection].answersIncorrect[chooseRandomWrongAnswer]);
					//console.log(game.qa[game.currentSelection].answersIncorrect);
					game.qa[game.currentSelection].answersIncorrect.splice(chooseRandomWrongAnswer,1);
					//console.log(game.qa[game.currentSelection].answersIncorrect + " answersIncorrect remaining");
				}
			}
			//console.log("current answer array is " + currentAnswers);
			$("#question").html(game.currentQuestion);
			var choices = "";
			for(var i = 0; i<currentAnswers.length; i++){
				choices += "<div class='text possible-answer' id='"+ i + "'>" + currentAnswers[i] + "</div>";
				//would this work??
				//$("#answers").append(choices);
			}
			$("#answers").html(choices);
			var questionNumber = 9 - game.qa.length;
			$("#question-status").html("<hr style='width:80%;'>question: " + questionNumber + " of 8");
			//very important! put the check response here!!!
			game.checkResponse();
		} else {
			game.stop();
			//after all questions completed, final page says, "here's how you did:"
			//display userCorrectAnswers, userIncorrectAnswers, userUnanswered, percentageCorrect=correct/totalnumberofquestions
			//display "start over" button
			//start over button restarts at ga.qaOriginal (as game.qa has been depleted to nothing)
			//reset usercorrect and incorrect response counts, etc.
			$("#question").html("Congratulations. You completed the<br/>\"Renters: Working with a Real Estate Broker\"<br/>quiz.");
			$("#answers").html("<div class='text'>" + "Here's how you did:" + "</div>");
			$("#answers").append("<div class='text'> Correct Answers: " + game.userCorrectAnswers + "</div>");
			$("#answers").append("<div class='text'> Incorrect Answers: " + game.userIncorrectAnswers + "</div>");
			$("#answers").append("<div class='text'> Questions not answered: " + game.userUnansweredAnswers + "</div>");
			game.percentageCorrect = ((game.userCorrectAnswers *100) / (game.userCorrectAnswers + game.userIncorrectAnswers + game.userUnansweredAnswers)).toFixed(2);
			game.userScores.push(game.percentageCorrect);
			game.gameAttempts ++;
			if(game.userScores.length===1){
				$("#content-summary-text-2").append("<br/><br/><h2 id='user-score'>your scores: " + game.userScores + "%</h2>");
			}else{
				$("#user-score").append(", " + game.userScores[game.gameAttempts-1] + "%");
			}
			$("#answers").append("<div class='text'>Your Score: " + game.percentageCorrect + "%</div>");
			$("#answers").append("<button id='start-button' class='start-over' title='take this quiz again'>try again</button>");
			//$("#answers").append("<br/><br/><iframe width='560' height='315' src='https://www.youtube.com/embed/-_uQrjktq2w' frameborder='0' allowfullscreen></iframe>");
			$("#answers").append("<br/><br/><iframe width='448' height='252' src='https://www.youtube.com/embed/-_uQrjktq2w' frameborder='0' allowfullscreen></iframe>");
			$("#question-status").html("<hr style='width:80%;'>Stick a fork in me. I'm done.");
			game.startOver();
		}
	},
	questionsRemaining: function(){
		//first check if game.qa array is empty. if empty, show final page
		//with user results and start over button
		//if questions are remaining, game.generateQuestion()
		if(game.qa.length===0){
			return false;
		}
		else{
			return true;
		}
	},
	setQuestionTimer:function(){
		game.questionTimer = 31;
		console.log("question timer set!");
	},	
	timeTheUserOnQuestion: function(){
		counter = setInterval(game.decrement, 1000);
		console.log("timeTheUserOnQuestion initiated!");
	},
	decrement: function(){
		console.log("game.decrement initiated");
		game.questionTimer --;
		$("#timer").html("time remaining: " + game.questionTimer + " seconds");
		//putting game.checkResponse here screwed up the program when user clicked on potential answer??
		//game.checkResponse();
		if(game.answeredQuestion===true){
			game.stop();
		}else if(game.questionTimer === 1){
			$("#timer").html("time remaining: " + game.questionTimer + " second!");
		}else if(game.questionTimer === 0){
			game.stop();
			console.log(game.qa[game.currentSelection]);
			console.log(game.currentSelection + " = contents of game.currentSelection");
			console.log("contents of game.qa currentSelection below:");
			console.log(game.qa[game.currentSelection]);
			game.userUnansweredAnswers ++;
			$("#answers").html("<div class='text'>" + game.incorrectAnswerResponse[Math.floor(Math.random()*game.incorrectAnswerResponse.length)] + "</div>");
			$("#answers").append("<div class='text'>" + game.qa[game.currentSelection].answer + "</div>");
			$("#answers").append("<div class='text' style='text-align: justify;'>" + game.qa[game.currentSelection].explanation + "</div>");
			game.qa.splice(game.currentSelection,1);
			game.setAnswerTimer();
			game.timedAnswerReveal();
		}
	},
	checkResponse:function(){
		$(".possible-answer").on("click",function(){
			//game.answeredQuestion = true;//this stops the timer if user picks an answer.
			//setting game.amsweredQuestion to true makes the game.decrement function perform game.stop();
			console.log("user clicked on an answer? " + game.answeredQuestion);
			console.log("id of this possible answer is " + $(this).attr("id"));
			console.log("correct answer place is " + game.correctAnswerPlace);
			//if user selection is correct:
			console.log(game.userCorrectAnswers + " answers user got correct");
			console.log(game.currentSelection + " = contents of game.currentSelection");
			console.log("contents of game.qa currentSelection below:");
			console.log(game.qa[game.currentSelection]);
			if($(this).attr("id") === game.correctAnswerPlace.toString()){
				game.stop();
				game.userCorrectAnswers ++;
				console.log(game.userCorrectAnswers + " userCorrectAnswers");
				$("#answers").html("<div class='text'>" + game.correctAnswerResponse[Math.floor(Math.random()*game.correctAnswerResponse.length)] + "</div>");
				$("#answers").append("<div class='text'>" + game.qa[game.currentSelection].answer + "</div>");
				$("#answers").append("<div class='text' style='text-align: justify;'>" + game.qa[game.currentSelection].explanation + "</div>");
				console.log(game.qa.length);
				game.qa.splice(game.currentSelection,1);
				console.log("number of possible questions left is " + game.qa.length);
				game.setAnswerTimer();
				game.timedAnswerReveal();
			} else{
				game.stop();
				game.userIncorrectAnswers ++;
				$("#answers").html("<div class='text'>" + game.incorrectAnswerResponse[Math.floor(Math.random()*game.incorrectAnswerResponse.length)] + "</div>");
				$("#answers").append("<div class='text'>" + game.qa[game.currentSelection].answer + "</div>");
				$("#answers").append("<div class='text' style='text-align: justify;'>" + game.qa[game.currentSelection].explanation + "</div>");
				console.log(game.qa.length);
				game.qa.splice(game.currentSelection,1);
				console.log("number of possible questions left is " + game.qa.length);
				game.setAnswerTimer();
				game.timedAnswerReveal();
			}

			//remove this game.qa array element from available elements so
			//the same question cannot be asked during this session
			// use the splice method to remove the one element at
			//index game.currentSelection, without leaving a "undefined" "hole" in the game.qa array
			
			// console.log(game.qa.length);
			// game.qa.splice(game.currentSelection,1);
			// console.log("number of possible questions left is " + game.qa.length);
			// game.setAnswerTimer();
			// game.timedAnswerReveal();
		});
	},
	setAnswerTimer: function(){
		game.answerTimer = 21;
		console.log("answer timer set!");
	},	
	timedAnswerReveal: function(){
		counter = setInterval(game.answerReveal, 1000);
		console.log("timedAnswerReveal initiated!");
	},
	answerReveal: function(){
		console.log("game.answerReveal initiated");
		game.answerTimer --;
		if(game.answerTimer === 0){
			game.stop();
			console.log("stop function used! in game.answerReveal");
			game.generateQuestion();
		}
	},
	stop: function(){
		console.log("stop function used!");
		clearInterval(counter);
		console.log(counter);
	},
	startOver:function(){
		$(".start-over").on("click",function(){
			console.log(qaOOO);
			game.qa = game.qaOriginal;
			console.log(game.qa);
			$("#timer").html("timer");
			$("#question").html("");
			$("#answers").html("");
			game.userCorrectAnswers = 0;
			game.userIncorrectAnswers = 0;
			game.userUnansweredAnswers = 0;
			game.setQuestionTimer();
			game.generateQuestion();
		});
	}
};

//remember: first global variables, then objects, then calls
//WHY does game.qaOriginal get empty after all questions are asked???
var qaOOO = [
		{
			question: "question one here",
			answersIncorrect: ["wrong 1","wrong 2","wrong 3"],
			answer: "answer to question one here.",
			explanation: "This answer makes sense because explanation."
		},
		{
			question: "question two here",
			answersIncorrect: ["wrong 1","wrong 2","wrong 3","wrong 4"],
			answer: "answer to question two here.",
			explanation: "Answer is correct because explanation."
		},
		{
			question: "question three here",
			answersIncorrect: ["false"],
			answer: "true",
			explanation: "This is true because explanation."
		},
		{
			question: "question four here",
			answersIncorrect: ["wrong 1","wrong 2","wrong 3"],
			answer: "answer to question four here.",
			explanation: "This answer is correct because explanation."
		},
		{
			question: "question five here",
			answersIncorrect: ["wrong 1","wrong 2"],
			answer: "answer to question five here.",
			explanation: "Answer makes sense because explanation."
		}
	];



// overall work structure:
// 1. get html working
// 2. get questions loading
// 3. get timer working

//user clicks start button
// https://api.jquery.com/category/events/mouse-events/
//new page with: time remaining: 30 seconds, counts down
//display question
//display possible answers, when mouse hover, show background+ border

//if user clicks answer (userSelection) prior to 30 seconds, show new page and check if answer is correct
//if correct, add 1 to userCorrectAnswers and display (random) correctAnswerResponse. Timer for 5 seconds on this page.

//if userSelection is incorrect OR 30 seconds goes to 0 seconds,
//add one to userIncorrectAnswers (if incorrect) or add 1 to userUnanswered if no userSelection and time=0
//display (random) incorrectAnswerResponse, and below say, "The correct answer is" + answer. Timer for 5 seconds on this page.

//after 5 seconds, load next question automatically and reset timer to 30 seconds