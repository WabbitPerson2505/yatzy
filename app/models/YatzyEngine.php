<?php 
function calculateScore($cat, $game, $chance = false) {

	if (!isset($game->categories[$cat]) ||
		$game->turn->roll == 0) {
		return;
	}

	if (!$chance && $game->categories[$cat]->scored) {
		return;
	}

	$id = $game->categories[$cat]->value;
	$dices = $game->turn->dices;
	$score = 0;

	if ($id >= 1 && $id <= 6) {

		foreach ($dices as $k => $v) {
			if ($v->roll == $id) {
				$score += $id;
			}
		}

	} else if ($id == 7) {
		$number = 0;
		
		foreach (calculateNumbers($dices) as $k => $v) {
			if ($v >= 2 && $number < $k) {
				$number = $k;
			}
		}

		$score = $number * 2;

	} else if ($id == 8) {
		$number1 = 0;
		$number2 = 0;
		
		foreach (calculateNumbers($dices) as $k => $v) {
			if ($v >= 2 && $number1 == 0) {
				$number1 = $k;
			} else if ($v >= 2) {
				$number2 = $k;
			}
		}

		if ($number1 == 0 || $number2 == 0) {
			$number1 = 0;
			$number2 = 0;
		}

		$score = ($number1 * 2) + ($number2 * 2);
		
	} else if ($id == 9 || $id == 10) {
		$target = 3;

		if ($id == 10) {
			$target = 4;
		}

		foreach (calculateNumbers($dices) as $k => $v) {
			if ($v >= $target) {
				$score = $k * $target;
			}
		}				
		
	} else if ($id == 11 || $id == 12) {
		$target = 1;
		$score = 15;

		if ($id == 12) {
			$target = 2;
			$score = 20;
		}

		$found = true;
		$list = calculateNumbers($dices);

		for ($i = $target; $i < (5+$target) && $found; $i++) {
			if ($list[$i] != 1) {
				$score = 0;
				$found = false;
			}
		}

	} else if ($id == 13) {
		$number1 = 0;
		$number2 = 0;
		
		foreach (calculateNumbers($dices) as $k => $v) {
			if ($v == 2) {
				$number1 = $k;
			}  

			if ($v == 3) {
				$number2 = $k;
			}
		}

		if ($number1 == 0 || $number2 == 0) {
			$number1 = 0;
			$number2 = 0;
		}

		$score = ($number1 * 2) + ($number2 * 3);	
	} else {
		$first = true;
		$oldValue;
		$score = 50;

		foreach ($dices as $k => $v) {
			if ($first) {
				$first = false;
				$oldValue = $v->roll;
			} else if($oldValue != $v->roll) {
				$score = 0;
				break;
			} else {
				$oldValue = $v->roll;
			}
		}
	}

	foreach ($game->turn->dices as $k => $v) {
		$game->turn->dices[$k]->roll = 1;
		$game->turn->dices[$k]->kept = false;
	}

	$game->turn->roll = 0;

	return $score;
}

function updateScore($game) {
	$score = 0;
	$scoreUpper = 0;

	foreach ($game->categories as $k => $v) {
		if ($v->scored) {
			$score += $v->score;

			if ($v->value >= 1 && $v->value <= 6) {
				$scoreUpper += $v->score;
			}
		}
	}

	if ($scoreUpper >= 63) {
		$score += 50;
	}

	return $score;
}

function rollDices($game) {

	if ($game->turn->roll == 3) {
		return;
	}

	foreach ($game->turn->dices as $k => $v) {
		if (!$v->kept) {
			$v->roll();
		}
	}

	$game->turn->roll++;
}

function checkRoundEnd($game) {
	$end = true;
	
	foreach ($game->categories as $k => $v) {
		if (!($v->scored)) {
			$end = false;
			break;
		}
	}

	return $end;
}

function change($game, $key) {
	if (!isset($game->turn->dices[$key]) ||
		$game->turn->roll == 0) {
		return;
	}

	$game->turn->dices[$key]->change(); 
}	

function addScoreBoard(&$board, $score) {
	$len = count($board);
	$index = $len;
	$found =  false;
	$oldValue = -1;

	for ($i = 0; $i < $len && !$found; $i++) {

		if ($score > $board[$i]) {
			$index = $i+1;
			$oldValue = $board[$i];
			$board[$i] = $score;
			$found = true;
		}
	}

	for ($i = $index; $i < ($len-1); $i++) {
		$temp = $board[$i];
		$board[$i] = $oldValue;
		$oldValue = $temp;
	}

}

//returns a list that shows the amount of
//each number that were rolled
function calculateNumbers($rolls) {
	//ignore first index as it dice 
	//with number 0 does not exist
	$numbers = [0,0,0,0,0,0,0];

	foreach ($rolls as $k => $v) {
		$numbers[$v->roll]++;
	}

	return $numbers;
}
?>