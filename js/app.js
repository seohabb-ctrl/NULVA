/* =========================================
   NULVA
   MAIN GAME SCRIPT
========================================= */


/* =========================================
   DOM SHORTCUTS
========================================= */

const $ = (selector) => {

    return document.querySelector(
        selector
    );

};


const $$ = (selector) => {

    return [
        ...document.querySelectorAll(
            selector
        )
    ];

};



/* =========================================
   BASIC UTILITY
========================================= */

function delay(milliseconds) {

    return new Promise(

        resolve => {

            setTimeout(
                resolve,
                milliseconds
            );

        }

    );

}



/* =========================================
   SCREEN
========================================= */

function showScreen(screenId) {

    $$(".screen").forEach(

        screen => {

            screen.classList.add(
                "hidden"
            );

        }

    );


    const screen =
        $(screenId);


    if (screen) {

        screen.classList.remove(
            "hidden"
        );

    }

}



/* =========================================
   TOAST
   NULVA SYSTEM NOTIFICATION
========================================= */

function showToast(message) {

    const toast =
        $("#toast");


    if (!toast) {

        return;

    }


    /*
        기존 타이머 제거
    */

    clearTimeout(
        window.nulvaToastTimer
    );


    /*
        기본 클래스
    */

    toast.classList.add(
        "nulva-toast"
    );


    /*
        기존 표시 상태 초기화
    */

    toast.classList.remove(
        "hidden"
    );


    toast.classList.remove(
        "show"
    );


    /*
        메시지
    */

    toast.textContent =
        message;


    /*
        브라우저가
        class 변화를 인식하도록
        한 프레임 기다린다.
    */

    requestAnimationFrame(

        () => {

            toast.classList.add(
                "show"
            );

        }

    );


    /*
        2.2초 후 사라짐
    */

    window.nulvaToastTimer =

        setTimeout(

            () => {

                toast.classList.remove(
                    "show"
                );


                /*
                    애니메이션 종료 후
                    완전히 숨김
                */

                setTimeout(

                    () => {

                        toast.classList.add(
                            "hidden"
                        );

                    },

                    180

                );

            },

            2200

        );

}



/* =========================================
   BOOT SEQUENCE
========================================= */

const bootLines = [

    "BOOTING SYSTEM ......... COMPLETE",

    "BIOMETRIC SYSTEM ......... ONLINE",

    "CONTAINMENT SYSTEM ....... ONLINE",

    "LIFE SUPPORT ............. ONLINE",

    "CAMERA NETWORK ........... ONLINE",

    "MEMORY DATABASE ........... ERROR",

    "BIOMETRIC DATABASE ...... CONNECT",

    "연구시설 시스템 준비 완료"

];



/* =========================================
   BOOT TYPING
========================================= */

async function typeBootLine(
    element,
    text,
    speed = 24
) {

    /*
        처음에는 빈 줄
    */

    element.textContent = "";


    /*
        타이핑 중인 줄에
        깜빡이는 커서 표시
    */

    element.classList.add(
        "typing"
    );


    /*
        한 글자씩 출력
    */

    for (
        const character
        of text
    ) {

        element.textContent +=
            character;


        await delay(
            speed
        );

    }


    /*
        한 줄의 타이핑이 끝나면
        커서를 제거한다.
    */

    element.classList.remove(
        "typing"
    );

}



/* =========================================
   BOOT SEQUENCE
========================================= */

async function bootSequence() {

    const container =
        $("#boot-lines");


    if (!container) {

        return;

    }


    /*
        이전 부트 로그 제거
    */

    container.innerHTML = "";


    /*
        부팅 전 커서 대기
    */

    await delay(
        1800
    );


    container.classList.add(
        "boot-started"
    );


    /*
        bootLines를 한 줄씩 출력
    */

    for (
        const line
        of bootLines
    ) {

        /*
            현재 줄을 담을 div 생성
        */

        const element =
            document.createElement(
                "div"
            );


        /*
            한글이 포함된 문장은
            한국어 픽셀 폰트 사용
        */

        if (
            /[가-힣]/.test(line)
        ) {

            element.classList.add(
                "korean-system"
            );

        }


        /*
            빈 줄을 먼저 화면에 추가
        */

        container.appendChild(
            element
        );


        /*
            문자를 하나씩 출력
        */

        await typeBootLine(
            element,
            line,
            24
        );


        /*
            한 줄이 끝난 뒤
            잠깐 멈춘다.
        */

        await delay(
            140
        );

    }


    /*
        모든 부트 로그가 끝난 후
        잠시 화면에 유지
    */

    await delay(
        1500
    );


    /*
        부트 로그 전체 제거
    */

    container.innerHTML = "";


    /*
        NULVA 로고 표시
    */

    $("#boot-logo")
        ?.classList
        .remove("hidden");

}



