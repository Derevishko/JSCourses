var menu= document.getElementById("context");
menu.classList.add("invise");
document.body.addEventListener("click",function(){
	menu.classList.add("invise");
});
document.body.addEventListener("contextmenu", function(e){
	e.preventDefault();
	menu.classList.remove("invise");
	if((e.x+170)<=window.innerWidth){
		var X= e.pageX;
	}else{
		var X= window.innerWidth - 200;
	}
	if((e.y+112) <=window.innerHeight){
		var Y= e.pageY-150 ;
	}else{
		var Y=window.innerHeight+window.scrollY-220-list.getBoundingClientRect().height ;
	}
	menu.style.left= X+  "px";
	menu.style.top= Y+  "px";
});
menu.addEventListener("click",function(e){
	if(e.target.classList==""){
		switch(e.target.innerText[0]){
			case "П":
				alert("Привет");
				break;
			case "Ч":
				alert("Обрабатываю событие");
				break;
			case "К":
			var d= new Date;
				alert(d.getHours()+" Hou  "+d.getMinutes()+" Min  "+d.getSeconds()+" Sec");
				break;
			case "А":
				alert("Создать своё контекстное меню");
				break;
			case "Д":
				alert("До встречи");
				window.close();
				break;
		}
	}
});