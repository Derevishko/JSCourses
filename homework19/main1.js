function pen () {
	var canvas = document.getElementById( "pen" );
	var ctx = canvas.getContext( "2d" );
	var mouseDownFlag = false;
	var xOld = 0;
	var yOld = 0;
	var imgData = ctx.getImageData(0,0,500,500);
	var loadData;
	if ( localStorage.getItem("data") != undefined ) {
		var loadData = localStorage.getItem("data").split(",").map(x=>Number(x));
		var l = imgData.data.length;
		for ( let i = 0; i < l; i++ ) {
			imgData.data[i] = loadData[i];
		}
	}
	
	
	ctx.putImageData(imgData,0,0);
	document.body.addEventListener( "mousedown", function (e) {
		mouseDownFlag = true;
		xOld = e.offsetX;
		yOld = e.offsetY;
	});
	document.body.addEventListener( "mouseup", function () {
		mouseDownFlag = false;
		localStorage.setItem( "data", ctx.getImageData(0,0,500,500).data );
	});
	canvas.addEventListener("mousemove", function (e) {
		if ( mouseDownFlag ) {
			ctx.beginPath();
			ctx.moveTo(xOld, yOld);
			ctx.lineTo(e.offsetX, e.offsetY);
			ctx.stroke()
			xOld = e.offsetX;
			yOld = e.offsetY;
		}
	});
}
pen();

function filterator () {
	var filter = document.getElementById( "filter" );
	var ctxF = filter.getContext( "2d" );
	var menu = document.getElementById( "menu" );
	var img1 = document.getElementById( "img" );
	var img2 = document.getElementById( "img2" );
	var flagStyle = "";
	menu.addEventListener( "click", function (e) {
		if ( e.target.nodeName == "BUTTON" ) {
			ctxF.drawImage(img2, 0, 0);
			flagStyle = e.target.innerText;
			useStyle(flagStyle);
		}
	});
	var useStyle = function (flag) {
		var Dim = ctxF.getImageData( 0, 0, 545, 600);
		var l = Dim.data.length;
		switch ( flag ){
			case "black-white":
			black( Dim, l );
			break;
			case "negative":
			negative( Dim, l );
			break;
			case "sepia":
			sepia( Dim, l );
			break;	
			default:
			none( Dim );
		}
	};
	var black = function ( Dim, l ) {	
		var one = 0;
		for ( let i = 0; i < l; i += 4 ) {
			one = ( Dim.data[i] + Dim.data[i+1] + Dim.data[i+2] ) / 3;
			Dim.data[i] = one;
			Dim.data[i+1] = one;
			Dim.data[i+2] = one;
		}
		output(Dim);
	}
	var negative = function ( Dim, l ) {
		for ( let i = 0; i < l; i += 4 ) {
			Dim.data[i] = 255 - Dim.data[i];
			Dim.data[i+1] = 255 - Dim.data[i+1];
			Dim.data[i+2] = 255 - Dim.data[i+2];
		}
		output(Dim);
	}
	var sepia = function ( Dim, l ) {
		var one;
		for ( let i = 0; i < l; i += 4 ) {
			Dim.data[i] > 206 ? Dim.data[i] = 255 : Dim.data[i] += 49;
			Dim.data[i+1] < 14 ? Dim.data[i+1] = 0 : Dim.data[i+1] -= 14;
			Dim.data[i+2] < 56 ? Dim.data[i+2] = 0 : Dim.data[i+2] -= 56;
		}
		output(Dim);
	}
	var none = function ( Dim ) {
		output(Dim);
	}
	var output = function (Dim) {
		ctxF.putImageData( Dim, 0, 0 );
		var dataURL = filter.toDataURL( "image/png" );
		img.setAttribute( "src", dataURL);
	}
	img1.addEventListener( "drop", function(e){
		e.preventDefault();
		ctxF.clearRect(0,0,700,700);
		var data = e.dataTransfer.files[0];
		var reader = new FileReader();
		reader.onload = function(){
			img2.setAttribute("src", this.result);
			setTimeout( function() {
				ctxF.drawImage(img2, 0, 0);
				console.log(flagStyle)
				useStyle(flagStyle);
			},500)
		}
		reader.readAsDataURL(data);
	});
	document.body.addEventListener("dragover", function(e){
		e.preventDefault();
	})
}
filterator();


var contener = document.getElementById("contener");
var play= document.getElementById("play");
var song= document.getElementById("song");
var form= document.getElementById("select");
var form2= document.getElementById("select2");
var timer= document.getElementById("timer");
var mute= document.getElementById("mute");
var volume= document.getElementById("sol");
var name= document.getElementById("name");
var dataMusic = {
	mass : [],
	index : 0
}
contener.addEventListener( "dragenter", function(e){
	this.classList.add("blue");
});
contener.addEventListener( "dragleave", function(e){
	this.classList.remove("blue");
});
contener.addEventListener( "drop", function(e){
	e.preventDefault();
	var data = e.dataTransfer.files[0];
	var reader = new FileReader();
	reader.onload = function(){
		console.log( !song.hasAttribute("src") )
		if ( !song.hasAttribute("src") ) {
			song.setAttribute("src", this.result);
		}
		dataMusic.mass.push(this.result)
	}
	this.classList.remove("blue");
	reader.readAsDataURL(data);
});
contener.addEventListener("dragover", function(e){
	e.preventDefault();
	this.classList.remove("blue");

})


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
	song.addEventListener( "ended", function (){
		if ( dataMusic.index + 1 < dataMusic.mass.length ) {
			dataMusic.index++;
			song.setAttribute("src", dataMusic.mass[dataMusic.index]);
		} else {
			dataMusic.index = 0;
			song.setAttribute("src", dataMusic.mass[dataMusic.index]);
		}
	})
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
	},500);
	mute.addEventListener("click", function(e){
		song.muted= !song.muted;
		mute.classList.toggle("mute");
		mute.classList.toggle("Mute");
		console.log(mute.classList);
	});
	volume.addEventListener("mouseover", function(){
		form2.classList.remove("invise"); 
	});
	volume.addEventListener("mouseout", function(){
		form2.classList.add("invise");
	});
