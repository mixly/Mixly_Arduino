var $builtinmodule = function (name) {
    var mod = {
        data: {
        }
    };
    var randintFunc = function(min, max) {
        var num = Math.random();
        var realNum = (num * (max.v - min.v)) + min.v;
        return Sk.builtin.int_(realNum);
    }
    randintFunc.co_varnames = ['min', 'max'];
	randintFunc.$defaults = [Sk.builtin.int_(0), Sk.builtin.int_(1)];
    randintFunc.co_numargs = 2;
    mod.randint =  new Sk.builtin.func(randintFunc);
    
    var choiceFunc = function(listName) {
        var num = Math.ceil(Math.random() * (listName.v.length));
        return listName.v[num];
    }
    choiceFunc.co_varnames = ['listName'];
    choiceFunc.co_numargs = 1;
    mod.choice =  new Sk.builtin.func(choiceFunc);

    var shuffleFunc = function(listName) {
        var num = 0;
        var valueCache;
        var deepclone = function (obj) { 
            if(obj === null) return null 
            if(typeof obj !== 'object') return obj;
            if(obj.constructor===Date) return new Date(obj); 
            var newObj = new obj.constructor ();  //保持继承链
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {   //不遍历其原型链上的属性
                    var val = obj[key];
                    newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; // 使用arguments.callee解除与函数名的耦合
                }
            }  
            return newObj;  
        }; 
        for(var i = 0; i < listName.v.length - 1; i++){
            num = Math.ceil(Math.random() * (listName.v.length - i));
            valueNum = deepclone(listName.v[num]);
            valueLast = deepclone(listName.v[listName.v.length - i - 1]);
            listName.v[listName.v.length - i - 1] = valueNum;
            listName.v[num] = valueLast;
        }
        return listName;
    }
    shuffleFunc.co_varnames = ['listName'];
    shuffleFunc.co_numargs = 1;
    mod.shuffle =  new Sk.builtin.func(shuffleFunc);
    return mod;
}