/* =========================================
   SUBJECT LIST
========================================= */

function renderSubjects() {

    const list =
        $("#subject-list");


    if (!list) {

        return;

    }


    /*
        MIRA의 현재 상태를
        화면에 표시하기 전에
        최신 상태를 계산한다.
    */

    if (
        typeof MIRA_syncState ===
        "function"
    ) {

        MIRA_syncState();

    }


    const subject =
        gameState.subject;


    const stateText =
        subject.stateKr
        ||
        "호기심";


    list.innerHTML = `

        <button
            class="subject-card active"
            type="button"
        >

            <div class="id">
                SUBJECT-001
            </div>

            <h3>
                MIRA
            </h3>

            <p>

                <span class="dot"></span>

                ${stateText}

            </p>

        </button>


        <div class="subject-card">

            <div class="id">
                SUBJECT-002
            </div>

            <h3>
                ORBIT
            </h3>

            <p>

                <span class="dot"></span>

                안정

            </p>

        </div>


        <div class="subject-card">

            <div class="id">
                SUBJECT-003
            </div>

            <h3>
                VEIL
            </h3>

            <p>

                <span class="dot"></span>

                격리

            </p>

        </div>


        <div class="subject-card">

            <div class="id">
                SUBJECT-004
            </div>

            <h3>
                ROOT
            </h3>

            <p>

                <span class="dot"></span>

                수면

            </p>

        </div>

    `;

}



/* =========================================
   STAT BAR
========================================= */

function createStat(
    label,
    value
) {

    return `

        <div class="stat">

            <div class="stat-head">

                <span>
                    ${label}
                </span>

                <b>
                    ${value}
                </b>

            </div>


            <div class="bar">

                <i
                    style="
                        width: ${value}%;
                    "
                ></i>

            </div>

        </div>

    `;

}



/* =========================================
   RENDER STATUS
========================================= */

function renderStatus() {

    const subject =
        gameState.subject;


    if (!subject) {

        return;

    }


    /*
        중요

        화면에 상태를 표시하기 전에
        현재 스탯을 기준으로
        MIRA 상태를 다시 계산한다.
    */

    if (
        typeof MIRA_syncState ===
        "function"
    ) {

        MIRA_syncState();

    }


    /*
        DAY
    */

    $("#day-label")
        .textContent =

        String(
            gameState.day
        ).padStart(
            2,
            "0"
        );


    /*
        TIME
    */

    $("#time-label")
        .textContent =
        gameState.time;


    /*
        ACTION
    */

    $("#action-label")
        .textContent =

        `${gameState.actions} / ${gameState.maxActions}`;


    /*
        SUBJECT STATE
    */

    $("#subject-state")
        .textContent =

        subject.stateKr
        ||
        "호기심";


    /*
        LAST ACTIVITY
    */

    $("#last-activity")
        .textContent =

        subject.lastActivity
        ||
        "미라는 연구실 중앙에 서 있다.";


    /*
        STATS
    */

    $("#stats")
        .innerHTML = `

            ${createStat(
                "건강 상태 · HEALTH",
                subject.health
            )}

            ${createStat(
                "스트레스 · STRESS",
                subject.stress
            )}

            ${createStat(
                "신뢰도 · TRUST",
                subject.trust
            )}

            ${createStat(
                "인지 능력 · COGNITION",
                subject.cognition
            )}

            ${createStat(
                "적응도 · ADAPTATION",
                subject.adaptation
            )}

        `;


    /*
        왼쪽 SUBJECT 목록도
        현재 상태와 동기화
    */

    renderSubjects();

}



/* =========================================
   ACTION POINT
========================================= */

function spendAction() {

    if (
        gameState.actions <= 0
    ) {

        showToast(
            "행동력이 없습니다 · NO ACTIONS"
        );


        return false;

    }


    gameState.actions--;


    return true;

}



/* =========================================
   ADD LOG
========================================= */

