let currentStep = 0;
let typewriter; 

async function nextChapter() {
    const btn = document.getElementById('action-btn');
    const titleDisplay = document.getElementById('title-display');
    const output = document.getElementById('typewriter-output');
    const chapters = SIMRAN_DATA.timeline;

    // Initialize typewriter only when button is clicked
    if (!typewriter) {
        typewriter = new Typewriter(output);
    }

    if (currentStep >= chapters.length) return;

    // 1. Play music safely
    const music = document.getElementById('bg-music');
    if (music) music.play().catch(() => console.log("Music interaction required"));

    // 2. Remove welcome elements
    const q = document.querySelector('.welcome-quote');
    if (q) q.remove();

    // 3. Lock button and clear screen
    btn.disabled = true;
    btn.style.opacity = "0.5";
    output.innerHTML = ""; 

    // 4. Update Title
    titleDisplay.innerText = chapters[currentStep].title;

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
    btn.innerText = currentStep < chapters.length ? "Continue" : "I Love You ❤️";
}

// Browser Tab Messages
window.onblur = () => { if(currentStep < 5) document.title = "Come back to me! ❤️"; };
window.onfocus = () => { document.title = "For Simran ❤️"; };