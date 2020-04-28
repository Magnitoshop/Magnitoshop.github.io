

// анимация в скролее
$(window).scroll(function() {
        $('.animated-1').each(function(){
            var imagePos = $(this).offset().top;

            var topOfWindow = $(window).scrollTop();
                if (imagePos < topOfWindow+710){
                    $(this).addClass('animated');
                    $(this).addClass('bounceInLeft');
                }
        })
});


// плавный скролл по стр за счёт файла jQuery.scrollSpeed.js
$(function() {  
    jQuery.scrollSpeed(100, 800, 'easeOutCubic');
});


// оживляет заголовок сайта, title будет печататься снова и снова
var tit = document.title;
var c = 0;
function writetitle() {
  document.title = tit.substring(0,c);
  if(c==tit.length) {
    c = 0;setTimeout("writetitle()", 3000)
  } else {
    c++;
    setTimeout("writetitle()", 200)
  }
}
writetitle()


// обратный отсчёт за счёт строчки <body onload="time()">
timeend= new Date();
timeend= new Date(timeend.getYear()>1900?(timeend.getYear()+1):(timeend.getYear()+1901),0,1);
// для задания обратного отсчета до определенной даты укажите дату в формате:
// timeend= new Date(ГОД, МЕСЯЦ-1, ДЕНЬ);
// Для задания даты с точностью до времени укажите дату в формате:
// timeend= new Date(ГОД, МЕСЯЦ-1, ДЕНЬ, ЧАСЫ-1, МИНУТЫ);
function time() {
    today = new Date();
    today = Math.floor((timeend-today)/1000);
    tsec=today%60; today=Math.floor(today/60); if(tsec<10)tsec='0'+tsec;
    tmin=today%60; today=Math.floor(today/60); if(tmin<10)tmin='0'+tmin;
    thour=today%24; today=Math.floor(today/24);
    timestr=today +" дней "+ thour+" часов "+tmin+" минут "+tsec+" секунд";
    document.getElementById('t').innerHTML=timestr;
    window.setTimeout("time()",1000);
}


// вывод ссобщений на стр
var DEBUG_MESSAGES=10; // максимальное кол-во сообщений
msgnumber=0;    // очередной номер сообщения
function addMessage(msg) {
    var msgarea = document.getElementById('msgarea');
    if (msgarea) {
        msgarea.style.display = 'block';
        if (msgarea.getElementsByTagName('h4').length < 1) {
        var debugHeading = document.createElement('h4');
        debugHeading.appendChild(document.createTextNode('Debug output'));
        msgarea.appendChild(debugHeading);
        }
        if (msgarea.getElementsByTagName('p').length > DEBUG_MESSAGES) {
        msgarea.removeChild(msgarea.getElementsByTagName('p')[0]);
        }
        var note = document.createElement('p');
        note.appendChild(document.createTextNode(msgnumber + ': ' + msg));
        msgnumber++;
        msgarea.appendChild(note);
    }
    }
// после загрузки страницы, поставить фокус на поле ввода, тогда разблокируй нижнюю строку
// onload=new function() {document.frm.msg.focus();}


// запрещает копировать текст с сайта
document.ondragstart = test;
//запрет на перетаскивание
document.onselectstart = test;
//запрет на выделение элементов страницы
document.oncontextmenu = test;
//запрет на выведение контекстного меню
function test() {
// return false
}
// разблокировать строку выше для запуска всего этого


