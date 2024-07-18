window.addEventListener("load",start, false);

function start() {

	callApi("load", false);
		
	document.getElementById("roller").addEventListener("click", 
					function() { callApi("roller", false); });
	document.getElementById("replay").addEventListener("click", 
					function() { callApi("replay", false); });
	document.getElementById("reset").addEventListener("click", 
					function() { callApi("reset", false); });
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
	document.getElementById("endBtn").addEventListener("click", 
					function() { callApi("replay", false); });

	for (let i = 1; i < 6; i++) {
		document.getElementById("change"+i).addEventListener("click", 
					function() { callApi("change"+i, false); });
	}
}

function callApi(elementId, chance) {

	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			console.log(this.responseText);

			let responseJson = JSON.parse(this.responseText);
			
			updateHtml(responseJson);
		}
	};

	var request = "";

	if (elementId != "load") {
		request += "choice=";
	}

	switch (elementId) {
		case "roller":
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
		case "change1":
		case "change2":
		case "change3":
		case "change4":
		case "change5":
			request += "change&dice=dice"+ elementId.charAt(6);
			break;
		default:
			break;
	}

	if (chance) {
		request += "&chance=true";
	}

	xhttp.open("POST","api.php",true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(request);
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

function updateHtml(response) {
	for (let i = 1; i < 6; i++) {
		document.getElementById("dice" + (i)).src = 
			"assets/dice" + response["game"]["turn"]["dices"]
			["dice"+i]["roll"] + ".png";	
	}

	document.getElementById("rollNumber").innerHTML = 
			response["game"]["turn"]["roll"];
	document.getElementById("roller").disabled = response["disabled"];
			
	for (k in response["game"]["categories"]) {
		document.getElementById(k + "Cell").innerHTML = 
			response["game"]["categories"][k]["score"];
		document.getElementById(k).disabled = 
			response["game"]["categories"][k]["scored"];
	}
			
	showHidden(response["hidden"]);
	document.getElementById("msgEnd").hidden = !response["end"];

	document.getElementById("cellScore").innerHTML = response["totalScore"];
	document.getElementById("leaderboard").innerHTML = "";

	for (k in response["leaderboard"]) {
		document.getElementById("leaderboard").innerHTML += 
		"<li>" + response["leaderboard"][k] + "</li>";
	}

	for (k in response["game"]["turn"]["dices"]) {
		document.getElementById("keepOrReroll"+k.charAt(4)).innerHTML = 
		response["game"]["turn"]["dices"][k]["kept"]? "keep" : "roll";
	}
}