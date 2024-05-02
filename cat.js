const p1 = {
    score: 0,
    button: document.querySelector("#p1Button"),
    display: document.querySelector("#p1Display"),
    name:"p1"
};
const p2 = {
    score: 0,
    button: document.querySelector("#p2Button"),
    display: document.querySelector("#p2Display"),
    name:"p2"
};

const resetButton = document.querySelector("#reset");
const winningScoreselect = document.querySelector("#winningScore");
const result = document.querySelector("#result");


let winningScore = 3;
let isGameOver = false;
let isDuce = false;
function updateScore(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
        player.display.textContent = player.score;
        if (!isDuce) {
            if (player.score === winningScore) {
                isGameOver = true;
                player.display.classList.add("has-text-primary");
                opponent.display.classList.add("has-text-danger");
                player.button.disabled = true;
                opponent.button.disabled = true;
                let li = document.createElement("li");
                if(player.name === "p1"){
                    li.textContent = `${player.score}対${opponent.score}`;
                }else if(player.name ==="p2") {
                    li.textContent = `${opponent.score}対${player.score}`;
                }
                result.appendChild(li);
            }
            if (
                player.score === winningScore - 1 &&
                opponent.score === winningScore - 1
            ) {
                isDuce = true;
                isGameOver = false;
            }
        } else if (isDuce) {
            if((player.score - opponent.score) === 2 ) {
                isGameOver = true;
                player.display.classList.add("has-text-primary");
                opponent.display.classList.add("has-text-danger");
                player.button.disabled = true;
                opponent.button.disabled = true;
            }else if((opponent.score-player.score) === 2) {
                isGameOver = true;
                opponent.display.classList.add("has-text-primary");
                player.display.classList.add("has-text-danger");
                player.button.disabled = true;
                opponent.button.disabled = true;
            }
        }
    }
        
        
}

p1.button.addEventListener("click", function () {
    updateScore(p1, p2);
});

p2.button.addEventListener("click", function () {
    updateScore(p2, p1);
});

resetButton.addEventListener("click", reset);

winningScoreselect.addEventListener("change", function () {
    winningScore = parseInt(this.value);
    reset();
});

function reset() {
    isGameOver = false;
    isDuce = false;
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove("has-text-primary", "has-text-danger");
        p.button.disabled = false;
    }
}
