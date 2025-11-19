const gameArea = document.getElementById("snake_game_area");
const fruit = document.createElement("div");

let isFruitPlaced;

function initGame() {
    isFruitPlaced = false;
    fruit.id = "fruit";

    spawnFruit(gameArea);
}

/**
 * Creates a new fruit in a specified or random location.
 * Coordinates start top left (0,0) to bottom right (100,100).
 * Coordinate is % of game area element size.
 * @param area the DOM element to add the fruit to.
 * @param x position, leave blank for random.
 * @param y position, leave blank for random.
 * @returns The newly created/moved fruit.
 */
function spawnFruit(area, x = -1, y = -1) {
    let placedFruit;

    if (x <= 0 && y <= 0) {
        x = Math.floor(Math.random() * 100);
        y = Math.floor(Math.random() * 100);
    }
    console.log("Spawn Fruit a@ " + x.toString() + ", " + y.toString());
    x = Math.floor((x / 100) * area.offsetWidth);
    y = Math.floor((y / 100) * area.offsetHeight);

    if (isFruitPlaced) {
        placedFruit = document.getElementById("fruit");
    } else {
        area.append(fruit);
        placedFruit = document.getElementById("fruit");
    }

    placedFruit.style.position = "sticky";
    placedFruit.style.left = x.toString() + "px";
    placedFruit.style.top = y.toString() + "px";

    return placedFruit;
}

initGame();
setInterval(function() { spawnFruit(gameArea); }, 500);