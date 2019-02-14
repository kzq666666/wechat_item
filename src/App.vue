<template>
  <div id="app">
    <div id="menu">
      <div class="title"> 
        <img id="vip" src="./assets/vip.png" alt="">
        <span>日上会员</span>
      </div>
      <div class="mainPage menuContent" :class="{active:curPage =='main'}" @click="goMainPage">
        <img src="./assets/main.png" alt="">
        <span>首页</span>
      </div>
       <div class="setting menuContent" :class="{active:curPage =='add'}" @click="goAdd">
        <img src="./assets/add.png" alt="" id="addImage">
        <span>添加</span>
      </div>
      <div class="setting menuContent" :class="{active:curPage =='setting'}" @click="goSetting">
        <img src="./assets/setting.png" alt="">
        <span>设置</span>
      </div>
    </div>
    <div id="panel">
      <div  class="l-icon-more-outline menuBut" @click="slide">≡</div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Slideout from 'slideout'
export default {
  name: 'app',
  data(){
    return{
      curPage:'main',
      slideout:''
    }
  },
  methods:{
    goMainPage(){
       this.curPage = 'main';
       this.$router.push('/');
    },
    goAdd(){
      this.curPage = 'add';
      this.$router.push('/add');
    },
    goSetting(){
      this.curPage = 'setting';
      this.$router.push('/setting');
    },
    slide(){
      this.slideout.toggle();
    }
  },
  mounted(){
    var padding = document.body.clientWidth * 0.4;
    this.slideout = new Slideout({
      'panel': document.getElementById('panel'),
      'menu': document.getElementById('menu'),
      'padding': padding,
      'tolerance': 70
    });
    this.slideout.disableTouch();

  }
  
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}

html,body,#app{
  width: 100%;
  height: 100%;
  touch-action:none;
}

#menu{
  height: 100%;
  background: #f7f7f9;
  width:40%;
  text-align: center;
}
.menuBut{
  position: absolute;
  width: 2rem;
  left: 1rem;
  text-align: center;
  font-size: 2.5rem;
  color: #fff;
  height: 4rem;
  line-height: 4rem;
  transform: scale(1.3,1)
}
#vip{
  width: 2rem;
  vertical-align: middle;
}
#addImage{
  width: 1.3rem;
  vertical-align: middle;
}
img{
  width: 1rem;
  margin-right: 0.3rem;
  vertical-align:baseline;
}
.title{
  height: 4rem;
  font-size: 1.3rem;
  line-height: 4rem;
  border-bottom: 1px solid #ddd;
  background: linear-gradient(to top, #f2994a, #f2c94c);

}

.menuContent{
  height: 4rem;
  line-height: 4rem;
  font-size: 1.25rem;
  border-bottom: 1px solid #ddd;
  
}
#panel{
  width: 100%;
  height: 100%;
  box-shadow: -1px -1px 10px rgba(0,0,0,0.25); 

}
.slideout-menu {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: none;
}

.slideout-panel {
  position:relative;
  z-index: 1;
}

.slideout-open,
.slideout-open body,
.slideout-open .slideout-panel {
  overflow: hidden;
}

.slideout-open .slideout-menu {
  display: block;
}

.active{
  color: #f40;
}
</style>
