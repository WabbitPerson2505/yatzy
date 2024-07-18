<?php
	class YatzyGame {

		public $categories = [];
		public $turn;

		function __construct() {
									
			$this->turn = new Turn(5);

			$cats = ["ones", "twos", "threes", "fours", "fives", "sixes", "onePair", 
					 "twoPair", "threeOfAKind", "fourOfAKind", "smallStraight", 
					 "bigStraight", "fullHouse", "chance", "yatzy"];
			foreach ($cats as $k => $v) {
				$this->categories[$v] = new Category(($k+1));
			}

		}	
	}
?>