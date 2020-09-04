
function setGetter(key, fn){
    return Object.defineProperty(this, key, { get: function(){
        return fn(this)
    }})
}

export {
    setGetter
}