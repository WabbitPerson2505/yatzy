<?php 

session_start();

//unset($_SESSION["gameState"]);

if (!isset($_SESSION["gameState"])) {
	$_SESSION["gameState"] = [];
	$_SESSION["gameState"]["currentRolls"] = 
		["dice1" => 1, "dice2" => 1, "dice3" => 1, "dice4" => 1, "dice5" => 1];
	$_SESSION["gameState"]["rollOrKeep"] = 
		["dice1" => 0, "dice2" => 0, "dice3" => 0, "dice4" => 0, "dice5" => 0];
	$_SESSION["gameState"]["currentRoll"] = 0;
	$_SESSION["gameState"]["scores"] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	$_SESSION["gameState"]["totalScore"] = 0;
	$_SESSION["gameState"]["leaderboard"] = [0,0,0,0,0,0,0,0,0,0];
}

if (isset($_POST["rolling"])) {

	$decoded = json_decode($_POST["rolling"]);

	foreach ($decoded as $k => $v) {
		$_SESSION["gameState"]["rollOrKeep"][$k] = $v;
	}

}

//print_r($_SESSION["gameState"]);

function rollDices() {

	foreach ($_SESSION["gameState"]["currentRolls"] as $k => $v) {
		if ($_SESSION["gameState"]["rollOrKeep"][$k] == 0) {
			$_SESSION["gameState"]["currentRolls"][$k] = rand(1,6);
		}

	}

	$_SESSION["gameState"]["currentRoll"]++;

}

rollDices();

$gameRoll = ["disabled" => false, "rolls" => $_SESSION["gameState"]["currentRolls"]];

if ($_SESSION["gameState"]["currentRoll"] == 3) {
	$_SESSION["gameState"]["currentRoll"] = 0;
	$gameRoll["disabled"] = true;
}

echo json_encode($gameRoll);
?>