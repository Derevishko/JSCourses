var table= document.getElementById("color");
var n= prompt("N=");
for( let i=0; i<n; i++ ){
	let td= document.createElement("td");
	table.appendChild(td);
	for( let j=0; j<n; j++ ){
		let tr= document.createElement("tr");
		table.lastElementChild.appendChild(tr);
		table.lastElementChild.lastElementChild.innerText= i+j*10+1;
	}
}
table.addEventListener("mouseover", function(e){
	if(e.target.nodeName=="TR"){
		e.target.setAttribute("style", "background-color: rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")");
	}	
});
table.addEventListener("mouseout", function(e){
	if(e.target.nodeName=="TR"){
		e.target.removeAttribute("style");
	}	
});