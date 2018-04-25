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
	var ul= document.getElementById("ul");
	var ol= document.getElementById("ol");
	var x= document.getElementById("del");
	var backColor= document.getElementById("backColor");

	backColor.addEventListener("change", function(){
		document.execCommand("backcolor",false,backColor.value)
	});
	x.addEventListener("click", function(){
		document.execCommand("removeformat",false,null)
	});
	ul.addEventListener("click", function(e){
		document.execCommand("insertunorderedlist",false,null)
	});
	ol.addEventListener("click", function(e){
		document.execCommand("insertorderedlist",false,null)
	});
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
			ol.disabled= true;
			ul.disabled= true;
			x.disabled= true;
		}else{
			bold.disabled = false;
			italic.disabled = false;
			size.disabled = false;
			textColor.disabled= false;
			textStyle.disabled= false;
			butR.disabled= false;
			butC.disabled= false;
			butL.disabled= false;
			ol.disabled= false;
			ul.disabled= false;
			x.disabled= false;
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
		if(document.queryCommandState("insertorderedlist")){
			ol.style.backgroundColor= "#aaaaaa";
		}else{
			ol.style.backgroundColor="";
		}		
		if(document.queryCommandState("insertunorderedlist")){
			ul.style.backgroundColor= "#aaaaaa";
		}else{
			ul.style.backgroundColor="";
		}		
			backColor.value= document.queryCommandValue("backcolor");
			textColor.style.color= document.queryCommandValue("forecolor");
			size.value= document.queryCommandValue("fontsize");
			textStyle.value= document.queryCommandValue("fontname");
			
	},100);
}