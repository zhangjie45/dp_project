<!--
  页面类型:
  文件名:index
  菜单路径:
  功能描述:
  创建时间:2024-11-11 15:34:33
-->
<template>
  <div class="body">
    <div class="container-header">
      <ul class="nowTime">
        <li></li>
        <li></li>
      </ul>
      <div class="location">
        <i class="icon iconfont icon-buoumaotubiao23"></i>
        <span class="areaName"></span>
      </div>
      <h3>***平台</h3>
    </div>
    <div class="container-content">
      <div class="top">
        <div class="count-base">
          <div class="com-count-title">标题一</div>
          <div class="com-screen-content">
            <div id="main1" style="width: 100%; height: 300px">
              <Model1 />
            </div>
          </div>
          <span class="left-top"></span>
          <span class="right-top"></span>
          <span class="left-bottom"></span>
          <span class="right-bottom"></span>
        </div>
        <div class="count-resource q1">
          <div class="com-count-title">标题二</div>
          <div class="com-screen-content2">
            <ul class="use-data">
              <li>
                <p class="data-count">15681</p>
                <span class="data-name">数据总量</span>
              </li>
              <li>
                <p class="data-count">1731</p>
                <span class="data-name">更新量</span>
              </li>
              <li>
                <p class="data-count">11753</p>
                <span class="data-name">共享次数</span>
              </li>
            </ul>
            <div class="com-screen-content">
              <div id="main2" style="margin-top: 10px; width: 100%; height: 240px">
                <Model2 />
              </div>
            </div>
            <span class="left-top"></span>
            <span class="right-top"></span>
            <span class="left-bottom"></span>
            <span class="right-bottom"></span>
          </div>
        </div>
        <div class="count-resource q2">
          <div class="com-count-title">标题三</div>

          <div class="com-screen-content">
            <Model3 />
          </div>
          <span class="left-top"></span>
          <span class="right-top"></span>
          <span class="left-bottom"></span>
          <span class="right-bottom"></span>
        </div>
      </div>

      <div class="mid">
        <div class="count-share w1">
          <div class="com-count-title">标题四</div>
          <div class="com-screen-content">
            <Model4 />
          </div>
          <span class="left-top"></span>
          <span class="right-top"></span>
          <span class="left-bottom"></span>
          <span class="right-bottom"></span>
        </div>
        <div class="count-share w2">
          <div class="com-count-title">标题五</div>
          <div class="com-screen-content">
            <div id="main5" style="width: 100%; height: 300px">
              <Model5 />
            </div>
          </div>
          <span class="left-top"></span>
          <span class="right-top"></span>
          <span class="left-bottom"></span>
          <span class="right-bottom"></span>
        </div>
      </div>

      <div class="bottom">
        <div class="count-topic e1">
          <div class="com-count-title">标题六</div>
          <div class="com-screen-content">
            <div id="main6" style="width: 100%; height: 300px"></div>
          </div>
          <span class="left-top"></span>
          <span class="right-top"></span>
          <span class="left-bottom"></span>
          <span class="right-bottom"></span>
        </div>
        <div class="count-topic e2">
          <div class="com-count-title">标题七</div>
          <div class="com-screen-content">
            <div id="main7" style="width: 100%; height: 300px"></div>
          </div>
          <span class="left-top"></span>
          <span class="right-top"></span>
          <span class="left-bottom"></span>
          <span class="right-bottom"></span>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script setup>
import Model1 from './components/model1.vue';
import Model2 from './components/model2.vue';
import Model3 from './components/model3.vue';
import Model4 from './components/model4.vue';
import Model5 from './components/model5.vue';
</script>

<style lang="scss" scoped>
.body {
  background: #081325 url('../../assets/image/dataPick2images/interact.png') center no-repeat;
  background-size: cover;
}
div {
  box-sizing: border-box;
}

.clearfix {
  clear: both;
}
.container-header {
  width: 100%;
  height: 74px;
  text-align: center;
  box-sizing: border-box;
}
.container-header .nowTime {
  position: absolute;
  left: 20px;
  top: 41px;
  font-size: 0;
}
.container-header .nowTime li {
  display: inline-block;
  width: 140px;
  height: 40px;
  font-size: 30px;
  color: #fff;
}
.nowTime li {
  display: inline-block;
  float: left;
  /*font-weight: 800;*/
  background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#fff), to(#5ec0d2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.nowTime li div {
  background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#fff), to(#5ec0d2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 16px;
  text-align: left;
}
.nowTime li p {
  background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#fff), to(#5ec0d2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 16px;
}
.container-header .location {
  position: absolute;
  right: 17px;
  top: 46px;
}
.location i {
  font-size: 18px;
  font-weight: 800;
  color: #7e9bc6;
}
.location span {
  font-size: 20px;
  line-height: 30px;
  color: #168fcd;
}

.container-header h3 {
  line-height: 74px;
  font-size: 2.5vw;
  font-weight: 800;
  color: #fff;
}