function addLog(message) {

    gameState.logs.push({

        day:
            gameState.day,

        time:
            gameState.time,

        message:
            message

    });

}



/* =========================================
   OBSERVE
   MIRA OBSERVATION SYSTEM
========================================= */

function observeSubject() {

    MIRA_observe();

}



/* =========================================
   FEED
   MIRA ACTION SYSTEM
========================================= */

function feedSubject() {

    MIRA_feed();

}



/* =========================================
   TALK
   MIRA ACTION SYSTEM
========================================= */

function talkToSubject() {

    MIRA_talk();

}



/* =========================================
   MEMORY
   MIRA ACTION SYSTEM
========================================= */

function openMemory() {

    MIRA_memory();

}



/* =========================================
   EXPERIMENT
   MIRA ACTION SYSTEM
========================================= */

function openExperiment() {

    MIRA_experiment();

}



/* =========================================
   ACTION END CHECK
========================================= */

function checkActionEnd() {

    if (
        gameState.actions > 0
    ) {

        return;

    }


    /*
        아직 첫 번째 이상 현상이
        발생하지 않았다면
        DAY 01의 마지막에 발생시킨다.
    */

    if (
        !gameState.firstAnomalyTriggered
    ) {

        triggerMIRAFirstAnomaly();

        return;

    }


    endDay();

}



/* =========================================
   END DAY
========================================= */

function endDay() {

    if (
        gameState.dayEnded
    ) {

        return;

    }


    gameState.dayEnded =
        true;


    /*
        기존 DAY END openModal 대신
        NULVA 전용 DAY END 창을 사용한다.
    */

    openDayEndWindow();

}



/* =========================================
   NULVA DAY END WINDOW
========================================= */

