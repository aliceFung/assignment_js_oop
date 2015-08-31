model = {



  Asteroid: function(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.xSpeed = 2;
    this.ySpeed = 2;
    console.log("this is: " + this);

  }

};


model.Asteroid.prototype.tic = function(){
        console.log("this is: " + this);
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        console.log("tic fn: " +this.x +", " + this.y);
    };




view = {

  context: $("#board")[0].getContext("2d"),

  // drawRect: function(){
  //   view.context.fillStyle = "#ABCDEF"
  //   view.context.fillRect(5,5, 90, 90)
  //   console.log("drew rect")
  // },

  drawCircle: function(x,y,radius){
    var path = new Path2D();
    path.arc(x,y,radius,0,Math.PI*2,false);
    view.context.stroke(path);
  },

  //~ animation, draw one, clear, draw
  fillCanvas: function(){
    view.context.fillStyle = '#ffffff';
    view.context.fillRect(0,0, 1200, 800); //overwriting canvas
  }

};



view.drawCircle(600,400, 50);
view.fillCanvas()
view.drawCircle(601, 401, 50);

