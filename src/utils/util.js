export default {
    /**
     * 为对象数组创建排序函数（升序）
     * @param {*} propertyName 指定按什么属性名排序
     */
    createComparisonFunction(propertyName) {
        return function (obj1, obj2) {
            let value1 = obj1[propertyName]
            let value2 = obj2[propertyName]
            console.log(value1, value2)
            if (value1 > value2) {
                return 1
            } else if (value2 > value1) {
                return -1
            } else {
                return 0
            }
        }
    },
    /**
     * 
     * @param {*} fun 需要做节流的函数
     * @param {*} delay 每次触发的间隔时间
     */
    throttle(fun, delay){
        let lastTime = 0    //记录函数上一次的触发时间
        return function (){ //利用闭包
            let nowTime = Date.now()
            if(nowTime - lastTime > delay){
                console.log(this)
                fun.call(this)  //修正this指向
                lastTime = nowTime
            }
        }
    },

    /**
     * 
     * @param {*} fun 需要防抖的函数
     * @param {*} delay 每次触发的间隔时间
     */
    debounce(fun, delay){
        let timer = null    //清除上一次定时器
        return function(){
            clearTimeout(timer)
            timer = setTimeout(() => {  //记录新的定时器
                fun.call(this)
            }, delay)
        }
        
    }
}