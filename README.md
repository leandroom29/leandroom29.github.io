# Kalos Systems Portfolio

A static portfolio built with HTML, CSS, and JavaScript. Each screen and its logic are separated for easier maintenance:

- `index.html`: BIOS and audio startup.
- `login.html`: demo sign-in screen.
- `desktop.html`: desktop, windows, and projects.
- `styles.css`: shared styles.
- `scripts/boot.js`: startup sequence and navigation to login.
- `scripts/i18n.js`: English/Spanish translations and saved language preference.
- `scripts/login.js`: guest access and navigation to the desktop.
- `scripts/desktop.js`: animated landscape, windows, applications menu, KalGrid console, and simulated system settings.
- `audio/` and `img/`: media assets.

Flow: `index.html` → `login.html` → `desktop.html`. To test locally, serve the folder with any static web server. Relative paths also work on GitHub Pages.

Guest access is a client-side demo, not an authentication system.

Choose English or Spanish from the BIOS language selector. The selection is saved in the browser and applied to the startup sequence, login, desktop, portfolio files, projects, and console.

`kalgrid_cmd.exe` uses a virtual portfolio filesystem and does not run commands on your computer. It supports `cd`, `ls`, `skan`, `pwd`, `clear`, and `help`; `Ctrl+C` exits a text file view. Use quotes around filenames containing spaces, for example `skan "About Me.txt"`. Launch projects from `C:\KALOS\Desktop\Projects` by typing the full filename, such as `Specteon.exe`; `settings.exe` opens the simulated system information, and absolute paths within `C:\KALOS` are also supported.

In Spanish mode, the virtual desktop files and project folder are shown with Spanish names; use the names listed by `ls` when running `skan` or `cd`.
