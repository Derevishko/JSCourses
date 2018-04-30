var start= document.getElementById("start");
var oldHash="";
start.addEventListener("click", function(){
	document.getElementById("contener-market").classList.remove("invise");
	location.hash= "#categories";
	start.classList.add("invise")
})

var cart= document.getElementById("cart");
var menu= document.getElementById("menu");
var product= document.getElementById("product");
var hash="#";
var back= document.getElementById("back");
back.addEventListener("click",function(){
	history.back();
	location.hash=="" ? hash= "#" : hash= location.hash;
})
goToMarket();
function goToMarket(){
	var xhr= new XMLHttpRequest;
	xhr.addEventListener("load",function(){
		selectCategoru(this);
	});
	xhr.open("GET", "Json/categories.json", true);
	xhr.send(null);
}
function selectCategoru(xhr){
	var obj= JSON.parse(xhr.responseText);
	if(obj.type=="categories"){
		menu.innerHTML="";
		obj.names.forEach(function(name){
			menu.innerHTML+= "<a href='"+hash+name+"'>"+name+"</a>   ";
		});
	}else if( obj.type=="items"){
		product.innerHTML="";
		obj.item.forEach(function(prod){
			product.innerHTML+= "<div class='product'><h3>"+prod.name+"</h3><span class='price'>"+prod.price+"</span><span class='price'>$</span><img src='"+prod.img+"'/><button data-action='addToCart'>Add to cart</button></div>"
		});
	}
}
document.getElementById("contener-market").addEventListener("click", function(e){
	if(e.target.getAttribute("data-action") == "addToCart"){
		cart.innerHTML+= e.target.parentNode.outerHTML;
		cart.lastElementChild.lastElementChild.setAttribute("data-action", "removeFromCart");
		cart.lastElementChild.lastElementChild.innerText= "Remove from cart";
		cart.firstElementChild.firstElementChild.innerText= Number(cart.firstElementChild.firstElementChild.innerText) + Number(e.target.parentNode.children[1].innerText);
		cart.firstElementChild.lastElementChild.innerText++;
	}else if(e.target.getAttribute("data-action") == "removeFromCart"){
		e.target.parentNode.remove();
		cart.firstElementChild.firstElementChild.innerText= Number(cart.firstElementChild.firstElementChild.innerText) - Number(e.target.parentNode.children[1].innerText);
		cart.firstElementChild.lastElementChild.innerText--;
	}
});
window.addEventListener("hashchange",function(e){
	if(oldHash != location.hash){
		var xhr= new XMLHttpRequest;
		hash= location.hash;
		xhr.addEventListener("load", function(){selectCategoru(this)});
		xhr.open("GET", "Json/"+hash.slice(1)+".json");
		xhr.send(null);
	}
	oldHash= location.hash
	
},100)