import config from "@/config"
//import { config } from 'core/config';
export function get(url,data){
    request(url,data,"Get")
}
export function post(url,data){
    request(url,data,"Post")
}

function request(url,data,methods){
    return new Promise((resolve,rejects)=>{
        wx.request({
            data,
            methods,
            url:config.host+url,
            success:function(res){
                if(res.data.code==0){
                    resolve(res.data)
                }else {
                    rejects(res.data)
                }
                
            }
        })
    })
}