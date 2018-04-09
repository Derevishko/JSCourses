// var pol= document.getElementById("pol");

// var botP= document.getElementById("+");
// var botM= document.getElementsByClassName("-");
// var td= document.createElement("td");


// botP.addEventListener("click", function(){
// 	var tdM= document.createElement("<td><button class='-'>-</button></td>>")
// 	pol.children[0].firstElementChild.appendChild(td);
// 	pol.children[0].lastElementChild.appendChild(td);
// 	pol.children[0].firstElementChild.children[i].outerHTML= tdM ;
// })
var nameR= /\w{0,19}/;
var emailR= /^[a-z][\w\d\_\.]*\@[a-z][a-z]*\.\w{2,10}\.?$/
var telR= /^\+?\s*(375|80)\s*\(?(25|29|33|44)\)?\s*\-*\d\s*\-*\d\s*\-*\d\s*\-*\d\s*\-*\d\s*\-*\d\s*\-*\d$/;
var pageR= /^((https?:\/\/\/?)?(www\.)?\w[\w\_\.]*\w\.\w{2,10})/ 
var form= document.getElementById("form");
var div= document.getElementById("div");
var flag= new Array(5);
form.addEventListener("input", function(){
if(this.firstElementChild.value!=""){	
	if(this.firstElementChild.value.match(nameR) != this.firstElementChild.value){
		this.firstElementChild.setAttribute("style","background-color: red");
		flag[0]=false;
	}
	else{
		this.firstElementChild.setAttribute("style","background-color: #AADDAA");
		flag[0]=true;
	}
}

if(this.children[1].value!=""){
	if(this.children[1].value<0||this.children[1].value>125||this.children[1].value!= parseFloat(this.children[1].value)){
		this.children[1].setAttribute("style","background-color: red");
		flag[1]=false;
	}
	else{
		this.children[1].setAttribute("style","background-color: #AADDAA");
		flag[1]=true;
	}
}

if(this.children[2].value!=""){
	if(this.children[2].value.match(emailR)==null){
		this.children[2].setAttribute("style","background-color: red");
		flag[2]=false;
	}
	else{
		this.children[2].setAttribute("style","background-color: #AADDAA");
		flag[2]=true;
	}
}

if(this.children[3].value!=""){
	if(this.children[3].value.match(telR)==null){
		this.children[3].setAttribute("style","background-color: red");
		flag[3]=false;
	}
	else{
		this.children[3].setAttribute("style","background-color: #AADDAA");
		flag[3]=true;
	}
}

if(this.children[4].value!=""){
	if(this.children[4].value.match(pageR)==null){
		this.children[4].setAttribute("style","background-color: red");
		flag[4]=false;
	}
	else{
		this.children[4].setAttribute("style","background-color: #AADDAA");
		flag[4]=true;
	}
}
});

form.lastElementChild.addEventListener("click",function(){
	var flagG=true;
	for( var i=0; i<5; i++){
		if(!flag[i]){
			flagG=false;
			break;
		}
	}
	
	if(flagG){
		div.innerText= "Форма заполнена верно";
	}
	else{
		div.innerText= "Проверьте введённые данные";
	}

})