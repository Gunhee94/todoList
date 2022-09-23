# TodoList 미리알림

[사이트바로가기](https://todolist-363308.du.r.appspot.com) (아이디,비번 : test)
![image](https://user-images.githubusercontent.com/60492505/191894601-a27aa61f-085e-46e0-8441-ce2200e1fdce.png)

## 목적

react 공부를 위해 제가 자주 사용하는 아이폰 기본앱 미리알림을 바탕으로 만들었습니다.

## 기능
+ 할 일 입력, 깃발(중요도) 표시, 체크 표시를 할 수 있습니다. 
+ 알림 설정
  + 설정한 시간에 alert 으로 알려줍니다.(체크 표시를 한 알림은 알려주지 않습니다.)
  + 설정한 알림의 시간에 따라 알림 시간 색상이 다르게 표시됩니다.
+ 휴지통 아이콘을 클릭하면 할 일을 1개 삭제할 수 있고, 체크한 항목들을 지우기 버튼을 통해 일괄적으로 삭제할 수 있습니다. 

## 기술

### react
+ useState, useEffect, useNavigate, Route
+ useInterval 을 통해 알림 관리
+ fetch 를 통해 데이터 통신

### node.js, mongoDB  
+ mongoDB CRUD

### 디자인
+ material-UI
