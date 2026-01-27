let currentStep = 0;
const typewriter = new Typewriter(document.getElementById('typewriter-output'));

async function nextChapter() {
    const chapters = SIMRAN_DATA.timeline;
    const btn = document.getElementById('action-btn');
    const titleDisplay = document.getElementById('title-display');
    const output = document.getElementById('typewriter-output');

    // 1. End of journey check
    if (currentStep >= chapters.length) {
        if(typeof createBurst === 'function') createBurst();
        return;
    }

    // 2. Play music & handle browser blocks
    const music = document.getElementById('bg-music');
    if (music) music.play().catch(() => console.log("Music blocked by browser policy"));

    // 3. SAFE REMOVAL: Only remove if they exist
    const q = document.querySelector('.welcome-quote');
    const startQuote = document.getElementById('start-quote');
    if (q) q.remove();
    if (startQuote) startQuote.remove();

    // 4. Lock button & Wipe the heart image
    btn.disabled = true;
    btn.style.opacity = "0.5";
    output.innerHTML = ""; 

    // 5. Handle Visual Transitions
    if (currentStep === chapters.length - 1) {
        titleDisplay.style.display = 'none'; 
        document.querySelector('.glass-card').classList.add('centered-last-card'); 
        output.classList.add('final-valentine-text'); 
        
        document.body.style.backgroundColor = "#2a0505"; 
        document.body.style.backgroundImage = "none";
        document.title = "Will you be mine? ❤️";
    } else {
        // Change title IMMEDIATELY
        titleDisplay.innerText = chapters[currentStep].title;
    }

    if(typeof createBurst === 'function') createBurst();

    // 6. Update Progress
    const progress = ((currentStep + 1) / chapters.length) * 100;
    const bar = document.getElementById('bar');
    if (bar) bar.style.width = progress + "%";

    // 7. Start Typing
    try {
        await typewriter.write(chapters[currentStep].msg);
    } catch (e) {
        console.error("Typewriter stalled, manual override:", e);
        output.innerText = chapters[currentStep].msg;
    }

    // 8. Move to next step
    currentStep++;
    
    // 9. UNLOCK button 
    btn.disabled = false;
    btn.style.opacity = "1";

    // 10. Set button text
    if (currentStep < chapters.length - 1) {
        btn.innerText = "Continue";
    } else if (currentStep === chapters.length - 1) {
        btn.innerText = "One Question..."; 
    } else {
        btn.innerText = "I Love You ❤️"; 
    }
}

// Browser Tab Messages
window.onblur = () => { if(currentStep < 5) document.title = "Come back to me! ❤️"; };
window.onfocus = () => { document.title = "For Simran ❤️"; };