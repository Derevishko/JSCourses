var mr= document.getElementById("memoru");
var mrP= document.getElementById("memoru+");
var mrM= document.getElementById("memoru-");
var td= document.getElementsByClassName("none");
var input= document.getElementById("input");
var output= document.getElementById("output");
var eq= document.getElementById("=");
var strMemoru="";
var str="";
var apperator="";
var app= document.getElementsByClassName("aper");
var act= document.getElementById("act");
var S= document.getElementsByClassName("aperS");
var res= function(){
	switch(apperator){
		case "+":
			output.innerText= Number(output.innerText)+Number(input.innerText);
			break;
		case "-":
			output.innerText= Number(output.innerText)-Number(input.innerText);
			break;
		case "*":
			output.innerText= Number(output.innerText)*Number(input.innerText);
			break;
		case "/":
			output.innerText= Number(output.innerText)/Number(input.innerText);
			break;
		default:
			break;
	}
}
var sen= function(St){
	switch(St){
		case "pow":
			output.innerText= Math.pow(Number(output.innerText), Number(input.innerText));
			input.innerText= "";
			break;
		case "sqrt":
			output.innerText= Math.sqrt(Number(output.innerText));
			break;

	}
}
mr.addEventListener("click", function(){
	strMemoru= output.innerText;
});
mrM.addEventListener("click", function(){
	output.innerText= Number(output.innerText)-Number(strMemoru);
	input.innerText="";
});
mrP.addEventListener("click", function(){
	output.innerText= Number(output.innerText)+Number(strMemoru);
	input.innerText="";
});
for( let i=0; i<12; i++){
	td[i].addEventListener("click", function(){
		input.innerText+= this.innerText;
	})
}
for( let i=0; i<2; i++){
	S[i].addEventListener("click", function(){
		let St= this.innerText;
		sen(St);
	})
}
for( let i=0; i<4; i++){
	app[i].addEventListener("click", function(){
		if(apperator == ""){
			apperator= this.innerText;
			act.innerText= apperator;
			output.innerText= input.innerText;
			input.innerText= "";
		}
		else{
			if(input.innerText!="")
			res();
			apperator= this.innerText;
			act.innerText= apperator;
			input.innerText= "";
		}
	})
}

eq.addEventListener("click", function(){
	if(input.innerText!="")
	res();
})








