class Complie{
    constructor(){
        
    }
    getVal(vm, expr) {
        expr = expr.split('.');
        return expr.reduce((prev, next) => {
            return prev[next]
        }, vm.$data)
    }
    getTextVal(vm ,expr){
        return expr.replace(/\{\{([^}+])\}\}/g, (...arguments) => {
            return this.getVal(vm, arguments[1])
        })
    }
    text(node, vm ,expr){
        let updateFn = this.updater['textUpdater'];
        let value = this.getTextVal(vm, expr)
        expr.replace(/\{\{([^}+])\}\}/g, (...arguments) => {
            new Watcher(vm, arguments[1], (newValue) => {
                updateFn && updateFn(node, this.getTextVal(vm, expr));
            })
        })
        updateFn && updateFn(node, value);

    }
    setVal(vm, expr, value){
        expr = expr.split('.')
        return expr.reduce((prev, next, currentIndex) => {
            if(currentIndex === expr.length-1){
                return prev[next] = value;
            }
            return prev[next]
        }, vm.$data)
    }
    model(node, vm ,expr) {
        let updateFn = this.updater['modelUpdater'];
        new Watcher(vm, expr, (newValue) => {
            updateFn && updateFn(node, this.getVal(vm, expr));
        })
        node.addEventListener('input', e=>{
            let newValue = e.target.value
            this.setVal(vm, expr, newValue)
        })

        updateFn && updateFn(node, this.getVal(vm, expr));
        
    }
}