/**
 * Typewriter Engine - Cosmic Edition
 * This version uses \u00A0 to ensure long romantic messages 
 * preserve their spaces and wrap correctly on mobile.
 */

class Typewriter {
    constructor(element) {
        this.element = element;
    }

    async write(text) {
        // Clear previous content
        this.element.innerHTML = ""; 
        
        for (let char of text) {
            /* If the character is a space, we use a Non-Breaking Space (\u00A0).
               This is the secret to fixing the "brick of text" issue.
            */
            if (char === " ") {
                this.element.innerHTML += "\u00A0"; 
            } else {
                this.element.innerHTML += char;
            }
            
            // Wait 45ms between each character for a smooth effect
            await new Promise(resolve => setTimeout(resolve, 45));
        }
    }
}