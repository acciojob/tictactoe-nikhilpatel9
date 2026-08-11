//your JS code here. If required.
const btn = document.getElementById("submit").addEventListener('click', () => {
    const p1 = document.getElementById("player-1").value;
    const p2 = document.getElementById("player-2").value;
    document.getElementById("player-input").style.display = 'none';
    document.getElementById("game-board").style.display = 'block';
    solve(p1, p2);
})

const msg = document.getElementById("message");
let tag = false;
let gameActive = true;

function solve(p1, p2) {
    tag = false;
    gameActive = true;
    
    for (let i = 0; i <= 8; i++) {
        const cell = document.getElementById(`${i}`);
        cell.textContent = '';
        cell.style.backgroundColor = '';
        cell.style.color = '';
    }
    
    msg.textContent = `${p1}, you're up`;
    
    for (let i = 0; i <= 8; i++) {
        const btn = document.getElementById(`${i}`);
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', function() {
            if (!gameActive) {
                return;
            }
            
            if (this.textContent == 'X' || this.textContent == 'O') {
                return;
            }
            
            if (tag) {
                this.textContent = 'O';
                this.style.backgroundColor = "red";
                this.style.color = "white";
                msg.textContent = `${p1}, you're up`;
                tag = false;
            } else {
                this.textContent = 'X';
                this.style.backgroundColor = "blue";
                this.style.color = "white";
                msg.textContent = `${p2}, you're up`;
                tag = true;
            }
            
            let an = check();
            if (an == "X") {
                msg.textContent = `${p1} congratulations you won!`;
                gameActive = false;
                return;
            } else if (an == "O") {
                msg.textContent = `${p2} congratulations you won!`;
                gameActive = false;
                return;
            }
            
            let allFilled = true;
            for (let j = 0; j <= 8; j++) {
                const cell = document.getElementById(`${j}`);
                if (cell.textContent != 'X' && cell.textContent != 'O') {
                    allFilled = false;
                    break;
                }
            }
            if (allFilled) {
                msg.textContent = "It's a draw!";
                gameActive = false;
            }
        });
    }
}

function check() {
    const arr = [[0, 1, 2], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [3, 4, 5], [6, 7, 8], [2, 4, 6]];
    for (let i = 0; i < arr.length; i++) {
        let flagx = true, flago = true;
        for (let j = 0; j < 3; j++) {
            const val = document.getElementById(`${arr[i][j]}`);
            if (val.textContent != 'X') {
                flagx = false;
            }
            if (val.textContent != 'O') {
                flago = false;
            }
        }
        if (flagx) {
            for (let j = 0; j < 3; j++) {
                const val = document.getElementById(`${arr[i][j]}`);
                val.style.backgroundColor = "purple";
                val.style.color = "white";
            }
            return "X";
        }
        if (flago) {
            for (let j = 0; j < 3; j++) {
                const val = document.getElementById(`${arr[i][j]}`);
                val.style.backgroundColor = "purple";
                val.style.color = "white";
            }
            return "O";
        }
    }
    return "-1";
}