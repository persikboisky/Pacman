const KEY_UP = "KeyW";
const KEY_DOWN = "KeyS";
const KEY_LEFT = "KeyA";
const KEY_RIGHT = "KeyD";

const span = document.querySelector("span");
const h1 = document.querySelector("h1");

class Pacman {

    pacmanImg = "";

    x = 0;
    y = 0;

    speed = 0.25;

    sizeFrame = 20;
    currentFrame = 0;
    finishFrame = 7;

    direct = "STOP";
    aldDirect = this.direct;

    velocityX = 0;
    velocityY = 0;

    Score = 0;

    angle = {
        "STOP": 0,
        "UP": 135,
        "DOWN": 45,
        "LEFT": 90,
        "RIGHT": 0
    };

    constructor(spawnX, spawnY) {
        this.pacmanImg = document.querySelector("#pacmanImage");
        this.x = spawnX;
        this.y = spawnY;
    }

    checkInteger = (number1, number2 = 1) => number1 % 1 == 0 && number2 % 1 == 0;

    render() {
        this.currentFrame += 1;
        if (this.currentFrame > this.finishFrame - 1) {
            this.currentFrame = 0;
        }

        context.save();
        context.translate(
            this.x * SIZE_CELL + 2.5 + (SIZE_CELL - 5) / 2,
            this.y * SIZE_CELL + 2.5 + (SIZE_CELL - 5) / 2
        );
        context.rotate((this.angle[this.direct] * 90 * Math.PI) / 180);
        context.translate(
            -(this.x * SIZE_CELL + 2.5) - (SIZE_CELL - 5) / 2,
            -(this.y * SIZE_CELL + 2.5) - (SIZE_CELL - 5) / 2
        );
        context.drawImage(
            this.pacmanImg,
            this.currentFrame * this.sizeFrame,
            0,
            this.sizeFrame,
            this.sizeFrame,
            this.x * SIZE_CELL + 2.5,
            this.y * SIZE_CELL + 2.5,
            SIZE_CELL - 5,
            SIZE_CELL - 5
        );
        context.restore();
    }

    key = "";
    move() {
        document.addEventListener("keydown", (event) => {
            this.key = event.code;
        });

        if (this.checkInteger(this.y, this.x)) {
            switch (this.key) {
                case KEY_DOWN:
                    if (map[this.y + 1][this.x] != 1) {
                        this.direct = "DOWN";
                        this.velocityX = 0;
                        this.velocityY = this.speed;
                        this.key = "";
                    }
                    break;
                case KEY_UP:

                    if (map[this.y - 1][this.x] != 1) {
                        this.direct = "UP";
                        this.velocityX = 0;
                        this.velocityY = -this.speed;
                        this.key = "";
                    }

                    break;
                case KEY_LEFT:

                    if (map[this.y][this.x - 1] != 1) {
                        this.direct = "LEFT";
                        this.velocityX = -this.speed;
                        this.velocityY = 0;
                        this.key = "";
                    }

                    break;
                case KEY_RIGHT:
                    if (map[this.y][this.x + 1] != 1) {
                        this.direct = "RIGHT";
                        this.velocityX = this.speed;
                        this.velocityY = 0;
                    }

                    break;
                default:
                    break;
            }
        }

        if (this.checkInteger(this.x, this.y)) {
            if (this.velocityX > 0 && map[this.y][this.x + 1] == 1) {
                this.velocityX = 0;
            } else if (this.velocityX < 0 && map[this.y][this.x - 1] == 1) {
                this.velocityX = 0;
            }

            if (this.velocityY > 0 && map[this.y + 1][this.x] == 1) {
                this.velocityY = 0;
            } else if (this.velocityY < 0 && map[this.y - 1][this.x] == 1) {
                this.velocityY = 0;
            }
        }

        this.x += this.velocityX;
        this.y += this.velocityY;
    }

    teleport() {
        if (this.checkInteger(this.x, this.y)) {
            if (map[this.y][this.x] == 3) {
                for (let y = 0; y < map.length; y++) {
                    for (let x = 0; x < map[0].length; x++) {
                        if (this.x == x && this.y == y) continue;
                        if (map[y][x] == 3) {
                            this.x = x;
                            this.y = y;
                            break;
                        }
                    }
                }
            }
        }
    }

    eat() {
        if (this.checkInteger(this.x, this.y)) {
            if (map[this.y][this.x] == 2) {
                map[this.y][this.x] = 0;
                this.Score++;
                h1.style.color = INTERFACE_COLOR;
                span.style.color = INTERFACE_COLOR;
                span.innerHTML = this.Score;
            }
        }
    }

    update() {
        this.move();
        this.eat();
        this.teleport();
        this.render();
    }
}