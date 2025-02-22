export const sklearn_make_classification = function (_, generator) {
    var value_n_samples = generator.valueToCode(this, 'n_samples', generator.ORDER_ATOMIC) || '100';
    var value_n_features = generator.valueToCode(this, 'n_features', generator.ORDER_ATOMIC) || '20';
    var value_n_informative = generator.valueToCode(this, 'n_informative', generator.ORDER_ATOMIC) || '2';
    var value_n_redundant = generator.valueToCode(this, 'n_redundant', generator.ORDER_ATOMIC) || '2';
    var value_n_repeated = generator.valueToCode(this, 'n_repeated', generator.ORDER_ATOMIC) || '0';
    var value_n_classes = generator.valueToCode(this, 'n_classes', generator.ORDER_ATOMIC) || '2';
    var value_n_clusters_per_class = generator.valueToCode(this, 'n_clusters_per_class', generator.ORDER_ATOMIC) || '2';
    var value_random_state = generator.valueToCode(this, 'random_state', generator.ORDER_ATOMIC) || 'None';
    generator.definitions_['import_sklearn_make_classification'] = 'from sklearn.datasets import make_classification';
    var code = 'make_classification(n_samples=' + value_n_samples + ',n_features=' + value_n_features + ',n_informative=' + value_n_informative + ',n_redundant=' + value_n_redundant + ',n_repeated=' + value_n_repeated + ',n_classes=' + value_n_classes + ',n_clusters_per_class=' + value_n_clusters_per_class + ',random_state=' + value_random_state + ')';
    return [code, generator.ORDER_ATOMIC];
}

// sklearn 生成回归样本
export const sklearn_make_regression = function (_, generator) {
    var value_n_samples = generator.valueToCode(this, 'n_samples', generator.ORDER_ATOMIC) || '100';
    var value_n_features = generator.valueToCode(this, 'n_features', generator.ORDER_ATOMIC) || '100';
    var value_n_informative = generator.valueToCode(this, 'n_informative', generator.ORDER_ATOMIC) || '10';
    var value_n_targets = generator.valueToCode(this, 'n_targets', generator.ORDER_ATOMIC) || '1';
    var value_bias = generator.valueToCode(this, 'bias', generator.ORDER_ATOMIC) || '0.0';
    var value_noise = generator.valueToCode(this, 'noise', generator.ORDER_ATOMIC) || '0.0';
    var value_random_state = generator.valueToCode(this, 'random_state', generator.ORDER_ATOMIC) || 'None';
    generator.definitions_['import_sklearn_make_regression'] = 'from sklearn.datasets import make_regression';
    var code = 'make_regression(n_samples=' + value_n_samples + ',n_features=' + value_n_features + ',n_informative=' + value_n_informative + ',n_targets=' + value_n_targets + ',bias=' + value_bias + ',noise=' + value_noise + ',random_state=' + value_random_state + ')';
    return [code, generator.ORDER_ATOMIC];
}

// sklearn 生成聚类样本
export const sklearn_make_blobs = function (_, generator) {
    var value_n_samples = generator.valueToCode(this, 'n_samples', generator.ORDER_ATOMIC) || '100';
    var value_n_features = generator.valueToCode(this, 'n_features', generator.ORDER_ATOMIC) || '2';
    var value_centers = generator.valueToCode(this, 'centers', generator.ORDER_ATOMIC) || 'None';
    var value_cluster_std = generator.valueToCode(this, 'cluster_std', generator.ORDER_ATOMIC) || '1.0';
    var value_center_box = generator.valueToCode(this, 'center_box', generator.ORDER_ATOMIC) || '(-10.0,10.0)';
    var value_shuffle = generator.valueToCode(this, 'shuffle', generator.ORDER_ATOMIC) || 'True';
    var value_random_state = generator.valueToCode(this, 'random_state', generator.ORDER_ATOMIC) || 'None';
    generator.definitions_['import_sklearn_make_blobs'] = 'from sklearn.datasets import make_blobs';
    var code = 'make_blobs(n_samples=' + value_n_samples + ',n_features=' + value_n_features + ',centers=' + value_centers + ',cluster_std=' + value_cluster_std + ',center_box=' + value_center_box + ',shuffle=' + value_shuffle + ',random_state=' + value_random_state + ')';
    return [code, generator.ORDER_ATOMIC];
}

// sklearn 加载数据集
export const sklearn_load = function (_, generator) {
    var dropdown_type = this.getFieldValue('type');
    var text_name = this.getFieldValue('name');
    generator.definitions_['import_sklearn_datasets'] = 'from sklearn import datasets';
    var code = text_name + ' = datasets.' + dropdown_type + '()\n';
    return code;
}

