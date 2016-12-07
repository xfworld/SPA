import Box from 't3js';
/**
 * @fileoverview common Fetch Service
 * @author xfworld
 * @Date  2016-09-23
 */

/**
 * commonFetchService
 * 提供远程调用
 */
Box.Application.addService('commonFetchService', function(application){

	'use strict';

	//--------------------------------------------------------------------------
	// Private
	//--------------------------------------------------------------------------
	var AjaxService=function AjaxService(url,param,type){
				if(param===null||param===undefined){
					param=[];
				}
				if(type===null||type===undefined){
					type='Get';
				}
				var deferred = $.Deferred();

				$.ajax({
						cache:false,
						async:true,
						type:type,
						dataType:'json',
						contentType:"application/x-www-form-urlencoded; charset=UTF-8",
						url:url,
						data:param}).done(function(data){
			        if(data!==null&&data!==undefined) {
			            deferred.resolve(data);
			        } else {
			            deferred.reject();
			        }
			    }).fail(function(){
			        deferred.reject();
			    });
			    return deferred.promise();
	};

	//--------------------------------------------------------------------------
	// Public
	//--------------------------------------------------------------------------

	return {
			create:function(url,param,type){
					return new AjaxService(url,param,type);
			}
	};

});
