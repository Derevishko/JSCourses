var canvas = document.getElementById( "pen" );
var ctx = canvas.getContext( "2d" );
var mouseDownFlag = false;
var xOld = 0;
var yOld = 0;
document.body.addEventListener( "mousedown", function (e) {
	mouseDownFlag = true;
	xOld = e.offsetX;
	yOld = e.offsetY;
});
document.body.addEventListener( "mouseup", function () {
	mouseDownFlag = false
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

var filter = document.getElementById( "filter" );
var ctxF = filter.getContext( "2d" );
var menu = document.getElementById( "menu" );
var img = document.getElementById( "img" );
var img2 = document.getElementById( "img2" );
menu.addEventListener( "click", function (e) {
	if ( e.target.nodeName == "BUTTON" ) {
		image = this.responseText;
		ctxF.drawImage(img2, 0, 0);
		var Dim = ctxF.getImageData( 0, 0, 545, 600);
		var l = Dim.data.length;
		switch ( e.target.innerText ){
			case "black-white":
			black( Dim, l );
			break;
			case "negative":
			negative( Dim, l );
			break;
			case "sepia":
			sepia( Dim, l );
			break;	
		}
	}
});
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
var output = function (Dim) {
	ctxF.putImageData( Dim, 0, 0 );
	var dataURL = filter.toDataURL( "image/png" );
	img.setAttribute( "src", dataURL);
}