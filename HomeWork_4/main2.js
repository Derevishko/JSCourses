var tel= function(){
	var str= prompt("Введите свой номер телефона: ");
	var r = /^\+?\s*(375|80)\s*\(?(25|29|33|44)\)?\s*\-*\d\s*\-*\d\s*\-*\d\s*\-*\d\s*\-*\d\s*\-*\d\s*\-*\d$/;
	if(str.match(r)!=null){
		alert("Спасибо\n"+str.match(r)[0]);
	}
	else{
		alert("Не верный номер");
	}

}
tel();