import pianoKeys from './piano-keys.js'

export default () => {

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const playSound = (sound, { type = 'sine', shouldEaseOut = true, volume = 0.1}) => {

        if (!audioContext) {
            return;
        }

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = type;
        gainNode.gain.value = volume;

        const { currentTime: audioCurrentTime } = audioContext;

        const totalDuration = sound.reduce((currentNoteTime, { key, duration }) => {
            oscillator.frequency.setValueAtTime(pianoKeys[key], audioCurrentTime + currentNoteTime);
            return currentNoteTime + duration;
        }, 0);

        if (shouldEaseOut) {
            gainNode.gain.exponentialRampToValueAtTime(volume, audioCurrentTime + totalDuration - 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCurrentTime + totalDuration);
        }

        oscillator.start(audioCurrentTime);
        oscillator.stop(audioCurrentTime + totalDuration);
    }

    const win = () => {
        const musicNotes = [
            { key: 'C4', duration: 0.175 },
            { key: 'D4', duration: 0.175 },
            { key: 'E4', duration: 0.175 },
            { key: 'G4', duration: 0.275 },
            { key: 'E4', duration: 0.15 },
            { key: 'G4', duration: 0.9 }
        ];
        const totalDuration = musicNotes
            .reduce((currentNoteTime, { duration }) => currentNoteTime + duration, 0);

        playSound(musicNotes, {
            type: 'triangle',
            shouldEaseOut: true,
            volume: 1
        });

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, totalDuration * 1000);
        });
    }

    const spin = (durationInSecond) => {

        const musicNotes = [
            { key: 'D#3', duration: 0.1 },
            { key: 'C#3', duration: 0.1 },
            { key: 'C3', duration: 0.1 }
        ];

        const totalDuration = musicNotes
            .reduce((currentNoteTime, { duration }) => currentNoteTime + duration, 0);

        const duration = Math.floor(durationInSecond * 10);
        const sound = Array.from(Array(duration), (_, index) => musicNotes[index % 3]);

        playSound(sound, {
            type: 'triangle',
            shouldEaseOut: false,
            volume: 2
        });

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, totalDuration * 1000);
        });
    }

    return {
        win,
        spin
    }
}
