/* =========================================================
   NULVA
   gameViewport.js
   PART 1 / 1
   FIXED S25+ LANDSCAPE GAME VIEWPORT
========================================================= */

(() => {

    /* =====================================================
       GAME DESIGN SIZE
    ===================================================== */

    const GAME_WIDTH = 2340;
    const GAME_HEIGHT = 1080;


    /* =====================================================
       UPDATE GAME SCALE
    ===================================================== */

    function updateGameScale() {

        const viewportWidth =
            window.innerWidth;

        const viewportHeight =
            window.innerHeight;


        /*
         * 브라우저 안에
         * 2340 × 1080 게임을
         * 최대한 크게 넣는다.
         *
         * 게임 비율은 절대 변경하지 않는다.
         */

        const scaleX =
            viewportWidth / GAME_WIDTH;

        const scaleY =
            viewportHeight / GAME_HEIGHT;


        /*
         * 가로 / 세로 중
         * 더 작은 배율을 선택한다.
         */

        const scale =
            Math.min(
                scaleX,
                scaleY
            );


        /*
         * CSS의
         *
         * --game-scale
         *
         * 에 표시 배율만 전달한다.
         */

        document.documentElement.style.setProperty(
            "--game-scale",
            scale
        );

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateGameScale();


    /* =====================================================
       BROWSER RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        updateGameScale
    );


    /* =====================================================
       MOBILE ROTATION
    ===================================================== */

    window.addEventListener(
        "orientationchange",
        () => {

            /*
             * orientationchange 직후에는
             * 브라우저 viewport 값이 아직 갱신되지
             * 않았을 수 있으므로 한 프레임 기다린다.
             */

            requestAnimationFrame(
                updateGameScale
            );

        }
    );


    /* =====================================================
       VISUAL VIEWPORT
    ===================================================== */

    /*
     * 모바일 브라우저의 주소창이
     * 나타나거나 사라질 때도 대응한다.
     */

    if (
        window.visualViewport
    ) {

        window.visualViewport.addEventListener(
            "resize",
            updateGameScale
        );

    }


})();