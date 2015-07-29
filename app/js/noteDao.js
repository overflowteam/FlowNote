/**overflowteam
* FlowNote 数据操作
* creat by overflow-inherit on 2015.7.26
*/
//[{"book_id":"1","book_name":"javascript学习指南"，"book_notenumber":"1"},{"book_id":"2","book_name":"javascript编程精解","book_notenumber":"0"}]
//[{"note_id":"1","note_name":"javascript作用域","book_id":"1","text":"任何程序设计语言都有作用域的概念，简单的说，作用域就是变量与函数的可访问范围，即作用域控制着变量与函数的可见性和生命周期。在JavaScript中，变量的作用域有全局作用域和局部作用域两种。"},......]
var nbl = "notebookList";
var notebookJson = q.readStorageJson(nbl);//笔记本数组
var nl = "noteList";
var noteJson = q.readStorageJson(nl);//笔记数组

//一键初始化(用于测试)
function initial(){
	notebookJson = [];
	noteJson = [];
	q.storageJson(nbl,notebookJson);
	q.storageJson(nl,noteJson);
}

//添加笔记本
function addNotebook(name){
	var notebookId;
	var notbookObj;
    if(localStorage.getItem(nbl) != null && localStorage.getItem(nbl) != "[]"){
        notebookId = getNewNotebookId();
    }else {
        notebookId = 1;
        q.storageJson(nbl,new Array());
    }
    notbookObj = {"book_id":notebookId,"book_name":name,"book_notenumber":0};
    notebookJson.push(notbookObj);
    q.storageJson(nbl,notebookJson);
}

//删除笔记本
function removeNotebook(id){
	 for(key in notebookJson){
    	if (notebookJson[key].book_id == id) {
    		notebookJson.splice(key,1);
	        q.storageJson(nbl,notebookJson);
    	};
    }
}

//取得新增笔记本的id
function getNewNotebookId(){
	return notebookJson[notebookJson.length - 1].book_id + 1;
}
//取得新增笔记的id
function getNewNoteId(){
	return noteJson[noteJson.length - 1].note_id + 1;
}

//查询对应id的笔记本的所有笔记
function searchNotesById(id){
    var arr = [];
    for(key in noteJson){
    	if(noteJson[key].book_id == id){
    		arr.push(noteJson[key]);
    	}
    }
    return arr;
}

//在指定id的笔记本下创建新笔记
function addNote(bookId,name,content){
	var noteId;
	var noteObj;
    if(localStorage.getItem(nl) != null && localStorage.getItem(nl) != "[]"){
        noteId = getNewNoteId();
    }else {
        noteId = 1;
        q.storageJson(nl,new Array());
    }
    noteObj = {"note_id":noteId,"note_name":name,"book_id":bookId,"text":content};
    noteJson.push(noteObj);
    q.storageJson(nl,noteJson);
    addNoteNumber(bookId);
}

//指定id的笔记本的笔记数量加一
function addNoteNumber(bookId){
	for(key in notebookJson){
		if(notebookJson[key].book_id == bookId){
			notebookJson[key].book_notenumber++;
			break;
		}
	}
	q.storageJson(nbl,notebookJson);
}

//指定id的笔记本的笔记数量减一
function minusNoteNumber(bookId){
	for(key in notebookJson){
		if(notebookJson[key].book_id == bookId){
			notebookJson[key].book_notenumber--;
			break;
		}
	}
	q.storageJson(nbl,notebookJson);
}

//取得noteNumber
function getNoteNumber(id){
	var number = 0;
	for(key in noteJson){
		if(noteJson[key].book_id == id){
    		number++;
    	}
    }
    return number;
}

//查询指定id的笔记详情
function searchNoteDetialByid(id){
	var oneNote = {};
	for(key in noteJson){
		if (noteJson[key].note_id == id) {
            oneNote.name = noteJson[key].note_name;
            oneNote.text = noteJson[key].text;
            break;
		}
	}
	return oneNote;
}

//删除目标笔记
function removeNote(bookId,id){
    for(key in noteJson){
    	if (noteJson[key].note_id == id) {
    		noteJson.splice(key,1);
	        q.storageJson(nl,noteJson);
	        break;
    	};
    }
    minusNoteNumber(bookId);
}

//修改目标笔记的标题
function updateNoteName(noteId,name){
	  for(key in noteJson){
    	if (noteJson[key].note_id == noteId) {
    		noteJson[key].note_name = name;
	        q.storageJson(nl,noteJson);
	        break;
    	};
    }
}

//修改目标笔记的内容
function updateNoteText(id,text){
	for(key in noteJson){
    	if (noteJson[key].note_id == id) {
    		noteJson[key].text = text;
	        q.storageJson(nl,noteJson);
	        break;
    	};
 
    }
}

//笔记本的名字是否重复
function bookNameIsUnique(name){
	for(key in notebookJson){
		if(notebookJson[key].book_name == name){
			return false;
		}
	}
	return true;
}

//笔记的名字是否重复
function noteNameIsUnique(name){
    for(key in noteJson){
		if(noteJson[key].note_name == name){
			return false;
		}
	}
	return true;
}
