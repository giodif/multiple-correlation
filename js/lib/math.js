import M, {dot} from "gd_matrix"


/**** SIMPLE CORRELATION ****/

// Full Rotation
export const CIRC = 2 * Math.PI
//Simple Noise
export const noise = (radius = 0) => radius * -0.5 + Math.random() * radius
// Expected Value, just the simple mean
export const E = set => set.reduce( (a, b) => a+b ) / set.length
// Covariance
export const CV = (X, Y) => {
    const xe = E(X)
    const ye = E(Y)
    const f = X.length - 1
    return X.map( ( val, i ) => (val - xe) * ( Y[i] - ye ) ).reduce( (a, b) => a + b ) / f
}
// Variance
export const V = X => CV(X, X)
// Standard Deviation
export const SD = X => Math.sqrt( V(X) ) 
// Pearson's correlation coefficient
// How well correlated are the two data sets and either positively or negatively?
export const P = (X, Y) => CV(X, Y) / (SD(X) * SD(Y))

P.degree = val => {
    const a = Math.abs(val)
    if( a === 0){ return "No Correlation" }
    if( a < 0.3 ){ return "Low Correlation" }
    if( a < 0.5 ){ return "Moderate Correlation" }
    if( a < 1){ return "High Correlation" }
    return "Perfect Correlation"
}

// Coefficient of determination
// How confident should you be that X will predict Y
export const P2 = (X, Y) => Math.pow(P(X, Y), 2)


/**** MULTIPLE CORRELATION ****/

/*
// each sample is vertical, so
// each question has to be organized as a (column) of the
// matrix, not a row as it is currently stored. e.g. 
// 2, 1, 4 is a set of responsed to a question
// 2, 5, 7 is the same responder to three questions

// N represents the subject
// J represents the response
// The first column of 1's is a control
    [
        [ 1, N1J1, N1J2, N1J3 ],
        [ 1, N2J1, N2J2, N2J3 ],
        [ 1, N3J1, N3J2  N3J3 ]
    ]
*/

const X = [
    [1, 2, 5, 7],
    [1, 1, 3, 6],
    [1, 4, 8, 7]
]

const X2 = [
    [3,  7,  16],
    [7,  21, 45],
    [16, 45, 98]
]
const X2b = [
    [3,  7,  16, 20],
    [7,  21, 45, 48],
    [16, 45, 98, 109],
    [4,  3,  11, 25]
]


const X3 = [
    [ 1, 1, 0, 1 ],
    [ 2, 5, 4 ,2 ],
    [ 3, 6, 1, 4 ],
    [ 4, 7, 2, 9 ]
]


/*
y is represented as a matrix with a single column
for consistent use of matrix operations
    [
        [N1J4],
        [N2J4],
        [N3J4]
    ]
*/

const y = [
    [9],
    [6],
    [2]
]

// console.log( M.mmultiply( M.transpose( X ), X ) )
console.log( M.determinant( X2 ) )
// console.log( M.determinant( X2b ) )

// assumes that y (column vector) is represented by a Nx1 matrix
/// returns a scalar
const _yTy = y => {
    const col = M.column( y, 0 )
    return dot(col, col)
}
// assumes that y (column vector) is represented by a Nx1 matrix
// returns a scalar
const _1Ty = y => M.column( y ).reduce( (t, n) => t + n, 0 )

// Multiple Regression
// y = Xb
export const b = (X, y) => {
    const _X = M.transpose( X )
    const _I = M.inverse( M.mmultiply( _X, X ) )
    const _b = M.mmultiply( _I, _X )
    return M.mmultiply( _b, v.map( n => [n] ) )
}

// export ssRegression = (X, y) => {
//     const b = b(X, y)
// }












