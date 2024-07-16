<?php
	
	class Category {
		private $value;
		public $scored;
		public $score;

		function __construct($value) {
			$this->value = $value;
			$this->scored = false;
			$this->score = "";
		}

		function __get($k) {
			return $this->$k;
		}
	}

	class GameState {
		public $categories = [];
		public $dices = [];
		public $keeps = [];
		public $turn;
		public $score;
		public $gameEnd;

		function __construct() {

			$cats = ["ones", "twos", "threes", "fours", "fives", "sixes", "onePair", 
					 "twoPair", "threeOfAKind", "fourOfAKind", "smallStraight", 
					 "bigStraight", "fullHouse", "chance", "yatzy"];
			
			foreach ($cats as $k => $v) {
				$this->categories[$v] = new Category(($k+1));
			}

			$this->dices = ["dice1" => 1, "dice2" => 1, "dice3" => 1,
						    "dice4" => 1, "dice5" => 1];
			$this->keeps = ["dice1" => 0, "dice2" => 0, "dice3" => 0,
						    "dice4" => 0, "dice5" => 0];
			$this->turn = 0;
			$this->score = 0;
			$this->gameEnd = false;
		}

		function calculateScore($cate, $chance = false) {

			if (!isset($this->categories[$cate])) {
				return;
			}

			$cat = $this->categories[$cate];

			if ($cat->scored || ($this->turn == 0)) {
				return;
			}

			$id = $cat->value;
			$cumulativeScore = 0;

			if ($id >= 1 && $id <= 6) {

				foreach ($this->dices as $k => $v) {
					if ($v == $id) {
						$cumulativeScore += $id;
					}
				}

			} else if ($id == 7) {
				$number = 0;
				
				foreach ($this->calculateNumbers() as $k => $v) {
					if ($v >= 2 && $number < $k) {
						$number = $k;
					}
				}

				$cumulativeScore = $number * 2;

			} else if ($id == 8) {
				$number1 = 0;
				$number2 = 0;
				
				foreach ($this->calculateNumbers() as $k => $v) {
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

				$cumulativeScore = ($number1 * 2) + ($number2 * 2);
				
			} else if ($id == 9 || $id == 10) {
				$target = 3;

				if ($id == 10) {
					$target = 4;
				}

				foreach ($this->calculateNumbers() as $k => $v) {
					if ($v >= $target) {
						$cumulativeScore = $k * $target;
					}
				}				
				
			} else if ($id == 11 || $id == 12) {
				$target = 1;
				$cumulativeScore = 15;

				if ($id == 12) {
					$target = 2;
					$cumulativeScore = 20;
				}

				$found = true;
				$list = $this->calculateNumbers();

				for ($i = $target; $i < (5+$target) && $found; $i++) {
					if ($list[$i] != 1) {
						$cumulativeScore = 0;
						$found = false;
					}
				}

			} else if ($id == 13) {
				$number1 = 0;
				$number2 = 0;
				
				foreach ($this->calculateNumbers() as $k => $v) {
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

				$cumulativeScore = ($number1 * 2) + ($number2 * 3);	
			} else if ($id == 14) {
				
			} else {
				$first = true;
				$oldValue;
				$cumulativeScore = 50;

				foreach ($this->dices as $k => $v) {
					if ($first) {
						$first = false;
						$oldValue = $v;
					} else if($oldValue != $v) {
						$cumulativeScore = 0;
						break;
					} else {
						$oldValue = $v;
					}
				}
			}

			if ($chance) {
				$this->categories["chance"]->score = $cumulativeScore;
				$this->categories["chance"]->scored = true;
			} else {
				$cat->score = $cumulativeScore;
				$cat->scored = true;
			}
			
			$this->score += $cumulativeScore;
			$this->turn = 0;

			foreach ($this->dices as $k => $v) {
				$this->dices[$k] = 1;
			}
		}

		function rollDices() {

			if ($this->turn == 3) {
				return;
			}

			foreach ($this->keeps as $k => $v) {
				if ($v == 0) {
					$this->dices[$k] = rand(1,6);
				}

			}

			$this->turn++;
		}

		function checkRoundEnd() {
			$end = true;
			
			foreach ($this->categories as $k => $v) {
				if (!($v->scored)) {
					$end = false;
					break;
				}
			}

			$this->gameEnd = $end;
		}

		function change($key) {

			if (!isset($this->keeps[$key]) ||
				$this->turn == 0) {
				return;
			} 

			$this->keeps[$key] = 1 - $this->keeps[$key]; 
		}	

		//returns a list that shows the amount of
		//each number that were rolled
		private function calculateNumbers() {
			//ignore first index as it dice 
			//with number 0 does not exist
			$numbers = [0,0,0,0,0,0,0];

			foreach ($this->dices as $k => $v) {
				$numbers[($v)]++;
			}

			return $numbers;
		}
	}
?>