function createBurst(customX, customY) {
    const x = customX || window.innerWidth / 2;
    const y = customY || window.innerHeight / 2;
    for(let i=0; i<12; i++) {
        const h = document.createElement('div');
        h.className = 'particle'; 
        h.innerHTML = '✦'; // Linear style sparkles
        h.style.left = x + 'px'; 
        h.style.top = y + 'px';
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 100 + 40;
        h.style.setProperty('--x', Math.cos(angle) * velocity + 'px');
        h.style.setProperty('--y', Math.sin(angle) * velocity + 'px');
        h.style.setProperty('--d', (Math.random() * 0.4 + 0.6) + 's');
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 1000);
    }
}

function handleScreenClick(e) {
    if (e.target.tagName !== 'BUTTON') {
        createBurst(e.clientX, e.clientY);
    }
}