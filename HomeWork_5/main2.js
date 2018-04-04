var eras= function(){
	var N= +prompt('До какого числа выводить решето Эрастофена?');
	var table= document.getElementById("table");
	var tr= document.createElement("tr");
	var td= document.createElement("td");
	var z=N;
	var q=1;
	N= Math.ceil(Math.sqrt(N));

	for( let i=0; i<N ; i++)
	{ 
			if(q>z){
				break;
			}
		table.appendChild(tr.cloneNode());
		for( let j=0; j<N; j++){
			if(q<=z){
				table.lastElementChild.appendChild(td.cloneNode());
				table.lastElementChild.lastElementChild.innerText=q;
				q++;
			}
			else{
				break;
			}
		
		}
	}

	var arg= table.firstElementChild;
	var arg3= arg.firstElementChild.nextElementSibling;
	var arg2= arg3.nextElementSibling;

	table.setAttribute("style", "border-style: solid; border-color: #AAAAAA; width: 50vw; height: 50vh; margin: auto; font-size: 20px; text-align: center");
	table.firstElementChild.firstElementChild.setAttribute("style","color: red; background-color: #BBBBBB ");
		var e= setInterval(function(){
			
			console.log(Number(arg2.innerText))

			if((Number(arg2.innerText)) % (Number(arg3.innerText)) == 0 && (Number(arg2.innerText)) != (Number(arg3.innerText))){
				arg2.setAttribute("style","color: red; background-color: #BBBBBB ")
			}

			if(arg2.nextElementSibling != null){
				arg2= arg2.nextElementSibling;
			}

			else if(arg.nextElementSibling != null){
				arg= arg.nextElementSibling;
				arg2= arg.firstElementChild;
			}

			else if(arg3.nextElementSibling != null){
				arg= table.firstElementChild;
					arg3= arg3.nextElementSibling;
				arg2= arg3;

			}
			else{
				var finish= document.getElementById("finish");
				finish.innerText="Finish!";
				finish.setAttribute("style", "margin: auto; font-size: 40px; text-align: center");
				clearInterval(e);
			}

		},150);
}

eras();