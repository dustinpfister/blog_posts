let klawFiles = require('./klaw.js').klawFiles,
fs = require('fs')

klawFiles(function(item){
	
	//console.log(item.path);
	
	fs.readFile(item.path, function(e,data){
		
		if(data){
			
			console.log(data.toString());
			
		}
		
		
	})
	
});