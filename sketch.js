var cols, rows;
var w =2.5;
var cells = [];
var currentCell;
var doneCels = []

function setup() {
  
  createCanvas(1000, 1000);
  cols = floor(width/w)
  rows = floor(height/w)
  
  for(var y = 0; y < rows ; y++){
    for(var x = 0; x < cols ; x++){
      var cell = new Cell(x, y);
      cells.push(cell)
    }
  }
  fill(255, 0 , 255, 40)
  
  currentCell = cells[0];
  
        background(55);
  for(var i = 0; i < cells.length; i++){
      cells[i].show();
  }
}


function draw() {
//      background(55);
//  for(var i = 0; i < cells.length; i++){
//      cells[i].show();
//  }

  var prozent = ((doneCels.length / (rows * cols)) * 100)
  if(prozent % 1 == 0)
    {
      console.log(prozent + "/100% abgeschlossen");
    }
  
  currentCell.visited = true;
  var next = currentCell.checkNeighbors();
  if(next){
    currentCell.UpdateWalls(next)
    next.visited = true;
    next.last = currentCell;
    currentCell = next;
    doneCels.push(currentCell)
  }
  else {
    if(currentCell.last){
      currentCell = currentCell.last
    }
    else{
        background(55);
        for(var i = 0; i < cells.length; i++){
        cells[i].show();
      }
    }
  }
}

function Index(x, y){
  if(x < 0 || y < 0 || x > cols - 1 || y > rows - 1){
    return undefined;
  }
  return x + y * cols;
}

function Cell(x, y){
  
  this.x = x
  this.y = y
  this.walls = [true, true, true, true]//Top,Bottom,Right,Left
  this.visited = false;
  this.last = undefined
  
  
  this.checkNeighbors = function(){
    var neighbors =  []
    
    var top = cells[Index(x, y - 1)]
    
    var left = cells[Index(x - 1, y)]
    
    var right = cells[Index(x + 1, y)]
    
    var bottom = cells[Index(x, y + 1)]
    
    if(top && !top.visited){
      neighbors.push(top)
    }
    if(left && !left.visited){
      neighbors.push(left)
    }
    if(right && !right.visited){
      neighbors.push(right)
    }
    if(bottom && !bottom.visited){
      neighbors.push(bottom)
    }
    
    if(neighbors.length > 0){
      var r = floor(random(0, neighbors.length)); 
      return neighbors[r];
    }
    else{
      return undefined;
    }
    
  }
  
  
  this.show = function() {
    var i = x * w;
    var j = y * w;
    
    stroke(255);
    
    if(this.walls[0] === true) {
        line(i, j, i + w, j);
      }
    if(this.walls[3] === true){
      line(i, j, i, j + w)
    }
    if(this.walls[2] === true){
         line(i + w, j, i + w, j + w)
      }
    if(this.walls[1] === true)
      {
        line(i, j + w, i + w, j + w)
      }
  //  if(this.visited === true)
  //    {
  //      noStroke()
  //      fill(255, 0, 255, 100)
  //      rect(i, j, w, w)
  //    }
    if(this == currentCell)
      {
        fill(255, 100, 255, 100)
        rect(i, j, w, w)
      }
    }
    
    
  this.UpdateWalls = function(next)
    {
      var xdif = next.x - this.x
      var ydif = next.y - this.y
      
      if(xdif == -1 && ydif == 0)
        {
          this.walls[3] = false;
          next.walls[2] = false;
        }
      if(xdif == 1 && ydif == 0)
        {
          this.walls[2] = false;
          next.walls[3] = false;
        }
      if(xdif == 0 && ydif == -1)
        {
          this.walls[0] = false;
          next.walls[1] = false;
        }
      if(xdif == 0 && ydif == 1)
        {
          this.walls[1] = false;
          next.walls[0] = false;
        }
    }
  
}


