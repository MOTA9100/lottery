import anime from 'animejs'
import * as svg from './svg'
import { degreeToRadians, polarToCartesian } from './utils'

const baseFontSize = 32

const themes = {
    default: {
        border: 'red',
        prize: 'gold',
        button: 'darkorange',
        line: 'red',
        prizeFont: 'red',
        buttonFont: 'white'
    },
    light: {
        border: 'orange',
        prize: 'lightyellow',
        button: 'tomato',
        line: 'orange',
        prizeFont: 'orange',
        buttonFont: 'white'
    },
    dark: {
        border: 'silver',
        prize: 'dimgray',
        button: 'darkslategray',
        line: 'silver',
        prizeFont: 'silver',
        buttonFont: 'lightyellow'
    }
}

class Wheel {
    constructor (option = {}) {
        this.option = {
            pos: [0, 0],
            radius: 150,
            buttonWidth: 50,
            buttonDeg: 80,
            buttonText: 'Draw',
            textBottomPercentage: 0.6,
            textRotate: true,
            limit: 0,
            duration: 9000,
            turn: 8,
            clockwise: true,
            draw: true,
            theme: 'default',
            winnerIndex: null,
            ...option
        }

        if (!this.option.el) throw new Error('el is undefined')
        if (!this.option.data) throw new Error('data is undefined')
        const len = this.option.data.length
        if (len < 2) {
            throw new Error('data.length must greater than 1')
        }

        this._count = 0
        this._rotation = 0
        this._weight = []
        this._weightSum = 0
        this._running = false

        this._checkPrize()

        if (this.option.draw) this.draw()
        this.run()
    }

    _checkPrize () {
        const data = this.option.data
        for (const i in data) {
            const d = data[i]
            if (typeof d === 'string') {
                data[i] = {
                    text: d,
                    chance: 1
                }
            } else {
                data[i] = {
                    ...data[i],
                    text: d.text || i,
                    chance: d.chance
                }
            }

            this._weight.push(Number(data[i].chance))
            this._weightSum += Number(data[i].chance)
        }
    }

    draw () {
        const opt = this.option

        this._center = opt.pos.map((p) => p + opt.radius)

        const svgAttrs = {
            width: opt.radius * 2,
            height: opt.radius * 2
        }
        if (opt.el.tagName !== 'svg') {
            this._svg = svg.svg(svgAttrs)
            opt.el.appendChild(this._svg)
        } else {
            this._svg = opt.el
            svg.useSVG(opt.el, svgAttrs)
        }

        this._deg = 360 / opt.data.length

        if (opt.image) this._drawResource()
        this._drawDefault()

        this._animeFunc()
    }

    _drawDefault () {
        if (this._turntable) return

        const opt = this.option
        const theme = themes[opt.theme] || themes.default
        opt.color = {
            ...theme,
            ...opt.color
        }
        if (!opt.inRadius) {
            opt.inRadius = getInnerRadius(opt.radius)
        } else if (opt.inRadius > opt.radius) {
            opt.inRadius = opt.radius
        }

        if (!this._turntable) this._drawTurntable()
    }

    _drawResource () {
        const opt = this.option
        const res = opt.image
        if (typeof res === 'object' && Object.keys(res).length > 0) {
            if (res.turntable && typeof res.turntable === 'string') {
                this._turntable = svg.image(res.turntable, {
                    width: opt.radius * 2,
                    height: opt.radius * 2,
                    x: opt.pos[0],
                    y: opt.pos[1]
                })
                this._svg.appendChild(this._turntable)
            }
        }
    }

