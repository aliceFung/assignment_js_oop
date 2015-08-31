model = {

  asteroids: [],

  Asteroid: function(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.xSpeed = model.setSpeed(x);
    this.ySpeed = model.setSpeed(y);
    this.tic = function(){
      this.x += this.xSpeed;
      this.y += this.ySpeed;
      // check this asteroid vs all asteroids
      for(i = 0; i  < model.asteroids.length; i++){
        if(this != model.asteroids[i]){
          model.checkCollision(this, model.asteroids[i])
        }
      }
    };

  },

  checkCollision: function(ast1, ast2){
    // use pythagorean theorem to check for collisions
    if (Math.pow((ast1.radius + ast2.radius),2) > Math.pow((ast1.x - ast2.x),2) +
                                    Math.pow((ast1.y - ast2.y),2)){
      console.log("collisions")
      return true
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



  createAsteroids: function(num){
    var asteroidCount = 0;
    do{
      x = Math.floor(Math.random() * 1400 - 100); // outside canvas
      y = Math.floor(Math.random() * 1000 - 100);
      radius = Math.floor(Math.random()*50 + 20);
      if ((x < 0 || x > 1200) || (y < 0 || y > 800)){
        model.asteroids.push( new model.Asteroid (x,y, radius));
        asteroidCount++;

      }
    } while (asteroidCount < num);
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
    var count = 0
    model.createAsteroids(10);
    setInterval(this.moveAsteroids, 30)
  },

  moveAsteroids: function(){
    view.fillCanvas();
    view.drawAsteroids(model.asteroids);
    console.log("tic")
    for (j = 0; j < model.asteroids.length; j++) {
      model.asteroids[j].tic();
    }

  }
//   loop {
//   fillCanvas() ; //start with a blank canvas
//   drawAsteroids() // draw
//   tic() // move all asteriods
// // loop will then clear canvase and draw asteroids in their new positions


};

controller.init();