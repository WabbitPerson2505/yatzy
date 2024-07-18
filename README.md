# How to Play
Make sure when downloading to keep the file/directory structure as is to ensure the code works.

**The yatzy game files is contained within public directory. This directory contains yatzy.html and assets directory to hold the necessary javascripts/css and images needed.**

**Note: This game is Yatzy, not Yahtzee. Similar games but with some alterations to the rules and point scoring. Scoring will be explained in next section.**

Yatzy is a simple game where the goal of the game is to obtain the highest score possible by achieving various different dice combinations.

## Rules of yatzy
- **1.** You roll 5 dices by clicking the roll button on the Yatzy board at the upper half of the screen.
- **2.** After the first roll, you may choose which dice(s) you'd like to keep and which dice(s) you'd like to reroll. You may reroll up to 2 times resulting in a total of 3 rolls (first roll plus 2 rerolls). You can only choose which dice(s) to keep or reroll after the first roll and the buttons will be non responsive when attempting to do so on roll 0.
- **3.** Once you have found a particular dice combination or you have exhausted all your rolls for that turn then choose the appropriate category/combination to score in a scorebox in the lower half of the layout. You can either score 0 or the score listed below:

	- The sum of all dices showing the number 1.
	- The sum of all dices showing the number 2.
	- The sum of all dices showing the number 3.
	- The sum of all dices showing the number 4.
	- The sum of all dices showing the number 5.
	- The sum of all dices showing the number 6.
	- One pair: The sum of a pair of dices that rolled the same number.
	- Two pairs: The sum of two different pairs of dices.
	- Three of a kind: The sum of three dices that rolled the same number.
	- Four of a kind: The sum of fours dices that rolled the same number.
	- Small straight: The sum of the straight 1-2-3-4-5. Score 15.
	- Big straight: The sum of the straight 2-3-4-5-6. Score 20.
	- Full House: The sum of three of a kind (3 dices that rolled the same) 	and a pair (each category is a different number).
	- Chance: any combination listed in this list.
	- Yatzy: all five dices rolled the same number. Score 50.

There is a 25 point bonus if the sum of the category 1 to 6 is at least 63.

Repeat this step each turn (between 1 and 3 rolls). You may only score in each scorebox once, therefore choose your categories carefully.

Note: You may choose which category to pick if a roll overlaps in combination e.g. 2-2-1-1-1 is valid for full house, 1 pair, 2 pairs, sum of two's or sum of one's. Depending on which scorebox has not been filled yet and is available.

- **4.** The chance scorebox is slightly different as it can be used as a free joker to take in the score of a combination (filled or unfilled). When choosing this option, the interface will slightly change and new buttons will appear. You need to choose a combination you want to proceed and score the chance scorebox.

- **5.** The game ends once all scoreboxes have been filled, the score appearing at the bottom of the scorebox card.

## Additional info/rules on yatzy game
- You may only score in a category after rolling the dices at least once.
- You can only choose which die to keep or reroll after you have at least rolled
the dices once.
- You may choose to restart a game without saving the progress of that round
and it will not be added to the leaderboard. See the replay button at the showcase screenshot.
- You can also reset all progress including the leaderboard if you wish to start anew. 
See reset button at the showcase screenshot.
- The php settings enable the game to be saved without needing a local save.
Therefore if you decide to leave and close the browser, the api will load the last saved state
including all previous scores.

## Instructions to enable game in php
- **1.** Install php from [https://www.php.net/]
- **2.** Set your directory from the GitHub and open a console at the (/public) directory or changing the directory manually from the console.
- **3.** Type in the following command on the console. You may need to add the php directory to your environment variables otherwise you maybe to substitute php with the path you stored/installed the php binary files.
![console](/docs/design_system/console.png)
- **4.** Open a tab on your browser at the ip started by the built in php server, in our case localhost:8000
![server](/docs/design_system/server.png)

**Warning this is only for testing purposes but it will serve our needs. This should never be used to deploy for production and you must set up a server if you wish to put on the web**
	

## Demonstrations

### Start of game
![Beginning](/docs/design_system/start.png)

### Keeping dies
![Change](/docs/design_system/changekeep.png)

### Chance example 1
![Chance](/docs/design_system/chance1_1.png)
![](/docs/design_system/chance1_2.png)
![](/docs/design_system/chance1_3.png)
- I did not have 2 pairs so 0 is scored for chance

### Chance example 2
![Chance](/docs/design_system/chance2_1.png)
![](/docs/design_system/chance2_2.png)
![](/docs/design_system/chance2_3.png)
- 3 is already scored but chance can be used to score it again in its' scorebox

### End of a game
![Chance](/docs/design_system/gameend.png)
- The final score is given when picking your last unused category and rolling is disabled

### Showcase of the features
![Showcase](/docs/design_system/showcase.png)

### New feature, leaderboard keeping track of previous games
![Leaderboard](/docs/design_system/leaderboard.png)

## Extra
I have kept a javascript version of the yatzy game in (/versions/v01) for those
wish to save the game locally.

## My Design System
[Design System](/docs/design_system.md)