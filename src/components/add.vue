<template>
  <div class="addPage">
    <div class="info">添加商品</div>
    <div class="addContent">
        <div class="addOne">
            <span>单个添加：</span>
            <input type="text" v-model="addForm.abiid">
            <el-button type="primary" @click="submitItem">添加</el-button>

        </div>
        <div class="addMore">
            <span>批量添加：</span>
            <input type="file" name="" id="">
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        addForm:{
            abiid:null
        }
    }
  },
  methods:{
      submitItem(){
          this.$http.post(this.$http.url+'/api/commodity/info',this.addForm).then(
              (res)=>{
                  if(res.data.code==0){
                      alert('添加成功');
                      this.addForm.abiid = null;
                  }else{
                      alert('添加失败');
                      this.addForm.abiid = null;
                  }
              }
          )
      }
  }
};
</script>

<style scoped>
.addPage {
  width: 100%;
  height: 100%;
  background: #fbfbfb;
}
.addPage .info {
  background: #f56c6c;
}
.addContent{
    width: 93%;
    margin: 2rem auto;
}
.addOne,.addMore{
    display: flex;
    width: 100%;
    height: 2.5rem;
    margin-bottom: 3rem;
    align-items: center;
}
span{
    display: inline-block;
    width: 30%;
    height: 2.5rem;
    text-align: center;
    line-height: 2.5rem;
    font-size: 1.2rem;
}
input{
    width: 35%;
    padding: 0.5rem;
    font-size: 1rem;
    margin-right: 1rem;
}
.addMore input{
    width: 60%;

}

</style>