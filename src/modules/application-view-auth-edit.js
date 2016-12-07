

Box.Application.addModule('application-view-auth-edit', function(context) {

	'use strict';

	//--------------------------------------------------------------------------
	// Private
	//--------------------------------------------------------------------------
	var moduleEl;
	var moduleEdit;
	var moduleUrl;
	var commonModuleService;
	var commonFetchService;

	function initAllActionUrl(basePath){
			moduleUrl={};
			moduleUrl.showViewDataUrl=basePath+"applicationViewAuth/showAllView";
			moduleUrl.authViewSaveUrl=basePath+"applicationViewAuth/saveAuth";
	}

	function initEditModule(){
			moduleEdit = new Object();
			moduleEdit.cleanCheckboxStatus = function() {
				moduleEl.querySelector('#auth-check-all').checked=false;
				// moduleEl.querySelector('#auth-check-content').querySelectorAll('input[type=checkbox]').forEach(function(item, index) {
				// 	item.checked = false;
				// });
				$(moduleEl.querySelector('#auth-check-content').querySelectorAll('input[type=checkbox]')).each(function(index,item){
						item.checked = false;
				});

			}
			moduleEdit.checkboxChangeStatus = function(values) {
					if (values !== null && values.length > 0) {
						  values.forEach(function(item, index) {
						    var selectOption = "input[type='checkbox'][value='" + item.id + "']";
						    // moduleEl.querySelector('#auth-check-content').querySelectorAll(selectOption).forEach(function(item, index) {
						    //   item.checked = true;
						    // });
						    	$(moduleEl.querySelector('#auth-check-content').querySelectorAll(selectOption)).each(function(index,item) {
						       item.checked = true;
						    	});
						  });
					}
			}
			moduleEdit.checkboxToggleStatus = function() {
			  if (moduleEl.querySelector('#auth-check-all').checked) {
			    // moduleEl.querySelector('#auth-check-content').querySelectorAll('input[type=checkbox]').forEach(function(item, index) {
			    //   item.checked = true;
			    // });
			    	$(moduleEl.querySelector('#auth-check-content').querySelectorAll('input[type=checkbox]')).each(function(index,item) {
				       item.checked = true;
				     });
			  } else {
			    // moduleEl.querySelector('#auth-check-content').querySelectorAll('input[type=checkbox]').forEach(function(item, index) {
			    //   item.checked = false;
			    // });
					$(moduleEl.querySelector('#auth-check-content').querySelectorAll('input[type=checkbox]')).each(function(index,item) {
						 item.checked = false;
					 });
			  }
			}
			moduleEdit.getAuthChecked = function() {
					var auth=new Array();
				//	moduleEl.querySelector('#auth-check-content').querySelectorAll('input[type=checkbox]:checked').forEach(function(item,index){
					$(moduleEl.querySelector('#auth-check-content').querySelectorAll('input[type=checkbox]:checked')).each(function(index,item){
							var value=item.getAttribute("value");
							if(value!=null&&value!=undefined&&value.length>0){
								auth.push(value);
							}
					});
					return auth;
			}
			moduleEdit.dataLength = 4;
			moduleEdit.dataStrategy = function(data) {
			    var datas = new Array();
					var b;
					var len = data.length;
					var columnsMax = Math.ceil(len / this.dataLength);
					data.forEach(function(item,index) {
					    var a = Math.floor(index / columnsMax);
					    if (b !== a) {
					        b = a;
					        datas[a] = new Array();
					    }
					    datas[a].push(item);
					});
					return datas;
			}
			moduleEdit.renderViewData=function(html){
					if(html!=null&&html!=undefined){
						moduleEl.querySelector('#auth-check-content').innerHTML=html;
					//	moduleEl.querySelector('#auth-check-content').querySelectorAll('input[type=checkbox]').forEach(function(item,index){
						$(moduleEl.querySelector('#auth-check-content').querySelectorAll('input[type=checkbox]')).each(function(index,item){
							$(item).uCheck('enable');
						});
					}
			}
			moduleEdit.cleanViewData=function(){
				moduleEl.querySelector('#auth-check-content').innerHTML='';
			}
			moduleEdit.buildAuthViewCheckBox = function(data) {
			  var source = moduleEl.querySelector('#tpAuthView').innerHTML;
			  var template = Handlebars.compile(source);
				var dataList = this.dataStrategy(data);
				var html="";
				dataList.forEach(function(item,index) {
					html=html+template(item);
				});
			//  var html = template(data);
			  return html;
			}
			moduleEdit.init = function() {
				var context=this;
			  var request = commonFetchService.create(moduleUrl.showViewDataUrl, null, 'Get');
			  request.done(function(data) {
			    if (data != null && data != undefined && data.length > 0) {
						var html=context.buildAuthViewCheckBox(data);
						context.cleanViewData();
						context.renderViewData(html);
			    }
			  }).fail(function() {
			    messageBox.errorMessageBox("应用视图权限初始化失败,请与管理员联系");
			  });
			}
			moduleEdit.submitData = function(ele,callback){
					var param = {
					  "userid": this.userId,
					  "authList": this.getAuthChecked()
					};
					var request = commonFetchService.create(moduleUrl.authViewSaveUrl, param, 'Post');
					request.done(function(data) {
					  if (data != null && data != undefined) {
					    if (data.status) {
					      messageBox.infoMessageBoxCallFunc(data.message,callback);
					    } else {
					      messageBox.errorMessageBox(data.message);
					    }
					  }else{
							messageBox.errorMessageBox("应用视图授权失败,请与管理员联系");
						}
						ele.disabled = false;
					}).fail(function() {
					  messageBox.errorMessageBox("应用视图授权失败,请与管理员联系");
						ele.disabled = false;
					});
			}
			moduleEdit.editUserApplicationViewAuth = function(data) {
			  this.userId = data.userId;
			  var authList = data.authList;
				this.cleanCheckboxStatus();
			  //combo auth Data By checkbox status
				if(authList!=null&&authList!=undefined&&authList.length>0){
						this.checkboxChangeStatus(authList);
				}
			}


			moduleEdit.init();
	}



	//--------------------------------------------------------------------------
	// Public
	//--------------------------------------------------------------------------

	return {
		/**
		 * The behaviors that this module uses.
		 * @type String[]
		 */
		behaviors: ['moduleAction'],


		/**
		 * Initializes the module. Caches a data store object to todos
		 * @returns {void}
		 */
		init: function() {

			moduleEl = context.getElement();
			commonModuleService = context.getService('commonModuleService');
			commonFetchService = context.getService('commonFetchService');
			initAllActionUrl(context.getGlobalConfig('basePath'))
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
		onclick: function(event, element, elementType){
			switch (elementType) {
					case 'application-view-auth-edit-submit':
							element.disabled = true;
							var target=element.getAttribute('data-target');
							if(target!=null&&target!=undefined){
							//	console.log(moduleEdit.getAuthChecked());
								moduleEdit.submitData(element, function() {
									context.broadcast('showUserApplicationViewAuthReload');
									commonModuleService.broadModuleStateChanged(target);
								});

							}
							break;
					case 'application-view-auth-edit-close':
							var target=element.getAttribute('data-target');
							moduleEdit.cleanCheckboxStatus();
							moduleEdit.userId=null;
							if(target!=null&&target!=undefined){
								commonModuleService.broadModuleStateChanged(target);
							}
							break;
					case 'auth-check-all':
							//messageBox.infoMessageBox('全选被点击了');
							moduleEdit.checkboxToggleStatus();
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
				 editUserApplicationViewAuth: function(data) {
					 moduleEdit.editUserApplicationViewAuth(data);
				 }
 		 }
	};

});
