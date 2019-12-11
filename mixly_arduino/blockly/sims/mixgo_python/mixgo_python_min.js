var mbData={'temperature':23,'pressure':1000,'humidity':0,'distance':0,'distance_infrared_left':0,'distance_infrared_right':0,'soundlevel':0,'brightness':0,'boardLED':[0,0,0],'servo':0,'compass':{'heading':0,'strength':0,'x':0,'y':0,'z':0,'calibrated':false},'music':{'ticks':4,'bpm':120,'duration':4,'octave':4},'radio':{'channel':7,'address':'0x75626974','group':0,'data_rate':1000,'queue':3,'length':32,'power':6},'mpu9250':{'x':0,'y':0,'z':0,'gyro_x':0,'gyro_y':0,'gyro_z':0,'currentGesture':'','gestureHistory':[]},'uart':{'baudrate':115200,'bits':8,'parity':null,'stop':1,'tx':null,'rx':null,'buffer':''}};
var codeProcessor={replaceCode:function(code){if(code.indexOf('class HCSR04:')!=-1){code=code.replace(/class HCSR04[\s\S]*?self.distance_mm\(\) \/ 10\.0/,'');}
if(code.indexOf('class Servo:')!=-1){code=code.replace(/class Servo[\s\S]*?self\.write_us\(us\)/,'');}
return code;},getCode:function(trick){var code=mixlyjs.getCodeContent();if(trick==true){if(code.indexOf('class HCSR04:')!=-1){code=code.replace(/class HCSR04[\s\S]*?self.distance_mm\(\) \/ 10\.0/,'');}
if(code.indexOf('class Servo:')!=-1){code=code.replace(/class Servo[\s\S]*?self\.write_us\(us\)/,'');}}
return code;},saveXmlFileAs:function(){var xmlCodes=goog.string.quote(Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace)));xmlCodes=xmlCodes.replace("<xml","<xml version=\\\"mixgo_0.999\\\" board=\\\""+"MicroPython[NRF51822_microbit]"+"\\\"");xmlCodes=xmlCodes.substring(1,xmlCodes.length-1);var blob=new Blob([xmlCodes],{type:'text/plain;charset=utf-8'});saveAs(blob,"Mixgo.xml");},translateQuote:function(str,trimEscaped){var xml="";var hasComleteAngleBracket=true;var lenStr=str.length;for(var i=0;i<lenStr;i++){if(str[i]==="<"){hasComleteAngleBracket=false;}else if(str[i]===">"){hasComleteAngleBracket=true;}
if(trimEscaped===true&&hasComleteAngleBracket===false&&i+1<lenStr&&str[i]==="\\"&&str[i+1]==='"'){i+=1;}
if(trimEscaped===false&&hasComleteAngleBracket===false&&i>0&&str[i-1]!=="\\"&&str[i]==='"'){xml+="\\";}
xml+=str[i];}
return xml;},decodeUnicode:function(s){return unescape(s.replace(/\\u/g,'%u'));},renderXml:function(xmlContent){try{try{var xml=Blockly.Xml.textToDom(codeProcessor.decodeUnicode(xmlContent));Blockly.mainWorkspace.clear();Blockly.Xml.domToWorkspace(Blockly.mainWorkspace,xml);renderContent();}catch(e){alert("invalid xml file!");console.log(e);return;}}catch(e){alert("invalid xml file!");console.log(e);return;}},renderIno:function(xmlContent){tabClick('arduino');editor.setValue(xmlContent,-1);},loadLocalFile:function(){var parseInputXMLfile=function(e){var files=e.target.files;var reader=new FileReader();reader.onload=function(){var text=codeProcessor.translateQuote(reader.result,true);var filesuffix=files[0].name.split(".")[files[0].name.split(".").length-1];if(filesuffix==="xml"||filesuffix==="mix"){codeProcessor.renderXml(text);}else if(filesuffix==="ino"||filesuffix==="py"||filesuffix==="js"){}else{alert("Invalid file type! (.ino|.xml|.mix|.js|.py file supported)");return;}};reader.readAsText(files[0]);};var selectFile=document.getElementById('select_file');if(selectFile!=null){$("#select_file").remove();$("#select_file_wrapper").remove();selectFile=document.getElementById('select_file');}
if(selectFile==null){var selectFileDom=document.createElement('INPUT');selectFileDom.type='file';selectFileDom.id='select_file';var selectFileWrapperDom=document.createElement('DIV');selectFileWrapperDom.id='select_file_wrapper';selectFileWrapperDom.style.display='none';selectFileWrapperDom.appendChild(selectFileDom);document.body.appendChild(selectFileWrapperDom);selectFile=document.getElementById('select_file');$("#select_file").change(parseInputXMLfile);}
selectFile.click();},infiniteLoop:function(){return true;}}
var smCodeProcessor={processImport:function(code){var microbitModuleArr=['mixgo','matrix','music','radio','neopixel','machine','time','servo','random'];var codeArr=code.replace(/\r\n/g,'\n').split('\n');var usedModuleSet=new Set();for(let i=0;i<codeArr.length;i++){var line=codeArr[i].replace('\r','');var line=line.replace(/^( *?)from( +?)(\w*?) import (.*?)$/g,function(){var module=arguments[3];if(microbitModuleArr.indexOf(module)!=-1){usedModuleSet.add(module);}});line=line.replace(/^( *?)import (.*?)$/g,function(){var module=arguments[2];if(microbitModuleArr.indexOf(module)!=-1){usedModuleSet.add(module);}});}
for(var x of usedModuleSet){code=code.replace(new RegExp(x,'g'),'sm_'+x);}
code=code.replace(new RegExp('input','g'),'sm_machine.sm_input');code=code.replace(new RegExp('print','g'),'sm_machine.sm_print');return code;},parseInputer:function(inputer){eval(inputer);sm.inputer.sort((a,b)=>{return a.ts-b.ts;})},autoKillProgram:function(timeout){var timeoutId=setTimeout(function(){if(sm.running){sm.updateSnapshot();Sk.execLimit=0;sm.running=false;clearTimeout(timeoutId);}},timeout);},forceKillProgram:function(){if(sm.running===true){Sk.execLimit=0;sm.running=false;}},};
conf.url=conf.url||"static";var base_url=conf.url+'/blockly/sims/mixgo_python/';Sk.externalLibraries={mixgo:{path:base_url+'mixgo/__init__.js',dependencies:[base_url+'mixgo/accelerometer.js',base_url+'mixgo/compass.js',base_url+'mixgo/uart.js',base_url+'mixgo/infrared_left.js',base_url+'mixgo/infrared_right.js']},time:{path:conf.url+'/blockly/sims/mixgo_python/time/__init__.js'},random:{path:conf.url+'/blockly/sims/mixgo_python/random/__init__.js'},machine:{path:conf.url+'/blockly/sims/mixgo_python/machine/__init__.js',dependencies:[conf.url+'/blockly/sims/mixgo_python/machine/UART.js'],},mpu9250:{path:conf.url+'/blockly/sims/mixgo_python/mpu9250/__init__.js'},bmp280:{path:conf.url+'/blockly/sims/mixgo_python/bmp280/__init__.js'},dhtx:{path:conf.url+'/blockly/sims/mixgo_python/dhtx/__init__.js'},sonar:{path:conf.url+'/blockly/sims/mixgo_python/sonar/__init__.js'},servo:{path:conf.url+'/blockly/sims/mixgo_python/servo/__init__.js'},matrix:{path:conf.url+'/blockly/sims/mixgo_python/matrix/__init__.js'},music:{path:conf.url+'/blockly/sims/mixgo_python/music/__init__.js'},radio:{path:conf.url+'/blockly/sims/mixgo_python/radio/__init__.js'},speech:{path:conf.url+'/blockly/sims/mixgo_python/speech/__init__.js',dependencies:[conf.url+'/blockly/sims/mixgo_python/speech/sam.js']},neopixel:{path:conf.url+'/blockly/sims/mixgo_python/neopixel/__init__.js'},sm_mixgo:{path:conf.url+'/blockly/sims/mixgo_python/sm/mixgo/__init__.js',dependencies:[conf.url+'/blockly/sims/mixgo_python/sm/mixgo/accelerometer.js',conf.url+'/blockly/sims/mixgo_python/sm/mixgo/compass.js',conf.url+'/blockly/sims/mixgo_python/sm/mixgo/infrared_left.js',conf.url+'/blockly/sims/mixgo_python/sm/mixgo/infrared_right.js',]},sm_time:{path:conf.url+'/blockly/sims/mixgo_python/sm/time/__init__.js'},sm_machine:{path:conf.url+'/blockly/sims/mixgo_python/sm/machine/__init__.js'},mpu9250:{path:conf.url+'/blockly/sims/mixgo_python/mpu9250/__init__.js'},bmp280:{path:conf.url+'/blockly/sims/mixgo_python/bmp280/__init__.js'},dhtx:{path:conf.url+'/blockly/sims/mixgo_python/dhtx/__init__.js'},sm_sonar:{path:conf.url+'/blockly/sims/mixgo_python/sm/sonar/__init__.js'},sm_servo:{path:conf.url+'/blockly/sims/mixgo_python/sm/servo/__init__.js'},sm_matrix:{path:conf.url+'/blockly/sims/mixgo_python/sm/matrix/__init__.js'},sm_music:{path:conf.url+'/blockly/sims/mixgo_python/sm/music/__init__.js'},sm_radio:{path:conf.url+'/blockly/sims/mixgo_python/sm/radio/__init__.js'},sm_neopixel:{path:conf.url+'/blockly/sims/mixgo_python/sm/neopixel/__init__.js'},sm_random:{path:conf.url+'/blockly/sims/mixgo_python/sm/random/__init__.js'},};var sim={runAsync:function(asyncFunc){var p=new Promise(asyncFunc);var result;var susp=new Sk.misceval.Suspension();susp.resume=function(){return result;}
susp.data={type:"Sk.promise",promise:p.then(function(value){result=value;return value;},function(err){result="";console.log(err);return new Promise(function(resolve,reject){});})};return susp;}}
function builtinRead(x){if(Sk.builtinFiles===undefined||Sk.builtinFiles["files"][x]===undefined)
throw"File not found: '"+x+"'";return Sk.builtinFiles["files"][x];}
function sk_run(code,outputFunc,inputFunc,postFunc,showTip){if(code==''){if(sm.running){sm.running=false;}
return;}
if(Sk.execLimit===0)
Sk.execLimit=Number.POSITIVE_INFINITY;Sk.configure({inputfun:inputFunc,inputfunTakesPrompt:true,output:outputFunc,read:builtinRead,execLimit:Number.POSITIVE_INFINITY,debugging:true});var handlers=[];if(codeProcessor.infiniteLoop(code)){var startTime=new Date().getTime();var lineCount=0;var currTime=0;handlers["Sk.debug"]=function(susp){lineCount++;currTime=new Date().getTime();if(currTime-startTime>100){if(lineCount<50){return;}
if(sm.running){if(sm.inputer[sm.nextInputEventIndex]){if(sm.inputer[sm.nextInputEventIndex].ts>sm.time)
sm.updateTimeTo(sm.inputer[sm.nextInputEventIndex].ts);else{sm.nextInputEventIndex++;}}
else{sm.updateTimeTo(sm['taskConf'].timeout)}}
startTime=new Date().getTime();var p=new Promise(function(resolve,reject){setTimeout(function(){lineCount=0;try{return resolve(susp.resume());}catch(e){handleError(e);}},50);});return p;}};}
function handleError(err){var errString=err.toString();if(errString.indexOf('TimeLimitError')!=-1){if(postFunc!=undefined){postFunc();}
return;}
console.log(err);if(showTip!=undefined){showTip(errString);}}
Sk.misceval.callsimAsync(handlers,function(){return Sk.importMainWithBody("<stdin>",false,code,true);}).then(function(module){sm.running=false;if(postFunc!=undefined){postFunc();}},handleError);}
function mb_run(){$('#simModal').modal('toggle');ui.init();var code=codeProcessor.getCode(true);sk_run(code,ui.updateSerialOutput,ui.serialInput);}
async function sm_run(){$('#markModal').modal('toggle');$('#mark_doing').show();$('#mark_done').hide();$('#mark_review').hide();$('#mark_review_done').hide();$('#mark_fb').text('');$('#mark_score').text('');$('#mark_note').hide();var code=codeProcessor.getCode(true);if(code==''){$('#mark_doing').hide();$('#mark_done').show();$('#markProgress').css('width','100%');$('#mark_fb').text('代码不能为空');return;}
sm['markDone']=false;code=smCodeProcessor.processImport(code);var taskId=Code.getStringParamFromUrl('eid','');if(taskId==''){console.log('eid is empty');return;}
sm['taskConf']=task_conf;ui.updateProgressBar(task_conf.timeout,90);function asyncGenAns(ansPath,ansCode){return new Promise(resolve=>{smCodeProcessor.parseInputer(task_conf.inputer);sm.init();sk_run(ansCode,sm.uart.write,sm.uart.input,function(){submit_gen_ans(ansPath,resolve);},ui.showMarkFb);});}
if(task_ans!=null){for(var ansPath in task_ans){var ansCode=task_ans[ansPath];ansCode=codeProcessor.replaceCode(ansCode);ansCode=smCodeProcessor.processImport(ansCode);await asyncGenAns(ansPath,ansCode);}}
task_ans=null;smCodeProcessor.parseInputer(task_conf.inputer);smCodeProcessor.autoKillProgram(task_conf.timeout);sm.init();sk_run(code,sm.uart.write,sm.uart.input,function(){submit('judge');},ui.showMarkFb);}
function generateResearchData(){var code=codeProcessor.getCode(true);code=smCodeProcessor.processImport(code);var taskId=Code.getStringParamFromUrl('eid','');if(taskId==''){console.log('eid is empty');return;}
sm['taskConf']=task_conf;smCodeProcessor.parseInputer(task_conf.inputer);smCodeProcessor.autoKillProgram(task_conf.timeout);sm.init();sk_run(code,sm.uart.write,sm.uart.input,function(){submit('save_research_data');});};
var fontbin=''+
`
0508 0000 0000 003e 5b4f 5b3e 3e6b 4f6b
3e1c 3e7c 3e1c 183c 7e3c 181c 577d 571c
1c5e 7f5e 1c00 183c 1800 ffe7 c3e7 ff00
1824 1800 ffe7 dbe7 ff30 483a 060e 2629
7929 2640 7f05 0507 407f 0525 3f5a 3ce7
3c5a 7f3e 1c1c 0808 1c1c 3e7f 1422 7f22
145f 5f00 5f5f 0609 7f01 7f00 6689 956a
6060 6060 6094 a2ff a294 0804 7e04 0810
207e 2010 0808 2a1c 0808 1c2a 0808 1e10
1010 100c 1e0c 1e0c 3038 3e38 3006 0e3e
0e06 0000 0000 0000 005f 0000 0007 0007
0014 7f14 7f14 242a 7f2a 1223 1308 6462
3649 5620 5000 0807 0300 001c 2241 0000
4122 1c00 2a1c 7f1c 2a08 083e 0808 0080
7030 0008 0808 0808 0000 6060 0020 1008
0402 3e51 4945 3e00 427f 4000 7249 4949
4621 4149 4d33 1814 127f 1027 4545 4539
3c4a 4949 3141 2111 0907 3649 4949 3646
4949 291e 0000 1400 0000 4034 0000 0008
1422 4114 1414 1414 0041 2214 0802 0159
0906 3e41 5d59 4e7c 1211 127c 7f49 4949
363e 4141 4122 7f41 4141 3e7f 4949 4941
7f09 0909 013e 4141 5173 7f08 0808 7f00
417f 4100 2040 413f 017f 0814 2241 7f40
4040 407f 021c 027f 7f04 0810 7f3e 4141
413e 7f09 0909 063e 4151 215e 7f09 1929
4626 4949 4932 0301 7f01 033f 4040 403f
1f20 4020 1f3f 4038 403f 6314 0814 6303
0478 0403 6159 494d 4300 7f41 4141 0204
0810 2000 4141 417f 0402 0102 0440 4040
4040 0003 0708 0020 5454 7840 7f28 4444
3838 4444 4428 3844 4428 7f38 5454 5418
0008 7e09 0218 a4a4 9c78 7f08 0404 7800
447d 4000 2040 403d 007f 1028 4400 0041
7f40 007c 0478 0478 7c08 0404 7838 4444
4438 fc18 2424 1818 2424 18fc 7c08 0404
0848 5454 5424 0404 3f44 243c 4040 207c
1c20 4020 1c3c 4030 403c 4428 1028 444c
9090 907c 4464 544c 4400 0836 4100 0000
7700 0000 4136 0800 0201 0204 023c 2623
263c 1ea1 a161 123a 4040 207a 3854 5455
5921 5555 7941 2254 5478 4221 5554 7840
2054 5579 400c 1e52 7212 3955 5555 5939
5454 5459 3955 5454 5800 0045 7c41 0002
457d 4200 0145 7c40 7d12 1112 7df0 2825
28f0 7c54 5545 0020 5454 7c54 7c0a 097f
4932 4949 4932 3a44 4444 3a32 4a48 4830
3a41 4121 7a3a 4240 2078 009d a0a0 7d3d
4242 423d 3d40 4040 3d3c 24ff 2424 487e
4943 662b 2ffc 2f2b ff09 29f6 20c0 887e
0903 2054 5479 4100 0044 7d41 3048 484a
3238 4040 227a 007a 0a0a 727d 0d19 317d
2629 292f 2826 2929 2926 3048 4d40 2038
0808 0808 0808 0808 382f 10c8 acba 2f10
2834 fa00 007b 0000 0814 2a14 2222 142a
1408 5500 5500 55aa 55aa 55aa ff55 ff55
ff00 0000 ff00 1010 10ff 0014 1414 ff00
1010 ff00 ff10 10f0 10f0 1414 14fc 0014
14f7 00ff 0000 ff00 ff14 14f4 04fc 1414
1710 1f10 101f 101f 1414 141f 0010 1010
f000 0000 001f 1010 1010 1f10 1010 10f0
1000 0000 ff10 1010 1010 1010 1010 ff10
0000 00ff 1400 00ff 00ff 0000 1f10 1700
00fc 04f4 1414 1710 1714 14f4 04f4 0000
ff00 f714 1414 1414 1414 f700 f714 1414
1714 1010 1f10 1f14 1414 f414 1010 f010
f000 001f 101f 0000 001f 1400 0000 fc14
0000 f010 f010 10ff 10ff 1414 14ff 1410
1010 1f00 0000 00f0 10ff ffff ffff f0f0
f0f0 f0ff ffff 0000 0000 00ff ff0f 0f0f
0f0f 3844 4438 44fc 4a4a 4a34 7e02 0206
0602 7e02 7e02 6355 4941 6338 4444 3c04
407e 201e 2006 027e 0202 99a5 e7a5 991c
2a49 2a1c 4c72 0172 4c30 4a4d 4d30 3048
7848 30bc 625a 463d 3e49 4949 007e 0101
017e 2a2a 2a2a 2a44 445f 4444 4051 4a44
4040 444a 5140 0000 ff01 03e0 80ff 0000
0808 6b6b 0836 1236 2436 060f 090f 0600
0018 1800 0000 1010 0030 40ff 0101 001f
0101 1e00 191d 1712 003c 3c3c 3c00 0000
0000`;
;var fontbinArr=fontbin.split(/[\s]/);var ui={inited:false,pinCount:{rowid:0},init:function(){if(!ui.inited){$('#simModal').on('hidden.bs.modal',function(){Sk.execLimit=0;});}
$("#monitor_select").val("button");$("#monitor_select").trigger('change');var val=$('#monitor_select').children('option:selected').val();$('#monitor_'+val+'_div').show();if(!ui.inited){$('#monitor_select').change(function(){var options=$(this).children('option');for(var i=0;i<options.length;i++){var id='#monitor_'+options[i].value+'_div';$(id).hide();}
var val=$(this).children('option:selected').val();var id='#monitor_'+val+'_div';$(id).show();});}
var ts=$("#temperature_slider").slider();ts.slider('setValue',mbData.temperature);$("#curr_temperature").text(mbData.temperature);if(!ui.inited){$("#temperature_slider").on("slide",function(slideEvt){$("#curr_temperature").text(slideEvt.value);});}
var compass_el_arr=['compass_heading','compass_x','compass_y','compass_z'];for(var i=0;i<compass_el_arr.length;i++){var key=compass_el_arr[i].split('_')[1];var sdr=$("#"+compass_el_arr[i]+"_slider").slider();sdr.slider('setValue',mbData.compass[key]);$("#curr_"+compass_el_arr[i]).text(mbData.compass[key]);if(!ui.inited){$("#"+compass_el_arr[i]+"_slider").on("slide",function(slideEvt){var sliderId=slideEvt.currentTarget.getAttribute('id').replace('_slider','');$("#curr_"+sliderId).text(slideEvt.value);});}}
var ts=$("#HCSR04_slider").slider();ts.slider('setValue',mbData.distance);$("#curr_HCSR04").text(mbData.distance);if(!ui.inited){$("#HCSR04_slider").on("slide",function(slideEvt){$("#curr_HCSR04").text(slideEvt.value);});}
for(var each in mbData.radio){$('#radio_'+each).val(mbData.radio[each])}
if(!ui.inited){$('#radio_update_config').off('click').on('click',function(){ui.updateRadioStatus('Radio module not detected - did you include "import radio"?');});}
$('#neopixel').hide();ui.servoChart=echarts.init(document.getElementById('servo'));ui.servoOption={tooltip:{formatter:"{b} : {c}%"},toolbox:{feature:{}},series:[{name:'舵机',type:'gauge',detail:{formatter:function(value){if(value<0){return'min:0';}else if(value>180){return'max:180';}else{return value;}},fontSize:'10px',},data:[{value:mbData.servo,name:'舵机'}],min:0,max:180,splitNumber:4}]};ui.servoChart.setOption(ui.servoOption,true);$('#servo').hide();var mpu9250_el_arr=['accelerometer_x','accelerometer_y','accelerometer_z','mpu9250_gyro_x','mpu9250_gyro_y','mpu9250_gyro_z'];for(var i=0;i<mpu9250_el_arr.length;i++){var key=mpu9250_el_arr[i].split('_')[1];var sdr=$("#"+mpu9250_el_arr[i]+"_slider").slider();sdr.slider('setValue',mbData.mpu9250[key]);$("#curr_"+mpu9250_el_arr[i]).text(mbData.mpu9250[key]);if(!ui.inited){$("#"+mpu9250_el_arr[i]+"_slider").on("slide",function(slideEvt){var sliderId=slideEvt.currentTarget.getAttribute('id').replace('_slider','');$("#curr_"+sliderId).text(slideEvt.value);});}}
$('#tip').text('');$('#tip').hide();$('#uart_data').val('');$('#print_area').text('');$('#print_area').hide();ui.clearScreen();if(ui.music_data!=undefined&&ui.music_data.osc!=undefined){ui.music_data.osc.stop();delete ui.music_data;}
ui.inited=true;},pinList:{digitalIn:[0,2,4,5,12,13,14,15,16,17,18,19,20,21,22,23,25,26,27,32,33,34,35,36,39],digitalOut:[0,2,4,5,12,13,14,15,16,17,18,19,20,21,22,23,25,26,27,32,33,34,35,36,39],ADC:[32,33,34,35,36,39],PWM:[0,2,4,5,12,13,14,15,16,17,18,19,20,21,22,23,25,26,27,32],touchpad:[0,2,4,12,13,14,15,27,32,33],AllpinList:[0,2,4,5,12,13,14,15,16,17,18,19,20,21,22,23,25,26,27,32,33,34,35,36,39],},pinDigitalModule:function(pinNum){var module='<div class="row form-line" id="pin'+pinNum+'" pintype="digital" style="padding-top:7px;">'+
'<label class="col-sm-2 control-label"></label>'+
'<div class="col-sm-2">'+
'<span>数字管脚#'+pinNum+'</span>'+
'</div>'+
'<div class="col-sm-3 pinInput form-inline">'+
'<input id="pinValue'+pinNum+'" class="form-control" type="text" data-provide="slider" data-slider-min="0" data-slider-max="1" data-slider-step="1" data-slider-value="0"/>'+
'<label class="control-label"></label>'+
'</div>'+
'<div class="col-sm-1 col-sm-offest-2 form-inline">'+
'<span id="curr_pinValue'+pinNum+'">0</span>'+
'</div>'+
'<div class="col-sm-2 col-sm-offest-2 form-inline">'+
'<button id="btn_delPin'+pinNum+'" class="btn_deleterow btn-default form-control">删除</button>'+
'</div>'+
'</div>';return module;},pinAnalogModule:function(pinNum){var module='<div class="row form-line" id="pin'+pinNum+'" pintype="analog" style="padding-top:7px;">'+
'<label class="col-sm-2 control-label"></label>'+
'<div class="col-sm-2">'+
'<span>模拟管脚#'+pinNum+'</span>'+
'</div>'+
'<div class="col-sm-3 pinInput form-inline">'+
'<input id="pinValue'+pinNum+'" class="form-control" type="text" data-provide="slider" data-slider-min="0" data-slider-max="1024" data-slider-step="1"/>'+
'<label class="control-label"></label>'+
'</div>'+
'<div class="col-sm-1 col-sm-offest-1 form-inline">'+
'<span id="curr_pinValue'+pinNum+'">0</span>'+
'</div>'+
'<div class="col-sm-2 form-inline">'+
'<span>频率：'+2000+'</span>'+
'</div>'+
'<div class="col-sm-2 col-sm-offest-2 form-inline">'+
'<button id="btn_delPin'+pinNum+'" class="btn_deleterow btn-default form-control">删除</button>'+
'</div>'+
'</div>';return module;},pinTouchModule:function(pinNum){var module='<div class="row form-line" id="pin'+pinNum+'" pintype="touch" style="padding-top:7px;">'+
'<label class="col-sm-2 control-label"></label>'+
'<div class="col-sm-2">'+
'<span>触摸管脚#'+pinNum+'</span>'+
'</div>'+
'<div class="col-sm-3 pinInput switch">'+
'<input id="pinValue'+pinNum+'" data-on-color="danger" type="checkbox"/>'+
'<label class="control-label"></label>'+
'</div>'+
'<div class="col-sm-1 col-sm-offest-2 form-inline">'+
'<span id="curr_pinValue'+pinNum+'">0</span>'+
'</div>'+
'<div class="col-sm-2 form-inline">'+
'<button id="btn_delPin'+pinNum+'" class="btn_deleterow btn-default form-control">删除</button>'+
'</div>'+
'</div>';return module;},removePinfromList:function(pinNum){var halfSearch=function(Arr,targetNum){var left=0;var right=Arr.length-1;var mid;while(left<=right){mid=parseInt((left+right)/2);if(Arr[mid]<targetNum){left=mid+1;}
else if(Arr[mid]>targetNum){right=mid-1;}
else{return mid;}}
return-1;};var targetPinIndex=halfSearch(ui.pinList.AllpinList,pinNum);if(targetPinIndex!=-1){ui.pinList.AllpinList.splice(targetPinIndex,1);return true;}
else{return false;}},addPinOption:function(type,pinNum=0){if(!ui.removePinfromList(pinNum)){return;}
if(type=='digitalIn'){$('#pin_area').append(ui.pinDigitalModule(pinNum));var changeValue=function(thisSlider,thisSpan){thisSpan.text(thisSlider.bootstrapSlider('getValue'));}
var Slider=$("#pinValue"+pinNum).bootstrapSlider();var Span=$("#curr_pinValue"+pinNum);Slider.bootstrapSlider().on('change',function(){changeValue(Slider,Span);});$('.pinInput>.slider').css('width','100%');}
else if(type=='digitalOut'){$('#pin_area').append(ui.pinDigitalModule(pinNum));var changeValue=function(thisSlider,thisSpan){thisSpan.text(thisSlider.bootstrapSlider('getValue'));}
var Slider=$("#pinValue"+pinNum).bootstrapSlider();var Span=$("#curr_pinValue"+pinNum);Slider.bootstrapSlider().on('change',function(){changeValue(Slider,Span);});$('.pinInput>.slider').css('width','100%');}
else if(type=='ADC'){$('#pin_area').append(ui.pinAnalogModule(pinNum));var changeValue=function(thisSlider,thisSpan){thisSpan.text(thisSlider.bootstrapSlider('getValue'));}
var Slider=$("#pinValue"+pinNum).bootstrapSlider();$("#pinValue"+pinNum).bootstrapSlider('setValue',0);var Span=$("#curr_pinValue"+pinNum);Slider.bootstrapSlider().on('change',function(){changeValue(Slider,Span);});$('.pinInput>.slider').css('width','100%');}
else if(type=='PWM'){$('#pin_area').append(ui.pinAnalogModule(pinNum));var changeValue=function(thisSlider,thisSpan){thisSpan.text(thisSlider.bootstrapSlider('getValue'));}
var Slider=$("#pinValue"+pinNum).bootstrapSlider();var Span=$("#curr_pinValue"+pinNum);Slider.bootstrapSlider().on('change',function(){changeValue(Slider,Span);});$('.pinInput>.slider').css('width','100%');}
else if(type=='TouchPad'){$('#pin_area').append(ui.pinTouchModule(pinNum));var Switch=$("#pinValue"+pinNum).bootstrapSwitch({onText:'触摸',offText:'离开',size:'Small',onSwitchChange:function(event,state){if(state==true){$("#curr_pinValue"+pinNum).text('1');}else{$("#curr_pinValue"+pinNum).text('0');}}});}},deletePinOption:function(rowid){$(rowid).remove();},getPinValue:function(pinNum){return parseInt($('#pinValue'+pinNum).val())||parseInt($('#curr_pinValue'+pinNum).text());},setPinValue:function(pinNum,value){$('#pinValue'+pinNum).bootstrapSlider('setValue',value);$('#curr_pinValue'+pinNum).text(value);},setAnalogPinFreq:function(pinNum,freq){$('#pinPeriod'+pinNum).text(freq);},bindDeletePinBtnEvent:function(pinNum){$('#btn_delPin'+pinNum).off('click').on('click',function(){var rowid='#pin'+pinNum;ui.deletePinOption(rowid);ui.pinList.AllpinList.push(pinNum);ui.pinList.AllpinList.sort(function(a,b){return a-b});});},bindBtnEvent:function(btn_id,mod_btn_arr){$('#'+btn_id).off("mousedown mouseup click").on("mousedown mouseup click",function(e){for(var i=0;i<mod_btn_arr.length;i++){switch(e.type){case'mousedown':mod_btn_arr[i].pressed=true;break;case'mouseup':mod_btn_arr[i].pressed=false;break;case'click':mod_btn_arr[i].presses++;console.log('click');break;}}});},bindSliderEvent:function(sliderId,data,key,cb){var id="#"+sliderId+"_slider";$(id).off('slide').on('slide',function(slideEvt){data[key]=slideEvt.value;$("#curr_"+sliderId).text(slideEvt.value);if(cb!=undefined){cb();}})},bindRadioSendMessageEvent:function(elementId,data){if(!data.peer){return;}
var id='#send_'+elementId+'_message';$(id).off('click').on('click',function(){if(data['buffer'].length<data['queue']){data['buffer'].push("\x00\x01\x00"+$('#'+btnId+'_data').val());$('#'+elementId+'_data').val('');}});},bindRadioUpdateConfigEvent:function(elementId,data){$('#'+elementId).off('click').on('click',function(){ui.updatePeerRadioParam(data);});},bindUartSendMessageEvent:function(elementId,data){var id='#send_'+elementId+'_message';$(id).off('click').on('click',function(){if(!data.peer){return;}
var message=$('#'+elementId+'_data').val().replace(/\\n/g,'\n').replace(/\\r/g,'\r');if((data['buffer'].length+message.length)<=128){data['buffer']=data['buffer']+message;}else{data['buffer']=data['buffer']+message.slice(0,128-data['buffer'].length);}
$('#'+elementId+'_data').val('');});},bindCompassEvent:function(sliderId,data,key){ui.bindSliderEvent(sliderId,data,key);},bindGyroEvent:function(sliderId,data,key){ui.bindSliderEvent(sliderId,data,key);},bindTemperatureEvent:function(sliderId,data,key){ui.bindSliderEvent(sliderId,data,key);},bindHCSR04Event:function(sliderId,data,key){ui.bindSliderEvent(sliderId,data,key);},bindAccelerometerEvent:function(sliderId,data,key,cb){ui.bindSliderEvent(sliderId,data,key,cb);},bindInfraredEvent:function(sliderId,data,key){ui.bindSliderEvent(sliderId,data,key);},bindAccelerometerGestureEvent:function(btnId,data,gesture){$('#'+btnId).off('click').on('click',function(){if(data.currentGesture!=gesture){data.currentGesture=gesture;data.gestureHistory.push(gesture);ui.updateAccelerometerBtn(gesture);}})},setMatrixLED:function(x,y,brightness){$('.mb_led.mb_led_row_'+y+'.mb_led_col_'+x).removeClass('mb_led_brightness_ mb_led_brightness_0 mb_led_brightness_1 mb_led_brightness_2 mb_led_brightness_3 mb_led_brightness_4 mb_led_brightness_5 mb_led_brightness_6 mb_led_brightness_7 mb_led_brightness_8 mb_led_brightness_9 mb_led_brightness_10 mb_led_brightness_11 mb_led_brightness_12 mb_led_brightness_13 mb_led_brightness_14 mb_led_brightness_15').addClass('mb_led_brightness_'+brightness);},setBoardLEDonoff:function(pinNum,brightness){if(brightness===0)
$('#mixgo_led_'+pinNum).css('background-color','#000');else
$('#mixgo_led_'+pinNum).css('background-color','#00f');},setBoardLEDbrightness:function(pinNum,val){if(typeof(val)=='number'&&val>0&&val<1024){var decval=(val/8)+127;$('#mixgo_led_'+pinNum).css('background-color','#0000'+decval.toString(16));}
else{$('#mixgo_led_'+pinNum).css('background-color','#000');}},output:function(s){console.log(s);},updateMicrobitPins:function(type,pinName,newValue){var flag=false;$('select.pinOption').each(function(){if($(this).val()==pinName){flag=true;var rowid=$(this).attr('id').split('select_row').join('');if(type==='analog_period'){$('#curr_pinPeriod'+rowid).text(newValue);}
else{$('#curr_pinValue'+rowid).text(newValue);if(type==='digital'||'analog'){$("#pinValue"+rowid).bootstrapSlider('setValue',newValue);}
else if(type==='touch'){$("#pinValue"+rowid).bootstrapSwitch('setState',newValue==1);}}}});if(!flag){ui.addPinOption(type.split('_')[0]);var newRowId=ui.pinCount.rowid;ui.bindDeletePinBtnEvent('#btn_row'+newRowId);$('#select_row'+(newRowId)).val(pinName);if(type==='analog_period'){$('#curr_pinPeriod'+(newRowId)).text(newValue);}
else{if(type!='touch'){$('#curr_pinValue'+(newRowId)).text(newValue);$("#pinValue"+(newRowId)).bootstrapSlider('setValue',newValue);}
else{$('#curr_pinValue'+(newRowId)).text(newValue==1?1:0);$("#pinValue"+(newRowId)).bootstrapSwitch('setState',newValue==1);}}}},updateUIAnalogPeriod:function(name,value){ui.updateMicrobitPins('analog_period',name,value)},updateNeopixel:function(leds){var el=$('#neopixel');el.empty();for(var i=0;i<leds.length;i++){var aumentLed=leds[i].map((currentValue,index,arr)=>{return currentValue>0?255:0});var currLed=aumentLed;var color=currLed.join(',');el.append('<img class="neopixel-led" style="background-color: rgb('+color+');">');}
el.css('width',35*leds.length+'px');$('#neopixel').show();},updateServo:function(degree){ui.servoOption.series[0].data[0].value=degree;ui.servoChart.setOption(ui.servoOption,true);$('#servo').show();},updateAccelerometerBtn:function(gesture){$('.accelerometer-btn').each(function(){$(this).css('background-color','#fff');})
if(gesture!=''){$('#'+gesture.replace(' ','')).css('background-color','#5cb85c');}},updateRadioStatus:function(text){$('#radio_status').html(text);},updateRadioReceivedMessage:function(text){var el=$('#radio_output');if(el.css('display')=='none'){el.show();}
if(!text.endsWith('\n')){text+='\n';}
el.text(el.text()+text);},updatePeerRadioParam:function(data){var feedback='';if($('#radio_channel').val()!=data.channel){feedback="Channel doesn't match: currently set to "+data.channel;data.peer=false;}else if($('#radio_group').val()!=data.group){feedback="Group doesn't match: currently set to "+data.group;data.peer=false;}else if($('#radio_address').val()!=data.address){feedback="Address doesn't match: currently set to "+data.address.toString(16);data.peer=false;}else if($('#radio_data_rate').val()!=data.data_rate){feedback="Data rate doesn't match: currently set to "+data.data_rate;data.peer=false;}else{data.peer=true;feedback="Tuned in to radio module";}
ui.updateRadioStatus(feedback);},showTip:function(text){var el=$('#tip');el.text(text);el.show();},clearScreen:function(){var x,y;for(x=0;x<16;x++){for(y=0;y<8;y++){ui.setMatrixLED(x,y,0);}}},updateSerialOutput:function(line){var el=$('#print_area');if(el.css('display')=='none'){el.show();}
el.append(line);},serialInput:function(prompt){return new Promise((resolve,reject)=>{$('#print_area').append('<input style= "background-color:transparent;border:0;outline:none;" id="userInput" />');var focusTime=50;if($('#simModal').is(':visible')===false){focusTime=600;}
setTimeout(function(){$('#userInput').focus();},focusTime);$('#userInput').keypress(function(event){if(event.keyCode===13){var inputText=$(this).val();$('#userInput').remove();$('#print_area').append(inputText+'\n');resolve(inputText);}});});},updateSerialStatus:function(message){$('#uart_status').html(message);},updatePeerSerialParam:function(data){var message='';if($('#uart_baudrate').val()!=data.baudrate){var message="Baudrate doesn't match: currently set to "+data.baudrate;data.peer=false;}else{data.peer=true;}
ui.updateSerialStatus(message);},bindUartBaudrateEvent:function(id,data){$('#'+id).off('change').on('change',function(){ui.updatePeerSerialParam(data);})},getInfrared:function(id){return $('#curr_'+id).val();},updateProgressBar:function(timeout,value){var el=$('#markProgress');var currValue=0;el.css('width',currValue+'%');var progressBarItl=setInterval(function(){if(currValue<90&&!sm.markDone){currValue+=2;if(currValue>100){currValue=100;}
el.css('width',currValue+'%');}else{clearInterval(progressBarItl);}},5);},};
