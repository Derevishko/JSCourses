mult();
firstLoad();
function mult(){
	var tableMultiply= document.createElement("table");
	var contTableMultiply= document.getElementById("TableMult");
	contTableMultiply.addEventListener("click", function(e){
		if(e.target.nodeName=="BUTTON"){
			this.firstElementChild.remove();
			this.innerText= "Loading";
			var xhr= new XMLHttpRequest;
			xhr.addEventListener("load", function(){
				contTableMultiply.innerText= "";
				contTableMultiply.appendChild(tableMultiply);
				console.log(xhr.responseText);
				var l= Number(xhr.responseText);
				for( var i=0; i<l; i++){
					var tr= document.createElement("tr");
					tableMultiply.appendChild(tr);
					for( var j=0; j<l; j++){
						var td= document.createElement("td");
						tableMultiply.lastElementChild.appendChild(td);
						tableMultiply.lastElementChild.lastElementChild.innerText= (i+1)*(j+1);
					}
				}
			});
			xhr.open("GET","table.txt",true);
			xhr.send(null);
		}
	});
}

var news= document.getElementsByClassName("news");
news= news[0];

window.addEventListener("scroll", function(e){
	if( document.body.getBoundingClientRect().bottom < window.innerHeight+100 ){
		var xhr= new XMLHttpRequest;
		xhr.addEventListener("load", function(){
			news.innerHTML+= xhr.responseText;
			var time= document.getElementsByClassName("time");
			var l= time.length;
			var d;
			for( var i=0; i<l; i++ ){
				if(time[i].innerText==""){
					d= new Date();
					time[i].innerText= d.getDate() + "." +(d.getMonth()+1)+ "." +d.getFullYear()+	 "  " + d.getHours() + ":" + d.getMinutes();
				}
			}
		});
		xhr.open("GET", "news.html", true);
		xhr.send(null);
	}
});

function firstLoad(){
		var xhr= new XMLHttpRequest;
		xhr.addEventListener("load", function(){
		news.innerHTML+= xhr.responseText;
		var time= document.getElementsByClassName("time");
		var l= time.length;
		var d;
		for( var i=0; i<l; i++ ){
			if(time[i].innerText==""){
				d= new Date();
				time[i].innerText= d.getDate() + "." +(Number(d.getMonth())+1)+ "." +d.getFullYear()+	 "  " + d.getHours() + ":" + d.getMinutes();
			}
		}
	});
	xhr.open("GET", "news.html", true);
	xhr.send(null);
}

var url= document.getElementById("url");
var resalt= document.getElementById("resalt");
url.addEventListener("click", function(e){
	if(e.target.nodeName=="BUTTON"){
		resalt.classList.add("loading");
		var xhr= new XMLHttpRequest;
		xhr.addEventListener("load", function(){
			resalt.innerText= xhr.responseText;
			resalt.classList.remove("loading");
		});
		xhr.open("GET",this.firstElementChild.value,true);
		xhr.send(null);
	}
})