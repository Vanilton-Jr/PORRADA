const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.7
const pulo = 20
const dano1 =10
const dano2 = 5
let timer = 60



const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imgSrc: './img/background.png',
    scale: 1
})

const shop = new Sprite({
    position: {
        x: 600,
        y: 128
    },
    imgSrc: './img/shop.png',
    scale: 2.75,
    framesMax: 6
})

const player = new Fighter({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 10 },
    imgSrc: './img/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 156
    },
    sprites: {
        idle: {
            imgSrc: './img/samuraiMack/Idle.png',
            framesMax: 8,
        },
        run: {
            imgSrc: './img/samuraiMack/Run.png',
            framesMax: 8,
        },
        jump: {
            imgSrc: './img/samuraiMack/Jump.png',
            framesMax: 2,
        },
        fall: {
            imgSrc: './img/samuraiMack/fall.png',
            framesMax: 2,
        },
        attack1: {
            imgSrc: './img/samuraiMack/Attack1.png',
            framesMax: 6,
        },
        takeHit: {
            imgSrc: './img/samuraiMack/Take Hit - white silhouette.png',
            framesMax: 4,
        },
        death: {
            imgSrc: './img/samuraiMack/Death.png',
            framesMax: 6,
        }
    },
    attackBox: {
        offset: { x: 95, y: 48 },
        width: 160,
        height: 15
    }
})

const enemy = new Fighter({
    position: { x: 400, y: 100 },
    velocity: { x: 0, y: 0 },
    color: 'black',
    attackColor: 'red',
    offset: {
        x: -50,
        y: 0
    },
    imgSrc: './img/Kenji/Idle.png',
    framesMax: 4,
    scale: 2.3,
    offset: {
        x: 215,
        y: 145
    },
    sprites: {
        idle: {
            imgSrc: './img/Kenji/Idle.png',
            framesMax: 4,
        },
        run: {
            imgSrc: './img/Kenji/Run.png',
            framesMax: 8,
        },
        jump: {
            imgSrc: './img/Kenji/Jump.png',
            framesMax: 2,
        },
        fall: {
            imgSrc: './img/Kenji/fall.png',
            framesMax: 2,
        },
        attack1: {
            imgSrc: './img/Kenji/Attack1.png',
            framesMax: 4,
        },
        takeHit: {
            imgSrc: './img/Kenji/Take Hit.png',
            framesMax: 3,
        },
        death: {
            imgSrc: './img/Kenji/Death.png',
            framesMax: 7,
        }
    },
    attackBox: {
        offset: { x: -180, y: 48 },
        width: 160,
        height: 15
    }
})
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },


    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}



decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    c.fillStyle = 'rgba(255, 255, 255, 0.1 )'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update();
    enemy.update();

    player.velocity.x = 0
    enemy.velocity.x = 0



    //player movement
    if (keys.a.pressed && player.lastKey === "a") {
        player.velocity.x = -5;
        player.switchSprite('run')
    }
    else if (keys.d.pressed && player.lastKey === "d") {
        player.velocity.x = 5;
        player.switchSprite('run')
    }
    else {
        player.switchSprite('idle')
    }

    //jumping
    if (player.velocity.y < 0) {
        player.switchSprite('jump')
    }
    else if (player.velocity.y > 0) {
        player.switchSprite('fall')
    }

    //enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
        enemy.velocity.x = -5
        enemy.switchSprite('run')
    }
    else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
        enemy.velocity.x = 5
        enemy.switchSprite('run')
    }
    else {
        enemy.switchSprite('idle')
    }

    //jumping
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
    }
    else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
    }


    // detect for colision & hits
    if (rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&
        player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false;
        enemy.takeHit(dano1)
        gsap.to('#enemy_health', {width: player.health + '%'})
    }
    if (rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&
        enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false
        player.takeHit(dano2)
        gsap.to('#player_health', {width: player.health + '%'})
    }
    //if player misses
    if (player.isAttaking && player.framesCurrent === 4) {
        player.isAttacking = false
    }

    if (enemy.isAttaking && enemy.framesCurrent === 4) {
        enemy.isAttacking = false
    }

    //end game by health
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({ player, enemy, timerId })
    }
    
}

animate()

//movimentos -----------------------------------------------------------------------------------------

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break;
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break;
        case 'w':
            player.velocity.y = -pulo
            break;
        case ' ':
            player.attack()
            break;


        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break;
        case 'ArrowUp':
            enemy.velocity.y = -pulo
            break;
        case 'h':
            enemy.attack()
            break;
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd': keys.d.pressed = false
            break;
        case 'a': keys.a.pressed = false
            break;

        //enemy keys
        case 'ArrowRight': keys.ArrowRight.pressed = false
            break;
        case 'ArrowLeft': keys.ArrowLeft.pressed = false
            break;
    }
})