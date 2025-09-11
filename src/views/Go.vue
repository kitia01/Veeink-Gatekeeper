<template>
  <div class="big_box">
    <div class="box">
      <h2>{{ site ? site.title : '受保护站点' }}</h2>
      <form @submit.prevent="verify">
        <div v-if="site || feature">
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

// 新增支持 feature（前端会传 ?feature=xxx）
const feature = route.query.feature;
// 回传目标域从环境变量读取（不设默认值）
const TARGET_ORIGIN = import.meta.env.VITE_GATE_TARGET_ORIGIN;

const password = ref('');
const error = ref('');

// 弹窗模式：向 opener 回传结果
function sendResult(ok) {
  try {
    if (window.opener && feature && TARGET_ORIGIN) {
      window.opener.postMessage(
        { type: 'gate-verify', feature, ok },
        TARGET_ORIGIN
      );
    }
  } catch (e) {
    // 忽略跨域/窗口不可用错误
  }
}

// 自动跳转已验证过的站点
if (site && localStorage.getItem(`auth_${siteId}`) === 'ok') {
  // 若已验证且不是 feature 弹窗场景，直接跳转
  if (!feature || !window.opener) {
    window.location.href = site.url;
  }
}

function verify() {
  if (password.value === import.meta.env.VITE_SITE_PASSWORD) {
    localStorage.setItem(`auth_${siteId}`, 'ok');
    if (window.opener && feature) {
      // 弹窗模式：回传成功并关闭窗口
      sendResult(true);
      window.close();
    } else if (site) {
      // 独立访问且存在站点：跳转
      window.location.href = site.url;
    } else {
      // 无站点且非弹窗：不跳转，仅提示
      error.value = '验证成功，但缺少站点参数，无法跳转';
    }
  } else {
    error.value = '密码错误，请重试';
  }
}

// 可选：用户关闭/刷新弹窗时也回传失败，防止无响应
if (feature && window.opener) {
  window.addEventListener('beforeunload', () => {
    sendResult(false);
  });
}
</script>


<style>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}
.big_box {
  min-height: 100vh;
  min-width: 100vw;
  overflow: hidden;
  border: 1px solid transparent;
  background-image: url("https://imgbed.3865472.xyz/file/1756413348168_Gy-w-QFWoAAG3hY.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
}
.box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  max-width: 90vw;
  padding: 24px;
  background: rgba(255,255,255,0.45);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}
.box h2 {
  margin: 0 0 24px;
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
  margin-bottom: 20px;
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
