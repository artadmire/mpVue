<template>
  <div class="container" >

    <div class="userinfo" @click="login" >
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
       {{ userInfo.nickName }}
      </div>
      <YearProgress></YearProgress>
      <button v-if="userInfo.openId" @click="scanCode">添加图书</button>
    </div>

    <!-- <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div> -->

    <!-- <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a> -->
  </div>
</template>

<script>
import YearProgress from '@/components/YearProgress'
import qcloud from "wafer2-client-sdk"
import utils from "@/utils"
import { get,post} from "@/utils/request"
import config from "@/config"
// import card from '@/components/card'
export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {
        avatarUrl:"../../../static/img/unlogin.png",
        nickName:"点击登录"
      }
    }
  },

  components: {
    YearProgress
  },
  created () {
    // 调用应用实例的方法获取全局数据
    //this.getUserInfo()
    this.userInfo = wx.getStorageSync("userinfo")
   // console.log(this.userInfo)
  },
  methods: {
   async addBook(isbook){
      let  wip = await post("/weapp/addbook",{
        isbook,
        openId:this.userInfo.openId
      })
      console.log(wip)
      if(wip.code == 0&&res.data.title){
        utils.showSuccess(data.title+"添加成功")
      }
    },
    scanCode(){
      wx.scanCode({
        success:function(res){
          if(res.result) {
            this.addBook(res.result)
          }
          console.log(res)
      }})
    },
    // bindViewTap () {
    //   const url = '../logs/main'
    //   wx.navigateTo({ url })
    // },
    getUserInfo () {
      // 调用登录接口
      // wx.login({
      //   success: () => {
      //     wx.getUserInfo({
      //       success: (res) => {
      //         this.userInfo = res.userInfo
      //         //console.log(res)
      //       }
      //     })
      //   }
      // })
    },
    login () {
      let user = wx.getStorageSync("userinfo")
      let self = this
      if(!user) {
          qcloud.setLoginUrl(config.loginUrl);
          qcloud.login({
            success:function(userinfo){
              console.log("登录成功",userinfo)
              utils.showSuccess("登录成功")
              wx.setStorageSync("userinfo",userinfo)
              self.userInfo = userinfo
            },
            fail:function(err){
              console.log("登录失败",err)
            }
        })
      }
      //console.log('clickHandle:', msg, ev)
    }
  },

  
}
</script>

<style lang="scss" scoped>
.userinfo {
  width:100%;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
.container {
  width:100%;
  padding: 0 20px;
  overflow: hidden;
}
button {
  width:100%;
  box-sizing: border-box;
 
}
</style>
