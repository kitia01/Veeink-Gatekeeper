# Veeink-Gatekeeper

基于 Vue3 + Vite 的受保护站点中转页项目，可用于密码验证后跳转到指定站点，适合部署到 Vercel、GitHub Pages 等静态托管平台。

## 功能简介
- 支持多站点密码保护跳转
- 站点信息配置于 `src/assets/siteLinks.json`
- 密码通过环境变量 `.env` 管理，安全性高
- 支持路径参数和 query 参数两种访问方式
- 登录界面美观，支持自定义背景
- 跨域弹窗校验与授权回传（验证网关 Gate 弹窗校验）：父站发起验证，Gate 页口令通过后以 `postMessage` 回传，父站据此解锁受保护功能（目标域由 `VITE_GATE_TARGET_ORIGIN` 配置）

## 目录结构
```
gate/
├── public/                   # 公共静态资源
├── src/
│   ├── assets/
│   │   └── siteLinks.json    # 受保护站点信息
│   ├── views/
│   │   └── Go.vue            # 中转页组件
│   ├── App.vue
│   └── main.js
├── .env                      # 密码环境变量
├── package.json
└── vite.config.js
```

## 本地使用方法
1. 安装依赖
   ```bash
   npm install
   ```
2. 启动开发环境
   ```bash
   npm run dev
   ```
3. 访问方式
   - `/go?site=blog` 或 `/blog` 进入 blog 站点验证页,输入密码后自动跳转目标站点
   - (新功能)弹窗校验回传：父站打开 `https://<your-gate>/go?feature=xxx`，Gate 校验成功后向 `VITE_GATE_TARGET_ORIGIN` 回传 `{ type: 'gate-verify', feature: 'xxx', ok: true }`

## 站点配置
编辑 `src/assets/siteLinks.json`，格式如下：
```json
[
  {
    "id": "blog",
    "title": "博客",
    "url": "https://blog.example.com"
  },
  {
    "id": "shop",
    "title": "商城",
    "url": "https://shop.example.com"
  }
]
```

## 密码配置
- 本地开发：在 `.env` 文件设置 `VITE_SITE_PASSWORD=你的密码`
- Vercel 部署：在环境变量中添加 `VITE_SITE_PASSWORD`
- Cloudflare 部署：在环境变量中添加 `VITE_SITE_PASSWORD`

## 部署支持
- 已支持部署到 Vercel 或 Cloudflare Pages
- `vite.config.js` 已设置 `base: './'`，兼容静态托管

## 环境变量配置（Vercel）

在 Vercel 项目 Settings → Environment Variables 中新增：

- `VITE_SITE_PASSWORD`：访问口令（Gate 页面校验用）
- (新功能)`VITE_GATE_TARGET_ORIGIN`：Gate 回传目标域（例如 `https://xxxxx.com`）

说明：

- 这些变量会在构建时注入前端（Vite 以 `import.meta.env.*` 暴露）。
- 如未设置 `VITE_GATE_TARGET_ORIGIN`，Gate 将不会回传消息（安全起见不提供默认值）。

## 其他说明
- 登录界面样式可在 `Go.vue` 直接修改
- 支持移动端和 PC 响应式

## 新增功能(跨域弹窗校验与授权回传，也可称为验证网关（Gate）弹窗校验) 2025.9.12
- 父站发起验证，Gate 页口令通过后以 `postMessage` 回传，父站据此解锁受保护功能（目标域由 `VITE_GATE_TARGET_ORIGIN` 配置）
- 访问方式：弹窗校验回传：父站打开 `https://<your-gate>/go?feature=xxx`，Gate 校验成功后向 `VITE_GATE_TARGET_ORIGIN` 回传 `{ type: 'gate-verify', feature: 'xxx', ok: true }`
- 主要是需要传feature参数，完整形式如上

---
如有问题或建议欢迎反馈。如果该项目对你有帮助的话，欢迎点个 star 支持一下，谢谢！
