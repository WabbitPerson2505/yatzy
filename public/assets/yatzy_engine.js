window.addEventListener("load",start, false);

function start() {

	callApi("load", false);
		
	document.getElementById("roller").addEventListener("click", 
					function() { callApi("roller", false); });
	document.getElementById("replay").addEventListener("click", 
					function() { callApi("replay", false); });
	document.getElementById("reset").addEventListener("click", 
					function() { callApi("reset", false); });
	document.getElementById("change1").addEventListener("click", 
					function() { changeOrKeep("change1"); });
	document.getElementById("change2").addEventListener("click", 
					function() { changeOrKeep("change2"); });
	document.getElementById("change3").addEventListener("click", 
					function() { changeOrKeep("change3"); });
	document.getElementById("change4").addEventListener("click", 
					function() { changeOrKeep("change4"); });
	document.getElementById("change5").addEventListener("click", 
					function() { changeOrKeep("change5"); });
	document.getElementById("ones").addEventListener("click", 
					function() { callApi("ones", false); });
	document.getElementById("twos").addEventListener("click", 
					function() { callApi("twos", false); });
	document.getElementById("threes").addEventListener("click", 
					function() { callApi("threes", false); });
	document.getElementById("fours").addEventListener("click", 
					function() { callApi("fours", false); });
	document.getElementById("fives").addEventListener("click", 
					function() { callApi("fives", false); });
	document.getElementById("sixes").addEventListener("click", 
					function() { callApi("sixes", false); });
	document.getElementById("onePair").addEventListener("click", 
					function() { callApi("onePair", false); });
	document.getElementById("twoPair").addEventListener("click", 
					function() { callApi("twoPair", false); });
	document.getElementById("threeOfAKind").addEventListener("click", 
					function() { callApi("threeOfAKind", false); });
	document.getElementById("fourOfAKind").addEventListener("click", 
					function() { callApi("fourOfAKind", false); });
	document.getElementById("smallStraight").addEventListener("click", 
					function() { callApi("smallStraight", false); });
	document.getElementById("bigStraight").addEventListener("click", 
					function() { callApi("bigStraight", false); });
	document.getElementById("fullHouse").addEventListener("click", 
					function() { callApi("fullHouse", false); });
	document.getElementById("chance").addEventListener("click", 
					function() { callApi("chance", false); });
	document.getElementById("yatzy").addEventListener("click", 
					function() { callApi("yatzy", false); });
	document.getElementById('hiddenOnes').addEventListener("click", 
					function() { callApi("ones", true); });
	document.getElementById('hiddenTwos').addEventListener("click", 
					function() { callApi("twos", true); });
	document.getElementById('hiddenThrees').addEventListener("click", 
					function() { callApi("threes", true); });
	document.getElementById('hiddenFours').addEventListener("click", 
					function() { callApi("fours", true); });
	document.getElementById('hiddenFives').addEventListener("click", 
					function() { callApi("fives", true); });
	document.getElementById('hiddenSixes').addEventListener("click", 
					function() { callApi("sixes", true); });
	document.getElementById('hiddenOnePair').addEventListener("click", 
					function() { callApi("onePair", true); });
	document.getElementById('hiddenTwoPair').addEventListener("click", 
					function() { callApi("twoPair", true); });
	document.getElementById('hiddenThreeOfAKind').addEventListener("click", 
					function() { callApi("threeOfAKind", true); });
	document.getElementById('hiddenFourOfAKind').addEventListener("click", 
					function() { callApi("fourOfAKind", true); });
	document.getElementById('hiddenSmallStraight').addEventListener("click", 
					function() { callApi("smallStraight", true); });
	document.getElementById('hiddenBigStraight').addEventListener("click", 
					function() { callApi("bigStraight", true); });
	document.getElementById('hiddenFullHouse').addEventListener("click", 
					function() { callApi("fullHouse", true); });
	document.getElementById('hiddenYatzy').addEventListener("click", 
					function() { callApi("yatzy", true); });
}

