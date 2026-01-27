let currentStep = 0;
const typewriter = new Typewriter(document.getElementById('typewriter-output'));

async function nextChapter() {
    const btn = document.getElementById('action-btn');
    const chapters = SIMRAN_DATA.timeline;

    if (currentStep >= chapters.length) {
        location.reload(); // Restarts the whole experience
        return;
    }

    btn.disabled = true;
    btn.style.opacity = "0.5";

    document.getElementById('title-display').innerText = chapters[currentStep].title;
    createHeartBurst();

    const progress = ((currentStep + 1) / chapters.length) * 100;
    document.getElementById('bar').style.width = progress + "%";

    await typewriter.write(chapters[currentStep].msg);

    currentStep++;
    btn.disabled = false;
    btn.style.opacity = "1";
    btn.innerText = (currentStep < chapters.length) ? "NEXT CHAPTER" : "REPLAY OUR STORY ❤️";
}