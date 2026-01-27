let currentStep = 0;
const typewriter = new Typewriter(document.getElementById('typewriter-output'));

async function nextChapter() {
    const chapters = SIMRAN_DATA.timeline;
    const btn = document.getElementById('action-btn');

    // 1. Safety check: if we're out of chapters, stop.
    if (currentStep >= chapters.length) {
        if(typeof createBurst === 'function') createBurst();
        return;
    }

    // 2. Clear welcome quote
    const q = document.querySelector('.welcome-quote');
    if (q) q.remove();

    // 3. Start music
    document.getElementById('bg-music').play();

    // 4. Lock button during typing
    btn.disabled = true;
    btn.style.opacity = "0.5";

    // 5. Handle the visual reveal for the LAST card
    if (currentStep === chapters.length - 1) {
        document.getElementById('title-display').style.display = 'none'; 
        document.querySelector('.glass-card').classList.add('centered-last-card'); 
        document.getElementById('typewriter-output').classList.add('final-valentine-text'); 
        
        document.body.style.backgroundColor = "#2a0505"; 
        document.body.style.backgroundImage = "none";
        document.title = "Will you be mine? ❤️";
    } else {
        // Update title for regular cards
        document.getElementById('title-display').innerText = chapters[currentStep].title;
    }

    // 6. Visual effect
    if(typeof createBurst === 'function') createBurst();

    // 7. Update progress
    const progress = ((currentStep + 1) / chapters.length) * 100;
    document.getElementById('bar').style.width = progress + "%";

    // 8. Type the message (This is where it usually gets stuck)
    try {
        await typewriter.write(chapters[currentStep].msg);
    } catch (e) {
        console.log("Typewriter error, moving on...");
    }

    // 9. Increment step
    currentStep++;
    
    // 10. UNLOCK button and set text
    btn.disabled = false;
    btn.style.opacity = "1";

    if (currentStep < chapters.length - 1) {
        btn.innerText = "Continue";
    } else if (currentStep === chapters.length - 1) {
        btn.innerText = "One Question..."; 
    } else {
        btn.innerText = "I Love You ❤️"; 
    }
}

// Tab Messages
window.onblur = () => { if(currentStep < 5) document.title = "Come back to me! ❤️"; };
window.onfocus = () => { document.title = "For Simran ❤️"; };