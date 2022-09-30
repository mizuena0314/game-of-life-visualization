var w = window.innerWidth;
var h = window.innerHeight;

let grid = [];
let old = [];

let fontRegular;
function preload(){
  fontRegular = 'Georgia';
}

function findGridspace(){
  let curW = 10;
  let curH = 10;
  for(let mul=1; mul<w/10; mul+=1){
    if(mul*10<w) curW = mul*10;
  }
  for(let mul=1; mul<h/10; mul+=1){
    if(mul*10<w) curH = mul*10;
  }

  w = curW;
  h = curH;
}
findGridspace();

function randomInts(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// credits to Francisc and danday74 on stackoverflow

function drawBorder(){
  let x = (window.innerWidth - w)/2;
  let y = (window.innerHeight - h)/2;
  rect(x,y,w,h);
}

function randomInit(){
  let count = 0;
  for(let i=0; i<h/5; i+=1){
    grid.push([]);
    old.push([]);
    for(let j=0; j<w/5; j+=1){
      grid[i].push(0);
      old[i].push(0);
    }
  }

  let maxInit = (w*h/100);
  while(count < maxInit){
    let i = randomInts(0,h/5-1);
    let j = randomInts(0,w/5-1);
    if(old[i][j]==0){
      count++;
      old[i][j]=1;
    }
  }
}
randomInit();

function update(){
  for(let i=0; i<h/5; i+=1){
    for(let j=0; j<w/5; j+=1){
      let count = 0;

      for(let ii=i-1; ii<=i+1; ii+=1){
        for(let jj=j-1; jj<=j+1; jj+=1){
          if(ii!=i || jj!=j){
            count += old[(h/5+ii)%(h/5)][(w/5+jj)%(w/5)];
          }
        }
      }
      //
      //console.log(count);
      //
      if(count<2 || count >=4){
        grid[i][j]=0;
      }
      else if(count==2){
        grid[i][j]=old[i][j];
      }
      else if(count==3){
        grid[i][j]=1;
      }
    }
  }
  
  for(let i=0; i<h/5; i+=1){
    for(let j=0; j<w/5; j+=1){
      old[i][j] = grid[i][j];
    }
  }
}

function sketchGrid(){
  for(let i=0; i<h/5; i+=1){
    for(let j=0; j<w/5; j+=1){
      if(old[i][j]){
        fill('#FDEE48');
        rect((window.innerWidth - w)/2+j*5,(window.innerHeight - h)/2+i*5,5,5);
        noFill();
      }
      else{
        fill(0);
        rect((window.innerWidth - w)/2+j*5,(window.innerHeight - h)/2+i*5,5,5);
        noFill();
      }
    }
  }
}

function setup() {
  createCanvas(w,h);
  findGridspace();
  textFont(fontRegular);
  textSize(30);
  frameRate(20);
}

function draw() {
  background(0);
  stroke('#FDEE48');
  noFill();
  drawBorder();
  sketchGrid();
  noStroke();
  update();
  //

  //
}