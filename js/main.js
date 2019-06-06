import stage from "./lib/stage"

import {E, noise, CV, P, SD, P2} from "./lib/math"
import {line, text, dot, truncate} from "./lib/draw"
import {extract, occurances, set} from "./lib/data"

import "../scss/main.scss"

// const tmr = timer(60)
const stg = stage("canvas")
const ctx = stg.context()
stg.size(800, 500)

const payGap = extract(35)
const meToo = extract(20)
const trumpTruth = extract(10)

const x1 = [12, 3, 54, 23, 76, 97, 123, 254]
const x2 = [34, 19, 12, 54, 91, 45, 110, 170]

const h = () => stg._(300)
const w = () => stg._(600)
const m = () => stg._(100)

const fw = () => w()+m()*2
const fh = () => h()+m()*2

const top = m
const left = m
const right = () => w()+m()
const bottom = () => h()+m()

const yCenter = () => fh()/2
const xCenter = () => fw()/2

const draw = (xaxis, yaxis) => {
    const xd = w() / xaxis.keys.length
    const yd = h() / yaxis.keys.length
    const xmean = E(xaxis.data)
    const ymean = E(yaxis.data)
    const xmarks = xaxis.keys.map( (k, i) => xd * i + xd / 2 + left() )
    const ymarks = yaxis.keys.map( (k, i) => (bottom() - (yd * i) - top() - yd / 2) + left() )

    stg.clear()
    // border around data
    line( ctx, left(), top(), left(), bottom() )
    line( ctx, left(), top(), right(), top() )
    line( ctx, left(), bottom(), right(), bottom() )
    line( ctx, right(), top(), right(), bottom() )

    // labels, xaxis and yaxis
    text( ctx, xCenter(), bottom() + m() * 0.75, xaxis.label )
    text( ctx, left() * 0.25, yCenter(), yaxis.label, true )

    // tickmarks
    xmarks.forEach( (x, i) => {
        line( ctx, x, bottom(), x, bottom() + top() / 8 )
        text( ctx, x, bottom() + top() / 3, i+"" )
    } )
    ymarks.forEach( (y, i) => {
        line( ctx, left(), y, left() - top() / 8, y )
        text( ctx, left() - top() / 4, y+6, i+"" )
    } )
    // //plot points
    xaxis.data.forEach( (val, i) => {
        const _x = xmarks[ val ] + noise(stg._(25))
        const _y = ymarks[ yaxis.data[ i ] ] + noise(stg._(25))
        dot( ctx, _x, _y, 5 )
    } )

    dot(ctx, xmean * xd + m() + xd/2, bottom() - (ymean * yd + yd/2), 5, "rgba(0, 255, 0, 0.6)")

    //covariance
    document.getElementById( "out1" ).append(CV(xaxis.data, yaxis.data))
    //SD X
    document.getElementById( "out2" ).append(SD(xaxis.data))
    //SD Y
    document.getElementById( "out3" ).append(SD(yaxis.data))
    //Pearson's
    document.getElementById( "out4" ).append(P(xaxis.data, yaxis.data))
    //Determination
    document.getElementById( "out5" ).append(P2(xaxis.data, yaxis.data))
}
// raw correlations with straight data. This calculation takes
// each sample and runs it thorugh P. Samples have been normalized to 0-5
const raw_correlations = () => {
    const questions = set()
    const len = questions.length
    const container = document.getElementById( "raw_correlations" );

    for( let i = 0; i < len - 1; i++){
        const q1 = questions[ i ]
        const d0 = document.createElement( "div" )
        const d1 = document.createElement( "div" )

        d0.className = "row"
        d1.className = "title"
        d0.append(d1)
        d1.append( truncate( q1.label ) )

        for( let j = i + 1; j < len; j++ ){
            const q2 = questions[ j ]
            const d2 = document.createElement( "div" )
            const s1 = document.createElement( "span" )
            const s2 = document.createElement( "span" )
            const p = P( q1.data, q2.data ).toFixed(4)
            
            s1.append( q2.label )
            s2.append( p )
            s2.className = P.degree(p).toLowerCase().replace(/\s/g, "_");

            d2.append(s1)
            d2.append(s2)

            d0.append(d2)
            
            container.append(d0)
        }
    }
}
const scaled_correlations = () => {
    const questions = set()
    const len = questions.length
    const container = document.getElementById( "scaled_correlations" );

    for( let i = 0; i < len - 1; i++){
        const q1 = questions[ i ]
        const q1o = occurances(q1.data).map( val => val / q1.data.length )
        const d0 = document.createElement( "div" )
        const d1 = document.createElement( "div" )

        d0.className = "row"
        d1.className = "title"
        d1.append( truncate( q1.label ) )
        d0.append(d1)

        for( let j = i + 1; j < len; j++ ){
            const q2 = questions[ j ]
            const q2o = occurances(q2.data).map( val => val / q2.data.length )

            const d2 = document.createElement( "div" )
            const s1 = document.createElement( "span" )
            const s2 = document.createElement( "span" )
            const p = P( q1o, q2o ).toFixed(4)
            
            s1.append( q2.label )
            s2.append( p )
            s2.className = P.degree(p).toLowerCase().replace(/\s/g, "_");
            d2.append(s1)
            d2.append(s2)
            d0.append(d2)
            container.append(d0)
        }
    }
}

draw(payGap, meToo)
raw_correlations()
scaled_correlations()