    _drawTurntable () {
        if (this._turntable) return

        const opt = this.option
        this._svg.appendChild(
            svg.circle(this._center[0], this._center[1], opt.radius, {
                fill: 'white'
            })
        )
        this._svg.appendChild(
            svg.circle(this._center[0], this._center[1], opt.inRadius, {
                fill: 'white'
            })
        )

        this._turntable = svg.g()
        this._svg.appendChild(this._turntable)
        for (const d of opt.data) {
            const [pathD, dLen] = describeArc(
                this._center[0],
                this._center[1],
                opt.inRadius,
                -this._deg / 2,
                this._deg / 2
            )

            const clr = Math.random().toString(16).slice(2, 8)
            const pie = svg.path(pathD, {
                fill: `#${clr}`,
                stroke: 'white',
                strokeWidth: 2
            })

            let fontSize = d.fontSize || opt.fontSize
            if (!fontSize) {
                let textSum = 0
                for (let i = 0; i < d.text.length; ++i) {
                    if (d.text[i].match(/\w/)) {
                        textSum += 1
                    } else textSum += 2
                }
                fontSize =
                    (baseFontSize * textSum) / 2 > dLen * opt.textBottomPercentage
                        ? ((dLen * opt.textBottomPercentage) / textSum) * 2
                        : baseFontSize
            }
            const text = svg.text(d.text, {
                x: this._center[0],
                y: opt.pos[1] + opt.radius - opt.inRadius * opt.textBottomPercentage,
                fontSize,
                fill: 'white'
            })
            if (this.option.textRotate) {
                svg.rotate(
                    text,
                    degreeToRadians(90),
                    this._center[0],
                    opt.pos[1] + opt.radius - opt.inRadius * opt.textBottomPercentage
                )
            }
            const gtext = svg.g([text])
            const g = svg.g([pie, gtext])
            svg.rotate(
                g,
                degreeToRadians(this._deg * opt.data.indexOf(d)),
                this._center[0],
                this._center[1]
            )
            this._turntable.appendChild(g)
            if (this.option.textRotate) {
                svg.translate(gtext, 0, -text.getComputedTextLength() / 2)
            } else {
                svg.translate(gtext, -text.getComputedTextLength() / 2, 0)
            }
        }
    }

    _animeFunc () {
        this._turntable.style['transform-origin'] = 'center'
    }

    run () {
        if (this._running) return

        const opt = this.option
        if (opt.limit > 0 && this._count >= opt.limit) {
            opt.onFail && typeof opt.onFail === 'function' && opt.onFail()
            return
        }

        const runAnime = (pie) => {
            if (this._rotation > 0) {
                const revision = 360 - (this._rotation % 360)
                this._rotation += revision
            }
            this._rotation += getRotation(pie, this._deg, opt.turn)
            anime({
                targets: this._turntable,
                rotate: opt.clockwise
                    ? this._rotation + 'deg'
                    : '-' + this._rotation + 'deg',
                duration: opt.duration,
                begin: () => {
                    this._running = true
                },
                complete: () => {
                    this._running = false
                    ++this._count
                    if (opt.onSuccess && typeof opt.onSuccess === 'function') {
                        const d = opt.clockwise
                            ? opt.data[(opt.data.length - pie) % opt.data.length]
                            : opt.data[pie]
                        opt.onSuccess(d)
                    }
                }
            })
        }

        if (this.option.winnerIndex !== null) {
            const pies = []
            for (let i = 1; i <= this.option.data.length; i++) {
                pies.push(i)
            }
            runAnime(pies.reverse()[this.option.winnerIndex])
            return
        }

        const random = Math.random() * this._weightSum
        let randomWeight = 0
        let pie = 0
        for (const i in this._weight) {
            randomWeight += this._weight[i]
            if (randomWeight > random) {
                pie = i
                runAnime(pie)
                break
            }
        }
    }
}

function getInnerRadius (radius) {
    if (radius < 50) return radius
    if (radius < 100) return radius - 10
    return Math.round(radius / 10) * 9
}

function describeArc (x, y, radius, startAngle, endAngle) {
    const start = polarToCartesian(x, y, radius, endAngle)
    const end = polarToCartesian(x, y, radius, startAngle)

    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1
    const d = `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} L ${x} ${y} L ${start.x} ${start.y}`
    const l = start.x - end.x
    return [d, l, start, end]
}

function getRotation (i, deg, minTurn) {
    return minTurn * 360 + i * deg
}

export default Wheel
