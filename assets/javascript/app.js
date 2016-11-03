//remember: first global variables, then objects, then calls
var entireGame = {
	wordBank: ["seller", "buyer", "investor", "landlord", "renter", "broker", "contract", "home inspection", "mortgage", "cash offer", "closing", "attorney", "full price offer", "multiple offer", "contingency", "staging"],
	currentWord: "",
	currentLetter: "",
	guessesRemaining: 13,
	//formerly made underscoresDisplayed as an array, but this separated every letter with a comma
	underscoresDisplayed: "",
	lettersGuessed: [],
	lettersGuessedInternal: [],
	lettersDisplayed: [],
	wins: 0,
	attempts: 0,
	winPercentage: 0,
	gameMessage: "",
	winMessage: ["You win AGAIN. Good job. Try another!", "You're on fire! Can you do another?", "Fantastic! Another WIN for You! :)"],

	updateScore: function(){
		document.getElementById("score").innerHTML = entireGame.wins;
	},

	refreshLetterSpaces: function(){
		entireGame.underscoresDisplayed = "";
		document.getElementById("letter-spaces").innerHTML = entireGame.underscoresDisplayed;
	},

	refreshLettersGuessed: function(){
		entireGame.lettersGuessed = [];
		entireGame.lettersGuessedInternal = [];
		document.getElementById("letters-guessed").innerHTML = "???";
	},

	resetGuessesRemaining: function(){
		entireGame.guessesRemaining=13;
		document.getElementById("guesses-remaining").innerHTML = entireGame.guessesRemaining;
	},

	addWinningWord: function(){
		var winningWordList = document.getElementById("winning-words");
		var winningWords = document.createElement("ul");

		winningWordList.appendChild(winningWords);

		var newWinningWord = document.createElement("li");
		newWinningWord.innerHTML = entireGame.currentWord.toUpperCase();

		winningWords.appendChild(newWinningWord);
		//document.getElementById("winning-words").innerHTML = entireGame.currentWord.toUpperCase();
		//remove a winning word from the wordBank array
		for(var i = 0;i<entireGame.wordBank.length;i++){
			if(entireGame.currentWord===entireGame.wordBank[i]){
				//the splice method will remove the one element at
				//index i, without leaving a "undefined" "hole" in the wordBank array
				entireGame.wordBank.splice(i,1);
				console.log("potential words left include: " + entireGame.wordBank);
			}
		}
		if(entireGame.wordBank.length===0){
			document.getElementById("game-message").innerHTML = "Awesome! You correctly guessed ALL the words. A+!";
			document.getElementById("score").innerHTML = "<img src='./assets/images/goodjob.JPG' alt='you won' style='width:350px'>";
		}
    },

	addAttempt: function(){
		entireGame.attempts ++;
	},

	addWin: function(){
		entireGame.wins ++;
	},

	//to be clear, the win percentage reflects total wins divided by
	//the total completed attempts (so does not include the current partially
	//completed attempt in the calculation).
	//I might want separate "completed attempts" and "current game #" fields...
	calculateWinPercentage: function(){
		var netAttempts = entireGame.attempts - 1;
		if(netAttempts<1){
			entireGame.winPercentage = (entireGame.wins / entireGame.attempts) * 100;
		}
		else{
			entireGame.winPercentage = (entireGame.wins / netAttempts) * 100;
		}
		entireGame.winPercentage = entireGame.winPercentage.toFixed(2);
		document.getElementById("attempts-win-percentage").innerHTML = entireGame.attempts + " | " + entireGame.winPercentage + "%";		
	},

	selectWord: function(){
		//Math.floor(x) returns the value of x rounded down to its nearest integer
		//Math.random() returns a random number between 0 (inclusive), and 1 (exclusive)
		entireGame.currentWord = entireGame.wordBank[Math.floor(Math.random() * entireGame.wordBank.length)];
	},

	populateUnderscoresDisplayed: function(){
		entireGame.underscoresDisplayed = "";
		//use currentWord.length-1 because the last letter will be a letter
		//with no space afterwards. Use this if you plan to add "_ " per letter.
		//otherwise can use upper boundary of currentword.length, and not have the 
		//final underscoresDisplayed string addition of "_" 
		for(var i = 0; i < entireGame.currentWord.length-1; i++){
			function isLetter(check){
				//make sure for what you are checking will be in [a-z]
				return check.match(/[a-z]/gi);
			}
			if(isLetter(entireGame.currentWord.charAt(i))){
				entireGame.underscoresDisplayed += "_";
			}
			else{
				//remember: spaces in html and javascript are different.
				//instead of "  ", you need to define your spaces as &nbsp;
				entireGame.underscoresDisplayed += " ";
			}
		}		
		entireGame.underscoresDisplayed += "_";
	},

	fillLetterSpaces: function(){
		document.getElementById("letter-spaces").innerHTML = entireGame.underscoresDisplayed;
	},

	specialWinMessage: function(){
		document.getElementById("game-message").innerHTML =  entireGame.winMessage[Math.floor(Math.random() * entireGame.winMessage.length)];
	},

	userGuessesLetter: function(){
		document.onkeyup = function(event){
			var userChoice = String.fromCharCode(event.keyCode).toLowerCase();
			var goodLetter = false;
			var letterAlreadyGuessed = false;
			//need to first check that the letter is not in lettersGuessed
			//console.log("letters already guessed: " + entireGame.lettersGuessedInternal);
			//console.log("current user guess: "+ userChoice);
			for(var i = 0; i<entireGame.lettersGuessedInternal.length; i++){
				if(userChoice===entireGame.lettersGuessedInternal[i]){
					letterAlreadyGuessed = true;
					document.getElementById("game-message").innerHTML = "You already tried that letter.";
				}
			}
			//if the letter was NOT already guessed, add to the lettersGuessedInternal array
			if(!letterAlreadyGuessed){
				//remember also: pop("element") = deletes the last element in an array
				//pop(element) = adds element to the end of the array
				entireGame.lettersGuessedInternal.push(userChoice);
			}
			//console.log("letters guessed: " + entireGame.lettersGuessedInternal);
			if(!letterAlreadyGuessed){
				//check if the userChoice is in the currentWord
				for(var i = 0; i<entireGame.currentWord.length; i++){
					//console.log(entireGame.currentWord.charAt(i));
					if(userChoice===entireGame.currentWord.charAt(i)){
						//console.log(entireGame.underscoresDisplayed.substring(0,i));
						//console.log(userChoice);
						//console.log(entireGame.underscoresDisplayed.substring(i,entireGame.underscoresDisplayed.length));
						//replace the userChoice letter as a capital letter in the
						//correct position in underscoresDisplayed
						//(need to separate underscoredDisplayed into 3 strings and then concatenate)
						entireGame.underscoresDisplayed = entireGame.underscoresDisplayed.substring(0,i) + userChoice.toUpperCase() + entireGame.underscoresDisplayed.substring(i+1,entireGame.underscoresDisplayed.length);
						goodLetter = true;
					}
					if(goodLetter){
						document.getElementById("game-message").innerHTML = "You guessed a good letter!";
					}
				}
				//update the letter-spaces ID with the new underscoresDisplayed
				document.getElementById("letter-spaces").innerHTML = entireGame.underscoresDisplayed;
				//if userChoice is not already guessed AND not in currentWord,
				//reduce guessesRemaining
				if(!goodLetter){
					entireGame.guessesRemaining = entireGame.guessesRemaining -1;
					document.getElementById("guesses-remaining").innerHTML = entireGame.guessesRemaining;
					document.getElementById("game-message").innerHTML = "Try another letter.";
				}
				entireGame.lettersGuessed.push(" " + userChoice.toUpperCase());
				document.getElementById("letters-guessed").innerHTML = entireGame.lettersGuessed;
			}

			//check if all letters guessed are in the selected word
			//if yes, 1. message congratulates player and says try another!, 2. wins (updateScore) AND attempts increases one, 2.25 add winning word to winning-stats counter, 2.35 remove word from wordBank, 2. 5 calculate win percentage,
			//3. select a new word, 4. reset guesses to 13, 5. reset letters guessed AND lettersguessedinternal
			if(entireGame.underscoresDisplayed===entireGame.currentWord.toUpperCase()){
				if(entireGame.wins===0){
					document.getElementById("game-message").innerHTML = "Congratulations! You WIN. Try another word!";
				}
				else if(entireGame.wins>0){
					entireGame.specialWinMessage();
				}
				entireGame.addAttempt();
				entireGame.addWin();
				entireGame.updateScore();
				entireGame.calculateWinPercentage();
				//addWinningWord MUST come before selectWord (selecting a new word)
				entireGame.addWinningWord();
				entireGame.selectWord();
				entireGame.resetGuessesRemaining();
				entireGame.populateUnderscoresDisplayed();
				entireGame.refreshLettersGuessed();
				entireGame.fillLetterSpaces();
				console.log(entireGame.currentWord);
			}

			//check if guesses remaining = 0. 
			//if yes, 1. message says no more guesses, try another word, better luck!, 2. attempts increases one,  2. 5 calculate win percentage,
			//3. select a new word, 4. reset guesses to 13, 5. reset letters guessed AND lettersguessedinternal
			if(entireGame.guessesRemaining === 0){
				document.getElementById("game-message").innerHTML = "Sorry. No more guesses. Try another word. Better luck!";
				entireGame.addAttempt();
				entireGame.calculateWinPercentage();
				entireGame.selectWord();
				entireGame.resetGuessesRemaining();
				entireGame.populateUnderscoresDisplayed();
				entireGame.refreshLettersGuessed();
				entireGame.fillLetterSpaces();
				console.log(entireGame.currentWord);
			}
		}		
	}
};

