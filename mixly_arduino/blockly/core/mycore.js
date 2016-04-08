//block_svg.js
Blockly.BlockSvg.prototype.onMouseDown_ = function(e) {
  if (this.isInFlyout) {
    return;
  }
  this.workspace.markFocused();
  // Update Blockly's knowledge of its own location.
  Blockly.svgResize(this.workspace);
  Blockly.terminateDrag_();
  this.select();
  Blockly.hideChaff();
  if (Blockly.isRightButton(e)) {
    // Right-click.
    this.showContextMenu_(e);
  } else if (!this.isMovable()) {
    // Allow unmovable blocks to be selected and context menued, but not
    // dragged.  Let this event bubble up to document, so the workspace may be
    // dragged instead.
    return;
  } else {
    // Left-click (or middle click)
    Blockly.removeAllRanges();
    Blockly.Css.setCursor(Blockly.Css.Cursor.CLOSED);

    this.dragStartXY_ = this.getRelativeToSurfaceXY();
    this.workspace.startDrag(e, this.dragStartXY_.x, this.dragStartXY_.y);

    Blockly.dragMode_ = 1;
    Blockly.BlockSvg.onMouseUpWrapper_ = Blockly.bindEvent_(document,
        'mouseup', this, this.onMouseUp_);
    Blockly.BlockSvg.onMouseMoveWrapper_ = Blockly.bindEvent_(document,
        'mousemove', this, this.onMouseMove_);
    // Build a list of bubbles that need to be moved and where they started.
    this.draggedBubbles_ = [];
    var descendants = this.getDescendants();
    for (var i = 0, descendant; descendant = descendants[i]; i++) {
      var icons = descendant.getIcons();
      for (var j = 0; j < icons.length; j++) {
        var data = icons[j].getIconLocation();
        data.bubble = icons[j];
        this.draggedBubbles_.push(data);
      }
    }
	
	//改变xmlArray
	//if(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace)!=xmlArray[pnow]){
		//xmlArray[++pnow]=Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
	//}
	
  }
  // This event has been handled.  No need to bubble up to the document.
  e.stopPropagation();
};

Blockly.BlockSvg.prototype.onMouseUp_ = function(e) {
  var this_ = this;
  Blockly.doCommand(function() {
    Blockly.terminateDrag_();
    if (Blockly.selected && Blockly.highlightedConnection_) {
      // Connect two blocks together.
      Blockly.localConnection_.connect(Blockly.highlightedConnection_);
      if (this_.rendered) {
        // Trigger a connection animation.
        // Determine which connection is inferior (lower in the source stack).
        var inferiorConnection;
        if (Blockly.localConnection_.isSuperior()) {
          inferiorConnection = Blockly.highlightedConnection_;
        } else {
          inferiorConnection = Blockly.localConnection_;
        }
        inferiorConnection.sourceBlock_.connectionUiEffect();
      }
      if (this_.workspace.trashcan) {
        // Don't throw an object in the trash can if it just got connected.
        this_.workspace.trashcan.close();
      }
    } else if (!this_.getParent() && Blockly.selected.isDeletable() &&
        this_.workspace.isDeleteArea(e)) {
      var trashcan = this_.workspace.trashcan;
      if (trashcan) {
        goog.Timer.callOnce(trashcan.close, 100, trashcan);
      }
      Blockly.selected.dispose(false, true);
      // Dropping a block on the trash can will usually cause the workspace to
      // resize to contain the newly positioned block.  Force a second resize
      // now that the block has been deleted.
      Blockly.fireUiEvent(window, 'resize');
    }
    if (Blockly.highlightedConnection_) {
      Blockly.highlightedConnection_.unhighlight();
      Blockly.highlightedConnection_ = null;
    }
    Blockly.Css.setCursor(Blockly.Css.Cursor.OPEN);
	
	//改变xmlArray
	if(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace)!=xmlArray[pnow]){
		xmlArray[++pnow]=Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
	}
	
  });
};