function openDayEndWindow() {

    /*
        이미 열려 있다면
        중복 생성하지 않는다.
    */

    const existing =
        document.querySelector(
            ".nulva-dayend-overlay"
        );


    if (
        existing
    ) {

        return;

    }


    /*
        Overlay
    */

    const overlay =
        document.createElement(
            "div"
        );


    overlay.className =
        "nulva-dayend-overlay";


    /*
        Window
    */

    const windowElement =
        document.createElement(
            "section"
        );


    windowElement.className =
        "nulva-dayend-window";


    windowElement.setAttribute(
        "role",
        "dialog"
    );


    windowElement.setAttribute(
        "aria-modal",
        "true"
    );


    windowElement.setAttribute(
        "aria-label",
        "DAY END"
    );


    /*
        HEADER
    */

    const header =
        document.createElement(
            "header"
        );


    header.className =
        "nulva-dayend-header";


    const headerTitle =
        document.createElement(
            "div"
        );


    headerTitle.className =
        "nulva-dayend-title";


    headerTitle.textContent =

        `DAY ${String(
            gameState.day
        ).padStart(
            2,
            "0"
        )} / END`;


    /*
        CLOSE
    */

    const closeButton =
        document.createElement(
            "button"
        );


    closeButton.className =
        "nulva-dayend-close";


    closeButton.type =
        "button";


    closeButton.setAttribute(
        "aria-label",
        "연구 종료 창 닫기"
    );


    closeButton.innerHTML =
        "×";


    header.appendChild(
        headerTitle
    );


    header.appendChild(
        closeButton
    );


    /*
        CONTENT
    */

    const content =
        document.createElement(
            "div"
        );


    content.className =
        "nulva-dayend-content";


    /*
        KICKER
    */

    const kicker =
        document.createElement(
            "div"
        );


    kicker.className =
        "nulva-dayend-kicker";


    kicker.textContent =
        "NULVA / DAILY RESEARCH REPORT";


    /*
        TITLE
    */

    const title =
        document.createElement(
            "h2"
        );


    title.className =
        "nulva-dayend-main-title";


    title.textContent =
        "오늘의 연구 종료";


    /*
        DESCRIPTION
    */

    const description =
        document.createElement(
            "p"
        );


    description.className =
        "nulva-dayend-description";


    description.textContent =
        "오늘의 관찰 기록이 저장되었습니다.";


    /*
        DATA GRID
    */

    const dataGrid =
        document.createElement(
            "div"
        );


    dataGrid.className =
        "nulva-dayend-data";


    /*
        RESEARCHER ID
    */

    const researcherBox =
        document.createElement(
            "div"
        );


    researcherBox.className =
        "nulva-dayend-data-item";


    researcherBox.innerHTML = `

        <div
            class="nulva-dayend-data-label"
        >
            RESEARCHER ID
        </div>


        <div
            class="nulva-dayend-data-value"
        >
            ${gameState.researcherId || "-"}
        </div>

    `;


    /*
        DATA
    */

    const dataBox =
        document.createElement(
            "div"
        );


    dataBox.className =
        "nulva-dayend-data-item";


    dataBox.innerHTML = `

        <div
            class="nulva-dayend-data-label"
        >
            DATA
        </div>


        <div
            class="nulva-dayend-data-value"
        >
            ${gameState.data}
        </div>

    `;


    dataGrid.appendChild(
        researcherBox
    );


    dataGrid.appendChild(
        dataBox
    );


    /*
        NEXT MESSAGE
    */

    const nextMessage =
        document.createElement(
            "div"
        );


    nextMessage.className =
        "nulva-dayend-next";


    nextMessage.textContent =
        "다음 연구일을 준비합니다.";


    /*
        CONTENT 조립
    */

    content.appendChild(
        kicker
    );


    content.appendChild(
        title
    );


    content.appendChild(
        description
    );


    content.appendChild(
        dataGrid
    );


    content.appendChild(
        nextMessage
    );


    /*
        FOOTER
    */

    const footer =
        document.createElement(
            "footer"
        );


    footer.className =
        "nulva-dayend-footer";


    /*
        NEXT DAY BUTTON
    */

    const nextButton =
        document.createElement(
            "button"
        );


    nextButton.className =
        "nulva-dayend-next-button";


    nextButton.type =
        "button";


    nextButton.textContent =
        "다음 날";


    footer.appendChild(
        nextButton
    );


    /*
        WINDOW 조립
    */

    windowElement.appendChild(
        header
    );


    windowElement.appendChild(
        content
    );


    windowElement.appendChild(
        footer
    );


    overlay.appendChild(
        windowElement
    );


    document.body.appendChild(
        overlay
    );


    /*
        CLOSE FUNCTION
    */

    function closeDayEnd() {

        document.removeEventListener(
            "keydown",
            handleKeyDown
        );


        overlay.remove();

    }


    /*
        NEXT DAY

        기존 endDay()에서 사용하던
        다음 날 로직을 그대로 유지한다.
    */

    nextButton.addEventListener(

        "click",

        () => {

            closeDayEnd();


            /*
                DAY 01 종료 후
                전용 DAY 02 시스템으로 진입
            */

            if (
                gameState.day === 1
            ) {

                startMIRADay02();

                return;

            }


            /*
                DAY 02 이후
                기존 다음 날 시스템
            */

            startNextDay();

        }

    );


    /*
        X 버튼

        창만 닫는다.
        연구일 진행은 하지 않는다.
    */

    closeButton.addEventListener(

        "click",

        closeDayEnd

    );


    /*
        바깥 영역 클릭
    */

    overlay.addEventListener(

        "click",

        event => {

            if (
                event.target ===
                overlay
            ) {

                closeDayEnd();

            }

        }

    );


    /*
        ESC
    */

    function handleKeyDown(
        event
    ) {

        if (
            event.key ===
            "Escape"
        ) {

            closeDayEnd();

        }

    }


    document.addEventListener(
        "keydown",
        handleKeyDown
    );


    /*
        다음 날 버튼 포커스
    */

    requestAnimationFrame(

        () => {

            nextButton.focus();

        }

    );

}



/* =========================================
   NEXT DAY
========================================= */

function startNextDay() {

    gameState.day++;


    gameState.actions =
        gameState.maxActions;


    gameState.dayEnded =
        false;


    gameState.facilityStatus =
        "NORMAL";


    /*
        다음 날 아침 상태
    */

    gameState.time =
        "08:10";


    /*
        MIRA 상태를 직접 지정하지 않는다.

        전날의 스탯을 기준으로
        새 상태를 자동 판정한다.
    */

    if (
        typeof MIRA_syncState ===
        "function"
    ) {

        MIRA_syncState();

    }


    gameState.subject.lastActivity =
        "미라는 관찰실 중앙에 서 있다.";


    $("#camera-warning")
        .classList
        .add("hidden");


    $("#observation-note")
        .textContent =

        "실험체 001은 연구실 중앙에 서 있다.";


    renderStatus();


    saveGame();


    showToast(

        `DAY ${String(
            gameState.day
        ).padStart(2, "0")} · 연구 시작`

    );

}



