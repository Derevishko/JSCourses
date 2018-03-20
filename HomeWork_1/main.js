var str= prompt("Введите строку для проверки на раставление скобок");
var lengQ= +str.length;
s(str,lengQ);


var x1= +prompt("Введите х  (|x|<1)");
var N1= +prompt("Введите колличество слогаемых N  (N<80)");
arc(x1,N1);

var num_1= +prompt("Введите первое число") ;
var sign= prompt("Введите знак" );
var num_2= +prompt("Введите второе число") ;
calc(num_1,sign,num_2);



function s(q,l){
	
	var open= +0;
	var close= +0;
	

	for(var i=0;i<l;i++){
		
		if(q.charAt(i)=="("){
			open++;
		}

		else if(q.charAt(i)==")"){
			close++;
		}


		if(close>open){
			alert("Скобка закрывается до того как открывается!!!");
			console.error("Скобка закрывается до того как открывается!!!");
			break;
		}

		if(close==open&&i==l-1){
			alert("Скобки раставлены правильно!");
			console.log("Скобки раставлены правильно!");
		}
		else if(close<open&&i==l-1){
			alert("Не все скобки закрыты!!!");
			console.error("Не все скобки закрыты!!!");
		}

	}
	
}

function arc(x,N){

	var a= +x;
	for(var i=1;i<N;i++){
		
			a+= factorial(2*i) / Math.pow(4,i) / Math.pow(factorial(i),2) / (2*i+1)  * Math.pow(x, (2*i+1));
	}
	a*=180/3.141592654;
	alert("Аrcsin(x)~"+a+" (градусов)");
	console.log("Аrcsin(x)~"+a+" (градусов)");
}

function factorial(n){
	var fac=1;
	for(var iq=1;iq<n+1;iq++){
		fac*=iq;
	}
	
	return fac;
}

function calc(n1,s,n2) {
	

		switch (s){

			case "+":
				n1+=n2;
				alert(n1);
				console.log(n1);
				break;

			case "-":
				n1-=n2;
				alert(n1);
				console.log(n1);
				break;
		
			case "/":
				n1/=n2;
				alert(n1);
				console.log(n1);
				break;
		
			case "*":
				n1*=n2;
				alert(n1);
				console.log(n1);
				break;

			case "%":
				n1%=n2;
				alert(n1);
				console.log(n1);
				break;
		

			default:
				alert("не знак!");
				console.error("не знак!");
		}
	
		

	
}