/* =========================================================
   MIRA ACTION SYSTEM
   SUBJECT-001

   FEED
   TALK
   EXPERIMENT
   MEMORY

   ACTION HISTORY
   REPEATED ACTION
   RANDOM EVENTS
   MEANINGFUL MEMORY
========================================================= */


/* =========================================================
   ACTION HISTORY
========================================================= */

function MIRA_recordAction(
    action
) {

    if (
        !gameState.subject.actionHistory
    ) {

        gameState.subject.actionHistory =
            [];

    }


    gameState.subject.actionHistory.push(
        action
    );


    /*
        최근 5개 행동만 유지

        반복 행동 판정용이다.
        MEMORY와는 별개의 데이터다.
    */

    if (
        gameState.subject.actionHistory.length > 5
    ) {

        gameState.subject.actionHistory =
            gameState.subject.actionHistory.slice(-5);

    }

}


/* =========================================================
   COUNT RECENT ACTION
========================================================= */

function MIRA_countRecentAction(
    action
) {

    const history =
        gameState.subject.actionHistory || [];


    return history.filter(
        item =>
            item === action
    ).length;

}


/* =========================================================
   LAST ACTION
========================================================= */

function MIRA_getLastAction() {

    const history =
        gameState.subject.actionHistory || [];


    if (
        history.length === 0
    ) {

        return null;

    }


    return history[
        history.length - 1
    ];

}


/* =========================================================
   REPEATED ACTION
========================================================= */

function MIRA_isRepeatedAction(
    action,
    count = 2
) {

    const history =
        gameState.subject.actionHistory || [];


    if (
        history.length < count
    ) {

        return false;

    }


    const recent =
        history.slice(-count);


    return recent.every(
        item =>
            item === action
    );

}


/* =========================================================
   RANDOM EVENT CHECK
========================================================= */

function MIRA_randomChance(
    chance
) {

    return Math.random() < chance;

}


/* =========================================================
   ACTION RISK WINDOW
   NULVA RISK SYSTEM
========================================================= */

