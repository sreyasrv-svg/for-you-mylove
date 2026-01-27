let currentStep = 0;
const typewriter = new Typewriter(document.getElementById('typewriter-output'));

async function nextChapter() {
    // 1. Remove the welcome quote only once when the journey starts
    const q = document.querySelector('.welcome-quote');
    if (q) q.remove();

    document.getElementById('bg-music').play();
    const btn = document.getElementById('action-btn');
    const chapters = SIMRAN_DATA.timeline;

    if (currentStep >= chapters.length) return;

    btn.disabled = true;
    btn.style.opacity = "0.5";

    // --- LOGIC FOR THE LAST CARD REVEAL ---
    if (currentStep === chapters.length - 1) {
        // Hide title, center the box, and apply big cursive font
        document.getElementById('title-display').style.display = 'none'; 
        document.querySelector('.glass-card').classList.add('centered-last-card'); 
        document.getElementById('typewriter-output').classList.add('final-valentine-text'); 
    } else {
        document.getElementById('title-display').innerText = chapters[currentStep].title;
    }

    if(typeof createBurst === 'function') createBurst();

    const progress = ((currentStep + 1) / chapters.length) * 100;
    document.getElementById('bar').style.width = progress + "%";

    // Type the message
    await typewriter.write(chapters[currentStep].msg);

    currentStep++;
    
    // Enable button and handle button text
    btn.disabled = false;
    btn.style.opacity = "1";

    if (currentStep < chapters.length - 1) {
        btn.innerText = "Continue";
    } else if (currentStep === chapters.length - 1) {
        btn.innerText = "One Question..."; // Dramatic pause button
    } else {
        btn.innerText = "I Love You ❤️";
    }
}