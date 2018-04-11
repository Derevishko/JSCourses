var form= document.getElementById("mail");
var reg= /\w\.\@\_\d/
var emailR= /^[a-z][\w\d\_\.]*\@[a-z][a-z]*\.\w{2,10}\.?$/
var dot= false;
var dog= false;
var line= false;
var div= document.getElementById("out");
form.addEventListener("keydown",function(e){
	if(e.target==this.firstElementChild){
		if(e.key.match(reg)!=""&&e.key.length==1){
			switch(e.key) {
				case ".":
					if(dog&&dot||form.firstElementChild.value==""){
						e.preventDefault();
					}
					dot= true;
					break;
				case "@":
					if(dot||line||form.firstElementChild.value.length<3||dog){
						e.preventDefault();
						break;
					}
					else{
						dog= true;
					}
				case "_":
				if(form.firstElementChild.value==""){
					e.preventDefault();}
					else{
						line= true;
					}
					break;
				case "-":
					if(form.firstElementChild.value==""){
						e.preventDefault();
					}
					line= true;
					break;
				default:
					if(e.key/0==Infinity&&(form.firstElementChild.value==""||dog)){
						e.preventDefault();
					}
					else{
						line= false; 
						if(!dog){
							dot= false;
						}
					}
				}
		}
	}
});
form.addEventListener("click", function(e){
	if(e.target==this.lastElementChild){
		if(form.firstElementChild.value.match(emailR)==form.firstElementChild.value){
			div.innerText= "Верно";
		}
		else{
			div.innerText= "Не верно";
		}
	}
})