---
description: How to run the app in an iOS Simulator
---

Since this is a Progressive Web App (PWA), you have two main ways to simulate an iPhone experience on your Mac.

## Option 1: Chrome DevTools (Easiest)
This simulates the screen size and touch events of an iPhone.

1.  Open the app in Google Chrome (`http://localhost:5173`).
2.  Right-click anywhere on the page and select **Inspect**.
3.  Click the **Device Toggle Toolbar** icon (looks like a phone/tablet) in the top-left of the DevTools panel (or press `Cmd + Shift + M`).
4.  Select **iPhone 12 Pro** (or similar) from the dropdown menu at the top.
5.  Refresh the page to ensure mobile styles load correctly.

## Option 2: Xcode Simulator (Native Experience)
If you have Xcode installed, you can run a real iOS Simulator.

1.  Open **Xcode** from your Applications.
2.  Go to **Xcode > Open Developer Tool > Simulator**.
3.  Wait for the simulated iPhone to boot up.
4.  Open **Safari** inside the Simulator.
5.  Navigate to `http://localhost:5173`.
    *   *Note: You might need to use your computer's local IP address (e.g., `http://192.168.1.x:5173`) if localhost doesn't work immediately.*
6.  Tap the **Share** button (bottom center).
7.  Tap **Add to Home Screen**.
8.  Launch the app from the home screen to see the full PWA experience.
