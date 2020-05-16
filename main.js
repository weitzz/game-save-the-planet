let directionY, directionX, player, vell, positionPY, positionPX;
let game;
let frames;
let screenW, screenH, vellT;
let tellBomb, panelBomb, bombsT, vellTBomb, timeBomb;
let lifePlanet;
let indExplosion, indexSong;
let barPlanet;
let msgScreen;
let clickGame = new Audio();
clickGame.src = "songs/player.ogg";


function keyDw() {
    let key = event.keyCode;
    if (key == 38) {
        directionY = -1;
    } else if (key == 40) {
        directionY = 1;
    }
    if (key == 37) {
        directionX = -1;
    } else if (key == 39) {
        directionX = 1;
    }
    if (key == 32) {
        shoot(positionPX + 17, positionPY);
    }
};

function keyP() {
    let key = event.keyCode;
    if ((key == 38) || (key == 40)) {
        directionY = 0;
    }
    if ((key == 37) || (key == 39)) {
        directionX = 0;
    }
};

function shoot(x, y) {
    let t = document.createElement("div");
    let att1 = document.createAttribute("class");
    let att2 = document.createAttribute("style");
    att1.value = "shootPlayer";
    att2.value = "top:" + y + "px;left:" + x + "px";
    t.setAttributeNode(att1);
    t.setAttributeNode(att2);
    document.body.appendChild(t);

}

function createBomb() {
    if (game) {
        let y = 0;
        let x = Math.random() * screenW;
        let bomb = document.createElement("div");
        let att1 = document.createAttribute("class");
        let att2 = document.createAttribute("style");
        att1.value = "bomb";
        att2.value = "top:" + y + "px;left:" + x + "px";
        bomb.setAttributeNode(att1);
        bomb.setAttributeNode(att2);
        document.body.appendChild(bomb);
        tellBomb--;

    }
}

function controllerBomb() {
    bombsT = document.getElementsByClassName("bomb");
    let bombSize = bombsT.length;
    for (let i = 0; i < bombSize; i++) {
        if (bombsT[i]) {
            let positionBomb = bombsT[i].offsetTop;
            positionBomb += vellTBomb;

            bombsT[i].style.top = positionBomb + "px";
            if (positionBomb > screenH) {
                lifePlanet -= 10;
                createExplosion(2, bombsT[i].offsetLeft, null);
                bombsT[i].remove();

            }
        }
    }
}

function controllerShoot() {
    let shoots = document.getElementsByClassName("shootPlayer");
    let sizeShoot = shoots.length;
    for (let i = 0; i < sizeShoot; i++) {
        if (shoots[i]) {
            let positionShoot = shoots[i].offsetTop;
            positionShoot -= vellT;
            shoots[i].style.top = positionShoot + "px";
            shootBomb(shoots[i]);
            if (positionShoot < 0) {
                shoots[i].remove();
            }
        }
    }
}

function shootBomb(shoot) {
    let sizeSB = bombsT.length;
    for (let i = 0; i < sizeSB; i++) {
        if (bombsT[i]) {
            if (
                (
                    (shoot.offsetTop <= (bombsT[i].offsetTop + 40)) &&
                    ((shoot.offsetTop + 8) >= (bombsT[i].offsetTop))
                ) &&
                (
                    (shoot.offsetLeft <= (bombsT[i].offsetLeft + 24)) &&
                    ((shoot.offsetLeft + 8) >= (bombsT[i].offsetLeft))
                )

            ) {
                createExplosion(1, bombsT[i].offsetLeft - 25, bombsT[i].offsetTop);
                bombsT[i].remove();
                shoot.remove();
            }

        }
    }
}

