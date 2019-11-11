// mobile navigation //

const keyA = document.createElement('div'),
    keyW = document.createElement('div'),
    keyD = document.createElement('div'),
    keyS = document.createElement('div');

keyA.classList.add('btnL');
keyW.classList.add('btnU');
keyD.classList.add('btnR');
keyS.classList.add('btnD');
keyA.innerText = "left";
keyW.innerText = "up";
keyD.innerText = "right";
keyS.innerText = "down";

// mobile navigation //

const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    game = document.querySelector('.game'),
    gameArea = document.querySelector('.gameArea'),
    gameAreaSide = document.querySelector('.gameAreaSide'),
    gameAreaSide1 = document.querySelector('.gameAreaSide1'),
    navigation = document.querySelector('.navigation'),

    car = document.createElement('div'),
    trees = document.createElement('div');

    let audio = new Audio('../NeedForJS/mus/mus3.mp3');
    let topScore = localStorage.getItem('topScore');

    car.classList.add('car');
    trees.classList.add('trees');

    audio.controls = true;
    audio.classList.add('audio');
    audio.volume = 0.05;
    let allow = false;
    audio.addEventListener('loadeddata', () => {
        allow = true;
    });

const keys = {
    w: false && keyW,
    s: false,
    d: false,
    a: false
};

const setting = {
    start: false,
    score: 0,
    speed: 2,
    traffic: 3,
    level: 0,
    treeSpeed: 6
};

const getQuantityElements = heightElement => Math.ceil(gameArea.offsetHeight / heightElement);
const getQuantityElementsTrees = heightElement => Math.ceil(gameAreaSide.offsetHeight / heightElement);
const getQuantityElementsTrees1 = heightElement => Math.ceil(gameAreaSide1.offsetHeight / heightElement);

const startGame = (event) => {
    if (event.target.classList.contains('start')) {
        return;
    }
    if (event.target.classList.contains('easy')) {
        setting.speed = 3;
        setting.traffic = 3;
    }
    if (event.target.classList.contains('medium')) {
        setting.speed = 5;
        setting.traffic = 3;
    }
    if (event.target.classList.contains('hard')) {
        setting.speed = 7;
        setting.traffic = 2;
    }
    start.classList.add('hide');
    gameArea.innerHTML = '';
    gameAreaSide.innerHTML = '';
    gameAreaSide1.innerHTML = '';

    for(let i = 0; i < getQuantityElements(100) + 1; i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    }
    for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
        const enemy = document.createElement('div');
        let enemyImg = Math.floor(Math.random() * 2) + 1;
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = `transparent url(../NeedForJS/img/enemy${enemyImg}.png) center / cover no-repeat`;
        gameArea.appendChild(enemy);
        navigation.appendChild(audio);
        if (allow) {
            audio.play();
        }
    }
    for (let i = 0; i < getQuantityElementsTrees(100 * setting.treeSpeed); i++) {
        const palm = document.createElement('div');
        let palmImg = Math.floor(Math.random() * 2) + 1;
        palm.classList.add('palm');
        palm.y = -100 * setting.treeSpeed * (i + 1);
        palm.style.left = Math.floor(Math.random() * (gameAreaSide.offsetWidth - 120)) + 'px';
        palm.style.top = palm.y + 'px';
        palm.style.background = `transparent url(../NeedForJS/img/palm_tree/palm${palmImg}.png) center / cover no-repeat`;
        gameAreaSide.appendChild(palm);
    }
    for (let i = 0; i < getQuantityElementsTrees1(100 * setting.treeSpeed); i++) {
        const palm = document.createElement('div');
        let palmImg = Math.floor(Math.random() * 3) + 1;
        palm.classList.add('palm');
        palm.y = -100 * setting.treeSpeed * (i + 1);
        palm.style.left = Math.floor(Math.random() * (gameAreaSide1.offsetWidth - 120)) + 'px';
        palm.style.top = palm.y + 'px';
        palm.style.background = `transparent url(../NeedForJS/img/palm_tree/palm${palmImg}.png) center / cover no-repeat`;
        gameAreaSide1.appendChild(palm);
    }
    setting.score = 0;
    setting.start = true;
    gameArea.appendChild(car);
    car.style.left = '125px';
    car.style.top = 'auto';
    car.style.bottom = '10px';
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);

    gameArea.appendChild(keyA);
    gameArea.appendChild(keyW);
    gameArea.appendChild(keyD);
    gameArea.appendChild(keyS);
};

