let currentStep = 0;
let typewriterInstance = null; 

let isTyping = false;

async function nextChapter() {
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

    // 2. Safety check: Stop if we are out of chapters
    // If we are at the end, clicking "I Love You" just triggers hearts
    if (currentStep >= chapters.length) {
        if(typeof createBurst === 'function') createBurst();
        isTyping = false;
        return;
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

    // --- HERE IS THE LOGIC YOU ASKED FOR ---
    if (currentStep < chapters.length - 1) {
        // For all normal chapters (1, 2, 3), button says "Continue"
        btn.innerText = "Continue";
    } else if (currentStep === chapters.length - 1) {
        // We just finished the 2nd to last card. Next click is the final one.
        btn.innerText = "One Question...";
    } else {
        // We just finished the Last Card. We are done.
        btn.innerText = "I Love You ❤️";
    }

    // Visual effect
    if(typeof createBurst === 'function') createBurst();

    isTyping = false;
    
}

// Browser Tab Messages
window.onblur = () => { if(currentStep < 5) document.title = "Come back to me! ❤️"; };
window.onfocus = () => { document.title = "For Simran ❤️"; };