/* 边角 */
.left-top,
.right-top,
.left-bottom,
.right-bottom {
  position: absolute;
  width: 13px;
  height: 13px;
}
.left-top {
  left: 0;
  top: 0;
  border-left: solid 2px #045291;
  border-top: solid 2px #045291;
}
.right-top {
  right: 0;
  top: 0;
  border-right: solid 2px #045291;
  border-top: solid 2px #045291;
}
.left-bottom {
  left: 0;
  bottom: 0;
  border-left: solid 2px #045291;
  border-bottom: solid 2px #045291;
}
.right-bottom {
  right: 0;
  bottom: 0;
  border-right: solid 2px #045291;
  border-bottom: solid 2px #045291;
}

.resource-right .com-count-title {
  font-size: 16px;
  margin-left: 10px;
}
.com-count-title {
  color: #1bb4f9;
  padding: 20px;
  font-size: 22px;
}
.com-screen-content {
  width: 100%;
  height: auto;
}
.com-screen-content2 {
  width: 100%;
  height: auto;
}
.filter-type {
  font-size: 0;
}
.filter-type li:hover {
  cursor: pointer;
}
.filter-type li {
  display: inline-block;
  width: 120px;
  line-height: 40px;
  font-family: myFirstFont;
  font-size: 20px;
  text-align: center;
  color: #024f9b;
  border: solid 1px #075797;
  background: #0d2343;
}
.filter-type li.active {
  color: white;
  background: #0c182d;
  border: solid 1px #1bb9f9;
}

.container-content {
  padding: 10px 20px;
  box-sizing: border-box;
}
.count-base,
.count-resource,
.count-share,
.count-topic {
  position: relative;
  padding: 20px;
  margin-top: 10px;
  box-sizing: border-box;
}
.com-count-title {
  color: #1bb4f9;
  font-size: 18px;
  padding: 0;
}
.count-base {
  margin-left: 10px;
  float: left; /*浮动*/
  width: 32%;
  height: 350px;
  background: url('../../assets/image/dataPick2images/left-top3.jpg') center no-repeat;
  background-size: cover;
}
.count-resource {
  margin-left: 10px;
  float: left;
  width: 32%;
  height: 350px;
  background: url('../../assets/image/dataPick2images/left-top3.jpg') center no-repeat;
  background-size: cover;
}
.count-share {
  margin-left: 10px;
  float: left;
  width: 48.4%;
  height: 350px;
  background: url('../../assets/image/dataPick2images/left-bottom2.jpg') center no-repeat;
  background-size: cover;
}

.count-topic {
  margin-left: 10px;
  float: left;
  width: 48.4%;
  height: 350px;
  background: url('../../assets/image/dataPick2images/left-bottom2.jpg') center no-repeat;
  background-size: cover;
}
.data-label {
  position: absolute;
  top: 20px;
  right: 10px;
}
.data-label li {
  float: left;
  width: 120px;

  text-align: center;
  font-size: 18px;
  color: #828c9d;
}
.data-label li:hover,
.data-label li.active {
  color: #fff;
  background: url('../../assets/image/dataPick2images/choose-item.png') center no-repeat;
}

* {
  margin: 0px;
  padding: 0px;
  font-family: '微软雅黑';
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
li {
  list-style: none;
}
img {
  border: none;
}
a {
  text-decoration: none;
}

.topRec_List dl,
.maquee {
  width: 90%;
  overflow: hidden;
  margin: 0 auto;
  color: #f0ece2;
}
.topRec_List dd {
  float: left;
  text-align: left;
  border-bottom: 1px solid #1b96ee;
  color: #1b96ee;
  font-size: 14px;
}
.topRec_List dl dd:nth-child(1) {
  width: 50%;
  height: 40px;
  line-height: 40px;
}
.topRec_List dl dd:nth-child(2) {
  width: 30%;
  height: 40px;
  line-height: 40px;
}
.topRec_List dl dd:nth-child(3) {
  width: 20%;
  height: 40px;
  line-height: 40px;
}

.maquee {
  height: 195px;
}
.topRec_List ul {
  width: 100%;
  height: 195px;
}
.topRec_List li {
  width: 100%;
  height: 38px;
  line-height: 38px;
  text-align: left;
  font-size: 12px;
  color: #76dbd1;
}
/*.topRec_List li:nth-child(2n){ background:#077cd0}*/
.topRec_List li div {
  float: left;
}
.topRec_List li div:nth-child(1) {
  width: 50%;
}
.topRec_List li div:nth-child(2) {
  width: 30%;
}
.topRec_List li div:nth-child(3) {
  width: 20%;
}

.use-data {
  text-align: center;
  padding: 2px 0;
  margin-top: 3%;
  height: 5%;
  background: url('../../assets/image/dataPick2images/resource-use-data.jpg') center no-repeat;
  background-size: cover;
  border: solid 1px #093552;
  border-right: 0px;
  border-left: 0;
}
.use-data li {
  width: 30%;
  font-size: 0;
  display: inline-table;
  border-right: solid 1px #1f4191;
}
.use-data li:last-child {
  border-right: 0;
}
.use-data .data-count {
  color: #fff;
  font-family: myFirstFont;
  height: 1%;
  font-size: 16px;
}
.use-data .data-name {
  color: #1bb9f9;
  font-size: 16px;
}
</style>
