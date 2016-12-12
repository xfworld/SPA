
'use strict';

//import Box from 't3js';
//import 'amazeui/dist/js/amazeui.min';
import 'amazeui/dist/css/amazeui.min';
import AMUI from 'amazeui';
import '../css/admin';

import indexTemplate from '../template/index/index.handlebars';

import '../services/commonFetchService';
import '../services/commonBasePathService';
import '../services/commonStaticModuleService';
import '../services/commonDynamicModuleService';
import '../modules/headerbarMenu';
import '../modules/sidebarMenu';

import Handlebars from 'handlebars/handlebars.runtime';
import Helps from 'handlebars-helpers';

import indexIcon from '../images/app-icon72x72@2x.png';
import indexFavicon from '../images/favicon.png';

// const image = require.context("../images/", true, /\.png$/);
import imgChrome from '../images/admin-chrome.png';
import imgIE from '../images/admin-ie.png';
import imgFirefox from '../images/admin-firefox.png';
import imgOpera from '../images/admin-opera.png';
import imgSafari from '../images/admin-safari.png';


Handlebars.registerHelper('wrapWithMoo', (options) => {
  return new Handlebars.SafeString(`moo! ${options.fn(this)} moo!`);
});

document.addEventListener("DOMContentLoaded", function() {
	$('body').append(indexTemplate({
		pages: [
			{ type: "success", icon: "file-text",name:"新增页面",number:"2300" },
			{ type: "warning", icon: "briefcase",name:"成交订单",number:"308" },
			{ type: "danger", icon: "recycle",name:"昨日访问",number:"80082" },
			{ type: "secondary", icon: "user-md",name:"在线用户",number:"3000" }
		],
		indexBrowsers:[
			{img:imgChrome,name:'Chrome',number:'9000'},
			{img:imgIE,name:'IE',number:'3000'},
			{img:imgFirefox,name:'Firefox',number:'5000'},
			{img:imgOpera,name:'Opera',number:'3200'},
			{img:imgSafari,name:'Safari',number:'4000'},
		]
}));

  Box.Application.init({debug:true});
});
