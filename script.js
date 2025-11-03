const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin");
const result = document.getElementById("resultat");

const prizes = ["1 Café Gratuit", "Un Macaron", "10% Réduction", "Tente encore", "1 Tarte", "Boisson offerte"];
const colors = ["#f9d7b7", "#fbe4cf", "#b87b4b", "#f9d7b7", "#fbe4cf", "#b87b4b"];

let startAngle = 0;
const arc = (2 * Math.PI) / prizes.length;

function drawWheel() {
  for (let i = 0; i < prizes.length; i++) {
    const angle = startAngle + i * arc;
    ctx.beginPath();
    ctx.fillStyle = colors[i];
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, angle, angle + arc);
    ctx.fill();
    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(angle + arc / 2);
    ctx.fillStyle = "#4b2e1e";
    ctx.font = "14px Poppins";
    ctx.fillText(prizes[i], 70, 5);
    ctx.restore();
  }
}

drawWheel();

let spinAngle = 0;
let spinning = false;

spinBtn.addEventListener("click", () => {
  if (spinning) return;
  spinning = true;
  result.textContent = "";
  const spinDeg = Math.floor(3000 + Math.random() * 2000);
  const spinTime = 4000;
  let start = null;

  function animate(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const rotation = (spinDeg * (progress / spinTime)) * (1 - progress / spinTime);
    startAngle += rotation * 0.001;
    ctx.clearRect(0, 0, 300, 300);
    drawWheel();

    if (progress < spinTime) {
      requestAnimationFrame(animate);
    } else {
      const degrees = (startAngle * 180) / Math.PI + 90;
      const arcd = 360 / prizes.length;
      const index = Math.floor((360 - (degrees % 360)) / arcd) % prizes.length;
      result.textContent = `🎉 Bravo ! Vous avez gagné : ${prizes[index]} 🎉`;
      spinning = false;
    }
  }

  requestAnimationFrame(animate);
});
