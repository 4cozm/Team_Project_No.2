//산미있는 원두팀의 어두운 진실을 보셨군요....
//사실 영화진흥원에서는 일간,주간 TOP영화 리스트를 10개밖에 안준답니다...
//아래 리스트는 영화진흥원에서 직접 캐온 리스트입니다
let movies = [
  "날씨의 아이",
  "오멘: 저주의 시작",
  "어거스트 디 투어",
  "극장판 울려라! 유포니엄: 앙",
  "분노의 강",
  "보티첼리",
  "고질라 X 콩: 뉴 엠파이어",
  "목소리의 형태",
  "우당탕탕 운동회",
  "극장판 하이큐!! 쓰레기장의 결전",
  "내가 마지막 본 파리",
  "ARTHUR THE KING",
  "극장판 스파이 패밀리 코드 : 화이트",
  "유미의 세포들 더 무비",
  "캐벌케이드",
  "댓글부대",
  "그녀가 죽었다",
  "기동전사 건담 시드 프리덤",
  "가필드 더 무비",
  "건국전쟁",
  "주사위놀이, 마불 세계여행",
  "패스트 라이브즈",
  "드림쏭",
  "핸섬가이즈",
  "아이엠 티라노",
  "도뷔시",
  "불한당: 나쁜 놈들의 세상",
  "아이다호",
  "청춘 스케치",
  "안전제일, 놀이퀴즈 최강전",
  "더 퍼스트 슬램덩크",
];