const playGame = () => {
    if (setting.score > 2000 && setting.level === 0 ) {
        setting.speed++;
        setting.level++;
    } else if (setting.score > 5000 && setting.level === 1) {
        setting.speed++;
        setting.level++;
    } else if (setting.score > 10000 && setting.level === 2) {
        setting.speed++;
        setting.level++;
    }
    if (gameArea.style.top = (score.offsetHeight)) {
        gameArea.style.marginTop = '0';
    }
    gameArea.style.top = score.offsetHeight;
    setting.score += setting.speed;
    score.innerHTML = 'SCORE<br>' + setting.score;
    moveRoad();
    moveEnemy();
    moveTrees();
    moveTrees1();
    if(keys.a && setting.x > 0) {
        setting.x -= setting.speed;
    }
    if(keys.d && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
        setting.x += setting.speed;
    }
    if(keys.w && setting.y > 0) {
        setting.y -= setting.speed; 
    }
    if(keys.s && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
        setting.y += setting.speed; 
    }
    car.style.left = setting.x + 'px';
    car.style.top = setting.y + 'px';
    if (setting.start){
    requestAnimationFrame(playGame);
    }
};

const startRun = (event) => {
    event.preventDefault();
    if(keys.hasOwnProperty(event.key)){
        keys[event.key] = true;
    }
};

const stopRun = (event) => {
    event.preventDefault();
    if(keys.hasOwnProperty(event.key)){
        keys[event.key] = false;
    }
};

const moveRoad = () => {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line){
        line.y += setting.speed;
        line.style.top = line.y + 'px';

        if(line.y >= gameArea.offsetHeight) {
            line.y = -100;
        }
    });
};

const moveEnemy = () => {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(item => {
        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();
        if(carRect.top + 10 <= enemyRect.bottom && 
            carRect.right - 5 >= enemyRect.left &&
            carRect.left + 10 <= enemyRect.right &&
            carRect.bottom - 10 >= enemyRect.top) {
                setting.start = false;
                if (topScore < setting.score) {
                    localStorage.setItem('topScore', setting.score);
                }
                audio.pause();
                start.classList.remove('hide');
                start.style.top = score.offsetHeight;
                alert("Game Over! Choose level of difficulty to play again!");
        }
        item.y += setting.speed / 2;
        item.style.top = item.y + 'px';
        if (item.y >= gameArea.offsetHeight) {
            item.y = -100 * setting.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }
    });
};

const moveTrees = () => {
    let palm = document.querySelectorAll('.palm');
    palm.forEach(item => {
        item.y += setting.treeSpeed / 2;
        item.style.top = item.y + 'px';
        if (item.y >= gameAreaSide.offsetHeight) {
            item.y = -200;
            item.style.left = Math.floor(Math.random() * (gameAreaSide.offsetWidth - 120)) + 'px';
        }
    });
};

const moveTrees1 = () => {
    let palm = document.querySelectorAll('.palm');
    palm.forEach(item => {
        item.y += setting.treeSpeed / 2;
        item.style.top = item.y + 'px';
        if (item.y >= gameAreaSide1.offsetHeight) {
            item.y = -200;
            item.style.left = Math.floor(Math.random() * (gameAreaSide1.offsetWidth - 120)) + 'px';
        }
    });
};

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
document.addEventListener('touchmove', startRun);
document.addEventListener('touchmove', stopRun);

keyW.addEventListener('touchmove', function(e){
    if(keys.w || keyW && setting.y >= 0) {
        setting.y -= setting.speed; 
    } 
});
keyA.addEventListener('touchmove', function(e){
    if(keys.a || keyA && setting.y >= 0) {
        setting.x -= setting.speed; 
    }
});
keyS.addEventListener('touchmove', function(e){
    if(keys.s || keyS && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
        setting.y += setting.speed; 
    }
});
keyD.addEventListener('touchmove', function(e){
    if(keys.d || keyD && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
        setting.x += setting.speed;
    }
});
