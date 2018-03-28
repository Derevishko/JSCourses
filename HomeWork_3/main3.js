var home={
	roam: [],

	pusOrKill: function (r, str) {
		var index=true;
		if(typeof(str)=="object"){

			this.roam.forEach(function(e){
				if(r==e.r){
					e.arr.push(str);
					index=false;
				}
			})
			if(index){
				alert("Квартиры с номером"+r+" нет!!!");
				console.error("Квартиры с номером"+r+" нет!!!");
			}
		}


		else if(typeof(str)=="string"){
			this.roam.forEach(function(e){
				if(r==e.r){
					alert("kill");
					e.arr= e.arr.filter(function(t){
						index=false;
						return t==str;
					})
					if(index){
						alert("Такой человек не живёт в этой квартире "+r+"!!!");
						console.error("Такой человек не живёт в этой квартире "+r+"!!!");
					}
				}
			})
		}
	},

	killAll: function(r){
		var index= true;
		this.roam.forEach(function(e){
			if(r==e.r){
				e.arr= [];
				index=false;
			}
		})
		if(index){
			alert("Квартиры "+r+" нет!!!");
			console.error("Квартиры "+r+" нет!!!");
		}
	},

	giveGold: function(G){
		var part=[];
		var sum= 0;
		var str=[];
		var S=0;
		
		this.roam.forEach(function(a){
			if(a.arr!=undefined){
				part[a.r]=0;
				a.arr.forEach(function(e){
					if(e.age>=18){
						part[a.r]+= 1;
						S+=a.sq;
						
					}

				})
			}	
		})

		part.forEach(function(e){
			sum+=e;
		})

		this.roam.forEach(function(a){
			if(a.arr!=undefined){
				a.arr.forEach(function(e){
					if(e!=undefined){
						if(e.age>=18){
							str[a.r]=e.name+"-"+(G*a.sq/S/part[a.r])+"\n";
						}
					}
				})
			}

			let STR= "";
			str.forEach(function(e){
				STR+=e;
			})
		})
		alert(str);
		console.log(str);

	},
}
home.roam.push({sq: 100, r: 1, f: 1, arr: []});
home.roam.push({sq: 150, r: 2, f: 1, arr: []});
home.roam.push({sq: 200, r: 3, f: 2, arr: []});
home.roam.push({sq: 50 , r: 4, f: 2, arr: []});
home.roam.push({sq: 500, r: 5, f: 3, arr: []});

var Egor={name: "Егор",age: 19};
var Denis={name: "Денис", age: 15};
var Vlad={name: "Влад",age: 21};
var Maxim={name: "Максим",age: 20};
var Andrey={name: "Андрей",age: 19};

home.pusOrKill(1, Egor);
home.pusOrKill(1, Denis);
home.pusOrKill(2, Vlad);
home.pusOrKill(3, Maxim);
home.pusOrKill(4, Andrey);
// home.killAll(1);
home.pusOrKill(2,"Влад");
home.giveGold(1000);
