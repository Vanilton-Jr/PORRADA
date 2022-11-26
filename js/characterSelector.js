const KenjiSprites = [4, 8, 2, 2, 4, 3, 6]

function derteminarJogador(jogador, sprites){
     if(jogador == `Kenji`){
         player.sprites.idle.imgSrc = './img/Kenji/Idle.png',
         player.sprites.idle.framesMax = 4,

         player.sprites.jump.imgSrc = `./img/Kenji/Jump.png`,

         player.sprites.run.imgSrc = `./img/Kenji/Run.png`,
         player.sprites.run.framesMax = 7,

         player.sprites.attack1.imgSrc = `./img/Kenji/Attack1.png`

         player.sprites.fall.imgSrc = `./img/Kenji/Fall.png`

         player.sprites.takeHit.imgSrc = `./img/Kenji/Take hit.png`

         player.sprites.death.imgSrc = `./img/Kenji/Death.png`
      }

}