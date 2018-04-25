var i=1;//начальный индекс

function Product (name, price, type, data){
	this.name= name;
	this.price= price;
	this.type= type;
	this.data= data;
	this.index= i++;
}
// класс Product для создания какого либо тавара 
// name- название товара
// price- цена товара
// type- тип товара
// data- дата выпуска товара
// возращает объект "продукт"

function EatProduct(name, price, type, data, lastData){
// this.prototype.costructor(name, price, type, data)
	this.name= name;
	this.price= price;
	this.type= type;
	this.data= data;
	this.__defineGetter__('lastData', function(){return lastData} );
}
// класс eatProduct для создания какого либо тавара 
// name- название товара
// price- цена товара
// type- тип товара
// data- дата выпуска товара
// lastData- до какой даты годен товар (работает только на чтение)
// возращает объект "пищевой продукт"
EatProduct.prototype= Object.create(Product.prototype);

function Store(nameStore, adress, massProduct, procent, profit){
	this.nameStore= nameStore;
	this.adress= adress;
	this.massProduct= massProduct;
	this.procent= procent;
	this.profit= profit;
}
// класс Store для создания объектов "магазин"
// nameStore- название магазина
// adress- его адрес
// massProduct- массив объектов хранящий в себе все продукты магазина
// procent- наценка магазина
// profit- чистая прибыль магазина

Store.prototype.addProduct= function(product, numb){
	for( let i=0; i<numb; i++){
		this.massProduct.push(product);
	}
}
// метод для добавления продукта product(объект) в колличестве num штук
// вернёт новый массив товаров

Store.prototype.deleteProduct= function(){
	var name= arguments;
	var l= name.length;
	for( var i=0; i<l; i++){
		this.massProduct= this.massProduct.filter(function(e){	
			return e.name!=name[i];
	 	});
	 	
	}
	
}
// метод для удаления товаров название коорых переданы в функцию как аргументы
// вернёт новый массив товаров

Store.prototype.sellProduct= function(name){
	var q=0;
	var proc= this.procent/100;
	this.massProduct= this.massProduct.filter(function(e){
		console.log(e.name == name);
		if(e.name == name){
			q+= e.price * proc;

		}
		else{
			console.log(e);
			return e;
		}
	});
	this.profit+= Number(q);
}
// метод для продажи товара с именем name и подсчёт прибыли
// возращает новый массив товаров и пересчитанную прибыль

Store.prototype.deposit= function(){
	console.log(this.massProduct.reduce(function(f,l){
		return f+l.price;
	},0))	
}
// метод для подсчёта сумарной цены всех имеющихся товаров в магазине
// вернёт число равное общей стоимости всех товаров

Store.prototype.info= function(){
	console.log(this);
}
// метод для вывода в консоль информации о магазине

function Market(){
	this.stores= arguments;
}
// класс для создания объекта "Market" состоящего из массива объектов "Store"

Market.prototype.info= function(){
	var l= this.stores.length;
	for(var i=0; i<l; i++){
		this.stores[i].info();
	}
}
// Метод для вывода информации о рынке

var p1= new Product("p1", 10, "s", 15);
var p2= new Product("p2", 20, "st", 25);
var p3= new EatProduct("p3", 30,"str",12,18);
var p4= new EatProduct("p4", 302,"str",22,28);
var s1= new Store("s1", "lol", [p1,p2],10,100);
var s2= new Store("s2", "kek", [p3],100,1000);
var t= new Product("t", 10, "sur", 15);
var m1= new Market(s1,s2);
// переменные для проверки работоспособности скрипта