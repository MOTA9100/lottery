import wheel from './wheel'

window.lottery = (names, winner) => {
    let radius = 300
    const windowWidth = window.innerWidth
    if (windowWidth < 760) {
        const hundred = Math.floor(windowWidth / 100) * 100
        radius = (hundred / 2) - 5
    }
    new wheel({
        el: document.getElementById('wheel'),
        data: names,
        winnerIndex: names.indexOf(winner),
        radius
    });
}
