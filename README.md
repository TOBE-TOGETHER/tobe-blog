# tobe-blog

> 🚀 **Developed with Cursor AI**

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.5-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.3.0-blue.svg)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org)
[![Cursor](https://img.shields.io/badge/Built%20with-Cursor-blueviolet.svg)](https://cursor.sh)

A modern open-source blog platform based on Spring Boot and React, supporting multiple languages, multi-device adaptation, and providing comprehensive content management and data analytics features.

English | [中文](README_CN.md)

<img src=https://github.com/user-attachments/assets/12eb30dd-6a14-4a53-ad15-9918304dab83 width=48% /> 
<img src=https://github.com/user-attachments/assets/55f0e486-837d-4a5e-8b64-6b657e3e6cf1 width=48% />
<img src=https://github.com/user-attachments/assets/56558162-5a1d-4e3b-bb57-a4d1eba58d4a width=48% /> 
<img src=https://github.com/user-attachments/assets/3ac065e1-48d7-43f0-b31f-f7aef85207e1 width=48% /> 
<img src=https://github.com/user-attachments/assets/7cadab36-d7b6-4bde-a4b4-2e24a3bc04b2 width=48% /> 
<img src=https://github.com/user-attachments/assets/ba3c41d4-9ea4-44a0-aaf9-c9975978b743 width=48% />
<img src=https://github.com/user-attachments/assets/d6681b35-168c-4e43-8d4e-f0feccd58189 width=48% /> 
<img src=https://github.com/user-attachments/assets/6a8da21a-0e04-41fd-9cec-e6e4304bdf96 width=48% /> 


## ✨ Key Features

### 🎨 User Interface

- **Modern Design**: Built with Material-UI design system, supporting dark/light theme switching
- **Responsive Layout**: Perfectly adapted for desktop, tablet, and mobile devices
- **Multi-language Support**: Internationalization solution based on i18next
- **Accessibility**: Compliant with WCAG standards, supporting screen readers

### 📝 Content Management

- **Rich Text Editor**: Integrated WangEditor supporting multimedia content like images, videos, and code blocks
- **Smart Tag System**: Supporting tag hierarchical relationships to build complex content classification systems
- **Diverse Content Types**: Supporting articles, plans, vocabularies, and other content types
- **Auto-save Drafts**: Preventing accidental loss of creative content

### 🔐 User System

- **JWT Authentication**: Secure user authentication and authorization mechanism
- **Email Verification**: Complete user registration and password reset workflow
- **Personal Center**: User profile management and preference settings
- **Multi-device Sync**: Cross-device data synchronization

### 📊 Data Analytics

- **Content Statistics**: Real-time statistics for article views, likes, etc.
- **User Behavior**: Detailed user access and interaction data
- **Visual Charts**: Intuitive data presentation and trend analysis
- **Export Functionality**: Support for data export and report generation

### 🚀 Performance Optimization

- **Code Splitting**: Route-level lazy loading, 60%+ improvement in first-screen loading speed
- **Caching Strategy**: Smart frontend caching and CDN acceleration
- **SEO Friendly**: Server-side rendering support, search engine optimization
- **PWA Support**: Offline access and push notifications

## 🛠️ Tech Stack

### Frontend (tobe_blog_web)

- **Framework**: React 18.3.0 + TypeScript 5.2.2
- **Build Tool**: Vite 5.2.0 (supporting hot reload and fast build)
- **UI Component Library**: Material-UI 5.15.18
- **State Management**: React Context + Hooks
- **Routing**: React Router DOM 6.23.1
- **HTTP Client**: Axios 0.28.0
- **Rich Text Editor**: WangEditor 5.1.20
- **Internationalization**: i18next 21.8.10
- **Date Processing**: Moment.js 2.29.4
- **Animation**: React Spring 9.7.1
- **Code Quality**: ESLint + Prettier + TypeScript

### Backend (tobe_blog_service)

- **Framework**: Spring Boot 3.2.5
- **Security**: Spring Security 6.2.4 + JWT
- **Database**: MySQL + MyBatis Plus 3.5.6
- **Cache**: Redis (Spring Data Redis)
- **Documentation**: SpringDoc OpenAPI 2.5.0 (Swagger UI)
- **Email**: Spring Boot Starter Mail + Thymeleaf
- **Monitoring**: Spring Boot Actuator
- **Testing**: JUnit 5.9.2 + H2 Database
- **Tools**: Lombok 1.18.38 + Apache Commons

### Development Environment

- **JDK**: 17
- **Node.js**: 18.20.2 (managed with Volta)
- **Package Management**: Maven + NPM
- **Version Control**: Git
- **IDE**: Supporting Cursor, VSCode, IntelliJ IDEA

## 🚀 Quick Start

### Prerequisites

- JDK 17+
- Node.js 18.20.2+
- Maven 3.6+
- MySQL 8.0+
- Redis 6.0+

### Backend Service Startup

```bash
# Navigate to backend project directory
cd tobe_blog_service

# Install dependencies and start (development environment)
mvn spring-boot:run

# Or build for production environment
mvn package -Pprod
```

Default port: `8080`  
API Documentation: `http://localhost:8080/swagger-ui/index.html`

### Frontend Application Startup

```bash
# Navigate to frontend project directory
cd tobe_blog_web

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production environment
npm run build
```

Default port: `3000`  
Access URL: `http://localhost:3000`

## 📖 Project Structure

```
tobe-blog/
├── tobe_blog_service/          # Backend service
│   ├── src/main/java/com/tobe/blog/
│   │   ├── core/              # Core functionality modules
│   │   ├── portal/            # Portal APIs
│   │   ├── content/           # Content management
│   │   ├── analytics/         # Data analytics
│   │   └── beans/             # Data entities
│   ├── src/main/resources/    # Configuration files
│   └── src/test/             # Unit tests
│
├── tobe_blog_web/             # Frontend application
│   ├── src/
│   │   ├── portal/           # User portal
│   │   ├── admin/            # Admin dashboard
│   │   ├── components/       # Common components
│   │   ├── services/         # API services
│   │   └── contexts/         # State management
│   ├── public/               # Static assets
│   └── deploy/               # Deployment related
│
├── .github/                   # GitHub configuration
└── docs/                     # Project documentation
```

## 🧪 Testing

### Backend Testing

```bash
cd tobe_blog_service
mvn test
```

The project adopts a layered testing strategy:

- **Unit Tests**: Covering service layer business logic
- **Integration Tests**: Testing API interfaces and database interactions
- **H2 In-memory Database**: Test environment isolation

### Frontend Testing

```bash
cd tobe_blog_web
npm run lint          # Code style checking
npm run build:analyze  # Bundle analysis
```

## 📱 Feature Modules

### User Portal

- **Homepage Display**: Latest articles and popular content recommendations
- **Content Browsing**: Article details, tag classification, search functionality
- **User System**: Registration/login, email verification, password reset
- **Personal Center**: Personal profile, my articles, interaction records

### Admin Dashboard

- **Content Management**: Article editing, publishing, draft management
- **Tag Management**: Tag creation, hierarchical relationship management
- **User Management**: User information, permission control
- **Data Analytics**: Access statistics, content performance analysis
- **System Settings**: Website configuration, theme settings

## 🌐 Deployment

### Development Environment

The project supports hot reload development with independent frontend and backend startup for debugging.

### Production Environment

- **Frontend**: Built with Vite, supporting code splitting and cache optimization
- **Backend**: Spring Boot packaged as JAR, supporting Docker containerized deployment
- **Database**: MySQL master-slave architecture, Redis cluster caching
- **Load Balancing**: Nginx reverse proxy, supporting HTTPS

## 📈 Performance Optimization

### Frontend Optimization Results

- **Bundle Size**: Main file reduced from 1,079KB to 415KB (61.6% reduction)
- **Code Splitting**: Vendor chunk separation, long-term cache friendly
- **Lazy Loading**: Route-level on-demand loading
- **Compression Optimization**: Terser compression, removing debug code

### Backend Optimization

- **Connection Pool**: HikariCP database connection optimization
- **Caching Strategy**: Redis multi-level caching
- **Asynchronous Processing**: Spring @Async non-blocking operations
- **JVM Tuning**: Memory and GC optimization for production environment

## 🔗 Related Links

- **Live Demo**: [https://tobetogether.xyz](https://tobetogether.xyz)
- **API Documentation**: [Swagger UI](http://localhost:8080/swagger-ui/index.html)
- **Project Board**: [GitHub Projects](https://github.com/orgs/TOBE-TOGETHER/projects/1)
- **Issue Reporting**: [GitHub Issues](https://github.com/TOBE-TOGETHER/tobe-blog/issues)

## 🤝 Contributing

We welcome all forms of contributions!

1. **Fork** the project
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Create** a Pull Request

## 📞 Contact Us

- **WeChat**: LucienChen_Chenxi
- **LinkedIn**: [Lucien Chen](https://www.linkedin.com/in/lucien-chen-219ab6175/)
- **Email**: Contact via GitHub Issues

## 🙏 Acknowledgments

Sincere thanks to all developers who contribute to this project!

[![](https://avatars.githubusercontent.com/u/44730766?size=50)](https://github.com/LucienChenXi92)
[![](https://avatars.githubusercontent.com/u/39786600?size=50)](https://github.com/sunxu42)
[![](https://avatars.githubusercontent.com/u/92359037?size=50)](https://github.com/LouisHongYi)

---

⭐ If this project helps you, please give us a Star!
