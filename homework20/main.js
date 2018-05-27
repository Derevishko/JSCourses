
var App = {
	htmlBlocks : {
		news : document.getElementById( "news" )
	},
	data : {
		massNews : [],
		ctx : null
	},
	loadDate : function () {
		firebase.database().ref( "/mass/" ).on("value", v => {
			if ( App.htmlBlocks.news.children[0] == null ) {
				App.data.massNews = v.val();
				App.createNews(App.data.massNews);
			}
			

		})
	},
	createNews : function (mass) {
		let i = 0;
		for ( let elem of mass ) {
			this.htmlBlocks.news.innerHTML += `<div class='new' data-number='${i}'> 
			<h2>${elem.title}</h2>
			<img src="${elem.imgSrc}" class="img"/>
			<p class='text'>${elem.text}</p>
			<p>${elem.date}</p>
			<button class='pen' data-action='redact'></button>
			</div>`;
			i++;
		}
		this.createRedact()
	},
	createRedact : function () {
		this.htmlBlocks.news.addEventListener( "click", function (e) {
			if ( e.target.nodeName == "BUTTON" && e.target.getAttribute('data-action') == 'redact') {
				e.target.setAttribute('data-action', 'save')
				App.redact(e.target.parentNode)
			} else if (e.target.nodeName == "BUTTON" && e.target.getAttribute('data-action') == 'save') {
				e.target.setAttribute('data-action', 'redact')
				App.save( e.target.parentNode )
			}
		})
	},
	redact : function (target) {
		let oldTitle = target.firstElementChild.innerText;
		target.firstElementChild.outerHTML = `<input type="text" />`;
		target.firstElementChild.value = oldTitle;
		let oldText = target.children[2].innerText;
		target.children[2].outerHTML = `<input type="text" />`;
		target.children[2].value = oldText;

	},
	save : function (target) {
		let newTitle =  target.firstElementChild.value;
		target.firstElementChild.outerHTML = `<h3>${newTitle}</h3>`;
		let newText = target.children[2].value;
		target.children[2].outerHTML = `<p>${newText}</p>`;
		this.saveOnDatabase( target.getAttribute( 'data-number' ) );
	},
	saveOnDatabase : function (i) {
		firebase.database().ref('/mass/' + i).set({
		    title : this.htmlBlocks.news.children[i].children[0].innerText,
			text : this.htmlBlocks.news.children[i].children[2].innerText,
			imgSrc : this.htmlBlocks.news.children[i].children[1].getAttribute('src'),
			date : this.htmlBlocks.news.children[i].children[3].innerText
		});
	}
}
App.loadDate();

var MAP = {
	htmlBlocks : {
		MAPDiv : document.getElementById( "map" )
	},
	data : {
		MAP : null,
		markers : [],
		points : [],
		setting : {
			center : {
				lat : 52.77,
				lng: 28
			},
			zoom : 17,
			mapTypeId : google.maps.MapTypeId.ROADMAP
		}
	},
	loadDate : function () {
		this.data.MAP = new google.maps.Map(this.htmlBlocks.MAPDiv,this.data.setting);
		firebase.database().ref( "/map/" ).on("value", v => {
			MAP.data.points = v.val();
			MAP.createMarker(MAP.data.points);
		});
	},
	createMarker : function (mass) {
		let l = mass.length;
		console.log(mass)
		for ( let i = 0; i < l; i++) {
				this.data.markers[i] = new google.maps.Marker({
				position : mass[i].coords,
				map : this.data.MAP,
				title : mass[i].name
			})
		}	
		this.createLine(mass)
	},
	createLine : function (mass) {
		mass = mass.map(m=>m.coords)
		var flightPath = new google.maps.Polyline({
			path : mass,
			geodesic : true,
			strokeColor : '#FF0000',
			strokeOpacity : 1.0,
			strokeWeight : 2
		});
		flightPath.setMap(this.data.MAP)
	}
}
MAP.loadDate();