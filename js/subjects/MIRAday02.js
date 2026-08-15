/* =========================================================
   MIRA DAY 02 SYSTEM
   SUBJECT-001

   DAY 02
   MORNING SHIFT
   FIRST FOLLOW-UP
========================================================= */


/* =========================================================
   DAY 02 DATA
========================================================= */

const MIRA_DAY02 = {

    /* -------------------------------------
       DAY INFO
    ------------------------------------- */

    day:
        2,

    time:
        "08:10",

    title:
        "DAY 02",

    subtitle:
        "MORNING SHIFT",


    /* -------------------------------------
       MORNING MESSAGE
    ------------------------------------- */

    morning: {

        kicker:
            "NULVA INTERNAL SYSTEM",

        title:
            "DAY 02",

        body: `

            <p class="story-text">

                08:10 · MORNING SHIFT

            </p>


            <p class="story-text">

                연구시설의
                정상 운영을 시작합니다.

            </p>


            <p class="story-text">

                전일 발생한
                <strong>CAM-01 신호 이상</strong>은
                시스템 오류로 분류되었습니다.

            </p>


            <p class="observation-status">

                FACILITY STATUS:

                <strong>
                    NORMAL
                </strong>

            </p>

        `

    },


    /* -------------------------------------
       DAY 02 FIRST OBSERVATION
    ------------------------------------- */

    firstObservation: {

        kicker:
            "SUBJECT-001 / OBSERVATION",

        title:
            "아침 관찰 기록",

        body: `

            <p class="story-text">

                MIRA는 챔버 중앙에
                앉아 있습니다.

            </p>


            <p class="story-text">

                관찰 카메라는
                정상적으로 작동하고 있습니다.

            </p>


            <p class="story-text">

                그러나 MIRA는
                연구원이 들어오기 전부터
                카메라를 바라보고 있었습니다.

            </p>


            <p class="story-text anomaly-text">

                관찰 시작 시각:

                <strong>
                    08:07
                </strong>

            </p>

        `

    },


    /* -------------------------------------
       TIME DISCREPANCY
    ------------------------------------- */

    timeDiscrepancy: {

        kicker:
            "SYSTEM LOG / TIME VERIFICATION",

        title:
            "기록 불일치",

        body: `

            <p class="story-text">

                연구원의 관찰 기록:

                <strong>
                    08:10
                </strong>

            </p>


            <p class="story-text">

                CAM-01 내부 기록:

                <strong>
                    08:07
                </strong>

            </p>


            <p class="story-text">

                두 기록 사이에
                <strong>03분의 차이</strong>가
                존재합니다.

            </p>


            <p class="observation-status">

                LOG STATUS:

                <strong>
                    UNRESOLVED
                </strong>

            </p>

        `

    }

};


/* =========================================================
   DAY 02 START
========================================================= */

function startMIRADay02() {

    /*
        이미 DAY 02라면
        다시 실행하지 않는다.
    */

    if (
        gameState.day >= 2
    ) {

        return;

    }


    /*
        DAY 변경
    */

    gameState.day =
        2;


    /*
        새로운 하루 시작
    */

    gameState.time =
        "08:10";


    gameState.actions =
        gameState.maxActions;


    gameState.dayEnded =
        false;


    /*
        시설 상태
    */

    gameState.facilityStatus =
        "NORMAL";


    /*
        연구 기록
    */

    addLog(
        "DAY 02 연구 일정이 시작되었습니다."
    );


    addLog(
        "전일 CAM-01 신호 이상은 시스템 오류로 분류되었습니다."
    );


    /*
        저장
    */

    saveGame();


    /*
        DAY 02 시작 화면
    */

    openMIRADay02Intro();

}


/* =========================================================
   DAY 02 FULL SCREEN INTRO
========================================================= */

function openMIRADay02Intro() {

    /*
        기존 DAY INTRO 제거
    */

    document
        .querySelectorAll(
            ".day-intro"
        )
        .forEach(

            element => {

                element.remove();

            }

        );


    /*
        기존 DAY 02 INTRO 제거
    */

    document
        .querySelectorAll(
            ".mira-day02-intro"
        )
        .forEach(

            element => {

                element.remove();

            }

        );


    /*
        INTRO 생성
    */

    const intro =
        document.createElement(
            "div"
        );


    intro.className =
        "day-intro mira-day02-intro";


    /*
        DAY 02 내용
    */

    intro.innerHTML = `

        <div class="day-intro-system">

            ${MIRA_DAY02.morning.kicker}

        </div>


        <div class="day-intro-day">

            DAY 02

        </div>


        <div class="day-intro-date">

            08:10 · MORNING SHIFT

        </div>


        <div class="day-intro-korean">

            연구시설의 정상 운영을 시작합니다.

        </div>


        <div class="day-intro-detail">

            전일 발생한
            <strong>CAM-01 신호 이상</strong>은
            시스템 오류로 분류되었습니다.

        </div>


        <div class="day-intro-status">

            FACILITY STATUS:

            <strong>
                NORMAL
            </strong>

        </div>


        <button
            type="button"
            class="day-intro-button"
            id="mira-day02-start"
        >

            연구 시작 · START

        </button>

    `;


    /*
        LAB 화면
    */

    const labScreen =
        document.querySelector(
            "#lab-screen"
        );


    if (!labScreen) {

        console.error(
            "NULVA: #lab-screen을 찾을 수 없습니다."
        );

        return;

    }


    labScreen.appendChild(
        intro
    );


    /*
        연구 시작 버튼
    */

    const startButton =
        intro.querySelector(
            "#mira-day02-start"
        );


    if (!startButton) {

        console.error(
            "NULVA: DAY 02 START 버튼을 찾을 수 없습니다."
        );

        return;

    }


    /*
        버튼 클릭
    */

    startButton.addEventListener(

        "click",

        function (event) {

            event.preventDefault();

            event.stopPropagation();


            /*
                중복 클릭 방지
            */

            if (
                startButton.dataset.clicked === "true"
            ) {

                return;

            }


            startButton.dataset.clicked =
                "true";


            startButton.disabled =
                true;


            /*
                INTRO 종료
            */

            intro.classList.add(
                "leaving"
            );


            /*
                다음 단계
            */

            setTimeout(

                function () {

                    intro.remove();


                    showMIRADay02Observation();

                },

                350

            );

        }

    );


    /*
        버튼 포커스
    */

    requestAnimationFrame(

        function () {

            startButton.focus();

        }

    );

}


