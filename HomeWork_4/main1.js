var loc= function () {
	document.write( "Адрес страницы - "+location.href+"<br \/>");
	document.writeln( "Хост страницы - "+location.host+"<br \/>");
	document.writeln( "Хеш страницы - "+location.hash+"<br \/>");
	document.writeln( "Порт страницы - "+location.port+"<br \/>");
	document.writeln( "Протокол страницы - "+location.protocol+"<br \/>");
	document.writeln( "search страницы - "+location.search+"<br \/>");
}
loc();

var	scren= function(){
	document.write( "Ширина экрана - "+screen.width+"<br \/>");
	document.write( "Высота экрана - "+screen.height+"<br \/>");
	document.write( "Глубина цветопередачи экрана - "+screen.colorDepth+"<br \/>");
	document.write( "Полезная ширина экрана - "+screen.availWidth+"<br \/>");
	document.write( "Полезная высота экрана - "+screen.availHeight+"<br \/>");
	document.write( "Ориентация экрана - "+screen.orientation+"<br \/>");
	
}
scren();

var navi= function(){
	document.write( "appCodeName - "+navigator.appCodeName+"<br \/>");
	document.write( "appName - "+navigator.appName+"<br \/>");
	document.write( "cookieEnabled - "+navigator.cookieEnabled+"<br \/>");
	document.write( "onLine - "+navigator.onLine+"<br \/>");
	document.write( "userAgent - "+navigator.userAgent+"<br \/>");
	
}
navi();

var win= function(){
	document.write( "Смещение по ширине окна - "+window.screenX+"<br \/>");
	document.write( "Смещение по высоте окна - "+window.screenY+"<br \/>");
	document.write( "Прокручено по ширине - "+window.scrollX+"<br \/>");
	document.write( "Прокрученопо высоте - "+window.scrollY+"<br \/>");
	document.write( "Полезная ширина окна - "+window.innerWidth+"<br \/>");
	document.write( "Полезная высота окна - "+window.innerHeight+"<br \/>");
}
win();

if(confirm("Перезагрузить страницу?")){
	location.reload();
}
if(confirm("Открыть гугл?")){
	location.assign("https://www.google.ru/");
}

var hist= function(){
	historu.go(1);
	historu.back();
	historu.forvard();
	historu.length;
}
// hist();  