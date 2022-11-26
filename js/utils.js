let timerId

function decreaseTimer() {
   timerId = setTimeout(decreaseTimer, 1000);
    if (timer > 0) {
        timer--
        document.getElementById("timer").innerHTML = timer
    }

    if (timer === 0) {
        determineWinner({player, enemy, timerId})
    }
}


function rectangularCollision({ rectangle1, rectangle2 }) {
    return (rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height)
}


function determineWinner({player, enemy, timerId}){
    document.getElementById('tie').style.visibility = "visible"
    document.getElementById('restart_area').style.visibility = "visible"

    clearTimeout(timerId)

    if (player.health === enemy.health) {
        document.getElementById('tie').innerHTML = 'EMPATE'
        
        player.switchSprite('death')
        
        enemy.switchSprite('death')
    }
    else if (player.health > enemy.health && player.health === 100) {
        document.getElementById('tie').innerHTML = `
        JOGADOR 1 GANHOU<br>
                        <br>
          > vitória limpa <
        `;
    }
    else if (player.health > enemy.health) {
        document.getElementById('tie').innerHTML = 'JOGADOR 1 GANHOU'
    }
    else if (player.health < enemy.health && enemy.health === 100) {
        document.getElementById('tie').innerHTML = `
        JOGADOR 2 GANHOU<br>
                        <br>
          > vitória limpa <
        `;
    }
    else if (player.health < enemy.health) {
        document.getElementById('tie').innerHTML = 'JOGADOR 2 GANHOU'
    }
}



