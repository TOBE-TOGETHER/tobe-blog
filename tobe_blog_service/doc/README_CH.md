## 准备

- JDK 17
- Maven
- IDE (Cursor, VSCode, IntellJ)

## 启动

```bash
mvn spring-boot:run
```

默认端口为 `8080`

## 打包

本地或测试环境

```bash
mvn package
```

生产环境

```bash
mvn package -Pprod
```

## 测试

本项目通过单元测试来保证代码质量，利用 `Juint5 + H2` 的方案实现从功能接口, 业务实现，再到数据库数据的全面覆盖。

```bash
mvn test
```

## API

项目遵循 RESTful API 设计原则并已集成 spring-doc 插件，因此可通过 `/swagger-ui/index.html` 页面查看并调试所有 API.

## 配置

项目配置都放在 `resources` 路径下的 `application` 开头的 yaml 文件中。

## 依赖

主要依赖如下：

- spring-boot: 3.2.5
- spring-security: 6.2.4
- mybatis-plus: 3.5.6
- spring-boot-starter-data-redis: 3.2.5
- spring-doc: 2.5.0
- h2: 2.2.224
- Junit: 5.9.2
