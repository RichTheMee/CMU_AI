# CMU_AI
Code repo for the CMU project, hosting .js and storing other code banks. 

## Embed codes:
Script2.js in Moodle
<script defer src="https://cdn.jsdelivr.net/gh/RichTheMee/CMU_AI@main/popup_script2.js"></script>

## Next steps
Set up a module for both canvas and moodle that pulls the page content to send to the chatbot. 
These should be terms that are defined in both .js and .gs in google script
Google script should be directed on how to handle these parameters 
  - Which get sent to OpenAI?
  - Which get injected into the original prompte?
  - Can it pull username?
Duplicate and restyle the google script bot to be leaner and better suited to the popup iframe 

## Maybe dreams
A modular JavaScript solution that injects a draggable, resizable iframe “chat” panel into specified LMS pages.
	•	Core logic (core.js): handles styling, element creation, drag-and-resize behaviour and config.
	•	Wrappers (wrapper-moodle.js & wrapper-canvas.js): detect LMS-specific URL patterns and supply page-specific parameters (course ID, page title) to the core.
	•	Build output (build/popup-moodle.js & build/popup-canvas.js): concatenated, self-executing bundles you include via a single <script> tag in each LMS.
