/* =========================================================
   MIRA ANOMALY SYSTEM
   SUBJECT-001

   DAY 01
   FIRST ANOMALY
========================================================= */


/* =========================================================
   ANOMALY DATA
========================================================= */

const MIRA_ANOMALIES = {

    firstSignal: {

        kicker:
            "CAM-01 / SIGNAL INTERRUPTION",

        title:
            "신호 이상",

        body: `

            <p class="story-text">

                관찰 카메라
                <strong>CAM-01</strong>의
                영상 신호가 일시적으로 중단되었습니다.

            </p>


            <p class="story-text">

                중단 시간:

                <strong>
                    0.8 SEC
                </strong>

            </p>


            <p class="story-text">

                시스템은 자동으로
                신호를 복구했습니다.

            </p>


            <p class="observation-status">

                SYSTEM STATUS:

                <strong>
                    RECOVERED
                </strong>

            </p>

        `

    },


    firstObservation: {

        kicker:
            "SUBJECT-001 / CAM-01",

        title:
            "관찰 기록 이상",

        body: `

            <p class="story-text">

                카메라 신호가 복구되었습니다.

            </p>


            <p class="story-text">

                마지막 프레임에서
                MIRA는 카메라를 바라보고 있었습니다.

            </p>


            <p class="story-text">

                ...

            </p>


            <p class="story-text anomaly-text">

                카메라는
                꺼져 있었습니다.

            </p>

        `

    }

};


/* =========================================================
   FIRST ANOMALY
========================================================= */

function triggerMIRAFirstAnomaly() {

    /*
        이미 발생했다면
        다시 실행하지 않는다.
    */

    if (
        gameState.firstAnomalyTriggered
    ) {

        return;

    }


    /*
        DAY 01에서만 발생
    */

    if (
        gameState.day !== 1
    ) {

        return;

    }


    /*
        발생 기록
    */

    gameState.firstAnomalyTriggered =
        true;


    /*
        시설 상태 변경
    */

    gameState.facilityStatus =
        "SIGNAL ANOMALY";


    /*
        연구 기록
    */

    addLog(
        "CAM-01 영상 신호가 0.8초 동안 중단되었다."
    );


    /*
        저장
    */

    saveGame();


    /*
        첫 번째 이상 현상 표시
    */

    openModal({

        kicker:
            MIRA_ANOMALIES.firstSignal.kicker,

        title:
            MIRA_ANOMALIES.firstSignal.title,

        body:
            MIRA_ANOMALIES.firstSignal.body,

        actions: [

            {

                label:
                    "신호 확인 · CHECK",

                confirm:
                    true,

                onClick:
                    () => {

                        showMIRAFirstObservation();

                    }

            }

        ]

    });

}


/* =========================================================
   FIRST ANOMALY OBSERVATION
========================================================= */

function showMIRAFirstObservation() {

    /*
        연구 기록
    */

    addLog(
        "CAM-01 마지막 프레임에서 MIRA가 카메라를 응시하고 있었다."
    );


    /*
        저장
    */

    saveGame();


    /*
        두 번째 기록 표시
    */

    openModal({

        kicker:
            MIRA_ANOMALIES.firstObservation.kicker,

        title:
            MIRA_ANOMALIES.firstObservation.title,

        body:
            MIRA_ANOMALIES.firstObservation.body,

        actions: [

            {

                label:
                    "기록 저장",

                confirm:
                    true,

                onClick:
                    () => {

                        showToast(
                            "연구 기록 저장 완료"
                        );

                        /*
                            첫 번째 이상 현상 기록이 끝나면
                            DAY 01 연구 종료 화면으로 이동
                        */

                        setTimeout(

                            () => {

                                endDay();

                            },

                            350

                        );

                    }

            }

        ]

    });

}


/* =========================================================
   RESET ANOMALY
========================================================= */

function resetMIRAAnomaly() {

    gameState.firstAnomalyTriggered =
        false;


    gameState.facilityStatus =
        "NORMAL";

}