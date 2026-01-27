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

    const messageElement = document.getElementById('typewriter-output');
    await typewriter.write(chapters[currentStep].msg);
    messageElement.innerHTML = chapters[currentStep].msg; // This "forces" the bold style at the end

    currentStep++;

    if (currentStep === chapters.length) {
    document.getElementById('typewriter-output').classList.add('final-style');
}
    
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