import Box from 't3js';
/**
 * @fileoverview common Module Service
 * @author xfworld
 * @Date  2016-09-20
 */

/**
 * commonModuleService
 * 提供模块服务
 */
Box.Application.addService('commonModuleService', function(application){

	'use strict';

	//--------------------------------------------------------------------------
	// Private
	//--------------------------------------------------------------------------
	function toggleModuleStatus(currentModuleName,tranModuleName,currentModuleElement){
		if(currentModuleName!==null&&tranModuleName!==null&&currentModuleElement!==null){
			if(equalsModuleName(currentModuleName,tranModuleName)){
				moduleOpen(currentModuleElement);
			}else{
				moduleClose(currentModuleElement);
			}
		}
	}

	function equalsModuleName(cur,tran){
		if(cur===tran){
			return true;
		}
		return false;
	}

	function moduleOpen(moduleElement){
		if($(moduleElement).hasClass("am-hide")){
			$(moduleElement).removeClass('am-hide');
		}
	}

	function moduleClose(moduleElement){
		if(!$(moduleElement).hasClass("am-hide")){
			$(moduleElement).addClass('am-hide');
		}
	}

	function broadModuleStateChanged(moduleTarget){
		application.broadcast('moduleAction', {
			moduleName:moduleTarget
		});
	}

	//--------------------------------------------------------------------------
	// Public
	//--------------------------------------------------------------------------

	return {
			toggleModuleStatus:function(data){
				toggleModuleStatus(data.currentModuleName,data.tranModuleName,data.currentModuleElement);
			},
			broadModuleStateChanged:function(data){
				broadModuleStateChanged(data);
			}
	};

});
