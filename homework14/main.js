class Task{
	constructor(name, priority, dataFinish="loool"){
		this.name= name;
		this.priority= priority;
		this.dataFinish= dataFinish;
		allTasks.push(this);
	}
}

class TasksPlane{
	constructor(...tasks){
		this.tasks= tasks;
	}
	[Symbol.iterator](){
		var index= this.tasks.length-1;
		var self= this;
		var iter={
			next(){
			let value= self.tasks[index];
			let done= index == -1; 
			index--;
			return {value, done};
			}
		}
		return iter;
	}	
	tasksToday(){
		var dataNow= new Date;
		dataNow= `${dataNow.getDate()}.${dataNow.getMonth()+1}.${dataNow.getFullYear()}`;
		for(var task of this){
			if(task.dataFinish==dataNow){
				alert("name: "+task.name+"; priority: "+  task.priority+"; dataFinish: "+ task.dataFinish);
			}
		}
	}
	tasksTomorow(){
	var dataNow= new Date;
	dataNow= `${1+dataNow.getDate()}.${dataNow.getMonth()+1}.${dataNow.getFullYear()}`;
		for(var task of this){
			if(task.dataFinish==dataNow){
				alert("name: "+task.name+"; priority: "+  task.priority+"; dataFinish: "+ task.dataFinish);
			}
		}
	}
	addTasks(...newtasks){
		for( var i= 0; i<newtasks.length; i++){
			this.tasks.push(newtasks[i]) ;
		}
		
	}
	removeTasks(...aimsRemove){
		var newTaskList=[];
		var flag= true;
		for(var task of this){
			for( var i=0; i<aimsRemove.length; i++){
				if(task.name==aimsRemove[i]){
					flag= false;
					break;
				}	
			}
			if(flag){
				newTaskList.push(task)
			}
			flag= true;		
		}
		this.tasks= newTaskList;
	}
	tasksFilter(){
		this.tasks= this.tasks.sort(function(a,b){
			return a.priority < b.priority ? 1 : -1;
		});
	}
}
function onScreenMass(mass){
	tasksScreen.innerHTML= "";
	mass.forEach(function(task){
		tasksScreen.innerHTML+= `<div class='task'><h3 class='name'>${task.name}</h3><div class='priority'>${task.priority}</div><div class='data'>${task.dataFinish}</div><input type="text"/><button data-action='add'>add</button></div>`;
	});
}
function onScreen(obj){
	tasksScreen.innerHTML= "";
	for (var task of obj){
		tasksScreen.innerHTML+= `<div class='task'><h3 class='name'>${task.name}</h3><div class='priority'>${task.priority}</div><div class='data'>${task.dataFinish}</div><button data-action='remove'>remove</button></div>`;
	}
}
window.addEventListener("hashchange", controllScreen);
function controllScreen(){
	switch(location.hash){
		case "#all":
			secMenu.classList.add("invise");
			onScreenMass(allTasks);
			break;
		case "#firstPack":
			secMenu.classList.remove("invise");
			onScreen(firstPack);
			break;
		case "#secondPack":
			secMenu.classList.remove("invise");
			onScreen(secondPack);
			break;
	}
}
var tasksScreen= document.getElementById("tasks");
var menu= document.getElementById("menu");
var secMenu= document.getElementById("secMenu");
var dataNow= new Date;	
var allTasks=[];
var task1= new Task("one",1,`${dataNow.getDate()+1}.${dataNow.getMonth()+1}.${dataNow.getFullYear()}`);
var task2= new Task("two",2,`${dataNow.getDate()}.${dataNow.getMonth()+1}.${dataNow.getFullYear()}`);
var task3= new Task("tree",3,"12.2.2019");
var task4= new Task("fore",2,`${dataNow.getDate()+1}.${dataNow.getMonth()+1}.${dataNow.getFullYear()}`);
var task5= new Task("five",4,`${dataNow.getDate()}.${dataNow.getMonth()+1}.${dataNow.getFullYear()}`);
var task6= new Task("last",1,"9.5.2018");
var task7= new Task("last",1);
var firstPack= new TasksPlane(task1,task2,task4);
var secondPack= new TasksPlane(task3,task5);
controllScreen();
tasksScreen.addEventListener("click",function(e){redact(e)});
function redact(e){
	if(e.target.nodeName=="BUTTON"){
		if(e.target.getAttribute("data-action") == "remove"){
			location.hash=="#firstPack" ? firstPack.removeTasks(e.target.parentNode.firstElementChild.innerText) : secondPack.removeTasks(e.target.parentNode.firstElementChild.innerText);
			controllScreen();
		}
		else{
			if(e.target.parentNode.children[3].value=="First Pack"){
				let target= allTasks.filter(function(elem){
					return elem.name==e.target.parentNode.children[0].innerText;
				});
				console.log(target);
				firstPack.addTasks(target[0]);
			}else{
				let target= allTasks.filter(function(elem){
					return elem.name==e.target.parentNode.children[0].innerText;
				});
				console.log(target);
				secondPack.addTasks(target[0]);
			}
		}
	}
}
secMenu.addEventListener("click",function(e){
	if(e.target.getAttribute("data-action")=="today"){
		location.hash=="#firstPack" ? firstPack.tasksToday() : secondPack.tasksToday();
	}else if(e.target.getAttribute("data-action")=="tomorow"){
		location.hash=="#firstPack" ? firstPack.tasksTomorow() : secondPack.tasksTomorow();
	}else if(e.target.getAttribute("data-action")=="filter"){
		location.hash=="#firstPack" ? firstPack.tasksFilter() : secondPack.tasksFilter();
		controllScreen();
	}
});

var newTask= document.getElementById("newTask");
newTask.addEventListener("click", function(e){
	var r=/^([1-2][0-9])||(3[0-2])||(0?[1-9])\.(1[0-2])||(0?[1-9])\.\d{4}$/
	if(e.target.getAttribute("type")=="button"  && e.target.parentNode.children[0].value!=null && e.target.parentNode.children[1].value.match(/^\d{1}$/)!=null && e.target.parentNode.children[2].value.match(r)!=null){
		var task= new Task(e.target.parentNode.children[0].value,e.target.parentNode.children[1].value,e.target.parentNode.children[2].value);
		if(location.hash=="#firstPack"){
			firstPack.addTasks(task);
		}else{
			secondPack.addTasks(task);
		}
		controllScreen();
		e.target.parentNode.children[0].value="";
		e.target.parentNode.children[1].value="";
		e.target.parentNode.children[2].value="";
	}
});
