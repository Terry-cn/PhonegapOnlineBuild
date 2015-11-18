if(typeof(AKHB) == 'undefined'){
	AKHB = {};
}
if(typeof(AKHB.services) == 'undefined'){
	AKHB.services = {};
}

AKHB.services.db =(function(){
	return function(callback){
		try{
	        persistence.schemaSync(function(tx){
	        	callback();
	            console.log("Update schema success.");
	        });
	    }catch(ex){
	         console.log("Update schema failed.",ex);
	         callback();
	    }

	}
})();

AKHB.services.db.prototype.getTableLastUpdateTime = function(tableName,callback){

	var mSync = sync.all().filter('tableName','=',tableName);
	mSync.one(null,function(result){
		callback(false,result);
	});
};

AKHB.services.db.prototype.setTableLastUpdateTime = function(tx,tableName,lastUpdatetime,callback){
	this.getTableLastUpdateTime(tableName,function(err,result){
		if(!result){
			var _sync = new sync({
				tableName:tableName,
				lastUpdatetime:lastUpdatetime
			});
			persistence.add(_sync);
		}else{
			result.lastUpdatetime = lastUpdatetime;
		}
		if(!tx){
			persistence.flush(function() {
			  callback(false);
			});
		}else{
			callback(false);
		}
		
	});
};


AKHB.services.db.prototype.getArticleById = function(id,callback){
	var mArticles = article.all().filter('server_id','=',id);
	mArticles.one(null,function(article){
		callback(false,article);
	})
};

AKHB.services.db.prototype.getHomeArticle = function(callback){
	var mArticles = article.all().filter('type','=','3');
	mArticles.list(null,function(articles){
		var count = articles.length;
		if(count == 0){
			callback(false,null);
		}
		else if(count == 1){
			callback(false,articles[0]);
		}else{
			var index = Math.floor(Math.random()*count);
			callback(false,articles[index]);
		}
		
	})
};

AKHB.services.db.prototype.setArticle = function(tx,_article,callback){
	this.getArticleById(_article.id,function(err,resultArticle){
		if(!resultArticle){
			var _mArticle = new article({
				server_id:_article.id,
			  	title: _article.title,
			  	content: _article.content.replace(/\\\"/ig, "\""),
			  	last_modified: moment(_article.last_modified).toDate(),//_article.last_modified,
			  	type:_article.type,
			  	status:_article.status
			});
			persistence.add(_mArticle);
		}else{
			if(_article.status == 1){
				persistence.remove(resultArticle);
			}else{
				resultArticle.title= _article.title;
				resultArticle.content= _article.content.replace(/\\\"/ig, "\"");
				resultArticle.last_modified= moment(_article.last_modified).toDate();
				resultArticle.type= _article.type;
				resultArticle.status= _article.status;
			}
		}
		if(!tx){
			persistence.flush(function() {
			  callback(false);
			});
		}else{
			callback(false);
		};
	});
};


AKHB.services.db.prototype.getMessageById = function(id,callback){
	var mMessages = message.all().filter('server_id','=',id);
	mMessages.one(null,function(_message){
		callback(false,_message);
	})
};

AKHB.services.db.prototype.setMessage = function(tx,_message,callback){
	this.getMessageById(_message.id,function(err,resultMessage){
		if(!resultMessage){
			var _mMessage = new message({
				server_id:_message.id,
			  	title: _message.title,
			  	content: _message.content.replace(/\\\"/ig, "\""),
			  	last_modified: moment(_message.last_modified).toDate(),
			  	type:_message.type,
			  	status:_message.status
			});
			persistence.add(_mMessage);
		}else{
			if(_message.status == 1){
				persistence.remove(resultMessage);
			}else{
				resultMessage.title= _message.title;
				resultMessage.content= _message.content.replace(/\\\"/ig, "\"");
				resultMessage.last_modified= moment(_message.last_modified).toDate();
				//console.log("_message",_message.last_modified,_message);
				resultMessage.type= _message.type;
				resultMessage.status= _message.status;
			}
		}
		if(!tx){
			persistence.flush(function() {
			  callback(false);
			});
		}else{
			callback(false);
		};
	});
};


