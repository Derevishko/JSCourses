var tel= function(){
	var str= prompt("Введите свой номер телефона: ");
	var r= /^\+?375\(?25\)?\d{7}$|^\+?375\(?29\)?\d{7}$|^\+?375\(?33\)?\d{7}$|^\+?375\(?44\)?\d{7}$|^80\(?25\)?\d{7}$|^80\(?29\)?\d{7}$|^80\(?33\)?\d{7}$|^80\(?44\)?\d{7}$/;
	if(str.match(r)!=null){
		alert("Спасибо\n"+str.match(r));
	}
	else{
		alert("Не верный номер");
	}

}
tel();