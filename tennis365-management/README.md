
# Tennis365 Match Tracker
### <a href="https://tennis365-management.vercel.app/win-rate">사이트 바로가기</a>

#### Develop Tool

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

#### FrontEnd

<img src="https://img.shields.io/badge/NextJS-v14.2.5-green.svg" /> <img src="https://img.shields.io/badge/typescipt-v5-blue.svg" />
<img src="https://img.shields.io/badge/js_cookie-v1.0.2-blue.svg" /> 

#### BackEnd & DB
<img src="https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white" /> <img src="https://img.shields.io/badge/pg-v8.12.0-green.svg" />

#### etc.
![SASS](https://img.shields.io/badge/Vercel-black.svg?style=for-the-badge&logo=VERCEL&logoColor=white)


## What is Tennis365 Match Tracker?

테니스365 매치 트래커는 NextJS를 사용하여 테니스 클럽 회원들의 경기결과를 기록하고 이를 기반으로 순위를 산정하는 시스템입니다. 

### <span id='top'>바로가기</span>

- <a href="#erd">ERD 및 테이블 설명</span>
- <a href="#main-features">주요 기능</span>
<!-- - <a href="#screen">스크린샷</span> -->

## <span id="erd">ERD 및 테이블 설명</span>

![match_tracker_ERD](https://github.com/user-attachments/assets/145796ac-bbc9-4183-924f-340916453773)

### 플레이어 테이블 (player)

```
1) id(int) -> 플레이어 식별 id
2) name(varchar) -> 플레이어 이름
3) wins(int) -> 플레이어 승리 횟수
4) losses(int) -> 플레이어 패배 횟수
5) debt(int) -> 패배시 벌칙금
6) participation(int) -> 참여 횟수
```

### 매치 테이블(matches)
```
1) id(int) -> 매치 식별 id 
2) winner_team("A" or "B") -> 승리팀 
3) a_score(int) -> A팀의 점수
4) b_score(int) -> B팀의 점수
5) time_added(timestamp) -> 매치 정보가 저장된 시간
6) match_date(date) -> 매치가 진행된 날짜
```

### 플레이어별 경기 테이블(player_match)
```
1) id(int) -> 식별 id
2) team("A" or "B") -> 플레이어가 소속된 팀
3) is_winner(bool) -> 승리팀 소속인지 여부
4) matches_id(int) -> 해당 매치의 id(matches 테이블 id와 매핑)
4) player_id(int) -> 해당 플레이어의 id(player 테이블 id와 매핑 )
```

### 모임 날짜 테이블(match_calendar)
모임 날짜를 저장하는 테이블
```
1) date -> 매치가 발생한 모임 날짜
```



 ### <a href="#top">맨 위로</a>

## <span id="main-features">주요기능</span>

#### <span id="features">기능</span>

- 매치결과 입력
- 매치결과를 토대로 순위 산정


<!-- - <a href="https://github.com/flexing1010/Tennis365/blob/main/%EA%B8%B0%EB%8A%A5/transaction.md">결제 프로세스  -->




<br />

<!-- ## 스크린샷

### 메인화면

![365-main1](https://user-images.githubusercontent.com/79352105/137310442-78b7bbfb-9742-4b59-ab25-050041e23169.gif)

### 메인화면(모바일)

![365-main(mobile)](https://user-images.githubusercontent.com/79352105/137310446-8c019311-a6d8-488b-ac14-0ade3ce51cd4.gif)

### <a href="#top">맨 위로</a> --> 
