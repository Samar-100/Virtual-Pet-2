var dog, happyDog, database, foodStock, foodS, feedDog, addFood, dogImg;
var fedTime, lastFed;
//Create variables here

function preload() {
  dogimg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  //load images here
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();

  foodobject = new Food();
  dog = createSprite(800, 250, 10, 10);
  dog.addImage(dogimg);
  dog.scale = 0.2;

  foodStock = database.ref("Food");
  foodStock.on("value", readFood);

  fedTime = database.ref("FeedTime");
  fedTime.on("value", (data) => {
    lastFed = data.val();
  });
}

function draw() {
  background("green");
  drawSprites();

  foodobject.display();
  feedDog = createButton("FEED DOG");
  feedDog.position(500, 100);
  feedDog.mousePressed(FeedDog);
  addFood = createButton("ADD FOOD");
  addFood.position(400, 100);
  addFood.mousePressed(AddFood);

  fill(255, 255, 254);
  textSize(15);
  if (lastFed >= 12) {
    text("Last Fed : " + (lastFed % 12) + "PM", 350, 30);
  } else if (lastFed === 0) {
    text("Last Fed : " + (lastFed % 12) + "PM", 350, 30);
  } else {
    text("Last Fed : " + (lastFed % 12) + " AM", 350, 30);
  }
}

function readFood(data) {
  foodS = data.val();
  foodobject.updateFoodStock(foodS);
}

function AddFood() {
  foodS++;
  database.ref("/").update({
    Food: foodS,
  });
}

function FeedDog() {
  dog.addImage(happyDog);
  foodobject.updateFoodStock(foodobject.getFoodStock() - 1);
  database.ref("/").update({
    Food: foodobject.getFoodStock(),
    FeedTime: hour(),
  });
}
