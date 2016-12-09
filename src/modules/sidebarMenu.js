import BaseModule from '../components/BaseModule';
import imgChrome from '../images/admin-chrome.png';
import imgIE from '../images/admin-ie.png';
import imgFirefox from '../images/admin-firefox.png';
import imgOpera from '../images/admin-opera.png';
import imgSafari from '../images/admin-safari.png';

Box.Application.addModule('sidebarMenu', function(context) {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------
    let moduleEl;
    let moduleEdit;
    let moduleUrl;
    let commonBasePathService;
    let commonDynamicModuleService;
    let commonFetchService;

    let moduleTarget;
    let req = require.context("../template/", true, /^\.\/.*\.handlebars$/);

    function initAllActionUrl(basePath) {
        moduleUrl = {};

    }

    function initEditModule() {
        moduleEdit = {};

    }



    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        /**
         * The behaviors that this module uses.
         * @type String[]'moduleAction'
         */
        behaviors: [],


        /**
         * Initializes the module. Caches a data store object to todos
         * @returns {void}
         */
        init: function() {

            moduleEl = context.getElement();
            commonBasePathService = context.getService('commonBasePathService');
            commonDynamicModuleService = context.getService('commonDynamicModuleService');
            commonFetchService = context.getService('commonFetchService');
            moduleTarget = document.querySelector('.admin-content-body');
            initAllActionUrl(commonBasePathService.getBasePath());
            initEditModule();

        },

        /**
         * Destroys the module.
         * @returns {void}
         */
        destroy: function() {
            moduleEl = null;
            moduleEdit = null;
            moduleUrl = null;
            commonDynamicModuleService = null;
            commonFetchService = null;

        },
        onclick: function(event, element, elementType) {
            switch (elementType) {
                case 'active-module':
                    let target = element.getAttribute('data-moduleName');
                    if (target !== null && target !== undefined) {
                        let moudleData={};
                        if(target.includes('index')){
                          moudleData={pages: [
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
                      		]};
                        }
                        let temp=req(target);
                        let baseModule=new BaseModule(temp,moduleTarget,moudleData);
                        commonDynamicModuleService.toggleModule(baseModule);
                    }

            }
        },
        onchange: function(event, element, elementType) {
            switch (elementType) {

            }
        },
        /**
         * Handles all messages received for the module.
         * @param {string} name The name of the message received.
         * @param {*} [data] Additional data sent along with the message.
         * @returns {void}
         */
        onmessage: {

        }
    };

});
