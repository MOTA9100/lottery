window.lottery = (names, winner) => {

    const squares = document.getElementById('squares')
    const fragment = document.createDocumentFragment()
    const total = names.length
    const minimumJumps = 50;
    let currentIndex = 0,
    jumps = 0,
    speed = 100,
    timer = 0,
    winnerIndex

    names.forEach((name, index) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.setAttribute('data-order', String(index))
        square.innerText = name
        fragment.appendChild(square)
        if (winner === name) {
            winnerIndex = index
        }
    })

    squares.appendChild(fragment)

    const runCircle = () => {
        document.querySelector(`[data-order="${currentIndex}"]`).classList.remove('is-active');
        currentIndex += 1;
        if (currentIndex > total - 1) {
            currentIndex = 0;
        }
        document.querySelector(`[data-order="${currentIndex}"]`).classList.add('is-active');
    }

    const controlSpeed = () => {
        jumps += 1
        runCircle()
        if (jumps > minimumJumps && winnerIndex === currentIndex) {
            clearTimeout(timer)
            jumps = 0
        } else {
            if (jumps > (minimumJumps - 10) && jumps < minimumJumps) {
                speed += 40
            } else if (jumps < minimumJumps / 2) {
                speed -= 5;
            } else if (jumps > minimumJumps / 2) {
                speed += 5;
            }
            if (speed < 50) {
                speed = 50
            }
            timer = setTimeout(controlSpeed, speed);
        }
    }

    window.onload = controlSpeed
}