AKHB.services.db.prototype.getNavigationById = function(id,callback){
	var mNavigations = navigation.all().filter('server_id','=',id);
	mNavigations.one(null,function(navigation){
		callback(false,navigation);
	})
};
AKHB.services.db.prototype.hasNavigationChildren = function(id,callback){
	var mNavigations = navigation.all().filter('parent_id','=',id);
	mNavigations.and(new persistence.PropertyFilter('status','=','0'))
	.one(null,function(navigation){
		callback(false,navigation);
	})
};
AKHB.services.db.prototype.setNavigation = function(tx,_navigation,callback){
	this.getNavigationById(_navigation.id,function(err,resultNavigation){
		if(!resultNavigation){
			var _mNavigation = new navigation({
				server_id:_navigation.id,
			  	title: _navigation.title,
			  	parent_id: _navigation.parent_id,
			  	order_by: _navigation.order_by,
			  	content: _navigation.content,
			  	link: _navigation.link,
			  	last_modified:  moment(_navigation.last_modified).toDate(),//_navigation.last_modified,
			  	type:_navigation.type,
			  	status:_navigation.status,
			  	icon:_navigation.icon,
			  	home_page :_navigation.home_page
			});
			persistence.add(_mNavigation);
		}else{
			if(_navigation.status == 1){
				persistence.remove(resultNavigation);
			}else{
				resultNavigation.title = _navigation.title;
				//resultNnavigation.content(_navigation.content);
				resultNavigation.last_modified = moment(_navigation.last_modified).toDate();
				resultNavigation.type = _navigation.type;
				resultNavigation.status = _navigation.status;
				resultNavigation.content = _navigation.content;
				resultNavigation.parent_id = _navigation.parent_id;
				resultNavigation.link = _navigation.link;
				resultNavigation.order_by = _navigation.order_by;
				resultNavigation.icon = _navigation.icon;
				resultNavigation.home_page = _navigation.home_page;
			}
		}
		if(!tx){
			persistence.flush(function() {
			  callback(false);
			});
		}else{
			callback(false);
		}
	});
};

AKHB.services.db.prototype.getCommitteById = function(id,callback){
	var mCommitte = committees.all().filter('server_id','=',id);
	mCommitte.one(null,function(committe){
		callback(false,committe);
	})
};

AKHB.services.db.prototype.setCommitte = function(tx,_committe,remoteAddress,callback){
	var that = this;
	this.getCommitteById(_committe.id,function(err,resultCommitte){
		if(!resultCommitte){
			var _mCommitte = new committees({
				server_id:_committe.id,
			    inst_type :_committe.inst_type,
			    category :_committe.category,
			    title:_committe.title,
			    description :_committe.description,
			    email :_committe.email,
			    status :_committe.status,
			    last_modified:_committe.last_modified_date
			});
			persistence.add(_mCommitte);
		}else{
			if(_committe.status == 1){
				persistence.remove(resultCommitte);
			}else{
				resultCommitte.title = _committe.title;
				resultCommitte.last_modified = moment(_committe.last_modified_date).toDate();
				resultCommitte.inst_type = _committe.inst_type;
				resultCommitte.status = _committe.status;
				resultCommitte.category = _committe.category;
				resultCommitte.description = _committe.description;
				resultCommitte.email = _committe.email;
			}
		}
		that.setDirectories(_committe,remoteAddress,function(err){
			if(!tx){
				persistence.flush(function() {
				  callback(false);
				});
			}else{
				callback(false);
			}
		});
	});
};


AKHB.services.db.prototype.getNavigationsByParentId = function(id,callback){
	var mNavigations = navigation.all();
	mNavigations.filter('parent_id','=',id)
	.and(new persistence.PropertyFilter('status','=','0'))
	.order('order_by',true)
	.order('last_modified',false)
	.list(null,function(messages){
		callback(false,messages);
	});
};

