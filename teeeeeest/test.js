const fl = document.getElementById('fl');
const dark = document.getElementById('dark');
const name1 = document.getElementById('name1');



function rank1() {
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
    })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
}






// import { tsParticles } from "https://cdn.jsdelivr.net/npm/@tsparticles/engine@3.0.3/+esm";
// import { loadAll } from "https://cdn.jsdelivr.net/npm/@tsparticles/all@3.0.3/+esm";

// async function loadParticles(options) {
//   await loadAll(tsParticles);

//   await tsParticles.load({
//           id: "tsparticles",
//           options: {
//   "fullScreen": {
//     "zIndex": 1
//   },
//   "emitters": {
//     "position": {
//       "x": 50,
//       "y": 100
//     },
//     "rate": {
//       "quantity": 5,
//       "delay": 0.15
//     }
//   },
//   "particles": {
//     "color": {
//       "value": [
//         "#1E00FF",
//         "#FF0061",
//         "#E1FF00",
//         "#00FF9E"
//       ]
//     },
//     "move": {
//       "decay": 0.05,
//       "direction": "top",
//       "enable": true,
//       "gravity": {
//         "enable": true
//       },
//       "outModes": {
//         "top": "none",
//         "default": "destroy"
//       },
//       "speed": {
//         "min": 50,
//         "max": 100
//       }
//     },
//     "number": {
//       "value": 1500
//     },
//     "opacity": {
//       "value": 1
//     },
//     "rotate": {
//       "value": {
//         "min": 0,
//         "max": 360
//       },
//       "direction": "random",
//       "animation": {
//         "enable": true,
//         "speed": 30
//       }
//     },
//     "tilt": {
//       "direction": "random",
//       "enable": true,
//       "value": {
//         "min": 0,
//         "max": 360
//       },
//       "animation": {
//         "enable": true,
//         "speed": 30
//       }
//     },
//     "size": {
//       "value": 3,
//       "animation": {
//         "enable": true,
//         "startValue": "min",
//         "count": 1,
//         "speed": 16,
//         "sync": true
//       }
//     },
//     "roll": {
//       "darken": {
//         "enable": false,
//         "value": 25
//       },
//       "enlighten": {
//         "enable": false,
//         "value": 25
//       },
//       "enable": true,
//       "speed": {
//         "min": 5,
//         "max": 15
//       }
//     },
//     "wobble": {
//       "distance": 30,
//       "enable": true,
//       "speed": {
//         "min": -7,
//         "max": 7
//       }
//     },
//     "shape": {
//       "type": [
//         "circle",
//         "square"
//       ],
//       "options": {}
//     }
//   },
//   "responsive": [
//     {
//       "maxWidth": 1024,
//       "options": {
//         "particles": {
//           "move": {
//             "speed": {
//               "min": 33,
//               "max": 66
//             }
//           }
//         }
//       }
//     }
//   ]
// }
//       });
// }

// const emitterRate = {
//     delay: 0.1,
//     quantity: 200
//   },
//   options = {
//     particles: {
//       opacity: {
//         value: 1
//       },
//       size: {
//         value: {
//           min: 16,
//           max: 32
//         }
//       },
//       move: {
//         enable: true,
//         gravity: {
//           enable: true
//         },
//         speed: 15,
//         outModes: {
//           default: "destroy",
//           top: "none"
//         }
//       },
//       number: {
//         value: 500
//       },
//       rotate: {
//         value: {
//           min: 0,
//           max: 360
//         },
//         direction: "random",
//         move: true,
//         animation: {
//           enable: true,
//           speed: 60
//         }
//       },
//       tilt: {
//         direction: "random",
//         enable: true,
//         move: true,
//         value: {
//           min: 0,
//           max: 360
//         },
//         animation: {
//           enable: true,
//           speed: 60
//         }
//       },
//       roll: {
//         darken: {
//           enable: true,
//           value: 30
//         },
//         enlighten: {
//           enable: true,
//           value: 30
//         },
//         enable: true,
//         mode: "both",
//         speed: {
//           min: 15,
//           max: 25
//         }
//       },
//       wobble: {
//         distance: 30,
//         enable: true,
//         move: true,
//         speed: {
//           min: -15,
//           max: 15
//         }
//       }
//     },
//     background: {
//       color: "#000000"
//     },
//     emitters: [
//       {
//         position: {
//           x: 0,
//           y: 33
//         },
//         rate: emitterRate,
//         particles: {
//           move: {
//             direction: "top-right"
//           },
//           shape: {
//             type: "emoji",
//             options: {
//               emoji: {
//                 value: "🦄"
//               }
//             }
//           }
//         }
//       },
//       {
//         position: {
//           x: 0,
//           y: 66
//         },
//         rate: emitterRate,
//         particles: {
//           move: {
//             direction: "top-right"
//           },
//           shape: {
//             type: "emoji",
//             options: {
//               emoji: {
//                 value: "🌈"
//               }
//             }
//           }
//         }
//       },
//       {
//         position: {
//           x: 100,
//           y: 33
//         },
//         rate: emitterRate,
//         particles: {
//           move: {
//             direction: "top-left"
//           },
//           shape: {
//             type: "emoji",
//             options: {
//               emoji: {
//                 value: "🎉"
//               }
//             }
//           }
//         }
//       },
//       {
//         position: {
//           x: 100,
//           y: 66
//         },
//         rate: emitterRate,
//         particles: {
//           move: {
//             direction: "top-left"
//           },
//           shape: {
//             type: "emoji",
//             options: {
//               emoji: {
//                 value: "🤡"
//               }
//             }
//           }
//         }
//       },
//       {
//         position: {
//           x: 50,
//           y: 50
//         },
//         rate: emitterRate,
//         particles: {
//           move: {
//             direction: "top"
//           },
//           shape: {
//             type: "emoji",
//             options: {
//               emoji: {
//                 value: "👻"
//               }
//             }
//           }
//         }
//       }
//     ]
//   };

// loadParticles(options);

