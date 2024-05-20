## To be a better yourself

Home: https://www.lucienchen.xyz/
![image](https://github.com/LucienChenXi92/tobe/assets/44730766/a04ceb91-6c37-49c7-a9ab-6c71d170fa8a)

该项目目前处于开发初期阶段，在完善代码质量，添加单元测试，以及接口文档后会正式开源。
欢迎研究学习，同时也欢迎提出意见，贡献代码。

### 准备

想要启动该项目，你需要准备如下环境：
1. JDK 17
2. IDE (IntellJ or VS code)

### 启动

该项目由 `Maven` 构建，因此用 IDE 加载项目后用 `mvn intall` 命令来装载相关依赖，执行成功后利用 `mvn spring-boot:run` 命令启动项目，默认端口为 `8080`。

### 打包

测试环境：`mvn package`
生产环境：`mvn package -Pprod`

### 配置

项目配置都放在 `resources` 路径下的 `application` 开头的三个 yaml 文件中。
   
