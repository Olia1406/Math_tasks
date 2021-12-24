// геометричні функції (фігура може бути не більше 7-ми точок):

// ============ знаходження площі фігури за координатами її вершин ===============

// використовую формулу з аналіт геом для обчисленя площі довільного многокутника (опуклого або вгнутого), 
// !! але це при умові, що коoрдинати такі, що сторони многокутника не перетинаються, (простий n-кутник)
// S = 1/2* |SUM (Xi + Xi+1)*(Yi - Yi+1)| ; 1 <= i <= n;   Xn+1=X0; Yn+1 = Y0; 
function polygonArea(...pointsList) {
    if (sidesAreCrossed(...pointsList)) throw new Error('Poligon is not simple')
    let sum = 0;
    for (let i = 0; i < pointsList.length; i++) {
        if (i + 1 === pointsList.length) {
            sum += (pointsList[i][0] + pointsList[0][0]) * (pointsList[i][1] - pointsList[0][1])
        } else {
            sum += (pointsList[i][0] + pointsList[i + 1][0]) * (pointsList[i][1] - pointsList[i + 1][1])
        }
    }
    return Math.abs(sum) / 2
}

console.log(polygonArea([1, 1], [1, 3], [4, 4], [5, 3])); // 6
// console.log(polygonArea([1, 1], [1, 5], [5, 5], [6, 2], [4, 1], [0, 3])); // Error, многокутник не простий, тобто його сторони перетинаються

// функція, яка перевіряє чи перетинаються два відрізки (коли відомі координати кінців відрізків)
// дано вектори a, b і коорд їх кінців а(X1,Y1), (X2,Y2), b(X3,Y3), (X4,Y4)
// s(X2 - X1) - t(X4 - X3) = X3 - X1
// s(Y2 - Y1) - t(Y4 - Y3) = Y3 - Y1
// з цієї системи шукаються s i t (тут за методом Крамера) 
// і, якщо 0 <= s,t <= 1, то вектори перетинаються, в іншому випадку ні
function segmentsAreCrossed(startPointA, endPointA, startPointB, endPointB) {
    const a1 = endPointA[0] - startPointA[0];
    const b1 = -(endPointB[0] - startPointB[0]);
    const a2 = endPointA[1] - startPointA[1];
    const b2 = -(endPointB[1] - startPointB[1]);
    const c1 = startPointB[0] - startPointA[0];
    const c2 = startPointB[1] - startPointA[1];

    const s = (c1 * b2 - b1 * c2) / (a1 * b2 - b1 * a2);
    const t = (a1 * c2 - c1 * a2) / (a1 * b2 - b1 * a2);

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1) return true

    return false
}

// console.log(segmentsAreCrossed([1, 1], [6, 5], [2, 5], [3, 1])); // true, відрізки перетинаються
// console.log(segmentsAreCrossed([1, 1], [6, 5], [5, 3], [4, 1])); // false, не перетинаються

// функція, яка перевіряє чи сторони n-кутника не перетинаються між собою
function sidesAreCrossed(...polygonVertices) {
    // тут перша сторона перевряється зі всіма іншими починаючи з 3-ї по передостанню
    for (let k = 2; k < polygonVertices.length - 1; k++) {
        if (segmentsAreCrossed(polygonVertices[0], polygonVertices[1], polygonVertices[k], polygonVertices[k + 1])) return true
    }

    // перевіряю чи кожна сторона (починаючи з другої по другу з кінця, - перед перед остання, тільки так є зміст перевіряти) 
    // перетинається з рештою сторін, які ідуть після неї (починаючи з другої після неї і до передостанньої)
    for (let i = 1; i < polygonVertices.length - 2; i++) {
        for (let j = i + 2; j <= polygonVertices.length - 2; j++) {
            if (segmentsAreCrossed(polygonVertices[i], polygonVertices[i + 1], polygonVertices[j], polygonVertices[j + 1])) return true
        }
    }

    // тут остання сторона перевряється зі всіма іншими починаючи з 3-ї по передостанню
    for (let k = 2; k < polygonVertices.length - 1; k++) {
        if (segmentsAreCrossed(polygonVertices[k], polygonVertices[k + 1], polygonVertices[polygonVertices.length - 2], polygonVertices[polygonVertices.length - 1])) return true
    }
    return false
}

// console.log(sidesAreCrossed([1, 1], [1, 3], [4, 4], [5, 3])); // false , дійсно не перетинаються
// console.log(sidesAreCrossed([1, 1], [4, 4], [5, 3], [1, 3])); // true, дійсно перетинаються
// console.log(sidesAreCrossed([1, 1], [1, 5], [5, 5], [6, 2], [4, 1], [3, 6]));  // дійсно перетинаються
// console.log(sidesAreCrossed([1, 1], [1, 5], [5, 5], [6, 2], [4, 1], [0, 3]));  // дійсно перетинаються
console.log(sidesAreCrossed([1, 1], [1, 5], [5, 5], [6, 2], [4, 1], [6, 4]));  // дійсно перетинаються
console.log(sidesAreCrossed([1, 1], [1, 5], [5, 5], [3, 3], [4, 1], [6, 4]));  // дійсно перетинаються


// ======= знаходження найбільшої діагоналі за масивом координат фігури =========

function findLargestDigonal(...polygonVertices) {
    let maxDiagonal = findLenght(polygonVertices[0], polygonVertices[2]);
    // циклом перейду по всіх точках і знайду відстань з кожної даної до решти не сусідніх з нею
    for (let i = 0; i < polygonVertices.length - 1; i++) { // останню точку не рахую, бо до неї вже будуть проведені всі діагоналі, а від неї до інших не треба перевіряти, бо то буде повторення
        for (let j = i + 2; j < polygonVertices.length - 1; j++) { // дві сусідні до даної (і-тової) не враховуються
            let diagonalLegth = findLenght(polygonVertices[i], polygonVertices[j]);
            if(diagonalLegth > maxDiagonal) {
                maxDiagonal=diagonalLegth
            }
        }

    }
    return maxDiagonal
}
console.log(findLargestDigonal([1,1], [1,4], [2,4], [4,5], [4,1]))


function findLenght(startPoint, endPoint) {
    return Math.sqrt(Math.pow((endPoint[0] - startPoint[0]), 2) + Math.pow((endPoint[1] - startPoint[1]), 2)).toFixed(2)
}
console.log(findLenght([0, 0], [1, 1]))