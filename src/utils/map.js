export function loadBMap(ak) {
    return new Promise(function (resolve, reject) {
        if (typeof BMap !== 'undefined') {
            console.log('BMap already loaded')

            resolve(window.BMapGL)
            return true
        }
        window.onBMapCallback = function () {
            console.log('BMap loaded successfully')
            console.log(window.BMapGL)

            resolve(window.BMapGL)
        }
        let script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'http://api.map.baidu.com/api?type=webgl&v=1.0&ak=Gnu3oHDw9DrreMmAkQvSY8DixEB4Q5vS&__ec_v__=20190126&callback=onBMapCallback'
        // script.src = 'https://api.map.baidu.com/getscript?v=3.0&ak=Gnu3oHDw9DrreMmAkQvSY8DixEB4Q5vS'
        script.onerror = reject
        document.head.appendChild(script)
    })
}
