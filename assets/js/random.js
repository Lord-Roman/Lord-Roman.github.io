var log = console.log;
var key = 1;
var difficult = 6;
var difficult__change = 0;
var success = 0;
var fail = 0;
var flawless = 0;
var charm = 1;


var rez = [];
var wall = [];

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
    if(!localStorage.getItem('quit')){
        if(success < 0){
            if(document.getElementById("img")){
                document.getElementById("img").style.display = "none"
            }
            if(document.getElementById("wall")){
                document.getElementById("wall").style.display = "block";
            }
            moreTooth();
        }
    }
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
    document.getElementById("wall").style.display = "none";

    success = 0;
    fail = 0;
    flawless = 0;
    dice = 0;
    charm = 0;
    rez = [];

    if(numberOfDice == 6){
            charm=100;
    }
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
                    let wrapper = document.getElementById("wrapper");
                    let left = wrapper.getBoundingClientRect().left;
                    let right = wrapper.getBoundingClientRect().right;
                    let top = wrapper.getBoundingClientRect().top;
                    let bottom = wrapper.getBoundingClientRect().bottom;
    
                    let element = document.getElementById("img")
                    let imgLeft = randomInteger(0,window.innerWidth - 200)
                    let imgTop = randomInteger(0,window.innerHeight - 200)

                    if((imgLeft + 200)>left && imgLeft<right && (imgTop+200)>top && imgTop < bottom){
                        imgLeft = right;
                    }
                    element.style.left = (imgLeft)+'px'
                    element.style.top = (imgTop)+'px'
                    element.style.display = "block";
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
    // log(rez);

    return rez
}



function moreTooth(){
    let tooth = document.createElement('img');
    tooth.src = 'assets/img/tooth.png';
    tooth.className = 'tooth';
    let toothX = (randomInteger(15,500));
    let toothY = 0;
    let toothRad = (randomInteger(0,359));

    // let toothRad = 0;
    // console.log("toothX: ",toothX);
    
    tooth.style.right = toothX + 'px';
    tooth.style.bottom = toothY + 'px';
    tooth.style.transform = 'rotate('+ toothRad +'deg)';

    let collision = {count:0};
    for (var i = wall.length - 1; i >= 0; i--) {
       let element = wall[i];
    // }
    // wall.forEach(element => {
        if(!collision.count && (Math.abs(element.x - toothX) < 30) ){
            collision.count++;

            collision.x1 = element.x;
            collision.y1 = element.y;

            collision.pos = element.x > toothX;
        }else{
            if( collision.pos && (collision.count == 1) && (((collision.x1 - element.x < 60) && (collision.x1 - element.x > 0))&&( ( element.y - collision.y1 < 30) && ( element.y - collision.y1 >= 0) ) ) ){
                // log('collision+');
                collision.count++;
                collision.x2 = element.x;
                collision.y2 = element.y;
            }else if( !collision.pos && (collision.count == 1) && (((element.x - collision.x1 < 60) && (element.x - collision.x1 > 0)) && ( ( element.y - collision.y1 < 30 ) && ( element.y - collision.y1 >= 0) ) )) {
                // log('collision-');
                collision.count++;
                collision.x2 = element.x;
                collision.y2 = element.y;
            }
        }
    }
    if(collision.count == 1){
        // log('collision.pos: ',collision.pos);
        // log('toothX: ',toothX);
        // log('collision.x1 :',collision.x1)
        toothX = collision.x1 + (30 * (collision.pos?(-1):(1) ) );
        // log('toothX: ',toothX);
        // toothX = collision.x1 + (30 * collision.pos?(-1):(1)); 

        tooth.style.right = toothX + 'px';

        // toothY = collision.y1 + 30;

        toothY = collision.y1;
        tooth.style.bottom = toothY + 'px';

    }else if(collision.count >= 1){

        // log("x1: ",collision.x1);
        // log("x2: ",collision.x2);
        // log("toothX: ",toothX);
        // log("pos: ",collision.pos);
        
        let min = Math.min(collision.x1,collision.x2);
        let mid = (Math.abs(collision.x1 - collision.x2))/2
        
        // log("min: ",min);
        // log("mid: ",mid);

        toothX = min + mid;
        tooth.style.right = toothX + 'px';
        toothY = collision.y1 + 30 - (mid - 15);
        tooth.style.bottom = toothY + 'px';

        // toothX = collision.x1 + (30 * (collision.pos?(-1):(1) ) );
    }
    wall.push({x: toothX, y:toothY, rad:toothRad})
    localStorage.setItem('wall', JSON.stringify(wall));
    document.body.append(tooth);
}


$(function() {
    if(!localStorage.getItem('quit')){

        let loc = localStorage.getItem('wall')
        let a = JSON.parse(loc);
        if(a){
            wall = a;
        }
        wall.forEach(element => {
            let tooth = document.createElement('img');
            tooth.src = 'assets/img/tooth.png';
            tooth.className = 'tooth';
            
            tooth.style.right = element.x + 'px';
            tooth.style.bottom = element.y + 'px';
            tooth.style.transform = 'rotate('+ element.rad +'deg)';

            document.body.append(tooth);
        });

    }

    $(document).keydown(function(e) {
        if(e.key == 'Shift'){
            difficult__change = 1;
        }
    })
    $(document).keyup(function(e) {
        
        

        var toRoll = 0;
        // log(e.key);
        // log(e.keyCode);
        // log('difficult__change',difficult__change)
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
        }else if(e.key === 0){
            key = 10;
            toRoll = 1;
        }else if(e.key == 'Q'){
            localStorage.setItem('quit', true);
        }if(e.key == 'C'){
            localStorage.clear();
        }
        if(e.keyCode>95 && e.keyCode<=105){
            key = (key*1) + 10;
            toRoll = 1;
        }
        // log(key);
        toRoll && roll();
    })
});
