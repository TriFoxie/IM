const gameArea = document.getElementById("snake_area");
const snakeHead = document.getElementById("snake_head");
const fruit = document.createElement("div");

let isFruitPlaced, snake, movement, currentFruitPosition, gridSize, gameOver, score;

function initGame() {
    isFruitPlaced = false;
    gameOver = false;
    snake = [
        [3,0],
        [2,0],
        [1,0]
    ];
    movement = [0,1];
    gridSize = 20;
    score = 0;

    fruit.id = "fruit";

    currentFruitPosition = spawnFruit(fruit, gameArea, isFruitPlaced);

    document.addEventListener("keydown", keypress);
}

/**
 * Creates a new fruit in a specified or random location.
 * Coordinates start top left (0,0) to bottom right (25,25).
 * Coordinate is % of game area element size.
 * @param sprite the 'sprite' DOM element for the fruit.
 * @param area the DOM element to add the fruit to.
 * @param isPlaced if a fruit sprite exists already.
 * @param x position, leave blank for random.
 * @param y position, leave blank for random.
 * @returns The fruit position as a 2-element array.
 */
function spawnFruit(sprite, area, isPlaced, x = -1, y = -1) {
    if (x <= 0 && y <= 0) {
        x = Math.floor(Math.random() * gridSize);
        y = Math.floor(Math.random() * gridSize);
    }
    console.log("[" + x.toString() + ", " + y.toString() + "] Spawn Fruit");

    draw(fruit, [x, y], gameArea, gridSize);
    drawSnake(snake, gameArea);

    return [x,y];
}

function eatFruit(sprite, area, isPlaced) {
    currentFruitPosition = spawnFruit(sprite, area, isPlaced);
    addSnakePart();
    score += 1;
}

function moveSnake(movement) {
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i][0] = snake[i - 1][0];
        snake[i][1] = snake[i - 1][1];
    }
    snake[0][0] += movement[0];
    snake[0][1] += movement[1];
}

function addSnakePart() {
    snake.push([0,0]);
}

function drawSnake(snake, area) {
    const oldParts = document.getElementsByClassName("snake_body");
    for (let i = 0; i < oldParts.length; i++) {
        oldParts[i].remove();
    }

    draw(snakeHead, [snake[0][0], snake[0][1]], gameArea, gridSize);
    for (let i = 1; i < snake.length; i++) {
        const snakePart = document.createElement("div");
        snakePart.classList.add("snake_body");
        draw(snakePart, [snake[i][0], snake[i][1]], gameArea, gridSize);
    }
}

function draw(sprite, gridPosition, canvas, gridSize) {
    sprite.style.width = ((1 / gridSize)*100).toString() + "%";
    sprite.style.height = ((1 / gridSize)*100).toString() + "%";

    sprite.style.left = ((gridPosition[0] / gridSize) * 100).toString() + "%";
    sprite.style.top = ((gridPosition[1] / gridSize) * 100).toString() + "%";

    canvas.append(sprite);
}

function controls(control) {
    switch (control) {
        case "up": movement = (movement[1] !== 1) ? [0,-1] : movement; break;
        case "down": movement = (movement[1] !== -1) ? [0,1] : movement; break;
        case "left": movement = (movement[0] !== 1) ? [-1,0] : movement; break;
        case "right": movement = (movement[0] !== -1) ? [1,0] : movement; break;
    }
}

function gameChecks() {
    // Snake outside area?
    console.debug("Fruit: " + currentFruitPosition.toString() + "\nSnake: " + snake[0].toString());
    if (
        !(0 <= snake[0][0] && snake[0][0] < gridSize) ||
        !(0 <= snake[0][1] && snake[0][1] < gridSize)
    ) {
        gameOver = true;
        console.log("Game Over: Snake left the game.")
    }

    // In self?
    for (let i = 1; i < snake.length; i++) {
        if (snake[0][0] === snake[i][0] && snake[0][1] === snake[i][1]) {
            gameOver = true;
            console.log("Game Over: The snake consumed itself.")
        }
    }

    // Eat fruit?
    if (snake[0][0] === currentFruitPosition[0] && snake[0][1] === currentFruitPosition[1]) {
        console.log("OooOoOoOO a yummy fruit.");
        eatFruit(snake, gameArea, isFruitPlaced);
    }
}

function keypress(e) {
    switch (e.key) {
        case "ArrowLeft": controls("left"); break;
        case "ArrowRight": controls("right"); break;
        case "ArrowUp": controls("up"); break;
        case "ArrowDown": controls("down"); break;
    }
}

initGame();
setInterval(function() {
    if (!gameOver) {
        moveSnake(movement);
        drawSnake(snake, gameArea);
        gameChecks();
    } else {
        gameArea.style.background = "red";
    }
    }, 250);