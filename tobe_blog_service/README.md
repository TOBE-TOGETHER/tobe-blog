[![Spring-boot](https://img.shields.io/badge/3.2.5-6DB33F?style=flat-square&logo=SpringBoot&logoColor=white&label=Spring-Boot)](https://github.com/spring-projects/spring-boot)
[![Spring-security](https://img.shields.io/badge/6.2.4-00BAFF?style=flat-square&logo=Spring-Security&logoColor=white&label=Spring-Security&color=blue)](https://github.com/spring-projects/spring-security)
[![Unit Test Covered](https://img.shields.io/badge/5.9.2-25A162?style=flat-square&logo=JUnit5&logoColor=white&label=Junit5)](https://github.com/junit-team/junit5)

This is the backend service for providing the needed APIs for the blog system, implmented with spring-boot framework.

[中文文档](./doc/README_CH.md)

## Prerequisites

- JDK 17
- Maven
- IDE (Cursor, VSCode, IntellJ)

## How to run ?

```bash
mvn spring-boot:run
```

Default port: `8080`

## How to build ?

Local or development env:

```bash
mvn package
```

Production env:

```bash
mvn package -Pprod
```

## Testing

Unit tests are being used in this project to ensure code quality. Rich test samples and `Juint5 + H2` solution achieve comprehensive coverage from API, service layer to database data.

```bash
mvn test
```

## API

Project follows the RESTful API design principles and has integrated the spring-doc plugin, thus the APIs can be viewed and online debugged by `/swagger-ui/index.html` page.

## Configuation

Project configurations are all placed in yaml files starting with `application` under the `resources` path.

## Dependencies

Major dependencies are as below：

- spring-boot: 3.2.5
- spring-security: 6.2.4
- mybatis-plus: 3.5.6
- spring-boot-starter-data-redis: 3.2.5
- spring-doc: 2.5.0
- h2: 2.2.224
- Junit: 5.9.2
