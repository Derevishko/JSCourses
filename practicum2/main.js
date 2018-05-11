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
				App.functions.onloadData (resolve, reject)
			});
			promise.then ( function (data) {
				App.functions.secondStap (data)
			},
			function (){
				alert ( "error" )
			})
			
		},
		onloadData : function ( resolve, reject ) {
			var xhr= new XMLHttpRequest;
			xhr.open ( "GET", App.const.JSON_DOC, true );
			xhr.send (null);
			xhr.addEventListener ( "load", function () {
				resolve ( JSON.parse( xhr.responseText ) )
			})
		},
		representImg : function ( index, arrayImages, coment ) {
			App.htmlBlocks.activeImage.innerHTML = `<img src='${arrayImages [ index ]}'>`;
			App.htmlBlocks.coments.innerText = coment;
			this.representSmallImages( index, arrayImages );
			
		},
		representSmallImages : function ( index, arrayImages ) {
			App.htmlBlocks.smallImgs.innerHTML = ``;
			var l = App.const.LENGTH_GALLERY;
			for ( let i = -2; i < 3; i++ ) {
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
		secondStap : function (data) {
			var self = App.namespace;
			self.objData = data;
			App.const.LENGTH_GALLERY = self.objData.imgs.length;
			self.arrayImg = this.getArrayImages ( self.objData );
			self.arrayComents = this.getArrayComents ( self.objData );
			this.representImg (self.index, self.arrayImg, self.arrayComents[self.index] );
		},
		setMenuEventListener : function (target) {
			var self = App.namespace;
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
				if ( target.getAttribute( "data-value" ) > 0 ){
					countyOfMoving = 1
				} else if ( target.getAttribute( "data-value" ) < 0 ){
					countyOfMoving = -1
				}
				self.index =  Number( target.getAttribute("value") );
			};
			if ( countyOfMoving < 0){
				this.fromCenterToLeft(self)
			} else if ( countyOfMoving > 0 ){
				this.fromCenterToRight(self)
			}

			
		},
		onOneStep : function (step) {
			App.namespace.index = this.returnIndex( App.namespace.index + step, App.const.LENGTH_GALLERY )
		},
		fromCenterToLeft : function (self) {
			var position = App.htmlBlocks.activeImage;
			position.style.setProperty("left", "0px");
			var small = App.htmlBlocks.smallImgs;
			small.style.setProperty( "opacity", 1);
			var interval = setInterval( function () {
				small.style.opacity -= 0.02;
				position.style.left = parseFloat( position.style.left ) - 15 + "px";
			if ( parseFloat( position.style.left) < - parseFloat(window.innerWidth)  ){
				clearInterval(interval);
				App.functions.representImg ( self.index, self.arrayImg, self.arrayComents[self.index] );
				App.functions.fromRightToCenter()
			}
			},15)
		},
		fromRightToCenter : function () {
			var position = App.htmlBlocks.activeImage;
			position.style.left = `${window.innerWidth}px`;
			var small = App.htmlBlocks.smallImgs;
			var newOpacity = 0;
			var interval = setInterval( function () {
				position.style.left = parseFloat( position.style.left ) - 15 + "px";
				newOpacity += 0.02;
				small.style.opacity = newOpacity;
			if ( parseFloat( position.style.left)  <  0.05 * parseFloat(window.innerWidth)     ){
				position.style.removeProperty("left");
				position.style.removeProperty("opacity");
				clearInterval(interval)
			}
			},15)
		},
		fromCenterToRight : function (self) {
			var position = App.htmlBlocks.activeImage;
			var small = App.htmlBlocks.smallImgs;
			small.style.setProperty( "opacity", 1);
			position.style.setProperty("right", "0px");
			var interval = setInterval( function () {
				small.style.opacity -= 0.02;
				position.style.right = parseFloat( position.style.right ) - 15 + "px";
			if ( parseFloat( position.style.right) < - parseFloat(window.innerWidth)  ){
				clearInterval(interval);
				App.functions.representImg ( self.index, self.arrayImg, self.arrayComents[self.index] );
				App.functions.fromLeftToCenter()
			}
			},15)
		},
		fromLeftToCenter : function () {
			var position = App.htmlBlocks.activeImage;
			var small = App.htmlBlocks.smallImgs;
			var newOpacity = 0;
			position.style.right = `${window.innerWidth}px`;
			var interval = setInterval( function () {
				position.style.right = parseFloat( position.style.right ) - 15 + "px";
				newOpacity += 0.02;
				small.style.opacity = newOpacity;
			if ( parseFloat( position.style.right)  <  0.05 * parseFloat(window.innerWidth)     ){
				position.style.removeProperty("right");
				position.style.removeProperty("opacity");
				clearInterval(interval)
			}
			},15)
		}

	},
	namespace : {
		objData : null,
		arrayImg : null,
		arrayComents : null,
		index : 0	
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
