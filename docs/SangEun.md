# Final Project

## 2020. 10. 15.

### 아이디어 회의

#### 1.싸피 커뮤니티 + 취업 커뮤니티(취업후기 스펙 등등을 상세히 익명으로 공유)

- 취업정보나눔 →싸피사람들의 스펙
- 검색어로 노출이 될 수 있을까?
- 싸피보안문제
- jobssafy
- 크롬익스텐션을 이용해 에듀싸피페이지에 커뮤니티를 접속할수 있게 한다면 접근성 향상 가능
- 싸피 로그인 DB가없음

#### 2.대입 버전의 자소설닷컴

- 4대시험이다 → 사용자가많다
- 현실사용자가 없음 → 고3은 다들 10년전임

#### 3.유,소년기 앨범(육아앨범)

- 위의 강규내용과 비슷
- 페북에서 1년전 오늘 기능 같은것
- 어머니한테 다들 인터뷰 해야할듯 → 쌉가능

#### 4.정신건강 컨텐츠

- 아이템 자체는 좋음
- 현대인의 정신건강은 심각함
- 정신과 상담이 두려움
- 익명성 - 매우중요
- 정신과 선생님과 음성통화(?)



## 2020. 10. 20.

SR프로젝트가 빨리 끝났으면 좋겠다.



## 2020. 10. 22.

### ER Diagram추가

PK는 **bold**, FK는 ***Italic***

#### 1.User Table

- **User ID** : Google Social Login 기능을 통해 Email을 확보할 예정(starseek34@gmail.com)
- Name : User의 이름(배상은)
- Money : User가 가지고 있는 돈, 재화(550)
- Theme : 유저가 가지고 있는 농장의 테마(1, 2, 3 ..)

#### 2.Item Category

- **Category ID** : Category의 ID(1, 2, 3 ...)
- Name : Category의 이름(나무, 새, 식물, 물고기 등)

#### 3.Item

- **Item ID** : Item의 ID(1, 2, 3 ...)
- ***Category ID*** : Item을 Category로 분류하고 그에 해당하는 Category의 ID를 FK로 가진다
- Name : Item의 이름
- Sell_Price : 상점에서 팔 때의 가격
- Buy_Price : 상점에서 살 때의 가격
- Image_dir : 해당 Item의 클라이언트 내 이미지의 경로
- IsInShop : 해당 Item이 상점에 판매하는지 여부를 Bool로 나타냄

#### 4.MyItem(User-Item)

User Table과 Item Table의 N : M 관계에서 탄생하는 Table

- **MyItem ID** : 내가 가진 Item의 ID
- ***User ID*** : 이 아이템을 가진 유저의 ID
- ***Item ID*** : 이 아이템이 어떤 아이템인지 나타내는 ID
- ***Category ID*** : 이 아이팀의 카테고리를 나타내는 ID
- IsInFarm : 농장에 배치되어있는지를 나타낸다. (T - 농장, F - 인벤토리)
- location : 해당 아이템의 농장 / 인벤토리 내 위치 (5*5 셀에서 몇번째를 차지하는가?)

#### 5.Mission Category

- **Mission Category ID** : 미션 카테고리의 ID
- Name : 해당 미션 카테고리의 이름(이미지 캡셔닝 / GPS / 이미지 캡셔닝 + GPS 등)

#### 6.Mission

- **Mission ID** : 미션의 ID
- ***Mission Category ID*** : 해당 미션의 카테고리의 ID
- Name : 해당 미션의 이름(벤치 찍기)
- Content : 해당 미션의 내용(주변 벤치의 사진을 찍어주세요!)

#### 7.MyMission(User-Mission)

User Table과 Mission Table과 Item Table의 Ternary 관계

- **MyMissionID** : 내가 가지고있는 미션의 ID값
- ***USER ID*** : 해당 미션이 제공되고 있는 유저의 ID
- ***Mission ID*** : 해당 미션의 ID
- ***Mission Category ID*** : 해당 미션의 카테고리의 ID
- ***Item ID*** : 해당 미션을 수행하고 클리어했을 시 주어지는 보상 Item의 ID
- ***Item Category ID*** : 해당 미션을 클리어했을 시 주어지는 보상 Item의 Category의 ID
- IsCleared : 해당 미션이 클리어되었는지 나타내는 값(T - 클리어 / F - 아직 클리어 못함)