/* =========================================
   MODAL
   NULVA 3-LEVEL MODAL SYSTEM
========================================= */

function openModal({

    /*
        type

        story
        → 중요한 스토리 / 사건

        research
        → 일반 연구 기록

        small
        → 짧은 시스템 메시지

        기본값:
        story
    */

    type = "story",

    kicker,

    title,

    body,

    actions = []

}) {


    const modal =
        $("#modal");


    /*
        Modal이 없으면 종료
    */

    if (!modal) {

        return;

    }


    /* =====================================
       기존 모달 스타일 제거
    ===================================== */

    modal.classList.remove(

        "nulva-story-modal",

        "nulva-research-modal",

        "nulva-small-modal"

    );


    /* =====================================
       모달 타입 적용
    ===================================== */

    switch (type) {


        case "research":

            modal.classList.add(
                "nulva-research-modal"
            );

            break;


        case "small":

            modal.classList.add(
                "nulva-small-modal"
            );

            break;


        case "story":

        default:

            modal.classList.add(
                "nulva-story-modal"
            );

            break;

    }


    /* =====================================
       KICKER
    ===================================== */

    $("#modal-kicker")
        .textContent =
        kicker || "";


    /* =====================================
       TITLE
    ===================================== */

    $("#modal-title")
        .textContent =
        title || "";


    /* =====================================
       BODY
    ===================================== */

    $("#modal-body")
        .innerHTML =
        body || "";


    /* =====================================
       ACTIONS 초기화
    ===================================== */

    $("#modal-actions")
        .innerHTML = "";


    /* =====================================
       ACTION BUTTONS
    ===================================== */

    actions.forEach(

        action => {


            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.textContent =
                action.label || "확인";


            /* ---------------------------------
               CONFIRM BUTTON
            --------------------------------- */

            if (
                action.confirm
            ) {

                button.classList.add(
                    "confirm"
                );

            }


            /* ---------------------------------
               BUTTON CLICK
            --------------------------------- */

            button.addEventListener(

                "click",

                () => {


                    /*
                        먼저 모달 닫기
                    */

                    modal.classList.add(
                        "hidden"
                    );


                    /*
                        다음 행동이 있으면 실행
                    */

                    if (

                        typeof action.onClick ===
                        "function"

                    ) {

                        action.onClick();

                    }

                }

            );


            /*
                버튼 추가
            */

            $("#modal-actions")
                .appendChild(
                    button
                );

        }

    );


    /* =====================================
       MODAL OPEN
    ===================================== */

    modal.classList.remove(
        "hidden"
    );

}



/* =========================================
   RESEARCHER ID
   → LAB ACCESS
========================================= */

async function confirmResearcher() {

    const input =
        $("#researcher-id");


    const id =
        input.value.trim();


    /*
        ID가 비어 있으면
        연구소에 들어가지 않는다.
    */

    if (!id) {

        input.focus();


        showToast(

            "연구원 ID가 필요합니다 · ID REQUIRED"

        );


        return;

    }


    /*
        연구원 ID 저장
    */

    gameState.researcherId =
        id.toUpperCase();


    /*
        DAY 01 초기화
    */

    gameState.gameStarted =
        true;


    gameState.day =
        1;


    gameState.time =
        "08:10";


    gameState.actions =
        gameState.maxActions;


    gameState.dayEnded =
        false;


    /*
        MIRA의 현재 스탯 기준으로
        상태를 확정한다.
    */

    if (
        typeof MIRA_syncState ===
        "function"
    ) {

        MIRA_syncState();

    }


    /*
        데이터 저장
    */

    saveGame();


    /*
        연구소 화면에 표시될
        실험체 / 상태 데이터 준비
    */

    renderSubjects();

    renderStatus();


    /*
        연구원 인증 화면에서
        바로 LAB으로 보내지 않고
        잠깐 ACCESS 화면을 보여준다.
    */

    showToast(
        "PERSONNEL VERIFIED · 연구원 인증 완료"
    );


    await delay(
        650
    );


    /*
        LAB 화면으로 전환
    */

    showScreen(
        "#lab-screen"
    );


    /*
        LAB 화면이 나타난 뒤
        약간의 부팅 시간을 준다.
    */

    await delay(
        350
    );


    /*
        첫 진입 메시지
    */

    await playDayIntro();

}



