let myXPos = 800;
let myYPos = 500;
let r = 0;
let g = 0;
let b = 255;
let touchedEnemyOnce = false;

let AliensImage;
let ennemies = [];
let SpaceshipImage;
let health = 100;

let screen = 1;

let myLeft, myRight, myTop, myBottom;
let enemySpawnTimer = 0;
let enemySpawnInterval = 100; // Adjust this value to control spawn rate

function preload() {
    AliensImage = loadImage("Images/enemy.png");
    SpaceshipImage = loadImage("Images/Spaceshift.png");
}

function setup() {
    createCanvas(1200, 550);
    noStroke();

    rectMode(CENTER);
    imageMode(CENTER);
}

function draw() {
    if (screen == 1) {
        background(0);
        textSize(20);
        fill(66, 245, 129);
        text("Health: " + health, 10, 30);

        image(SpaceshipImage, myXPos, myYPos, 50, 50);

        // Spawn enemies at the top at different intervals
        enemySpawnTimer++;
        if (enemySpawnTimer >= enemySpawnInterval && ennemies.length < 40) {
            ennemies.push({
                x: random(50, width - 50),
                y: 25,
                ydirection: 1
            });
            enemySpawnTimer = 0;
        }

        for (let i = 0; i < ennemies.length; i++) {
            let enemy = ennemies[i];
            image(AliensImage, enemy.x, enemy.y, 50, 50);

            enemy.y += 1.5 * enemy.ydirection;
            if (enemy.y >= height - 25 || enemy.y <= 25) {
                enemy.ydirection *= -1; // Bounce up and down
            }

            let enemyLeft = enemy.x - 25;
            let enemyRight = enemy.x + 25;
            let enemyTop = enemy.y - 25;
            let enemyBottom = enemy.y + 25;

            myLeft = myXPos - 25;
            myRight = myXPos + 25;
            myTop = myYPos - 25;
            myBottom = myYPos + 25;

            if (!(myLeft > enemyRight || myRight < enemyLeft || myTop > enemyBottom || myBottom < enemyTop)) {
                touchedEnemyOnce = true;
            }
        }

        if (touchedEnemyOnce) {
            health -= 0.5;
            touchedEnemyOnce = false;
            if (health <= 0) {
                health = 0;
                screen = 2;
            }
        }

        if (keyIsDown(LEFT_ARROW)) {
            myXPos -= 3;
        }

        if (keyIsDown(RIGHT_ARROW)) {
            myXPos += 3;
        }

        if (keyIsDown(UP_ARROW)) {
            myYPos -= 3;
        }

        if (keyIsDown(DOWN_ARROW)) {
            myYPos += 3;
        }
    } else if (screen == 2) {
        background(0);
        textSize(20);
        fill(0, 255, 0);
        text("You lost, Play again", 290, 290);
    }
}