let currentStep = 0;
const typewriter = new Typewriter(document.getElementById('typewriter-output'));

async function nextChapter() {
    document.getElementById('bg-music').play();
    const btn = document.getElementById('action-btn');
    const chapters = SIMRAN_DATA.timeline;

    if (currentStep >= chapters.length) return;

    btn.disabled = true;
    btn.style.opacity = "0.5";

    document.getElementById('title-display').innerText = chapters[currentStep].title;
    
    // Create subtle white burst
    if(typeof createBurst === 'function') createBurst();

    const progress = ((currentStep + 1) / chapters.length) * 100;
    document.getElementById('bar').style.width = progress + "%";

    await typewriter.write(chapters[currentStep].msg);

    currentStep++;
    
    if (currentStep < chapters.length) {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.innerText = "Continue";
    } else {
        btn.disabled = true;
        btn.style.opacity = "1";
        btn.innerText = "I Love You ❤️";
    }
}