/* =========================================
   DAY INTRO
   FULL SCREEN NULVA INTRO
========================================= */

async function playDayIntro(
    dayNumber = gameState.day
) {

    /*
        LAB 화면이 나타난 뒤
        잠시 대기
    */

    await delay(
        250
    );


    /*
        시스템 온라인 메시지
    */

    showToast(
        "NULVA INTERNAL SYSTEM · ONLINE"
    );


    await delay(
        700
    );


    /*
        기존 DAY INTRO가 있다면 제거
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
        DAY INTRO 생성
    */

    const dayIntro =
        document.createElement(
            "div"
        );


    dayIntro.className =
        "day-intro";


    /*
        현재 DAY 번호 사용
    */

    const formattedDay =
        String(
            dayNumber
        ).padStart(
            2,
            "0"
        );


    dayIntro.innerHTML = `

        <div class="day-intro-system">
            NULVA INTERNAL SYSTEM
        </div>


        <div class="day-intro-day">
            DAY ${formattedDay}
        </div>


        <div class="day-intro-date">
            08:10 · MORNING SHIFT
        </div>


        <div class="day-intro-korean">
            연구시설 운영을 시작합니다.
        </div>

    `;


    /*
        LAB 화면에 추가
    */

    document
        .querySelector(
            "#lab-screen"
        )
        ?.appendChild(
            dayIntro
        );


    /*
        DAY INTRO 유지
    */

    await delay(
        1900
    );


    /*
        퇴장 애니메이션
    */

    dayIntro.classList.add(
        "leaving"
    );


    await delay(
        450
    );


    /*
        제거
    */

    dayIntro.remove();


    /*
        연구 시작 메시지
    */

    showToast(
        `DAY ${formattedDay} · 연구시설 운영 시작`
    );

}



/* =========================================
   ACTION BUTTONS
========================================= */

function setupActionButtons() {

    $$(".action-bar button")

        .forEach(

            button => {

                button.addEventListener(

                    "click",

                    () => {

                        const action =
                            button.dataset.action;


                        switch (action) {


                            case "observe":

                                observeSubject();

                                break;


                            case "feed":

                                feedSubject();

                                break;


                            case "talk":

                                talkToSubject();

                                break;


                            case "experiment":

                                openExperiment();

                                break;


                            case "memory":

                                openMemory();

                                break;


                        }

                    }

                );

            }

        );

}



/* =========================================
   BOOT BUTTON
========================================= */

function setupBoot() {

    $("#boot-start")
        ?.addEventListener(

            "click",

            () => {

                showScreen(
                    "#researcher-screen"
                );

            }

        );

}



/* =========================================
   RESEARCHER INPUT
========================================= */

function setupResearcherInput() {

    /*
        CONFIRM
    */

    $("#researcher-confirm")
        ?.addEventListener(

            "click",

            confirmResearcher

        );


    /*
        ENTER
    */

    $("#researcher-id")
        ?.addEventListener(

            "keydown",

            event => {

                if (
                    event.key === "Enter"
                ) {

                    confirmResearcher();

                }

            }

        );


    /*
        SIGN UP
    */

    $("#researcher-signup")
        ?.addEventListener(

            "click",

            openResearcherSignup

        );

}

/* =========================================
   RESEARCHER SIGN UP
========================================= */

