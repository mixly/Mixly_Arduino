//window.onload = function() {
function getid(id) {
 return document.getElementById(id) ;
}
window.addEventListener('load', function load(event) {
	
 var oBox = getid("table_whole"); 
 var oTop = getid("content_blocks"); 
 var oTop1 = getid("content_area");
 var oBottom = getid("side_code_parent");
 var oLine = getid("mid_td");
 

 oLine.onmousedown = function(e) {
 	var disX = (e || event).clientX;
 	oLine.left = oLine.offsetLeft;
 	document.onmousemove = function(e) { 
 		//console.log(oBox.clientWidth + " " + oLine.style.left + " " + disX + " " + (e || event).clientX);	
  		var iT = oLine.left + ((e || event).clientX - disX);
 		var e=e||window.event,tarnameb=e.target||e.srcElement;
  		var maxT = oBox.clientWidth;
		var minT = Blockly.mainWorkspace.toolbox_.width;
  		oLine.style.margin = 0;
  		iT < minT && (iT = minT);
  		iT > maxT && (iT = maxT);
		//console.log(oBox.clientWidth+" "+iT+" "+oTop1.style.width+" "+oTop.style.width);
		var percent=iT*100/oBox.clientWidth;
  		oTop1.style.width = percent + '%';
  		oTop.style.width = percent  + '%';  // no need this line
  		oLine.style.left = percent  + '%';
  		Blockly.fireUiEvent(window, 'resize');
  		oBottom.style.width = ( 100 - percent ) + '%';
  		
  		return false;
 	}; 
 	document.onmouseup = function() {
  		document.onmousemove = null;
  		document.onmouseup = null; 
  		Blockly.fireUiEvent(window, 'resize');
  		oLine.releaseCapture && oLine.releaseCapture();
 	};
 	oLine.setCapture && oLine.setCapture();
 	return false;
 };
 
});