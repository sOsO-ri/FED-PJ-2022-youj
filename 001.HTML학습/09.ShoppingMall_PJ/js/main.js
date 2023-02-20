// 쇼핑몰 배너 JS - 01.가로방향 배너 슬라이드 //

// HTML태그 로딩후 loadFn함수 호출! ///
window.addEventListener("DOMContentLoaded", loadFn);

/***************************************************** 
    [ 슬라이드 이동 기능정의 ]
    1. 이벤트 종류: click
    2. 이벤트 대상: 이동버튼(.abtn)
    3. 변경 대상: 슬라이드 박스(#slide)
    4. 기능 설계:

        (1) 오른쪽 버튼 클릭시 다음 슬라이드가
            나타나도록 슬라이드 박스의 left값을
            -100%로 변경시킨다.
            -> 슬라이드 이동후!!! 
            바깥에 나가있는 첫번째 슬라이드
            li를 잘라서 맨뒤로 보낸다!
            동시에 left값을 0으로 변경한다!

        (2) 왼쪽버튼 클릭시 이전 슬라이드가
            나타나도록 하기위해 우선 맨뒤 li를
            맨앞으로 이동하고 동시에 left값을
            -100%로 변경한다.
            그 후 left값을 0으로 애니메이션하여
            슬라이드가 왼쪽에서 들어온다.

        (3) 공통기능: 슬라이드 위치표시 블릿
            - 블릿 대상: .indic li
            - 변경 내용: 슬라이드 순번과 같은 순번의
            li에 클래스 "on"주기(나머진 빼기->초기화!)

*****************************************************/

/****************************************** 
    함수명: loadFn
    기능: 로딩 후 버튼 이벤트 및 기능구현
******************************************/

function loadFn(){
    // 0.호출 확인
    console.log("로딩 완료!");

    // 🌈슬라이드 번호 변수 만들기!
    let snum = 0;
    // 🌈슬라이드 개수 변수 만들기 : 개수 알고 싶으면 .length를 사용하면 됨
    let scnt = document.querySelectorAll("#slide>li").length;
    console.log("슬개수: ", scnt);

    // 1.대상 선정
    // 1-1.이벤트 대상 : .abtn
    const abtn = document.querySelectorAll(".abtn");
    // console.log(abtn);

    // 1-2. 변경 대상 : #slide
    const slide = document.querySelector("#slide");

    // 2.슬라이드 변경 함수 만들기 - 할당형 함수로 만들기
    const goSlide = (seq)=>{
        // 2-0. 확인
        console.log("슬라이드고우!", seq);

        // 2-1. 방향에 따른 분기
        // 2-1-1. 오른쪽 버튼 클릭시 : seq===1
        if(seq){
            
            // 슬라이드 번호 증가시키기!
            snum++;

            // 확인
            console.log("오른!", snum);
        }
        // 2-1-2. 왼쪽 버튼 클릭시 : seq===0
        else{
            
            // 슬라이드 번호 감소시키기!
            snum--;

            // 확인
            console.log("왼!", snum);
        }

        // 4.한계값 체크하기 (5번부터는 없으니까 넘어가지 않도록 제어해줘야함 / 맨 왼쪽으로 갔을 때도 마찬가지임)
        // : 처음이전 -> 끝으로 이동, 끝다음 -> 처음으로 이동하도록 만들기
        if(snum===-1) snum = scnt - 1;
        else if(snum === scnt) snum = 0;


        // 💕아예 이동 못하게 막아두는 방법도 있음
        // if(snum===-1) snum = 0;
        // else if(snum === scnt) snum = scnt - 1;

        // 2-2. 이동하기
        // 이동 대상 : slide변수
        slide.style.left = (snum*-100)+"%";
        slide.style.transition = "left .4s ease-in-out";
    }; //////////////// goSlide 함수 끝 /////////////////////

    // 3.대상에 이벤트 설정하기
    // : abtn버튼 클릭하면 
    abtn.forEach((ele, idx)=>{
        ele.onclick = ()=>{
            goSlide(idx);
        }; //////////// onclick 끝 ///////////////
    }); //////////////////////// forEach 끝 /////////////////////////////

} //////////////// loadFn 함수 ///////////////
/////////////////////////////////////////////