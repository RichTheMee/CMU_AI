# CMU_AI
Code repo for the CMU project, hosting .js and storing other code banks. 


## popu.js files
A self-contained script that, on specified LMS pages:
 - Reads page context (URL, title, main content) and encodes it into an iframe URL.
 - Injects configurable CSS for a bottom-right callout button and a draggable, resizable panel.
 - Builds the UI: a floating “Open Module” button, a header drag-handle, minimise/close controls, and the iframe.
 - Implements behaviour: opening/closing, minimise toggle, and click-and-drag repositioning.
 - Initialises only on matching URLs (e.g. Moodle “mod”/“book” or Canvas assignments/pages/modules) so it doesn’t load site-wide.
 
### Embed codes:
Script2.js in Moodle
<script defer src="https://cdn.jsdelivr.net/gh/RichTheMee/CMU_AI@main/popup_script2.js"></script>

### Next steps
Set up a module for both canvas and moodle that pulls the page content to send to the chatbot. 
These should be terms that are defined in both .js and .gs in google script
Google script should be directed on how to handle these parameters 
  - Which get sent to OpenAI?
  - Which get injected into the original prompte?
  - Can it pull username?
Duplicate and restyle the google script bot to be leaner and better suited to the popup iframe
Converting HTML to Markdown for AI Consumption
 - Use a lightweight HTML-to-Markdown library (e.g. Turndown) in your popup script to transform the page’s lesson HTML into clean Markdown. Then wrap that Markdown, along with metadata like pageUrl and pageTitle, in a JSON payload and send it as the user prompt to your OpenAI endpoint. This ensures your AI sees only the structured lesson content—no surrounding LMS chrome—so it can generate focused, context-aware responses.

### Maybe dreams
A modular JavaScript solution that injects a draggable, resizable iframe “chat” panel into specified LMS pages.
 - Core logic (core.js): handles styling, element creation, drag-and-resize behaviour and config.
 - Wrappers (wrapper-moodle.js & wrapper-canvas.js): detect LMS-specific URL patterns and supply page-specific parameters (course ID, page title) to the core.
 - Build output (build/popup-moodle.js & build/popup-canvas.js): concatenated, self-executing bundles you include via a single <script> tag in each LMS.