// Эта длинная хрень делает открытие нового окна по нажатию и открытия нового diva по нажатию
img1=new Image();
img_to=0;
function imgopen(imgf,tit){
   img1.src=imgf;
   img1.onload=function() { LoadImage(img1,tit); };
   img_to=window.setTimeout(function() { LoadImage(img1,tit); }, 100 ); // на случай если onload не сработает
// теперь нужно подождать загрузки изображения
// для этого используется обработчик события загрузки картинки onLoad
   return false;
}
function LoadImage(img1,tit){
if(img_to){window.clearTimeout(img_to);img_to=0;} // чтобы не открылось 2 окна
if(!img1.width){ // жду загрузки
   img_to=window.setTimeout(function() { LoadImage(img1,tit); }, 100 ); // на случай если onload не сработает
   return;
}
img1.onload=null; // чтобы не открылось 2 окна
rand_id='image'+(Math.round(Math.random()*1000));
outf="<html><head>"
 +"<title>"+tit+"</title>"
 +"</head>"
 +"<body style=\"margin:0\">"
 +"<img style=\"margin:0\" src=\""+img1.src+"\" width=\""+img1.width+"\" height=\""+img1.height+"\" /><br>"
 +" ("+(img1.width)+"x"+(img1.height)+")"
 +"</body></html>" ;
// добавляю запас по высоте (+20)на надпись о размере файла картинки
iopen="iwin=self.open('"+img1.src+"', '"+rand_id+"', 'width="+(img1.width)+",height="+(img1.height+20)+",top=50,left=50');"
 +"if(iwin){iwin.document.write('"+outf+"');"
 +"iwin.focus();}";
img1=null; // чтобы не открылось 2 окна
eval(iopen);
}
function imgdiv(url)
    {
    var el=document.getElementById('img_div');
    var img=new Image();
    img.onload=function()
        {
        el.style.width=img.width+'px';
        el.style.height=(img.height+20)+'px';
        el.innerHTML='<img src='+url+' style="margin:0" width="'+img.width+'" height="'+img.height+'" /><br> ('+img.width+'x'+img.height+')';
        }
    el.innerHTML='Загружается...';
    img.src=url;
    }

// во время нажатия на кнопку с id #top будет скролл наверх
$("a[href='#top']").click(function() {
$("html, body").animate({ scrollTop: 0 }, "slow");
return false;
});


// для открытия картинки в новой вкладке
function fb_resize(t){
if(!t.width&&!t.height){window.setTimeout(function() { fb_resize(t); }, 100 );return;}
w=t.width;
h=t.height;
if(w<=100&&h<=100){}
else if(w<h){w=Math.ceil(w*100/h);h=100;}
else {h=Math.ceil(h*100/w);w=100;}
t.setAttribute("width", w);
t.parentNode.style.width=w+'px';
t.setAttribute("height", h);
t.parentNode.style.height=h+'px';
}


// этот код выводит актуальное время в url ,если прописать <body onload="start(document.forms[0])" onunload="cleartids()">
// timestr = "00:00:00";
// title=document.title;
// tid = 0;
// pause = 0;
// var to;
// var bcount;
// var tcount;
// function time(n) {
//     tid=window.setTimeout("time(1)",to);
//     today = new Date()
//     if(today.getMinutes() < 10) pad = "0"
//         else            pad = "";
//     if(today.getSeconds() < 10) pads = "0"
//         else            pads = "";
//     timestr=today.getHours()+":"+pad+today.getMinutes()+":"+pads+today.getSeconds();
//     document.title = title+' '+timestr;
//     window.clearTimeout(tid);
//     tid=window.setTimeout("time()",to);
// }
// function start(x) {
//     f=x;
//     to=60;
//     time(x);
// }
// function cleartids() {
//     window.clearTimeout(tid);
// }

// иконка справа внизу, по нажатию на которую плавно проскролит наверх
$(function() {
$(window).scroll(function() {
if($(this).scrollTop() != 0) {
$('#topNubex').fadeIn();
} else {
$('#topNubex').fadeOut();
}
});
$('#topNubex').click(function() {
$('body,html').animate({scrollTop:0},700);
});
});


// прелоад
$(window).on('load', function () {
    $preloader = $('.loaderArea'),
    $loader = $preloader.find('.loader');
    $loader.fadeOut();
    $preloader.delay(500).fadeOut('slow');
});