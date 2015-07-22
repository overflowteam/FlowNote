/**
 * 模拟数据
 *  getNotebookList 获取笔记本列表
 *  getNoteList     获取笔记列表
 *  getContent      获取笔记内容
 *  getNote         获取笔记详细信息
 */
fnote.fake = (function () {
	var getNotebookList, getNoteList, getContent, getNote;

	/**
	 * notebook
	 *
	 *  id         编号
	 *  name       名称
	 *  note_count 笔记数量
	 *  created_at 创建时间
	 *  deleted    是否被删
	 *  index      排序(默认null )
	 */
	getNotebookList = function () {
		return [
			{
				id         : 1,
				name       : 'Javascript高级程序设计',
				created_at : new Date ().setMilliseconds ( 0 ) / 1000,
				note_count : 0,
				deleted    : false,
				index      : null
			},
			{
				id         : 2,
				name       : 'javascript DOM编程艺术',
				created_at : new Date ().setMilliseconds ( 0 ) / 1000,
				note_count : 0,
				deleted    : false,
				index      : null
			},
			{
				id         : 3,
				name       : 'javascript语言精粹',
				created_at : new Date ().setMilliseconds ( 0 ) / 1000,
				note_count : 0,
				deleted    : false,
				index      : null
			},
			{
				id         : 4,
				name       : 'ReactJS',
				created_at : new Date ().setMilliseconds ( 0 ) / 1000,
				note_count : 0,
				deleted    : false,
				index      : null
			},
			{
				id         : 5,
				name       : 'IFE-Summer',
				created_at : new Date ().setMilliseconds ( 0 ) / 1000,
				note_count : 2,
				deleted    : false,
				index      : null
			}
		];
	};

	/**
	 *  id 编号
	 *  title 标题
	 *  notebook_id 所属笔记本
	 *  index   顺序
	 */
	getNoteList = function ( id ) {
		if ( id == 5 ) {
			return [
				{
					id          : 1,
					title       : 'RIA启航班任务一：个人知识管理工具',
					notebook_id : 5,
					index       : 1
				},
				{
					id          : 2,
					title       : 'RIA扬帆班任务一：图片网站',
					notebook_id : 5,
					index       : 2
				}
			];
		} else {
			return null;
		}

	};
	/**
	 * note
	 *
	 *  id 编号
	 *  title 标题
	 *  content 内容
	 *  notebook_id 所属笔记本
	 *  index   顺序
	 */
	getContent      = function ( id ) {
		if ( id == 1 ) {
			return '## 任务要求：' +
				'* 团队协作完成' +
				'* 支持Markdown格式的编辑及预览' +
				'* 除了jQuery、Markdown解析以外，不允许使用任何框架' +
				'* 功能可自定义，做得越多收获越多' +
				'## 任务时间' +
				'7月18日 至 7月26日' +
				'## 学习资料' +
				'* [春季班学习资料](https://github.com/baidu-ife/ife/tree/master/2015_spring/task/task0001)' +
				'* [春季班学习资料](https://github.com/baidu-ife/ife/tree/master/2015_spring/task/task0002)';
		} else if ( id == 2 ) {

			return '## 任务要求：' +
				'* 团队协作完成' +
				'* 支持在管理端拖拽图片来改变图片的分类，以及图片在展示页面的排列顺序' +
				'* 支持在管理端通过拖拽分类来改变分类在展示页面的排序' +
				'* 支持在管理端上传图片，上传功能可以使用第三方组件，比如[WebUploader](http://github.com/fex-team/webuploader/)' +
				'* 除了jQuery及WebUploader，不允许使用其他框架类库' +
				'* 不需要登陆注册等功能' +
				'* 如果需要使用Server端，不限制语言，Server端框架使用不限制' +
				'## 任务时间' +
				'7月18日 至 7月26日' +
				'## 学习资料' +
				'* [春季班学习资料](https://github.com/baidu-ife/ife/tree/master/2015_spring/task/task0001)' +
				'* [春季班学习资料](https://github.com/baidu-ife/ife/tree/master/2015_spring/task/task0002)';
		} else {
			return '';
		}
	};
	getNote=function(id){
		if ( id == 1 ) {
			return {
				id          : 1,
				title       : 'RIA启航班任务一：个人知识管理工具',
				content:'## 任务要求：' +
				'* 团队协作完成' +
				'* 支持Markdown格式的编辑及预览' +
				'* 除了jQuery、Markdown解析以外，不允许使用任何框架' +
				'* 功能可自定义，做得越多收获越多' +
				'## 任务时间' +
				'7月18日 至 7月26日' +
				'## 学习资料' +
				'* [春季班学习资料](https://github.com/baidu-ife/ife/tree/master/2015_spring/task/task0001)' +
				'* [春季班学习资料](https://github.com/baidu-ife/ife/tree/master/2015_spring/task/task0002)',
				notebook_id : 5,
				index       : 1
			};
		} else if ( id == 2 ) {
			return {
				id          : 2,
				title       : 'RIA扬帆班任务一：图片网站',
				content     :'## 任务要求：' +
				'* 团队协作完成' +
				'* 支持在管理端拖拽图片来改变图片的分类，以及图片在展示页面的排列顺序' +
				'* 支持在管理端通过拖拽分类来改变分类在展示页面的排序' +
				'* 支持在管理端上传图片，上传功能可以使用第三方组件，比如[WebUploader](http://github.com/fex-team/webuploader/)' +
				'* 除了jQuery及WebUploader，不允许使用其他框架类库' +
				'* 不需要登陆注册等功能' +
				'* 如果需要使用Server端，不限制语言，Server端框架使用不限制' +
				'## 任务时间' +
				'7月18日 至 7月26日' +
				'## 学习资料' +
				'* [春季班学习资料](https://github.com/baidu-ife/ife/tree/master/2015_spring/task/task0001)' +
				'* [春季班学习资料](https://github.com/baidu-ife/ife/tree/master/2015_spring/task/task0002)',
				notebook_id : 5,
				index       : 2
			};
		} else {
			return null;
		}
	};
	return {
		getNotebookList : getNotebookList,
		getNoteList     : getNoteList,
		getContent      : getContent,
		getNote         : getNote
	}
} ());