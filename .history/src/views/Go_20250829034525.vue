<template>
  <div v-if="site">
    <h2>访问受保护站点：{{ site.title }}</h2>
    <input v-model="password" type="password" placeholder="请输入密码" />
    <button @click="verify">确认</button>
    <p style="color:red">{{ error }}</p>
  </div>
  <div v-else>
    <p>站点不存在</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import siteLinks from '../assets/siteLinks.json';

const route = useRoute();
const siteId = route.query.site;        // 获取 URL 参数
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
