$( document ).ready(function() {

$(function() {$("#tabs").tabs()}) // Add tabs in
$(function() {$("#datepicker" ).datepicker()}) //Add the calender
$(function() {$("#filteredDate" ).datepicker()}) //filters dates using the calendar

removeP=function(event){
	//console.log(event)
	if(event.shiftKey===true)
	{
		var targetID=event.target.id
//		str=event.target.textContent
		$(event.target).remove()
		$("div#filteredList blockquote#"+targetID).remove()
	}
}
deleteP=function(event){
	var targetID=event.target.offsetParent.id
	$(event.target.offsetParent).remove()
	$("div#filteredList blockquote#"+targetID).remove()
}
var i = 0; //id's for the paragraphs to track them
takeTextAreaInput=function(){
	taskText=$('#taskText').val()
	toDoList=$('#toDoList')
	filteredList=$('#filteredList')
	date=$('#datepicker').val()		
	if(taskText ===''){
		alert("Nothing was entered")
	}
	else{
		toDoList.append('<blockquote id ="'+i+'" style="overflow:auto" contenteditable="true" class="task">'+ '<span class="spanDate '+i+'">'+date + '<br></span>'+taskText+ '<span style="float:right"><input class="ui-button" value = "Delete" type="button" onclick="deleteP(event)"></span></blockquote>')
		$(function() {$(".task").draggable({grid:[20,20],axis:"y"}).resizable({axis:"y",handles:"n,s"}).click(removeP)})
		filteredList.append('<blockquote id ="'+i+'" style="overflow:auto" contenteditable="true" class="task">'+ '<span class="spanDate '+i+'">'+date + '<br></span>'+taskText+ '<span style="float:right"><input class="ui-button" value = "Delete" type="button" onclick="deleteP(event)"></span></blockquote>')
		$(function() {$(".task").draggable({grid:[20,20],axis:"y"}).resizable({axis:"y",handles:"n,s"}).click(removeP)})
		clearInput()
		i++;
	}
}
var j = 0;	//id's for the paragraphs to track them
takeSavedInput=function(contentText){
	toDoList=$('#toDoList')
	filteredList=$('#filteredList')	
	toDoList.append('<blockquote id ="'+j+'" style="overflow:auto" contenteditable="true" class="task">'+contentText+ '</blockquote>')
	$(function() {$(".task").draggable({grid:[20,20],axis:"y"}).resizable({axis:"y",handles:"n,s"}).click(removeP)})
	filteredList.append('<blockquote id ="'+j+'" style="overflow:auto" contenteditable="true" class="task">'+contentText+ '</blockquote>')
	$(function() {$(".task").draggable({grid:[20,20],axis:"y"}).resizable({axis:"y",handles:"n,s"}).click(removeP)})
	j++
}
clearInput=function(){
	$('#taskText').val('') //puts blank for the text area
	$('#taskText').focus() //puts the blinking cursor on the text area
}
savePage=function(){
	var allPara=$("div#toDoList blockquote")
	if(allPara.length!==0){

	}
	else{
		if(prompt('You are saving an EMPTY List\nAre you sure\nPress y to confirm')==='y'){	
		}
		else{
			return
		}
	}
	var allParaArray=[]
	_.each(allPara,function(item){
		para=$(item).html()
		var textEnd=para.indexOf('<div class')
		contentText=para.slice(0,textEnd)
		var paraObj={
			text:contentText,
		}
		allParaArray.push(paraObj)
	})
	var allParaJson=JSON.stringify(allParaArray)
	localStorage.setItem("justDoItData",allParaJson)
}
loadPage=function(){
	$('blockquote').remove()
	var allParaJson=localStorage.getItem("justDoItData")
	var allParaArray=JSON.parse(allParaJson)
	_.each(allParaArray,function(item){
		contentText=item.text
		takeSavedInput(contentText)
	})
}
filterDate=function(){
	initializeFilter()
	var date = $('#filteredDate').val()	
	console.log(date)
	var allPara=$("div#filteredList blockquote")
	_.each(allPara,function(item){
		para=$(item).text()
		if(para.indexOf(date)===-1){
			$(item).remove()
		}	
	})	
}
initializeFilter=function(){
	$("div#filteredList blockquote").remove()
	var copy=$("div#toDoList blockquote").clone()
	$('#filteredList').append(copy)
}




});

