class MVVM {
    constructor(options){
        this.$el = optins.el;
        this.$data = options.data;
        if(this.$el){
            new Observer(this.$data)
            this.proxyData(this.$data)
            new Complie(this.$el, this)
        }
    }

    proxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                get() {
                    return data[key]
                },
                set(newValue) {
                    data[key] = newValue
                }
            })
        })
    }
}