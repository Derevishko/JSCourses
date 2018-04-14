// var one= document.getElementById("onePlayer");
var repet= document.getElementById("repet");
var table2= document.getElementById("game");
var game= function(){
	var style= document.getElementById("back");
	var menu= document.getElementById("menu");
	var table= table2;
	var flag= true;
	var flag2= false;
	var flag3= true;
	var flag4= true;
	var arr= new Array(9);
	arr.fill(undefined);
	var str=""
	var winer= document.getElementById("win");
	var plaverOne= "ПЕРВЫЙ ИГРОК";
	var plaverTwo= "";
	var q= 0;
	menu.addEventListener("click", function(e){
		if(e.target.innerText=="Один игрок"){
			plaverTwo= "КОМПЬЮТЕР";
			menu.classList.add("invise");
			
		}else if(e.target.innerText=="Два игрока"){
			plaverTwo= "ВТОРОЙ ИГРОК";
			menu.classList.add("invise");
					flag3=false;
		}
		table.classList.toggle("invise");
		if(flag3){	
			table.addEventListener("click", function(e){
				if(e.target.nodeName=="TD" && e.target.classList==""){		
					e.target.classList.add("ix");
					arr[ +e.target.innerText-1]= 1;
					result();
					q++;
					flag= !flag;
					if(q==9) {
						winer.innerText="ПОБЕДИЛА ДРУЖБА";
						table.classList.toggle("invise");
						table.outerHTML= table.outerHTML; 
						winer.classList.add("win");
						repet.classList.toggle("invise");
					}

					if(flag4) {compMoveRandom();}
					q++;
					result();
					flag= !flag;

				}
			});
		}else{
			table.addEventListener("click", function(e){
			if(e.target.nodeName=="TD" && e.target.classList==""){
				if(flag){
					e.target.classList.add("ix");
					arr[ +e.target.innerText-1]= 1;
					
				}else{
					e.target.classList.add("zero");
					arr[ +e.target.innerText-1]= 0;
				}
				result();
				q++;
				if(q==9) {
						winer.innerText="ПОБЕДИЛА ДРУЖБА";
						table.classList.toggle("invise");
						table.outerHTML= table.outerHTML; 
						winer.classList.add("win");
						repet.classList.toggle("invise");
					}
				flag= !flag;
				}
			});
		}
	});

	var result= function(){
		if(((arr[0]==arr[4]&&arr[8]==arr[0])||(arr[2]==arr[4]&&arr[2]==arr[6]))&&arr[4]!=undefined){flag2=true;str= arr[4]}
		else{
				for( let i=0; i<3; i++ ){
					if(arr[i*3]==arr[i*3+1]&&arr[i*3]==arr[i*3+2]&&arr[i*3+1]==arr[i*3+2]&&arr[i*3]!=undefined){flag2=true; str= arr[i]; console.log(i); break}
				}
				
				if(!flag2){
					for(let i=0; i<3; i++ ){
						if(arr[i]==arr[i+3]&&arr[i]==arr[i+6]&&arr[i+3]==arr[i+6]&&arr[i]!=undefined){flag2=true; str= arr[i]; break}
					}
				}	
			}
		

		if(flag2){
			console.log(arr, flag);
			
			table.classList.toggle("invise");
			table.outerHTML= table.outerHTML; 
			if(flag){winer.innerText= "ПОБЕДИЛ "+plaverOne}
			else{winer.innerText= "ПОБЕДИЛ "+plaverTwo}
			winer.classList.add("win");
			repet.classList.toggle("invise");
		}

	}
	var compMoveRandom= function(){
		var q= Math.floor(Math.random()*9);
		for( let i=q; i<9; i++ ){
			if(arr[i]==undefined){
				table.firstElementChild.children[Math.floor(i/3)].children[i%3].classList.add("zero"); arr[i]=0; break;
			}
			if(i==8){
				i=0;
			}
		}
	}
	back.addEventListener("change",function(e){
		document.body.classList.remove("see");
		document.body.classList.remove("mount");
		document.body.classList.remove("Pole");
		document.body.classList.add(back.value);
	})

}

