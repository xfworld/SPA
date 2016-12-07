import Box from 't3js';
import 'amazeui/dist/js/amazeui.min';

Box.Application.addModule('headerbarMenu', function(context) {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------
    let moduleEl;
    let moduleEdit;
    let moduleUrl;
    let commonBasePathService;
    let commonModuleService;
    let commonFetchService;

    function initAllActionUrl(basePath) {
        moduleUrl = {};
        moduleUrl.showViewDataUrl = basePath + "applicationViewAuth/showAllView";
        moduleUrl.authViewSaveUrl = basePath + "applicationViewAuth/saveAuth";
    }

    function initEditModule() {
        moduleEdit = {};
        $(moduleEl.querySelector('.am-dropdown')).dropdown();
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
            commonModuleService = context.getService('commonModuleService');
            commonFetchService = context.getService('commonFetchService');
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
            commonModuleService = null;
            commonFetchService = null;

        },
        onclick: function(event, element, elementType) {
            switch (elementType) {
                case 'headerbar-menu-email':
                    let target = element.getAttribute('data-target');
                    if (target !== null && target !== undefined) {
                        alert(target);
                    }
                    break;
                case 'headerbar-menu-resource':
                    alert('resource');
                    break;
                case 'headerbar-menu-config':
                    alert('config');
                    break;
                case 'headerbar-menu-off':
                    alert('退出');
                    break;
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
