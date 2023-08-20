function chunk(array, size) {
    const result = []
    for (let i = 0; i < array.length; i += size) {
        const chunk = array.slice(i, i + size);
        result.push(chunk)
    }
    return result
}

window.lottery = (names, winner) => {
    const dices = chunk(names, 6)
    const table = document.getElementById('table')
    const fragment = document.createDocumentFragment()
    let rollTimeout, val;

    dices.forEach((diceElements, diceIndex) => {

        let isActiveDice = false
        const cube = document.createElement('div')
        cube.classList.add('cube')

        for (let s = 0; s < 6; s++) {
            const side = document.createElement('div')
            const name = diceElements[s] || ''
            side.classList.add('side')
            side.classList.add(`side_${s+1}`)
            if (!name) {
                side.classList.add('empty')
            }
            side.innerText = name
            cube.appendChild(side)
            if (winner === name) {
                isActiveDice = true
                val = s + 1
            }
        }

        const dice = document.createElement('div')
        dice.classList.add('dice')
        dice.classList.add(diceIndex % 2 === 0 ? 'dice_even' : 'dice_odd')
        dice.setAttribute('data-active', isActiveDice ? '1' : '0')
        dice.appendChild(cube)
        fragment.appendChild(dice)
    })

    table.appendChild(fragment)
    table.style.minHeight = `${table.offsetHeight}px`

    const rollDices = (val) => {
        document.querySelectorAll('.dice').forEach((dice) => {
            const diceRect = dice.getBoundingClientRect()
            dice.setAttribute('data-val', val)
            dice.style.top = `${diceRect.top}px`
            dice.style.left = `${diceRect.left}px`
            if (val > 0) {
                setTimeout(() => {
                    dice.classList.add('move-to-center')
                    if (dice.getAttribute('data-active') === '0') {
                        dice.style.zIndex = -1
                        dice.classList.add('fade-out')
                    }

                }, 1000)
            }
        })
    }

    window.onload = () => {
        if (rollTimeout) clearTimeout(rollTimeout);
        rollDices(0)
        rollTimeout = setTimeout(function() {
            rollDices(val);
        }, 1000);
    };
}
