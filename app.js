let currentStep = 0;
let typewriterInstance = null; 

let isTyping = false;

async function nextChapter() {

    // Check for final love click BEFORE anything else
    if (currentStep >= SIMRAN_DATA.timeline.length && isFinalLoveClick()) {
    loveExplosion();
    // Optional: add a little extra burst too if you want
    if (typeof createBurst === 'function') createBurst();
    // You can return here if you DON'T want it to do anything else after
    // return;   ← uncomment this line if you want to STOP after explosion
    }
    if (isTyping) return;     // ← ADD THIS LINE
    isTyping = true;          // ← ADD THIS LINE

    const btn = document.getElementById('action-btn');
    const titleDisplay = document.getElementById('title-display');
    const output = document.getElementById('typewriter-output');
    const chapters = SIMRAN_DATA.timeline;

    // 1. Initialize typewriter only on first click to prevent crashes
    if (!typewriterInstance) {
        typewriterInstance = new Typewriter(output);
    }

    // Special explosion only when clicking the final "I Love You ❤️" button
    if (currentStep >= chapters.length && btn.innerText.includes('I Love You')) {
    loveExplosion();
}

    // 3. Play music safely
    const music = document.getElementById('bg-music');
    if (music) music.play().catch(() => console.log("Music interaction required"));

    // 4. Remove welcome elements
    const q = document.querySelector('.welcome-quote');
    const startQuote = document.getElementById('start-quote'); 
    if (q) q.remove();
    if (startQuote) startQuote.remove();

    // 5. Lock button and clear screen
    btn.disabled = true;
    btn.style.opacity = "0.5";
    output.innerHTML = ""; 

    // 6. Update Title & Check for Final Card
    if (currentStep === chapters.length - 1) {
        // Visual logic for the Final "Valentine" Card
        titleDisplay.style.display = 'none'; 
        document.querySelector('.glass-card').classList.add('centered-last-card'); 
        output.classList.add('final-valentine-text'); 
        document.body.style.backgroundColor = "#2a0505"; 
        document.body.style.backgroundImage = "none";
        document.title = "Will you be mine? ❤️";
    } else {
        titleDisplay.innerText = chapters[currentStep].title;
    }

    // 7. Start Typing with a safety timeout
    await typewriterInstance.write(chapters[currentStep].msg);

    // 8. Update Progress Bar
    const bar = document.getElementById('bar');
    if (bar) {
        const progress = ((currentStep + 1) / chapters.length) * 100;
        bar.style.width = progress + "%";
    }

    // 9. Prepare for the next step
    currentStep++;
    
    // 10. UNLOCK BUTTON & SET TEXT LOGIC
btn.disabled = false;
btn.style.opacity = "1";

if (currentStep < chapters.length - 1) {
    btn.innerText = "Continue";
} else if (currentStep === chapters.length - 1) {
    btn.innerText = "One Question...";
} else {
    // Final stage - show Yes / No buttons
    btn.style.display = 'none';

    const proposalDiv = document.getElementById('proposal-buttons');
    if (proposalDiv) {
        proposalDiv.style.display = 'flex';

        const yesBtn = document.getElementById('yes-love-btn');
        const noBtn = document.getElementById('no-dodge-btn');

        if (yesBtn) yesBtn.style.display = 'block';
        if (noBtn) noBtn.style.display = 'block';

        // Yes triggers explosion
        if (yesBtn) {
            yesBtn.onclick = () => {
                loveExplosion();
                if (typeof createBurst === 'function') createBurst();
                proposalDiv.style.display = 'none';
            };
        }

        // Dodging for No
        if (typeof makeNoButtonDodge === 'function' && noBtn) {
            makeNoButtonDodge();
        }
    }
}

// Visual effect
if(typeof createBurst === 'function') createBurst();

isTyping = false;
    
}

// Browser Tab Messages
window.onblur = () => { if(currentStep < 5) document.title = "Come back to me! ❤️"; };
window.onfocus = () => { document.title = "For Simran ❤️"; };

window.addEventListener('resize', () => {
    const noBtn = document.getElementById('no-dodge-btn');
    if (noBtn && noBtn.style.position === 'fixed') {
        // snap back to random spot on resize
        const maxX = window.innerWidth - 220;
        const maxY = window.innerHeight - 100;
        noBtn.style.left = (Math.random() * maxX) + 'px';
        noBtn.style.top = (Math.random() * maxY) + 'px';
    }
});