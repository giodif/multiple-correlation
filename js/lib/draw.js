import {CIRC} from "./math"

export const _r = () => window.devicePixelRatio

export const truncate = str => str.substring(0, 60)

export const dot = (ctx, x = 0, y = 0, r = 5, color = "rgba(255, 0, 0, 0.2)" ) => {
    ctx.save()
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, r * _r(), 0, CIRC)
    ctx.fill()
    ctx.closePath()
    ctx.restore()
}

export const line = (ctx, x, y, dx, dy, width = 1, color = "#aaa") => {
    ctx.save()
    ctx.fillStyle = "transparent"
    ctx.strokeStyle = color
    ctx.lineWidth = width * _r()
    ctx.beginPath()
    ctx.moveTo( x, y )
    ctx.lineTo( dx, dy )
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
}

export const text = (ctx, x, y, str, vertical = false, fnt=12) => {
    ctx.save()
    ctx.font = fnt * _r() + 'px sans-serif'
    ctx.textAlign="center"
    ctx.translate(x, y)
    ctx.rotate( vertical ? Math.PI / -2 : 0 )
    ctx.fillText(truncate(str), 0, 0)
    ctx.restore()
}