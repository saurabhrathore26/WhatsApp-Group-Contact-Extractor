# WhatsApp Group Contact Extractor

A vanilla JavaScript utility to safely extract member names and phone numbers from large WhatsApp Web groups. 

This script bypasses the limitations of WhatsApp's React-based virtualized DOM by simulating physical scroll events and packaging the extracted data into a clean, Blob-generated CSV file.

## Features
* **Bypasses Virtualized Lists:** Dispatches native React scroll events to force the browser to render all contacts in groups with 500+ members.
* **Auto-Scrolling:** Mechanically scrolls through the modal, requiring zero manual intervention.
* **Smart Parsing:** Automatically pairs phone numbers with their respective profile names into a two-column layout.
* **Data Integrity (Blob Export):** Uses Blob objects to generate the CSV, preventing data truncation caused by hashtags (`#`), commas, or emojis in user profiles.
* **Zero Dependencies:** Runs natively in the Chromium/Firefox Developer Console. No extensions or API keys required.

## How to Use

1. Open [WhatsApp Web](https://web.whatsapp.com/) in your browser and log in.
2. Navigate to the target group.
3. Click the group name at the top to open the right-side info panel, then click **View all** under the members list to open the "Search members" modal.
4. Open the Developer Console (`F12` or `Ctrl + Shift + J` / `Cmd + Option + J`).
   * *Note: If your browser blocks pasting, type `allow pasting` and press Enter.*
5. Copy the contents of `extractor.js` and paste it into the console.
6. Press **Enter**. 

The script will automatically begin scrolling through the modal. Do not interact with the mouse or close the modal while it runs. Once it detects the absolute bottom of the list, it will automatically download a file named `whatsapp_contacts_flawless.csv`.

## Disclaimer & Fair Use
This script is intended for personal and educational use, specifically for community administrators managing their own groups. It operates entirely client-side and does not interface with WhatsApp's official API. Users are responsible for complying with WhatsApp's Terms of Service and respecting user privacy when handling exported phone numbers.

## License
Distributed under the MIT License. See `LICENSE` for more information.