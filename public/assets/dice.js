//Function to roll a random number between 1 and 6
function diceRoll() {

	var rollDice = Math.floor(Math.random() * 6) + 1;
	return rollDice;
}

//Function that will roll all 5 dices and update the html to show the changes
function roller() {

	//We know that are 5 dices
	for (let i = 0; i < 5; i++) {

		//Depending on how the html is contained, we could do innerHTML
		//however this is simpler given the html in main file.
		if (keepOrReroll[i] == 0) {
			dices[i] = diceRoll();
			document.getElementById('dice' + (i+1)).src = "assets/dice" + (dices[i]) + ".png";
		}
		
	}
	
	//Update the roll #
	roll++;
	document.getElementById('rollNumber').innerHTML = roll;

	//If we're on last roll then disable the roll button to
	//prevent further rolls
	if (roll == 3) {
		document.getElementById('buttonRoller').disabled = true;
	}
}