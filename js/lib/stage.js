const type = () => "Stage"
const r = () => window.devicePixelRatio

// utility for grabbing pixel index from the imageData array
// using xy coordinates
const _pixelIndex = (x, y, w) => {
    const i = y * (w * 4) + x * 4;
    return [i, i + 1, i + 2, i + 3];
}

// Mouse Events
// Creates mouse events that return 3 things ->
// 1. x positiom of event within canvas
// 2. y position of event within canvas
// 3. e event object of the event
const _rect = e => e.target.getBoundingClientRect()
const _callback = fn => e => {
    const { clientX, clientY } = e
    const { top, left } = _rect( e )
    const x = clientX - left
    const y = clientY - top
    fn( x * r(), y * r(), e )
}
const _event = (type, fn, cn) => {
    const cb = _callback( fn )
    cn.addEventListener( type, cb )
    return () => cn.removeEventListener( type, cb )
}

// Stage object return a simple object
// with an interface to the canvas stage
function stage( selectorID ) {
    const cn = document.getElementById( selectorID )
    const cx = cn.getContext( "2d" )

    cx.scale( r(), r() )
    
    const canvas = () => cn
    const context = () => cx
    const clear = (x = 0, y = 0, dx = cn.width, dy= cn.height) => cx.clearRect( x, y, dx, dy )
    const mouse = {
        down : fn => _event( "mousedown", fn, cn ),
        up   : fn => _event( "mouseup",   fn, cn ),
        over : fn => _event( "mouseover", fn, cn ),
        out  : fn => _event( "mouseout",  fn, cn ),
    }
    const data = {
        get : (x = 0, y = 0, dx = cn.width, dy= cn.height) => cx.getImageData( x, y, dx, dy ),
        put : data => cx.putImageData( data, 0, 0 )
    }

    const size = ( width, height ) => {
        if( !isNaN( width ) && !isNaN( height ) ){
            cn.width = width * r()
            cn.height = height * r()
            cn.style.width = width + "px"
            cn.style.height = height + "px"
        }
        return { w: cn.width, h: cn.height }
    }

    const clone = () => {
        const newCanvas = new Stage( document.createElement( "canvas" ) ) 
        newCanvas.resize( cn.width, cn.height )
        newCanvas.drawImage( cn, 0, 0 )
        return newCanvas
    }
    return { _: x => x * r(), type, canvas, context, clear, size, clone, data, mouse, ratio: r }
}

export default stage
