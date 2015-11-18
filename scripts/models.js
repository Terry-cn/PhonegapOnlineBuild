
// persistence.store.websql.config(persistence, 'AKHB', 'AKHB db', 10 * 1024 * 1024);
// persistence.store.memory.config(persistence);
persistence.store.cordovasql.config(
  persistence,
  'myIIUK',
  '1.0',                // DB version
  'myIIUK db',          // DB display name
  5 * 1024 * 1024,        // DB size (WebSQL fallback only)
  0,                      // SQLitePlugin Background processing disabled
  2                       // DB location (iOS only), 0 (default): Documents, 1: Library, 2: Library/LocalDatabase
                          //   0: iTunes + iCloud, 1: NO iTunes + iCloud, 2: NO iTunes + NO iCloud
                          //   More information at https://github.com/litehelpers/Cordova-sqlite-storage#opening-a-database
);
persistence.debug = false;


var sync = persistence.define('sync', {
	lastUpdatetime: "DATE",
	tableName: "TEXT"
});

var article = persistence.define('articles', {
	server_id:"INT",
  	title: "TEXT",
  	content: "TEXT",
  	last_modified: "DATE",
  	type:"INT",
  	status:"INT"
});

var navigation = persistence.define('navigations', {
	  server_id:"INT",
  	title: "TEXT",
  	last_modified: "DATE",
    content: "TEXT",
  	type:"INT",
  	status:"INT",
  	link: "TEXT",
  	parent_id:"INT",
  	order_by:"INT",
    icon:"TEXT",
    home_page: "INT"
});

var message = persistence.define('messages', {
    server_id:"INT",
    title: "TEXT",
    last_modified: "DATE",
    content: "TEXT",
    type:"INT",
    status:"INT",
    read:"INT"
});

var usage = persistence.define('usages', {
    content_id: "TEXT",
    type:"INT",
    date_time:"DATE"
});

var directory =  persistence.define('directories', {
    server_id: "INT",
    type:"INT",
    title:"TEXT",
    description:"TEXT",
    email:"TEXT",
    members:"JSON",
    status :"INT",
    last_modified:"DATE",
    category_id : "TEXT"
});

var committees =  persistence.define('committees', {
    server_id:"INT",
    inst_type :"INT",
    category :"TEXT",
    title:"TEXT",
    description :"TEXT",
    email :"TEXT",
    status :"INT",
    last_modified:"DATE",
});

//directory.index(['title','category_id']);
