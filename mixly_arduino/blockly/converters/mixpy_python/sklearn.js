'use strict';

//sklearn 生成分类样本
pbc.globalFunctionD['make_classification'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length === 0 && keywords.length === 8) {
        var key1block = py2block.convert(keywords[0].value);
        var key2block = py2block.convert(keywords[1].value);
        var key3block = py2block.convert(keywords[2].value);
        var key4block = py2block.convert(keywords[3].value);
        var key5block = py2block.convert(keywords[4].value);
        var key6block = py2block.convert(keywords[5].value);
        var key7block = py2block.convert(keywords[6].value);
        var key8block = py2block.convert(keywords[7].value);
        return block("sklearn_make_classification", func.lineno, {}, {
            "n_samples": key1block,
            "n_features": key2block,
            "n_informative": key3block,
            "n_redundant": key4block,
            "n_repeated": key5block,
            "n_classes": key6block,
            "n_clusters_per_class": key7block,
            "random_state": key8block
        }, {
            "inline": "false"
        });
    }
    else
    {
        throw new Error("Incorrect number of arguments");
    }
    
}

//sklearn 生成回归样本
pbc.globalFunctionD['make_regression'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length === 0 && keywords.length === 7) {
        var key1block = py2block.convert(keywords[0].value);
        var key2block = py2block.convert(keywords[1].value);
        var key3block = py2block.convert(keywords[2].value);
        var key4block = py2block.convert(keywords[3].value);
        var key5block = py2block.convert(keywords[4].value);
        var key6block = py2block.convert(keywords[5].value);
        var key7block = py2block.convert(keywords[6].value);
        return block("sklearn_make_regression", func.lineno, {}, {
            "n_samples": key1block,
            "n_features": key2block,
            "n_informative": key3block,
            "n_targets": key4block,
            "bias": key5block,
            "noise": key6block,
            "random_state": key7block
        }, {
            "inline": "false"
        });
    }
    else
    {
        throw new Error("Incorrect number of arguments");
    }
    
}

//sklearn 生成聚类样本
pbc.globalFunctionD['make_blobs'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length === 0 && keywords.length === 7) {
        var key1block = py2block.convert(keywords[0].value);
        var key2block = py2block.convert(keywords[1].value);
        var key3block = py2block.convert(keywords[2].value);
        var key4block = py2block.convert(keywords[3].value);
        var key5block = py2block.convert(keywords[4].value);
        var key6block = py2block.convert(keywords[5].value);
        var key7block = py2block.convert(keywords[6].value);
        return block("sklearn_make_blobs", func.lineno, {}, {
            "n_samples": key1block,
            "n_features": key2block,
            "centers": key3block,
            "cluster_std": key4block,
            "center_box": key5block,
            "shuffle": key6block,
            "random_state": key7block
        }, {
            "inline": "false"
        });
    }
    else
    {
        throw new Error("Incorrect number of arguments");
    }
    
}

//sklearn 加载数据集
function sklearn_load_check_assign(mode){
    function converter(py2block, node, targets, value) {
        if(value.func._astname != "Attribute" || value.func.value._astname != "Name"){
            return false;
        }
        var moduleName = py2block.Name_str(value.func.value);
        var funcName = py2block.identifier(value.func.attr);
        if (value._astname === "Call" && moduleName === "datasets"
            && funcName === mode && value.args.length === 0)
            return true;
        return false;
    }
    return converter;
}

function sklearn_load_create_block(){
    function converter(py2block, node, targets, value) {
        var name = py2block.Name_str(node.targets[0]);
        var type = py2block.identifier(value.func.attr);
         //注意：赋值语句里，即使图形块上下可接，也不需要加[]
        return block('sklearn_load', node.lineno, {
                "name": name,
                "type": type
        }, {});
    }
    return converter;
}

