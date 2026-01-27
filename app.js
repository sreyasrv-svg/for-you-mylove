let currentStep = 0;
let typewriter; 

async function nextChapter() {
    const btn = document.getElementById('action-btn');
    const titleDisplay = document.getElementById('title-display');
    const output = document.getElementById('typewriter-output');
    const chapters = SIMRAN_DATA.timeline;

    // FIX: Initialize typewriter only when button is clicked to prevent crashes
    if (!typewriter) {
        typewriter = new Typewriter(output);
    }

    if (currentStep >= chapters.length) return;

    // 1. Play music safely
    const music = document.getElementById('bg-music');
    if (music) music.play().catch(() => console.log("Music interaction required"));

    // 2. Remove welcome elements
    const q = document.querySelector('.welcome-quote');
    const startQuote = document.getElementById('start-quote'); // Added safety check
    if (q) q.remove();
    if (startQuote) startQuote.remove();

    // 3. Lock button and clear screen
    btn.disabled = true;
    btn.style.opacity = "0.5";
    output.innerHTML = ""; 

    // 4. Update Title & Check for Final Card (Layout Fix Only)
    if (currentStep === chapters.length - 1) {
        // This visual logic is needed so the final card looks right
        titleDisplay.style.display = 'none'; 
        document.querySelector('.glass-card').classList.add('centered-last-card'); 
        output.classList.add('final-valentine-text'); 
        document.body.style.backgroundColor = "#2a0505"; 
        document.body.style.backgroundImage = "none";
        document.title = "Will you be mine? ❤️";
    } else {
        titleDisplay.innerText = chapters[currentStep].title;
    }

    // 5. Typing with Safety Fallback
    try {
        await Promise.race([
            typewriter.write(chapters[currentStep].msg),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 6000))
        ]);
    } catch (e) {
        output.innerText = chapters[currentStep].msg;
    }

    // 6. Progress & Unlock
    currentStep++;
    const bar = document.getElementById('bar');
    if (bar) bar.style.width = ((currentStep) / chapters.length * 100) + "%";

    btn.disabled = false;
    btn.style.opacity = "1";

    // YOUR TEXT LOGIC (Preserved):
    // If we are not at the end, show "Continue". 
    // If we are at the very last step, show "I Love You ❤️"
    if (currentStep < chapters.length) {
        btn.innerText = "Continue";
    } else {
        btn.innerText = "I Love You ❤️";
    }
    
    // Optional: Visual burst effect
    if(typeof createBurst === 'function') createBurst();
}

// Browser Tab Messages
window.onblur = () => { if(currentStep < 5) document.title = "Come back to me! ❤️"; };
window.onfocus = () => { document.title = "For Simran ❤️"; };