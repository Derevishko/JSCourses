var contener= document.getElementById("contener");
var product= document.getElementById("product");
var flag=true;
var index= -1;
while(index<2){
	index++;
	onScroll();
}
window.addEventListener("scroll", function(e){onScroll();if(flag){index++}flag= false});
function onScroll(){
	if( contener.getBoundingClientRect().bottom < window.innerWidth+150){
		var xhr= new XMLHttpRequest;
		xhr.addEventListener("load", function(){
			contener.firstElementChild.innerHTML+= toHtml(JSON.parse(xhr.responseText))
		});
		xhr.open("GET", "packs/pack"+(index % 5)+".json");
		xhr.send(null);
		flag=true;
	}
}
function toHtml(mass){
	var htmlCode="";
	mass.forEach(function(elem){
		htmlCode+= "<div class='product'><h3>"+elem.name+"</h3><div>"+elem.price+"$</div><div>страна "+elem.contru+"</div></div>"
	});
	return htmlCode;
}
