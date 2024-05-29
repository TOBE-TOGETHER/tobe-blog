[![Spring-boot](https://img.shields.io/badge/3.2.5-6DB33F?style=flat-square&logo=SpringBoot&logoColor=white&label=Spring-Boot)](https://github.com/spring-projects/spring-boot)
[![Spring-security](https://img.shields.io/badge/6.2.4-00BAFF?style=flat-square&logo=Spring-Security&logoColor=white&label=Spring-Security&color=blue)](https://github.com/spring-projects/spring-security)
[![Unit Test Covered](https://img.shields.io/badge/5.9.2-25A162?style=flat-square&logo=JUnit5&logoColor=white&label=Junit5)](https://github.com/junit-team/junit5)


## 成为更好的自己！

Home: https://www.lucienchen.xyz/

## 准备

- JDK 17
- Maven
- IDE (VSCode, IntellJ)

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


   
