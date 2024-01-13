const fl = document.getElementById('fl');
const dark = document.getElementById('dark');

function test() {
    console.log('test');
    dark.style.opacity = 1;
    setTimeout(() => {
        fl.style.display = "flex";
        dark.style.display = "none";
        fl.style.backgroundColor = "transparent";
        fl.classList.add('tee');
        setTimeout(() => {
            conf1();
            
            fl.classList.remove('tee');
            fl.classList.add('tee2');
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
  
  const interval = setInterval(function() {
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
        colors: ['#ef8d0a', '#56a51a', '#0955a4'],
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ef8d0a', '#56a51a', '#0955a4'],
      })
    );
  }, 250);
}