pbc.assignD.get('load_iris')['check_assign'] = sklearn_load_check_assign('load_iris');
pbc.assignD.get('load_boston')['check_assign'] = sklearn_load_check_assign('load_boston');
pbc.assignD.get('load_diabetes')['check_assign'] = sklearn_load_check_assign('load_diabetes');
pbc.assignD.get('load_breast_cancer')['check_assign'] = sklearn_load_check_assign('load_breast_cancer');
pbc.assignD.get('load_linnerud')['check_assign'] = sklearn_load_check_assign('load_linnerud');
pbc.assignD.get('load_digits')['check_assign'] = sklearn_load_check_assign('load_digits');

pbc.assignD.get('load_iris')['create_block'] = sklearn_load_create_block();
pbc.assignD.get('load_boston')['create_block'] = sklearn_load_create_block();
pbc.assignD.get('load_diabetes')['create_block'] = sklearn_load_create_block();
pbc.assignD.get('load_breast_cancer')['create_block'] = sklearn_load_create_block();
pbc.assignD.get('load_linnerud')['create_block'] = sklearn_load_create_block();
pbc.assignD.get('load_digits')['create_block'] = sklearn_load_create_block();

//sklearn 获取特征值/标签值/标签/特征
function sklearn_data_target(py2block, node, value, attr) {
    return block('sklearn_data_target', node.lineno, {
        "type": py2block.identifier(attr)
    }, {
        "name": py2block.convert(value)
    });
}
pbc.objectAttrD.get('data')['sklearn.datasets'] = sklearn_data_target;
pbc.objectAttrD.get('target')['sklearn.datasets'] = sklearn_data_target;
pbc.objectAttrD.get('target_names')['sklearn.datasets'] = sklearn_data_target;
pbc.objectAttrD.get('feature_names')['sklearn.datasets'] = sklearn_data_target;

//sklearn 数据集分割
pbc.globalFunctionD['train_test_split'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length === 2) {
        var arg1block = py2block.convert(args[0]);
        var arg2block = py2block.convert(args[1]);
        var key1block = py2block.convert(keywords[0].value);
        var key2block = py2block.convert(keywords[1].value);
        return block("sklearn_train_test_split", func.lineno, {}, {
            "train_data": arg1block,
            "train_target": arg2block,
            "test_size": key1block,
            "rondom_state": key2block,
        }, {
            "inline": "false"
        });
    }
    else if(args.length === 1)
    {
        var arg1block = py2block.convert(args[0]);
        var key1block = py2block.convert(keywords[0].value);
        var key2block = py2block.convert(keywords[1].value);
        return block("sklearn_train_test_split_no_target", func.lineno, {}, {
            "train_data": arg1block,
            "test_size": key1block,
            "rondom_state": key2block,
        }, {
            "inline": "false"
        });
    }
    else
    {
        throw new Error("Incorrect number of arguments");
    }
    
}

//sklearn 初始化线性回归
pbc.assignD.get('LinearRegression')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" ||  value.func._astname != "Name"){
        return false;
    }
    var funcName = value.func.id.v;
    if(funcName === "LinearRegression" && value.args.length === 0)
        return true;
    return false;
}

pbc.assignD.get('LinearRegression')['create_block'] = function(py2block, node, targets, value){
    var name = py2block.convert(node.targets[0]);
    var key1block = py2block.convert(value.keywords[0].value);
    var key2block = py2block.convert(value.keywords[1].value);
    var key3block = py2block.convert(value.keywords[2].value);
    return block("sklearn_LinearRegression", node.lineno, {}, {
        "model_name": name,
        "fit_intercept": key1block,
        "normalize": key2block,
        "n_jobs": key3block
    });
}

//sklearn 初始化岭回归
pbc.assignD.get('Ridge')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" ||  value.func._astname != "Name"){
        return false;
    }
    var funcName = value.func.id.v;
    if(funcName === "Ridge" && value.args.length === 0)
        return true;
    return false;
}

