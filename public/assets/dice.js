function diceRoll() {

	var rollDice = Math.floor(Math.random() * 6) + 1;
	return rollDice;
}

function roller() {

	for (let i = 0; i < 5; i++) {

		if (keepOrReroll[i] == 0) {
			dices[i] = diceRoll();
			document.getElementById('dice' + (i+1)).src = "assets/dice" + (dices[i]) + ".png";
		}
		
	}
	
	roll++;
	document.getElementById('rollNumber').innerHTML = roll;

	if (roll == 3) {
		document.getElementById('buttonRoller').disabled = true;
	}
}