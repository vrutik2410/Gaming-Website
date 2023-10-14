var board;
var totalmov = 0
var totalpieces = 0
var seconds = 0;
var minutes = 0;
var t;
var isWinner = false;
var isLoser = false;
var bestscore = "0"



function newgame() {


    seconds = 0
    minutes = 0
    isWinner = false
    isLoser = false
    totalpieces = 0;
    totalmov = 0

    document.getElementById("seconds").innerHTML = ":00"
    document.getElementById("minutes").innerHTML = "00"
    document.getElementById("totalmov").innerHTML = 0
    document.getElementById("sumpieces").innerHTML = 0

    document.addEventListener("keydown", keys);

    let result = document.getElementById("result");
    result.innerHTML = "";
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    for (let f = 0; f < 4; f++) {
        for (let c = 0; c < 4; c++) {
            let box = document.getElementById(f.toString() + "-" + c.toString())
            let num = board[f][c]
            updatebox(box, num)
        }
    }
    validatescore()
    generateNum()
    generateNum()
}
window.onload = function () {
    newgame();
    timer();
}

function validatescore() {
    let currentscore = document.getElementById("sumpieces");
    if (parseInt(currentscore.innerHTML) > parseInt(bestscore)) {
        let best = document.getElementById("Best");
        best.innerText = currentscore.innerHTML;
        bestscore = currentscore.innerHTML;
        currentscore.innerHTML = "0";
    }

}
function updatebox(box, num) {
    box.innerText = ""
    box.classList.value = ""
    box.classList.add("box")
    if (num > 0) {
        if (num == 2) {
            box.innerText = num;
            box.style.backgroundColor = "#eee4da";
            box.style.color = "#727371";
        }
        if (num == 4) {
            box.innerText = num;
            box.style.backgroundColor = "#ece0ca";
            box.style.color = "#727371";
        }
        if (num == 8) {
            box.innerText = num;
            box.style.backgroundColor = "#f4b17a";
            box.style.color = "White";
        }
        if (num == 16) {
            box.innerText = num;
            box.style.backgroundColor = "#f59575";
            box.style.color = "White";
        }
        if (num == 32) {
            box.innerText = num;
            box.style.backgroundColor = "#f57c5f";
            box.style.color = "White";
        }
        if (num == 64) {
            box.innerText = num;
            box.style.backgroundColor = "#f65d3b";
            box.style.color = "White";
        }
        if (num == 128) {
            box.innerText = num;
            box.style.backgroundColor = "#edce71";
            box.style.color = "White";
        }
        if (num == 256) {
            box.innerText = num;
            box.style.backgroundColor = "#edcc63";
            box.style.color = "White";
        }
        if (num == 512) {
            box.innerText = num;
            box.style.backgroundColor = "#edc651";
            box.style.color = "White";
        }
        if (num == 1024) {
            box.innerText = num;
            box.style.backgroundColor = "#eec744";
            box.style.color = "White";
        }
        if (num == 2048) {
            box.innerText = num;
            box.style.backgroundColor = "#ecc230";
            box.style.color = "White";
        }
    }
    else {
        box.innerText = "";
        box.style.backgroundColor = "#776e65";
    }
}

function generateNumber2or4() {
    num = Math.floor(Math.random() * 5)
    if (num == 2 || num == 4) {
        return num
    } else {
        generateNumber2or4()
    }
}

function full() {
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}

function generateNum() {

    if (!full()) {
        return
    }

    let found = false
    while (!found) {
        let f = Math.floor(Math.random() * 4)
        let c = Math.floor(Math.random() * 4)
        if (board[f][c] == 0) {

            let number2or4 = false
            while (!number2or4) {
                number = Math.floor(Math.random() * 5)
                if (number == 2 || number == 4) {
                    number2or4 = true
                }
            }
            board[f][c] = number
            let box = document.getElementById(f.toString() + "-" + c.toString())
            box.innerText = number.toString()
            found = true
            updatebox(box, 2)
        }
    }
    //sumpieces
    document.getElementById("sumpieces").innerText = sumpieces();

}

function sumpieces() {
    var addition = 0
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            addition += board[r][c]
        }
    }
    return addition;
}
//document.addEventListener("keydown",keys)

function keys(e) {

    if (e.code == "ArrowLeft") {
        slideLeft();
        generateNum()
        totalmov += 1
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        generateNum()
        totalmov += 1
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        generateNum()
        totalmov += 1
    }
    else if (e.code == "ArrowDown") {
        slideDown();
        generateNum()
        totalmov += 1
    }
    document.getElementById("totalmov").innerText = totalmov;
    document.getElementById("sumpieces").innerText = sumpieces();
    checkresult()

    if (isWinner || isLoser) {
        document.removeEventListener("keydown", keys);
        clearTimeout(t);
    }
}

function filterZero(row) {
    return row.filter(num => num != 0); //create new array of all nums != 0
}

function slide(row) {

    row = filterZero(row);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
        }
    }
    row = filterZero(row);

    while (row.length < 4) {
        row.push(0);
    }
    return row;
}

function slideLeft() {
    for (let r = 0; r < 4; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < 4; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updatebox(tile, num);
        }
    }
}


function slideRight() {
    for (let r = 0; r < 4; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row)
        board[r] = row.reverse();
        board[r] = row;
        for (let c = 0; c < 4; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updatebox(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < 4; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r = 0; r < 4; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updatebox(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < 4; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < 4; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updatebox(tile, num);
        }
    }
}

function isFull() {


    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c] == 0)
                return false;
        }
    }
    return true;
}

function is2048() {
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c] == 2048) {
                isWinner = true;
                return true;
            }
        }
    }
    return false;
}

function checkresult() {

    let end = is2048();


    let result = document.getElementById("result");

    if (isFull() && end == false) {

        isLoser = true;
        result.className = "loser";
        result.innerHTML = "LOSER!"
    }


    if (isWinner == true) {
        result.className = "multicolortext";
        result.innerHTML = "WINNER!";
        clearTimeout(t);
    }
}

function tick() {
    seconds++;

    if (seconds >= 60) {
        seconds = 0
        minutes++
    }

}

function timer() {
    t = setTimeout(chronometer, 1000);
}

function chronometer() {

    tick()

    let sec = document.getElementById("seconds")
    let min = document.getElementById("minutes")

    min.innerHTML = (minutes > 9 ? minutes : "0" + minutes)
    sec.innerHTML = ":" + (seconds > 9 ? seconds : "0" + seconds)

    timer()
}