pbc.assignD.get('Ridge')['create_block'] = function(py2block, node, targets, value){
    var name = py2block.convert(node.targets[0]);
    var key1block = py2block.convert(value.keywords[0].value);
    var key2block = py2block.convert(value.keywords[1].value);
    var key3block = py2block.convert(value.keywords[2].value);
    var key4block = py2block.convert(value.keywords[3].value);
    var key5block = py2block.convert(value.keywords[4].value);
    return block("sklearn_Ridge", node.lineno, {}, {
        "model_name": name,
        "alpha": key1block,
        "fit_intercept": key2block,
        "normalize": key3block,
        "max_iter": key4block,
        "random_state": key5block
    });
}

//sklearn 初始化决策树 分类算法
pbc.assignD.get('DecisionTreeClassifier')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" ||  value.func._astname != "Name"){
        return false;
    }
    var funcName = value.func.id.v;
    if(funcName === "DecisionTreeClassifier" && value.args.length === 0)
        return true;
    return false;
}
pbc.assignD.get('DecisionTreeClassifier')['create_block'] = function(py2block, node, targets, value){
    var name = py2block.convert(node.targets[0]);
    var key1block = py2block.convert(value.keywords[0].value);
    var key2block = py2block.convert(value.keywords[1].value);
    return block("sklearn_DecisionTreeClassifier_Regressor", node.lineno, {
        "type": "DecisionTreeClassifier"
    }, {
        "model_name": name,
        "max_depth": key1block,
        "random_state": key2block
    });
}

//sklearn 初始化决策树 回归算法
pbc.assignD.get('DecisionTreeRegressor')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" ||  value.func._astname != "Name"){
        return false;
    }
    var funcName = value.func.id.v;
    if(funcName === "DecisionTreeRegressor" && value.args.length === 0)
        return true;
    return false;
}
pbc.assignD.get('DecisionTreeRegressor')['create_block'] = function(py2block, node, targets, value){
    var name = py2block.convert(node.targets[0]);
    var key1block = py2block.convert(value.keywords[0].value);
    var key2block = py2block.convert(value.keywords[1].value);
    return block("sklearn_DecisionTreeClassifier_Regressor", node.lineno, {
        "type": "DecisionTreeRegressor"
    }, {
        "model_name": name,
        "max_depth": key1block,
        "random_state": key2block
    });
}

//sklearn 初始化随机森林 分类算法
pbc.assignD.get('RandomForestClassifier')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" ||  value.func._astname != "Name"){
        return false;
    }
    var funcName = value.func.id.v;
    if(funcName === "RandomForestClassifier" && value.args.length === 0)
        return true;
    return false;
}
pbc.assignD.get('RandomForestClassifier')['create_block'] = function(py2block, node, targets, value){
    var name = py2block.convert(node.targets[0]);
    var key1block = py2block.convert(value.keywords[0].value);
    var key2block = py2block.convert(value.keywords[1].value);
    var key3block = py2block.convert(value.keywords[2].value);
    var key4block = py2block.convert(value.keywords[3].value);
    return block("sklearn_RandomForestClassifier_Regressor", node.lineno, {
        "type": "RandomForestClassifier"
    }, {
        "model_name": name,
        "n_estimators": key1block,
        "max_depth": key2block,
        "n_jobs": key3block,
        "random_state": key4block
    });
}

//sklearn 初始化随机森林 回归算法
pbc.assignD.get('RandomForestRegressor')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" ||  value.func._astname != "Name"){
        return false;
    }
    var funcName = value.func.id.v;
    if(funcName === "RandomForestRegressor" && value.args.length === 0)
        return true;
    return false;
}
pbc.assignD.get('RandomForestRegressor')['create_block'] = function(py2block, node, targets, value){
    var name = py2block.convert(node.targets[0]);
    var key1block = py2block.convert(value.keywords[0].value);
    var key2block = py2block.convert(value.keywords[1].value);
    var key3block = py2block.convert(value.keywords[2].value);
    var key4block = py2block.convert(value.keywords[3].value);
    return block("sklearn_RandomForestClassifier_Regressor", node.lineno, {
        "type": "RandomForestRegressor"
    }, {
        "model_name": name,
        "n_estimators": key1block,
        "max_depth": key2block,
        "n_jobs": key3block,
        "random_state": key4block
    });
}

