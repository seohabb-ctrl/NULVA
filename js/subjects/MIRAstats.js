/* =========================================================
   MIRA STAT & STATE SYSTEM
   SUBJECT-001

   HEALTH
   STRESS
   TRUST
   COGNITION
   ADAPTATION

   CONDITION
   STATE
   EFFECT
========================================================= */


/* =========================================================
   STAT LIMIT
========================================================= */

function MIRA_clampStat(
    value
) {

    return Math.max(
        0,
        Math.min(
            100,
            value
        )
    );

}


/* =========================================================
   CLAMP ALL STATS
========================================================= */

function MIRA_clampStats() {

    if (
        !gameState.subject
    ) {

        return;

    }


    gameState.subject.health =
        MIRA_clampStat(
            gameState.subject.health
        );


    gameState.subject.stress =
        MIRA_clampStat(
            gameState.subject.stress
        );


    gameState.subject.trust =
        MIRA_clampStat(
            gameState.subject.trust
        );


    gameState.subject.cognition =
        MIRA_clampStat(
            gameState.subject.cognition
        );


    gameState.subject.adaptation =
        MIRA_clampStat(
            gameState.subject.adaptation
        );

}


/* =========================================================
   CHANGE STAT
========================================================= */

function MIRA_changeStat(
    stat,
    amount
) {

    if (
        !gameState.subject
    ) {

        return;

    }


    if (
        typeof gameState.subject[stat]
        !== "number"
    ) {

        return;

    }


    gameState.subject[stat] =

        MIRA_clampStat(

            gameState.subject[stat]
            +
            amount

        );

}


/* =========================================================
   CHANGE MULTIPLE STATS
========================================================= */

