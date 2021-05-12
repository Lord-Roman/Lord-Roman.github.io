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
    $('.monitor').html('');
    let result = getRandom(key);
    result.forEach(function(item) {
        let elem = '<span style="color:rgb(255,' + item.color + ');">' + item.value + '</span>';
        $('.monitor').append(elem);
        $('.monitor').append(',');
    })
    $('.success__number').text(success);
    $('.fail__number').text(fail);
    $('.flawless__number').text(flawless);
}
function getDice(){
    return randomInteger(1,10);
}
function rethrow(color) {
    dice = getDice();
    if(color){
        color = color - 60;   
    }else{
        color = 180;
    }
    let item = {color: color+','+color, value:dice} 
    rez.push(item);

    if(dice >= difficult){
        success++;
        flawless++;
    }
    if(dice == 10){
        rethrow(color);
    }
}

function Charm(dice) {
    if(charm && (dice == 1)){
        charm--;
        let newDice = getDice();
        dice = Charm(newDice);
    }
    return dice;
}

function getRandom(numberOfDice) {
    document.getElementById("img").style.display = "none";
    success = 0;
    fail = 0;
    flawless = 0;
    dice = 0;
    charm = 0;
    rez = [];



    if(numberOfDice >= 7){
        charm++;
    }
    if(numberOfDice >= 8){
        charm++;
    }
    if(numberOfDice == 10){
        charm++;
    }
    let hornySuccess = randomInteger(1,numberOfDice);
    for (var i = 0; i < numberOfDice; i++) {
        dice = getDice();

        dice = Charm(dice);
        
        let item = {color: '255,255', value:dice}

        if(dice >= difficult){
            success++;
            flawless++;
            if(i == hornySuccess){
                item.color = '0,255';
                if(document.getElementById("img")){
                    let element = document.getElementById("img")
                    element.style.display = "block";
                    element.style.right = (randomInteger(0,window.innerWidth - 200))+'px'
                    element.style.top = (randomInteger(0,window.innerHeight - 200))+'px'
                }
            }
        }
        
        if(dice == 1){
            fail++;
            success--;
        }
        
        rez.push(item);

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
