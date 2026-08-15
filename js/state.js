/* =========================================================
   NULVA
   GAME STATE

   SAVE
   LOAD
   RESET

   MIRA MEMORY DATA
========================================================= */


/* =========================================================
   INITIAL STATE
========================================================= */

const INITIAL_STATE = {

    /* -------------------------------------
       연구원
    ------------------------------------- */

    researcherId: "",


    /* -------------------------------------
       시간
    ------------------------------------- */

    day:
        1,

    time:
        "08:10",

    actions:
        3,

    maxActions:
        3,


    /* -------------------------------------
       시설
    ------------------------------------- */

    facilityStatus:
        "NORMAL",


    /* -------------------------------------
       현재 실험체
    ------------------------------------- */

    subject: {

        id:
            "001",

        name:
            "MIRA",

        type:
            "ADAPTIVE ORGANISM",

        typeKr:
            "적응형 생체 개체",


        /* ---------------------------------
           상태
        --------------------------------- */

        health:
            40,

        stress:
            30,

        trust:
            0,

        cognition:
            10,

        adaptation:
            10,


        /* ---------------------------------
           현재 감정 / 상태
        --------------------------------- */

        state:
            "CURIOUS",

        stateKr:
            "호기심",


        /* ---------------------------------
           최근 행동
        --------------------------------- */

        lastActivity:
            "미라는 연구원을 약 03:17 동안 관찰했다.",


        /* ---------------------------------
           MEMORY
           
           MIRA가 경험한 사건을 저장한다.

           각 기억은 이후

           TALK
           OBSERVE
           MEMORY

           에서 다시 참조할 수 있다.
        --------------------------------- */

        memories: [],


        /* ---------------------------------
           최근 행동 기록

           반복 행동 판정용

           최근 5개만 유지
        --------------------------------- */

        actionHistory: []

    },


    /* -------------------------------------
       로그
    ------------------------------------- */

    logs: [],


    /* -------------------------------------
       연구 데이터
    ------------------------------------- */

    data:
        0,


    /* -------------------------------------
       현재 진행 상태
    ------------------------------------- */

    gameStarted:
        false,

    dayEnded:
        false,

    firstAnomalyTriggered:
        false

};



/* =========================================================
   CURRENT STATE
========================================================= */

let gameState =

    structuredClone(
        INITIAL_STATE
    );



/* =========================================================
   SAVE
========================================================= */

function saveGame() {

    try {

        localStorage.setItem(

            "nulva-save",

            JSON.stringify(
                gameState
            )

        );

    }

    catch (error) {

        console.error(

            "NULVA SAVE ERROR:",

            error

        );

    }

}



/* =========================================================
   LOAD
========================================================= */

function loadGame() {

    const saved =

        localStorage.getItem(
            "nulva-save"
        );


    /*
        저장 데이터가 없으면
        현재 INITIAL_STATE 사용
    */

    if (!saved) {

        return false;

    }


    try {

        const parsed =

            JSON.parse(
                saved
            );


        /*
            기본 상태와
            저장 상태를 병합한다.

            새로운 시스템이 추가되어도
            기존 세이브가 깨지지 않도록 한다.
        */

        gameState = {

            ...structuredClone(
                INITIAL_STATE
            ),

            ...parsed,


            /* -----------------------------
               SUBJECT
            ----------------------------- */

            subject: {

                ...structuredClone(
                    INITIAL_STATE.subject
                ),

                ...(parsed.subject || {}),


                /* -------------------------
                   MEMORY
                   
                   기존 세이브에 memories가
                   없을 경우 빈 배열 사용
                ------------------------- */

                memories:

                    Array.isArray(
                        parsed.subject?.memories
                    )

                    ?

                    parsed.subject.memories

                    :

                    [],


                /* -------------------------
                   ACTION HISTORY
                   
                   기존 세이브에 없을 경우
                   빈 배열 사용
                ------------------------- */

                actionHistory:

                    Array.isArray(
                        parsed.subject?.actionHistory
                    )

                    ?

                    parsed.subject.actionHistory

                    :

                    []

            }

        };


        /*
            행동 기록은
            최대 5개까지만 유지
        */

        if (

            gameState.subject.actionHistory
                .length > 5

        ) {

            gameState.subject.actionHistory =

                gameState.subject
                    .actionHistory
                    .slice(-5);

        }


        /*
            MEMORY가 혹시
            배열이 아닌 값으로 저장되어 있다면
            초기화
        */

        if (

            !Array.isArray(
                gameState.subject.memories
            )

        ) {

            gameState.subject.memories =
                [];

        }


        return true;

    }

    catch (error) {

        console.error(

            "NULVA LOAD ERROR:",

            error

        );


        return false;

    }

}



/* =========================================================
   RESET
========================================================= */

function resetGame() {

    localStorage.removeItem(
        "nulva-save"
    );


    gameState =

        structuredClone(
            INITIAL_STATE
        );

}



