var pif= function(){
	var N= +prompt('До какого числа выводить таблицу пифогора?');
	var table= document.getElementById("table2");
	var tr= document.createElement("tr");
	var td= document.createElement("td");

	for( let i=0; i<N ; i++)
	{ 
		table.appendChild(tr.cloneNode());
		for( let j=0; j<N; j++){
			table.lastElementChild.appendChild(td.cloneNode());
			table.lastElementChild.lastElementChild.innerText=(i+1)*(j+1);
		
		}
	}
	table.setAttribute("style", "border-style: solid; border-color: #AAAAAA; width: 50vw; height: 50vh; margin: auto; font-size: 20px; text-align: center");
	var i=0;
	var e= setInterval(function(){
		
			table.children[i].children[i].setAttribute("style","background-color: red")
			i++;
			if(i==N){
				clearInterval(e);
			}


	},500)
}
pif();