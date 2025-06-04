# tobe-blog

> 🚀 **使用 Cursor AI 开发**

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.5-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.3.0-blue.svg)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org)
[![Cursor](https://img.shields.io/badge/Built%20with-Cursor-blueviolet.svg)](https://cursor.sh)

一个基于 Spring Boot 和 React 的现代化开源博客平台，支持多语言、多端适配，提供完整的内容管理和数据分析功能。

[English](README.md) | 中文

<img src=https://github.com/user-attachments/assets/12eb30dd-6a14-4a53-ad15-9918304dab83 width=48% /> 
<img src=https://github.com/user-attachments/assets/55f0e486-837d-4a5e-8b64-6b657e3e6cf1 width=48% />
<img src=https://github.com/user-attachments/assets/56558162-5a1d-4e3b-bb57-a4d1eba58d4a width=48% /> 
<img src=https://github.com/user-attachments/assets/3ac065e1-48d7-43f0-b31f-f7aef85207e1 width=48% /> 
<img src=https://github.com/user-attachments/assets/7cadab36-d7b6-4bde-a4b4-2e24a3bc04b2 width=48% /> 
<img src=https://github.com/user-attachments/assets/ba3c41d4-9ea4-44a0-aaf9-c9975978b743 width=48% />
<img src=https://github.com/user-attachments/assets/d6681b35-168c-4e43-8d4e-f0feccd58189 width=48% /> 
<img src=https://github.com/user-attachments/assets/6a8da21a-0e04-41fd-9cec-e6e4304bdf96 width=48% /> 

## ✨ 主要特性

### 🎨 用户界面

- **现代化设计**: 采用 Material-UI 设计体系，支持深色/浅色主题切换
- **响应式布局**: 完美适配桌面端、平板和移动设备
- **多语言支持**: 基于 i18next 的国际化解决方案
- **无障碍访问**: 遵循 WCAG 标准，支持屏幕阅读器

### 📝 内容管理

- **富文本编辑**: 集成 WangEditor，支持图片、视频、代码块等多媒体内容
- **智能标签系统**: 支持标签层级关系，构建复杂的内容分类体系
- **内容类型多样**: 支持文章、计划、词汇等多种内容类型
- **草稿自动保存**: 避免意外丢失创作内容

### 🔐 用户系统

- **JWT 认证**: 安全的用户认证和授权机制
- **邮箱验证**: 完整的用户注册和密码重置流程
- **个人中心**: 用户资料管理和偏好设置
- **多端同步**: 跨设备数据同步

### 📊 数据分析

- **内容统计**: 文章浏览量、点赞数等实时统计
- **用户行为**: 详细的用户访问和交互数据
- **可视化图表**: 直观的数据展示和趋势分析
- **导出功能**: 支持数据导出和报表生成

### 🚀 性能优化

- **代码分割**: 路由级别的懒加载，首屏加载速度提升 60%+
- **缓存策略**: 智能的前端缓存和 CDN 加速
- **SEO 友好**: 服务端渲染支持，搜索引擎优化
- **PWA 支持**: 离线访问和推送通知

## 🛠️ 技术栈

### 前端 (tobe_blog_web)

- **框架**: React 18.3.0 + TypeScript 5.2.2
- **构建工具**: Vite 5.2.0 (支持热重载和快速构建)
- **UI 组件库**: Material-UI 5.15.18
- **状态管理**: React Context + Hooks
- **路由**: React Router DOM 6.23.1
- **HTTP 客户端**: Axios 0.28.0
- **富文本编辑**: WangEditor 5.1.20
- **国际化**: i18next 21.8.10
- **日期处理**: Moment.js 2.29.4
- **动画**: React Spring 9.7.1
- **代码质量**: ESLint + Prettier + TypeScript

### 后端 (tobe_blog_service)

- **框架**: Spring Boot 3.2.5
- **安全**: Spring Security 6.2.4 + JWT
- **数据库**: MySQL + MyBatis Plus 3.5.6
- **缓存**: Redis (Spring Data Redis)
- **文档**: SpringDoc OpenAPI 2.5.0 (Swagger UI)
- **邮件**: Spring Boot Starter Mail + Thymeleaf
- **监控**: Spring Boot Actuator
- **测试**: JUnit 5.9.2 + H2 Database
- **工具**: Lombok 1.18.38 + Apache Commons

### 开发环境

- **JDK**: 17
- **Node.js**: 18.20.2 (使用 Volta 管理版本)
- **包管理**: Maven + NPM
- **版本控制**: Git
- **IDE**: 支持 Cursor、VSCode、IntelliJ IDEA

## 🚀 快速开始

### 环境要求

- JDK 17+
- Node.js 18.20.2+
- Maven 3.6+
- MySQL 8.0+
- Redis 6.0+

### 后端服务启动

```bash
# 进入后端项目目录
cd tobe_blog_service

# 安装依赖并启动（开发环境）
mvn spring-boot:run

# 或生产环境构建
mvn package -Pprod
```

默认端口：`8080`  
API 文档：`http://localhost:8080/swagger-ui/index.html`

### 前端应用启动

```bash
# 进入前端项目目录
cd tobe_blog_web

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产环境构建
npm run build
```

默认端口：`3000`  
访问地址：`http://localhost:3000`

## 📖 项目结构

```
tobe-blog/
├── tobe_blog_service/          # 后端服务
│   ├── src/main/java/com/tobe/blog/
│   │   ├── core/              # 核心功能模块
│   │   ├── portal/            # 门户API
│   │   ├── content/           # 内容管理
│   │   ├── analytics/         # 数据分析
│   │   └── beans/             # 数据实体
│   ├── src/main/resources/    # 配置文件
│   └── src/test/             # 单元测试
│
├── tobe_blog_web/             # 前端应用
│   ├── src/
│   │   ├── portal/           # 用户门户
│   │   ├── admin/            # 管理后台
│   │   ├── components/       # 通用组件
│   │   ├── services/         # API服务
│   │   └── contexts/         # 状态管理
│   ├── public/               # 静态资源
│   └── deploy/               # 部署相关
│
├── .github/                   # GitHub配置
└── docs/                     # 项目文档
```

## 🧪 测试

### 后端测试

```bash
cd tobe_blog_service
mvn test
```

项目采用分层测试策略：

- **单元测试**: 覆盖服务层业务逻辑
- **集成测试**: 测试 API 接口和数据库交互
- **H2 内存数据库**: 测试环境隔离

### 前端测试

```bash
cd tobe_blog_web
npm run lint          # 代码规范检查
npm run build:analyze  # 打包分析
```

## 📱 功能模块

### 用户门户 (Portal)

- **首页展示**: 最新文章、热门内容推荐
- **内容浏览**: 文章详情、标签分类、搜索功能
- **用户系统**: 注册登录、邮箱验证、密码重置
- **个人中心**: 个人资料、我的文章、互动记录

### 管理后台 (Admin)

- **内容管理**: 文章编辑、发布、草稿管理
- **标签管理**: 标签创建、层级关系管理
- **用户管理**: 用户信息、权限控制
- **数据分析**: 访问统计、内容表现分析
- **系统设置**: 网站配置、主题设置

## 🌐 部署

### 开发环境

项目支持热重载开发，前后端可独立启动调试。

### 生产环境

- **前端**: 使用 Vite 构建，支持代码分割和缓存优化
- **后端**: Spring Boot 打包为 JAR，支持 Docker 容器化部署
- **数据库**: MySQL 主从架构，Redis 集群缓存
- **负载均衡**: Nginx 反向代理，支持 HTTPS

## 📈 性能优化

### 前端优化成果

- **打包体积**: 主文件从 1,079KB 减至 415KB (减少 61.6%)
- **代码分割**: vendor chunk 分离，长期缓存友好
- **懒加载**: 路由级别按需加载
- **压缩优化**: Terser 压缩，移除调试代码

### 后端优化

- **连接池**: HikariCP 数据库连接优化
- **缓存策略**: Redis 多级缓存
- **异步处理**: Spring @Async 非阻塞操作
- **JVM 调优**: 针对生产环境的内存和 GC 优化

## 🔗 相关链接

- **在线体验**: [https://tobetogether.xyz](https://tobetogether.xyz)
- **API 文档**: [Swagger UI](http://localhost:8080/swagger-ui/index.html)
- **项目看板**: [GitHub Projects](https://github.com/orgs/TOBE-TOGETHER/projects/1)
- **问题反馈**: [GitHub Issues](https://github.com/TOBE-TOGETHER/tobe-blog/issues)

## 🤝 贡献指南

我们欢迎所有形式的贡献！

1. **Fork** 项目
2. **创建** 功能分支 (`git checkout -b feature/AmazingFeature`)
3. **提交** 改动 (`git commit -m 'Add some AmazingFeature'`)
4. **推送** 分支 (`git push origin feature/AmazingFeature`)
5. **创建** Pull Request

## 📄 许可证

本项目基于 [MIT 许可证](LICENSE) 开源。

## 📞 联系我们

- **微信**: LucienChen_Chenxi
- **LinkedIn**: [Lucien Chen](https://www.linkedin.com/in/lucien-chen-219ab6175/)
- **邮箱**: 通过 GitHub Issues 联系

## 🙏 致谢

感谢所有为该项目做出贡献的开发者们！

[![](https://avatars.githubusercontent.com/u/44730766?size=50)](https://github.com/LucienChenXi92)
[![](https://avatars.githubusercontent.com/u/39786600?size=50)](https://github.com/sunxu42)
[![](https://avatars.githubusercontent.com/u/92359037?size=50)](https://github.com/LouisHongYi)

---

⭐ 如果这个项目对您有帮助，请给我们一个 Star！