// sklearn 获取特征值/标签值/标签/特征
export const sklearn_data_target = function (_, generator) {
    var value_name = generator.valueToCode(this, 'name', generator.ORDER_ATOMIC) || 'iris';
    var dropdown_type = this.getFieldValue('type');
    var code = value_name + '.' + dropdown_type;
    return [code, generator.ORDER_ATOMIC];
}

// sklearn 数据集分割
export const sklearn_train_test_split = function (_, generator) {
    var value_train_data = generator.valueToCode(this, 'train_data', generator.ORDER_ATOMIC) || 'iris_X';
    var value_train_target = generator.valueToCode(this, 'train_target', generator.ORDER_ATOMIC) || 'iris_y';
    var value_test_size = generator.valueToCode(this, 'test_size', generator.ORDER_ATOMIC) || '0.3';
    var value_rondom_state = generator.valueToCode(this, 'rondom_state', generator.ORDER_ATOMIC) || 'None';
    generator.definitions_['import_sklearn_train_test_split'] = 'from sklearn.model_selection import train_test_split';
    if (value_train_target == 'None')
        var code = 'train_test_split(' + value_train_data + ',test_size = ' + value_test_size + ',random_state = ' + value_rondom_state + ')';
    else
        var code = 'train_test_split(' + value_train_data + ',' + value_train_target + ',test_size = ' + value_test_size + ',random_state = ' + value_rondom_state + ')';
    return [code, generator.ORDER_ATOMIC];
}

// sklearn 数据集分割-无标签值
export const sklearn_train_test_split_no_target = function (_, generator) {
    var value_train_data = generator.valueToCode(this, 'train_data', generator.ORDER_ATOMIC) || 'iris_X';
    var value_test_size = generator.valueToCode(this, 'test_size', generator.ORDER_ATOMIC) || '0.3';
    var value_rondom_state = generator.valueToCode(this, 'rondom_state', generator.ORDER_ATOMIC) || 'None';
    generator.definitions_['import_sklearn_train_test_split'] = 'from sklearn.model_selection import train_test_split';
    var code = 'train_test_split(' + value_train_data + ',test_size = ' + value_test_size + ',random_state = ' + value_rondom_state + ')';
    return [code, generator.ORDER_ATOMIC];
}

// sklearn 初始化线性回归
export const sklearn_LinearRegression = function (_, generator) {
    var value_model_name = generator.valueToCode(this, 'model_name', generator.ORDER_ATOMIC) || 'model';
    var value_fit_intercept = generator.valueToCode(this, 'fit_intercept', generator.ORDER_ATOMIC) || 'True';
    var value_normalize = generator.valueToCode(this, 'normalize', generator.ORDER_ATOMIC) || 'False';
    var value_n_jobs = generator.valueToCode(this, 'n_jobs', generator.ORDER_ATOMIC) || 'None';
    generator.definitions_['import_sklearn_linear_model'] = 'from sklearn.linear_model import LinearRegression';
    var code = value_model_name + ' = LinearRegression(fit_intercept = ' + value_fit_intercept + ',normalize = ' + value_normalize + ',n_jobs = ' + value_n_jobs + ')\n';
    return code;
}

// sklearn 初始化岭回归
export const sklearn_Ridge = function (_, generator) {
    var value_model_name = generator.valueToCode(this, 'model_name', generator.ORDER_ATOMIC) || 'model';
    var value_alpha = generator.valueToCode(this, 'alpha', generator.ORDER_ATOMIC) || '1.0';
    var value_fit_intercept = generator.valueToCode(this, 'fit_intercept', generator.ORDER_ATOMIC) || 'True';
    var value_normalize = generator.valueToCode(this, 'normalize', generator.ORDER_ATOMIC) || 'False';
    var value_max_iter = generator.valueToCode(this, 'max_iter', generator.ORDER_ATOMIC) || '300';
    var value_random_state = generator.valueToCode(this, 'random_state', generator.ORDER_ATOMIC) || 'None';
    generator.definitions_['import_sklearn_linear_model'] = 'from sklearn.linear_model import Ridge';
    var code = value_model_name + ' = Ridge(alpha = ' + value_alpha + ',fit_intercept = ' + value_fit_intercept + ',normalize = ' + value_normalize + ',max_iter = ' + value_max_iter + ',random_state = ' + value_random_state + ')\n';
    return code;
}

