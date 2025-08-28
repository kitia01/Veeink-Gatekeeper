<template>
  <div class="container">
    <div v-if="site" class="card">
      <h2>{{ site.title }}</h2>
      <input v-model="password" type="password" placeholder="请输入密码" class="input" />
      <button @click="verify" class="btn">确认</button>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
    <div v-else class="card">
      <p>站点不存在</p>
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
</script>

<style>
/* 页面美化样式 */
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%);
}
.card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 32px 24px;
  min-width: 320px;
  max-width: 90vw;
  text-align: center;
}
.input {
  width: 80%;
  padding: 10px;
  margin: 16px 0;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
}
.input:focus {
  border-color: #6366f1;
}
.btn {
  background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 32px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(99,102,241,0.08);
  transition: background 0.2s;
}
.btn:hover {
  background: linear-gradient(90deg, #60a5fa 0%, #6366f1 100%);
}
.error {
  color: #ef4444;
  margin-top: 12px;
  font-size: 15px;
}
</style>
