let currentStep = 0;
const typewriter = new Typewriter(document.getElementById('typewriter-output'));

async function nextChapter() {
    const btn = document.getElementById('action-btn');
    const chapters = SIMRAN_DATA.timeline;

    // Stop if we hit the end (No restart)
    if (currentStep >= chapters.length) return;

    btn.disabled = true;
    btn.style.opacity = "0.5";

    // Update the Chapter Title
    document.getElementById('title-display').innerText = chapters[currentStep].title;
    
    // Trigger the heart burst
    if(typeof createHeartBurst === 'function') createHeartBurst();

    // Update the progress bar
    const progress = ((currentStep + 1) / chapters.length) * 100;
    document.getElementById('bar').style.width = progress + "%";

    // Start typing the message
    await typewriter.write(chapters[currentStep].msg);

    currentStep++;
    
    // Change button text based on progress
    if (currentStep < chapters.length) {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.innerText = "NEXT CHAPTER";
    } else {
        btn.disabled = true; // Button stays disabled at the end
        btn.style.opacity = "1";
        btn.innerText = "I LOVE YOU FOREVER ❤️";
    }
}