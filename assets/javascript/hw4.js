var game = {
	randomNumber: 0,
	yourScore:0,
	imageOneValue:0,
	imageTwoValue:0,
	imageThreeValue:0,
	imageFourValue:0,
	wins:0,
	losses:0,
	generateImageValues: function(){
		game.imageOneValue = Math.ceil(Math.random()*11 + 1);
		game.imageTwoValue = Math.ceil(Math.random()*11 +1);
		game.imageThreeValue = Math.ceil(Math.random()*11 +1);
		game.imageFourValue = Math.ceil(Math.random()*11 +1);
		game.randomNumber = Math.ceil(Math.random()*101+19);
		game.yourScore=0;
		$("#random-number").html(game.randomNumber);
		$("#your-score").html(game.yourScore);
		$("#win-status").html("Good luck!");
		console.log(game.imageOneValue +" " +game.imageTwoValue+" "+ game.imageThreeValue+" "+ game.imageFourValue);
		console.log("random number= " + game.randomNumber);
	},
	winCheck: function(){
		if(game.yourScore===game.randomNumber){
			game.wins++;
			$("#wins-count").html(game.wins);
			$("#win-status").html("You win.");
			game.startNewGame();
		}
		else if(game.yourScore>game.randomNumber){
			game.losses++;
			$("#losses-count").html(game.losses);
			$("#win-status").html("Try a new game :(");
			game.startNewGame();			
		}
	},
	startNewGame: function(){
		game.generateImageValues();
	}
};

$(document).ready(function(){
	game.generateImageValues();
		$("#image1").on("click",function(){
			game.yourScore += game.imageOneValue;
			$("#your-score").html(game.yourScore);
			game.winCheck();
		});
		$("#image2").on("click",function(){
			game.yourScore += game.imageTwoValue;
			$("#your-score").html(game.yourScore);
			game.winCheck();
		});
		$("#image3").on("click",function(){
			game.yourScore += game.imageThreeValue;
			$("#your-score").html(game.yourScore);
			game.winCheck();
		});
		$("#image4").on("click",function(){
			game.yourScore += game.imageFourValue;
			$("#your-score").html(game.yourScore);
			game.winCheck();
		});
});