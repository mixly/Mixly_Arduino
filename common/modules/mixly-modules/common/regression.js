goog.loadJs('common', () => {

goog.require('Mixly');
goog.provide('Mixly.Regression');

class Regression {
    constructor() {
        this.x = [];
        this.y = [];
        this.n = 0;
        this.beta = 1;
        this.alpha = 0;
    }
    /**
   * 适配
   * @param {Array} x 
   * @param {Array} y 
   */
    fit(x, y) {
        this.x = x;
        this.y = y;
        this.n = x.length;
        this.beta = this.getBeta();
        this.alpha = this.getAlpha(this.beta);
    }
    /**
   * 预测
   * @param {Array}  x 数据集
   * @returns {Array} 预测结果数据集
   */
    predict(x) {
        if (!Array.isArray(x)) x = [x];
        const y = [];
        for (const num of x) {
            y.push(this.alpha + num * this.beta);
        }
        return y;
    }
    /**
   * 获取beta
   * @returns {Number}  斜率
   */
    getBeta() {
        const beta = (this.sum(this.x, (v, k) => v * this.y[k]) * this.n
            - this.sum(this.x) * this.sum(this.y)) /
            (this.sum(this.x, (v) => v * v) * this.n
                - Math.pow(this.sum(this.x), 2));
        return beta;
    }
    /**
   * 获取alpha
   * @param {Number} beta 斜率
   * @returns {Number}  偏移量
   */
    getAlpha(beta) {
        return this.avg(this.y) - this.avg(this.x) * beta;
    }
    /**
   * 求和(Σ)
   * @param {Array} arr 数字集合
   * @param {Function}  fun 每个集合的操作方法
   */
    sum(arr, fun = (v, k) => v) {
        let s = 0;
        const operate = fun;
        for (let i = 0; i < arr.length; i++) {
            let num = arr[i];
            s += operate(num, i);
        }
        return s;
    }
    /**
   * 均值
   * @param {Array} arr 数字集合
   */
    avg(arr) {
        const s = this.sum(arr);
        return s / arr.length;
    }
}

Mixly.Regression = Regression;

});