AKHB.services.db.prototype.getHomepageIcons = function(callback){
	var mNavigations = navigation.all();
	mNavigations.filter('home_page','=',1)
	mNavigations.filter('parent_id','=',0)
	.and(new persistence.PropertyFilter('status','=','0'))
	.order('order_by',true)
	.order('last_modified',false)
	.list(null,function(navigations){
		callback(false,navigations);
	});
};

AKHB.services.db.prototype.getMessages = function(callback){
	var mMessages = message.all();
	mMessages.filter('status','=','0')
	.order('type',true)
	.order('server_id',false)
	.list(null,function(messages){
		callback(false,messages);
	});
};
AKHB.services.db.prototype.getMessageCount = function(callback){
	var mMessages = message.all();
	mMessages.filter('read','=','0')
	.and(new persistence.PropertyFilter('status','=','0'))
	.count(null,function(count){
		callback(false,count);
	});
};
AKHB.services.db.prototype.getActiveMessageCount = function(callback){
	var mMessages = message.all();
	mMessages.filter('type','=','2')
	.and(new persistence.PropertyFilter('read','=','0'))
	.and(new persistence.PropertyFilter('status','=','0'))
	.count(null,function(count){
		callback(false,count);
	});
};

AKHB.services.db.prototype.getLatestActiveMessage = function(callback){
	var mMessages = message.all()
	.filter('type','=','2')
	.and(new persistence.PropertyFilter('read','=','0'))
	.and(new persistence.PropertyFilter('status','=','0'))
	.order('server_id',false);
	mMessages.one(null,function(message){
		callback(false,message);
	})
};
AKHB.services.db.prototype.deleteMessage = function(id,callback){
console.log("deleteMessage",id);
	var mMessages = message.all().filter('server_id','=',id);
	mMessages.one(null,function(message){
		console.log(message.sataus);
		message.status = 1;
		console.log(message.sataus);
		persistence.flush(function() {
		 	callback(false,message);
		});
	})
};

AKHB.services.db.prototype.setMessageUsed = function(id,callback){
	var mMessages = message.all().filter('server_id','=',id);
	mMessages.one(null,function(message){
		message.type = 2;
		persistence.flush(function() {
		 	callback(false,message);
		});
	})
};

AKHB.services.db.prototype.setUsage = function(id,type,callback){
	var _usage = new usage({
		type:type,
		content_id:id,
		date_time:new Date()
	});
	persistence.add(_usage);
	persistence.flush(callback);
};




AKHB.services.db.prototype.getUsage = function(type,callback){
	var usages = usage.all().filter('type','=',type).limit(30);
	usages.list(function(data){
		callback(null,data);
	})
};

