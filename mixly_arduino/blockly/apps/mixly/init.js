
    var sidecodeDisplay=false;

  /**
 * 点击侧边显示代码按钮
 */
 function sidecodeClick(){
  if(sidecodeDisplay){
   document.getElementById('side_code_parent').style.display = 'none';
   document.getElementById('sidebar').className='right-top';
   document.getElementById('mid_td').style.display = 'none';
   sidecodeDisplay=false;
 }else{
   document.getElementById('side_code_parent').style.display = '';
   document.getElementById('sidebar').className='right-top2';
   document.getElementById('mid_td').style.display = '';
   sidecodeDisplay=true;
 }
 Blockly.fireUiEvent(window, 'resize');
}
/**
 * List of tab names.
 * @private
 */
 var TABS_ = ['blocks', 'arduino', 'xml'];

 var selected = 'blocks';

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} clickedName Name of tab clicked.
 */
 function tabClick(clickedName) {
  // If the XML tab was open, save and render the content.
  if (document.getElementById('tab_xml').className == 'tabon') {
    var xmlTextarea = document.getElementById('content_xml');
    var xmlText = xmlTextarea.value;
    var xmlDom = null;
    try {
      xmlDom = Blockly.Xml.textToDom(xmlText);
    } catch (e) {
      var q =
      window.confirm('Error parsing XML:\n' + e + '\n\nAbandon changes?');
      if (!q) {
        // Leave the user on the XML tab.
        return;
      }
    }
    if (xmlDom) {
      Blockly.mainWorkspace.clear();
      Blockly.Xml.domToWorkspace(xmlDom,Blockly.mainWorkspace);
    }
  }
  if (document.getElementById('tab_blocks').className == 'tabon') {
    Blockly.mainWorkspace.setVisible(false);
  }
  // Deselect all tabs and hide all panes.
  for (var i = 0; i < TABS_.length; i++) {
    var name = TABS_[i];
    document.getElementById('tab_' + name).className = 'taboff';
    document.getElementById('content_' + name).style.visibility = 'hidden';
  }

 // Select the active tab.
 selected = clickedName;
 document.getElementById('tab_' + clickedName).className = 'tabon';
  // Show the selected pane.
  document.getElementById('content_' + clickedName).style.visibility =
  'visible';
  renderContent();
  if (clickedName == 'blocks') {
    Blockly.mainWorkspace.setVisible(true);
     /*
      动态绑定undo和redo按钮，使得ace和blockly都能使用
      author:zyc
      date:2018-10-14
    */
    //动态绑定undo和redo按钮
   $('input[name="undo"]').unbind();
   $('input[name="redo"]').unbind();
   $('input[name="undo"]').click(function(){
      Blockly.mainWorkspace.undo(0);
   });
   $('input[name="redo"]').click(function(){
      Blockly.mainWorkspace.undo(1);
   });
	//重新显示
	if(sidecodeDisplay){
   document.getElementById('side_code_parent').style.display = '';
   document.getElementById('mid_td').style.display = '';
   document.getElementById('sidebar').className='right-top2';
 }else{
   document.getElementById('side_code_parent').style.display = 'none';
   document.getElementById('mid_td').style.display = 'none';
   document.getElementById('sidebar').className='right-top';
 }
	//显示右侧悬浮按钮
	document.getElementById('sidebar').style.visibility = 'visible';
}
if(clickedName=="arduino"){
   //隐藏右侧悬浮按钮
   document.getElementById('sidebar').style.visibility = 'hidden';
   //点击代码将隐藏右侧代码，否则出现两个代码区域
   document.getElementById('side_code_parent').style.display = 'none';
   document.getElementById('mid_td').style.display = 'none';
   //动态绑定undo和redo按钮
   $('input[name="undo"]').unbind();
   $('input[name="redo"]').unbind();
   $('input[name="undo"]').click(function(){
      editor.undo();
   });
   $('input[name="redo"]').click(function(){
      editor.redo();
   });
 }
 Blockly.fireUiEvent(window, 'resize');
}

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
 function renderContent() {
  var content = document.getElementById('content_' + selected);
  // Initialize the pane.
  if (content.id == 'content_blocks') {
    // If the workspace was changed by the XML tab, Firefox will have performed
    // an incomplete rendering due to Blockly being invisible.  Rerender.
    Blockly.mainWorkspace.render();
      //var arduinoTextarea = document.getElementById('side_code');
      var code = Blockly.Arduino.workspaceToCode(Blockly.mainWorkspace) || '';
      var chinese_code = code.replace(/(_[0-9A-F]{2}_[0-9A-F]{2}_[0-9A-F]{2})+/g, function (s) { return decodeURIComponent(s.replace(/_/g, '%')); });
      editor_side_code.setValue(chinese_code, -1);
    } else if (content.id == 'content_xml') {
      var xmlTextarea = document.getElementById('content_xml');
      var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
      var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
      xmlTextarea.value = xmlText;
      xmlTextarea.focus();
    } else if (content.id == 'content_arduino') {
    //content.innerHTML = Blockly.Arduino.workspaceToCode(Blockly.mainWorkspace);
    //var arduinoTextarea = document.getElementById('content_arduino');
    //arduinoTextarea.value = Blockly.Arduino.workspaceToCode(Blockly.mainWorkspace);
    //arduinoTextarea.focus();
    var code = Blockly.Arduino.workspaceToCode(Blockly.mainWorkspace) || '';
    var chinese_code = code.replace(/(_[0-9A-F]{2}_[0-9A-F]{2}_[0-9A-F]{2})+/g, function (s) { return decodeURIComponent(s.replace(/_/g, '%')); });
    editor.setValue(chinese_code, -1);
  }
}