// sklearn 初始化决策树 分类/回归算法
export const sklearn_DecisionTreeClassifier_Regressor = function (_, generator) {
    var value_model_name = generator.valueToCode(this, 'model_name', generator.ORDER_ATOMIC) || 'model';
    var dropdown_type = this.getFieldValue('type');
    var value_max_depth = generator.valueToCode(this, 'max_depth', generator.ORDER_ATOMIC) || 'None';
    var value_random_state = generator.valueToCode(this, 'random_state', generator.ORDER_ATOMIC) || 'None';
    generator.definitions_['import_sklearn_' + dropdown_type] = 'from sklearn.tree import ' + dropdown_type;
    var code = value_model_name + ' = ' + dropdown_type + '(max_depth = ' + value_max_depth + ',random_state = ' + value_random_state + ')\n';
    return code;
}

export const sklearn_RandomForestClassifier_Regressor = function (_, generator) {
    var dropdown_type = this.getFieldValue('type');
    var value_model_name = generator.valueToCode(this, 'model_name', generator.ORDER_ATOMIC) || 'Model';
    var value_n_estimators = generator.valueToCode(this, 'n_estimators', generator.ORDER_ATOMIC) || '100';
    var value_max_depth = generator.valueToCode(this, 'max_depth', generator.ORDER_ATOMIC) || 'None';
    var value_n_jobs = generator.valueToCode(this, 'n_jobs', generator.ORDER_ATOMIC) || 'None';
    var value_random_state = generator.valueToCode(this, 'random_state', generator.ORDER_ATOMIC) || 'None';
    generator.definitions_['import_sklearn_' + dropdown_type] = 'from sklearn.ensemble import ' + dropdown_type;
    var code = value_model_name + ' = ' + dropdown_type + '(n_estimators = ' + value_n_estimators + ',max_depth = ' + value_max_depth + ',n_jobs = ' + value_n_jobs + ',random_state = ' + value_random_state + ')\n';
    return code;
}

// sklearn 初始化K近邻 分类/回归算法
export const sklearn_KNeighborsClassifier_Regressor = function (_, generator) {
    var dropdown_type = this.getFieldValue('type');
    var value_model_name = generator.valueToCode(this, 'model_name', generator.ORDER_ATOMIC) || 'model';
    var value_K = generator.valueToCode(this, 'K', generator.ORDER_ATOMIC) || '5';
    var value_n_jobs = generator.valueToCode(this, 'n_jobs', generator.ORDER_ATOMIC) || 'None';
    generator.definitions_['import_sklearn_' + dropdown_type] = 'from sklearn.neighbors import ' + dropdown_type;
    var code = value_model_name + ' = ' + dropdown_type + '(n_neighbors = ' + value_K + ',n_jobs = ' + value_n_jobs + ')\n';
    return code;
}

// sklearn 初始化高斯贝叶斯分类算法
export const sklearn_GaussianNB = function (_, generator) {
    var value_model_name = generator.valueToCode(this, 'model_name', generator.ORDER_ATOMIC) || 'model';
    generator.definitions_['import_sklearn_GaussianNB'] = 'from sklearn.naive_bayes import GaussianNB';
    var code = value_model_name + ' = GaussianNB()\n';
    return code;
}

// sklearn 初始化PCA降维
export const sklearn_pca = function (_, generator) {
    var value_model_name = generator.valueToCode(this, 'model_name', generator.ORDER_ATOMIC) || 'pca';
    var value_n_components = generator.valueToCode(this, 'n_components', generator.ORDER_ATOMIC) || '2';
    generator.definitions_['import_sklearn_pca'] = 'from sklearn.decomposition import PCA';
    var code = value_model_name + ' = PCA(n_components=' + value_n_components + ')\n';
    return code;
}

export const sklearn_pca_fit_transform = function(block, generator) {
    var value_model_name = generator.valueToCode(block, 'model_name', generator.ORDER_ATOMIC);
    var value_train_data = generator.valueToCode(block, 'train_data', generator.ORDER_ATOMIC);
    var code = value_model_name + '.fit_transform(' + value_train_data + ')';
    return [code, generator.ORDER_ATOMIC];
};

// sklearn 初始K-均值聚类
export const sklearn_KMeans = function (_, generator) {
    var value_model_name = generator.valueToCode(this, 'model_name', generator.ORDER_ATOMIC) || 'model';
    var value_n_clusters = generator.valueToCode(this, 'n_clusters', generator.ORDER_ATOMIC) || '8';
    var value_max_iter = generator.valueToCode(this, 'max_iter', generator.ORDER_ATOMIC) || '300';
    var value_random_state = generator.valueToCode(this, 'random_state', generator.ORDER_ATOMIC) || 'None';
    generator.definitions_['import_sklearn_KMeans'] = 'from sklearn.cluster import KMeans';
    var code = value_model_name + ' = KMeans(n_clusters = ' + value_n_clusters + ',max_iter = ' + value_max_iter + ',random_state = ' + value_random_state + ')\n';
    return code;
}

