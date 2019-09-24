import Interface from '../config/interface.js'
export default {
    
    imgUrlFilter(value){    
        let apiAddr = Interface.apiAddr
        apiAddr = apiAddr.substring(0, apiAddr.length-1)
        return apiAddr + value
    }
}