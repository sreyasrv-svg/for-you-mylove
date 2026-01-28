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

    // Extra safety: Hide proposal buttons on all steps except the absolute final one
const proposalDiv = document.getElementById('proposal-buttons');
if (proposalDiv && currentStep < chapters.length) {
    proposalDiv.style.display = 'none';
}

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

if (currentStep < chapters.length - 2) {
    btn.innerText = "Continue";
} else if (currentStep === chapters.length - 2) {
    btn.innerText = "Continue";  // This is on the "Forever & Always" card
} else if (currentStep === chapters.length - 1) {
    btn.innerText = "One Question...";  // Also on the last card if needed, but will be hidden soon
} else {
    // Final step after last message typed — show Yes/No
    btn.style.display = 'none';

    const proposalDiv = document.getElementById('proposal-buttons');
    if (proposalDiv) {
        proposalDiv.style.display = 'flex';

        const yesBtn = document.getElementById('yes-love-btn');
        const noBtn = document.getElementById('no-dodge-btn');

        setTimeout(() => {
            if (yesBtn) {
                yesBtn.style.display = 'block';
                yesBtn.style.visibility = 'visible';
                yesBtn.style.opacity = '1';
            }
            if (noBtn) {
                noBtn.style.display = 'block';
                noBtn.style.visibility = 'visible';
                noBtn.style.opacity = '1';
                noBtn.style.pointerEvents = 'auto';  // make sure clickable
                noBtn.style.cursor = 'pointer';
            }
        }, 200);  // slightly longer delay so DOM catches up

        if (yesBtn) {
            yesBtn.onclick = () => {
                loveExplosion();
                if (typeof createBurst === 'function') createBurst();
            };
        }

        if (noBtn) {
    // If you still want dodging — keep this
    if (typeof makeNoButtonDodge === 'function') {
        makeNoButtonDodge();
    }

    // NEW: Add click behavior
    noBtn.onclick = function() {
        showNoTeaseMessage();           // show popup message

        // Optional: little heart burst where the no button was
        const rect = noBtn.getBoundingClientRect();
        const clickX = rect.left + rect.width/2;
        const clickY = rect.top + rect.height/2;
        createBurst(clickX, clickY);

        // Make NO button disappear after click
        setTimeout(() => {
            noBtn.style.transition = 'all 0.6s ease';
            noBtn.style.opacity = '0';
            noBtn.style.transform = 'scale(0.7)';
            setTimeout(() => {
                noBtn.style.display = 'none';
                // Optional: you can also disable Yes button or change text etc.
            }, 700);
        }, 800); // small delay so they see the message first
    };
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