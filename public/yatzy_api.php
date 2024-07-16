<?php 

include "yatzy_game.php";

session_start();

if (!isset($_SESSION["gameState"])) {
	$_SESSION["gameState"] = new GameState();
	$_SESSION["leaderboard"] = [0,0,0,0,0,0,0,0,0,0];
	$_SESSION["disabled"] = false;
	$_SESSION["hidden"] = true;
}

if (isset($_POST["choice"])) {

	if ($_POST["choice"] == "roller") {
		$_SESSION["gameState"]->rollDices();
			
		if ($_SESSION["gameState"]->turn == 3) {
			$_SESSION["disabled"] = true;
		}
	} else if ($_POST["choice"] == "replay") {
		$_SESSION["gameState"] = new GameState();
		$_SESSION["disabled"] = false;
		$_SESSION["hidden"] = true;
	} else if ($_POST["choice"] == "reset") {
		$_SESSION["gameState"] = new GameState();
		$_SESSION["leaderboard"] = [0,0,0,0,0,0,0,0,0,0];
		$_SESSION["disabled"] = false;
		$_SESSION["hidden"] = true;
	} else if ($_POST["choice"] == "change") {
		$_SESSION["gameState"]->change($_POST["dice"]);
	} else if ($_POST["choice"] == "chance") {
		$_SESSION["hidden"] = false;
	} else {
		
		$chance = false;
		if (isset($_POST["chance"])) {
			$chance = true;
		}

		$_SESSION["gameState"]->calculateScore($_POST["choice"], $chance);
		$_SESSION["gameState"]->checkRoundEnd();
		$_SESSION["hidden"] = true;

		if (!($_SESSION["gameState"]->gameEnd)) {
			$_SESSION["disabled"] = false;
		} else {
			$_SESSION["disabled"] = true;
			$stop = false;

			for ($i = 0; $i < 10 && !$stop; $i++) {
				if ($_SESSION["leaderboard"][$i] < $_SESSION["gameState"]->score) {

					if ($i != 9) {
						$_SESSION["leaderboard"][$i+1] = $_SESSION["leaderboard"][$i];
					}

					$_SESSION["leaderboard"][$i] = $_SESSION["gameState"]->score;
					$stop = true;
				}
			}
		}
	}
}

$state = ["state" => $_SESSION["gameState"], 
		  "leaderboard" => $_SESSION["leaderboard"],
		  "disabled" => $_SESSION["disabled"],
		  "hidden" => $_SESSION["hidden"]];

echo json_encode($state);
?>