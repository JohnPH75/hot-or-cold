
$(document).ready(function(){

	/*--- Variable Declarations ---*/
	var randomNumber;
	var guessFlag;
	var guessCount;
	var thePick;
	var found = false;

	/*--- Creating a new Game ---*/
	newGame();

	/*--- On Submit ---*/
	$("form").submit(function(event){
		
		event.preventDefault();
    	
    	if (!found) {
			thePick = $('#userGuess').val();
			console.log("The Pick = "+ thePick);
			clearText();
			setFocus();
			guessFlag = checkChoice(thePick);
			if (!guessFlag) {
				guessCount++;
				setCount(guessCount);
				$("ul#guessList").append("<li>" + thePick + "</li>");
				guessFlag = thermostat(Math.abs(randomNumber - thePick));
			};
		} else {
			setFeedback("Please start a new game to play again.");
			//disableGuess();
		};
  	});
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

	/*--- Creat new game on click ---*/
  	$(".new").click(function(event){
  		event.preventDefault();
  		newGame();
  	});

	/*--- Create a New Game! ---*/
	function newGame() {
		guessFlag = true;
		guessCount = 0;
		found = false;
		$("ul#guessList li").remove();
		setFeedback("Make your Guess!");
		setCount(guessCount);
		randomNumber = generateNumber();
		setFocus();
		clearText();
	}

	/*--- Generate Random Number ---*/
	function generateNumber() {

		var generatedNumber = Math.floor((Math.random()*100)+1);
		console.log("Generated Random Number = "+ generatedNumber);

		return generatedNumber;
	}
	
	/*--- Set focus to the inputbox ---*/
	function setFocus() {
		document.getElementById("userGuess").focus();
	}

	/*--- Clear the text box ---*/
	function clearText() {
		$('#userGuess').val('');
	}

	/*--- Set the guess count ---*/
	function setCount(count) {
		$('#count').text(guessCount);
	}

	/*--- Prompt for User's Guess ---*/
	function getChoice() {
		var thePick = prompt("Guess the Number","Your Guess");
		console.log("The Pick = "+ thePick);
		return thePick;
	}

	/*--- Check if the User's Guess meets the rules---*/
	function checkChoice(thePick) {
		if (isNaN(thePick)) {
			setFeedback("No luck! I accept only numbers.");
			return true;
		} else if (thePick < 1 || thePick > 100) {
			setFeedback("Oops! Your guess has to be a number between 1 and 100!");
			return true;
		}else if ($.trim(thePick) == '') {
			setFeedback("Please enter your guess!");
			return true;
		} else {
			return false;
		};
	}

	/*--- Check the temperature for feedback ---*/
	function thermostat(theGuess) {

		if (theGuess == 0) {
			setFeedback("You Win!!!");
			found = true;
			return false;
		} else if (theGuess <= 5) {
			setFeedback("Too hot to handle!");
			return true;
		} else if (theGuess <= 10){
			setFeedback("You're hot!");
			return true;
		} else if (theGuess>=10 && theGuess <= 15) {
			setFeedback("Getting warmer!");
			return true;
		} else if (theGuess>=15 && theGuess <= 20) {
			setFeedback("Luke warm!");
			return true;	
		} else if (theGuess>=20 && theGuess <= 30) {
			setFeedback("Cool!");
			return true;
		} else if (theGuess>=30 && theGuess <= 40) {
			setFeedback("Cold!");
			return true;
		} else {
			setFeedback("Ice cold!");
			return true;
		}

	}

	/*--- Set the feedback ---*/
	function setFeedback(feedback) {
		$('#feedback').text(feedback);
	}

	/*--- Disable the submit button
	function disableGuess() {
    	document.getElementById("guessButton").disabled = 'true';
    	setFeedback("Submit disabled");
	} ---*/

});