export const sklearn_KMeans_fit = function(block, generator) {
    var value_model_name = generator.valueToCode(block, 'model_name', generator.ORDER_ATOMIC);
    var value_train_data = generator.valueToCode(block, 'train_data', generator.ORDER_ATOMIC);
    var code = value_model_name + '.fit(' + value_train_data + ')\n';
    return code;
};

// sklearn 训练模型
export const sklearn_fit = function (_, generator) {
    var value_model_name = generator.valueToCode(this, 'model_name', generator.ORDER_ATOMIC) || 'model';
    var value_train_data = generator.valueToCode(this, 'train_data', generator.ORDER_ATOMIC) || 'X_train';
    var value_train_target = generator.valueToCode(this, 'train_target', generator.ORDER_ATOMIC) || 'y_train';
    if (value_train_target == 'None')
        var code = value_model_name + '.fit(' + value_train_data + ')\n';
    else
        var code = value_model_name + '.fit(' + value_train_data + ',' + value_train_target + ')\n';
    return code;
}

// sklearn 训练模型-无标签值
export const sklearn_fit_no_target = function (_, generator) {
    var value_model_name = generator.valueToCode(this, 'model_name', generator.ORDER_ATOMIC) || 'model';
    var value_train_data = generator.valueToCode(this, 'train_data', generator.ORDER_ATOMIC) || 'X_train';
    var code = value_model_name + '.fit(' + value_train_data + ')\n';
    return code;
}

// sklearn 模型预测
export const sklearn_predict = function (_, generator) {
    var value_model_name = generator.valueToCode(this, 'model_name', generator.ORDER_ATOMIC) || 'model';
    var value_train_data = generator.valueToCode(this, 'train_data', generator.ORDER_ATOMIC) || 'X_test';
    var code = value_model_name + '.predict(' + value_train_data + ')';
    return [code, generator.ORDER_ATOMIC];
}

// sklearn 计算模型得分
export const sklearn_score = function (_, generator) {
    var value_model_name = generator.valueToCode(this, 'model_name', generator.ORDER_ATOMIC) || 'model';
    var value_train_data = generator.valueToCode(this, 'train_data', generator.ORDER_ATOMIC) || 'X_train';
    var value_train_target = generator.valueToCode(this, 'train_target', generator.ORDER_ATOMIC) || 'y_train';
    if (value_train_target == 'None')
        var code = value_model_name + '.score(' + value_train_data + ')';
    else
        var code = value_model_name + '.score(' + value_train_data + ',' + value_train_target + ')';
    return [code, generator.ORDER_ATOMIC];
}

// sklearn 计算模型得分-无标签值
export const sklearn_score_no_target = function (_, generator) {
    var value_model_name = generator.valueToCode(this, 'model_name', generator.ORDER_ATOMIC) || 'model';
    var value_train_data = generator.valueToCode(this, 'train_data', generator.ORDER_ATOMIC) || 'X_train';
    var code = value_model_name + '.score(' + value_train_data + ')';
    return [code, generator.ORDER_ATOMIC];
}

// sklearn 线性回归 模型获取 斜率/截距
export const sklearn_coef_intercept = function (_, generator) {
    var value_model_name = generator.valueToCode(this, 'model_name', generator.ORDER_ATOMIC) || 'model';
    var dropdown_type = this.getFieldValue('type');
    var code = value_model_name + '.' + dropdown_type;
    return [code, generator.ORDER_ATOMIC];
}

// sklearn K-均值聚类 模型获取 簇中心坐标/聚类后的标签/所有点到对应簇中心的距离平方和
export const sklearn_cluster_centers_labels_inertia = function (_, generator) {
    var value_model_name = generator.valueToCode(this, 'model_name', generator.ORDER_ATOMIC) || 'model';
    var dropdown_type = this.getFieldValue('type');
    var code = value_model_name + '.' + dropdown_type;
    return [code, generator.ORDER_ATOMIC];
}

// sklearn 保存/加载模型
export const sklearn_save_load_model = function (_, generator) {
    var value_model_name = generator.valueToCode(this, 'model_name', generator.ORDER_ATOMIC) || 'model';
    var dropdown_type = this.getFieldValue('type');
    var value_address = generator.valueToCode(this, 'address', generator.ORDER_ATOMIC) || 'D:/mixly/test.pkl';
    generator.definitions_['import_sklearn_joblib'] = 'import joblib';
    var code = '';
    if (dropdown_type == 'dump')
        code = 'joblib.dump(' + value_model_name + ',' + value_address + ')\n';
    else
        code = value_model_name + ' = joblib.load(' + value_address + ')\n';
    return code;
}