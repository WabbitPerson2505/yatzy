<?php 
	class Turn {

		public $dices = [];
		public $roll;

		function __construct($nbDices) {
			
			for ($i = 1; $i <= $nbDices; $i++) {
				$this->dices["dice" . $i] = new Dice(1);
			}

			$this->roll = 0;
		}
	}
?>