//sklearn 初始化K近邻 分类算法
pbc.assignD.get('KNeighborsClassifier')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" ||  value.func._astname != "Name"){
        return false;
    }
    var funcName = value.func.id.v;
    if(funcName === "KNeighborsClassifier" && value.args.length === 0)
        return true;
    return false;
}
pbc.assignD.get('KNeighborsClassifier')['create_block'] = function(py2block, node, targets, value){
    var name = py2block.convert(node.targets[0]);
    var key1block = py2block.convert(value.keywords[0].value);
    var key2block = py2block.convert(value.keywords[1].value);
    return block("sklearn_KNeighborsClassifier_Regressor", node.lineno, {
        "type": "KNeighborsClassifier"
    }, {
        "model_name": name,
        "K": key1block,
        "n_jobs": key2block
    });
}

//sklearn 初始化K近邻 回归算法
pbc.assignD.get('KNeighborsRegressor')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" ||  value.func._astname != "Name"){
        return false;
    }
    var funcName = value.func.id.v;
    if(funcName === "KNeighborsRegressor" && value.args.length === 0)
        return true;
    return false;
}
pbc.assignD.get('KNeighborsRegressor')['create_block'] = function(py2block, node, targets, value){
    var name = py2block.convert(node.targets[0]);
    var key1block = py2block.convert(value.keywords[0].value);
    var key2block = py2block.convert(value.keywords[1].value);
    return block("sklearn_KNeighborsClassifier_Regressor", node.lineno, {
        "type": "KNeighborsRegressor"
    }, {
        "model_name": name,
        "K": key1block,
        "n_jobs": key2block
    });
}

//sklearn 初始化高斯贝叶斯分类算法
pbc.assignD.get('GaussianNB')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" ||  value.func._astname != "Name"){
        return false;
    }
    var funcName = value.func.id.v;
    if(funcName === "GaussianNB" && value.args.length === 0)
        return true;
    return false;
}
pbc.assignD.get('GaussianNB')['create_block'] = function(py2block, node, targets, value){
    var name = py2block.convert(node.targets[0]);
    return block("sklearn_GaussianNB", node.lineno, {}, {
        "model_name": name
    });
}

//sklearn 初始K-均值聚类
pbc.assignD.get('KMeans')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" ||  value.func._astname != "Name"){
        return false;
    }
    var funcName = value.func.id.v;
    if(funcName === "KMeans" && value.args.length === 0)
        return true;
    return false;
}

pbc.assignD.get('KMeans')['create_block'] = function(py2block, node, targets, value){
    var name = py2block.convert(node.targets[0]);
    var key1block = py2block.convert(value.keywords[0].value);
    var key2block = py2block.convert(value.keywords[1].value);
    var key3block = py2block.convert(value.keywords[2].value);
    var key4block = py2block.convert(value.keywords[3].value);
    return block("sklearn_KMeans", node.lineno, {}, {
        "model_name": name,
        "n_clusters": key1block,
        "max_iter": key2block,
        "random_state": key3block,
        "n_jobs": key4block
    });
}

//sklearn 训练模型
function sklearn_fit(){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if(args.length === 1) {
            var objblock = py2block.convert(func.value);
            var argblock1 = py2block.convert(args[0]);
            return [block("sklearn_fit_no_target", func.lineno, {}, {
                "model_name": objblock,
                "train_data": argblock1
            }, {
                "inline": "true"
            })];
        }
        else if(args.length === 2) {
            var objblock = py2block.convert(func.value);
            var argblock1 = py2block.convert(args[0]);
            var argblock2 = py2block.convert(args[1]);
            return [block("sklearn_fit", func.lineno, {
            }, {
                "model_name": objblock,
                "train_data": argblock1,
                "train_target": argblock2
            }, {
                "inline": "true"
            })];
        }
        else
        {
            throw new Error("Incorrect number of arguments");
        }
    }
    return converter;
}
pbc.objectFunctionD.get('fit')['sklearn.fit'] = sklearn_fit();

