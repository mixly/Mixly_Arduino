var MixpyProject = function(){
	this.initProject();		
}

MixpyProject.prototype.initProject = function(){
	this.fileD = {};
	this.MAINF = 'main.py'
	this.fileD[this.MAINF] = ["", true, 1];
	this.selectFile = this.MAINF;
} 

MixpyProject.prototype.add = function(file, filecontent, filetype){
	if(this.exist(file)){
		console.log("Warning:file already in project");
		return ;
	}
	this.fileD[file] = [filecontent, false, filetype];
}

MixpyProject.prototype.delete = function(file){
	delete this.fileD[file];
	this.selectFile = undefined;
}
MixpyProject.prototype.getProject = function(){
	return  Object.keys(this.fileD);
}

MixpyProject.prototype.getUploadFileList = function(){
	var fileNameList = Object.keys(this.fileD);
	var ret = [];
	for(var i in fileNameList){
		if(this.fileD[fileNameList[i]][2] === 2)
			ret.push(fileNameList[i]);
	}
	return ret;
}

MixpyProject.prototype.getNewFileList= function(){
	var fileNameList = Object.keys(this.fileD);
	var ret = [];
	for(var i in fileNameList){
		if(this.fileD[fileNameList[i]][2] === 1)
			ret.push(fileNameList[i]);
	}
	return ret;

}

MixpyProject.prototype.isSelect = function(f){
	return this.fileD[f][1];
}

MixpyProject.prototype.select = function(f){
	if(this.selectFile !== undefined){
		this.modify(this.selectFile, mixlyjs.getCodeContent());
		this.fileD[this.selectFile][1] = false;	
	}
	this.fileD[f][1] = true;
	this.selectFile = f;
	var suffix = mixlyjs.getFileSuffix(f);
	var textFileSuffix = ["py", "txt", "csv", "xml"];
	if(textFileSuffix.indexOf(suffix) !== -1){
		tabClick('arduino');
		mixlyjs.renderIno(this.fileD[f][0]);
	}else{
		var base64str = 'data:image/' + suffix + ';base64,' + this.fileD[f][0];
		$('#mixpy_show_image').attr('src', base64str);
		mixlyjs.renderIno(this.fileD[f][0]);
		tabClick('image');

		var $imageA = $('#mixpy_link_image'); 
		$imageA.attr('href', base64str);
		$imageA.attr('download', f);
	}
}

MixpyProject.prototype.getFileNum = function(f){
	var files = Object.keys(this.fileD);
	return files.length;
}
MixpyProject.prototype.getFileContent = function(f){
	return this.fileD[f][0];
}
MixpyProject.prototype.getFileType= function(f){
	return this.fileD[f][2];
}
MixpyProject.prototype.modify = function(f, content){
	this.fileD[f][0] = content;
}

MixpyProject.prototype.exist = function(f){
	return f in this.fileD;
}
