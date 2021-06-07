# Three Words Cloud
🌐 웹 페이지 주소 : [http://threewordscloud.com](http://threewordscloud.com/)


</br>


## 프로젝트 소개
Three Words Cloud는 가입이나 로그인 없이 세 단어의 암호로 파일을 업로드하고 다운로드하는 클라우드 서비스입니다.


</br>


![Three Words Cloud](https://user-images.githubusercontent.com/54034869/117648407-227b9780-b1c9-11eb-866f-bc0d3356462c.gif)


</br>

## 프로젝트를 개발하게 된 이유
가끔 개인 컴퓨터에 있는 파일을 공용 컴퓨터에 옮겨야 할 때가 있습니다.   
이럴 때 보통 파일을 USB에 담아서 옮기거나 구글 드라이브, 네이버 N드라이브 같은 클라우드에 파일을 업로드했다가 다운로드할 것입니다.   
하지만 공용 컴퓨터는 보안에 취약합니다.   
공용 컴퓨터에 USB를 꽂았다가 바이러스에 감염될 수 있고, 구글이나 네이버에 로그인했다가 아이디를 해킹당할 수도 있습니다.   
개인 컴퓨터에 있는 파일을 공용 컴퓨터에 안전하게 옮길 방법이 없을까 고민하다가 Three Words Cloud 서비스를 개발하게 되었습니다.   


</br>


## 주요 기능
- 사용자가 업로드한 파일을 서버에 저장하고 사용자에게 새로운 암호 키를 제공.
- 사용자가 입력한 암호가 유효한지 검사한 다음에 사용자에게 세션 키를 발급.
- 사용자가 파일 다운로드를 요청하면, 암호키를 인증한 사용자인지 검사한 뒤 사용자에게 파일을 전송.
- 특정 시간 마다 유효 기간이 만료된 파일과 해당 파일의 암호를 서버와 데이터베이스에서 제거.


</br>


## 사용한 기술 스택
### Front-end
- Vanilla JS
- Webpack
- Dropzone
- Axios

### Back-end
- Express
- Sequelize
- Multer
- AWS-SDK
- Express-session
- Node-cron

### Infra
- AWS EC2, RDS, S3
- Docker
