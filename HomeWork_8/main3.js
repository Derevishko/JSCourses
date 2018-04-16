var black= document.getElementById("block");
black.style.left= window.innerWidth-150 + "px";
black.style.top= 0 + "px";
window.addEventListener("scroll", function (e) {
	var rect= black.getBoundingClientRect();
	var flag= false;
	var flag2= false;
	if(rect.top < 0 && rect.bottom > 0 && window.scrollY < 4000){
		flag= true;
	}
	else{
		flag= false;
	}
	if(flag){
		black.style.top= window.scrollY- list.getBoundingClientRect().height+"px" ;
	}
});