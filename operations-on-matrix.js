// операції над матрицями (тобто 2-вимірними масивами):

matr1 = [
    [11, 12, 13],
    [21, 22, 23],
    [31, 32, 33],
    [41, 42, 43]
];
matr2 = [
    [10, 10, 10],
    [10, 10, 10],
    [10, 10, 10],
    [10, 10, 10]
];
matr3 = [
    [11, 12, 13],
    [21, 22, 23],
    [31, 32, 33],
    [41, 42, 43]
];
matr4 = [
    [100, 10],
    [100, 10],
    [100, 10]
];


// = 1, 2 ================================================
// - додавання (віднімання) матриць
// && m1.every(elem => elem.length === m1[0].length)

function addMatrix(m1, m2) {
    let resultMatrix = [];

    if (m1.length === m2.length && m2.every(elem => elem.length === m1[0].length)) {

        for (let i = 0; i < m1.length; i++) {
            let row = [];
            for (let j = 0; j < m1[i].length; j++) {
                row.push(m1[i][j] + m2[i][j])
            }
            resultMatrix.push(row);
        }
        return resultMatrix
    } else {
      throw new Error('Matrix dimentions mismatch')
    }
}

console.log('Add matrix',addMatrix(matr1, matr2));
// console.log(addMatrix(matr1, matr4));

// = 3 ================================================
// - множення матриць

function multiplyMatrix(m1, m2) {
    let resultMatrix = [];

    if (m1[0].length === m2.length) {
        for (let i = 0; i < m1.length; i++) { // перехід по рядках першої матриці (див на першу, бо друга має їй відповідати)
            let rowMultCols = [];

            for (let j = 0; j < m2.length; j++) { // кожен елемент з певного рядка першої матриці ...
                let multipliedElems = [];
                for (let k = 0; k < m2[0].length; k++) { // ... множиться на кожен елемент зі стовпця другої матриці
                    multipliedElems.push(m1[i][j] * m2[j][k]);  // добутки рядка на стовпці утв масив
                }
                rowMultCols.push(multipliedElems); // кожен такий масив записується в ще один масив... 
            }

            let resultMatrixRow = [];
            for (let i = 0; i < rowMultCols[0].length; i++) { // ... щоб просумувати значення по стовпцях
                let rowValuesAcc = 0;
                for (let j = 0; j < rowMultCols.length; j++) {
                    rowValuesAcc += rowMultCols[j][i] // сумуєм значення по стовпцях
                }
                resultMatrixRow.push(rowValuesAcc) // просумоване знач додається в рядок
            }
            resultMatrix.push(resultMatrixRow); // рядок додається в матрицю
        }
        return resultMatrix
    } else {
        throw new Error('Matrix dimentions mismatch')
    }
}

console.log('Multiply matrix',multiplyMatrix(matr1, matr4));


// = 4 ================================================
// - створення різних типів матриць (типу все 0, а по діагоналі одиниці 1) довільного розміру

// одинична матриця
function createUnitMatrix(size) {
    if (typeof size === 'number' && size >= 1) {
        let createdMatr = [];
        for (let i = 0; i < size; i++) {
            createdMatr[i] = [];
            for (let j = 0; j < size; j++) {
                i === j ? createdMatr[i][j] = 1 : createdMatr[i][j] = 0
            }
        }
        return createdMatr
    } else {
        throw new Error('Incorrect matrix size')
    }
}

console.log('Unit Matrix',createUnitMatrix(3))

// прямокутна матриця з рандомними значеннями
function createArbitralRectMatr(rowSize, columnSize, minMatrVal, maxMartVal) {

    if (rowSize >= 1 && columnSize >= 1) {
        let rectMatr = [];
        for (let i = 0; i < columnSize; i++) {
            rectMatr[i] = [];
            for (let j = 0; j < rowSize; j++) {
                rectMatr[i][j] = Math.round(minMatrVal + Math.random() * (maxMartVal - minMatrVal))
            }
        }
        return rectMatr
    } else {
        throw new Error('Incorrect matrix dimentions')
    }
}

console.log('Rectangular matrix', createArbitralRectMatr(2, 3, -27, 100))

// діагональна матриця з довільними значенням
function createDiagonalMatrix(size, minDiagonalVal, maxDiagonalVal) {
    if (size >= 1) {
        let diagonalMatr = [];
        for (let i = 0; i < size; i++) {
            diagonalMatr[i] = [];
            for (let j = 0; j < size; j++) {
                i === j ? diagonalMatr[i][j] = Math.round(minDiagonalVal + Math.random() * (maxDiagonalVal - minDiagonalVal)) : diagonalMatr[i][j] = 0
            }
        }
        return diagonalMatr
    } else {
        throw new Error('Incorrect matrix size')
    }
}

console.log('Diagonal matrix', createDiagonalMatrix(4, -27, 100))
