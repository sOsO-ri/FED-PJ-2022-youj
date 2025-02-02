// 스크롤 상단으로 이동시키는 모듈 JS - ScrollTop.js

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// 스크롤 상단이동 컴포넌트 모듈은 라우터가 세팅된 '<BrowserRouter>' 안에 '<ScrollTop />'을 호출해야 함
// (ScrollTop는 당연히 import해야함!)
// 현재 PJ에서는 <BrowserRouter>가 index.js에 위치함
export default function ScrollTop(props){ //props.sfn - 부모의 로그인 세팅 함수
    // 현재 라우터의 매핑 페이지 위치 알아내기 - pathname은 우리가 만든 거 아님!
    const { pathname } = useLocation();

    // 컴포넌트가 속해있는 컴포넌트에 변경이 있을 경우, 부가적으로 함께 작동되도록 액션을 주고자 할 때 사용하는 리액트 모듈이 바로 'useEffect'임
    // useEffect(함수, [사용할 라우터 페이지]) -> 함수가 실행됨
    // : useEffect는 부가 효과를 주는 모듈이라고 생각하면 됨
    useEffect(()=>{
        // js) 윈도우 객체를 스크롤 최상위로 이동시키는 코드
        window.scrollTo(0, 0);

        // 로그인 상태를 확인! : 로컬스토리지의 "minfo"항목이 null인지 아닌지 체크함
        console.log("useEffect: ", localStorage.getItem("minfo"));

        // 부모 컴포넌트(Layout)의 로그인 세팅함수 호출하기
        props.sfn(); // 함수 실행해야 하니까 소괄호()까지 쓰기
        // : 만약 로컬스토리지의 "minfo"가 null이 아닌 세팅값이 있다면, 로그인 환영 메시지를 보여줌 (그리고 부가적으로, 로그아웃버튼 출력시켜주기)


    }, [pathname]);
    // [pathname] -> 구체적으로 어떤 페이지인지 적을 수도 있음 : ["/home", "/mv", "/cm"]
    // 여기서는 동적으로 적용되라고 현재 매핑 페이지를 받아서 할당한 변수이름을 적음!

    // 이 컴포넌트 실행은 다른 부가적인 코드는 실행시키지 않는다는 의미로 'null'값을 리턴함
    return null;
}
