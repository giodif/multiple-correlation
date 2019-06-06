import {state} from '../data/state-min.js';

const valmap = {
    "Strongly disagree": 0,
    "Disagree": 1,
    "Neutral": 2,
    "Agree": 3,
    "Strongly agree": 4
}

const vallist = [ "Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree" ]

const dataTypes = {
    questions : 0,
    demographics : 1,
    generic: 2
}

export const unique = arr => arr.filter((v, i, a) => a.indexOf(v) === i)

export const extract = id => {
    const label = Object.keys(state[id])[0]
    const _keys = state[id][label].keys
    // this maps the out of order keys
    // to the correctly ordered keys
    const keys = _keys.map( v => {
        // if(valmap[v] === undefined){ console.log( v ) }
        return valmap[v] === undefined ? 2 : valmap[v]
    } )
    // reindex the data so that it comports with the new
    // reordered keys. This takes to arbitrarily labeled values and 
    // restructures them into the proper order.
    // loses no semantic value
    const data = state[id][label].set.map( v => keys[v] )

    return {
        // remap the new key values to the appropriate string values
        // converts empty responses to neutral responses
        keys : unique( keys ).map( (v, i) => vallist[i] ),
        label, data
    }
}

export const set = (type = "questions") => {
    const _type = dataTypes[type]
    const data = []

    state.forEach( (set, i) => {
        if( _type === set[Object.keys(set)[0]].type ){
            data.push( extract(i) )
        }
    })
    return data;
}

export const occurances = d => d.reduce( (a, i) => {
    a[i] = a[i] ? ++a[i] : 1
    return a
}, [] )