/* =========================================================
   MEMORY DATA FORMAT
========================================================= */

/*
    MEMORY 하나는 기본적으로
    아래와 같은 구조를 사용한다.

    {

        id:
            "DAY01_FEED_001",

        day:
            1,

        time:
            "11:40",

        type:
            "FEED",

        title:
            "첫 번째 급식",

        text:
            "연구원이 MIRA에게 먹이를 주었다.",

        importance:
            1

    }


    importance

    1
    → 일반적인 기억

    2
    → 의미 있는 기억

    3
    → 중요한 기억

    4
    → 강한 사건

    5
    → 핵심 기억
*/



/* =========================================================
   MEMORY ADD
========================================================= */

function MIRA_addMemory(
    memory
) {

    /*
        MIRA 데이터가 없으면 종료
    */

    if (
        !gameState.subject
    ) {

        return null;

    }


    /*
        잘못된 데이터 방지
    */

    if (
        !memory
        ||
        typeof memory !==
        "object"
    ) {

        return null;

    }


    /*
        memories 배열이 없을 경우
        안전하게 생성
    */

    if (

        !Array.isArray(
            gameState.subject.memories
        )

    ) {

        gameState.subject.memories =
            [];

    }


    /*
        MEMORY ID

        직접 지정되지 않은 경우
        자동 생성
    */

    const memoryId =

        memory.id

        ||

        `DAY${String(
            gameState.day
        ).padStart(
            2,
            "0"
        )}_MEMORY_${Date.now()}`;


    /*
        MEMORY 객체 생성
    */

    const newMemory = {

        id:
            memoryId,

        day:
            memory.day
            ??
            gameState.day,

        time:
            memory.time
            ??
            gameState.time,

        type:
            memory.type
            ??
            "GENERAL",

        title:
            memory.title
            ??
            "기억 데이터",

        text:
            memory.text
            ??
            "",

        importance:
            memory.importance
            ??
            1

    };


    /*
        같은 ID의 기억이
        이미 존재하면 중복 저장하지 않는다.
    */

    const alreadyExists =

        gameState.subject.memories
            .some(

                item =>
                    item.id ===
                    newMemory.id

            );


    if (
        alreadyExists
    ) {

        return null;

    }


    /*
        기억 저장
    */

    gameState.subject.memories.push(
        newMemory
    );


    /*
        저장
    */

    if (
        typeof saveGame ===
        "function"
    ) {

        saveGame();

    }


    return newMemory;

}



/* =========================================================
   GET MEMORIES
========================================================= */

function MIRA_getMemories() {

    if (
        !gameState.subject
    ) {

        return [];

    }


    if (

        !Array.isArray(
            gameState.subject.memories
        )

    ) {

        gameState.subject.memories =
            [];

    }


    return gameState.subject.memories;

}



/* =========================================================
   GET MEMORY COUNT
========================================================= */

function MIRA_getMemoryCount() {

    return MIRA_getMemories().length;

}



/* =========================================================
   GET LAST MEMORY
========================================================= */

function MIRA_getLastMemory() {

    const memories =
        MIRA_getMemories();


    if (
        memories.length === 0
    ) {

        return null;

    }


    return memories[
        memories.length - 1
    ];

}



/* =========================================================
   GET MEMORY BY TYPE
========================================================= */

function MIRA_getMemoriesByType(
    type
) {

    return MIRA_getMemories()
        .filter(

            memory =>
                memory.type ===
                type

        );

}



/* =========================================================
   GET IMPORTANT MEMORIES
========================================================= */

function MIRA_getImportantMemories(
    minimumImportance = 2
) {

    return MIRA_getMemories()
        .filter(

            memory =>

                Number(
                    memory.importance
                )
                >=
                minimumImportance

        );

}



/* =========================================================
   HAS MEMORY
========================================================= */

function MIRA_hasMemory(
    memoryId
) {

    return MIRA_getMemories()
        .some(

            memory =>
                memory.id ===
                memoryId

        );

}



/* =========================================================
   MEMORY SUMMARY
========================================================= */

function MIRA_getMemorySummary() {

    const memories =
        MIRA_getMemories();


    if (
        memories.length === 0
    ) {

        return "현재 복구 가능한 기억이 없습니다.";

    }


    return (

        `현재 ${memories.length}개의 `
        +
        `기억 데이터가 기록되어 있습니다.`

    );

}



/* =========================================================
   MEMORY SYSTEM READY
========================================================= */

/*
    여기까지는
    MEMORY를 저장하고 읽기 위한
    데이터 시스템이다.

    실제로 어떤 행동이 어떤 기억을
    생성하는지는

    MIRAactions.js
    MIRAobserve.js
    MIRAanomaly.js

    에서 연결한다.
*/


/* =========================================================
   END OF GAME STATE
========================================================= */