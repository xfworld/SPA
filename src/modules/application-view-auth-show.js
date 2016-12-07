

Box.Application.addModule('application-view-auth-show', function(context) {

	'use strict';

	//--------------------------------------------------------------------------
	// Private
	//--------------------------------------------------------------------------
	var	moduleEl;
	var moduleUrl;
	var moduleSearch;
	var commonModuleService;
	var commonFetchService;

	function initAllActionUrl(bashPath){
		 moduleUrl=new Object();
		 moduleUrl.tableActionUrl=bashPath+"applicationViewAuth/get";
	}

	function initTable(){
	var authTable=$('#application-view-auth-table').DataTable({
			 ajax: { url: moduleUrl.tableActionUrl,
							 type: "GET",
							 data: function ( d ){
									  var obj=moduleSearch.getSearchValue();
									  d=$.extend(true,d,obj);
							 }
						 },
					pagingType:'full_numbers_no_ellipses',
					serverSide: true,
					processing: true,
					deferRender:true,
					searching : false,
					ordering : false,
					columns: [
							{"data": "userMapping.userid","width":"15%"},
							{"data": "userMapping.username","width":"15%"},
							{"data": "userMapping.usertype","width":"10%"},
							{"data": "userAuthApplicationView","width":"50%"},
							{"data": "userMapping.userid","width":"10%"}
					],
					columnDefs: [
					 {
						 targets: 4,
						 data:"userMapping.userid",
							render: function (a, b, c, d) {
									var context =
									{
											func: [{"name": "授权","target":"application-view-auth-edit","clickevent":"application-view-auth-edit","value": JSON.stringify({"userId":a,"authList":c.userAuthApplicationView}), "type": "warning"}]
									};
									var source   = $("#tpl").html();
									var template = Handlebars.compile(source);
									var html = template(context);
									return html;
							}
					},
					{
						targets: 2,
					  data:"userMapping.usertype",
					 	render:function(data,type,row,meta){
							var obj=_checkUserType(data);
							var source   = $("#tp2").html();
							var template = Handlebars.compile(source);
							var html = template(obj);
							return html;
						}
					},
					 {
						 targets:3,
						 data:"userAuthApplicationView",
						 render:function(data,type,row,meta){
							 if(data!=null&&data!=undefined){
								 var source   = $("#tplauth").html();
								 var template = Handlebars.compile(source);
								 var html = template(_dataStrategy(data));
								 return html;
							 }
							 return data;
						 }
					 }
					]
		 });

		 function _checkUserType(data){
				var obj=new Object();
				if(data==3){
					obj.type="primary";
					obj.name="管理员";
				}else{
					obj.type="success";
					obj.name="普通";
				}
				return obj;
			}

		 function _dataStrategy(data){
			 var datas = new Array();
			 var dataLength = 3;
			 var b;
			 var len = data.length;
			 var columnsMax = Math.ceil(len / dataLength);
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

		 return authTable;
	}

	function initSearch(){
			moduleSearch=new Object();

			moduleSearch.getSearchValue=function(){
				var obj=new Object();
				obj.username=moduleEl.querySelector('#auth-search-username').value;
				return obj;
			}

			moduleSearch.cleanSearchValue=function(){
				moduleEl.querySelector('#auth-search-username').value='';
			}
			moduleSearch.authTable = initTable();
			moduleSearch.authTableReload = function(search) {
			  if (search) {
			    moduleSearch.authTable.ajax.reload();
			  } else {
			    moduleSearch.authTable.ajax.reload(false, null);
			  }
			}
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
			initAllActionUrl(context.getGlobalConfig('basePath'));
			initSearch();
		},
		/**
		 * Destroys the module.
		 * @returns {void}
		 */
		destroy: function() {
			moduleEl = null;
			moduleSearch = null;
			moduleUrl = null;
			commonModuleService = null;
			commonFetchService = null;
		},
		onclick: function(event, element, elementType) {

          switch (elementType) {
							case 'application-view-auth-search-submit':
									moduleSearch.authTableReload(true);
									break;
							case 'application-view-auth-search-rest':
									moduleSearch.cleanSearchValue();
									moduleSearch.authTableReload(true);
									break;
              case 'application-view-auth-edit':
									var target=element.getAttribute('data-target');
									var obj=JSON.parse(element.getAttribute('clickvalue'));
									if(target!=null&&target!=undefined){
										commonModuleService.broadModuleStateChanged(target);
										context.broadcast('editUserApplicationViewAuth',obj);
									}
                  break;

          }
    },
		/**
		 * Handles all click events for the module.
		 * @param {Event} event A DOM-normalized event object.
		 * @param {HTMLElement} element The nearest HTML element with a data-type
		 *      attribute specified or null if there is none.
		 * @param {string} elementType The value of data-type for the nearest
		 *      element with that attribute specified or null if there is none.
		 * @returns {void}
		 */
		onchange: function(event, element, elementType) {

		},

		/**
		 * Handles all messages received for the module.
		 * @param {string} name The name of the message received.
		 * @param {*} [data] Additional data sent along with the message.
		 * @returns {void}
		 */
		 onmessage: {
			 	showUserApplicationViewAuthReload:function(){
						moduleSearch.authTableReload(false);
				}
     }
	};

});
