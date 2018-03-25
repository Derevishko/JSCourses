var N= +prompt("Ввести N(для массива который будет сортироваться)");
var s= +prompt("Ввести s(середина значений)");
var p= +prompt("Ввести p(процент отклонения)");

sortt( N, s, p );

function sortt(N, n, p){
	var arr = new Array(N);
	var arr1=[];
	var str=[];

	for( let i=0; i<N; i++ ){
		arr [i] = Math.round(Math.random()*(2*s*p/100)+s-(s*p/100));
		arr1[i] = arr[i];
	}
	arr1=arr1.sort((a,b)=>a-b);


	p=0;
	for( let i=0; i<N; i++){
		p+=(1/N)*1/arr[i];
	}

	arr=arr.join(", ");
	arr1=arr1.join(", ");

	alert("Массив:" + arr + "\nСортирваный Массив:" + arr1 + "\nСреднее гармоническое: " + p);
	console.log("Массив:" + arr + "\nСортирваный Массив:" + arr1 + "\nСреднее гармоническое: " + p);

}


var x= +prompt("Введите x(для полинома)");
N= +prompt("Введите N (максимальную степень х)");
polunom(x,N);
function polunom(x,N) {
	let cof= new Array(N);
	let str="";
	for( let i=0; i<=N; i++){
		cof[i]= +prompt("Введите коофичиент для х в степени "+i)
		
		if(cof[i]>0){
			str+= "+"+cof[i]+"x^"+i;
		}
		else if(cof[i]<0){
			str+= cof[i]+"x^"+i;
		}
	}
	if(str[0]=="+"){
		str=str.slice(1,str.lenght);
	}
	let z=0;
	for( let i=0; i<=N; i++){
		if(i!=0)
		z+= cof[i]*Math.pow(x,i);
		else
			z+= cof[i];
	}
	alert("Полином: "+str+"\nОтвет: "+z);
	console.log("Полином: "+str+"\nОтвет: "+z);

}
time();
function time(){
	let t= new Date();
	let h= t.getHours();
	let m= t.getMinutes();

	let last= (23-h)*60+(59-m);
	alert("До конца дня осталось "+last+" минут");
	console.log("До конца дня осталось "+last+" минут");
}
