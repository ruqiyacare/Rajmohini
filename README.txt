Gadget Valley - Static HTML/CSS/JS conversion

Files:
- index.html
- style.css
- script.js
- images/

This version removes Next.js/React/Vite/TypeScript from the frontend and keeps:
- responsive layout
- product gallery switching
- size selection
- quantity controls
- countdown
- order notification popup
- tabs
- FAQ accordion
- client-side order success screen

Important:
The original React form only displayed a success screen; it did not send an actual WooCommerce order.
This converted version keeps that behavior. For Meta Ads -> landing page -> WooCommerce order creation, connect the form to your WooCommerce endpoint/API after choosing the desired integration.