function callApi(elementId, chance) {

	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			console.log(this.responseText);

			let responseJson = JSON.parse(this.responseText);
			
			for (let i = 1; i < 6; i++) {
				document.getElementById("dice" + (i)).src = 
				"assets/dice" + responseJson["state"]["dices"]["dice"+i] + ".png";
				
			}

			document.getElementById("rollNumber").innerHTML = responseJson["state"]["turn"];
			document.getElementById("roller").disabled = responseJson["disabled"];
			
			for (k in responseJson["state"]["categories"]) {
				document.getElementById(k + "Cell").innerHTML = 
					responseJson["state"]["categories"][k]["score"];
				document.getElementById(k).disabled = 
					responseJson["state"]["categories"][k]["scored"];
			}
			
			showHidden(responseJson["hidden"]);

			document.getElementById("cellScore").innerHTML = responseJson["state"]["score"];
			document.getElementById("leaderboard").innerHTML = "";

			for (k in responseJson["leaderboard"]) {
				document.getElementById("leaderboard").innerHTML += 
					"<li>" + responseJson["leaderboard"][k] + "</li>";
			}
		}
	};

	var request = "";

	if (elementId != "load") {
		request += "choice=";
	}

	switch (elementId) {
		case "roller":
			let rolls = {
				dice1: 0,
				dice2: 0,
				dice3: 0,
				dice4: 0,
				dice5: 0
			};
			request += "roll&diceToRoll=" + JSON.stringify(rolls);
			break;
		case "ones":
		case "twos":
		case "threes":
		case "fours":
		case "fives":
		case "sixes":
		case "onePair":
		case "twoPair":
		case "threeOfAKind":
		case "fourOfAKind":
		case "smallStraight":
		case "bigStraight":
		case "fullHouse":
		case "yatzy":
		case "replay":
		case "reset":
		case "chance":
			request +=  elementId;	
			break;
		default:
			break;
	}

	if (chance) {
		request += "&chance=true";
	}

	xhttp.open("POST","yatzy_api.php",true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(request);
	console.log(xhttp);
}

function showHidden(hide) {
	document.getElementById('hiddenOnes').hidden = hide;
	document.getElementById('hiddenTwos').hidden = hide;
	document.getElementById('hiddenThrees').hidden = hide;
	document.getElementById('hiddenFours').hidden = hide;
	document.getElementById('hiddenFives').hidden = hide;
	document.getElementById('hiddenSixes').hidden = hide;
	document.getElementById('hiddenOnePair').hidden = hide;
	document.getElementById('hiddenTwoPair').hidden = hide;
	document.getElementById('hiddenThreeOfAKind').hidden = hide;
	document.getElementById('hiddenFourOfAKind').hidden = hide;
	document.getElementById('hiddenSmallStraight').hidden = hide;
	document.getElementById('hiddenBigStraight').hidden = hide;
	document.getElementById('hiddenFullHouse').hidden = hide;
	document.getElementById('hiddenYatzy').hidden = hide;
	document.getElementById('msgChance').hidden = hide;

	document.getElementById('ones').hidden = !hide;
	document.getElementById('twos').hidden = !hide;
	document.getElementById('threes').hidden = !hide;
	document.getElementById('fours').hidden = !hide;
	document.getElementById('fives').hidden = !hide;
	document.getElementById('sixes').hidden = !hide;
	document.getElementById('onePair').hidden = !hide;
	document.getElementById('twoPair').hidden = !hide;
	document.getElementById('threeOfAKind').hidden = !hide;
	document.getElementById('fourOfAKind').hidden = !hide;
	document.getElementById('smallStraight').hidden = !hide;
	document.getElementById('bigStraight').hidden = !hide;
	document.getElementById('fullHouse').hidden = !hide;
	document.getElementById('chance').hidden = !hide;
	document.getElementById('yatzy').hidden = !hide;
}

function changeOrKeep(elementId) {
	var element = document.getElementById(elementId);

	if (roll != 0) {

		if (keepOrReroll[index-1] == 0) {
			keepOrReroll[index-1] = 1;
			document.getElementById('keepOrReroll' + index).innerHTML = "Keep";
		} else {
			keepOrReroll[index-1] = 0;
			document.getElementById('keepOrReroll' + index).innerHTML = "Roll";
		}
	}
}