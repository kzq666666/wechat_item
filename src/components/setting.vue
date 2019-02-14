<template>
  <div class="setting">
    <div class="info">设置</div>

    <div class="formPart" @click="getFocus">
      <div>
        <span class="spanText">邮箱设置：</span>
        <input type="text" @blur="inputBlur" v-model="formEmail.smtpreceiver">
      </div>
      <div>
        <span class="spanText">账号：</span>
        <input type="text" @blur="inputBlur" v-model="formEmail.smtpuser">
      </div>
      <div>
        <span class="spanText">授权码：</span>
        <input type="text" @blur="inputBlur" v-model="formEmail.smtppass">
      </div>
      
    </div>
    <div class="button">
      <el-button type="primary" @click="submitSetting">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
          formEmail:{
            smtpuser:null,
            smtppass:null,
            smtpreceiver:null
          }
        }
    },
    methods:{
        getFocus(e){
            var e = e || window.event;
            var target = e.target || e.srcElement;
            target.parentNode.children[1].focus();
            target.parentNode.classList.add('activeDiv')
        },
        inputBlur(e){
            var e = e || window.event;
            var target = e.target || e.srcElement;
            target.parentNode.classList.remove('activeDiv')
        },
        submitSetting(){
          this.$http.put(this.$http.url + '/api/notification/email',this.formEmail).then(
            (res)=>{
              if(res.data.code == 0){
                alert('保存成功');
                this.$router.push('/setting');
              }else{
                alert('保存失败')
              }
            }
          )
        }
    },
    created(){
      this.$http.get(this.$http.url+'/api/notification/email').then(
        (res)=>{
          this.formEmail.smtpuser = res.data.data.smtpuser;
          this.formEmail.smtppass = res.data.data.smtppass;
          this.formEmail.smtpreceiver = res.data.data.smtpreceiver;

        }
      )
    }
};
</script>

<style scoped>
.setting {
  width: 100%;
  height: 100%;
  background: #fff;
}
.info{
  padding-left: 3rem;
  height: 4rem;
  line-height: 4rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-bottom: 1px solid #fbfbfb;
  background: rgb(85, 151, 236);
  color: #fff;
  margin-bottom: 2rem;
}


.setting .formPart div {
    box-sizing: border-box;
    width: 100%;
    height: 3rem;
    display: flex;
    border-bottom: 1px solid #ddd;
    margin-bottom: 1rem 
}

.setting .spanText {
  display: inline-block;
  width: 30%;
  height: 3rem;
  margin-left: 2rem;
  line-height: 3rem;
  font-size: 1.2rem;
}

.setting input {
  display: inline-block;
  width: 60%;
  height: 100%;
  line-height: 3rem;
  border: none;
  font-size: 1.2rem;
  outline: none;
}

.setting .formPart .activeDiv{
    border-bottom: 2px solid rgb(85, 151, 236)
}
.button{
  width: 100%;
  text-align: center;
  margin-top: 3rem;
}
.button button{
  font-size: 1.1rem;
}

</style>