model = {

  asteroids: [],

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

  checkCollision: function(ast1, ast2){
    // use pythagorean theorem to check for collisions
    if (Math.pow((ast1.radius + ast2.radius),2) > Math.pow((ast1.x - ast2.x),2) +
      Math.pow((ast1.y - ast2.y),2)){
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
      radius = Math.floor(Math.random()*100 + 30);
      if ((x < 0 || x > 1200) || (y < 0 || y > 800)){
        model.asteroids.push( new model.Asteroid (x,y, radius));
        asteroidCount++;

      }
    } while (asteroidCount < num);
  }

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

  // init: funtions(){

  // },

  drawRect: function(){
    view.context.fillStyle = "#ABCDEF"
    view.context.fillRect(5,5, 90, 90)
    console.log("drew rect")
  },

  drawCircle: function(x,y,radius){
    var path = new Path2D();
    path.arc(x,y,radius,0,Math.PI*2,false);
    view.context.stroke(path);
  },

  //~ animation, draw one, clear, draw
  fillCanvas: function(){
    view.context.fillStyle = '#ffffff';
    view.context.fillRect(0,0, 1200, 800); //overwriting canvas
  },

  drawAsteroids: function(asteroids){
    for(var i = 0; i < asteroids.length; i++){
      asteroid = asteroids[i];
      view.drawCircle(asteroid.x, asteroid.y, asteroid.radius);
    }
  }


};


controller ={
  init: function(){
    var count = 0;
    model.createAsteroids(1000);
    setInterval(this.gameLoop, 60);
  },

  moveAsteroids: function(){
    view.fillCanvas();
    view.drawAsteroids(model.asteroids);
    // console.log("tic");
    for (j = 0; j < model.asteroids.length; j++) {
      model.asteroids[j].tic();
    }
  },


  gameLoop: function(){
    controller.moveAsteroids()
    do {
      model.createAsteroids(1)
    } while (model.asteroids.length <= 10)
  }
//   loop {
//   fillCanvas() ; //start with a blank canvas
//   drawAsteroids() // draw
//   tic() // move all asteroids
// // loop will then clear canvas and draw asteroids in their new positions


};

controller.init();