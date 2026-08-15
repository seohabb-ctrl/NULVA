/* =========================================================
   MIRA OBSERVATION SYSTEM
   SUBJECT-001

   OBSERVE
   STATE BASED OBSERVATION
   ACTION HISTORY
   OBSERVATION FATIGUE
   ANOMALY
   MEMORY
========================================================= */


/* =========================================================
   OBSERVATION DATABASE
========================================================= */

const MIRA_OBSERVATIONS = {

    1: {

        /* -------------------------------------
           CURIOUS / NORMAL
        ------------------------------------- */

        normal: [

            {

                text:
                    "미라는 관찰 카메라를 약 03:17 동안 응시했다.",

                note:
                    "특이사항 없음. 생체 반응은 정상 범위.",

                state:
                    "관찰됨"

            },


            {

                text:
                    "미라는 챔버 중앙에서 천천히 주변을 살폈다.",

                note:
                    "주변 환경에 대한 지속적인 관심이 확인된다.",

                state:
                    "관심"

            },


            {

                text:
                    "미라는 연구원이 움직이자 잠시 시선을 옮겼다.",

                note:
                    "연구원의 움직임에 반응하는 것으로 보인다.",

                state:
                    "반응"

            }

        ],


        /* -------------------------------------
           TRUSTING
        ------------------------------------- */

        highTrust: [

            {

                text:
                    "미라는 연구원이 가까이 다가오자 먼저 시선을 맞췄다.",

                note:
                    "연구원에 대한 회피 행동이 감소했다.",

                state:
                    "친밀"

            },


            {

                text:
                    "미라는 관찰 카메라보다 연구원을 더 오래 바라봤다.",

                note:
                    "대상의 관심이 관찰 장비에서 연구원에게 이동했다.",

                state:
                    "관심"

            },


            {

                text:
                    "미라는 연구원의 움직임을 확인한 뒤 긴장을 풀었다.",

                note:
                    "연구원의 존재를 위협으로 인식하지 않는 것으로 보인다.",

                state:
                    "안정"

            }

        ],


        /* -------------------------------------
           TENSE
        ------------------------------------- */

        highStress: [

            {

                text:
                    "미라는 관찰 카메라가 움직이자 챔버 구석으로 이동했다.",

                note:
                    "관찰 장비에 대한 회피 반응이 확인된다.",

                state:
                    "불안"

            },


            {

                text:
                    "미라는 움직임을 멈추고 몸을 낮췄다.",

                note:
                    "스트레스 반응으로 추정되는 행동이 관찰되었다.",

                state:
                    "긴장"

            },


            {

                text:
                    "미라는 연구원의 움직임을 확인한 뒤 한동안 시선을 피했다.",

                note:
                    "대상과의 직접적인 상호작용을 회피하는 경향이 증가했다.",

                state:
                    "경계"

            }

        ],


        /* -------------------------------------
           AWARE
        ------------------------------------- */

        highCognition: [

            {

                text:
                    "미라는 카메라가 움직이기 직전 시선을 먼저 옮겼다.",

                note:
                    "관찰 장비의 움직임을 예측했을 가능성이 있다.",

                state:
                    "인지"

            },


            {

                text:
                    "미라는 연구원의 손이 움직이는 방향을 정확하게 따라갔다.",

                note:
                    "단순 반사 행동으로 보기 어려운 반응이다.",

                state:
                    "관찰"

            },


            {

                text:
                    "미라는 연구원이 기록 장치를 조작하는 동안 시선을 고정했다.",

                note:
                    "연구원의 행동과 주변 장비 사이의 연관성을 추적하는 것으로 보인다.",

                state:
                    "분석"

            }

        ],


        /* -------------------------------------
           ADAPTED
        ------------------------------------- */

        adaptive: [

            {

                text:
                    "미라는 관찰 카메라의 움직임에 더 이상 반응하지 않았다.",

                note:
                    "반복적인 관찰 환경에 대한 적응 가능성이 있다.",

                state:
                    "적응"

            },


            {

                text:
                    "미라는 시설 내부의 소음에도 특별한 반응을 보이지 않았다.",

                note:
                    "반복적인 환경 자극에 대한 반응이 감소했다.",

                state:
                    "적응"

            },


            {

                text:
                    "미라는 이전과 동일한 환경 자극을 받은 뒤 평소와 같은 행동을 유지했다.",

                note:
                    "시설 환경에 대한 행동적 적응이 진행된 것으로 보인다.",

                state:
                    "안정"

            }

        ],


        /* -------------------------------------
           UNSTABLE
        ------------------------------------- */

        unstable: [

            {

                text:
                    "미라는 챔버 안을 불규칙하게 이동한 뒤 갑자기 움직임을 멈췄다.",

                note:
                    "행동 패턴의 불규칙성이 증가했다.",

                state:
                    "불안정"

            },


            {

                text:
                    "미라는 주변을 반복적으로 확인하며 같은 위치를 여러 차례 이동했다.",

                note:
                    "생체 스트레스와 관련된 반복 행동 가능성이 있다.",

                state:
                    "불안정"

            },


            {

                text:
                    "미라는 관찰 카메라와 연구원을 번갈아 바라보며 움직임을 반복했다.",

                note:
                    "대상의 행동 패턴이 평소보다 불규칙하다.",

                state:
                    "이상 반응"

            }

        ],


        /* -------------------------------------
           FIRST ANOMALY
        ------------------------------------- */

        anomaly: [

            {

                text:
                    "미라는 꺼져 있는 관찰 카메라를 바라보고 있었다.",

                note:
                    "CAM-01은 현재 비활성 상태다. 대상이 카메라의 상태를 인지하고 있는지 확인이 필요하다.",

                state:
                    "이상 반응"

            },


            {

                text:
                    "미라는 카메라가 작동하지 않는 동안에도 렌즈의 위치를 정확히 바라봤다.",

                note:
                    "영상 신호가 없는 상태에서 대상의 시선 방향이 카메라 위치와 일치했다.",

                state:
                    "주의"

            },


            {

                text:
                    "미라는 관찰 카메라가 꺼진 뒤에도 카메라를 향한 시선을 유지했다.",

                note:
                    "비활성 장비에 대한 지속적인 인지 가능성이 관찰되었다.",

                state:
                    "이상 반응"

            }

        ]

    }

};