/* =========================================================
   DAY 02 FIRST OBSERVATION
   NULVA OBSERVATION WINDOW
========================================================= */

function showMIRADay02Observation() {

    /*
        기존 DAY 02 INTRO가 남아있다면 제거
    */

    document
        .querySelectorAll(
            ".mira-day02-intro"
        )
        .forEach(

            element => {

                element.remove();

            }

        );


    /*
        연구 기록
    */

    addLog(
        "DAY 02 아침 관찰 기록이 생성되었습니다."
    );


    /*
        최근 행동
    */

    if (
        gameState.subject
    ) {

        gameState.subject.lastActivity =
            "MIRA는 연구원이 들어오기 전부터 관찰 카메라를 바라보고 있었다.";

    }


    /*
        저장
    */

    saveGame();


    /*
        관찰 팝업 생성
    */

    openMIRADay02ObservationWindow();

}


/* =========================================================
   DAY 02 OBSERVATION WINDOW
========================================================= */

function openMIRADay02ObservationWindow() {

    /*
        기존 관찰창 제거
    */

    document
        .querySelectorAll(
            ".mira-observation-overlay"
        )
        .forEach(

            element => {

                element.remove();

            }

        );


    /*
        OVERLAY
    */

    const overlay =
        document.createElement(
            "div"
        );


    overlay.className =
        "mira-observation-overlay";


    /*
        WINDOW
    */

    overlay.innerHTML = `

        <div
            class="mira-observation-window"
            role="dialog"
            aria-modal="true"
        >


            <div class="mira-observation-header">


                <div class="mira-observation-kicker">

                    ${MIRA_DAY02.firstObservation.kicker}

                </div>


                <button
                    type="button"
                    class="mira-observation-close"
                    id="mira-observation-close"
                    aria-label="닫기"
                >

                    ×

                </button>


            </div>


            <div class="mira-observation-content">


                <h2 class="mira-observation-title">

                    ${MIRA_DAY02.firstObservation.title}

                </h2>


                <div class="mira-observation-body">

                    ${MIRA_DAY02.firstObservation.body}

                </div>


            </div>


            <div class="mira-observation-footer">


                <button
                    type="button"
                    class="mira-observation-button"
                    id="mira-observation-check"
                >

                    기록 확인

                </button>


            </div>


        </div>

    `;


    /*
        LAB 화면
    */

    const labScreen =
        document.querySelector(
            "#lab-screen"
        );


    if (!labScreen) {

        console.error(
            "NULVA: #lab-screen을 찾을 수 없습니다."
        );

        return;

    }


    labScreen.appendChild(
        overlay
    );


    /*
        버튼
    */

    const checkButton =
        overlay.querySelector(
            "#mira-observation-check"
        );


    const closeButton =
        overlay.querySelector(
            "#mira-observation-close"
        );


    /*
        CHECK
    */

    if (checkButton) {

        checkButton.addEventListener(

            "click",

            function (event) {

                event.preventDefault();

                event.stopPropagation();


                overlay.classList.add(
                    "leaving"
                );


                setTimeout(

                    function () {

                        overlay.remove();


                        showMIRADay02TimeDiscrepancy();

                    },

                    300

                );

            }

        );

    }


    /*
        X 버튼
    */

    if (closeButton) {

        closeButton.addEventListener(

            "click",

            function (event) {

                event.preventDefault();

                event.stopPropagation();


                overlay.classList.add(
                    "leaving"
                );


                setTimeout(

                    function () {

                        overlay.remove();

                    },

                    250

                );

            }

        );

    }


    /*
        ESC
    */

    function handleEscape(
        event
    ) {

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        if (
            !document.body.contains(
                overlay
            )
        ) {

            document.removeEventListener(
                "keydown",
                handleEscape
            );

            return;

        }


        overlay.classList.add(
            "leaving"
        );


        setTimeout(

            function () {

                overlay.remove();

            },

            250

        );


        document.removeEventListener(
            "keydown",
            handleEscape
        );

    }


    document.addEventListener(
        "keydown",
        handleEscape
    );


    /*
        포커스
    */

    requestAnimationFrame(

        function () {

            if (
                checkButton
            ) {

                checkButton.focus();

            }

        }

    );

}


