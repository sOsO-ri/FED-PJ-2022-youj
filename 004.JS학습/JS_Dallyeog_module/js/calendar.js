// 달력 생성자함수 /////

function MakeDallyeok(sel) { // sel은 달력 넣을 요소 선택자
    // 선택함수 //////
    const qs = (x) => document.querySelector(x);
    const qsa = (x) => document.querySelectorAll(x);
    // 메시지 /////
    const cg = (x) => console.log(x);

    // 0. 최초 달력코드 넣기
    qs(sel).innerHTML = insertHcode();
    // : 소괄호()를 쓰면 바로 실행된 다음 할당(=)되어서! 먼저 리턴값을 가져온 후에 할당한다!

    // 1. 변수셋팅 /////////////

    // (1) 변경할 현재날짜 객체
    this.curr_date = new Date();
    // (2) 오늘날짜 객체
    this.today = new Date();
    // (3) 년도요소 : .yearTit
    this.yearTit = qs(sel+" .yearTit");
    // (4) 월요소 : .monthTit
    this.monthTit = qs(sel+" .monthTit");
    // (5) 날짜요소 : .dates
    this.dates = qs(sel+" .dates");

    cg(this.dates);

    // 2. 함수 만들기 /////////////////
    // (1) 달력 초기화구성 함수 ////////
    this.initDallyeok = () => {
        // getMonth() 정보는 항상 현재달 숫자보다 1작음(배열순번임!)

        // 1. 전달 마지막 날짜(옵션:0) -> 달력 전달끝쪽 날짜표시
        this.prevLast = new Date(this.curr_date.getFullYear(), this.curr_date.getMonth(), 0);
        // cg(this.prevLast);

        // 2. 현재달 첫째날짜(옵션:1-> 전달로 셋팅)
        // -> 달력 전달셋팅을 위한 요일 구하기 위해!
        this.thisFirst = new Date(this.curr_date.getFullYear(), this.curr_date.getMonth(), 1);
        // cg(this.thisFirst);

        // 3. 현재달 마지막날짜(옵션:0)
        // -> 현재달력 날짜셋팅위해!
        this.thisLast = new Date(this.curr_date.getFullYear(), this.curr_date.getMonth() + 1, 0);
        // cg(this.thisLast);

        // 4. 년도표시하기
        this.yearTit.innerHTML = this.curr_date.getFullYear();

        // 5. 월표시하기 : 현재달 숫자는 getMonth()+1
        this.monthTit.innerHTML = this.curr_date.getMonth() + 1;

        // 6. 날짜넣을 배열변수 만들기
        const dset = [];

        // 7. 전달 날짜 앞쪽 채우기
        // 조건: 현재달첫날짜 요일이 0이 아니면 내용있음!
        // cg(this.thisFirst.getDay());
        if (this.thisFirst.getDay() !== 0) {
            // for문 셋팅 : 몇바뀌돌리나? 요일순번보다 작을때까지++
            for (let i = 0; i < this.thisFirst.getDay(); i++) {
                // cg(i);
                // 반복횟수 만큼 배열 앞쪽에 추가한다!
                // 전달은 클래스 "bm"으로 구분함!
                // 전달 마지막 날짜부터! -> prevLast.getDate()
                dset.unshift(`
                <span style="color:#ccc" class="bm">
                    ${this.prevLast.getDate() - i}
                </span>`);
                // 마지막날짜 - i증가변수 = 1씩작아지는 숫자추가됨
                // unshift() 배열 앞에 값을 추가하는 메서드
            } ///////// for /////////////
        } //////////// if //////////////

        // 2. 현재월 삽입하기 ///////////////////
        // 반복문 구성: 현재월 1일부터 마지막날짜까지 반복 배열추가
        // 현재월마지막날짜 : this.thisLast.getDate()
        for (let i = 1; i <= this.thisLast.getDate(); i++) {
            dset.push(i);
        } /////////////// for ///////////////////

        // 3. 다음달 나머지 칸 삽입하기
        // 다음달은 클래스 "am"으로 구분함!
        // 반복구성: 1부터 2주분량정도 넣는다!
        for (let i = 1; i < 14; i++) {
            dset.push(`
            <span style="color:#ccc" class="am">${i}</span>`);
        } /////////// for /////////////////

        // cg(dset);

        // 화면에 뿌릴 html변수
        let hcode = "";

        // 4. 날짜만큼 배열정보로 셋팅하기 //////
        // 7일 * 6주 = 42개
        for (let i = 0; i < 42; i++) {
            // 오늘날짜 표시
            if (
                // 년,월,일이 모두 일치하는 오늘만 표시(클래스 this.today)
                this.today.getDate() == dset[i] &&
                this.today.getMonth() == this.curr_date.getMonth() &&
                this.today.getFullYear() == this.curr_date.getFullYear()
            ) {
                hcode += `<div class="date today">${dset[i]}</div>`;
            } else {
                hcode += `<div class="date">${dset[i]}</div>`;
            }
        } ////////// for /////////////////

        // 5. 코드 화면에 넣기 //////
        // 대상: .dates -> dates변수
        this.dates.innerHTML = hcode;

        // 각 날짜 .date 요소에 링크설정하기
        qsa(sel+" .date").forEach(
            (ele) =>
                (ele.onclick = () => {
                    // 년
                    let cyear = this.yearTit.innerText;
                    // 월
                    let cmonth = this.monthTit.innerText;
                    // 일
                    let cdate = ele.innerText;

                    // 전달/다음달은 span태그가 있으므로 구분함!
                    let isSpan = ele.querySelector("span");
                    cg(isSpan);
                    // 없을 경우 null값이 나옴 -> if문에서 false처리됨!
                    if(isSpan){ // null이 아닐때만 true처리되어 들어감!
                        // span 요소의 클래스가 "bm"이면 처리되어 들어감!
                        let cls = isSpan.classList.contains("bm");
                        cg(cls);
                        if(cls){
                            // 전달일 경우 : 월에서 1을 뺀다
                            // Number(문자형숫자) -> 숫자형으로 형변환해줌
                            // -, *, /연산자는 브라우저가 문자형을 숫자형으로 자동 형변환해준다!
                            // 그러나 +연산자는 문자와 숫자 더하기 가능하므로 이것을 강제 형변환해줘야 안전하다~~!
                            cmonth = Number(cmonth) - 1;
                            cg("이전달: "+cmonth);

                            // 만약 1월이면, 이전달은 0이 아닌 12월이므로~ 이것을 처리해줘야 한다~
                            if(cmonth === 0){
                                cmonth = 12;
                                // 년도도 전년도로 바꿔주기
                                cyear = Number(cyear) - 1;

                            } /////////////////// if : 1-1 = 0이 된 경우 ////////////////////
                            
                        } //////////////////// if : 전달 /////////////////
                        else{
                            // 다음달일 경우 : 월에서 1을 더한다
                            // ⭐주의사항! : 요즘엔 브라우저가 똑똑해져서 +을 뺀 나머지 기호는 형이 달라도 숫자형으로 인식하고 처리해줬지만,
                            // +는 문자형과 숫자형끼리의 결합도 하기 때문에... 알아서 처리 못함~
                            // ->>따라서, 문자형을 숫자형으로 형변환을 해주는 게 gooood~~~!!!
                            cmonth = Number(cmonth) + 1;
                            cg("다음달: "+cmonth);
                            
                            // 만약 12월이면, 다음달은 13이 아닌 1월이므로~ 이것을 처리해줘야 한다~
                            if(cmonth === 13){
                                cmonth = 1;
                                // 년도도 다음년도로 바꿔주기
                                cyear = Number(cyear) + 1;

                            } /////////////////// if : 12+1 = 13이 된 경우 ////////////////////
                            
                        } /////////////////// else : 다음달 //////////////////
                        // 주의사항: 만약 제3의 경우가 있다면 else문으로 처리하면 안된대~

                    } /////////// if //////////////

                    // 최종날짜 데이터
                    let comp = cyear + "-" + addZero(cmonth) + "-" + addZero(cdate);

                    cg(comp);

                    // 최종날짜 데이터를 달력의 히든 필드에 저장
                    qs(sel+" .dinfo").value = comp;

                    
                }) 
        ); ///////////////// forEach /////////////////////////
    }; ///////// this.initDallyeok 함수 //////

    // 0자릿수 만들기 함수 ////////
    const addZero = (x) => (x < 10 ? "0" + x : x);
    // 보낸숫자가 10보다 작으면 앞에 "0"을 더해서 리턴함!

    // this.initDallyeok(); /// 최초호출!

    // (2) 이전달력 출력하기 함수 //////////////
    this.prevCal = () => {
        // 이전월로 변경하여 initDallyeok()함수호출
        // getMonth() 월가져오기 / setMonth() 월 셋팅하기!
        this.curr_date.setMonth(this.curr_date.getMonth() - 1);
        this.initDallyeok();
    }; ////////////// prevCal 함수 //////////////

    // (3) 다음달력 출력하기 함수 //////////////
    this.nextCal = () => {
        // 다음월로 변경하여 initDallyeok()함수호출
        // getMonth() 월가져오기 / setMonth() 월 셋팅하기!
        this.curr_date.setMonth(this.curr_date.getMonth() + 1);
        this.initDallyeok();
    }; ////////////// nextCal 함수 //////////////
    

    // (4)달력 html 코드 넣기 함수 ////////////////////////////////
    // 위쪽에서 최초 호출하므로 선언적 함수로 만든다!
    function insertHcode(){
        // 달력 html 코드를 리턴함!
        return `
            <!-- 달력 전체 박스 -->
            <div class="calender">

                <!-- 달력 상단:해당 년/월 표시 -->
                <header class="header">
                <!-- 달력 이동버튼 : 이전 -->
                <button class="mbtn btnL">〈</button>
                <div class="title">
                    <div class="yearTit"></div>
                    <div class="monthTit"></div>
                </div>
                <!-- 달력 이동버튼 : 다음 -->
                <button class="mbtn btnR">〉</button>
                </header>
                
                <!-- 달력 날짜 표시 박스 -->
                <section class="main">
                <!-- 주단위 구분 박스 -->
                <div class="week">
                    <div class="day">Sun</div>
                    <div class="day">Mon</div>
                    <div class="day">Tue</div>
                    <div class="day">Wed</div>
                    <div class="day">Thu</div>
                    <div class="day">Fri</div>
                    <div class="day">Sat</div>
                </div>
                <!-- ⭐해당월의 달력 날짜 구성 박스⭐ -->
                <div class="dates"></div>
                </section>
                <!-- 달력 날짜 저장용 히든 필드 -->
                <input type="hidden" class="dinfo">
            </div>
        `;
    } /////////////////////// insertHcode 함수 끝 ///////////////////////////////


    // (5) 날짜기간 계산하기 함수 //////////////////////////////////////////////
    this.getDateDiff = (dt1, dt2) => {
        const date1 = new Date(dt1); //파라미터로 들어온 string을 date 타입으로 바꿔야 날짜 계산이 가능함!
        const date2 = new Date(dt2);
        
        const diffDate = date1.getTime() - date2.getTime();
        return Math.abs(diffDate / (1000 * 60 * 60 * 24));  // abs: 절대값으로 만들기
        // 밀리세컨 * 초 * 분 * 시 = 일(하루) 단위가 됨
    } ///////////////////// getDateDiff 함수 끝 ///////////////////////////////
    

    // 버튼에 클릭설정하기 ///
    qs(sel+" .btnL").onclick = this.prevCal;
    qs(sel+" .btnR").onclick = this.nextCal;
} //////////// MakeDallyeok //////////////


// 달력 생성자 함수 내보내기 ////////////////////
export default MakeDallyeok;
// default는 이름 변경 없는 단 하나의 모듈을 내보낼 때 사용함!

