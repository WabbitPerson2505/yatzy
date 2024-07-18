<?php
	class Dice {
		public $roll;
		public $kept;

		function __construct() {
			$this->roll = 1;
			$this->kept = false;
		}

		function change() {
			if ($this->kept) {
				$this->kept = false;
			} else {
				$this->kept = true;
			}
		}

		function roll() {
			$this->roll = rand(1,6);
		}
	}
?>