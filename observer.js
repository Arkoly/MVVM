class Observer {
    constructor(data){
        this.observe(data);
    }

    observe(data) {
        if(!data || typeof data !== 'object') {
            return
        }

        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
            this.observe(data[key])
        })
    }
    defineReactive(obj, key, value){
        let that = this
        let dep = new Dep();
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                dep.target && dep.addSub(Dep.target)
                return value
            },
            set(newValue){
                if(newValue !== value) {
                    that.observe(value)
                    value = newValue
                    Dep.notify();
                }
            }
        })
    }
}

class Dep {
    constructor(){
        this.subs = []
    }
    addSub(watcher){
        this.subs.push(watcher)
    }
    notify(){
        this.subs.forEach(watcher=>watcher.update())
    }
}