const ghostImage = document.querySelector("#ghostImage");
let ghostColor = 0;
const ghostCoordImage = [
    [0, 0],
    [175, 0],
    [0, 125],
    [175, 125]
];

class Ghost {

    getDistance = (x1, y1, x2, y2) => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    checkInteger = (number1, number2 = 1) => number1 % 1 == 0 && number2 % 1 == 0;

    x = 0;
    y = 0;
    Step = 0;

    distance = 0;
    speed = 0.1;

    nStep = 1 / this.speed;

    velocityX = 0;
    velocityY = 0;

    color = 0;

    toSink = false;

    constructor(spawnX, spawnY, distance) {
        this.x = spawnX;
        this.y = spawnY;
        this.distance = distance;

        this.color = ghostColor;
        ghostColor++;

        if (ghostColor === 4) {
            ghostColor = 0;
        }
    }

    render() {
        context.save();
        context.translate(
            this.x * SIZE_CELL + SIZE_CELL / 2,
            this.y * SIZE_CELL + SIZE_CELL / 2
        );
        if (this.toSink)
            context.scale(-1, 1);
        context.translate(
            -(this.x * SIZE_CELL) - SIZE_CELL / 2,
            -(this.y * SIZE_CELL) - SIZE_CELL / 2
        );
        context.drawImage(
            ghostImage,
            ghostCoordImage[this.color][0],
            ghostCoordImage[this.color][1],
            125,
            120,
            this.x * SIZE_CELL,
            this.y * SIZE_CELL,
            SIZE_CELL,
            SIZE_CELL
        );
        context.restore();
    }

    UP = 0;
    DOWN = 1;
    LEFT = 2;
    RIGHT = 3;

    SelectDirect = 0;

    checkWall(direct) {
        switch (direct) {
            case this.UP:
                if (map[this.y - 1][this.x] == 1)
                    return true;
                break;
            case this.DOWN:
                if (map[this.y + 1][this.x] == 1)
                    return true;
                break;
            case this.LEFT:
                if (map[this.y][this.x - 1] == 1)
                    return true;
                break;
            case this.RIGHT:
                if (map[this.y][this.x + 1] == 1)
                    return true;
                break;
        }
        return false;
    }

    setVelocity(direct) {
        switch (direct) {
            case this.UP:
                this.velocityX = 0;
                this.velocityY = -this.speed;
                break;
            case this.DOWN:
                this.velocityX = 0;
                this.velocityY = this.speed;
                break;
            case this.LEFT:
                this.velocityX = -this.speed;
                this.velocityY = 0;
                this.toSink = true;
                break;
            case this.RIGHT:
                this.velocityX = this.speed;
                this.velocityY = 0;
                this.toSink = false;
                break;
            default:
                this.velocityX = 0;
                this.velocityY = 0;
                break;
        }
        this.SelectDirect = direct;
    }

    velocityUpdate() {
        let arrayDirect = [
            !this.checkWall(this.UP),
            !this.checkWall(this.DOWN),
            !this.checkWall(this.LEFT),
            !this.checkWall(this.RIGHT)
        ];

        let nWalls = 0;
        for (let i = 0; i < 3; i++) {
            if (arrayDirect[i]) {
                nWalls++;
            }
        }

        if (this.SelectDirect == this.UP) arrayDirect[1] = false;
        if (this.SelectDirect == this.DOWN) arrayDirect[0] = false;
        if (this.SelectDirect == this.LEFT) arrayDirect[3] = false;
        if (this.SelectDirect == this.RIGHT) arrayDirect[2] = false;

        if (arrayDirect[this.SelectDirect] && nWalls <= 2) {
            this.setVelocity(this.SelectDirect);
        } else {
            this.setVelocity(null);
            while (true) {
                let random = Math.floor(Math.random() * 4);
                if (arrayDirect[random]) {
                    this.setVelocity(random);
                    break;
                }
            }
        }
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

    move() {

        this.x += this.velocityX;
        this.y += this.velocityY;

        this.Step++

        if (this.Step % this.nStep == 1) {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            this.velocityUpdate();
            this.Step = 1;
        }
    }

    update() {
        //if (this.distance >= this.getDistance(pacman.x ,pacman.y, this.x, this.y)) {
        this.move();
        this.teleport();
        this.render();
        //}
    }
}