/**
 * Compute the absolute coordinates and dimensions of an HTML element.
 * @param {!Element} element Element to match.
 * @return {!Object} Contains height, width, x, and y properties.
 * @private
 */
 function getBBox_(element) {
  var height = element.offsetHeight;
  var width = element.offsetWidth;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  return {
    height: height,
    width: width,
    x: x,
    y: y
  };
}

/**
 * Initialize Blockly.  Called on page load.
 */
 var editor;
 var editor_side_code;
/*
  添加ACE放大缩小事件
  author:zyc
  date:2018-10-15
*/
/*
    解决ACE放大后padding扩大导致放大缩小按钮偏移的问题
    author:zyc
    date:2018-10-15
*/
function resetACEFontSizeButtonPositon(){
  $('#content_arduino').css("padding","9px");
}
var increaseACEFontSize = function(){
  //放大代码界面字体
  var size = parseInt(editor.getFontSize(), 10) || 12;
  editor.setFontSize(size + 1);
  //放大侧边栏字体
  var sideSize = parseInt(editor_side_code.getFontSize(), 10) || 12;
  editor_side_code.setFontSize(sideSize + 1); 
  resetACEFontSizeButtonPositon()
}
var decreaseACEFontSize = function(){
  var size = parseInt(editor.getFontSize(), 10) || 12;
  editor.setFontSize(Math.max(size - 1 || 1));
  var sideSize = parseInt(editor_side_code.getFontSize(), 10) || 12;
  editor_side_code.setFontSize(Math.max(sideSize - 1 || 1));
  resetACEFontSizeButtonPositon()
}
var resetACEFontSize = function(){
  editor.setFontSize(17);
  editor_side_code.setFontSize(17); 
}
 function init() {
  //window.onbeforeunload = function() {
  //  return 'Leaving this page will result in the loss of your work.';
  //};
  editor = ace.edit("content_arduino");
  if(window.conf == null || window.conf.lastEditorTheme == null){
      window.conf = window.conf || {};
      window.conf['lastEditorTheme'] = "ace/theme/xcode";
  }
  editor.setTheme(window.conf.lastEditorTheme);
  editor.getSession().setMode("ace/mode/c_cpp");
  editor.setFontSize(17);
  editor.setShowPrintMargin(false);
  editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
  });
  editor.setScrollSpeed(0.05);
  editor_side_code = ace.edit("side_code");
  editor_side_code.setTheme(window.conf.lastEditorTheme);
  editor_side_code.getSession().setMode("ace/mode/c_cpp");
  editor_side_code.setFontSize(17);
  editor_side_code.setShowPrintMargin(false);
  editor_side_code.setReadOnly(true);
  editor_side_code.setScrollSpeed(0.05);
  $('#aceTheme').val(window.conf.lastEditorTheme);
  /*
  	添加ACE放大缩小快捷键
  	author:zyc
  	date:2018-10-14
   */
  editor.commands.addCommands([
  	{
	    name: "increaseFontSize",
	    bindKey: "Ctrl-=|Ctrl-+",
	    exec: function(editor) {
	        var size = parseInt(editor.getFontSize(), 10) || 12;
	        editor.setFontSize(size + 1);
	    }
	}, {
	    name: "decreaseFontSize",
	    bindKey: "Ctrl+-|Ctrl-_",
	    exec: function(editor) {
	        var size = parseInt(editor.getFontSize(), 10) || 12;
	        editor.setFontSize(Math.max(size - 1 || 1));
	    }
	}, {
	    name: "resetFontSize",
	    bindKey: "Ctrl+0|Ctrl-Numpad0",
	    exec: function(editor) {
	        editor.setFontSize(12);
	    }
	}]);
  //动态生成按钮元素
  $('.ace_scroller').append('<div id="resetFontSize" class="setFontSize" width="32" height="32" onclick="resetACEFontSize()" ></div>');
  $('.ace_scroller').append('<div id="increaseFontSize" class="setFontSize" width="32" height="32" onclick="increaseACEFontSize()" ></div>');
  $('.ace_scroller').append('<div id="decreaseFontSize" class="setFontSize" width="32" height="32" onclick="decreaseACEFontSize()" ></div>');
  //endACE放大缩小
  var container = document.getElementById('content_area');
  var onresize = function(e) {
    var bBox = getBBox_(container);
    for (var i = 0; i < TABS_.length; i++) {
      var el = document.getElementById('content_' + TABS_[i]);
      el.style.top = bBox.y + 'px';
      el.style.left = bBox.x + 'px';
      // Height and width need to be set, read back, then set again to
      // compensate for scrollbars.
      el.style.height = bBox.height + 'px';
      el.style.height = (2 * bBox.height - el.offsetHeight) + 'px';
      el.style.width = bBox.width + 'px';
      el.style.width = (2 * bBox.width - el.offsetWidth) + 'px';
    }
    // Make the 'Blocks' tab line up with the toolbox.
    if (Blockly.mainWorkspace.toolbox_.width) {
      document.getElementById('tab_blocks').style.minWidth =
      (Blockly.mainWorkspace.toolbox_.width - 38) + 'px';
          // Account for the 19 pixel margin and on each side.
        }
      };
      window.addEventListener('resize', onresize, false);

      var toolbox = document.getElementById('toolbox');
      var masterWorkspace = Blockly.inject(document.getElementById('content_blocks'),
      {//grid:
          //{spacing: 25,
           //length: 3,
           //colour: '#ccc',
           //snap: true},
           media: '../../media/',
           toolbox: toolbox,
           zoom:
           {controls: true,
            wheel: true}
          });

	//实时更新右侧对比代码
  masterWorkspace.addChangeListener(rightCodeEvent);
  function rightCodeEvent(masterEvent) {
   if (masterEvent.type == Blockly.Events.UI) {
		return;  // Don't update UI events.
 }
	  //更新
	  //var arduinoTextarea = document.getElementById('side_code');
	  var code = Blockly.Arduino.workspaceToCode(Blockly.mainWorkspace) || '';
    var chinese_code = code.replace(/(_[0-9A-F]{2}_[0-9A-F]{2}_[0-9A-F]{2})+/g, function (s) { return decodeURIComponent(s.replace(/_/g, '%')); });
    editor_side_code.setValue(chinese_code, -1);
  }

  auto_save_and_restore_blocks();

  //load from url parameter (single param)
  //http://stackoverflow.com/questions/2090551/parse-query-string-in-javascript
  var dest = unescape(location.search.replace(/^.*\=/, '')).replace(/\+/g, " ");
  if(dest){
    load_by_url(dest);
  }


}