let weekMovies = [
  "듄: 파트2",
  "쇼생크 탈출",
  "땅에 쓰는 시",
  "차이콥스키의 아내",
  "힙노시스: LP 커버의 전설",
  "날씨의 아이",
  "로봇 드림",
  "몬스터 프렌즈",
  "악은 존재하지 않는다",
  "레옹",
  "슈가│어거스트 디 투어",
  "극장판 울려라! 유포",
  "고질라 X 콩: 뉴 엠파이어",
  "여행자의 필요",
  "콜 미 바이 유어 네임",
  "보티첼리. 피렌체와 메디치",
  "내가 마지막 본 파리",
  "나폴리의 황금",
  "소풍",
  "오멘: 저주의 시작",
  "악마와의 토크쇼",
  "극장판 스파이 패밀리 코드 : 화이트",
  "목소리의 형태",
  "키메라",
  "아이 엠 러브",
  "학교 가는 길",
  "가여운 것들",
  "건국전쟁",
  "창가의 토토",
  "드림쏭",
  "비거 스플래쉬",
  "기동전사 건담 시드 프리덤",
  "정순",
  "낸 골딘, 모든 아름다움과 유혈사태",
  "무방비 도시",
  "어른 김장하",
  "불한당: 나쁜 놈들의 세상",
  "주사위놀이, 마불 세계여행",
  "아이엠 티라노",
  "바람의 세월",
  "도쿄전쟁전후비화",
  "극장판 아이돌리쉬 세븐; 라이브 4비트 비욘드 더 피리어드 - 데이1",
  "중경삼림",
  "도쿄전쟁전후비화",
  "댓글부대",
  "비욘드 유토피아",
  "엘리멘탈",
  "위시",
  "마브카 : 숲의 노래",
  "녹차의 맛",
  "길위에 김대중",
  "추락의 해부",
  "우당탕탕 운동회",
  "이프 온리",
  "괴물",
  "기적의 시작",
  "돌들이 말할 때까지",
  "아이다호",
  "유코의 평형추",
  "더 퍼스트 슬램덩크",
  "패스트 라이브즈",
  "토스카",
  "오키나와 블루",
  "인사이드 아웃: 소울",
  "난당자리",
  "오키나와 평화 노래",
  "공동경비구역 JSA",
  "드롱",
  "어글리 라이어",
  "블루 카본",
  "바람아 잘자라",
  "불한당: 나쁜 놈들의 세상",
  "피크닉",
  "승리호",
  "천년노래",
  "어느 가족",
  "케이트",
  "영 퀴즈",
  "미스터트롯 더 무비",
  "돼지의 왕",
  "달콤한 인생",
  "나의 영웅",
  "리틀 포레스트",
  "코로나물",
  "미션 임파서블: 더 레빠르: 변신",
  "천로역정: 천국을 찾아서",
  "다이노 어드벤처: 백악기 공룡 대탐험",
  "공각기동대 : 인저겐스",
  "죽고 싶지만 떡볶이는 먹고 싶어",
  "커피 오레",
  "이탈리아에서 온 편지",
  "갈매기",
  "빛과 철",
  "아버지의 전쟁",
  "파피용",
  "낙원의 밤",
  "밀레니엄",
  "나의 모든 사랑하는 친구들에게",
  "투모로우워2: 러쉬",
  "그린 북",
  "버블리브라더스",
  "더 애플",
  "비원의격전",
  "미스터트롯: 더 무비",
  "백두산",
  "가족의 초상",
  "우리에겐 교황이 있다",
  "기묘한 이야기",
  "인생은 아름다워",
  "그때 그사람들",
  "하나가 되는 순간",
  "봄날은 간다",
  "바르게 살자",
  "우리들의 하루",
  "신과함께-인과 연",
  "나는 나를 해고하지 않는다",
  "본 투 비 블루",
  "괴물식당",
  "백엔의 사랑",
  "슈퍼소닉",
  "사랑하고 있습니까",
  "뱀파이어's 블러드",
  "코스모스-영원한 그림자",
  "스파이더맨: 파 프롬 홈",
  "토이 스토리",
  "내 여자친구의 결혼식",
  "보호자들",
  "바그다드 카페 : 디렉터스컷",
  "어벤져스: 엔드게임",
  "미안해요, 리키",
  "로미오와 줄리엣",
  "집으로 가는 길",
  "애드 아스트라",
  "한 여름의 참광식",
  "나이브스 아웃",
  "프란켄슈타인 반란하다",
  "해리포터와 마법사의 돌",
  "커런트 워",
  "카페 소사이어티",
  "조디악: 명탐정 홀름즈의 이벤트",
  "비욘드 아웃라인",
  "위메프와 봉준호",
  "그랜드 부다페스트 호텔",
  "그린랜드",
  "셰임",
  "노바디",
  "강철비2: 정상회담",
  "노트북: 연애의 시작",
  "몬스터 헌터",
  "플로리다 프로젝트",
  "버드 맨",
  "헬리콥터 지키기",
  "파이널 판타지",
  "김어준의 뉴스공장 더 드라마",
  "어떻게 헤어질까: 밀착형친구",
  "리얼",
  "바람이 우리를 데려다 주리라",
  "내사랑 내곁에",
  "모던 타임즈",
  "그것만이 내 세상",
  "제자도선생",
  "하나와 앨리스",
  "검객",
  "벤허",
  "두개의 시간",
  "콰이어트 플레이스",
  "여름날",
  "그레이트 뷰티",
  "강철비",
  "멀리 맨",
  "끝까지 간다",
  "블루 재스민",
  "시간의 숲",
  "매드맥스: 분노의 도로",
  "라스트 탱고",
  "매트릭스",
  "인사이드 아웃",
  "라붐",
  "청년경찰",
  "황망",
  "광해",
  "라스트 버거",
  "보이후드",
  "우리들의 밤",
  "인비저블맨",
  "미드나잇 인 파리",
  "너와 100번째 사랑을 해",
  "루프탑 러브",
  "프롬 할리우드",
  "인천상륙작전",
  "디판스",
  "월드워Z",
  "레미제라블",
  "바스터즈: 거친 녀석들",
  "스폰지밥2: 해리포터를 찾아라!",
  "오만과 편견",
  "킹스맨: 골든 서클",
  "레고 무비",
  "어메이징 스파이더맨",
  "데드풀2",
  "레고 배트맨 무비",
  "다이노 헌터: 티렉스",
  "나루토: 결투의 시간",
  "앤트맨과 와스프",
  "헬보이",
  "블랙 팬서",
  "캡틴 아메리카: 시빌 워",
  "토르: 다크 월드",
  "스타워즈: 깨어난 포스",
  "아쿠아맨",
  "메리 포핀스 리턴즈",
  "포켓몬 더 무비 XY&Z 볼케니온 ",
  "헝거게임: 모킹제이",
  "미스터 보스",
  "픽사: 코코",
  "미녀와 야수",
  "컨저링2",
  "말레피센트",
  "판도라",
  "미션임파서블: 고스트프로토콜",
  "오션스8",
  "혹성탈출: 반격의 서막",
  "아이언맨3",
  "겨울왕국2",
  "러브 액츄얼리",
  "인사이드아웃",
  "원더우먼",
  "바이오하자드: 더 파이널",
  "레지던트 이블: 파멸의 날",
  "어벤져스: 인피니티 워",
  "어벤져스: 에이지 오브 울트론",
  "스파이더맨: 홈커밍",
  "데드풀",
  "아이언맨",
  "토르: 천둥의 신",
  "카메론 포스트의 스케이트보드 서핑",
  "박스포장",
  "불새 - 아버지의 빛",
  "인피니티 워",
  "파리의 한국남자",
  "호러와 로맨스",
  "블랙 위도우",
  "천로역정: 천국을 찾아서",
  "아이언맨2",
  "벅스라이프",
  "죽어도 좋은 경험",
  "나는 친구가 적다",
  "악녀",
  "스타워즈: 라스트 제다이",
  "월터의 상상은 현실이 된다",
  "타이타닉",
  "어벤져스",
  "겨울왕국",
  "노트북",
  "엑시트",
  "인턴",
  "라라랜드",
];
export function movieList(pageNum) {
  if (pageNum > 3) {
    alert("리스트가 끝났습니다");
    return -1;
  }
  let start = (pageNum - 1) * 10;
  let end = pageNum * 10;

  let array = [];
  for (; start < end; start++) {
    array.push(movies[start]);
  }
  return array;
}

export function weekmovieList(pageNum) {
  if (pageNum > 20) {
    alert("리스트가 끝났습니다");
    return -1;
  }
  let start = (pageNum - 1) * 10;
  let end = pageNum * 10;

  let array = [];
  for (; start < end; start++) {
    array.push(weekMovies[start]);
  }
  return array;
}