/* =========================================================
   OBSERVATION COUNT
========================================================= */

let MIRA_observationCount = 0;



/* =========================================================
   GET CURRENT DAY DATA
========================================================= */

function getMIRADayData() {

    const day =
        gameState.day || 1;


    return (

        MIRA_OBSERVATIONS[day]

        ||

        MIRA_OBSERVATIONS[1]

    );

}



/* =========================================================
   GET CURRENT MIRA CONDITION
========================================================= */

function getMIRACurrentCondition() {

    if (

        typeof MIRA_getCondition ===
        "function"

    ) {

        return MIRA_getCondition();

    }


    return "NORMAL";

}



/* =========================================================
   GET OBSERVATION POOL
========================================================= */

function getMIRAObservationPool() {

    const data =
        getMIRADayData();


    const subject =
        gameState.subject;


    if (!subject) {

        return data.normal;

    }


    const condition =
        getMIRACurrentCondition();


    const stress =
        subject.stress || 0;


    const trust =
        subject.trust || 0;


    const cognition =
        subject.cognition || 0;


    const adaptation =
        subject.adaptation || 0;


    const anomalyActive =
        gameState.firstAnomalyTriggered === true;



    /* =====================================================
       PRIORITY

       ANOMALY
       ↓
       UNSTABLE
       ↓
       TENSE
       ↓
       TRUSTING
       ↓
       AWARE
       ↓
       ADAPTED
       ↓
       NORMAL
    ===================================================== */


    /*
        FIRST ANOMALY
    */

    if (

        anomalyActive

        &&

        data.anomaly?.length

    ) {

        return data.anomaly;

    }


    /*
        UNSTABLE
    */

    if (

        condition === "UNSTABLE"

        &&

        data.unstable?.length

    ) {

        return data.unstable;

    }


    /*
        TENSE
    */

    if (

        condition === "TENSE"

        &&

        data.highStress?.length

    ) {

        return data.highStress;

    }


    /*
        TRUSTING
    */

    if (

        condition === "TRUSTING"

        &&

        data.highTrust?.length

    ) {

        return data.highTrust;

    }


    /*
        AWARE
    */

    if (

        condition === "AWARE"

        &&

        data.highCognition?.length

    ) {

        return data.highCognition;

    }


    /*
        ADAPTED
    */

    if (

        condition === "ADAPTED"

        &&

        data.adaptive?.length

    ) {

        return data.adaptive;

    }


    /*
        안전장치
    */

    if (

        adaptation >= 70

        &&

        data.adaptive?.length

    ) {

        return data.adaptive;

    }


    if (

        cognition >= 70

        &&

        data.highCognition?.length

    ) {

        return data.highCognition;

    }


    if (

        stress >= 50

        &&

        data.highStress?.length

    ) {

        return data.highStress;

    }


    if (

        trust >= 75

        &&

        data.highTrust?.length

    ) {

        return data.highTrust;

    }


    /*
        기본 관찰
    */

    return data.normal;

}



