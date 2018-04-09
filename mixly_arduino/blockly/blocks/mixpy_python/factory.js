'use strict';

goog.provide('Blockly.Blocks.factory');
goog.require('Blockly.Blocks');
Blockly.Blocks.factory.HUE = 65;

Blockly.Blocks.factory_include = {
  init: function() {
    this.setColour(Blockly.Blocks.factory.HUE);
	this.appendDummyInput("")
		.appendField("#include <")
		.appendField(new Blockly.FieldTextInput('Test'), 'INCLUDE')
        .appendField(".h>");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.factory_function_noreturn = {
  init: function() {
    //console.log('init');
    this.setColour(Blockly.Blocks.factory.HUE);
	this.appendDummyInput("")
		.appendField(new Blockly.FieldTextInput('my_function'), 'NAME');
	this.itemCount_ = 1;
	this.arguments_ = ['x'];//add
	this.updateShape_();
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setMutator(new Blockly.Mutator(['factory_create_with_item']));
  },
  mutationToDom: function() {
    //console.log('mutationToDom');
	var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
	//add
	for (var i = 0; i < this.arguments_.length; i++) {
      var parameter = document.createElement('arg');
      parameter.setAttribute('name', this.arguments_[i]);
      container.appendChild(parameter);
    }
    return container;
  },
  domToMutation: function(xmlElement) {
    //console.log('domToMutation');
	this.arguments_ = [];//add
	//add
	for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
      if (childNode.nodeName.toLowerCase() == 'arg') {
        this.arguments_.push(childNode.getAttribute('name'));
      }
    }
	this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  decompose: function(workspace) {
    //console.log('decompose');
	var containerBlock =
        Blockly.Block.obtain(workspace, 'factory_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = Blockly.Block.obtain(workspace, 'factory_create_with_item');
      itemBlock.initSvg();
	  itemBlock.setFieldValue(this.arguments_[i], 'NAME');//add
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    //console.log('compose');
	this.arguments_ = [];//add
	var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    var i = 0;
    while (itemBlock) {
	  this.arguments_.push(itemBlock.getFieldValue('NAME'));//add
      connections[i] = itemBlock.valueConnection_;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
      i++;
    }
    this.itemCount_ = i;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      if (connections[i]) {
        this.getInput('ADD' + i).connection.connect(connections[i]);
      }
    }
  },
  saveConnections: function(containerBlock) {
    //console.log('saveConnections');
	var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },
  updateShape_: function() {
    //console.log('updateShape_');
	// Delete everything.
    if (this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else {
      var i = 0;
      while (this.getInput('ADD' + i)) {
        this.removeInput('ADD' + i);
        i++;
      }
    }
    // Rebuild block.
	for (var i = 0; i < this.itemCount_; i++) {
		var input = this.appendValueInput('ADD' + i).setAlign(Blockly.ALIGN_RIGHT).appendField(this.arguments_[i]);
	}
  }
};

Blockly.Blocks['factory_create_with_container'] = {
  init: function() {
    this.setColour(Blockly.Blocks.factory.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_PARAMS);
    this.appendStatementInput('STACK');
    this.contextMenu = false;
  }
};

Blockly.Blocks['factory_create_with_item'] = {
  init: function() {
    this.setColour(Blockly.Blocks.factory.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE+':')
		.appendField(new Blockly.FieldTextInput('x'), 'NAME');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.contextMenu = false;
  }
};

Blockly.Blocks.factory_function_return = {
  init: function() {
    this.setColour(Blockly.Blocks.factory.HUE);
	this.appendDummyInput("")
		.appendField(new Blockly.FieldTextInput('my_function'), 'NAME');
	this.itemCount_ = 1;
	this.arguments_ = ['x'];//add
	this.updateShape_();
    this.setOutput(true);
	this.setMutator(new Blockly.Mutator(['factory_create_with_item']));
  },
  mutationToDom: Blockly.Blocks.factory_function_noreturn.mutationToDom,
  domToMutation: Blockly.Blocks.factory_function_noreturn.domToMutation,
  decompose: Blockly.Blocks.factory_function_noreturn.decompose,
  compose: Blockly.Blocks.factory_function_noreturn.compose,
  saveConnections: Blockly.Blocks.factory_function_noreturn.saveConnections,
  updateShape_: Blockly.Blocks.factory_function_noreturn.updateShape_
};

Blockly.Blocks.factory_declare={
  init: function() {
    this.setColour(Blockly.Blocks.factory.HUE);
	this.appendDummyInput("")
		.appendField(new Blockly.FieldTextInput('Test'), 'TYPE')
		.appendField(" ")
		.appendField(new Blockly.FieldTextInput('test'), 'NAME')
        .appendField(";");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
}
Blockly.Blocks.factory_define = {
    init: function () {
        this.setColour(Blockly.Blocks.factory.HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldTextInput('#define'), 'TYPE')
            .appendField(" ")
            .appendField(new Blockly.FieldTextInput('MYDEFINE 11'), 'NAME')
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}
Blockly.Blocks.factory_static_method_noreturn={
  init: function() {
    this.setColour(Blockly.Blocks.factory.HUE);
	this.appendDummyInput("")
		.appendField(new Blockly.FieldTextInput('Test'), 'TYPE')
		.appendField("::")
		.appendField(new Blockly.FieldTextInput('staticMethod'), 'NAME');
	this.itemCount_ = 1;
	this.arguments_ = ['x'];//add
	this.updateShape_();
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setMutator(new Blockly.Mutator(['factory_create_with_item']));
  },
  mutationToDom: Blockly.Blocks.factory_function_noreturn.mutationToDom,
  domToMutation: Blockly.Blocks.factory_function_noreturn.domToMutation,
  decompose: Blockly.Blocks.factory_function_noreturn.decompose,
  compose: Blockly.Blocks.factory_function_noreturn.compose,
  saveConnections: Blockly.Blocks.factory_function_noreturn.saveConnections,
  updateShape_: Blockly.Blocks.factory_function_noreturn.updateShape_
}

Blockly.Blocks.factory_static_method_return={
  init: function() {
    this.setColour(Blockly.Blocks.factory.HUE);
	this.appendDummyInput("")
		.appendField(new Blockly.FieldTextInput('Test'), 'TYPE')
		.appendField("::")
		.appendField(new Blockly.FieldTextInput('staticMethod'), 'NAME');
	this.itemCount_ = 1;
	this.arguments_ = ['x'];//add
	this.updateShape_();
    this.setOutput(true);
	this.setMutator(new Blockly.Mutator(['factory_create_with_item']));
  },
  mutationToDom: Blockly.Blocks.factory_function_noreturn.mutationToDom,
  domToMutation: Blockly.Blocks.factory_function_noreturn.domToMutation,
  decompose: Blockly.Blocks.factory_function_noreturn.decompose,
  compose: Blockly.Blocks.factory_function_noreturn.compose,
  saveConnections: Blockly.Blocks.factory_function_noreturn.saveConnections,
  updateShape_: Blockly.Blocks.factory_function_noreturn.updateShape_
}

Blockly.Blocks.factory_callMethod_noreturn = {
  init: function() {
    this.setColour(Blockly.Blocks.factory.HUE);
	this.appendDummyInput("")
		.appendField(new Blockly.FieldTextInput('test'), 'NAME')
		.appendField('.')
		.appendField(new Blockly.FieldTextInput('callMetod'), 'METHOD');
	this.itemCount_ = 1;
	this.arguments_ = ['x'];//add
	this.updateShape_();
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setMutator(new Blockly.Mutator(['factory_create_with_item']));
  },
  mutationToDom: Blockly.Blocks.factory_function_noreturn.mutationToDom,
  domToMutation: Blockly.Blocks.factory_function_noreturn.domToMutation,
  decompose: Blockly.Blocks.factory_function_noreturn.decompose,
  compose: Blockly.Blocks.factory_function_noreturn.compose,
  saveConnections: Blockly.Blocks.factory_function_noreturn.saveConnections,
  updateShape_: Blockly.Blocks.factory_function_noreturn.updateShape_
};

Blockly.Blocks.factory_callMethod_return = {
  init: function() {
    this.setColour(Blockly.Blocks.factory.HUE);
	this.appendDummyInput("")
		.appendField(new Blockly.FieldTextInput('test'), 'NAME')
		.appendField('.')
		.appendField(new Blockly.FieldTextInput('callMetod'), 'METHOD');
	this.itemCount_ = 1;
	this.arguments_ = ['x'];//add
	this.updateShape_();
    this.setOutput(true);
	this.setMutator(new Blockly.Mutator(['factory_create_with_item']));
  },
  mutationToDom: Blockly.Blocks.factory_function_noreturn.mutationToDom,
  domToMutation: Blockly.Blocks.factory_function_noreturn.domToMutation,
  decompose: Blockly.Blocks.factory_function_noreturn.decompose,
  compose: Blockly.Blocks.factory_function_noreturn.compose,
  saveConnections: Blockly.Blocks.factory_function_noreturn.saveConnections,
  updateShape_: Blockly.Blocks.factory_function_noreturn.updateShape_
};

Blockly.Blocks.factory_block = {
  init: function() {
    this.setColour(Blockly.Blocks.factory.HUE);
	this.appendDummyInput("")
		.appendField(new Blockly.FieldTextInput('serial.writeLine("hello");'), 'VALUE');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.factory_block_return = {
  init: function() {
    this.setColour(Blockly.Blocks.factory.HUE);
	this.appendDummyInput("")
		.appendField(new Blockly.FieldTextInput('test'), 'VALUE');
    this.setOutput(true);
  }
};