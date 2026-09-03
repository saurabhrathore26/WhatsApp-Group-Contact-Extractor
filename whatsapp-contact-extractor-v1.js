/**
 * WhatsApp Group Contact Extractor
 * Automatically scrolls and extracts members from the WhatsApp Web group modal.
 */

let collectedData = new Map(); 
console.log("%c Auto-Collector initialized! Hands off the mouse...", "color: green; font-size: 16px; font-weight: bold;");

let noNewContactsCount = 0;
let maxRetries = 40; 

let dialog = document.querySelector('div[role="dialog"]');
let scrollableContainer = Array.from(dialog.querySelectorAll('div')).find(el => {
    let style = window.getComputedStyle(el);
    return (style.overflowY === 'scroll' || style.overflowY === 'auto') && el.scrollHeight > el.clientHeight;
});

if (!scrollableContainer) {
    console.log("%c Error: Could not find the scrollable list. Please ensure the 'Search members' modal is open.", "color: red;");
} else {
    let collector = setInterval(() => {
        let elements = dialog.querySelectorAll('span[dir="auto"]');
        let addedThisTick = 0;
        
        let recentName = "Unknown";
        elements.forEach(el => {
            let text = el.innerText.trim();
            
            if(text.length > 2 && text !== "admin" && text !== "Group admin" && text !== "Search contacts") {
                if (/^\+?\d[\d\s-]{8,}$/.test(text)) {
                    if (!collectedData.has(text)) {
                        collectedData.set(text, recentName);
                        addedThisTick++;
                    }
                    recentName = "Unknown"; 
                } else {
                    recentName = text;
                }
            }
        });
        
        if(addedThisTick > 0) {
            console.log(`Collected ${collectedData.size} unique numbers...`);
            noNewContactsCount = 0; 
        } else {
            noNewContactsCount++;
            console.log(`Waiting for server pagination... (${noNewContactsCount}/${maxRetries})`);
        }

        // Move scrollbar and dispatch event to wake up React's Virtual DOM
        scrollableContainer.scrollTop += 250;
        scrollableContainer.dispatchEvent(new Event('scroll', { bubbles: true }));

        if (noNewContactsCount >= maxRetries) {
            clearInterval(collector);
            console.log("%c Reached the bottom. Generating CSV...", "color: blue; font-size: 14px; font-weight: bold;");
            downloadContacts();
        }
    }, 500); 
}

window.downloadContacts = function() {
    let csvContent = "Name,Phone Number\n";
    
    collectedData.forEach((name, number) => {
        let safeName = name.replace(/,/g, ''); 
        csvContent += `${safeName},${number}\n`;
    });
    
    let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "whatsapp_group_contacts.csv");
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); 
}