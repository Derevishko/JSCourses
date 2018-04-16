var list= document.getElementById("Exs2");
list.addEventListener("click", function(e){
	if(e.target.nodeName!="UL"&&e.target.children[0]!=undefined){
		e.target.firstElementChild.classList.toggle("invise");
	}
});