AKHB.services.db.prototype.getDirectoryById = function(id,callback){
	var directories = directory.all().filter('server_id','=',id);
	directories.one(function(data){
		callback(null,data);
	})
};
AKHB.services.db.prototype.getDirectoryCategories = function(callback){


	persistence.transaction(function(tx){
		tx.executeSql('select inst_type as id ,category as title from committees group by inst_type,category ;',
			null,
			function(data){
				callback(null,data);
			},
			function(err){
				console.log(err);
			});
	})

};
AKHB.services.db.prototype.setDirectoryCategories = function(model,callback){
	var that = this;
	var _category = category.all().filter('type','=',model.type);
	_category.one(function(dbCategory){
		if(dbCategory == null){
			var _directoryCategory = new category({
			    type:model.type,
			    title:model.title,
			    status :model.status
			});
			persistence.add(_directoryCategory);
			console.log("set _directoryCategory:",_directoryCategory);
			that.setDirectories(model,_directoryCategory,callback);
			
		}else{
			if(model.last_modified > dbCategory.last_modified){
				dbCategory.last_modified = model.last_modified;
				dbCategory.title = model.title;
				dbCategory.status = model.status;
				that.setDirectories(model,dbCategory,callback);
			}else{
				callback(null);
			}
		}
	})
}
AKHB.services.db.prototype.setDirectories = function(model,remoteAddress,callback){
	var that = this;
	var url = remoteAddress+'/webservice.php?type=2&table=directory';
	url+='&id='+model.id;
	url+='&inst_type='+model.inst_type;
	url+='&last_content_synced='+model.last_modified_date;

	$.get(url,function(data){
		try{
			data = JSON.parse(data);
		}catch(ex){
			//console.log(data);
			callback(nul);
			return;
		}
		async.each(data.content,function(item,itemCallback){
			itemCallback();
		},function(err){
			callback(err);
		});
	})
	
};
AKHB.services.db.prototype.setDirectory = function(model,id,callback){
	

	this.getDirectoryById(model.id,function(err,localModel){
		if(err ||  !localModel){
			var _directory = new directory({
				server_id: model.id,
			    type:model.type,
			    title:model.title,
			    description:model.description,
			    email:model.email,
			    members:model.members,
			    status :model.status,
			    last_modified:model.last_modified,
			    category_id : id
			});
			persistence.add(_directory);
		}else{
			if(model.status == 1){
				persistence.remove(localModel);
			}else{
				localModel.server_id =  model.id;
			    localModel.type = model.type;
			    localModel.title = model.title;
			    localModel.description = model.description;
			    localModel.email = model.email;
			    localModel.members = model.members;
			    localModel.status = model.status;
			    localModel.last_modified = model.last_modified;
			    localModel.category_id = id;
			}
		}
		callback(null);
	});
	

};
AKHB.services.db.prototype.getDirectories = function(type,callback){
	var directories = committees.all().filter('inst_type','=',type).limit(30);
	directories.list(function(data){
		callback(null,data);
	})
};

AKHB.services.db.prototype.getDirectoriesPagnation = function(category,page,callback){
	var directories = committees.all().filter('inst_type','=',category).order('title',true).limit(1).skip(page*1);
	directories.list(function(data){
		callback(null,data);
	})
};
AKHB.services.db.prototype.searchDirectories = function(key,callback){
	var directories = committees.all().filter('title','like','%'+key+'%').order('title',true).limit(20);
	directories.list(function(data){
		callback(null,data);
	})
};
AKHB.services.db.prototype.getDirectoriesCount = function(category,callback){
	var directories = committees.all().filter('inst_type','=',category);
	directories.count(function(count){
		callback(null,count);
	})
};


AKHB.services.db.prototype.getNavigations = function(callback){
	var mNavigations = navigation.all();
	mNavigations.filter('status','=','0')
		.order('parent_id',false)
		.order('order_by',true)
		.list(null,function(navigations){

		var jsonNavigations = new Array();
		async.each(navigations,function(nav,cb){
			nav.selectJSON(null,['*'],function(jsonResult){
				jsonNavigations.push(jsonResult);
				cb(null);
			})
		},function(err){
			var getNavigationsByParentId = function(parentId){
				var mNavArray = new Array();
				for(var nav in jsonNavigations){
					if(parentId == jsonNavigations[nav].parent_id){
						mNavArray.push(jsonNavigations[nav])
					}
				}
				return mNavArray;
			}
			if(typeof callback == 'function') {
				for(var nav in jsonNavigations){
					var childNavs = getNavigationsByParentId(jsonNavigations[nav].server_id);
					if(childNavs.length > 0){
						jsonNavigations[nav].children = childNavs;
					}
				}
				var newJsonNavigations = new Array();
				for(var nav in jsonNavigations){
					if(jsonNavigations[nav].parent_id == 0){
						newJsonNavigations.push(jsonNavigations[nav]);
					}
				}
				callback(null,newJsonNavigations);
			}

		});
		
	});
};

AKHB.services.db.prototype.clear =function(callback){
	persistence.reset(null, function(){
		persistence.schemaSync(function(){
			if(typeof callback == 'function') callback();
		});
	});
};