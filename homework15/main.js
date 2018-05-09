var allTasks= {tasks:[]};
var noDate= new Set();
class Task{
	constructor(name, priority, dataFinish=""){
		this.name= name;
		this.priority= priority;
		this.dataFinish= dataFinish;
		allTasks.tasks.push(this);
		if (this.dataFinish == ""){
			noDate.add(this)
		}
	}
}
class TasksPlane{
	constructor(...tasks){
		this.tasks= new Set();
		for(let elem of tasks){
			console.log(elem)
			this.tasks.add(elem)
		}
	}
	tasksToday(){
		var dataNow= new Date;
		dataNow= `${dataNow.getDate()}.${dataNow.getMonth()+1}.${dataNow.getFullYear()}`;
		for(let task of this.tasks){		
			if(task.dataFinish==dataNow){
				alert("name: "+task.name+"; priority: "+  task.priority+"; dataFinish: "+ task.dataFinish);
			}			
		}
	}
	tasksTomorow(){
	var dataTomorow= new Date;
	dataTomorow= `${1+dataTomorow.getDate()}.${dataTomorow.getMonth()+1}.${dataTomorow.getFullYear()}`;
		for(let task of this.tasks){		
			if(task.dataFinish==dataTomorow){
				alert("name: "+task.name+"; priority: "+  task.priority+"; dataFinish: "+ task.dataFinish);
			}			
		}
	}
	addTasks(newtask){
			this.tasks.add(newtask[0]);
	}
	removeTask(aimName){
		let newMass= new Set(); 
		for(let task of this.tasks){
			if(task.name!=aimName){
				newMass.add(task)
			}
		}
		this.tasks= newMass;
	}
	// tasksFilter(){
	// 	this.tasks= this.tasks.sort(function(a,b){
	// 		return a.priority < b.priority ? 1 : -1;
	// 	});
	// }
}

//--------------------------------------------------//

var tasksScreen= document.getElementById("tasks");
var menu= document.getElementById("menu");
var secMenu= document.getElementById("secMenu");
var newTask= document.getElementById("newTask");
controllScreen();

//-----------------------------------------------------------//




window.addEventListener("hashchange", controllScreen);
function controllScreen(){
	switch(location.hash){
		case "#all":
			secMenu.classList.add("invise");
			onScreen(allTasks.tasks);
			break;
		case "#firstPack":
			secMenu.classList.remove("invise");
			onScreen(firstPack);
			break;
		case "#secondPack":
			secMenu.classList.remove("invise");
			onScreen(secondPack);
			break;
		case "#noDate":
			secMenu.classList.add("invise");
			onScreen(noDate);
			break;
	}
}
tasksScreen.addEventListener("click",function(e){
	redact(e)
});
function onScreen(obj){
	tasksScreen.innerHTML= "";
	if(location.hash == "#firstPack" || location.hash == "#secondPack" ){
		obj= obj.tasks;
		for (let task of obj){
				tasksScreen.innerHTML+= `<div class='task'>
				<h3 class='name'>${task.name}</h3>
				<div class='priority'>${task.priority}</div>
				<div class='data'>${task.dataFinish}</div>
				<button data-action='remove'>remove</button>
			</div>`
		}
	}else if(location.hash == "#all"){
		for (let task of obj){
			tasksScreen.innerHTML+= `<div class='task'>
			<h3 class='name'>${task.name}</h3>
				<div class='priority'>${task.priority}</div>
				<div class='data'>${task.dataFinish}</div>
				<button data-action='addToFirst'>to First</button>
				<button data-action='addToSecond'>to Second</button>
			</div>`;
		}
	}else if(location.hash=="#noDate"){
		for (let task of obj){
			tasksScreen.innerHTML+= `<div class='task'>
				<h3 class='name'>${task.name}</h3>
				<div class='priority'>${task.priority}</div>
				<div class='data'>${task.dataFinish}</div>
			</div>`;
		}
	}
}

function redact(e){
	if(e.target.nodeName=="BUTTON"){
		if(e.target.getAttribute("data-action") == "remove"){
			pack().removeTask(e.target.parentNode.firstElementChild.innerText);
			allTasks.tasks= allTasks.tasks.filter(x=>x.name!=e.target.parentNode.firstElementChild.innerText);
			controllScreen();
		}
		else{
			var aim= findTask(allTasks.tasks, e.target.parentNode.children[0].innerText);
			if(e.target.getAttribute("data-action")=="addToFirst"){
				firstPack.addTasks(aim);
			}else if(e.target.getAttribute("data-action")=="addToSecond"){
				secondPack.addTasks(aim);
			}
		}
	}
}
function findTask(tasks,name){
	return tasks.filter(function(task){
		if(task.name==name){
			return task;
		}
	})
	
}
secMenu.addEventListener("click",function(e){
	if(e.target.getAttribute("data-action")=="today"){
		pack().tasksToday();
	}else if(e.target.getAttribute("data-action")=="tomorow"){
		pack().tasksTomorow();
	}else if(e.target.getAttribute("data-action")=="filter"){
		pack().tasksFilter();
		controllScreen();
	}
});
newTask.addEventListener("click", function(e){
	if(e.target.getAttribute("type")=="button" && e.target.parentNode.children[0].value!=null && e.target.parentNode.children[1].value.match(/^\d{1}$/)!=null){
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

function pack(){
	switch (location.hash){
		case "#all":
			return allTasks;
		case "#firstPack":
			return firstPack;
		case "#secondPack":
			return secondPack;
		case "#noDate":
			return noDate;
		default: 
			break;
	}
}
//-----------------------------------------//

var firstPack= new TasksPlane();
var secondPack= new TasksPlane();

var promis= new Promise(function(resolve, reject){
	loadTasks(resolve);
});
promis.then(function(obj){
	obj.tasks.forEach(function(elem){
		new Task(elem.name, elem.priority, elem.dataFinish);
	})
})
function onloadTasks(data){
	
}
function loadTasks(resolve){
	var xhr= new XMLHttpRequest;
	xhr.onload= () => resolve(JSON.parse(xhr.responseText));
	xhr.open("GET","tasks.json",true);
	xhr.send(null);
}