game();
repet.addEventListener("click", function(){
	location.reload();
});

// var compMove= function(a){
// 	if(arr[4]==1){
// 		table.firstElementChild.children[0].children[0].classList.add("zero");
// 		arr[0]=0;
// 		compMove= compMove2;
// 	}
// 	else{
// 		table.firstElementChild.children[1].children[1].classList.add("zero");
// 		arr[4]=0;
// 	}

// }


// var compMove2= function(a){
// 	switch(a.innerText-1){
// 		case 1: 
// 			table.firstElementChild.children[2].children[1].classList.add("zero");arr[7]=0;
// 			compMove= compMove41;break;
// 		case 2: 
// 			table.firstElementChild.children[2].children[0].classList.add("zero");arr[6]=0;
// 			compMove= compMove42;break;
// 		case 3: 
// 			table.firstElementChild.children[1].children[2].classList.add("zero");arr[5]=0;
// 			compMove= compMove33;break;
// 		case 5: 
// 			table.firstElementChild.children[1].children[0].classList.add("zero");arr[3]=0;
// 			compMove= compMove35;break;
// 		case 6: 
// 			table.firstElementChild.children[0].children[2].classList.add("zero");arr[2]=0;
// 			compMove= compMove36;break;
// 		case 7: 
// 			table.firstElementChild.children[0].children[1].classList.add("zero");arr[1]=0;
// 			compMove= compMove37;break;
// 		case 8: 
// 			table.firstElementChild.children[2].children[0].classList.add("zero");arr[6]=0;
// 			compMove= compMove38;break;
// 	}
// }
// var compMove41= function(a){
// 	if(a.innerText==3){
// 		table.firstElementChild.children[2].children[0].classList.add("zero");arr[6]=0;
// 		compMove= win3or8;
// 	}
// 	else if(a.innerText==4){
// 		table.firstElementChild.children[1].children[2].classList.add("zero");arr[5]=0;
// 		compMove= compMove6;
// 	}
// 	else{
// 		table.firstElementChild.children[2].children[0].classList.add("zero");arr[3]=0;
// 		compMove= compMove3;
// 	}
// }
// var compMove3= function(a){
// 	if(arr[3]=undefined){
// 		table.firstElementChild.children[1].children[0].classList.add("zero");arr[3]=0;
// 	}
// 	else{}
// }
// var compMove6= function(a){
// 	if(arr[6]==undefined){
// 		table.firstElementChild.children[2].children[0].classList.add("zero");arr[6]=0;
// 	}
// 	else{
// 		table.firstElementChild.children[0].children[2].classList.add("zero");arr[2]=0;
// 	}
// }
// var win3or8= function(a){
// 	if (arr[3]==undefined) {
// 		table.firstElementChild.children[1].children[0].classList.add("zero");arr[3]=0;
// 	}else{
// 		table.firstElementChild.children[2].children[2].classList.add("zero");arr[8]=0;
// 	}
// }
// var rand= function(a){
// 	for( let i=0; i++; i<9 ){
// 		if(arr[i]==undefined){
// 			arr[i]=0;
// 			table.firstElementChild.children[2].children[2].classList.add("zero");
// 			break;
// 		}
// 	}
// }

// var compMove421= function(a){
// 	console.log(arr[3]);
// 	if(a.innerText!=4){
// 		table.firstElementChild.children[1].children[0].classList.add("zero");arr[3]=0;
// 	}
// 	else{
// 		table.firstElementChild.children[1].children[2].classList.add("zero");arr[5]=0;
// 		compMove= rand;
// 	}
// }
// var compMove42= function(a){
// 		table.firstElementChild.children[2].children[0].classList.add("zero");arr[6]=0;
// 		compMove= compMove421;
// }


