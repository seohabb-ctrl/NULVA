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

        예:

        STRESS ↑
        → TENSE

        TRUST ↑ + STRESS ↓
        → TRUSTING

        COGNITION ↑
        → AWARE

        ADAPTATION ↑
        → ADAPTED

        HEALTH ↓ / STRESS ↑↑
        → UNSTABLE
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


    openModal({

        kicker:
            `DAY ${String(
                gameState.day
            ).padStart(2, "0")} / END`,

        title:
            "오늘의 연구 종료",

        body: `

            <p class="story-text">

                오늘의 관찰 기록이
                저장되었습니다.

            </p>


            <p class="story-text">

                연구원 ID:

                <strong>
                    ${gameState.researcherId}
                </strong>

            </p>


            <p class="story-text">

                DATA:

                <strong>
                    ${gameState.data}
                </strong>

            </p>


            <p class="story-text">

                다음 연구일을 준비합니다.

            </p>

        `,

        actions: [

            {

                label:
                    "다음 날",

                confirm:
                    true,

                onClick:
                    () => {


                    /*
                        DAY 01 종료 후에는
                        전용 DAY 02 시스템으로 진입한다.
                    */

                    if (
                        gameState.day === 1
                    ) {

                        startMIRADay02();

                        return;

                    }


                    /*
                        DAY 02 이후부터는
                        기존 다음 날 시스템 사용
                    */

                    startNextDay();

                }

            }

        ]

    });

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
   DAY 01 INTRO
========================================= */

async function playDayIntro() {

    /*
        LAB 화면이 먼저 나타난 뒤
        시스템 부팅 시간을 준다.
    */

    await delay(
        250
    );


    /*
        시스템 접속 메시지
    */

    showToast(
        "NULVA INTERNAL SYSTEM · ONLINE"
    );


    await delay(
        700
    );


    /*
        DAY 01 표시
    */

    const dayIntro =
        document.createElement(
            "div"
        );


    dayIntro.className =
        "day-intro";


    dayIntro.innerHTML = `

        <div class="day-intro-system">
            NULVA INTERNAL SYSTEM
        </div>

        <div class="day-intro-day">
            DAY 01
        </div>

        <div class="day-intro-date">
            08:10 · MORNING SHIFT
        </div>

        <div class="day-intro-korean">
            연구시설 운영을 시작합니다.
        </div>

    `;


    document
        .querySelector("#lab-screen")
        ?.appendChild(
            dayIntro
        );


    /*
        DAY 01 연출 유지
    */

    await delay(
        1900
    );


    /*
        인트로 제거
    */

    dayIntro.classList.add(
        "leaving"
    );


    await delay(
        450
    );


    dayIntro.remove();


    /*
        첫 연구 시작 메시지
    */

    showToast(
        "DAY 01 · 연구시설 운영 시작"
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

    $("#researcher-confirm")
        ?.addEventListener(

            "click",

            confirmResearcher

        );


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