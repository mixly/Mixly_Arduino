var $builtinmodule = function (name) {
	let mod= {__name__: new Sk.builtin.str("blocktool")};

    var highlight = function(id) {
        id=Sk.ffi.remapToJs(id)
        Mixly.Editor.blockEditor.highlightBlock(id);
    };
    
    var highlight_f=function(block_id) {
        return new Sk.misceval.promiseToSuspension(new Promise(function(resolve) {
            setTimeout( () => {   
                highlight(block_id)
                resolve(Sk.builtin.none.none$);
            }, 800);
        }));
    }
    mod.highlight = new Sk.builtin.func(highlight_f);

    return mod;
}