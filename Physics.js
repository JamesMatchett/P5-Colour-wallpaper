var particles = [];
var ShowLines = true;
var trails = false;

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(230);
  //frameRate(120);
  //generate 1000 particles
  AddParticles();
}

function draw(){

//comment this out to toggle trails
if(!trails){
background(230);
}
for(var i = 0; i<particles.length; i++){
  //update (accelerate in direction of mouse)
  var CurrentParticle = particles[i];
  //update velocities
//  CurrentParticle.Xspeed += (mouseX - CurrentParticle.x)/(500*CurrentParticle.mass);
//  CurrentParticle.Yspeed += (mouseY - CurrentParticle.y)/(500*CurrentParticle.mass);

 //accelerate each particle towards each other at an amount proportional to their seperation

 for(var j =0;j<particles.length; j++){
   var neighbourParticle = particles[j];
   //add consideration for mass of a particle, merging partices?? could potentially be done
   //i.e. instead of calculating an rf for m1 + m2 against 3rd particle m3, combine masses
   //and treat as a single particle
   if(CurrentParticle.x - neighbourParticle.x != 0){
     CurrentParticle.Xspeed += (neighbourParticle.mass/CurrentParticle.mass)*(1/(neighbourParticle.x - CurrentParticle.x)
   *Math.abs(neighbourParticle.x - CurrentParticle.x))/6700;
     CurrentParticle.Yspeed += (neighbourParticle.mass/CurrentParticle.mass)*(1/(neighbourParticle.y - CurrentParticle.y)
   *Math.abs(neighbourParticle.y - CurrentParticle.y))/6700;

if(ShowLines){

   line(CurrentParticle.x,CurrentParticle.y,neighbourParticle.x,neighbourParticle.y);
}
     CurrentParticle.Xspeed - 1;
     CurrentParticle.Yspeed - 1;
   }
 }
  //if particle is off the screen, half the velocity
  if(CurrentParticle.x > width || CurrentParticle.X < 0){
    CurrentParticle.Xspeed = CurrentParticle.Xspeed /2;
  }

  if(CurrentParticle.y > height || CurrentParticle.y < 0){
    CurrentParticle.Yspeed = CurrentParticle.Yspeed /2;
  }


  //update position by velocity
  CurrentParticle.x += CurrentParticle.Xspeed;
  CurrentParticle.y += CurrentParticle.Yspeed;



   //red-ness is based on x velocity, green on y
   fill(color(CurrentParticle.Xspeed * 100,CurrentParticle.Yspeed * 100,
     (-CurrentParticle.Xspeed * 60) + (-CurrentParticle.Yspeed*60)));

//    stroke(color(CurrentParticle.Xspeed * 100,CurrentParticle.Yspeed * 100,
      //(-CurrentParticle.Xspeed * 60)+ (-CurrentParticle.Yspeed*60)));
     ellipse(CurrentParticle.x,CurrentParticle.y,CurrentParticle.mass,
       CurrentParticle.mass)
  }
}



function Particle() {
   this.x = 0+ random(-.5,.5);
   this.y = 0+ random(-.5,.5);
   this.Xspeed = 0;
   this.Yspeed = 0;
   this.mass = random(1,10);
}

function SetParticle(Mass){
  var mParticle = new Particle();
  mParticle.mass = Mass;
  mParticle.x = mouseX;
  mParticle.y = mouseY;
  return mParticle;
}



function mouseClicked(){
  particles.push(new SetParticle(random(10,100)));
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  background(230);
}
function keyPressed(){
  console.log(keyCode);
  if(keyCode == 76){
  ShowLines = !ShowLines;
  }
  if(keyCode == 84){
    trails = !trails;
  }
  if(keyCode >=48 && keyCode <= 57){
      particles.push(new SetParticle((keyCode-47) * 5));
      console.log((""));
  }
}
