import Axios from 'axios';


function get(url){
    let res = Axios.get(url)
    return res
} 

export { get }