function MIRA_actionEvent(
    kicker,
    title,
    body
) {

    /*
        기존 RISK 창 제거
    */

    document
        .querySelectorAll(
            ".mira-risk-overlay"
        )
        .forEach(

            element => {

                element.remove();

            }

        );


    /*
        RISK KICKER 변환
    */

    let riskKicker =
        kicker
        ||
        "SUBJECT-001 / RISK";


    /*
        기존 EVENT 성격의
        KICKER를 RISK로 통일
    */

    riskKicker =
        riskKicker
            .replace(
                "OBSERVATION FATIGUE",
                "OBSERVATION RISK"
            )
            .replace(
                "FEEDING RESPONSE",
                "FEEDING RISK"
            )
            .replace(
                "SOCIAL RESPONSE",
                "SOCIAL RISK"
            );


    /*
        아직 RISK 표기가 없다면
        마지막 구분자를 RISK로 변경
    */

    if (
        !riskKicker.includes(
            "RISK"
        )
    ) {

        const parts =
            riskKicker.split(
                "/"
            );


        if (
            parts.length >= 2
        ) {

            riskKicker =

                parts[0].trim()

                +

                " / "

                +

                parts
                    .slice(1)
                    .join("/")
                    .trim()

                +

                " RISK";

        }

    }


    /*
        OVERLAY
    */

    const overlay =
        document.createElement(
            "div"
        );


    overlay.className =
        "mira-risk-overlay";


    /*
        WINDOW

        기존 OBSERVATION /
        DISCREPANCY 창과
        동일한 구조를 사용한다.
    */

    overlay.innerHTML = `

        <div
            class="mira-risk-window"
            role="dialog"
            aria-modal="true"
        >


            <div class="mira-risk-header">


                <div class="mira-risk-kicker">

                    ${riskKicker}

                </div>


                <button
                    type="button"
                    class="mira-risk-close"
                    aria-label="닫기"
                >

                    ×

                </button>


            </div>


            <div class="mira-risk-content">


                <h2 class="mira-risk-title">

                    ${title}

                </h2>


                <div class="mira-risk-body">

                    ${body}

                </div>


            </div>


            <div class="mira-risk-footer">


                <button
                    type="button"
                    class="mira-risk-button"
                >

                    기록 확인

                </button>


            </div>


        </div>

    `;


    /*
        화면에 추가
    */

    document.body.appendChild(
        overlay
    );


    /*
        ELEMENT
    */

    const closeButton =
        overlay.querySelector(
            ".mira-risk-close"
        );


    const confirmButton =
        overlay.querySelector(
            ".mira-risk-button"
        );


    /*
        닫기
    */

    function closeRisk() {

        if (
            !document.body.contains(
                overlay
            )
        ) {

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

    }


    /*
        X
    */

    if (
        closeButton
    ) {

        closeButton.addEventListener(

            "click",

            function (event) {

                event.preventDefault();

                event.stopPropagation();

                closeRisk();

            }

        );

    }


    /*
        기록 확인
    */

    if (
        confirmButton
    ) {

        confirmButton.addEventListener(

            "click",

            function (event) {

                event.preventDefault();

                event.stopPropagation();

                closeRisk();

            }

        );

    }


    /*
        바깥 영역 클릭
    */

    overlay.addEventListener(

        "click",

        function (event) {

            if (
                event.target ===
                overlay
            ) {

                closeRisk();

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
            event.key !==
            "Escape"
        ) {

            return;

        }


        closeRisk();


        document.removeEventListener(
            "keydown",
            handleKeyDown
        );

    }


    document.addEventListener(
        "keydown",
        handleKeyDown
    );


    /*
        포커스
    */

    requestAnimationFrame(

        function () {

            if (
                confirmButton
            ) {

                confirmButton.focus();

            }

        }

    );

}


/* =========================================================
   MEMORY HELPER
========================================================= */

function MIRA_createMemory(
    id,
    type,
    title,
    text,
    importance = 1
) {

    /*
        MEMORY 시스템이 존재하지 않으면
        아무것도 하지 않는다.
    */

    if (
        typeof MIRA_addMemory !==
        "function"
    ) {

        return null;

    }


    return MIRA_addMemory({

        id:
            id,

        day:
            gameState.day,

        time:
            gameState.time,

        type:
            type,

        title:
            title,

        text:
            text,

        importance:
            importance

    });

}


/* =========================================================
   CHECK MEMORY
========================================================= */

function MIRA_hasActionMemory(
    memoryId
) {

    if (
        typeof MIRA_hasMemory !==
        "function"
    ) {

        return false;

    }


    return MIRA_hasMemory(
        memoryId
    );

}


/* =========================================================
   FEED MEMORY
   의미 있는 급식만 기억한다.
========================================================= */

function MIRA_recordFeedMemory() {

    const firstFeedId =
        "MIRA_FIRST_FEED";


    /*
        첫 번째 급식만 기억한다.

        DAY가 바뀌어도
        "첫 번째" 기억은 하나만 존재한다.
    */

    if (
        !MIRA_hasActionMemory(
            firstFeedId
        )
    ) {

        return MIRA_createMemory(

            firstFeedId,

            "FEED",

            "첫 번째 급식",

            "연구원이 MIRA에게 처음으로 먹이를 제공했다.",

            2

        );

    }


    /*
        일반 급식은 MEMORY에
        기록하지 않는다.
    */

    return null;

}


/* =========================================================
   TALK MEMORY
   의미 있는 대화만 기억한다.
========================================================= */

function MIRA_recordTalkMemory() {

    const firstTalkId =
        "MIRA_FIRST_TALK";


    /*
        첫 번째 대화만 기억한다.
    */

    if (
        !MIRA_hasActionMemory(
            firstTalkId
        )
    ) {

        return MIRA_createMemory(

            firstTalkId,

            "TALK",

            "첫 번째 대화",

            "연구원이 MIRA에게 처음으로 말을 걸었다.",

            2

        );

    }


    /*
        신뢰도가 충분히 높아진 이후의
        의미 있는 대화

        같은 기억이 계속 생성되지 않도록
        한 번만 기록한다.
    */

    const trustMemoryId =
        "MIRA_TRUSTED_TALK";


    if (

        gameState.subject.trust >= 50

        &&

        !MIRA_hasActionMemory(
            trustMemoryId
        )

    ) {

        return MIRA_createMemory(

            trustMemoryId,

            "TALK",

            "익숙한 목소리",

            "MIRA는 연구원의 목소리에 이전보다 익숙하게 반응했다.",

            2

        );

    }


    /*
        일반적인 대화는
        MEMORY에 저장하지 않는다.
    */

    return null;

}


/* =========================================================
   FEED
   급식
========================================================= */

function MIRA_feed() {

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

    MIRA_recordAction(
        "FEED"
    );


    /*
        기본 효과

        HEALTH +5
        STRESS -3
        TRUST +3
        ADAPTATION +2

        실제 수치는
        MIRA_stat.js에서 담당한다.
    */

    MIRA_applyFeedEffect();


    /*
        시간
    */

    gameState.time =
        "11:40";


    /*
        최근 활동
    */

    gameState.subject.lastActivity =
        "표준 영양 샘플을 섭취했다.";


    /*
        의미 있는 MEMORY

        첫 급식일 때만 저장
    */

    MIRA_recordFeedMemory();


    /*
        반복 급식 확인
    */

    const repeatedFeed =
        MIRA_isRepeatedAction(
            "FEED",
            3
        );


    /*
        과잉 급식 이벤트

        3회 연속 급식
        + 35% 확률
    */

    if (

        repeatedFeed

        &&

        MIRA_randomChance(.35)

    ) {

        MIRA_changeStats({

            health:
                -5,

            stress:
                8

        });


        gameState.subject.lastActivity =
            "반복적인 급식 이후 생체 반응이 불안정해졌다.";


        /*
            의미 있는 MEMORY

            반복 급식으로 인한
            이상 반응은 반드시 기억한다.
        */

        MIRA_createMemory(

            `MIRA_FEEDING_STRESS_DAY_${gameState.day}_${Date.now()}`,

            "EVENT",

            "급식 반응 이상",

            "반복적인 급식 이후 MIRA의 생체 반응이 불안정해졌다.",

            3

        );


        /*
            이벤트 표시
        */

        MIRA_actionEvent(

            "SUBJECT-001 / FEEDING RESPONSE",

            "급식 반응 이상",

            `

                <p class="story-text">

                    예상보다 짧은 간격으로
                    급식이 반복되었습니다.

                </p>


                <p class="story-text">

                    MIRA의 생체 반응이
                    일시적으로 불안정해졌습니다.

                </p>


                <p class="observation-status">

                    HEALTH:

                    <strong>
                        -5
                    </strong>

                    <br>

                    STRESS:

                    <strong>
                        +8
                    </strong>

                </p>

            `

        );

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
        로그

        LOG에는 행동을 남긴다.

        MEMORY와 LOG는 별개다.
    */

    if (
        typeof addLog ===
        "function"
    ) {

        addLog(
            "MIRA 급식 완료."
        );

    }


    /*
        화면
    */

    if (
        typeof renderStatus ===
        "function"
    ) {

        renderStatus();

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
        Toast
    */

    if (
        typeof showToast ===
        "function"
    ) {

        showToast(
            "급식 완료 · HEALTH +5"
        );

    }


    /*
        행동력 종료
    */

    if (
        typeof checkActionEnd ===
        "function"
    ) {

        checkActionEnd();

    }

}


/* =========================================================
   TALK
   대화
========================================================= */

function MIRA_talk() {

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

    MIRA_recordAction(
        "TALK"
    );


    /*
        기본 효과

        실제 수치는
        MIRA_stat.js에서 담당한다.
    */

    MIRA_applyTalkEffect();


    /*
        시간
    */

    gameState.time =
        "13:10";


    /*
        최근 활동
    */

    gameState.subject.lastActivity =
        "미라는 연구원의 목소리를 주의 깊게 들었다.";


    /*
        의미 있는 MEMORY

        첫 대화 또는
        신뢰도 50 이상에서
        한 번만 생성
    */

    MIRA_recordTalkMemory();


    /*
        반복 대화 확인
    */

    const repeatedTalk =
        MIRA_isRepeatedAction(
            "TALK",
            3
        );


    /*
        대화 피로 이벤트

        3회 연속 대화
        + 35% 확률
    */

    if (

        repeatedTalk

        &&

        MIRA_randomChance(.35)

    ) {

        MIRA_changeStats({

            trust:
                -3,

            stress:
                7

        });


        gameState.subject.lastActivity =
            "MIRA가 연구원의 질문에 대한 반응을 줄였다.";


        /*
            중요한 MEMORY

            반복 대화로 인한
            반응 저하는 기억한다.
        */

        MIRA_createMemory(

            `MIRA_TALK_FATIGUE_DAY_${gameState.day}_${Date.now()}`,

            "EVENT",

            "대화 반응 저하",

            "반복적인 대화 이후 MIRA의 반응이 감소했다.",

            3

        );


        /*
            이벤트 표시
        */

        MIRA_actionEvent(

            "SUBJECT-001 / SOCIAL RESPONSE",

            "대화 반응 저하",

            `

                <p class="story-text">

                    반복적인 질문 이후
                    MIRA의 반응이 감소했습니다.

                </p>


                <p class="story-text">

                    대상은 잠시 시선을 피했습니다.

                </p>


                <p class="observation-status">

                    TRUST:

                    <strong>
                        -3
                    </strong>

                    <br>

                    STRESS:

                    <strong>
                        +7
                    </strong>

                </p>

            `

        );

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
        LOG
    */

    if (
        typeof addLog ===
        "function"
    ) {

        addLog(
            "MIRA와 대화를 진행했다."
        );

    }


    /*
        화면
    */

    if (
        typeof renderStatus ===
        "function"
    ) {

        renderStatus();

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
        대화 모달
    */

    MIRA_openTalkModal();


    /*
        행동력 종료
    */

    if (
        typeof checkActionEnd ===
        "function"
    ) {

        checkActionEnd();

    }

}


/* =========================================================
   TALK MODAL
========================================================= */

function MIRA_openTalkModal() {

    const trust =
        gameState.subject.trust;


    const condition =
        MIRA_getCondition();


    let body;


    /*
        높은 신뢰
    */

    if (
        trust >= 65
    ) {

        body = `

            <p class="story-text">

                “오늘도 왔네요.”

            </p>


            <p class="story-text">

                미라는 잠시 당신을 바라보다가
                관찰 카메라 쪽으로 시선을 옮겼다.

            </p>


            <p class="story-text">

                “저 카메라는...
                계속 보고 있죠?”

            </p>

        `;

    }


    /*
        높은 스트레스
    */

    else if (

        condition === "TENSE"

        ||

        condition === "UNSTABLE"

    ) {

        body = `

            <p class="story-text">

                “……”

            </p>


            <p class="story-text">

                미라는 당신의 목소리를 들었지만
                이전보다 몸을 조금 웅크렸다.

            </p>


            <p class="story-text">

                시선이 당신과
                관찰 카메라 사이를 반복해서 이동했다.

            </p>

        `;

    }


    /*
        높은 인지
    */

    else if (

        condition === "AWARE"

    ) {

        body = `

            <p class="story-text">

                “질문이 있죠?”

            </p>


            <p class="story-text">

                미라는 당신이 말을 꺼내기도 전에
                먼저 시선을 맞췄다.

            </p>


            <p class="story-text">

                “이번에는 제가 먼저 물어봐도 돼요?”

            </p>

        `;

    }


    /*
        높은 적응
    */

    else if (

        condition === "ADAPTED"

    ) {

        body = `

            <p class="story-text">

                “오늘은 조금 익숙해요.”

            </p>


            <p class="story-text">

                미라는 주변을 한 번 둘러본 뒤
                자연스럽게 당신 쪽으로 다가왔다.

            </p>


            <p class="story-text">

                시설 내부의 소음에도
                특별한 반응을 보이지 않았다.

            </p>

        `;

    }


    /*
        기본
    */

    else {

        body = `

            <p class="story-text">

                “……”

            </p>


            <p class="story-text">

                미라는 아무 말 없이
                당신의 목소리를 듣고 있었다.

            </p>

        `;

    }


    openModal({

        kicker:
            "SUBJECT-001 / TALK",

        title:
            "MIRA",

        body:
            body,

        actions: [

            {

                label:
                    "대화 종료",

                confirm:
                    true

            }

        ]

    });

}


/* =========================================================
   MEMORY WINDOW
========================================================= */

function MIRA_memory() {

    /*
        기존 MEMORY가 이미 열려 있다면
        중복 생성하지 않는다.
    */

    const existing =
        document.querySelector(
            ".nulva-memory-overlay"
        );


    if (
        existing
    ) {

        return;

    }


    /*
        MEMORY 데이터 가져오기
    */

    const memories =

        typeof MIRA_getMemories ===
        "function"

        ?

        MIRA_getMemories()

        :

        [];


    /*
        Overlay
    */

    const overlay =
        document.createElement(
            "div"
        );


    overlay.className =
        "nulva-memory-overlay";


    /*
        Window
    */

    const windowElement =
        document.createElement(
            "section"
        );


    windowElement.className =
        "nulva-memory-window";


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
        "MEMORY"
    );


    /*
        Header
    */

    const header =
        document.createElement(
            "header"
        );


    header.className =
        "nulva-memory-header";


    const title =
        document.createElement(
            "div"
        );


    title.className =
        "nulva-memory-title";


    title.textContent =
        "MEMORY";


    /*
        Close
    */

    const closeButton =
        document.createElement(
            "button"
        );


    closeButton.className =
        "nulva-memory-close";


    closeButton.type =
        "button";


    closeButton.setAttribute(
        "aria-label",
        "MEMORY 닫기"
    );


    closeButton.innerHTML =
        "×";


    header.appendChild(
        title
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
        "nulva-memory-content";


    /*
        기억이 없는 경우
    */

    if (
        memories.length === 0
    ) {

        const empty =
            document.createElement(
                "div"
            );


        empty.className =
            "nulva-memory-empty";


        empty.innerHTML = `

            <div
                class="nulva-memory-empty-label"
            >

                MEMORY DATABASE

            </div>


            <div
                class="nulva-memory-empty-text"
            >

                현재 복구 가능한 기억 데이터가 없습니다.

            </div>

        `;


        content.appendChild(
            empty
        );

    }


    /*
        기억이 있는 경우
    */

    else {

        /*
            최신 기억부터
        */

        const sortedMemories =

            [...memories]
                .reverse();


        sortedMemories.forEach(

            memory => {

                /*
                    Entry
                */

                const entry =
                    document.createElement(
                        "article"
                    );


                /*
                    EVENT / ANOMALY
                    → RISK
                */

                const isRisk =

                    memory.type ===
                        "EVENT"

                    ||

                    memory.type ===
                        "ANOMALY";


                entry.className =
                    "nulva-memory-entry";


                if (
                    isRisk
                ) {

                    entry.classList.add(
                        "is-risk"
                    );

                }


                /*
                    Main
                */

                const main =
                    document.createElement(
                        "div"
                    );


                main.className =
                    "nulva-memory-main";


                /*
                    Date
                */

                const date =
                    document.createElement(
                        "div"
                    );


                date.className =
                    "nulva-memory-date";


                const day =

                    String(
                        memory.day ?? 1
                    ).padStart(
                        2,
                        "0"
                    );


                const time =
                    memory.time ||
                    "--:--";


                date.textContent =

                    `DAY ${day} · ${time}`;


                /*
                    Title
                */

                const memoryTitle =
                    document.createElement(
                        "h3"
                    );


                memoryTitle.className =
                    "nulva-memory-entry-title";


                memoryTitle.textContent =

                    memory.title ||
                    "기억 데이터";


                /*
                    Text
                */

                const text =
                    document.createElement(
                        "p"
                    );


                text.className =
                    "nulva-memory-entry-text";


                text.textContent =

                    memory.text ||
                    "";


                main.appendChild(
                    date
                );


                main.appendChild(
                    memoryTitle
                );


                main.appendChild(
                    text
                );


                /*
                    Meta
                */

                const meta =
                    document.createElement(
                        "div"
                    );


                meta.className =
                    "nulva-memory-meta";


                /*
                    Type
                */

                const type =
                    document.createElement(
                        "div"
                    );


                type.className =
                    "nulva-memory-type";


                type.textContent =

                    isRisk

                    ?

                    "RISK"

                    :

                    (
                        memory.type ||
                        "MEMORY"
                    );


                /*
                    Importance
                */

                const importance =
                    document.createElement(
                        "div"
                    );


                importance.className =
                    "nulva-memory-importance";


                importance.innerHTML = `

                    IMPORTANCE

                    <strong>
                        ${memory.importance ?? 1}
                    </strong>

                `;


                meta.appendChild(
                    type
                );


                meta.appendChild(
                    importance
                );


                /*
                    Entry 완성
                */

                entry.appendChild(
                    main
                );


                entry.appendChild(
                    meta
                );


                content.appendChild(
                    entry
                );

            }

        );

    }


    /*
        Footer
    */

    const footer =
        document.createElement(
            "footer"
        );


    footer.className =
        "nulva-memory-footer";


    footer.innerHTML = `

        <span>
            NULVA OS v1.0.0
        </span>


        <span
            class="nulva-memory-footer-center"
        >
            MEMORY DATABASE
        </span>


        <span>
            SUBJECT-001
        </span>

    `;


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
        닫기
    */

    function closeMemory() {

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
        closeMemory
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

                closeMemory();

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

            closeMemory();

        }

    }


    document.addEventListener(
        "keydown",
        handleKeyDown
    );


    /*
        열릴 때 약간의 포커스
    */

    requestAnimationFrame(

        () => {

            closeButton.focus();

        }

    );

}


/* =========================================================
   EXPERIMENT
========================================================= */

function MIRA_experiment() {

    openModal({

        type:
            "research",

        kicker:
            "EXPERIMENT A-02 · 실험 권한",

        title:
            "접근 제한",

        body: `

            <p class="story-text">

                현재 연구원 권한으로는
                해당 실험을 실행할 수 없습니다.

            </p>


            <p class="story-text">

                REQUIRED AUTHORIZATION:

                <strong>
                    LEVEL 2
                </strong>

            </p>

        `,

        actions: [

            {

                label:
                    "닫기",

                confirm:
                    true

            }

        ]

    });

}


/* =========================================================
   MIRA ACTION SYSTEM END
========================================================= */