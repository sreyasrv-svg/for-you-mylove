let currentStep = 0;
const typewriter = new Typewriter(document.getElementById('typewriter-output'));

async function nextChapter() {
    document.getElementById('bg-music').play();
    const btn = document.getElementById('action-btn');
    const chapters = SIMRAN_DATA.timeline;

    if (currentStep >= chapters.length) return;

    btn.disabled = true;
    btn.style.opacity = "0.5";

    // --- NEW LOGIC FOR THE LAST CARD ---
    if (currentStep === chapters.length - 1) {
        // 1. Hide the title at the top
        document.getElementById('title-display').style.display = 'none'; 
        // 2. Center the content in the card
        document.querySelector('.glass-card').classList.add('centered-last-card'); 
        // 3. Apply the big cursive style
        document.getElementById('typewriter-output').classList.add('final-valentine-text'); 
    } else {
        document.getElementById('title-display').innerText = chapters[currentStep].title;
    }
    // ------------------------------------

    if(typeof createBurst === 'function') createBurst();

    const progress = ((currentStep + 1) / chapters.length) * 100;
    document.getElementById('bar').style.width = progress + "%";

    // Start typing the message
    await typewriter.write(chapters[currentStep].msg);

    currentStep++;
    
    if (currentStep < chapters.length) {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.innerText = "Continue";
    } else {
        // We set disabled to false so she can click "I Love You" at the very end
        btn.disabled = false; 
        btn.style.opacity = "1";
        btn.innerText = "I Love You ❤️";
    }
}