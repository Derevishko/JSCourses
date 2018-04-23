audio();
function audio(){
	var play= document.getElementById("play");
	var song= document.getElementById("song");
	var form= document.getElementById("select");
	var form2= document.getElementById("select2");
	var timer= document.getElementById("timer");
	var mute= document.getElementById("mute");
	var volume= document.getElementById("sol");
	var name= document.getElementById("name");

	form.addEventListener("change", function(e){
		song.currentTime= +this.children[0].value / 100 * song.duration;
	});
	form2.addEventListener("change", function(e){
		song.volume= +this.lastElementChild.value/100;
	});
	play.addEventListener("click", function(e){
		console.log("click");
		if(song.paused){
			song.play();
			play.innerText= "play";
		}else{
			song.pause();
			play.innerText= "pause";
		}
	});
	setInterval(function(){
		// timer.innerText= Math.floor(song.currentTime / 60)+":"+Math.floor(song.currentTime%60)+"/"+Math.floor(song.duration / 60)+":"+Math.floor(song.duration%60);
		timer.innerText= (Math.floor(song.currentTime / 60)).toString.length == 2 ? Math.floor(song.currentTime / 60) : "0" + Math.floor(song.currentTime / 60);
		timer.innerText+= ":";
		timer.innerText+= (Math.floor(song.currentTime % 60)).toString().length == 2 ?  Math.floor(song.currentTime % 60) : "0" + Math.floor(song.currentTime % 60);
		timer.innerText+= "/";
		timer.innerText+= (Math.floor(song.duration / 60)).toString.length == 2 ? Math.floor(song.duration / 60) : "0" + Math.floor(song.duration / 60);
		timer.innerText+= ":";
		timer.innerText+= (Math.floor(song.duration % 60)).toString.length == 2 ? "0"+ Math.floor(song.duration % 60) : Math.floor(song.duration % 60);
		form.children[0].value= song.currentTime / song.duration * 100;
		console.log(song.loadmetadate);
	},500);
	mute.addEventListener("click", function(e){
		song.muted= !song.muted;
	});
	volume.addEventListener("mouseover", function(){
		form2.classList.remove("invise"); 
	});
	volume.addEventListener("mouseout", function(){
		form2.classList.add("invise");
	});
}