var $builtinmodule = function (name) {
    var mod = {
        data: {
            seed: sm['taskConf'].timeout,
        },
    };
    var randintFunc = function(min, max) {
        mod.data.seed = (mod.data.seed * 9301 + 49297) % 233280;
        var num = mod.data.seed / 233280;
        var realNum = Math.ceil((num * (max.v - min.v)) + min.v);
        return Sk.builtin.int_(realNum);
    }
    randintFunc.co_varnames = ['min', 'max'];
	randintFunc.$defaults = [Sk.builtin.int_(0), Sk.builtin.int_(1)];
    randintFunc.co_numargs = 2;
    mod.randint =  new Sk.builtin.func(randintFunc);
    
    var choiceFunc = function(listName) {
        var num = randintFunc(0, listName.v.length);
        return listName.v[num.v];
    }
    choiceFunc.co_varnames = ['listName'];
    choiceFunc.co_numargs = 1;
    mod.choice =  new Sk.builtin.func(choiceFunc);

    var shuffleFunc = function(listName) {
        var num = 0;
        var valueNum, valueLast;
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
            var sknum = randintFunc(0, listName.v.length - i);
            num = Math.ceil(sknum.v);
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