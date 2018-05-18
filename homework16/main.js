var App = {
	htmlBlocks : {
		table : document.getElementById( "workers" ),
		info : document.getElementById( "info" )
	},
	CONST : {
		NUMBER_WORKERS : 4,
		ADRESS : "data/data.csv"
	},
	data : {
		dataWorker : null,
		dataClass : null
	},
	startApp : function () {
		this.loadData();
	},
	loadData : function () {
		var xhr = new XMLHttpRequest;
		xhr.open( "GET", this.CONST.ADRESS, true );
		xhr.send( null );
		xhr.addEventListener( "load", function () {
			App.data.dataWorker = xhr.responseText;
			App.secondStep();
		});
	},
	secondStep : function () {
		this.parseData();
		this.dataToDOMObject(this.data.dataWorker);
		this.addEvents();
		this.formMass();
	},
	parseData : function () {
		this.data.dataWorker = this.data.dataWorker.split("\n");
		for ( let i = 0; i < 4; i++) {
			this.data.dataWorker[i] = this.data.dataWorker[i].split(",")
		}	
	},
	dataToDOMObject : function ( arrayInfo ) {
		for (let elem of arrayInfo) {
			this.htmlBlocks.table.innerHTML += 
			`<tr class="worker">
				<td>${elem[0]}</td>
				<td>${elem[1]}</td>
				<td>${elem[2]}</td>
				<td>${elem[3]}</td>
				<td>${elem[4]}</td>
				<td>${elem[5]}</td>
				<td>${elem[6]}</td>
			</tr>`;
		}
	},
	addEvents : function () {
		this.htmlBlocks.table.addEventListener( "click", function (e) {
			if ( e.target.getAttribute( "class" ) == "menu-point" ) {
				App.sorting( e.target )
			} else if ( e.target.nodeName == "IMG" ){
				App.sorting( e.target.parentNode )
			} else if (e.target.parentNode.getAttribute("class") == "worker") {
				App.highlight(e.target.parentNode);
			}
		});
	},
	sorting : function ( target ) {
		var mass = document.getElementsByTagName( "tr.worker" );
		switch ( target.innerText ) {
			case "имя":
			this.sortFirst(0);
			break;
			case "возраст":
			this.sortFirst(1);
			break;
			case "дата поступления в компанию":
			App.data.dataWorker = App.data.dataWorker.sort( function(a, b) {
				return App.sortData( a[2], b[2] );
			});
			this.buildNewTable();
			break;
			case "дата рождения":
			App.data.dataWorker = App.data.dataWorker.sort( function(a, b) {
				return App.sortData( a[3], b[3] );
			});
			this.buildNewTable();
			break;
			case "зарплата":
			this.sortFirst(4);
			break;
			case "отдел":
			this.sortFirst(5);
			break;
			case "должность":
			this.sortFirst(6);
			break;
		}
	},
	sortFirst : function (i) {
		App.data.dataWorker = App.data.dataWorker.sort( function(a, b) {
				return a[i] > b[i] ? 1 : -1;
			});
		this.buildNewTable();
	},
	buildNewTable : function () {
		this.clearTable();
			this.dataToDOMObject( this.data.dataWorker );
	},
	clearTable : function () {
		for (let i = 1; i < this.CONST.NUMBER_WORKERS + 1; i++ ){
			this.htmlBlocks.table.children[1].remove()
		}
	},
	sortData : function (first, second) {
		first = first.split(".");
		second = second.split(".");
		for ( let i = 0; i < 3; i++) {
			if ( first[2-i] != second[2-1] ) {
				return first[2-i] > second[2-i] ? 1 : -1;
			}
		}
	},
	highlight : function (target) {
		target.parentNode.classList.toggle( "highlight" );
		if ( target.parentNode.hasAttribute( "data-action") ){
			target.parentNode.removeAttribute( "data-action");
			this.htmlBlocks.info.children[0].lastElementChild.innerText--;
		} else {
			this.htmlBlocks.info.children[0].lastElementChild.innerText++;
			target.parentNode.setAttribute( "data-action", "indicate");
		}
		this.formMass();
	},
	formMass : function () {
		var table = this.htmlBlocks.table;
		var mass = [];
		var l = table.children.length;
		for ( let i = 1; i < l; i++ ) {
			if ( table.children[i].hasAttribute( "data-action" ) ) {
				mass.push(table.children[i].firstElementChild)
			}
		}
		if ( !mass.length ) {
			for ( let elem of document.getElementsByClassName("worker") ){
				mass.push(elem)
			}
		}
		this.getInfo(mass);
	},
	getInfo : function (mass) {
		var massDate = [];
		var info = this.htmlBlocks.info;
		info.children[1].lastElementChild.innerText = 0;
		info.children[2].lastElementChild.innerText = 0;
		for ( let elem of mass ) {
			info.children[1].lastElementChild.innerText = Number( info.children[1].lastElementChild.innerText ) + Number(elem.children[4].innerText);
			info.children[2].lastElementChild.innerText = Number( info.children[2].lastElementChild.innerText ) + Number(elem.children[4].innerText);
			massDate.push(elem.children[2].innerText);
		}
		var num = info.children[0].lastElementChild.innerText != 0 ? info.children[0].lastElementChild.innerText : 4;
		info.children[1].lastElementChild.innerText /= num;
		this.getExperience( this.getDays(massDate) );
		this.getPensiu(mass);
	},
	getDays : function (massDate) {
		var d = new Date();
		var days = 0;
		for ( let elem of massDate ) {
			elem = elem.split(".");
			days +=  ( d.getFullYear() - elem[2] ) * 365  + ( d.getMonth() - 1 - elem[1] ) * 12  + d.getDate() - elem[0];
		}
		return days;
	},
	getExperience : function (days) {
		var num = this.htmlBlocks.info.children[0].lastElementChild.innerText != 0 ? this.htmlBlocks.info.children[0].lastElementChild.innerText : 4;
		days /= num;
		var date = [Math.floor(days / 365.25)];
		date.push( Math.floor( days / 30 ) - 12 * date[0] );
		date.push( days - date[0] * 365 - date[1] * 30 );
		this.htmlBlocks.info.children[3].lastElementChild.innerText = `${date[2]}.${date[1]}.${date[0]}`
	},
	getPensiu : function (massData) {
		var pensia = 0;
		for ( let elem of massData ) {
			pensia += elem.children[4].innerText * 0.01 *  this.getDays( [elem.children[2].innerText] );
		}
		this.htmlBlocks.info.children[4].lastElementChild.innerText = pensia;
	}
}
App.startApp();