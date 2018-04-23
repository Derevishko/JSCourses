text();
function text(){
	var menu= document.getElementById("textMenu");
	var div	= document.getElementById("text");
	var bold= document.getElementById("bold");
	var italic= document.getElementById("italic");
	var list= document.getElementById("list");
	var textColor= document.getElementById("textColor");
	var size= document.getElementById("size");
	var textStyle= document.getElementById("textStyle");
	var justify= document.getElementById("justify");
	var butL= document.getElementById("l");
	var butC= document.getElementById("c");
	var butR= document.getElementById("r");
	justify.addEventListener("click", function(e){
		if(e.target.nodeName="BUTTON"){
			document.execCommand(e.target.value, false, null);
		}
	})
	textStyle.addEventListener("change", function(){
		document.execCommand("fontname", false, textStyle.value);
	});
	size.addEventListener("change", function(){
		document.execCommand("fontsize",false, Number(size.value))	;
	});
	textColor.addEventListener("change", function(){
		document.execCommand("forecolor",false,textColor.value);
	});
	italic.addEventListener("click", function(){
		document.execCommand("italic",false,null);
	});
	bold.addEventListener("click", function(){
		document.execCommand("bold", false, null);
	});

	setInterval(function(){
		if(!document.queryCommandEnabled("bold")){
			bold.disabled = true;
			italic.disabled = true;
			size.disabled = true;
			textColor.disabled= true;
			textStyle.disabled= true;
			butR.disabled= true;
			butC.disabled= true;
			butL.disabled= true;
		}else{
			bold.disabled = false;
			italic.disabled = false;
			size.disabled = false;
			textColor.disabled= false;
			textStyle.disabled= false;
			butR.disabled= false;
			butC.disabled= false;
			butL.disabled= false;
		}
		if(document.queryCommandState("bold")){
			bold.style.backgroundColor= "#aaaaaa";
		}else{
			bold.style.backgroundColor="";
		}
		if(document.queryCommandState("italic")){
			italic.style.backgroundColor= "#aaaaaa";
		}else{
			italic.style.backgroundColor="";
		}
			textColor.style.color= document.queryCommandValue("forecolor");
			size.value= document.queryCommandValue("fontsize");
			textStyle.value= document.queryCommandValue("fontname");
			
	},100);
}