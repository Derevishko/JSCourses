var buh={
	worker: [],

	printt: function () {
		this.worker.forEach(function (e){
			e.ptint(e.name,e.age,e.dep,e.gold,e.exp);
		})
	},

	pusOrKill: function(q){
		
		if(typeof(q)=="object"){
			this.worker.push(q);
		};

		if(typeof(q)=="string"){
			this.worker=this.worker.filter(function(e){
				return e.name!=q;
			})
		};
	},

	goldSortAndSumm: function(){
		var arr= this.worker;
		var sum= 0;

		arr=arr.sort(function(a,b){
			return (a.gold)>(b.gold) ? 1 : -1;
		})

		arr.forEach(function(e){
			e.print;
			sum+= e.gold;
		})
		alert("Вся зарплата "+sum);
		console.log("Вся зарплата "+sum);
	},

	findMinMax: function(){
		var min=Infinity;
		var max=0;
		var sum=0;

		this.worker.forEach(function(e){
			if((e.gold)<min){
				min=e.gold;
			};

			if(e.gold>max){
				max=e.gold;
			};

			sum+= e.gold;
		})

		sum/= (this.worker.length);
		sum=sum.toFixed(2);
		alert("Минимальная зарплата "+min+"\nМаксимальная запрлата "+max+"\nСредняя заплата "+sum);
		console.log("Минимальная зарплата "+min+"\nМаксимальная запрлата "+max+"\nСредняя заплата "+sum);
	},

	depInfo: function(){
		var arr=[];
		var index= true;
		this.worker.forEach(function(w){
			if(arr.length==0){
				arr.push({
					DepartW: w.dep,
					AgeW: w.age,
					ExpW: w.exp,
					GoldW: w.gold,

					Numb: 1,
					maxExp: w.exp,
					maxName: w.name,
				})
			}

			else{
					arr.forEach(function(e){
						if(w.dep == e.DepartW){
							e.AgeW+= w.age;
							e.GoldW+= w.gold;
							e.Numb++;
						

							if(w.exp > e.maxExp ){
								e.maxExp= w.exp;
								e.maxName= w.name;
							}
							index=false;
						}
					})
			

					if(index){
						arr.push({
							DepartW: w.dep,
							AgeW: w.age,
							ExpW: w.exp,
							GoldW: w.gold,
							Numb: 1,
							maxExp: w.exp,
							maxName: w.name,
						})
					};
			}
			index=true;
		})

		arr.forEach(function(m){
			m.AgeW/= m.Numb;
			alert("Сумарная зарплата "+m.GoldW+
				"\nСредняя зарплата "+(m.GoldW/m.Numb)+
				"\nКолличество сотрудников "+m.Numb+
				"\nСредний возраст сотрудников "+m.AgeW+
				"\nСамый опытный сотрудник "+m.maxName+" "+m.maxExp+
				"\n(Отдел "+m.DepartW+")");
			console.log("Сумарная зарплата "+m.GoldW+
				"\nСредняя зарплата "+(m.GoldW/m.Numb)+
				"\nКолличество сотрудников "+m.Numb+
				"\nСредний возраст сотрудников "+m.AgeW+
				"\nСамый опытный сотрудник "+m.maxName+" "+m.maxExp+
				"\n(Отдел "+m.DepartW+")");
		});
	},
};

 var exit=function(name,age,dep,gold,exp){
		var str="Имя "+name+" Возраст "+age+" Отдел "+dep+" Зарплата "+gold+" Опыт "+exp;
		alert(str);
		console.log("Имя "+name+" Возраст "+age+" Отдел "+dep+" Зарплата "+gold+" Опыт "+exp);
	};

var Andrey={
	name:"Андрей",
	age:19,
	dep:"Механика",
	exp:3,
	gold:100,
	ptint: exit,
};
var Maxim={
	name:"Максим",
	age:20,
	dep:"Механика",
	exp:3,
	gold:200,
	ptint: exit,
};
var Egor={
	name:"Егор",
	age:19,
	dep:"Веб",
	exp:2,
	gold:260,
	ptint: exit,
};
var Alina={
	name:"Алина",
	age:20,
	dep:"KFC",
	exp:1,
	gold:200,
	
	ptint: exit,
};
var Dima={
	name:"Дима",
	age:28,
	dep:"Веб",
	exp:1,
	gold:1000,
	ptint: exit,
}

buh.pusOrKill(Andrey);
buh.pusOrKill(Dima);
buh.pusOrKill(Maxim);
buh.pusOrKill(Alina);
buh.pusOrKill(Egor);

buh.goldSortAndSumm();
buh.findMinMax();
buh.depInfo();
buh.printt();