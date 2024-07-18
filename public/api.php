<?php
require_once("_config.php");

if (!isset($_SESSION["state"])) {
	$_SESSION["state"]["game"] = new YatzyGame();
	$_SESSION["state"]["leaderboard"] = [0,0,0,0,0,0,0,0,0,0];
	$_SESSION["state"]["disabled"] = false;
	$_SESSION["state"]["hidden"] = true;
	$_SESSION["state"]["totalScore"] = 0;
	$_SESSION["state"]["end"] = false;
}

if (isset($_POST["choice"])) {
	$action = $_POST["choice"];
	$game = $_SESSION["state"]["game"];

	if ($action == "roller") {
		
		rollDices($game);
		$_SESSION["state"]["hidden"] = true;
		
		if ($game->turn->roll == 3) {
			$_SESSION["state"]["disabled"] = true;
		}
	} else if ($action == "replay") {
		$_SESSION["state"]["game"] = new YatzyGame();
		$_SESSION["state"]["disabled"] = false;
		$_SESSION["state"]["hidden"] = true;
		$_SESSION["state"]["totalScore"] = 0;
		$_SESSION["state"]["end"] = false;
	} else if ($action == "reset") {
		$_SESSION["state"]["game"] = new YatzyGame();
		$_SESSION["state"]["leaderboard"] = [0,0,0,0,0,0,0,0,0,0];
		$_SESSION["state"]["disabled"] = false;
		$_SESSION["state"]["hidden"] = true;
		$_SESSION["state"]["totalScore"] = 0;
		$_SESSION["state"]["end"] = false;
	} else if ($action == "change") {
		change($game, $_POST["dice"]);
	} else if ($action == "chance") {
		$_SESSION["state"]["hidden"] = false;
	} else if ($game->turn->roll != 0) {
		
		$chance = isset($_POST["chance"]);
		$score = calculateScore($action, $game, $chance);
		$_SESSION["state"]["hidden"] = true;

		if ($chance) {
			$game->categories["chance"]->score = $score;
			$game->categories["chance"]->scored = true;
		} else {
			$game->categories[$action]->score = $score;
			$game->categories[$action]->scored = true;
		}

		$_SESSION["state"]["totalScore"] = updateScore($game);
		$_SESSION["state"]["end"] = checkRoundEnd($game);

		if (!$_SESSION["state"]["end"]) {
			$_SESSION["state"]["disabled"] = false;
		} else {
			$_SESSION["state"]["disabled"] = true;
			$stop = false;

			addScoreBoard($_SESSION["state"]["leaderboard"], 
				$_SESSION["state"]["totalScore"]);
		}
	}
}

$state = ["game" => $_SESSION["state"]["game"], 
		  "leaderboard" => $_SESSION["state"]["leaderboard"],
		  "disabled" => $_SESSION["state"]["disabled"],
		  "hidden" => $_SESSION["state"]["hidden"],
		  "totalScore" => $_SESSION["state"]["totalScore"],
		  "end" => $_SESSION["state"]["end"]];

echo json_encode($state);
?>