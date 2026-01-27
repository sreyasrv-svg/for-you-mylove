let currentStep = 0;
const typewriter = new Typewriter(document.getElementById('typewriter-output'));

// This runs as soon as the page opens
window.onload = () => {
    nextChapter(); 
};

async function nextChapter() {
    const btn = document.getElementById('action-btn');
    const chapters = SIMRAN_DATA.timeline;

    // Check if we already finished
    if (currentStep >= chapters.length) return;

    btn.disabled = true;
    btn.style.opacity = "0.5";

    // Update Content
    document.getElementById('title-display').innerText = chapters[currentStep].title;
    if(typeof createHeartBurst === 'function') createHeartBurst();

    const progress = ((currentStep + 1) / chapters.length) * 100;
    document.getElementById('bar').style.width = progress + "%";

    // Type Message
    await typewriter.write(chapters[currentStep].msg);

    currentStep++;
    
    if (currentStep < chapters.length) {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.innerText = "NEXT CHAPTER";
    } else {
        btn.disabled = true; // No restart
        btn.style.opacity = "1";
        btn.innerText = "I LOVE YOU FOREVER ❤️";
    }
}