let currentStep = 0;
const typewriter = new Typewriter(document.getElementById('typewriter-output'));

async function nextChapter() {
    const btn = document.getElementById('action-btn');
    const chapters = SIMRAN_DATA.timeline;

    // Restart Logic: If we are at the end, reset everything
    if (currentStep >= chapters.length) {
        currentStep = 0;
        document.getElementById('bar').style.width = "0%";
        btn.innerText = "BEGIN OUR TALE";
        document.getElementById('typewriter-output').innerHTML = "";
        document.getElementById('title-display').innerText = "Our Journey";
        return;
    }

    btn.disabled = true;
    btn.innerText = "READING...";

    // Update Title & Progress
    document.getElementById('title-display').innerText = chapters[currentStep].title;
    createHeartBurst(); // Burst from center on button click

    const progress = ((currentStep + 1) / chapters.length) * 100;
    document.getElementById('bar').style.width = progress + "%";

    // Type Message
    await typewriter.write(chapters[currentStep].msg);

    currentStep++;
    btn.disabled = false;

    if (currentStep < chapters.length) {
        btn.innerText = "NEXT CHAPTER";
    } else {
        btn.innerText = "REPLAY OUR STORY ❤️";
    }
}