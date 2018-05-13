var App = {
	htmlBlocks : {
		contener : document.getElementById("contener"),
		activeImage : document.getElementById("active-img"),
		smallImgs : document.getElementById("small-imgs"),
		coments : document.getElementById("coments"),
		menu : document.getElementById("menu-gallery")
	},
	const : {
		JSON_DOC : "json/imgs.json",
		LENGTH_GALLERY : 0
	},
	functions : {
		loadingJson : function () {
			var promise = new Promise( function( resolve, reject ){
				App.functions.loadingData (resolve, reject)
			});
			promise.then ( function (data) {
				App.functions.secondStap (data)
			},
			function (data) {
				alert ( data )
			})
			
		},
		loadingData : function ( resolve, reject ) {
			var xhr= new XMLHttpRequest;
			xhr.open ( "GET", App.const.JSON_DOC, true );
			xhr.send (null);
			xhr.addEventListener ( "load", function () {
				resolve ( JSON.parse( xhr.responseText ) )
			});
			xhr.addEventListener( "error", function () {
				reject( "error on load data" );
			})
		},
		secondStap : function (data) {
			var baseName = App.data;
			baseName.objData = data;
			App.const.LENGTH_GALLERY = baseName.objData.imgs.length;
			baseName.arrayImg = this.getArrayImages ( baseName.objData );
			baseName.arrayComents = this.getArrayComents ( baseName.objData );
			this.representImg (baseName.index, baseName.arrayImg, baseName.arrayComents[baseName.index] );
		},
		representImg : function ( index, arrayImages, coment ) {
			App.htmlBlocks.activeImage.innerHTML = `<img src='${arrayImages [ index ]}'>`;
			App.htmlBlocks.coments.innerText = coment;
			this.representSmallImages( index, arrayImages );
			
		},
		representSmallImages : function ( index, arrayImages ) {
			App.htmlBlocks.smallImgs.innerHTML = ``;
			var l = App.const.LENGTH_GALLERY;
			// 2 предыдущих и 2 следующих картинки и 2 на каждой стороне за пределами видимости
			for ( let i = -4; i < 5; i++ ) {
				App.htmlBlocks.smallImgs.innerHTML += `<img src='${ arrayImages [ this.returnIndex( index + i, l) ] }'
				 value='${ this.returnIndex( index + i, l) }' data-value='${i}'>`
			}
		},
		returnIndex : function (index, l){
			return index > 0 ? (index % l) : (l + index) % 5
		},
		getArrayImages : function ( objectData ) {
			return objectData.imgs.map ( function (elem){
				return elem.adress
			})
		},
		getArrayComents : function ( objectData ) {
			return objectData.imgs.map ( function (elem){
				return elem.text
			})
		},
		
		setMenuEventListener : function (target) {
			var baseName = App.data;
			var countyOfMoving = 0;
			if ( target.nodeName == "IMG" && target.hasAttribute( "data-action" ) ){
				if ( target.getAttribute( "data-action" ) == "to left" ){
				  this.onOneStep (-1);
				  countyOfMoving = -1
				} else {
					this.onOneStep (1);
				  countyOfMoving = 1
				}
			} else if ( target.nodeName == "IMG" ) {
					countyOfMoving = target.getAttribute( "data-value" )
				baseName.index =  Number( target.getAttribute("value") );
			};
			if ( countyOfMoving > 0 && App.data.flagMoving ){
				App.data.flagMoving = false;
				this.fromCenterToLeft(baseName);
			} else if ( countyOfMoving < 0 && App.data.flagMoving  ){
				App.data.flagMoving = false;
				this.fromCenterToRight(baseName)
			}
			if (  App.data.flagMovingCarusel && countyOfMoving ){
				App.data.flagMovingCarusel = false;
				this.carusel( countyOfMoving );
			}
			
			
		},
		onOneStep : function (step) {
			App.data.index = this.returnIndex( App.data.index + step, App.const.LENGTH_GALLERY )
		},
		fromCenterToLeft : function (data) {
			var position = App.htmlBlocks.activeImage;
			var small = App.htmlBlocks.smallImgs;
			var startPosition = position.getBoundingClientRect().left;
			position.style.setProperty( "left", "0px" );			

			var interval = setInterval( function () {
				position.style.left = parseFloat( position.style.left ) - 35 + "px";
				if ( parseFloat( position.style.left) < - parseFloat(window.innerWidth)  ){
					clearInterval(interval);
					App.functions.representImg ( data.index, data.arrayImg, data.arrayComents[data.index] );
					App.functions.fromRightToCenter (position, small, startPosition)
				}
			},15)
		},
		fromRightToCenter : function (position, small, finishPosition) {
			position.style.left = `${window.innerWidth}px`;
			App.htmlBlocks.smallImgs.style.removeProperty("right");
			var interval = setInterval( function () {
				position.style.left = parseFloat( position.style.left ) - 35 + "px";
				if ( parseFloat( position.style.left)  <  finishPosition ){
					position.style.left= 0 + "px";
					position.style.removeProperty("left");
					App.data.flagMoving = true;
					clearInterval( interval );
					App.htmlBlocks.smallImgs.classList.add( "stop" );
					App.data.flagMovingCarusel = true
				}
			},15)
		},
		fromCenterToRight : function (data) {
			var position = App.htmlBlocks.activeImage;
			var small = App.htmlBlocks.smallImgs;
			var startPosition = position.getBoundingClientRect().right;
			position.style.setProperty("right", "0px");
			var interval = setInterval( function () {
				position.style.right = parseFloat( position.style.right ) - 35 + "px";
				if ( parseFloat( position.style.right) < - parseFloat(window.innerWidth)  ){
					clearInterval(interval);
					App.functions.representImg ( data.index, data.arrayImg, data.arrayComents[data.index] );
					App.functions.fromLeftToCenter ( position, small, startPosition );
				}
			},15)
		},
		fromLeftToCenter : function (position, small, finishPosition) {
			position.style.right = `${window.innerWidth}px`
			App.htmlBlocks.smallImgs.style.removeProperty("right");;
			var interval = setInterval( function () {
				position.style.right = parseFloat( position.style.right ) - 35 + "px";
				if ( parseFloat( position.style.right)  < 0 ){
					position.style.right= 0 + "px";
					position.style.removeProperty("right");
					App.data.flagMoving = true;
					clearInterval(interval)
					App.htmlBlocks.smallImgs.classList.add("stop");
					App.data.flagMovingCarusel = true
				}
			},15)
		},
		carusel : function ( koficent ) {
			App.htmlBlocks.smallImgs.classList.remove("stop");
			var small = App.htmlBlocks.smallImgs;
			var signKof = koficent / Math.abs( koficent );
			small.style.setProperty("right","0px");
			var timer = setInterval (function () {
				small.style.right = parseFloat(small.style.right) + 0.31 * koficent + "%";
				if (  Math.abs( parseFloat(small.style.right) ) > 20.5  * Math.abs( koficent )){
					clearInterval(timer);
				}
			},15)
		}

	},
	data : {
		objData : null,
		arrayImg : null,
		arrayComents : null,
		index : 0,
		flagMoving : true,
		flagMovingCarusel : true
	},
	events : {
		addEvents : function () {
			var func = App.functions;
			App.htmlBlocks.menu.addEventListener( "click", function(e){
				func.setMenuEventListener(e.target);
			})
		}
	},
	startApp : function () {
		App.functions.loadingJson ();
		App.events.addEvents ();
	},

}
App.startApp();


//--------------------------------?