/* =========================================================
   GET OBSERVATION
========================================================= */

function getMIRAObservation() {

    const pool =
        getMIRAObservationPool();


    if (

        !pool

        ||

        pool.length === 0

    ) {

        return {

            text:
                "현재 관찰 가능한 특이사항이 없다.",

            note:
                "관찰 데이터 없음.",

            state:
                "정상"

        };

    }


    const index =

        MIRA_observationCount

        %

        pool.length;


    const result =
        pool[index];


    MIRA_observationCount++;


    return result;

}



/* =========================================================
   CREATE OBSERVATION MEMORY
========================================================= */

function MIRA_recordObservationMemory(
    observation,
    condition
) {

    /*
        MEMORY 시스템이 아직 없다면
        아무것도 하지 않는다.
    */

    if (

        typeof MIRA_addMemory !==
        "function"

    ) {

        return null;

    }


    /*
        첫 번째 관찰
    */

    if (

        MIRA_observationCount === 1

    ) {

        return MIRA_addMemory({

            id:
                `DAY${String(
                    gameState.day
                ).padStart(
                    2,
                    "0"
                )}_FIRST_OBSERVE`,

            day:
                gameState.day,

            time:
                gameState.time,

            type:
                "OBSERVE",

            title:
                "첫 번째 관찰",

            text:
                "연구원이 처음으로 MIRA의 행동을 기록했다. "
                +
                observation.text,

            importance:
                2

        });

    }


    /*
        이상 현상
        → RISK
    */

    if (

        gameState.firstAnomalyTriggered === true

    ) {

        return MIRA_addMemory({

            id:
                `DAY${String(
                    gameState.day
                ).padStart(
                    2,
                    "0"
                )}_ANOMALY_OBSERVE_${Date.now()}`,

            day:
                gameState.day,

            time:
                gameState.time,

            type:
                "RISK",

            title:
                "이상 현상 관찰",

            text:
                observation.text
                +
                " "
                +
                observation.note,

            importance:
                5

        });

    }


    /*
        불안정 상태
        → 강한 기억
    */

    if (

        condition === "UNSTABLE"

    ) {

        return MIRA_addMemory({

            id:
                `DAY${String(
                    gameState.day
                ).padStart(
                    2,
                    "0"
                )}_UNSTABLE_OBSERVE_${Date.now()}`,

            day:
                gameState.day,

            time:
                gameState.time,

            type:
                "OBSERVE",

            title:
                "불안정 상태 관찰",

            text:
                observation.text,

            importance:
                3

        });

    }


    /*
        TRUSTING
        AWARE

        → 의미 있는 기억
    */

    if (

        condition === "TRUSTING"

        ||

        condition === "AWARE"

    ) {

        return MIRA_addMemory({

            id:
                `DAY${String(
                    gameState.day
                ).padStart(
                    2,
                    "0"
                )}_OBSERVE_${condition}_${Date.now()}`,

            day:
                gameState.day,

            time:
                gameState.time,

            type:
                "OBSERVE",

            title:
                condition === "TRUSTING"

                ?

                "친밀한 관찰"

                :

                "인지 반응 관찰",

            text:
                observation.text,

            importance:
                2

        });

    }


    /*
        일반 관찰

        모든 관찰을 기억시키지 않고
        일정 간격으로만 저장한다.

        3회에 한 번.
    */

    if (

        MIRA_observationCount % 3 !== 0

    ) {

        return null;

    }


    return MIRA_addMemory({

        id:
            `DAY${String(
                gameState.day
            ).padStart(
                2,
                "0"
            )}_OBSERVE_${Date.now()}`,

        day:
            gameState.day,

        time:
            gameState.time,

        type:
            "OBSERVE",

        title:
            "관찰 기록",

        text:
            observation.text,

        importance:
            1

    });

}



