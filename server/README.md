# Server

server폴더 바로 아래에 .env파일을 다음과 같이 생성합니다.

```shell
MONGOOSE_URI=mongodb+srv://${id}:${password}@${database}.anadg.mongodb.net/${database}?retryWrites=true&w=majority
```

해당 .env파일을 만들고 실행합니다.

## 스크립트

```shell
yarn dev # run server & client
yarn dev:server # run only server
yarn dev:client # run only client
```
