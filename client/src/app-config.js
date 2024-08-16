// .env 파일 사용하지 않는 경우 사용
// - 애플리케이션 전체에서 사용되는 구성 정보 관리하는데 사용

// 배포 전
// const backendHost = 'http://localhost:8080';



// 배포 후
let backendHost;
const hostName = window && window.location && window.location.hostname;
if(hostName === 'localhost') {
    backendHost = 'http://localhost:8080' // 로컬 주소
} else {
    backendHost = 'http://102.25.171.25:8080' // 배포주소 예시
}

export const API_BASE_URL = `${backendHost}`;


/*
(참고)
const hostName = window && window.location && window.location.hostname; 하는 이유
-> 안정성을 높이려고

window 가 존재하지 않는 경우
- ex) 서버 측 코드(node.js) 에서 실행되는 경우 윈도우 객체는 존재하지 않음

window.location 가 존재하지 않는 경우
- ex) 브라우저 환경이 아닌 경우 

window.location.hostname 
- ex) 브라우저 환경이지만 window.location 객체에 hostname 속성이 없는 경우

이렇게 단계적으로 확인하면 안전하게 호스트 이름을 가져올 수 있음
*/