/* =========================================================
   DAY 02 TIME DISCREPANCY
   NULVA OBSERVATION WINDOW
========================================================= */

function showMIRADay02TimeDiscrepancy() {

    /*
        연구 기록
    */

    addLog(
        "CAM-01 기록과 연구원 관찰 기록 사이에 03분의 시간 차이가 확인되었습니다."
    );


    /*
        최근 행동
    */

    if (
        gameState.subject
    ) {

        gameState.subject.lastActivity =
            "CAM-01 기록과 연구원 관찰 기록 사이에 03분의 시간 차이가 확인되었다.";

    }


    /*
        저장
    */

    saveGame();


    /*
        기존 기록 불일치 창 제거
    */

    document
        .querySelectorAll(
            ".mira-discrepancy-overlay"
        )
        .forEach(

            element => {

                element.remove();

            }

        );


    /*
        OVERLAY
    */

    const overlay =
        document.createElement(
            "div"
        );


    overlay.className =
        "mira-discrepancy-overlay";


    /*
        WINDOW
    */

    overlay.innerHTML = `

        <div
            class="mira-discrepancy-window"
            role="dialog"
            aria-modal="true"
        >


            <div class="mira-discrepancy-header">


                <div class="mira-discrepancy-kicker">

                    ${MIRA_DAY02.timeDiscrepancy.kicker}

                </div>


                <button
                    type="button"
                    class="mira-discrepancy-close"
                    id="mira-discrepancy-close"
                    aria-label="닫기"
                >

                    ×

                </button>


            </div>


            <div class="mira-discrepancy-content">


                <h2 class="mira-discrepancy-title">

                    ${MIRA_DAY02.timeDiscrepancy.title}

                </h2>


                <div class="mira-discrepancy-body">

                    ${MIRA_DAY02.timeDiscrepancy.body}

                </div>


            </div>


            <div class="mira-discrepancy-footer">


                <button
                    type="button"
                    class="mira-discrepancy-button"
                    id="mira-discrepancy-archive"
                >

                    기록 보관

                </button>


            </div>


        </div>

    `;


    /*
        LAB 화면
    */

    const labScreen =
        document.querySelector(
            "#lab-screen"
        );


    if (!labScreen) {

        console.error(
            "NULVA: #lab-screen을 찾을 수 없습니다."
        );

        return;

    }


    labScreen.appendChild(
        overlay
    );


    /*
        버튼
    */

    const archiveButton =
        overlay.querySelector(
            "#mira-discrepancy-archive"
        );


    const closeButton =
        overlay.querySelector(
            "#mira-discrepancy-close"
        );


    /*
        ARCHIVE
    */

    if (archiveButton) {

        archiveButton.addEventListener(

            "click",

            function (event) {

                event.preventDefault();

                event.stopPropagation();


                /*
                    중복 클릭 방지
                */

                if (
                    archiveButton.dataset.clicked === "true"
                ) {

                    return;

                }


                archiveButton.dataset.clicked =
                    "true";


                archiveButton.disabled =
                    true;


                /*
                    종료 애니메이션
                */

                overlay.classList.add(
                    "leaving"
                );


                setTimeout(

                    function () {

                        overlay.remove();


                        /*
                            기록 보관
                        */

                        addLog(
                            "DAY 02 시간 불일치 기록이 보관되었습니다."
                        );


                        saveGame();


                        showToast(
                            "연구 기록 보관 완료"
                        );

                    },

                    300

                );

            }

        );

    }


    /*
        X 버튼
    */

    if (closeButton) {

        closeButton.addEventListener(

            "click",

            function (event) {

                event.preventDefault();

                event.stopPropagation();


                overlay.classList.add(
                    "leaving"
                );


                setTimeout(

                    function () {

                        overlay.remove();

                    },

                    250

                );

            }

        );

    }


    /*
        ESC
    */

    function handleEscape(
        event
    ) {

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        if (
            !document.body.contains(
                overlay
            )
        ) {

            document.removeEventListener(
                "keydown",
                handleEscape
            );

            return;

        }


        overlay.classList.add(
            "leaving"
        );


        setTimeout(

            function () {

                overlay.remove();

            },

            250

        );


        document.removeEventListener(
            "keydown",
            handleEscape
        );

    }


    document.addEventListener(
        "keydown",
        handleEscape
    );


    /*
        버튼 포커스
    */

    requestAnimationFrame(

        function () {

            if (
                archiveButton
            ) {

                archiveButton.focus();

            }

        }

    );

}


/* =========================================================
   RESET DAY 02
========================================================= */

function resetMIRADay02() {

    /*
        DAY 02 데이터를
        별도로 초기화할 것이 생기면
        여기에 추가한다.
    */

}