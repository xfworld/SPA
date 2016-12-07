import Person from './Person';
import BaseUrl from './BaseUrl';
import 'amazeui/dist/js/amazeui.min';
import 'amazeui/dist/css/amazeui.min.css';
import './admin.css';
// Template
//import titleTemplate from '../template/title.handlebars';
import indexTemplate from '../template/index/index.handlebars';
// let p = new Person('张三', 20);
// document.write(p.say());
// document.write(p.action());
// let currentRequest='http://localhost:8080/monitor';  //document.location.href
// let bUrl = new BaseUrl(currentRequest);
// document.write("</br>"+bUrl.parseHost()+bUrl.parseApp());

// document.addEventListener("DOMContentLoaded", function() {
// 	var div = document.createElement('div');
// 	div.innerHTML = titleTemplate({
// 		username: "test",
// 		books: [
// 			{ title: "A book", synopsis: "With a description" },
// 			{ title: "Another book", synopsis: "From a very good author" },
// 			{ title: "Book without synopsis" }
// 		]
// 	});
// 	document.body.appendChild(div);
// });
//
//
document.addEventListener("DOMContentLoaded", function() {
	$('body').append(indexTemplate({
		pages: [
			{ type: "success", icon: "file-text",name:"新增页面",number:"2300" },
			{ type: "warning", icon: "briefcase",name:"成交订单",number:"308" },
			{ type: "danger", icon: "recycle",name:"昨日访问",number:"80082" },
			{ type: "secondary", icon: "user-md",name:"在线用户",number:"3000" }
		]
	}));
	// var div = document.createElement('div');
	// div.innerHTML = indexTemplate({
	// 	pages: [
	// 		{ type: "success", icon: "file-text",name:"新增页面",number:"2300" },
	// 		{ type: "warning", icon: "briefcase",name:"成交订单",number:"308" },
	// 		{ type: "danger", icon: "recycle",name:"昨日访问",number:"80082" },
	// 		{ type: "secondary", icon: "user-md",name:"在线用户",number:"3000" }
	// 	]
	// });
	// document.body.appendChild(div);
	$('#topbar-collapse .am-dropdown').dropdown();
});
