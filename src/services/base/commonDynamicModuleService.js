/**
 * @fileoverview common Dynamic Module Service
 * @author xfworld
 * @Date  2016-09-20
 */

/**
 * commonDynamicModuleService
 * 提供动态模块服务
 */
Box.Application.addService('commonDynamicModuleService', function(application){

	'use strict';

	//--------------------------------------------------------------------------
	// Private
	//--------------------------------------------------------------------------
	let currnetModule={moduleTarget:document.querySelector('.admin-content-body')};

	function loadModule(moduleName,moduleData){
			return	moduleName(moduleData);
	}

	function startModule(startTarget,startContent){
		startTarget.innerHTML=startContent;
	//	Box.Application.start(startTarget);
	}

	function stopModule(stopTarget){
	//	Box.Application.stop(stopTarget);
		stopTarget.innerHTML='';
	}

	function toggleModule(requestModule){
		if(currnetModule!==null&&currnetModule!==undefined&&currnetModule!==requestModule){
			stopModule(currnetModule.moduleTarget);
		}
		let moduleContent=loadModule(requestModule.moduleName,requestModule.moduleData);
		if(moduleContent!==null){
			startModule(requestModule.moduleTarget,moduleContent);
			currnetModule=requestModule;
		}
	}

	//--------------------------------------------------------------------------
	// Public
	//--------------------------------------------------------------------------

	return {
			toggleModule:function(requestModule){
					toggleModule(requestModule);
			}
	};

});
