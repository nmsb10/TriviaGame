//remember: first global variables, then objects, then calls
var game =
{
	qaOriginal:
	[
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
	],
	qa: [],
	correctAnswerResponse: ["Good job.", "Correct.","That's right."],
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
	timerAnswer:5,
	counter:0,
	answeredQuestion:false,
	//http://www.w3schools.com/jsref/met_win_setinterval.asp
	timeTheUserOnQuestion: function(){
		game.counter = setInterval(game.decrement, 1000);
	},
	setQuestionTimer:function(){
		game.questionTimer = 21;
	},
	decrement: function(){
		game.questionTimer --;
		$("#timer").html("time remaining: " + game.questionTimer + " seconds");
		game.checkResponse();
		if(game.questionTimer === 1){
			$("#timer").html("time remaining: " + game.questionTimer + " second!");
		}
		if(game.questionTimer === 0){
			game.stop();
			game.userUnansweredAnswers ++;
			$("#answers").html("<div class='text'>" + game.incorrectAnswerResponse[Math.floor(Math.random()*game.incorrectAnswerResponse.length)] + "</div>");
			$("#answers").append("<div class='text'>" + game.qa[game.currentSelection].answer + "</div>");
			$("#answers").append("<div class='text'>" + game.qa[game.currentSelection].explanation + "</div>");
		}
		if(game.answeredQuestion===true){
			game.stop();
		}
	},
	stop: function(){
		clearInterval(game.counter);
	},
	questionsRemaining: function(){
		//first check if game.qa array is empty. if empty, show final page
		//with user results and start over button
		//if questions are remaining, game.generateQuestion()
		if(game.qa.length===0){
			return false;
		}
	},
	generateQuestion: function(){
		// game.questionsRemaining();
		// game.timeTheUserOnQuestion();
		//randomly choose a question from remaining elements in the game.qa array
		game.currentSelection = Math.floor(Math.random()*game.qa.length);
		game.currentQuestion = game.qa[game.currentSelection].question;
		//choose the random array element location of (game.qa[game.currentSelection].answersIncorrect.length+1) answers for the correct answer
		game.correctAnswerPlace = Math.floor(Math.random()*(game.qa[game.currentSelection].answersIncorrect.length + 1));
		console.log("correct answer place is " + game.correctAnswerPlace);
		console.log("current answer array is " + game.currentAnswers);
		var totalAnswerCount = game.qa[game.currentSelection].answersIncorrect.length + 1;
		var currentAnswers = [];
		//populate currentAnswers array with answers randomly presented
		//WHY will statement 2 in this for loop not take the content of the totalAnswerCount variable instead???
		for(var i = 0; i < totalAnswerCount; i++){
			console.log(i);
			var chooseRandomWrongAnswer = 0;
			if(i === game.correctAnswerPlace){
				currentAnswers.push(game.qa[game.currentSelection].answer);
			}
			else{
				chooseRandomWrongAnswer = Math.floor(Math.random()*game.qa[game.currentSelection].answersIncorrect.length);
				console.log(chooseRandomWrongAnswer);
				currentAnswers.push(game.qa[game.currentSelection].answersIncorrect[chooseRandomWrongAnswer]);
				console.log(game.qa[game.currentSelection].answersIncorrect);
				game.qa[game.currentSelection].answersIncorrect.splice(chooseRandomWrongAnswer,1);
			}
			console.log("current answer array is " + currentAnswers);
		}
		$("#question").html(game.currentQuestion);
		var choices = "";
		for(var i = 0; i<currentAnswers.length; i++){
			choices += "<div class='text possible-answer' id='"+ i + "'>" + currentAnswers[i] + "</div>";
			//would this work??
			//$("#answers").append(choices);
			console.log(choices);
		}
		$("#answers").html(choices);

		// $("#answer1").html(currentAnswers[0]);
		// $("#answer2").html(currentAnswers[1]);
		// $("#answer3").html(currentAnswers[2]);
		// $("#answer4").html(currentAnswers[3]);
		// $("#answer5").html(currentAnswers[4]);
	},
	checkResponse:function(){
		$(".possible-answer").on("click",function(){
			game.answeredQuestion = true;
			console.log("id of this possible answer is " + $(this).attr("id"));
			console.log("correct answer place is " + game.correctAnswerPlace);
			//if user selection is correct:
			console.log(game.userCorrectAnswers);
			if($(this).attr("id") === game.correctAnswerPlace.toString()){
				game.userCorrectAnswers ++;
				console.log(game.userCorrectAnswers);
				$("#answers").html("<div class='text'>" + game.qa[game.currentSelection].answer + "</div>");
				$("#answers").append("<div class='text'>" + game.correctAnswerResponse[Math.floor(Math.random()*game.correctAnswerResponse.length)] + "</div>");
				$("#answers").append("<div class='text'>" + game.qa[game.currentSelection].explanation + "</div>");
			} else{
				game.userIncorrectAnswers ++;
				$("#answers").html("<div class='text'>" + game.incorrectAnswerResponse[Math.floor(Math.random()*game.incorrectAnswerResponse.length)] + "</div>");
				$("#answers").append("<div class='text'>" + game.qa[game.currentSelection].answer + "</div>");
				$("#answers").append("<div class='text'>" + game.qa[game.currentSelection].explanation + "</div>");
			}
			//remove this game.qa array element from available elements so
			//the same question cannot be asked during this session
			// use the splice method to remove the one element at
			//index game.currentSelection, without leaving a "undefined" "hole" in the game.qa array
			console.log(game.qa.length);
			game.qa.splice(game.currentSelection,1);
			console.log("number of possible questions left is " + game.qa.length);
		});
	}
}

$(document).ready(function(){
	$("#start-button").on("click",function(){
		$("#start-button").hide();
		game.qa = game.qaOriginal;
		// game.questionsRemaining();
		game.setQuestionTimer();
		game.generateQuestion();
		game.timeTheUserOnQuestion();
		// game.checkResponse();
	});
});

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

//after all questions completed, final page says, "here's how you did:"
//display userCorrectAnswers, userIncorrectAnswers, userUnanswered, percentageCorrect=correct/totalnumberofquestions
//display "start over" button
//start over button restarts at ga.qaOriginal (as game.qa has been depleted to nothing)
//reset usercorrect and incorrect response counts, etc.