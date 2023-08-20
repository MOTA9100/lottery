import confetti from 'canvas-confetti'
import spinner from './utils/spinner.js'
// import soundEffects from './sound-effects.js'

const CONFETTI_COLORS = ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff'];

window.lottery = async (names, winner) => {

    const maxReelItems = (names.length + 1) * 4

    const sunburstSvg = document.getElementById('sunburst')
    const confettiCanvas = document.getElementById('confetti-canvas')

    if (!sunburstSvg || !confettiCanvas) {
        console.error('One or more Element ID is invalid. This is possibly a bug.');
        return;
    }

    if (!(confettiCanvas instanceof HTMLCanvasElement)) {
        console.error('Confetti canvas is not an instance of Canvas. This is possibly a bug.');
        return;
    }

    // const sound = new soundEffects();
    let confettiAnimationId;

    const customConfetti = confetti.create(confettiCanvas, {
        resize: true,
        useWorker: true
    });

    const confettiAnimation = () => {
        const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
        const confettiScale = Math.max(0.5, Math.min(1, windowWidth / 1100));

        customConfetti({
            particleCount: 1,
            gravity: 0.8,
            spread: 90,
            origin: { y: 0.6 },
            colors: [CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]],
            scalar: confettiScale
        });

        confettiAnimationId = window.requestAnimationFrame(confettiAnimation);
    };

    const stopWinningAnimation = () => {
        if (confettiAnimationId) {
            window.cancelAnimationFrame(confettiAnimationId);
        }
        sunburstSvg.style.display = 'none';
    };

    const onSpinStart = async () => {
        stopWinningAnimation();
        // await sound.spin((maxReelItems - 1) / 10);
    };

    /**  Functions to be trigger after spinning */
    const onSpinEnd = async () => {
        confettiAnimation();
        sunburstSvg.style.display = 'block';
        // await sound.win();
    };

    /** Slot instance */
    const slot = spinner(
        [...names || [], winner],
        '#reel',
        maxReelItems,
        onSpinStart,
        onSpinEnd
    );

    await slot.spin();
}
