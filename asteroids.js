model = {

  asteroids: [],

  init: function(){
    this.createSpaceship();
  },

  createSpaceship: function(){
    model.ship = {x: 600,
                  y: 400,
                  direction: 0,
                  xSpeed: 0,
                  ySpeed: 0};
  },

  Asteroid: function(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.xSpeed = model.setSpeed(x);
    this.ySpeed = model.setSpeed(y);
    // this.tic = function(){
    //   this.x += this.xSpeed;
    //   this.y += this.ySpeed;
    //   // check this asteroid vs all asteroids
    //   for(i = 0; i  < model.asteroids.length; i++){
    //     if(this != model.asteroids[i]){
    //       model.checkCollision(this, model.asteroids[i]);
    //     }
    //   }
    // };

  },

  checkCollision: function(obj1, obj2){
    // use pythagorean theorem to check for collisions
    if (Math.pow((obj1.radius + obj2.radius),2) > Math.pow((obj1.x - obj2.x),2) +
      Math.pow((obj1.y - obj2.y),2)){
      console.log("collisions");
    return true;
    } else {
    return false;
    }

  },

  spawnAsteroids: function(asteroid){
    //make mini asteroids
      var mini1 = new model.Asteroid (asteroid.x - asteroid.radius, asteroid.y - asteroid.radius, asteroid.radius/2);
      var mini2 = new model.Asteroid (asteroid.x + asteroid.radius, asteroid.y + asteroid.radius, asteroid.radius/2);
      model.asteroids.push(mini1, mini2);

  },

  destroyAsteroids: function(arr){
      if (arr[0].radius > arr[1].radius && arr[0].radius > 40){
      //delete asteroid from array
       model.spawnAsteroids(arr[0])
      }
      else if (arr[0].radius < arr[1].radius && arr[1].radius > 40){
        model.spawnAsteroids(arr[1])
      }
    for (var i = 0; i < 2; i++){
      model.asteroids.splice(model.asteroids.indexOf(arr[i]), 1);
    }
  },

// use Math.PI*2 to set random direction? use basic trig

  setSpeed: function(num){
    if (num < 0){
      return Math.floor(Math.random() * 10);
    } else {
      return Math.floor(Math.random() * -10);
    }
  },



  checkLeave: function(asteroid){
    if ((asteroid.x < -100 || asteroid.x > 1300) ||
        (asteroid.y < -100 || asteroid.y > 900)) {
       model.asteroids.splice(model.asteroids.indexOf(asteroid), 1)
    }
  },



  createAsteroids: function(num){
    var asteroidCount = 0;
    do{
      x = Math.floor(Math.random() * 1400 - 100); // outside canvas
      y = Math.floor(Math.random() * 1000 - 100);
      radius = Math.floor(Math.random()*50 + 30);
      if ((x < 0 || x > 1200) || (y < 0 || y > 800)){
        model.asteroids.push( new model.Asteroid (x,y, radius));
        asteroidCount++;

      }
    } while (asteroidCount < num);
  },



};

model.Asteroid.prototype.tic = function(){
  this.x += this.xSpeed;
  this.y += this.ySpeed;
  model.checkLeave(this);
    // check this asteroid vs all asteroids
  for(i = 0; i  < model.asteroids.length; i++){
    asteroid = model.asteroids[i];
    if(this != asteroid && model.checkCollision(this, asteroid)){
      model.destroyAsteroids([this, asteroid])
    }
  }
};

view = {

  context: $("#board")[0].getContext("2d"),

  //add listeners
  init: function(){
    $(document).keydown(function(event){
      view.changeShipDirection(event);
    });
  },

  changeShipDirection: function(event){

    view.context.save();
    view.context.rotate(model.ship.direction);

    view.context.restore();
    // this.currentDirection = this.userMove[event.which];
  },

  drawShip: function(x,y){
    var path=new Path2D();
    console.log(path);
    path.moveTo(x,y);
    path.lineTo(x+15, y+40);
    path.lineTo(x-15, y+40);
    view.context.fill(path);
  },

  drawCircle: function(x,y,radius){
    var path = new Path2D();
    path.arc(x,y,radius,0,Math.PI*2,false);
    view.context.stroke(path);
  },

  //~ animation, draw one, clear, draw
  fillCanvas: function(){
    // view.context.fillStyle = '#ffffff';
    view.context.clearRect(0,0, 1200, 800); //overwriting canvas
  },

  drawAsteroids: function(asteroids){
    for(var i = 0; i < asteroids.length; i++){
      asteroid = asteroids[i];
      view.drawCircle(asteroid.x, asteroid.y, asteroid.radius);
    }
  },

  userMove: {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'//,

  }




};


controller ={
  init: function(){
    var count = 0;
    view.init();
    model.createAsteroids(10);
    setInterval(this.gameLoop, 50);
    model.createSpaceship();
  },

  moveAsteroids: function(){
    view.drawAsteroids(model.asteroids);
    // console.log("tic");
    for (j = 0; j < model.asteroids.length; j++) {
      model.asteroids[j].tic();
    }
  },

  moveShip: function(){
    view.drawShip(model.ship.x, model.ship.y);
  },

  gameLoop: function(){
    view.fillCanvas();
    controller.moveShip();
    controller.moveAsteroids();
    do {
      model.createAsteroids(1);
    } while (model.asteroids.length <= 10);
  }


//   loop {
//   fillCanvas() ; //start with a blank canvas
//   drawAsteroids() // draw
//   tic() // move all asteroids
// // loop will then clear canvas and draw asteroids in their new positions


};

controller.init();