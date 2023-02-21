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
        // 확인
        // console.log("슬라이드고우!", seq);

        // 2-0.현재의 슬라이드 li 수집하기
        let clist = slide.querySelectorAll("li");
        // : clist : current list 현재 리스트 의미함

        // 2-1. 방향에 따른 분기
        // 2-1-1. 오른쪽 버튼 클릭시 : seq===1
        if(seq){
            
            // 확인
            console.log("오른!");

            // (1) 오른쪽 버튼 클릭시 다음 슬라이드가
            // 나타나도록 슬라이드 박스의 left값을
            // -100%로 변경시킨다.
            slide.style.left = "-100%";
            // 📢->> 딱 한번만 이동하게 세팅해두기
            slide.style.transition = "left .4s ease-in-out";
    
    
            // (2) 슬라이드 이동후!!! 
            setTimeout(()=>{
                // : 0.4초 지나고 슬라이드가 이동한 후 말함
                
                // (2-1)바깥에 나가있는 첫번째 슬라이드 li를 잘라서 맨뒤로 보낸다!
                slide.appendChild(clist[0]);
    
                // (2-2)동시에 left값을 0으로 변경한다!
                slide.style.left="0";
    
                // (2-3)밖의 첫번째 li를 잘라서 맨뒤로 보내면서 동시에 left값을 0으로 바꾸는걸...이렇게 움직이는 걸 굳이 보여줄 필요 없기 때문에 트랜지션을 없애주면 됨
                slide.style.transition = "none";
    

            },400); /////////////////// 타임 아웃 끝 ///////////////////
        } ////////////////////// if문 : 오른쪽 클릭시 /////////////////////////////
        
        // 2-1-2. 왼쪽 버튼 클릭시 : seq===0
        else{

            // 확인
            console.log("왼!");

            // (1) 왼쪽버튼 클릭시 이전 슬라이드가 나타나도록 하기위해 우선 맨뒤 li를 맨앞으로 이동한다 
            // slide.insertBefore(넣을놈, 넣을놈전놈);
            // slide.insertBefore(맨끝 li, 맨앞 li);
            slide.insertBefore(clist[clist.length - 1], clist[0]);
            
            // (2) 동시에 left값을 -100%로 변경한다.
            slide.style.left = "-100%";
            // : 안 튀게 만들기 위함

            // (3) 그 후 left값을 0으로 애니메이션하여 슬라이드가 왼쪽에서 들어온다.
            slide.style.left = "0";
            slide.style.transition = "left .4s ease-in-out";

        } //////////////////////// else문 : 왼쪽 클릭시 //////////////////////////////////





        // 2-2. 이동하기
        // 이동 대상 : slide변수
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