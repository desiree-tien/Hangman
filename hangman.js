
//`main.js` will contain the logic of your app. Running it in Terminal/Bash will start the game.
var word = require('./words.js');
var prompt = require('prompt');

console.log("Welcome to Pokemon Hangman!");
console.log("Guess a letter of the name of a pokemon");
console.log("Goodluck!");
prompt.start();



game = {
 	wordBank: ['bulbasaur', 'charmander', 'squirtle', 'pikachu', 'vulpix', 'meowth', 'ponyta'],
 	wordsWon: 0,
 	guessesRemaining: 10,
 	currentWrd: null,
 	
 	startGame: function (wrd) {
 		this.resetGuesses();
 		this.currentWrd = new Word(this.wordBank[Math.floor(Math.random()* this.wordBank.length)]);
 		this.currentWrd.getLet();
 		this.promptUser();
 	},

 	resetGuesses: function(){
 		this.guessesRemaining = 10;
 	},

 	promptUser: function(){
 		var self = this;
 		prompt.get(['guessLet'], function(err, result){
 			console.log("You guessed: " + result.guessLet);
 			var manyGuessed = self.currentWrd.checkLetter(result.guessLet);

 			if(manyGuessed ==0) {
 				console.log("WRONG");
 				self.guessesRemaining--;
 				
 			} else {
 				console.log("CORRECT");
 					if(self.currentWrd.findWord()){
 						console.log("You won!")
 						return;
 					}
 			}

 			console.log("Guesses remaining: " + self.guessesRemaining);
 			if((self.guessesRemaining > 0) && (self.currentWrd.found == false)){
 				self.promptUser();
 			}
 			else if(self.guessesRemaining ==0){
 				console.log("Game over. Correct Word ", self.currentWrd.target);
 			} else {
 				console.log(self.currentWrd.wordRender());
 			}
 		});

 	}


};

game.startGame();