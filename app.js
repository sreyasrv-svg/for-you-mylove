let currentStep = 0;
const typewriter = new Typewriter(document.getElementById('typewriter-output'));

async function nextChapter() {
    const chapters = SIMRAN_DATA.timeline;
    const btn = document.getElementById('action-btn');
    const titleDisplay = document.getElementById('title-display');
    const output = document.getElementById('typewriter-output');

    // 1. Endless heart burst after the journey ends
    if (currentStep >= chapters.length) {
        if(typeof createBurst === 'function') createBurst();
        return;
    }

    // 2. Clear the static welcome quote 
    const q = document.querySelector('.welcome-quote');
    if (q) q.remove();

    // 3. Play music
    document.getElementById('bg-music').play();

    // 4. LOCK button and WIPE the initial heart image/text
    btn.disabled = true;
    btn.style.opacity = "0.5";
    output.innerHTML = ""; // This removes the initial floating heart image

    // 5. Handle Visual Transitions
    if (currentStep === chapters.length - 1) {
        // FINAL CARD
        titleDisplay.style.display = 'none'; 
        document.querySelector('.glass-card').classList.add('centered-last-card'); 
        output.classList.add('final-valentine-text'); 
        
        document.body.style.backgroundColor = "#2a0505"; 
        document.body.style.backgroundImage = "none";
        document.title = "Will you be mine? ❤️";
    } else {
        // REGULAR CARDS: Update title immediately
        titleDisplay.style.display = 'block'; // Ensure title is visible
        titleDisplay.innerText = chapters[currentStep].title;
    }

    if(typeof createBurst === 'function') createBurst();

    // 6. Update progress bar
    const progress = ((currentStep + 1) / chapters.length) * 100;
    document.getElementById('bar').style.width = progress + "%";

    // 7. Start Typing the message
    try {
        await typewriter.write(chapters[currentStep].msg);
    } catch (e) {
        console.error("Typewriter stalled:", e);
    }

    // 8. Move to the next step
    currentStep++;
    
    // 9. UNLOCK button 
    btn.disabled = false;
    btn.style.opacity = "1";

    // 10. Set button text for the next interaction
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