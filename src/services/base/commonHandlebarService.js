import 'babel-polyfill';
/**
 * commonHandlebarService
 * 提供模板服务
 */
Box.Application.addService('commonHandlebarService', function(application) {

    'use strict';

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------
    let handlebarTemplate = require.context("../../template/", true, /^\.\/.*\.hbs$/);
    let handlebarMap = initHandlebarTemplate();

    function initHandlebarTemplate() {
        let map = new Map();
        if (handlebarTemplate != null && handlebarTemplate.keys() != null) {
            for (let str of handlebarTemplate.keys()) {
                let startPos = str.lastIndexOf("/");
                if (startPos >= 0) {
                    let endPos = str.lastIndexOf(".hbs");
                    let key = str.substring(startPos + 1, endPos);
                    map.set(key, str);
                }
            }
        }
        return map;
    }

    function findHandlebarTemplate(templateName) {
      if(handlebarMap!=null){
         let obj=handlebarMap.get(templateName);
         if(obj!=null){
           return handlebarTemplate(obj);
         }
      }
    }



    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        findHandlebarTemplate: function(templateName) {
            return findHandlebarTemplate(templateName);
        }
    };

});
