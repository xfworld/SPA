import Box from 't3js';
import 'amazeui/dist/js/amazeui.min';
import 'amazeui/dist/css/amazeui.min';
import '../css/admin';

import indexTemplate from '../template/index/index.handlebars';

import '../services/commonFetchService';
import '../services/commonBasePathService';
import '../services/commonModuleService';
import '../modules/headerbarMenu';



document.addEventListener("DOMContentLoaded", function() {
	$('body').append(indexTemplate({
		pages: [
			{ type: "success", icon: "file-text",name:"新增页面",number:"2300" },
			{ type: "warning", icon: "briefcase",name:"成交订单",number:"308" },
			{ type: "danger", icon: "recycle",name:"昨日访问",number:"80082" },
			{ type: "secondary", icon: "user-md",name:"在线用户",number:"3000" }
		]
}));

  Box.Application.init({debug:true});
});