function MIRA_changeStats(
    changes
) {

    if (
        !changes
    ) {

        return;

    }


    Object.entries(
        changes
    ).forEach(

        ([stat, amount]) => {

            MIRA_changeStat(
                stat,
                amount
            );

        }

    );


    MIRA_clampStats();


    /*
        스탯 변화 후
        MIRA 상태도 다시 판정
    */

    MIRA_updateState();


    /*
        화면 갱신
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

}


/* =========================================================
   OBSERVE EFFECT
========================================================= */

/*
    관찰

    STRESS     +2
    ADAPTATION +3
*/

function MIRA_applyObserveEffect() {

    MIRA_changeStats({

        stress:
            2,

        adaptation:
            3

    });

}


/* =========================================================
   FEED EFFECT
========================================================= */

/*
    급식

    HEALTH +3
    STRESS -2
    TRUST  +1
*/

function MIRA_applyFeedEffect() {

    MIRA_changeStats({

        health:
            3,

        stress:
            -2,

        trust:
            1

    });

}


/* =========================================================
   TALK EFFECT
========================================================= */

/*
    대화

    TRUST     +3
    STRESS    +2
    COGNITION +2
*/

function MIRA_applyTalkEffect() {

    MIRA_changeStats({

        trust:
            3,

        stress:
            2,

        cognition:
            2

    });

}


/* =========================================================
   GET MIRA CONDITION
========================================================= */

function MIRA_getCondition() {

    if (
        !gameState.subject
    ) {

        return "UNKNOWN";

    }


    const health =
        gameState.subject.health;


    const stress =
        gameState.subject.stress;


    const trust =
        gameState.subject.trust;


    const cognition =
        gameState.subject.cognition;


    const adaptation =
        gameState.subject.adaptation;


    /*
        가장 위험한 상태
    */

    if (

        health <= 25

        ||

        stress >= 85

    ) {

        return "UNSTABLE";

    }


    /*
        높은 스트레스
    */

    if (

        stress >= 65

    ) {

        return "TENSE";

    }


    /*
        높은 신뢰 + 낮은 스트레스
    */

    if (

        trust >= 70

        &&

        stress <= 45

    ) {

        return "TRUSTING";

    }


    /*
        높은 인지
    */

    if (

        cognition >= 70

    ) {

        return "AWARE";

    }


    /*
        높은 적응
    */

    if (

        adaptation >= 70

    ) {

        return "ADAPTED";

    }


    /*
        기본 상태
    */

    return "NORMAL";

}


/* =========================================================
   UPDATE MIRA STATE
========================================================= */

/*
    스탯을 기준으로
    MIRA의 현재 상태를 자동 결정한다.

    IMPORTANT

    행동 함수에서 직접

        state = "CALM"

    같은 값을 넣어도

    마지막에는 이 함수가
    실제 스탯을 기준으로 다시 판정한다.
*/

function MIRA_updateState() {

    if (
        !gameState.subject
    ) {

        return;

    }


    const condition =
        MIRA_getCondition();


    switch (
        condition
    ) {


        /* -----------------------------------------
           위험 / 불안정
        ----------------------------------------- */

        case "UNSTABLE":

            gameState.subject.state =
                "UNSTABLE";

            gameState.subject.stateKr =
                "불안정";

            break;


        /* -----------------------------------------
           긴장
        ----------------------------------------- */

        case "TENSE":

            gameState.subject.state =
                "TENSE";

            gameState.subject.stateKr =
                "긴장";

            break;


        /* -----------------------------------------
           높은 신뢰
        ----------------------------------------- */

        case "TRUSTING":

            gameState.subject.state =
                "TRUSTING";

            gameState.subject.stateKr =
                "친밀";

            break;


        /* -----------------------------------------
           높은 인지
        ----------------------------------------- */

        case "AWARE":

            gameState.subject.state =
                "AWARE";

            gameState.subject.stateKr =
                "집중";

            break;


        /* -----------------------------------------
           높은 적응
        ----------------------------------------- */

        case "ADAPTED":

            gameState.subject.state =
                "ADAPTED";

            gameState.subject.stateKr =
                "적응";

            break;


        /* -----------------------------------------
           기본 상태
        ----------------------------------------- */

        default:

            gameState.subject.state =
                "CURIOUS";

            gameState.subject.stateKr =
                "호기심";

            break;

    }

}


/* =========================================================
   GET CURRENT STATE TEXT
========================================================= */

function MIRA_getStateText() {

    if (
        !gameState.subject
    ) {

        return "상태 확인 불가";

    }


    return (

        gameState.subject.stateKr

        ||

        "호기심"

    );

}


/* =========================================================
   GET CURRENT CONDITION TEXT
========================================================= */

function MIRA_getConditionText() {

    const condition =
        MIRA_getCondition();


    switch (
        condition
    ) {

        case "UNSTABLE":

            return "생체 상태 불안정";


        case "TENSE":

            return "높은 긴장 상태";


        case "TRUSTING":

            return "연구원에 대한 높은 신뢰";


        case "AWARE":

            return "높은 인지 반응";


        case "ADAPTED":

            return "환경 적응 상태";


        case "NORMAL":

            return "정상 범위";


        default:

            return "상태 확인 불가";

    }

}


/* =========================================================
   GET ADAPTATION LEVEL
========================================================= */

function MIRA_getAdaptationLevel() {

    if (
        !gameState.subject
    ) {

        return "UNKNOWN";

    }


    const adaptation =
        gameState.subject.adaptation;


    /*
        80 이상
        완전 적응
    */

    if (
        adaptation >= 80
    ) {

        return "FULL";

    }


    /*
        60 ~ 79
        높은 적응
    */

    if (
        adaptation >= 60
    ) {

        return "HIGH";

    }


    /*
        40 ~ 59
        부분 적응
    */

    if (
        adaptation >= 40
    ) {

        return "PARTIAL";

    }


    /*
        40 미만
        낮은 적응
    */

    return "LOW";

}


/* =========================================================
   GET ADAPTATION TEXT
========================================================= */

function MIRA_getAdaptationText() {

    const level =
        MIRA_getAdaptationLevel();


    switch (
        level
    ) {

        case "FULL":

            return
                "시설 환경에 완전히 적응함";


        case "HIGH":

            return
                "시설 환경에 높은 수준으로 적응함";


        case "PARTIAL":

            return
                "시설 환경에 부분적으로 적응 중";


        case "LOW":

            return
                "시설 환경에 대한 적응도가 낮음";


        default:

            return
                "적응 상태 확인 불가";

    }

}


/* =========================================================
   INITIAL STATE SYNC
========================================================= */

/*
    게임 시작 / 세이브 로드 후
    현재 스탯에 맞춰 상태를 한 번 정리한다.
*/

function MIRA_syncState() {

    if (
        !gameState.subject
    ) {

        return;

    }


    MIRA_clampStats();

    MIRA_updateState();

}


/* =========================================================
   END OF MIRA STAT SYSTEM
========================================================= */