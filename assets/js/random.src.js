var log = console.log;
var key = 1;
var difficult = 6;
var difficult__change = 0;
var success = 0;
var fail = 0;
var flawless = 0;
var charm = 1;


var rez = [];
var dice;

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
function roll(){
	$('.monitor').text(getRandom(key))
	$('.success__number').text(success);
	$('.fail__number').text(fail);
	$('.flawless__number').text(flawless);
}
function getDice(){
	return randomInteger(1,10);
}
function rethrow() {
	dice = getDice();
	rez.push(dice);
	if(dice >= difficult){
		success++;
		flawless++;
	}
	if(dice == 10){
		rethrow();
	}
}

function getRandom(numberOfDice) {
	success = 0;
	fail = 0;
	flawless = 0;
	dice = 0;
	charm = 0;
	rez = [];

	if(numberOfDice > 6){
		charm++;
	}
	if(numberOfDice == 10){
		charm++;
	}

	for (var i = 0; i < numberOfDice; i++) {
		dice = getDice();

		if(dice == 1){
			if(charm){
				charm = charm - 1;
				dice = getDice();
			}
		}	
		rez.push(dice);

		if(dice >= difficult){
			success++;
			flawless++;
		}
		if(dice == 1){
			fail++;
			success--;
		}
		
		if(dice == 10){
			rethrow()
		}
	}
	log(rez);
	return rez
}
$(function() {
	$(document).keydown(function(e) {
		if(e.key == 'Shift'){
			difficult__change = 1;
		}
	})
	$(document).keyup(function(e) {
		var toRoll = 0;
		log(e.key);
		log(e.keyCode);
		log('difficult__change',difficult__change)
		if(difficult__change){
			if(e.keyCode > 48 && e.keyCode <= 57){
				difficult = e.keyCode - 48;
			}else if(e.keyCode == 48){
				difficult = e.keyCode - 38;
			}
			$('.difficulty__number').text(difficult);
		}
		if(e.key == 'Shift'){
			difficult__change = 0;
		}
		if(e.key >= 1 && e.key <= 9)
		{
			key = e.key;
			toRoll = 1;
		}else if(e.key == 0){
			key = 10;
			toRoll = 1;
		}
		if(e.keyCode>95 && e.keyCode<=105){
			key = (key*1) + 10;
			toRoll = 1;
		}
		log(key);
		toRoll && roll();
	})
});
