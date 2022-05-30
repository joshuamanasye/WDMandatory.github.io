/** @type {HTMLCanvasElement} */

var canvas = document.getElementById("canvas")

window.innerWidth = 769
window.innerHeight = 896
canvas.width = window.innerWidth
canvas.height = window.innerHeight

var ctx = canvas.getContext('2d')

var frame = 0
const projectiles = []
const enemies = []

score = 0

class PLayer {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.radius = 7
        this.velocity = 8
        this.regular = true
        this.focused = false
        this.img = new Image()
        this.img.src = "./assets/sanae_idle.png"
        this.posImg = [0, 32, 64, 96, 128, 160, 192, 224]
    }
}

class PlayerProjectile {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.velocity = 50
        this.img = new Image()
        this.img.src = "./assets/sanae_bullet.png"
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, 8, 56)
    }

    go() {
        this.y -= this.velocity
        this.draw()
    }
}

class BigFairy {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.radius = 7
        this.velocity = 1
        this.img = new Image()
        this.img.src = "./assets/big_fairy.png"
        this.posImg = [0, 66, 129, 195, 260]
    }

    draw() {
        ctx.drawImage(this.img, this.posImg[frame%5], 0, 65, 63, this.x, this.y, 126, 121)
    }

    go() {
        this.y += this.velocity
        this.draw()
    }
}

function spawnBigFairies() {
    setInterval(() => {
        let x = Math.floor(Math.random() * 703)
        enemies.push(new BigFairy(x, -70))
        console.log(enemies)
    }, 2000)
}

spawnBigFairies()

var player = new PLayer(355, 700)
var keys = {}

$(document).keydown(function(e) {
    if(e.keyCode == 16){
        player.focused = true
        player.velocity = 4
    }
    keys[e.keyCode] = true;
})
$(document).keyup(function (e) {
    if(e.keyCode == 16){
        player.focused = false
        player.velocity = 8
    }
    delete keys[e.keyCode];
})

function checkKey() {
    for (var e in keys) {
        if (!keys.hasOwnProperty(e)) continue;
        if (e == 37) {
            if (player.x > 0) {
                player.x-=player.velocity
            }          
        }
        if (e == 38) {
            if (player.y > 0) {
                player.y-=player.velocity
            }
        }
        if (e == 39) {
            if (player.x <705) {
                player.x+=player.velocity
            }
        }
        if (e == 40) {
            if (player.y < 796) {
                player.y+=player.velocity
            }
        }
        if (e == 90) {
            projectiles.push(new PlayerProjectile(player.x + 16, player.y))
            projectiles.push(new PlayerProjectile(player.x + 48, player.y))
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    projectiles.forEach((projectile, index) => {
        projectile.go()
        if (projectiles.x < -50 || projectile.y < -50 || projectile.x > 819 || projectile.y > 946) {
            projectiles.splice(index, 1)
        }
    })

    enemies.forEach((enemy, index) => {
        enemy.go()
        projectiles.forEach((projectile, index1) => {
            if(projectile.x > enemy.x + 65 - enemy.radius && projectile.x < enemy.x + 65 + enemy.radius && projectile.y < enemy.y + 63 + enemy.radius && projectile.y > enemy.y + 63 - enemy.radius){
                enemies.splice(index, 1)
                projectiles.splice(index1, 1)
                score += 2020
            }
        })
    })

    ctx.drawImage(player.img, player.posImg[frame%8], 0, 32, 50, player.x, player.y, 64, 100)

    if (player.focused) {
        ctx.beginPath()
        ctx.arc(player.x + 32, player.y + 50, player.radius, player.radius, 2 * Math.PI)
        ctx.fillStyle = "white"
        ctx.fill()
        ctx.strokeStyle = "red"
        ctx.stroke()
        ctx.closePath
    }

    ctx.font = "40px Arial"
    ctx.fillStyle = "white"
    ctx.fillText(String(score), 650, 140)
    
    frame++

    if(frame > 39){
        frame = 0
    }
}

running = true

game_loop = () => {
    if(!running){
        return
    }

    draw()
    checkKey()

    setTimeout(() => {
    requestAnimationFrame(game_loop)
    }, 1)
    
}

requestAnimationFrame(game_loop)