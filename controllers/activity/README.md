## Activities

## choose activities scenario

# Client:

# 활동 선택: 마음에 드는 activity 클릭.

# 로그인 여부 파악:

    1. 로그인이 되어있으면 상세 정보 페이지
    2. 로그인이 되어있지 않다면, 모달창 또는 경고창(클릭 시 로그인 페이지로 redirect)

# Client 지원하기 버튼 클릭:

    1. Activity Master가 수락을 누른다. 그러면 지원하기가 성공적으로 완료되고,
    2. Activity의 상세 페이지로 이동하여 Activity의 상세 정보를 볼 수 있도록 한다.
    _Advanced: 실시간 채팅창을 구현하여, 상세 페이지로 이동했을 경우 실시간 소통이 가능하도록 구현한다.

# Backend:

    1. 사용자가 메인 페이지에 있는 activity 중 하나를 클릭 했을 때 - fetch(url/activities/:param_id)
    2. 로그인이 되어있는지 isLoggedIn()를 구현해 현재 로그인 상태를 검증할 수 있도록 한다.
    3. 만약 로그인이 되어있다면, 사용자가 요청한 해당 url의 param_id와 Database의 activity_name이 일치하는 DB의 정보를 가져와서 응답으로 보내주고 상태코드(201)을 보내준다.
    4. 만약 로그인이 되어있지 않다면, 로그인 페이지로 redirect할 수 있도록 상태코드(403)과 `로그인이 필요합니다`라는 메세지를 응답으로 보내준다.

# Backend 지원하기 버튼 클릭:

    1. post 요청시 Database { ActivityParticipants }에 저장해야 한다. 그런데, 현재 join 테이블에서 user_id랑 activity_id만 가지고있다.
    2. 여기서 문제는, 지원하기 버튼을 눌렀을 때, 유저의 기본정보를 바탕으로 지원자의 정보를 저장할 것인가? 아니면 테이블에 지원자가 원하는
       스택으로 자유롭게 선택해서 지원하도록 유도할 것인가?
       ## 기준
        1. 일단 지원하기 버튼을 누르면, 지원자의 데이터를 ActivityParticipants에 저장한다.
        2. 저장 완료 후 상태코드 201을 돌려준다. status(201).send("The request is processed completely")
        

# 정리:

    1. POST https://localhost:3000/activities/:param_id)
    2. router.post("/activities/:param_id", chooseActivity.isLoggedIn);

## create activities scenario

1. 활동 등록 클릭, fetch(https://localhost:3000/activities/create)

2. Activities input value들을 입력, fetch(https://localhost:3000/activities/create/activity_enrollment)

3. 무엇을 기준으로 `이미 등록된 게시물` 입니다를 설정해 줄 것인지 생각해보기.

   # 기준

   - activity_name의 중복으로 설정해줘야 한다.

4. 만약 등록된 게시물이라면,
   fetch(https://localhost:3000/activities/create/activity_enrollment) -> isActivities() -> DB에 존재하는지 유효성 검사 -> 일차하는 단어가 없을때까지 클라이언트에서 버튼을 클릭할 수 없도록 off 시켜놓는다. 일치하는 순간 5번으로 넘어간다.

5. 등록되지 않은 게시물이라면, 성공적으로 등록이 완료되어야 한다.
   fetch(https://localhost:3000/activities/create/activity_enrollment) -> isActivities() -> Store to Database

## delete activities scenario

1.
