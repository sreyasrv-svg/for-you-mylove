let currentStep = 0;
const typewriter = new Typewriter(document.getElementById('typewriter-output'));

async function nextChapter() {
    // 1. Remove the welcome quote only once when the journey starts
    const q = document.querySelector('.welcome-quote');
    if (q) q.remove();

    // Start background music on first interaction
    document.getElementById('bg-music').play();
    
    const btn = document.getElementById('action-btn');
    const chapters = SIMRAN_DATA.timeline;

    if (currentStep >= chapters.length) return;

    // Temporarily disable button during typing
    btn.disabled = true;
    btn.style.opacity = "0.5";

    // --- LOGIC FOR THE LAST CARD REVEAL ---
    if (currentStep === chapters.length - 1) {
        // Hide title, center the box, and apply big cursive font
        document.getElementById('title-display').style.display = 'none'; 
        document.querySelector('.glass-card').classList.add('centered-last-card'); 
        document.getElementById('typewriter-output').classList.add('final-valentine-text'); 

        // Change background to a deep romantic red and remove the dark gradient
        document.body.style.backgroundColor = "#2a0505"; 
        document.body.style.backgroundImage = "none";
    } else {
        // Update the title for regular chapters
        document.getElementById('title-display').innerText = chapters[currentStep].title;
    }
    // ------------------------------------

    // Trigger visual effect if function exists
    if(typeof createBurst === 'function') createBurst();

    // Update progress bar
    const progress = ((currentStep + 1) / chapters.length) * 100;
    document.getElementById('bar').style.width = progress + "%";

    // Type out the message from config.js
    await typewriter.write(chapters[currentStep].msg);

    currentStep++;
    
    // Re-enable button and handle button text changes
    btn.disabled = false;
    btn.style.opacity = "1";

    if (currentStep < chapters.length - 1) {
        btn.innerText = "Continue";
    } else if (currentStep === chapters.length - 1) {
        btn.innerText = "One Question..."; // Dramatic pause button before the final ask
    } else {
        btn.innerText = "I Love You ❤️"; // Final state
    }
}