/* =========================================================
   OBSERVATION WINDOW
   NULVA HUD STYLE
========================================================= */

function MIRA_openObservationWindow(
    observation
) {

    /*
        이미 열려 있으면
        중복 생성하지 않는다.
    */

    const existing =
        document.querySelector(
            ".nulva-observation-overlay"
        );


    if (
        existing
    ) {

        return;

    }


    /*
        현재 MIRA 상태
    */

    const currentState =

        gameState.subject.stateKr

        ||

        "호기심";


    /*
        Overlay
    */

    const overlay =
        document.createElement(
            "div"
        );


    overlay.className =
        "nulva-observation-overlay";


    /*
        Window
    */

    const windowElement =
        document.createElement(
            "section"
        );


    windowElement.className =
        "nulva-observation-window";


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
        "OBSERVATION"
    );


    /*
        Header
    */

    const header =
        document.createElement(
            "header"
        );


    header.className =
        "nulva-observation-header";


    const headerTitle =
        document.createElement(
            "div"
        );


    headerTitle.className =
        "nulva-observation-title";


    headerTitle.textContent =
        "OBSERVATION";


    /*
        Close Button
    */

    const closeButton =
        document.createElement(
            "button"
        );


    closeButton.className =
        "nulva-observation-close";


    closeButton.type =
        "button";


    closeButton.setAttribute(
        "aria-label",
        "관찰 기록 닫기"
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
        Content
    */

    const content =
        document.createElement(
            "div"
        );


    content.className =
        "nulva-observation-content";


    /*
        Kicker
    */

    const kicker =
        document.createElement(
            "div"
        );


    kicker.className =
        "nulva-observation-kicker";


    kicker.textContent =
        "SUBJECT-001 / OBSERVATION";


    /*
        Main Title
    */

    const mainTitle =
        document.createElement(
            "h2"
        );


    mainTitle.className =
        "nulva-observation-main-title";


    mainTitle.textContent =
        "관찰 기록";


    /*
        Observation Text
    */

    const observationText =
        document.createElement(
            "p"
        );


    observationText.className =
        "nulva-observation-text";


    observationText.textContent =

        observation.text

        ||

        "현재 관찰 가능한 특이사항이 없다.";


    /*
        Observation Note
    */

    const note =
        document.createElement(
            "div"
        );


    note.className =
        "nulva-observation-note";


    note.textContent =

        observation.note

        ||

        "관찰 데이터 없음.";


    /*
        Status
    */

    const status =
        document.createElement(
            "div"
        );


    status.className =
        "nulva-observation-status";


    /*
        Observation Status
    */

    const observationStatus =
        document.createElement(
            "div"
        );


    observationStatus.className =
        "nulva-observation-status-item";


    const observationStatusLabel =
        document.createElement(
            "div"
        );


    observationStatusLabel.className =
        "nulva-observation-status-label";


    observationStatusLabel.textContent =
        "OBSERVATION";


    const observationStatusValue =
        document.createElement(
            "div"
        );


    observationStatusValue.className =
        "nulva-observation-status-value";


    observationStatusValue.textContent =

        observation.state

        ||

        "정상";


    observationStatus.appendChild(
        observationStatusLabel
    );


    observationStatus.appendChild(
        observationStatusValue
    );


    /*
        MIRA State
    */

    const miraStatus =
        document.createElement(
            "div"
        );


    miraStatus.className =
        "nulva-observation-status-item";


    const miraStatusLabel =
        document.createElement(
            "div"
        );


    miraStatusLabel.className =
        "nulva-observation-status-label";


    miraStatusLabel.textContent =
        "MIRA STATE";


    const miraStatusValue =
        document.createElement(
            "div"
        );


    miraStatusValue.className =
        "nulva-observation-status-value";


    miraStatusValue.textContent =
        currentState;


    miraStatus.appendChild(
        miraStatusLabel
    );


    miraStatus.appendChild(
        miraStatusValue
    );


    /*
        Status 조립
    */

    status.appendChild(
        observationStatus
    );


    status.appendChild(
        miraStatus
    );


    /*
        Content 조립
    */

    content.appendChild(
        kicker
    );


    content.appendChild(
        mainTitle
    );


    content.appendChild(
        observationText
    );


    content.appendChild(
        note
    );


    content.appendChild(
        status
    );


    /*
        Footer
    */

    const footer =
        document.createElement(
            "footer"
        );


    footer.className =
        "nulva-observation-footer";


    const confirmButton =
        document.createElement(
            "button"
        );


    confirmButton.className =
        "nulva-observation-confirm";


    confirmButton.type =
        "button";


    confirmButton.textContent =
        "기록 확인";


    footer.appendChild(
        confirmButton
    );


    /*
        Window 조립
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
        닫기 함수
    */

    function closeObservation() {

        document.removeEventListener(
            "keydown",
            handleKeyDown
        );


        overlay.remove();

    }


    /*
        X 버튼
    */

    closeButton.addEventListener(
        "click",
        closeObservation
    );


    /*
        기록 확인
    */

    confirmButton.addEventListener(
        "click",
        closeObservation
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

                closeObservation();

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

            closeObservation();

        }

    }


    document.addEventListener(
        "keydown",
        handleKeyDown
    );


    /*
        X 버튼 포커스
    */

    requestAnimationFrame(

        () => {

            closeButton.focus();

        }

    );

}