//sklearn 模型预测
function sklearn_predict(){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if(args.length === 1)
        {
            var objblock = py2block.convert(func.value);
            var argblock1 = py2block.convert(args[0]);
            return block("sklearn_predict", func.lineno, {
            }, {
                "model_name": objblock,
                "train_data": argblock1
            }, {
                "inline": "true"
            });
        }
        else
        {
            throw new Error("Incorrect number of arguments");
        }
    }
    return converter;
}
pbc.objectFunctionD.get('predict')['sklearn'] = sklearn_predict();

//sklearn 计算模型得分
function sklearn_score(){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length === 2) {
            var objblock = py2block.convert(func.value);
            var argblock1 = py2block.convert(args[0]);
            var argblock2 = py2block.convert(args[1]);
            return block("sklearn_score", func.lineno, {}, {
                "model_name": objblock,
                "train_data": argblock1,
                "train_target": argblock2
            }, {
                "inline": "true"
            });
        }
        else if(args.length === 1)
        {
            var objblock = py2block.convert(func.value);
            var argblock1 = py2block.convert(args[0]);
            return block("sklearn_score_no_target", func.lineno, {}, {
                "model_name": objblock,
                "train_data": argblock1
            }, {
                "inline": "true"
            });
        }
        else
        {
            throw new Error("Incorrect number of arguments");
        } 
    }
    return converter;
}
pbc.objectFunctionD.get('score')['sklearn'] = sklearn_score();

//sklearn 线性回归 模型获取 斜率/截距
function sklearn_coef_intercept(py2block, node, value, attr) {
    return block('sklearn_coef_intercept', node.lineno, {
        "type": py2block.identifier(attr)
    }, {
        "model_name": py2block.convert(value)
    });
}
pbc.objectAttrD.get('coef_')['sklearn.linear_model'] = sklearn_coef_intercept;
pbc.objectAttrD.get('intercept_')['sklearn.linear_model'] = sklearn_coef_intercept;

//sklearn K-均值聚类 模型获取 簇中心坐标/聚类后的标签/所有点到对应簇中心的距离平方和
function sklearn_cluster_centers_labels_inertia(py2block, node, value, attr) {
    return block('sklearn_cluster_centers_labels_inertia', node.lineno, {
        "type": py2block.identifier(attr)
    }, {
        "model_name": py2block.convert(value)
    });
}
pbc.objectAttrD.get('cluster_centers_')['sklearn.cluster'] = sklearn_cluster_centers_labels_inertia;
pbc.objectAttrD.get('labels_')['sklearn.cluster'] = sklearn_cluster_centers_labels_inertia;
pbc.objectAttrD.get('inertia_')['sklearn.cluster'] = sklearn_cluster_centers_labels_inertia;

//sklearn 保存模型
function sklearn_save_model(){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if(args.length === 2) {
            var argblock1 = py2block.convert(args[0]);
            var argblock2 = py2block.convert(args[1]);
            var funcName = func.attr.v;
            return [block("sklearn_save_load_model", func.lineno, {
                "type" : funcName
            }, {
                "model_name": argblock1,
                "address": argblock2
            }, {
                "inline": "true"
            })];
        }
        else
        {
            throw new Error("Incorrect number of arguments");
        }
    }
    return converter;
}
pbc.objectFunctionD.get('dump')['sklearn.externals'] = sklearn_save_model();

//sklearn 加载模型
pbc.assignD.get('load')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" ||  value.func._astname != "Attribute"){
        return false;
    }
    var funcName = value.func.attr.v;
    if(funcName === "load" && value.args.length === 1)
        return true;
    return false;
}
pbc.assignD.get('load')['create_block'] = function(py2block, node, targets, value){
    var name = py2block.convert(node.targets[0]);
    var key1block = py2block.convert(value.args[0]);
    var funcName = value.func.attr.v;
    return block("sklearn_save_load_model", node.lineno, {
        "type" : funcName
    }, {
        "model_name" : name,
        "address" : key1block
    });
}