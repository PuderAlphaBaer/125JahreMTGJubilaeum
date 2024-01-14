const fl = document.getElementById('fl');
const dark = document.getElementById('dark');
const name1 = document.getElementById('name1');
const name2 = document.getElementById('name2');


function podwin() {
    dark.style.opacity = 1;
    setTimeout(() => {
        fl.style.display = "flex";
        dark.style.display = "none";
        fl.style.backgroundColor = "transparent";
        fl.classList.add('flin');
        setTimeout(() => {
            conf1();
            name1.innerHTML = "Tilman";
            fl.classList.remove('flin');
            fl.classList.add('flout');
            setTimeout(() => {
                fl.style.display = "none";
            }, 1000);
        }, 3000);
    }, 2000);
    
    // schön async machen und dann nach scheinwerfer namen einfügen und dann fett konfetti
    // https://confetti.js.org/more.html
}











































function conf1() {
  const duration = 15 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ef8d0a', '#56a51a', '#0955a4']
    })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ef8d0a', '#56a51a', '#0955a4']
      })
    );
  }, 250);
}









function rank1(){
  var theLetters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZÖÄÜ1234567890"; //You can customize what letters it will cycle through
  var ctnt = "Tilmanofatz"; // Your text goes here
  var speed = 50; // ms per frame
  var increment = 8; // frames per step. Must be >2
  
      
  var clen = ctnt.length;       
  var si = 0;
  var stri = 0;
  var block = "";
  var fixed = "";
  //Call self x times, whole function wrapped in setTimeout
  
  (function rustle (i) {          
  setTimeout(function () {
    if (--i){rustle(i);}
    nextFrame(i);
    si = si + 1;        
  }, speed);
  })(clen*increment+1); 
  function nextFrame(pos){
    for (var i=0; i<clen-stri; i++) {
      //Random number
      var num = Math.floor(theLetters.length * Math.random());
      //Get random letter
      var letter = theLetters.charAt(num);
      block = block + letter;
    }
    if (si == (increment-1)){
      stri++;
    }
    if (si == increment){
    // Add a letter; 
    // every speed*10 ms
    fixed = fixed +  ctnt.charAt(stri - 1);
    si = 0;
    }
    name2.innerHTML = (fixed + block);
    block = "";
  }
  };


  console.log("funktionen rank1() und podwin() aufrufen")