function createExplosion(type, x, y) {
    if (document.getElementById("explosion" + (indExplosion - 4))) {
        document.getElementById("explosion" + (indExplosion - 4)).remove();
    }
    let explosion = document.createElement("div");
    let img = document.createElement("img");
    let song = document.createElement("audio");

    let att1 = document.createAttribute("class");
    let att2 = document.createAttribute("style");
    let att3 = document.createAttribute("id");

    let att4Img = document.createAttribute("src");

    let att5Song = document.createAttribute("src");
    let att6Song = document.createAttribute("id");

    att3.value = "explosion" + indExplosion;

    if (type == 1) {
        att1.value = " explosionAir";
        att2.value = "top:" + y + "px;left:" + x + "px;";
        att4Img.value = "img/explosao_ar.gif?" + new Date();


    } else {
        att1.value = "explosionfloor";
        att2.value = "top:" + (screenH - 57) + "px;left:" + (x - 17) + "px;";
        att4Img.value = "img/explosao_chao.gif?" + new Date();

    }

    att5Song.value = "songs/exp1.mp3?" + new Date();
    att6Song.value = "song" + indexSong;
    explosion.setAttributeNode(att1);
    explosion.setAttributeNode(att2);
    explosion.setAttributeNode(att3);
    img.setAttributeNode(att4Img);
    song.setAttributeNode(att5Song);
    song.setAttributeNode(att6Song);
    explosion.appendChild(img);
    explosion.appendChild(song);

    document.body.appendChild(explosion);
    document.getElementById("song" + indexSong).play();

    indExplosion++;
    indexSong++;


}

function controllerPlayer() {
    positionPY += directionY * vell;
    positionPX += directionX * vell;
    player.style.top = positionPY + "px";
    player.style.left = positionPX + "px";
}

function managerGame() {
    barPlanet.style.width = lifePlanet + "px";
    if (tellBomb <= 0) {
        jogo = false;
        clearInterval(timeBomb);
        msgScreen.style.backgroundImage = "url('img/ganhou.jpg')";
        msgScreen.style.display = "block";
        btnPlay.style.display = "block";

    }
    if (lifePlanet <= 0) {
        jogo = false;
        clearInterval(timeBomb);
        msgScreen.style.backgroundImage = "url('img/gameover.jpg')";
        msgScreen.style.display = "block";
        btnPlay.style.display = "block";

    }
}

function gameloop() {
    if (game) {
        controllerPlayer();
        controllerShoot();
        controllerBomb();
        managerGame();



    }
    frames = requestAnimationFrame(gameloop);
};

function restart() {
    bombsT = document.getElementsByClassName("bomb");
    let bombSize = bombsT.length;
    for (let i = 0; i < bombSize; i++) {
        if (bombsT[i]) {
            bombsT[i].remove();
        }
    }
    msgScreen.style.display = "none";
    btnPlay.style.display = "none";

    clearInterval(timeBomb);
    cancelAnimationFrame(frames);
    lifePlanet = 300;
    positionPX = screenW / 2;
    positionPY = screenH / 2;
    player.style.top = positionPY + "px";
    player.style.left = positionPX + "px";
    tellBomb = 150;
    game = true;
    timeBomb = setInterval(createBomb, 1700);
    gameloop();
}

function initial() {
    game = false;
    screenW = window.innerWidth;
    screenH = window.innerHeight;
    directionY = directionX = 0;
    positionPY = screenH / 2;
    positionPX = screenW / 2;
    vell = vellT = 5;
    player = document.getElementById("naveJog");
    player.style.top = positionPY + "px";
    player.style.left = positionPX + "px";




    tellBomb = 150;
    vellTBomb = 3;



    lifePlanet = 300;
    barPlanet = document.getElementById("barPlanet");
    barPlanet.style.width = lifePlanet + "px";
    indExplosion = 0;
    indexSong = 0;

    msgScreen = document.getElementById("ScreenMsg");
    msgScreen.style.backgroundImage = "url('img/intro-game.jpg')";
    msgScreen.style.display = "block";
    document.getElementById("btnPlay").addEventListener('click', restart);



};
window.addEventListener("load", initial);
document.addEventListener("keydown", keyDw);
document.addEventListener("keyup", keyP);