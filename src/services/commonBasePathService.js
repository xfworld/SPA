import BaseUrl from '../components/BaseUrl';
/**
 * @fileoverview common BasePath Service
 * @author xfworld
 * @Date  2016-09-23
 */

/**
 * commonBasePathService
 * 提供路径服务
 */
Box.Application.addService('commonBasePathService', function(application){

	'use strict';

	//--------------------------------------------------------------------------
	// Private
	//--------------------------------------------------------------------------
	let baseUrl=new BaseUrl(window.document.location.href);

	//--------------------------------------------------------------------------
	// Public
	//--------------------------------------------------------------------------

	return {
			getBasePath:function(){
					let base=baseUrl.parseHost();
					let app=baseUrl.parseApp();
					return base+app;
			}
	};

});
