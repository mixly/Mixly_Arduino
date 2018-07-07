Blockly.Blocks.dict_get_literal={
	init:function(){
		this.setColour(Blockly.Blocks.dicts.HUE);
		this.appendValueInput("DICT")
			.appendField(this.newQuote_(!0))
			.appendField(new Blockly.FieldTextInput(Blockly.Msg.DICTS_CREATE_WITH_ITEM_KEY),"ITEM")
			.appendField(this.newQuote_(!1))
			.setCheck("dict")
			.appendField(Blockly.Msg.DICT_GET_TO);
		this.setInputsInline(!1);
		this.setOutput(!0)},
		newQuote_:function(a){
			return new Blockly.FieldImage(a==this.RTL?"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAYAAACALL/6AAAA0UlEQVQY023QP0oDURSF8e8MImhlUIiCjWKhrUUK3YCIVkq6bMAF2LkCa8ENWLoNS1sLEQKprMQ/GBDks3kDM+Oc8nfPfTxuANQTYBeYAvdJLL4FnAFfwF2ST9Rz27kp5YH/kwrYp50LdaXHAU4rYNYzWAdeenx7AbgF5sAhcARsAkkyVQ+ACbAKjIGqta4+l78udXxc/LiJG+qvet0pV+q7+tHE+iJzdbGz8FhmOzVcqj/qq7rcKI7Ut1Leq70C1oCrJMMk343HB8ADMEzyVOMff72l48gwfqkAAAAASUVORK5CYII=":
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAYAAACALL/6AAAAvklEQVQY022PoapCQRRF97lBVDRYhBcEQcP1BwS/QLAqr7xitZn0HzRr8Rts+htmQdCqSbQIwmMZPMIw3lVmZu0zG44UAFSBLdBVBDAFZqFo8eYKtANfBC7AE5h8ZNOHd1FrDnh4VgmDO3ADkujDHPgHfkLZ84bfaLjg/hD6RFLq9z6wBDr+rvuZB1bAEDABY76pA2mGHyWSjvqmIemc4WsCLKOp4nssIj8wD8qS/iSVJK3N7OTeJPV9n72ZbV7iDuSc2BaQBQAAAABJRU5ErkJggg==",12,12,'"')
		}
	};

Blockly.Blocks.dict_keys={
	init:function(){
		this.setColour(Blockly.Blocks.dicts.HUE);
		this.appendValueInput("DICT")
			.setCheck("dict")
			.appendField(Blockly.Msg.DICT_KEYS);
		this.setInputsInline(!1);
		this.setOutput(!0,"Array")}
	};
