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
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                return value
            },
            set(newValue){
                if(newValue !== value) {
                    that.observe(value)
                    value = newValue
                }
            }
        })
    }
}