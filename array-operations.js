// операції над масивом:

// - вибрати кожен n-ий елемент
let arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function getEveryN(arr, n) {
    return arr.filter((elem, index) => (index + 1) % n === 0)
}
console.log('Choose every n element', getEveryN(arr1, 3));

// - присвоїти значення кожному n-му елементу 
//  (тобто провести операцію над кожним n-им елементом, типу повножити його на 2, відняти 3 і т.д.)
let arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function changeEveryN(arr, n) {
    return arr.map((elem, index) => (index + 1) % n === 0 ? elem * 2 : elem)
}
console.log('Assign to every n element', changeEveryN(arr2, 2));

// - вибрати елементи з певного індекса до певного індекса
let arr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function chooseElementsFromRange(arr, i, j) {
    return arr.filter((elem, index) => (index + 1 >= i && index + 1 <= j))
}
console.log('Choose elements from range', chooseElementsFromRange(arr3, 2, 5));

// - так само присвоїти значення елементам (як в пункті 2) елементам з певного індекса по певний індекс
let arr4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function changeElemensFromRange(arr, i, j) {
    return arr.map((elem, index) => (index + 1 >= i && index + 1 <= j) ? elem * 10 : elem)
}
console.log('Change elements from range', changeElemensFromRange(arr4, 3, 19))