function startPlaying() {
	document.getElementById("game-message").innerHTML = "Please press any letter.";
	entireGame.updateScore();
	entireGame.refreshLetterSpaces();
	entireGame.refreshLettersGuessed();
	entireGame.addAttempt();
	entireGame.calculateWinPercentage();
	entireGame.selectWord();
	console.log(entireGame.currentWord);
	entireGame.populateUnderscoresDisplayed();
	entireGame.fillLetterSpaces();
	document.getElementById("start-button").innerHTML = "click to change word";
	entireGame.userGuessesLetter();
}

// <script>
// function person(firstName,lastName,age,eyeColor) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.age = age;
//     this.eyeColor = eyeColor;
//     this.changeName = function (name) {
//         this.lastName = name;
//     }
// }
// var myMother = new person("Sally","Rally",48,"green");
// myMother.changeName("Doe");
// document.getElementById("demo").innerHTML =
// "My mother's last name is " + myMother.lastName;
// </script>

//document.queryselector??
//use a switch statement??
//functions that return values??
//indexOf (returns -1 if not in there)

// arrayName.indexOf("elementInTheArray") = returns the
// index number of that element

		// function vowelChecker(x){
		// 	var wordSplit = x.split("");
		// 	var firstLetter = wordSplit[0];
		// 	if(firstLetter.toLowerCase() ==="a" || firstLetter.toLowerCase() ==="e" || firstLetter.toLowerCase()==="i" || firstLetter.toLowerCase() ==="o" || firstLetter.toLowerCase()==="u"){
		// 		console.log("the first letter in " + x + " is a vowel.")
		// 	}
		// 	else{
		// 		console.log("the first letter in " + x + " is NOT a vowel.")				
		// 	}
		// }
		//firstCharacter = x.toLowerCase().charAt(0);