'use strict';

goog.provide('Blockly.Python.sklearn');
goog.require('Blockly.Python');

Blockly.Python.sklearn_make_classification = function() {
  var value_n_samples = Blockly.Python.valueToCode(this, 'n_samples', Blockly.Python.ORDER_ATOMIC) || '100';
  var value_n_features = Blockly.Python.valueToCode(this, 'n_features', Blockly.Python.ORDER_ATOMIC) || '20';
  var value_n_informative = Blockly.Python.valueToCode(this, 'n_informative', Blockly.Python.ORDER_ATOMIC) || '2';
  var value_n_redundant = Blockly.Python.valueToCode(this, 'n_redundant', Blockly.Python.ORDER_ATOMIC) || '2';
  var value_n_repeated = Blockly.Python.valueToCode(this, 'n_repeated', Blockly.Python.ORDER_ATOMIC) || '0';
  var value_n_classes = Blockly.Python.valueToCode(this, 'n_classes', Blockly.Python.ORDER_ATOMIC) || '2';
  var value_n_clusters_per_class = Blockly.Python.valueToCode(this, 'n_clusters_per_class', Blockly.Python.ORDER_ATOMIC) || '2';
  var value_random_state = Blockly.Python.valueToCode(this, 'random_state', Blockly.Python.ORDER_ATOMIC) || 'None';
  Blockly.Python.definitions_['import_sklearn_make_classification'] = 'from sklearn.datasets import make_classification';
  var code = 'make_classification(n_samples='+value_n_samples+',n_features='+value_n_features+',n_informative='+value_n_informative+',n_redundant='+value_n_redundant+',n_repeated='+value_n_repeated+',n_classes='+value_n_classes+',n_clusters_per_class='+value_n_clusters_per_class+',random_state='+value_random_state+')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

//sklearn 生成回归样本
Blockly.Python.sklearn_make_regression = function() {
  var value_n_samples = Blockly.Python.valueToCode(this, 'n_samples', Blockly.Python.ORDER_ATOMIC) || '100';
  var value_n_features = Blockly.Python.valueToCode(this, 'n_features', Blockly.Python.ORDER_ATOMIC) || '100';
  var value_n_informative = Blockly.Python.valueToCode(this, 'n_informative', Blockly.Python.ORDER_ATOMIC) || '10';
  var value_n_targets = Blockly.Python.valueToCode(this, 'n_targets', Blockly.Python.ORDER_ATOMIC) || '1';
  var value_bias = Blockly.Python.valueToCode(this, 'bias', Blockly.Python.ORDER_ATOMIC) || '0.0';
  var value_noise = Blockly.Python.valueToCode(this, 'noise', Blockly.Python.ORDER_ATOMIC) || '0.0';
  var value_random_state = Blockly.Python.valueToCode(this, 'random_state', Blockly.Python.ORDER_ATOMIC) || 'None';
  Blockly.Python.definitions_['import_sklearn_make_regression'] = 'from sklearn.datasets import make_regression';
  var code = 'make_regression(n_samples='+value_n_samples+',n_features='+value_n_features+',n_informative='+value_n_informative+',n_targets='+value_n_targets+',bias='+value_bias+',noise='+value_noise+',random_state='+value_random_state+')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

//sklearn 生成聚类样本
Blockly.Python.sklearn_make_blobs = function() {
  var value_n_samples = Blockly.Python.valueToCode(this, 'n_samples', Blockly.Python.ORDER_ATOMIC) || '100';
  var value_n_features = Blockly.Python.valueToCode(this, 'n_features', Blockly.Python.ORDER_ATOMIC) || '2';
  var value_centers = Blockly.Python.valueToCode(this, 'centers', Blockly.Python.ORDER_ATOMIC) || 'None';
  var value_cluster_std = Blockly.Python.valueToCode(this, 'cluster_std', Blockly.Python.ORDER_ATOMIC) || '1.0';
  var value_center_box = Blockly.Python.valueToCode(this, 'center_box', Blockly.Python.ORDER_ATOMIC) || '(-10.0,10.0)';
  var value_shuffle = Blockly.Python.valueToCode(this, 'shuffle', Blockly.Python.ORDER_ATOMIC) || 'True';
  var value_random_state = Blockly.Python.valueToCode(this, 'random_state', Blockly.Python.ORDER_ATOMIC) || 'None';
  Blockly.Python.definitions_['import_sklearn_make_blobs'] = 'from sklearn.datasets import make_blobs';
  var code = 'make_blobs(n_samples='+value_n_samples+',n_features='+value_n_features+',centers='+value_centers+',cluster_std='+value_cluster_std+',center_box='+value_center_box+',shuffle='+value_shuffle+',random_state='+value_random_state+')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

//sklearn 加载数据集
Blockly.Python.sklearn_load = function() {
  var dropdown_type = this.getFieldValue('type');
  var text_name = this.getFieldValue('name');
  Blockly.Python.definitions_['import_sklearn_datasets'] = 'from sklearn import datasets';
  var code = text_name+' = datasets.'+dropdown_type+'()\n';
  return code;
};

//sklearn 获取特征值/标签值/标签/特征
Blockly.Python.sklearn_data_target = function() {
  var value_name = Blockly.Python.valueToCode(this, 'name', Blockly.Python.ORDER_ATOMIC) || 'iris';
  var dropdown_type = this.getFieldValue('type');
  var code = value_name+'.'+dropdown_type;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

//sklearn 数据集分割
Blockly.Python.sklearn_train_test_split = function() {
  var value_train_data = Blockly.Python.valueToCode(this, 'train_data', Blockly.Python.ORDER_ATOMIC) || 'iris_X';
  var value_train_target = Blockly.Python.valueToCode(this, 'train_target', Blockly.Python.ORDER_ATOMIC) || 'iris_y';
  var value_test_size = Blockly.Python.valueToCode(this, 'test_size', Blockly.Python.ORDER_ATOMIC) || '0.3';
  var value_rondom_state = Blockly.Python.valueToCode(this, 'rondom_state', Blockly.Python.ORDER_ATOMIC) || 'None';
  Blockly.Python.definitions_['import_sklearn_train_test_split'] = 'from sklearn.model_selection import train_test_split';
  if(value_train_target == 'None')
    var code = 'train_test_split('+value_train_data+',test_size = '+value_test_size+',random_state = '+value_rondom_state+')';
  else
    var code = 'train_test_split('+value_train_data+','+value_train_target+',test_size = '+value_test_size+',random_state = '+value_rondom_state+')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

//sklearn 数据集分割-无标签值
Blockly.Python.sklearn_train_test_split_no_target = function() {
  var value_train_data = Blockly.Python.valueToCode(this, 'train_data', Blockly.Python.ORDER_ATOMIC) || 'iris_X';
  var value_test_size = Blockly.Python.valueToCode(this, 'test_size', Blockly.Python.ORDER_ATOMIC) || '0.3';
  var value_rondom_state = Blockly.Python.valueToCode(this, 'rondom_state', Blockly.Python.ORDER_ATOMIC) || 'None';
  Blockly.Python.definitions_['import_sklearn_train_test_split'] = 'from sklearn.model_selection import train_test_split';
  var code = 'train_test_split('+value_train_data+',test_size = '+value_test_size+',random_state = '+value_rondom_state+')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

//sklearn 初始化线性回归
Blockly.Python.sklearn_LinearRegression = function() {
  var value_model_name = Blockly.Python.valueToCode(this, 'model_name', Blockly.Python.ORDER_ATOMIC) || 'model';
  var value_fit_intercept = Blockly.Python.valueToCode(this, 'fit_intercept', Blockly.Python.ORDER_ATOMIC) || 'True';
  var value_normalize = Blockly.Python.valueToCode(this, 'normalize', Blockly.Python.ORDER_ATOMIC) || 'False';
  var value_n_jobs = Blockly.Python.valueToCode(this, 'n_jobs', Blockly.Python.ORDER_ATOMIC) || 'None';
  Blockly.Python.definitions_['import_sklearn_linear_model'] = 'from sklearn.linear_model import LinearRegression';
  var code = value_model_name+' = LinearRegression(fit_intercept = '+value_fit_intercept+',normalize = '+value_normalize+',n_jobs = '+value_n_jobs+')\n';
  return code;
};

//sklearn 初始化岭回归
Blockly.Python.sklearn_Ridge = function() {
  var value_model_name = Blockly.Python.valueToCode(this, 'model_name', Blockly.Python.ORDER_ATOMIC) || 'model';
  var value_alpha = Blockly.Python.valueToCode(this, 'alpha', Blockly.Python.ORDER_ATOMIC) || '1.0';
  var value_fit_intercept = Blockly.Python.valueToCode(this, 'fit_intercept', Blockly.Python.ORDER_ATOMIC) || 'True';
  var value_normalize = Blockly.Python.valueToCode(this, 'normalize', Blockly.Python.ORDER_ATOMIC) || 'False';
  var value_max_iter = Blockly.Python.valueToCode(this, 'max_iter', Blockly.Python.ORDER_ATOMIC) || '300';
  var value_random_state = Blockly.Python.valueToCode(this, 'random_state', Blockly.Python.ORDER_ATOMIC) || 'None';
  Blockly.Python.definitions_['import_sklearn_linear_model'] = 'from sklearn.linear_model import Ridge';
  var code = value_model_name+' = Ridge(alpha = '+value_alpha+',fit_intercept = '+value_fit_intercept+',normalize = '+value_normalize+',max_iter = '+value_max_iter+',random_state = '+value_random_state+')\n';
  return code;
};

//sklearn 初始化决策树 分类/回归算法
Blockly.Python.sklearn_DecisionTreeClassifier_Regressor = function() {
  var value_model_name = Blockly.Python.valueToCode(this, 'model_name', Blockly.Python.ORDER_ATOMIC) || 'model';
  var dropdown_type = this.getFieldValue('type');
  var value_max_depth = Blockly.Python.valueToCode(this, 'max_depth', Blockly.Python.ORDER_ATOMIC) || 'None';
  var value_random_state = Blockly.Python.valueToCode(this, 'random_state', Blockly.Python.ORDER_ATOMIC) || 'None';
  Blockly.Python.definitions_['import_sklearn_'+dropdown_type] = 'from sklearn.tree import '+dropdown_type;
  var code = value_model_name+' = '+dropdown_type+'(max_depth = '+value_max_depth+',random_state = '+value_random_state+')\n';
  return code;
};

Blockly.Python.sklearn_RandomForestClassifier_Regressor = function() {
  var dropdown_type = this.getFieldValue('type');
  var value_model_name = Blockly.Python.valueToCode(this, 'model_name', Blockly.Python.ORDER_ATOMIC) || 'Model';
  var value_n_estimators = Blockly.Python.valueToCode(this, 'n_estimators', Blockly.Python.ORDER_ATOMIC) || '100';
  var value_max_depth = Blockly.Python.valueToCode(this, 'max_depth', Blockly.Python.ORDER_ATOMIC) || 'None';
  var value_n_jobs = Blockly.Python.valueToCode(this, 'n_jobs', Blockly.Python.ORDER_ATOMIC) || 'None';
  var value_random_state = Blockly.Python.valueToCode(this, 'random_state', Blockly.Python.ORDER_ATOMIC) || 'None';
  Blockly.Python.definitions_['import_sklearn_'+dropdown_type] = 'from sklearn.ensemble import '+dropdown_type;  
  var code = value_model_name+' = '+dropdown_type+'(n_estimators = '+value_n_estimators+',max_depth = '+value_max_depth+',n_jobs = '+value_n_jobs+',random_state = '+value_random_state+')\n';
  return code;
};

//sklearn 初始化K近邻 分类/回归算法
Blockly.Python.sklearn_KNeighborsClassifier_Regressor = function() {
  var dropdown_type = this.getFieldValue('type');
  var value_model_name = Blockly.Python.valueToCode(this, 'model_name', Blockly.Python.ORDER_ATOMIC) || 'model';
  var value_K = Blockly.Python.valueToCode(this, 'K', Blockly.Python.ORDER_ATOMIC) || '5';
  var value_n_jobs = Blockly.Python.valueToCode(this, 'n_jobs', Blockly.Python.ORDER_ATOMIC) || 'None';
  Blockly.Python.definitions_['import_sklearn_'+dropdown_type] = 'from sklearn.neighbors import '+dropdown_type;
  var code = value_model_name+' = '+dropdown_type+'(n_neighbors = '+value_K+',n_jobs = '+value_n_jobs+')\n';
  return code;
};

//sklearn 初始化高斯贝叶斯分类算法
Blockly.Python.sklearn_GaussianNB = function() {
  var value_model_name = Blockly.Python.valueToCode(this, 'model_name', Blockly.Python.ORDER_ATOMIC) || 'model';
  Blockly.Python.definitions_['import_sklearn_GaussianNB'] = 'from sklearn.naive_bayes import GaussianNB';
  var code = value_model_name+' = GaussianNB()\n';
  return code;
};

//sklearn 初始K-均值聚类
Blockly.Python.sklearn_KMeans = function() {
  var value_model_name = Blockly.Python.valueToCode(this, 'model_name', Blockly.Python.ORDER_ATOMIC) || 'model';
  var value_n_clusters = Blockly.Python.valueToCode(this, 'n_clusters', Blockly.Python.ORDER_ATOMIC) || '8';
  var value_max_iter = Blockly.Python.valueToCode(this, 'max_iter', Blockly.Python.ORDER_ATOMIC) || '300';
  var value_random_state = Blockly.Python.valueToCode(this, 'random_state', Blockly.Python.ORDER_ATOMIC) || 'None';
  var value_n_jobs = Blockly.Python.valueToCode(this, 'n_jobs', Blockly.Python.ORDER_ATOMIC) || 'None';
  Blockly.Python.definitions_['import_sklearn_KMeans'] = 'from sklearn.cluster import KMeans';
  var code = value_model_name+' = KMeans(n_clusters = '+value_n_clusters+',max_iter = '+value_max_iter+',random_state = '+value_random_state+',n_jobs = '+value_n_jobs+')\n';
  return code;
};

//sklearn 训练模型
Blockly.Python.sklearn_fit = function() {
  var value_model_name = Blockly.Python.valueToCode(this, 'model_name', Blockly.Python.ORDER_ATOMIC) || 'model';
  var value_train_data = Blockly.Python.valueToCode(this, 'train_data', Blockly.Python.ORDER_ATOMIC) || 'X_train';
  var value_train_target = Blockly.Python.valueToCode(this, 'train_target', Blockly.Python.ORDER_ATOMIC) || 'y_train';
  if(value_train_target == 'None')
    var code = value_model_name+'.fit('+value_train_data+')\n';
  else
    var code = value_model_name+'.fit('+value_train_data+','+value_train_target+')\n';
  return code;
};

//sklearn 训练模型-无标签值
Blockly.Python.sklearn_fit_no_target = function() {
  var value_model_name = Blockly.Python.valueToCode(this, 'model_name', Blockly.Python.ORDER_ATOMIC) || 'model';
  var value_train_data = Blockly.Python.valueToCode(this, 'train_data', Blockly.Python.ORDER_ATOMIC) || 'X_train';
  var code = value_model_name+'.fit('+value_train_data+')\n';
  return code;
};

//sklearn 模型预测
Blockly.Python.sklearn_predict = function() {
  var value_model_name = Blockly.Python.valueToCode(this, 'model_name', Blockly.Python.ORDER_ATOMIC) || 'model';
  var value_train_data = Blockly.Python.valueToCode(this, 'train_data', Blockly.Python.ORDER_ATOMIC) || 'X_test';
  var code = value_model_name+'.predict('+value_train_data+')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

//sklearn 计算模型得分
Blockly.Python.sklearn_score = function() {
  var value_model_name = Blockly.Python.valueToCode(this, 'model_name', Blockly.Python.ORDER_ATOMIC) || 'model';
  var value_train_data = Blockly.Python.valueToCode(this, 'train_data', Blockly.Python.ORDER_ATOMIC) || 'X_train';
  var value_train_target = Blockly.Python.valueToCode(this, 'train_target', Blockly.Python.ORDER_ATOMIC) || 'y_train';
  if(value_train_target == 'None')
    var code = value_model_name+'.score('+value_train_data+')';
  else
    var code = value_model_name+'.score('+value_train_data+','+value_train_target+')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

//sklearn 计算模型得分-无标签值
Blockly.Python.sklearn_score_no_target = function() {
  var value_model_name = Blockly.Python.valueToCode(this, 'model_name', Blockly.Python.ORDER_ATOMIC) || 'model';
  var value_train_data = Blockly.Python.valueToCode(this, 'train_data', Blockly.Python.ORDER_ATOMIC) || 'X_train';
  var code = value_model_name+'.score('+value_train_data+')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

//sklearn 线性回归 模型获取 斜率/截距
Blockly.Python.sklearn_coef_intercept = function() {
  var value_model_name = Blockly.Python.valueToCode(this, 'model_name', Blockly.Python.ORDER_ATOMIC) || 'model';
  var dropdown_type = this.getFieldValue('type');
  var code = value_model_name+'.'+dropdown_type;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

//sklearn K-均值聚类 模型获取 簇中心坐标/聚类后的标签/所有点到对应簇中心的距离平方和
Blockly.Python.sklearn_cluster_centers_labels_inertia = function() {
  var value_model_name = Blockly.Python.valueToCode(this, 'model_name', Blockly.Python.ORDER_ATOMIC) || 'model';
  var dropdown_type = this.getFieldValue('type');
  var code = value_model_name+'.'+dropdown_type;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

//sklearn 保存/加载模型
Blockly.Python.sklearn_save_load_model = function() {
  var value_model_name = Blockly.Python.valueToCode(this, 'model_name', Blockly.Python.ORDER_ATOMIC) || 'model';
  var dropdown_type = this.getFieldValue('type');
  var value_address = Blockly.Python.valueToCode(this, 'address', Blockly.Python.ORDER_ATOMIC) || 'D:/mixly/test.pkl';
  Blockly.Python.definitions_['import_sklearn_joblib'] = 'from sklearn.externals import joblib';
  var code = '';
  if(dropdown_type == 'dump')
    code = 'joblib.dump('+value_model_name+','+value_address+')\n';
  else
    code = value_model_name+' = joblib.load('+value_address+')\n';
  return code;
};