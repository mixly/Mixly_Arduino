import * as Blockly from 'blockly/core';

const SKLEARN_HUE = 80;

export const sklearn_make_classification = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.SKLEARN_CLASSIFICATION_GENERATION);
        this.appendValueInput("n_samples")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.NUMBER_OF_SAMPLES);
        this.appendValueInput("n_features")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.NUMBER_OF_FEATURES);
        this.appendValueInput("n_informative")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.NUMBER_OF_EFFECTIVE_FEATURES);
        this.appendValueInput("n_redundant")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.NUMBER_OF_REDUNDANT_FEATURES);
        this.appendValueInput("n_repeated")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.NUMBER_OF_REPEATED_FEATURES);
        this.appendValueInput("n_classes")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.NUMBER_OF_CLASSES);
        this.appendValueInput("n_clusters_per_class")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.NUMBER_OF_CLUSTERS_PER_CLASSES);
        this.appendValueInput("random_state")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.RANDOM_SEED);
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour(SKLEARN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//sklearn 生成回归样本
export const sklearn_make_regression = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.SKLEARN_REGRESSION_GENERATION);
        this.appendValueInput("n_samples")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.NUMBER_OF_SAMPLES);
        this.appendValueInput("n_features")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.NUMBER_OF_FEATURES);
        this.appendValueInput("n_informative")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.NUMBER_OF_EFFECTIVE_FEATURES);
        this.appendValueInput("n_targets")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.NUMBER_OF_LABELS);
        this.appendValueInput("bias")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.DEVIATION);
        this.appendValueInput("noise")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.NOISE);
        this.appendValueInput("random_state")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.RANDOM_SEED);
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour(SKLEARN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//sklearn 生成聚类样本
export const sklearn_make_blobs = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.SKLEARN_CLUSTERING_GENERATION);
        this.appendValueInput("n_samples")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.NUMBER_OF_SAMPLES);
        this.appendValueInput("n_features")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.NUMBER_OF_FEATURES);
        this.appendValueInput("centers")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.NUMBER_OF_CLUSTERS);
        this.appendValueInput("cluster_std")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.STANDARD_DEVIATION_OF_CLUSTER);
        this.appendValueInput("center_box")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.CLUSTER_BOUNDING_BOX);
        this.appendValueInput("shuffle")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.SHUFFLE_SAMPLES);
        this.appendValueInput("random_state")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.RANDOM_SEED);
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour(SKLEARN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//sklearn 加载数据集
export const sklearn_load = {
    init: function () {
        var data = [
            [Blockly.Msg.SKLEARN_LOAD_IRIS, "load_iris"],
            [Blockly.Msg.SKLEARN_LOAD_BOSTON, "load_boston"],
            [Blockly.Msg.SKLEARN_LOAD_DIABETES, "load_diabetes"],
            [Blockly.Msg.SKLEARN_LOAD_BREAST_CANCER, "load_breast_cancer"],
            [Blockly.Msg.SKLEARN_LOAD_LINNERUD, "load_linnerud"],
            [Blockly.Msg.SKLEARN_LOAD_DIGITS, "load_digits"]
        ];
        this.appendDummyInput()
            .appendField("sklearn " + Blockly.Msg.LOAD)
            .appendField(new Blockly.FieldDropdown(data), "type")
            .appendField(new Blockly.FieldTextInput("iris"), "name");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(SKLEARN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    },
    getVars: function () {
        return [this.getFieldValue('name')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('name'))) {
            this.setTitleValue(newName, 'name');
        }
    }
};

//sklearn 获取特征值/标签值/标签/特征
export const sklearn_data_target = {
    init: function () {
        this.appendValueInput("name")
            .setCheck(null)
            .appendField("sklearn " + Blockly.Msg.DATA_SET);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.EIGENVALUES, "data"], [Blockly.Msg.LABEL_VALUE, "target"], [Blockly.Msg.FEATURE, "feature_names"], [Blockly.Msg.mixpy_PYLAB_TICKS_TAG, "target_names"]]), "type");
        this.setOutput(true, null);
        this.setColour(SKLEARN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//sklearn 数据集分割
export const sklearn_train_test_split = {
    init: function () {
        this.appendDummyInput()
            .appendField("sklearn " + Blockly.Msg.DATA_SEGMENTATION);
        this.appendValueInput("train_data")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.EIGENVALUES);
        this.appendValueInput("train_target")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.LABEL_VALUE);
        this.appendValueInput("test_size")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.TEST_SET_PROPORTION);
        this.appendValueInput("rondom_state")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.RANDOM_SEED);
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour(SKLEARN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//sklearn 数据集分割-无标签值
export const sklearn_train_test_split_no_target = {
    init: function () {
        this.appendDummyInput()
            .appendField("sklearn " + Blockly.Msg.DATA_SEGMENTATION);
        this.appendValueInput("train_data")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.EIGENVALUES);
        this.appendValueInput("test_size")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.TEST_SET_PROPORTION);
        this.appendValueInput("rondom_state")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.RANDOM_SEED);
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour(SKLEARN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//sklearn 初始化线性回归
export const sklearn_LinearRegression = {
    init: function () {
        this.appendDummyInput()
            .appendField("sklearn " + Blockly.Msg.SKLEARN_LINEARREGRESSION_INIT);
        this.appendValueInput("model_name")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MODEL_NAME);
        this.appendValueInput("fit_intercept")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.SKLEARN_CALCULATE_MODEL_INTERRUPT);
        this.appendValueInput("normalize")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.SKLEARN_REGRESSION_NORMIALIZATION);
        this.appendValueInput("n_jobs")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.SKLEARN_THREADS);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(SKLEARN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//sklearn 初始化岭回归
export const sklearn_Ridge = {
    init: function () {
        this.appendDummyInput()
            .appendField("sklearn " + Blockly.Msg.SKLEARN_RIDGE_INIT);
        this.appendValueInput("model_name")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MODEL_NAME);
        this.appendValueInput("alpha")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.SKLEARN_REGULA_INTENSITY);
        this.appendValueInput("fit_intercept")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.SKLEARN_CALCULATE_MODEL_INTERRUPT);
        this.appendValueInput("normalize")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.SKLEARN_REGRESSION_NORMIALIZATION);
        this.appendValueInput("max_iter")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.SKLEARN_MAX_ITER);
        this.appendValueInput("random_state")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.RANDOM_SEED);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(SKLEARN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//sklearn 初始化决策树 分类/回归算法
export const sklearn_DecisionTreeClassifier_Regressor = {
    init: function () {
        this.appendDummyInput()
            .appendField("sklearn " + Blockly.Msg.SKLEARN_DECISIONTREE_INIT)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.SKLEARN_CLASSIFICATION_ALGORITHM, "DecisionTreeClassifier"], [Blockly.Msg.SKLEARN_REGRESSION_ALGORITHM, "DecisionTreeRegressor"]]), "type");
        this.appendValueInput("model_name")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MODEL_NAME);
        this.appendValueInput("max_depth")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.SKLEARN_MAXIMUM_TREE_DEPTH);
        this.appendValueInput("random_state")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.RANDOM_SEED);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(SKLEARN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//sklearn 初始化随机森林 分类/回归算法
export const sklearn_RandomForestClassifier_Regressor = {
    init: function () {
        this.appendDummyInput()
            .appendField("sklearn " + Blockly.Msg.SKLEARN_RANDOMFOREST_INIT)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.SKLEARN_CLASSIFICATION_ALGORITHM, "RandomForestClassifier"], [Blockly.Msg.SKLEARN_REGRESSION_ALGORITHM, "RandomForestRegressor"]]), "type");
        this.appendValueInput("model_name")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MODEL_NAME);
        this.appendValueInput("n_estimators")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.NUMBER_OF_TREES);
        this.appendValueInput("max_depth")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.SKLEARN_MAXIMUM_TREE_DEPTH);
        this.appendValueInput("n_jobs")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.SKLEARN_THREADS);
        this.appendValueInput("random_state")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.RANDOM_SEED);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(SKLEARN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//sklearn 初始化K近邻 分类/回归算法
export const sklearn_KNeighborsClassifier_Regressor = {
    init: function () {
        this.appendDummyInput()
            .appendField("sklearn " + Blockly.Msg.SKLEARN_KNN_INIT)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.SKLEARN_CLASSIFICATION_ALGORITHM, "KNeighborsClassifier"], [Blockly.Msg.SKLEARN_REGRESSION_ALGORITHM, "KNeighborsRegressor"]]), "type");
        this.appendValueInput("model_name")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MODEL_NAME);
        this.appendValueInput("K")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("K");
        this.appendValueInput("n_jobs")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.SKLEARN_THREADS);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(SKLEARN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//sklearn 初始化高斯贝叶斯分类算法
export const sklearn_GaussianNB = {
    init: function () {
        this.appendDummyInput()
            .appendField("sklearn " + Blockly.Msg.SKLEARN_GAUSSINNB_INIT);
        this.appendValueInput("model_name")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MODEL_NAME);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(SKLEARN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//sklearn 初始化PCA降维
export const sklearn_pca = {
    init: function () {
        this.appendDummyInput()
            .appendField("sklearn 初始化 PCA 算法");
        this.appendValueInput("model_name")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MODEL_NAME);
        this.appendValueInput("n_components")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.SKLEARN_PCA_N_COMPONENTS);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(SKLEARN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//sklearn PCA拟合并转换数据
export const sklearn_pca_fit_transform = {
    init: function () {
        this.appendDummyInput()
            .appendField("sklearn PCA 降维");
        this.appendValueInput("model_name")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MODEL_NAME);
        this.appendValueInput("train_data")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.EIGENVALUES);
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(SKLEARN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//sklearn 初始化K-均值聚类
export const sklearn_KMeans = {
    init: function () {
        this.appendDummyInput()
            .appendField("sklearn " + Blockly.Msg.SKLEARN_KMEANS_INIT);
        this.appendValueInput("model_name")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MODEL_NAME);
        this.appendValueInput("n_clusters")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.NUMBER_OF_CLUSTERS_JUST);
        this.appendValueInput("max_iter")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.SKLEARN_MAX_ITER);
        this.appendValueInput("random_state")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.RANDOM_SEED);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(SKLEARN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//sklearn KMeans拟合数据
export const sklearn_KMeans_fit = {
    init: function () {
        this.appendDummyInput()
            .appendField("sklearn K-均值聚类");
        this.appendValueInput("model_name")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MODEL_NAME);
        this.appendValueInput("train_data")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.EIGENVALUES);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(SKLEARN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//sklearn 训练模型
export const sklearn_fit = {
    init: function () {
        this.appendDummyInput()
            .appendField("sklearn " + Blockly.Msg.TRAINING_MODEL);
        this.appendValueInput("model_name")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MODEL_NAME);
        this.appendValueInput("train_data")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.EIGENVALUES);
        this.appendValueInput("train_target")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.LABEL_VALUE);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(SKLEARN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//sklearn 训练模型-无标签值
export const sklearn_fit_no_target = {
    init: function () {
        this.appendDummyInput()
            .appendField("sklearn " + Blockly.Msg.TRAINING_MODEL);
        this.appendValueInput("model_name")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MODEL_NAME);
        this.appendValueInput("train_data")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.EIGENVALUES);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(SKLEARN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//sklearn 模型预测
export const sklearn_predict = {
    init: function () {
        this.appendDummyInput()
            .appendField("sklearn " + Blockly.Msg.MODEL_PRODICTION);
        this.appendValueInput("model_name")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MODEL_NAME);
        this.appendValueInput("train_data")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.EIGENVALUES);
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(SKLEARN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//sklearn 计算模型得分
export const sklearn_score = {
    init: function () {
        this.appendDummyInput()
            .appendField("sklearn " + Blockly.Msg.CALCULATE_THE_SCORE);
        this.appendValueInput("model_name")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MODEL_NAME);
        this.appendValueInput("train_data")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.EIGENVALUES);
        this.appendValueInput("train_target")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.LABEL_VALUE);
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(SKLEARN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//sklearn 计算模型得分 - 无标签值
export const sklearn_score_no_target = {
    init: function () {
        this.appendDummyInput()
            .appendField("sklearn " + Blockly.Msg.CALCULATE_THE_SCORE);
        this.appendValueInput("model_name")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MODEL_NAME);
        this.appendValueInput("train_data")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.EIGENVALUES);
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(SKLEARN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//sklearn 线性回归 模型获取 斜率/截距
export const sklearn_coef_intercept = {
    init: function () {
        this.appendDummyInput()
            .appendField("sklearn " + Blockly.Msg.SKLEARN_GENERALIZED_LINEAR_REGRESSION);
        this.appendValueInput("model_name")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .setCheck(null)
            .appendField(Blockly.Msg.MODEL_NAME);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.SKLEARN_COEF, "coef_"], [Blockly.Msg.SKLEARN_INTERCEPT, "intercept_"]]), "type");
        this.setOutput(true, null);
        this.setColour(SKLEARN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//sklearn K-均值聚类 模型获取 簇中心坐标/聚类后的标签/所有点到对应簇中心的距离平方和
export const sklearn_cluster_centers_labels_inertia = {
    init: function () {
        this.appendDummyInput()
            .appendField("sklearn " + Blockly.Msg.SKLEARN_CLUSTERING);
        this.appendValueInput("model_name")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MODEL_NAME);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.SKLEARN_CLUSTER_CENTER, "cluster_centers_"], [Blockly.Msg.SKLEARN_LABELS_AFTER_CLUSTERING, "labels_"], [Blockly.Msg.SKLEARN_CLUSTERING_SUM_OF_SQUARED_DISTANCES, "inertia_"]]), "type");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(SKLEARN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//sklearn 保存/加载模型
export const sklearn_save_load_model = {
    init: function () {
        this.appendValueInput("model_name")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("sklearn")
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.SKLEARN_SAVE_MODEL, "dump"], [Blockly.Msg.SKLEARN_LOAD_MODEL, "load"]]), "type")
            .appendField(" " + Blockly.Msg.MODEL_NAME);
        this.appendValueInput("address")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_THE_PATH);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(SKLEARN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};