document.addEventListener('DOMContentLoaded', () => {
    const keyboardInput = document.getElementById('keyboardInput');

    // Références aux cellules du tableau pour keyCodes et charCodes
    const kdKeyCode = document.getElementById('kd-keyCode');
    const kpKeyCode = document.getElementById('kp-keyCode');
    const kuKeyCode = document.getElementById('ku-keyCode');
    const kdCharCode = document.getElementById('kd-charCode');
    const kpCharCode = document.getElementById('kp-charCode');
    const kuCharCode = document.getElementById('ku-charCode');

    // Références aux cellules du tableau pour les autres propriétés
    const targetEl = document.getElementById('target');
    const characterEl = document.getElementById('character');
    
    const shiftEl = document.getElementById('shift');
    const ctrlEl = document.getElementById('ctrl');
    const altEl = document.getElementById('alt');
    const metaEl = document.getElementById('meta');

    const logContainer = document.querySelector('.log-container');

    let eventCounter = 0;

    // Fonction pour réinitialiser les cellules de keyCode et charCode après un délai
    const resetTableCells = (eventType) => {
        setTimeout(() => {
            if (eventType === 'keydown') {
                kdKeyCode.textContent = '';
                kdCharCode.textContent = '';
            } else if (eventType === 'keypress') {
                kpKeyCode.textContent = '';
                kpCharCode.textContent = '';
            } else if (eventType === 'keyup') {
                kuKeyCode.textContent = '';
                kuCharCode.textContent = '';
            }
        }, 5000); // Réinitialise après 200ms
    };

    document.addEventListener('keydown', (e) => {
        eventCounter++;

e.preventDefault();

        kdKeyCode.textContent = e.key;
        kdCharCode.textContent = e.code;
 // charCode est généralement 0 pour keydown
        updateCommonProperties(e);
        logEvent(e);
        resetTableCells('keydown');
    });

    document.addEventListener('keypress', (e) => {
        // keypress n'a pas toujours un keyCode fiable, charCode est plus pertinent
        // C'est souvent l'événement qui renvoie le "caractère"
        kpKeyCode.textContent = e.key || '-';
        kpCharCode.textContent = e.code || '-';
        updateCommonProperties(e);
        logEvent(e);
        resetTableCells('keypress');
    });

    document.addEventListener('keyup', (e) => {
        kuKeyCode.textContent = e.key;
        kuCharCode.textContent = e.code; // charCode est généralement 0 pour keyup
        updateCommonProperties(e);
        logEvent(e);
        resetTableCells('keyup');
    });

    function updateCommonProperties(e) {
        targetEl.textContent = e.target.tagName; // Ou e.target.id pour l'ID de l'élément
        // Pour `character`, e.key est moderne et plus précis pour la plupart des touches.
        // charCode est souvent utilisé pour keypress pour le caractère ASCII.
	let chAct = e.key || String.fromCharCode(e.code || e.key);
        characterEl.textContent =chAct;
      
	keyboardInput.value = chAct;
        shiftEl.textContent = e.shiftKey ? 'true' : 'false';
        ctrlEl.textContent = e.ctrlKey ? 'true' : 'false';
        altEl.textContent = e.altKey ? 'true' : 'false';
        metaEl.textContent = e.metaKey ? 'true' : 'false';
    }

    function logEvent(e) {
        let charInfo = '';
        // Pour keypress, charCode est souvent le caractère lui-même
        if (e.type === 'keypress' && e.code) {
            charInfo = `[character:${String.fromCharCode(e.code)}]`;
        } else if (e.key) { // e.key est plus moderne et couvre bien les caractères
            charInfo = `[character:${e.key}]`;
        }


       /* const logEntry = document.createElement('div');
        logEntry.innerHTML = `
            ${charInfo}`
	    [charCode:${e.code || '-'}] 
            ${e.type} (${eventCounter}) 
            [keyCode:${e.key || '-'}]
            [shift:${e.shiftKey}] 
            [ctrl:${e.ctrlKey}] 
            [alt:${e.altKey}] 
            [meta:${e.metaKey}]
        ;*/
        //logContainer.prepend(logEntry); // Ajoute les nouvelles entrées en haut
	logContainer.innerHTML = `${charInfo}`
    }
});



