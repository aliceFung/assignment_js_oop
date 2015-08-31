model = {



  Asteroid: function(x, y, radius){
    this.x = Math.floor(Math.random() * 1200);
    this.y = Math.floor(Math.random() * 800);
    this.radius = radius;
    this.xSpeed = Math.floor(Math.random() * 5);
    this.ySpeed = Math.floor(Math.random() * 5);
    // this.tic = function(){
    //   this.x += this.xSpeed;
    //   this.y += this.ySpeed;
    // }

  }

};


model.Asteroid.prototype.tic = function(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    };




view = {

  context: $("#board")[0].getContext("2d"),

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
  }

};


var ast_array = [];

for (var i = 0; i < 1000; i++){
  asteroid = new model.Asteroid;
  ast_array.push(asteroid)
}

var s_time = Date.now();
for (i = 0; i < 100000; i++) {
  for (j = 0; j < ast_array.length; j++) {
    ast_array[j].tic();
  }
}




console.log(Date.now() - s_time)



// view.drawCircle(600,400, 50);
// view.fillCanvas()
// view.drawCircle(601, 401, 50);

