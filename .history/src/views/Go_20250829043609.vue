<template>
  <div class="big_box">
    <div class="box">
      <h2>{{ site ? site.title : '受保护站点' }}</h2>
      <form @submit.prevent="verify">
        <div v-if="site">
          <div class="inputBox">
            <input type="password" v-model="password" required />
            <label>密码</label>
          </div>
          <input type="submit" value="确认" />
          <p v-if="error" class="error">{{ error }}</p>
        </div>
        <div v-else>
          <p style="color:#fff">站点不存在</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import siteLinks from '../assets/siteLinks.json';


const route = useRoute();
// 优先 path 参数，其次 query 参数
const siteId = route.params.site || route.query.site;
const site = siteLinks.find(s => s.id === siteId);

const password = ref('');
const error = ref('');

// 自动跳转已验证过的站点
if (site && localStorage.getItem(`auth_${siteId}`) === 'ok') {
  window.location.href = site.url;
}

function verify() {
  if (password.value === import.meta.env.VITE_SITE_PASSWORD) {
    localStorage.setItem(`auth_${siteId}`, 'ok');
    window.location.href = site.url;
  } else {
    error.value = '密码错误，请重试';
  }
}
</script>


<style>
/* 登录界面美化样式 */
.big_box {
  height: 100vh;
  border: 1px solid transparent;
  background-image: url("https://imgbed.3865472.xyz/file/1756413348168_Gy-w-QFWoAAG3hY.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
}
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  padding: 40px;
  background: rgba(255,255,255,0.45);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}
.box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}
.box .inputBox {
  position: relative;
}
.box .inputBox input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  letter-spacing: 1px;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.box .inputBox label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  letter-spacing: 1px;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}
.box .inputBox input:focus ~ label,
.box .inputBox input:valid ~ label {
  top: -18px;
  left: 0;
  color: #03a9f4;
  font-size: 12px;
}
.box input[type="submit"] {
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  background: #03a9f4;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}
.error {
  color: #ef4444;
  margin-top: 12px;
  font-size: 15px;
}
</style>