function openResearcherSignup() {

    /*
        이미 SIGN UP 창이 열려 있으면
        새로 만들지 않는다.
    */

    const existingSignup =
        document.querySelector(
            ".nulva-signup-overlay"
        );

    if (existingSignup) {
        return;
    }


    /*
        OVERLAY
    */

    const overlay =
        document.createElement(
            "div"
        );


    overlay.className =
        "nulva-signup-overlay";


    /*
        WINDOW
    */

    overlay.innerHTML = `

        <div
            class="nulva-signup-window"
            role="dialog"
            aria-modal="true"
            aria-labelledby="nulva-signup-title"
        >


            <div class="nulva-signup-header">


                <div class="nulva-signup-system">

                    NULVA INTERNAL SYSTEM

                </div>


                <div class="nulva-signup-status">

                    PERSONNEL REGISTRATION

                </div>


            </div>


            <div class="nulva-signup-content">


                <div class="nulva-signup-kicker">

                    RESEARCHER REGISTRATION

                </div>


                <h2 id="nulva-signup-title">

                    연구원 등록

                </h2>


                <p>

                    신규 연구원 정보를 등록합니다.

                </p>


                <div class="nulva-signup-field">


                    <label
                        for="signup-name"
                    >

                        RESEARCHER NAME

                    </label>


                    <input
                        id="signup-name"
                        type="text"
                        maxlength="24"
                        autocomplete="off"
                        placeholder="RESEARCHER NAME"
                    >

                </div>


                <div class="nulva-signup-field">


                    <label
                        for="signup-id"
                    >

                        RESEARCHER ID

                    </label>


                    <input
                        id="signup-id"
                        type="text"
                        maxlength="18"
                        autocomplete="off"
                        placeholder="RESEARCHER ID"
                    >

                </div>


                <div class="nulva-signup-notice">

                    등록된 정보는
                    연구 및 실험체 관리 기록에 사용됩니다.

                </div>


            </div>


            <div class="nulva-signup-actions">


                <button
                    type="button"
                    class="nulva-signup-cancel"
                    id="nulva-signup-cancel"
                >

                    CANCEL

                </button>


                <button
                    type="button"
                    class="nulva-signup-submit"
                    id="nulva-signup-submit"
                >

                    REGISTER

                </button>


            </div>


            <div class="nulva-signup-footer">

                <span>

                    NULVA PERSONNEL SYSTEM

                </span>


                <span>

                    AUTHORIZATION REQUIRED

                </span>

            </div>


        </div>

    `;


    /*
        연구원 화면 위에 표시
    */

    const researcherScreen =
        document.querySelector(
            "#researcher-screen"
        );


    if (!researcherScreen) {

        console.error(
            "NULVA: #researcher-screen을 찾을 수 없습니다."
        );

        return;

    }


    researcherScreen.appendChild(
        overlay
    );


    /*
        ELEMENTS
    */

    const nameInput =
        overlay.querySelector(
            "#signup-name"
        );


    const idInput =
        overlay.querySelector(
            "#signup-id"
        );


    const cancelButton =
        overlay.querySelector(
            "#nulva-signup-cancel"
        );


    const submitButton =
        overlay.querySelector(
            "#nulva-signup-submit"
        );


    /*
        CANCEL
    */

    cancelButton?.addEventListener(

        "click",

        function () {

            closeResearcherSignup();

        }

    );


    /*
        REGISTER
    */

    submitButton?.addEventListener(

        "click",

        function () {

            const name =
                nameInput.value.trim();


            const id =
                idInput.value.trim();


            /*
                이름 확인
            */

            if (!name) {

                nameInput.focus();

                showToast(
                    "RESEARCHER NAME REQUIRED"
                );

                return;

            }


            /*
                ID 확인
            */

            if (!id) {

                idInput.focus();

                showToast(
                    "RESEARCHER ID REQUIRED"
                );

                return;

            }


            /*
                현재 연구원 입력창에
                ID를 자동으로 넣는다.
            */

            $("#researcher-id")
                .value =
                id.toUpperCase();


            /*
                등록 완료
            */

            closeResearcherSignup();


            showToast(
                `PERSONNEL REGISTERED · ${name}`
            );


            /*
                잠시 후
                기존 CONFIRM 버튼으로
                인증을 진행할 수 있다.
            */

        }

    );


    /*
        ENTER
    */

    idInput?.addEventListener(

        "keydown",

        function (event) {

            if (
                event.key === "Enter"
            ) {

                submitButton.click();

            }

        }

    );


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


        closeResearcherSignup();


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
        CLOSE
    */

    function closeResearcherSignup() {

        overlay.classList.add(
            "leaving"
        );


        setTimeout(

            function () {

                overlay.remove();

                document.removeEventListener(
                    "keydown",
                    handleEscape
                );

            },

            220

        );

    }


    /*
        FOCUS
    */

    requestAnimationFrame(

        function () {

            nameInput?.focus();

        }

    );

}

/* =========================================
   INITIALIZE
========================================= */

function initializeGame() {

    loadGame();


    /*
        저장 데이터가 있다면
        로드 직후 상태를 동기화한다.
    */

    if (
        typeof MIRA_syncState ===
        "function"
    ) {

        MIRA_syncState();

    }


    renderSubjects();


    renderStatus();


    setupBoot();


    setupResearcherInput();


    setupActionButtons();


    bootSequence();

}



/* =========================================
   START
========================================= */

initializeGame();