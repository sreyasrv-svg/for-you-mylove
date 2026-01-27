function createSparkles() {
    for(let i=0; i<50; i++) {
        const s = document.createElement('div');
        s.className = 'sparkle';
        s.style.width = Math.random() * 3 + 'px';
        s.style.height = s.style.width;
        s.style.left = Math.random() * 100 + 'vw';
        s.style.top = Math.random() * 100 + 'vh';
        s.style.setProperty('--d', (Math.random() * 5 + 3) + 's');
        document.body.appendChild(s);
    }
}

function createHeartBurst(customX, customY) {
    const x = customX || window.innerWidth / 2;
    const y = customY || window.innerHeight / 2;
    for(let i=0; i<30; i++) { // Increased for more "wow" factor
        const h = document.createElement('div');
        h.className = 'particle'; h.innerHTML = '❤️';
        h.style.left = x + 'px'; h.style.top = y + 'px';
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 200 + 100;
        h.style.setProperty('--x', Math.cos(angle) * velocity + 'px');
        h.style.setProperty('--y', Math.sin(angle) * velocity + 'px');
        h.style.setProperty('--d', (Math.random() * 0.5 + 0.5) + 's');
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 1000);
    }
}

createSparkles();