/* =========================================================
   MIRA OBSERVE
========================================================= */

function MIRA_observe() {

    /*
        행동력 확인
    */

    if (

        !spendAction()

    ) {

        return;

    }



    /*
        행동 기록
    */

    if (

        typeof MIRA_recordAction ===
        "function"

    ) {

        MIRA_recordAction(
            "OBSERVE"
        );

    }



    /*
        기본 효과

        STRESS +2
        ADAPTATION +3
    */

    if (

        typeof MIRA_applyObserveEffect ===
        "function"

    ) {

        MIRA_applyObserveEffect();

    }


    /*
        현재 상태 계산
    */

    if (

        typeof MIRA_updateState ===
        "function"

    ) {

        MIRA_updateState();

    }



    /*
        관찰 결과
    */

    const observation =
        getMIRAObservation();


    /*
        현재 MIRA 상태

        관찰 결과의 state와
        절대로 섞지 않는다.
    */

    const currentCondition =
        getMIRACurrentCondition();


    /*
        최근 활동
    */

    gameState.subject.lastActivity =
        observation.text;



    /*
        첫 관찰 시간
    */

    if (

        MIRA_observationCount === 1

    ) {

        gameState.time =
            "10:20";

    }



    /*
        MEMORY 생성

        관찰 결과를 기억 데이터에 기록한다.
    */

    MIRA_recordObservationMemory(

        observation,

        currentCondition

    );



    /*
        최근 3회 연속 OBSERVE 확인
    */

    const repeatedObserve =

        typeof MIRA_isRepeatedAction ===
        "function"

        &&

        MIRA_isRepeatedAction(
            "OBSERVE",
            3
        );



    /*
        관찰 피로 이벤트

        30% 확률
    */

    if (

        repeatedObserve

        &&

        typeof MIRA_randomChance ===
        "function"

        &&

        MIRA_randomChance(.30)

    ) {


        /*
            피로 효과
        */

        if (

            typeof MIRA_changeStats ===
            "function"

        ) {

            MIRA_changeStats({

                health:
                    -5,

                stress:
                    5

            });

        }


        gameState.subject.lastActivity =
            "반복적인 관찰 이후 MIRA의 활력 지수가 감소했다.";


        /*
            피로 MEMORY

            기존 EVENT 대신 RISK로 저장
        */

        if (

            typeof MIRA_addMemory ===
            "function"

        ) {

            MIRA_addMemory({

                id:
                    `DAY${String(
                        gameState.day
                    ).padStart(
                        2,
                        "0"
                    )}_OBSERVATION_FATIGUE_${Date.now()}`,

                day:
                    gameState.day,

                time:
                    gameState.time,

                type:
                    "RISK",

                title:
                    "관찰 피로",

                text:
                    "반복적인 관찰 이후 MIRA의 활력 지수가 감소했다.",

                importance:
                    3

            });

        }



        /*
            상태 재판정
        */

        if (

            typeof MIRA_updateState ===
            "function"

        ) {

            MIRA_updateState();

        }



        /*
            RISK 창

            기존 EVENT 모달은 사용하지 않는다.
        */

        if (

            typeof MIRA_actionEvent ===
            "function"

        ) {

            MIRA_actionEvent(

                "SUBJECT-001 / OBSERVATION RISK",

                "관찰 피로",

                `

                    <p class="story-text">

                        반복적인 관찰 이후
                        MIRA의 활력 지수가
                        일시적으로 감소했습니다.

                    </p>


                    <p class="story-text">

                        관찰 빈도를 조절할 필요가 있습니다.

                    </p>


                    <p class="observation-status">

                        HEALTH:

                        <strong>
                            -5
                        </strong>

                        <br>

                        STRESS:

                        <strong>
                            +5
                        </strong>

                    </p>

                `

            );

        }

    }



    /*
        상태 최종 재판정
    */

    if (

        typeof MIRA_updateState ===
        "function"

    ) {

        MIRA_updateState();

    }



    /*
        관찰 노트
    */

    const observationNote =
        document.querySelector(
            "#observation-note"
        );


    if (

        observationNote

    ) {

        observationNote.textContent =
            observation.text;

    }



    /*
        최근 활동
    */

    const lastActivity =
        document.querySelector(
            "#last-activity"
        );


    if (

        lastActivity

    ) {

        lastActivity.textContent =
            observation.text;

    }



    /*
        상태 UI
    */

    if (

        typeof renderStatus ===
        "function"

    ) {

        renderStatus();

    }



    /*
        연구 기록
    */

    if (

        typeof addLog ===
        "function"

    ) {

        addLog(

            `MIRA 관찰 기록 · ${observation.note}`

        );

    }



    /*
        저장
    */

    if (

        typeof saveGame ===
        "function"

    ) {

        saveGame();

    }



    /*
        완료 Toast
    */

    if (

        typeof showToast ===
        "function"

    ) {

        showToast(

            "관찰 완료"

        );

    }



    /*
        =====================================================
        OBSERVATION 전용 NULVA 창
        =====================================================
    */

    MIRA_openObservationWindow(
        observation
    );



    /*
        행동력 종료 확인
    */

    if (

        typeof checkActionEnd ===
        "function"

    ) {

        checkActionEnd();

    }

}



/* =========================================================
   RESET OBSERVATION COUNT
========================================================= */

function MIRA_resetObservationCount() {

    MIRA_observationCount =
        0;

}



/* =========================================================
   END OF MIRA OBSERVATION SYSTEM
========================================================= */