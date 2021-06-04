var hack = [
{text:"комп взломщика заражается программой для слежки",img:'hack.png',message:'',title:''},
{text:"данные с компа взломщика разлетаются по сети",img:'hack.png',message:'',title:''},
{text:"по адресу хакера выезжает полиция",img:'hack.png',message:'',title:''},
{text:"по ошибке происходит взлом компьютера сородича и он об этом узнаёт",img:'hack.png',message:'',title:''},
{text:"взломщик видит пароль в системе c@m@r1l1a",img:'hack.png',message:'',title:''},
{text:"ошибка при определении IP, был взломан комп из соседнего здания",img:'hack.png',message:'',title:''},
{text:"этим узлом пользуется извращенец на взломанном сервере только запрещённые порно-материалы. Ничего полезного",img:'hack.png',message:'',title:''},
{text:"логин системы совпадает с именем одного из старейшин",img:'brother.png',message:'Hello there',title:''},
{text:"компьютер вспыхивает и ломается без возможности починки",img:'hack.png',message:'',title:''},
{text:"полученный доступ бесполезен, данные хранятся на удаленном сервере",img:'hack.png',message:'',title:''},
{text:"на мониторе появляются оккультные символы. Компьютер начинает истекать кровью",img:'hack.png',message:'',title:''},
{text:"компьютер начинает вести диалог. взломщик случайно попал на чат со знакомствами",img:'hack.png',message:'',title:''},
{text:"компьютер громко включает порно без возможности выключить привлекая всех окружающих",img:'hack.png',message:'',title:''},
{text:"взлом успешен, но взлом обнаружен, компьютер и взломщик теперь заинтересуют многих",img:'brother.png',message:'Good bye',title:''},
{text:"компьютер взломщика сам закрывается паролем",img:'hack.png',message:'',title:''},
{text:"компьютер взломщика стирает данные из записных книжек с телефонов по близости через блютуз",img:'hack.png',message:'',title:''},
{text:"компьютер взломщика связываться с телефоном и звонит на случайные номера",img:'hack.png',message:'',title:''},
{text:"компьютер взломщика сливает неприятелю все номера из телефонной книжки",img:'hack.png',message:'',title:''},
{text:"компьютер взломщика сводит с ума всю окружающую технику",img:'hack.png',message:'',title:''},
{text:"компьютер взломщика начинает очень сильно тормозить и майнить биткоины в пользу другого человека",img:'snail.png',message:'',title:''},
{text:"компьютер взломщика начинает очень сильно тормозить, запущен скрытый фоновый процесс",img:'snail.png',message:'',title:''},
{text:"все данные с сервера и с компьютера взломщика удаляются, компьютер ломается без возможности восстановления",img:'hack.png',message:'',title:''},
{text:"компьютер во время взлома перезагружется и IP адресс произвольно меняется, теперь нужно отыскать комп в сети (бросок на поиск)",img:'hack.png',message:'',title:''},
{text:"Медленная сеть (тратишь больше времени)",img:'snail.png',message:'',title:''},
{text:"Дополнительный фаерволл (требуется дополнительная проверка на компьютеры)",img:'hack.png',message:'',title:''},
{text:"Ограничение ввода (доп проверка на компьютеры, тратишь больше времени)",img:'hack.png',message:'',title:''},
{text:"Мониторинг активности (доп проверка на безопасность, если не заметаешь следы - взлом будет обнаружен)",img:'hack.png',message:'',title:''},
{text:"Неизвестный вид шифрования (переброс, сложность +2)",img:'hack.png',message:'',title:''},
{text:"Сбой аутентификации (переброс)",img:'hack.png',message:'',title:''},
{text:"Сисадмин на сервере (доп проверка на безопасность, обнаружение, сложность +2)",img:'giveittowall.png',message:"you're not supposed to be here",title:''},
{text:"Внутренняя сеть (невозможен взлом с внешней машины, требуется подключиться к роутеру или витой паре)",img:'hack.png',message:'',title:''},
{text:"Парсер для скачивания данных внедрен на взломанный комп (нужно временя, чтобы данные были скачены)",img:'hack.png',message:'',title:''},
{text:"Сниффер внедрен на взломанный комп (нужно дождаться информации, чтобы осуществить взлом, может занять много времени)",img:'hack.png',message:'',title:''},
{text:"Двухфакторная аутентификация (необходимо подтверждение сотрудника или админа)",img:'hack.png',message:'',title:''}]

var sequence = [];
var path = 'assets/img/hack/';
function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function getText(){
    if(!sequence.length){
        for (var i = 0; i < hack.length; i++) {
            sequence.push(i);
        }
        console.log('reroll');
    }
    let index = randomInteger(0,sequence.length - 1);
    if(document.getElementById('text')){
        document.getElementById('text').innerHTML = (hack[sequence[index]].text);
    }
    if(document.getElementById('img')){
        document.getElementById('img').src = path + (hack[sequence[index]].img);
    }
    if(document.getElementById('message')){
        document.getElementById('message').innerHTML = (hack[sequence[index]].message);
    }
    // if(document.getElementById('title')){
    //     document.getElementById('title').innerHTML = ;
    // }

    sequence.splice(index, 1);
    return index;
}

(function() {
    console.log('start');
    getText();
    document.addEventListener('keyup',event=>{
        getText();
    })
    document.addEventListener('touchstart', event => {
      getText();
    })
})()