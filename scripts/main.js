const TIC = 20;
const BACKGROUND_COLOR = "black";
const INTERFACE_COLOR = "white";
const MAP_COLOR = "blue";
const FOOD_COLOR = "yellow";
const FOOD_SIZE = 0.5;
const SIZE_CELL = 30;
const WIDTH_LINER = 2;
const SPAWN_PACMAN_X = 2;
const SPAWN_PACMAN_Y = 2;
const SPAWN_GHOSTS_X = 11;
const SPAWN_GHOSTS_Y = 10;
const DISTANCE_LOOK_GHOST = 5;
const MAX_GHOST = 10;

let nGhost = 1;
let map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
    [0, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0],
    [0, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0],
    [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
    [0, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 0],
    [0, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 0],
    [0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 0],
    [0, 3, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 3, 0],
    [0, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 0],
    [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
    [0, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0],
    [0, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 0],
    [0, 1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1, 0],
    [0, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 0],
    [0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0],
    [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

let nFoods = 0;
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
        if (map[y][x] === 2) {
            nFoods++;
        }
    }
}

document.querySelector("body").style.background = BACKGROUND_COLOR;

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const medalImage = document.querySelector("#medalImage");

canvas.width = map[0].length * SIZE_CELL;
canvas.height = map.length * SIZE_CELL;

h1.style.fontSize = SIZE_CELL * 1.25 + "px";
span.style.fontSize = SIZE_CELL * 1.25  + "px";

function rect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawMap() {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x] === 1) {
                if (map[y][x - 1] != 1) {
                    rect(
                        x * SIZE_CELL,
                        y * SIZE_CELL,
                        WIDTH_LINER,
                        SIZE_CELL,
                        MAP_COLOR
                    );
                }
                if (map[y][x + 1] != 1) {
                    rect(
                        x * SIZE_CELL + SIZE_CELL - WIDTH_LINER,
                        y * SIZE_CELL,
                        WIDTH_LINER,
                        SIZE_CELL,
                        MAP_COLOR
                    );
                }
                if (map[y - 1][x] != 1) {
                    rect(
                        x * SIZE_CELL,
                        y * SIZE_CELL,
                        SIZE_CELL,
                        WIDTH_LINER,
                        MAP_COLOR
                    );
                }
                if (map[y + 1][x] != 1) {
                    rect(
                        x * SIZE_CELL,
                        y * SIZE_CELL + SIZE_CELL - WIDTH_LINER,
                        SIZE_CELL,
                        WIDTH_LINER,
                        MAP_COLOR
                    );
                }

                rect(
                    x * SIZE_CELL,
                    y * SIZE_CELL,
                    WIDTH_LINER,
                    WIDTH_LINER,
                    MAP_COLOR
                );
                rect(
                    x * SIZE_CELL + SIZE_CELL - WIDTH_LINER,
                    y * SIZE_CELL,
                    WIDTH_LINER,
                    WIDTH_LINER,
                    MAP_COLOR
                );
                rect(
                    x * SIZE_CELL,
                    y * SIZE_CELL + SIZE_CELL - WIDTH_LINER,
                    WIDTH_LINER,
                    WIDTH_LINER,
                    MAP_COLOR
                );
                rect(
                    x * SIZE_CELL + SIZE_CELL - WIDTH_LINER,
                    y * SIZE_CELL + SIZE_CELL - WIDTH_LINER,
                    WIDTH_LINER,
                    WIDTH_LINER,
                    MAP_COLOR
                );
            } else if (map[y][x] === 2) {
                let i = FOOD_SIZE;
                i += 2;
                rect(
                    x * SIZE_CELL + SIZE_CELL / i,
                    y * SIZE_CELL + SIZE_CELL / i,
                    SIZE_CELL - (SIZE_CELL / i) * 2,
                    SIZE_CELL - (SIZE_CELL / i) * 2,
                    FOOD_COLOR
                )
            }
        }
    }
}

const pacman = new Pacman(SPAWN_PACMAN_X, SPAWN_PACMAN_Y);

let ghost = new Array(MAX_GHOST);

for (let i = 0; i < MAX_GHOST; i++) {
    ghost[i] = new Ghost(SPAWN_GHOSTS_X, SPAWN_GHOSTS_Y, DISTANCE_LOOK_GHOST);
}

let running = true;
let GameOver = false;
let win = false;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
function update() {
    rect(0, 0, canvas.width, canvas.height, BACKGROUND_COLOR);
    drawMap();

    let scoreNewGhost = Math.round(nFoods / MAX_GHOST * nGhost);

    let flag = true;
    if (pacman.Score == scoreNewGhost) {
        if (flag == true) {
            nGhost++;
        }
    } else {
        flag = false;
    }

    pacman.update();
    if (running) {

        for (let i = 0; i < nGhost; i++) {
            ghost[i].update();
            if (
                Math.round(pacman.x) == Math.round(ghost[i].x) && 
                Math.round(pacman.y) == Math.round(ghost[i].y)
            ) {
                GameOver = true;
                running = false;
                (async () => {
                    await sleep(2000);
                    location.reload();
                })();
            }
        }

        if (pacman.Score == nFoods) {
            running = false;
            win = true;
            (async () => {
                await sleep(3000);
                location.reload();
            })();
        }
        
    } else if (win) {
        context.drawImage(
            medalImage,
            0,
            0,
            512,
            512,
            canvas.width / 2 - SIZE_CELL * 5 / 2,
            canvas.height / 2 - SIZE_CELL * 5 / 2,
            SIZE_CELL * 5,
            SIZE_CELL * 5
        );
        span.innerHTML = "You Win !";
    } else {
        document.addEventListener("keydown", () => {
            running = true;
        });

        if (GameOver) {
            span.innerHTML = "Game Over";
        }
    }
}

setInterval(update, 1000 / TIC);