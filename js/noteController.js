/**overflowteam
* FlowNote 交互逻辑实现
* creat by overflow-inherit on 2015.7.26
*/
var bookList_view = q(".J_Book_list");//笔记本列表
var book_insert = q(".J_Insert_book");//确定按钮（input后面）
var bookinsert_input = q(".J_Insert_book input");//新建笔记本的命名输入框
var newbook_button = q(".J_New_book");//新建笔记本按钮
var delbook_button = q(".J_Del_book");//删除笔记本按钮
var noteList_view = q(".J_Note_list ul");//笔记列表
var article_input = q(".article input");//新建笔记的标题输入框
var article_text = q(".article textarea");//新建笔记的内容输入框
var right_content = q(".J_Right_content");//右侧笔记详情模块
var right_title = q(".J_Note_title");//右侧笔记标题
var delnote_button = q(".J_Del_note");//右侧笔记删除按钮
var note_content = q(".J_Note_content");//右侧笔记内容
var bookActiveId = "";//被选中的笔记本id（String）
var noteActiveId = "";//被选中的笔记id（tring）
var canChangeTitle = true;
var canChangeContent = false;

//notebooks [{"book_id":"1","book_name":"javascript","book_notenumber":"0"},......]
//展示所有的笔记本
function showAllBooks(){
    var bookInfos = "";
    for(key in notebookJson){
    	var name = notebookJson[key].book_name;
    	var number = notebookJson[key].book_notenumber;
    	var id = notebookJson[key].book_id;
        bookInfos += "<li class=\"book-item\" id=\"book"+id+"\"><h3>"+name+"<span>("+number+")</span></h3></li>";
	}
	bookList_view.innerHTML = bookInfos;
	$("#"+bookActiveId).addClass("book-item-on");
}

//添加一个笔记本
function addOneBook(name){
	addNotebook(name);
	showAllBooks();
}

//删除选中的笔记本
function deleteOneBook(){
	if(confirm("是否删除选中的笔记本？")){
	    var id = strToInt(/^book/,bookActiveId);
	    removeNotebook(id);
	    bookActiveId = "";
	    showAllBooks();
    }
}

//notes [{"note_id":"1","note_name":"javascript作用域","book_id":"1","text":"任何程序设计语言都有作用域的概念，简单的说，作用域就是变量与函数的可访问范围，即作用域控制着变量与函数的可见性和生命周期。在JavaScript中，变量的作用域有全局作用域和局部作用域两种。"},......]
//展示笔记简述
function showNoteAb(){
	var noteInfos = "";
	if(bookActiveId != ""){
	    var id = strToInt(/^book/,bookActiveId);
	    var notesArr = searchNotesById(id);
        for(key in notesArr){
        	var h1 = notesArr[key].note_name;
        	var noteId = notesArr[key].note_id;
        	var abstract = (notesArr[key].text).slice(0,100);
        	noteInfos += "<li class=\"note-item J_Note_item\" id=\"note"+noteId+"\"><h3>"+h1+"</h3><p>"+abstract+"</p></li>";
        }
	}
	noteList_view.innerHTML = noteInfos;
	right_content.style.display = "none";
}

//展示笔记详情
function showNote(){
	var id = strToInt(/^note/,noteActiveId);
	var oneNote = searchNoteDetialByid(id);
	right_title.innerHTML = oneNote.name;
	note_content.value = oneNote.text;
}

//添加一个笔记
function addOneNote(name,content){
    addNote(strToInt(/^book/,bookActiveId),name,content);
}

//删除选中的笔记
function deleteOneNote(){
	if(confirm("是否删除选中的笔记？")){
	    var id = strToInt(/^note/,noteActiveId);
	    var bookId = strToInt(/^book/,bookActiveId);
	    removeNote(bookId,id);
	    noteActiveId = "";
	    showNoteAb();
	    showAllBooks();
    }
}

//修改笔记标题
function changeNoteTitle(title){
	var id = strToInt(/^note/,noteActiveId);
	updateNoteName(id,title);
	showNoteAb();
	$("#"+noteActiveId).addClass("note-item-on");
	right_content.style.display = "block";
	showNote();
}

//修改笔记内容
function changeNoteContent(content){
	var id = strToInt(/^note/,noteActiveId);
	updateNoteText(id,content);
	showNoteAb();
	$("#"+noteActiveId).addClass("note-item-on");
	right_content.style.display = "block";
	showNote();
}

//将字符串id转化为数字id
function strToInt(regex,idstr){
	return parseInt(idstr.replace(regex,""));
}

window.onload = function(){
showAllBooks();
q.on(".J_New_book","click",function(){
	book_insert.style.zIndex = "2000";
	bookinsert_input.value = "";
});
q.on(".J_Insert_button","click",function(){
	var newName = bookinsert_input.value;
	if(newName == "" || newName == null){
		alert("您还没有给新的笔记本起名!");
	}else {
		if(bookNameIsUnique(newName)){
			addOneBook(newName);
			book_insert.style.zIndex = "0";
		}else{
			alert("笨蛋,名字重复了!")
		}
	}
});
q.on(".J_Del_book","click",function(){
	if(bookActiveId != "")
        deleteOneBook();
    else
    	alert("请选择要删除的笔记本！");
});
q.delegate(".J_Book_list","li","click",function(){
	$(".book-item-on").removeClass("book-item-on");
	$(this).addClass("book-item-on");
	bookActiveId = this.id;
	showNoteAb();
});
q.on(".J_New_note","click",function(){
	article_input.value = "";
	article_text.value = "";
	if (bookActiveId != "") {
        q(".article_wraper").style.display = "block";
	}else{
		alert("请先选择笔记本！");
	}
});
q.on("#artsavebutton","click",function(){
  	var h1 = article_input.value;
  	var content = article_text.value ? article_text.value : "";
  	if(h1 == "" || h1 == null){
  		alert("请先输入标题再保存!");
  	}else{
  		if(noteNameIsUnique(h1)){
  		    addOneNote(h1,content);
 		    showAllBooks();
  			showNoteAb();
  			q(".article_wraper").style.display = "none";
  		}else{
  			alert("笨蛋，名字重复了！");
  		}
  	}
});
q.on("#artcancelbutton","click",function(){
    q(".article_wraper").style.display = "none";
});
q.delegate(".J_Note_list ul","li","click",function(){
    $(".note-item-on").removeClass("note-item-on");
	$(this).addClass("note-item-on");
	right_content.style.display = "block";
	noteActiveId = this.id;
	showNote();
});
q.on(".J_Del_note","click",function(){
	deleteOneNote();
	right_content.style.display = "none";
});
q.on(".J_Note_title","click",function(){
	if (canChangeTitle) {
	    var before = right_title.innerHTML
	    right_title.innerHTML = "<input type=\"text\" value=\""+before+"\">";
	    q(".J_Note_title input").focus();
	    q(".J_Note_title input").select();
	    canChangeTitle = false;
	    q.on(".J_Note_title input","blur",function(){
	var after = q(".J_Note_title input").value;
	if (after == null || after == "") {
		alert("标题不能为空！");
		q(".J_Note_title input").focus();
	}else{
		changeNoteTitle(after);
		canChangeTitle = true;
	}
});
	}
});
q.on(".J_Note_content","blur",function(){
	var after = note_content.value;
		changeNoteContent(after);
});
}
