var particles = [];

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(230);
  //frameRate(120);
  //generate 1000 particles
  AddParticles();
}

function draw(){

//comment this out to toggle trails
background(230);
for(var i = 0; i<particles.length; i++){
  //update (accelerate in direction of mouse)
  var CurrentParticle = particles[i];
  //update velocities
  CurrentParticle.Xspeed += (mouseX - CurrentParticle.x)/(500*CurrentParticle.mass);
  CurrentParticle.Yspeed += (mouseY - CurrentParticle.y)/(500*CurrentParticle.mass);

 //accelerate each particle towards each other at an amount proportional to their seperation

 for(var j =0;j <particles.length; j++){

   var neighbourParticle = particles[j];

   //add consideration for mass of a particle, merging partices?? could potentially be done
   //i.e. instead of calculating an rf for m1 + m2 against 3rd particle m3, combine masses
   //and treat as a single particle

     CurrentParticle.Xspeed += (neighbourParticle.mass/CurrentParticle.mass)*(neighbourParticle.x - CurrentParticle.x)/70000;
     CurrentParticle.Yspeed += (neighbourParticle.mass/CurrentParticle.mass)*(neighbourParticle.y - CurrentParticle.y)/70000;
     CurrentParticle.Xspeed - 2;
     CurrentParticle.Yspeed - 2;
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


     ellipse(CurrentParticle.x,CurrentParticle.y,7.5,
       7.5)

}

}

function AddParticles(){
for(var i = 0; i <10; i++){
  particles.push(new Particle());
}
}

function Particle() {
   this.x = 0+ random(-.02,.02);
   this.y = 0+ random(-.02,.02);
   this.Xspeed = 0;
   this.Yspeed = 0;
   this.mass = random(1,5);
}

function SetParticle(Mass){
  var mParticle = new Particle();
  mParticle.mass = Mass;
  mParticle.x = mouseX;
  mParticle.y = mouseY;
  return mParticle;
}

function mouseClicked(){
  particles.push(new SetParticle(10));
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  background(230);
}
