view = {

  context: $("#board")[0].getContext("2d"),

  drawRect: function(){
    view.context.fillStyle = "#ABCDEF"
    view.context.fillRect(5,5, 90, 90)
    console.log("drew rect")
  },

  drawCircle: function(){
    var path = new Path2D();
    path.arc(600,400,50,0,Math.PI,false);
    view.context.stroke(path);
  }

}



view.drawCircle()
