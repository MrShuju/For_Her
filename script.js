// ───────────────────────────────────────────
// 1. Webhook URL (YOUR LINK INSERTED)
// ───────────────────────────────────────────
const webhookURL = "https://eojetr20yicdck2.m.pipedream.net";

// ───────────────────────────────────────────
// 2. Page Navigation
// ───────────────────────────────────────────
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

document.getElementById("nextPage").onclick = () => showPage("page2");
document.getElementById("yesBtn").onclick = () => sendResponse("yes");
document.getElementById("noBtn").onclick = () => sendResponse("no");

// ───────────────────────────────────────────
// 3. Send YES/NO to Webhook
// ───────────────────────────────────────────
function sendResponse(choice) {
  const payload = {
    choice: choice,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
  };

  fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  .then(() => {
    if (choice === "yes") {
      showPage("yesPage");
    } else {
      showPage("noPage");
    }
  })
  .catch(err => {
    console.error("Webhook error:", err);
    // Even if webhook fails, move to next page
    if (choice === "yes") {
      showPage("yesPage");
    } else {
      showPage("noPage");
    }
  });
}

// ───────────────────────────────────────────
// 4. Petal Animation
// ───────────────────────────────────────────
const petalArea = document.getElementById("petal-area");

function createPetal() {
  const petal = document.createElement("div");
  petal.classList.add("petal");

  const size = Math.random() * 12 + 12;
  petal.style.width = `${size}px`;
  petal.style.height = `${size}px`;

  petal.style.left = Math.random() * 100 + "vw";
  petal.style.animationDuration = Math.random() * 5 + 7 + "s";
  petal.style.opacity = Math.random() * 0.5 + 0.5;

  petalArea.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, 12000);
}

setInterval(createPetal, 300);
