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
?>