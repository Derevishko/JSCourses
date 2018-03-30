var table= "<table><tr><td>Функция</td><td>Результат</td></tr>";

	table+= "<tr><td>Адрес страницы </td><td>" +location.href+"</td></tr>";
	table+= "<tr><td>Хост страницы</td><td>"+location.host+"</td></tr>";
	table+= "<tr><td>Хеш страницы - </td><td>"+location.hash+"</td></tr>";
	table+= "<tr><td>Порт страницы - </td><td>"+location.port+"</td></tr>";
	table+= "<tr><td>Протокол страницы - </td><td>"+location.protocol+"</td></tr>";
	table+= "<tr><td>search страницы - </td><td>"+location.search+"</td></tr>";



table+= "<tr><td>Ширина экрана</td><td>"+screen.width+"</td></tr>";
table+= "<tr><td>Высота экрана</td><td>"+screen.height+"</td></tr>";
table+= "<tr><td>Глубина цветопередачи экрана</td><td>"+screen.colorDepth+"</td></tr>";
table+= "<tr><td>Полезная ширина экрана</td><td>"+screen.availWidth+"</td></tr>";
table+= "<tr><td>Полезная высота экрана</td><td>"+screen.availHeight+"</td></tr>";
table+= "<tr><td>Ориентация экран</td><td>"+screen.orientation+"</td></tr>";
	



	table+= "<tr><td>appCodeName</td><td>"+navigator.appCodeName+"</td></tr>";
	table+= "<tr><td>appName</td><td>"+navigator.appName+"</td></tr>";
	table+= "<tr><td>cookieEnabled</td><td>"+navigator.cookieEnabled+"</td></tr>";
	table+= "<tr><td>onLine</td><td>"+navigator.onLine+"</td></tr>";
	table+= "<tr><td>userAgent</td><td>"+navigator.userAgent+"</td></tr>";
	

table+= "<tr><td>Смещение по ширине окна</td><td>"+window.screenX+"</td></tr>";
table+= "<tr><td>Смещение по высоте окна</td><td>"+window.screenY+"</td></tr>";
table+= "<tr><td>Прокручено по ширине</td><td>"+window.scrollX+"</td></tr>";
table+= "<tr><td>Прокрученопо высоте</td><td>"+window.scrollY+"</td></tr>";
table+= "<tr><td>Полезная ширина окна</td><td>"+window.innerWidth+"</td></tr>";
table+= "<tr><td>Полезная высота окна</td><td>"+window.innerHeight+"</td></tr>";




	// history.go(1);
	// history.back();
	// history.forvard();
	table+= "<tr><td>Длинна истории</td><td>"+history.length+"</td></tr></table>";
  

 document.writeln(table);

 var t= setTimeout(function(){

if(confirm("Перезагрузить страницу?")){
	location.reload();
}
if(confirm("Открыть гугл?")){
	location.assign("https://www.google.ru/");
}
},10000);
