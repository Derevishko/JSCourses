var timer= function(){
	var time= document.getElementById("time");
	
	time.setAttribute("style", "color: #00cc00; font-size: 33px; width: 15vw;  margin-top: 10vh; margin-left: auto; margin-right: auto;width:294px;height:445px; background-repeat: no-repeat;box-sizing: border-box;padding-left:105px; padding-top: 94px");
	var q= " ";
	var t= setInterval(function(){
		var d= new Date();
		var str= "";
		var arr= [];
		// str+= (23-d.getHours())+" "+(59-d.getMinutes())+"."+(60-d.getSeconds());
		if(Number(d.getSeconds())%2==0){
			q= ".";
		}
		else{
			q=" ";
		}

		if( 23-d.getHours() < 10 ){
			arr[0]= "0"+(23-d.getHours());
		}
		else{
			arr[0]= (23-d.getHours());
		}
		if(d.getMinutes()==0){
			arr[1]= "00";
		}
		else if( 59-d.getMinutes() < 10 ){
			arr[1]= "0"+(59-d.getMinutes());
		}
		else{
			arr[1]= (59-d.getMinutes());
		}

		if( 60-d.getSeconds() < 10 ){
			arr[2]= "0"+(60-d.getSeconds());
			str+= arr[0];
			str+= q+arr[1];
			str+= q+arr[2] ;
		}
		else{
			if(d.getSeconds() == 0){
					str+= arr[0];
					str+= q+(Number(arr[1])+1);
					str+= q+"00" ;

			}
			else{
				arr[2]= 60-d.getSeconds()
				str+= arr[0];
				str+= q+arr[1];
				str+= q+arr[2];
			}
		}
		
		time.innerHTML= "<b>"+str+"</b>";
		
	},1000);
}
timer();