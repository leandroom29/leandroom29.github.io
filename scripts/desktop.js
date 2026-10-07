(() => {
  const i18n = window.KalosI18n;
  const canvas = document.querySelector(".scene");
  const context = canvas.getContext("2d");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktopArea = document.querySelector(".desktop-area");
  const projectFiles = document.querySelector(".project-files");
  const taskbarApps = document.querySelector(".taskbar-apps");
  const taskbarButtons = new Map();
  const projectApp = document.querySelector('[data-window="project-app"]');
  const startMenu = document.querySelector(".start-menu");
  const startButton = document.querySelector(".taskbar-start");
  const commandWindow = document.querySelector('[data-window="command"]');
  const commandOutput = document.querySelector(".command-output");
  const commandFileView = document.querySelector(".command-file-view");
  const commandFileText = document.querySelector(".command-file-text");
  const commandForm = document.querySelector(".command-form");
  const commandInput = document.querySelector(".command-input");
  const commandPrompt = document.querySelector(".command-prompt");
  const virtualRoot = "C:\\KALOS";
  const desktopPath = `${virtualRoot}\\Desktop`;
  const projectsPath = `${desktopPath}\\${i18n.t("desktop.projects")}`;
  const appPath = `${virtualRoot}\\System\\kalgrid_cmd.exe`;
  const settingsPath = `${virtualRoot}\\System\\settings.exe`;
  const desktopFiles = [
    {
      nameKey: "desktop.aboutFile",
      headingKey: "file.aboutHeading",
      lines: [
        "file.aboutGreeting",
        "file.about1",
        "file.about2",
        "file.about3",
      ],
    },
    {
      nameKey: "desktop.techFile",
      headingKey: "file.techHeading",
      lines: [
        "file.techLanguages",
        "file.techMobile",
        "file.techTools",
        "file.techInterests",
      ],
    },
    {
      nameKey: "desktop.contactFile",
      headingKey: "file.contactHeading",
      lines: ["file.email", "file.github", "file.linkedin"],
    },
  ];
  const virtualDirectories = new Map([
    ["c:\\", "C:\\"],
    [virtualRoot.toLowerCase(), virtualRoot],
    [`${virtualRoot}\\Desktop`.toLowerCase(), desktopPath],
    [projectsPath.toLowerCase(), projectsPath],
    [`${virtualRoot}\\System`.toLowerCase(), `${virtualRoot}\\System`],
  ]);
  const virtualFiles = new Map();
  desktopFiles.forEach((file) => {
    const path = `${desktopPath}\\${i18n.t(file.nameKey)}`;
    virtualFiles.set(path.toLowerCase(), {
      path,
      content: [
        i18n.t(file.headingKey),
        "=".repeat(i18n.t(file.headingKey).length),
        "",
        ...file.lines.map((key) => i18n.t(key)),
      ].join("\n"),
    });
  });
  virtualFiles.set(appPath.toLowerCase(), { path: appPath, type: "command" });
  virtualFiles.set(settingsPath.toLowerCase(), { path: settingsPath, type: "settings" });
  const projectData = [
    {
      name: "Aerythion",
      descriptionKey: "project.aerythionDescription",
      technologies: ["Python", "PySpark", "FastAPI", "PostgreSQL", "Docker", "REST API", "Prometheus" ],
      repository: "https://github.com/leandroom29/aerythion",
    },
    {
      name: "SignEngine",
      descriptionKey: "project.signengineDescription",
      technologies: ["Java", "Spring Boot", "REST API", "PAdES", "TSA", "OCSP/CRL", "PKI"],
      repository: "https://github.com/leandroom29/signengine",
    },
  ];
  projectData.forEach((project) => {
    const path = `${projectsPath}\\${project.name}.exe`;
    virtualFiles.set(path.toLowerCase(), { path, type: "project", project });
  });
  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let stars = [];
  let animationFrame = 0;
  let lastFrameTime = 0;

  let topWindowIndex = 2;
  let openCount = 0;
  let draggingWindow = null;
  let currentDirectory = desktopPath;
  let commandFileOpen = false;

  function canonicalizePath(path) {
    const normalizedInput = path.replaceAll("/", "\\");
    const drive = normalizedInput.match(/^([a-z]):\\/i);
    if (drive && drive[1].toLowerCase() !== "c") return null;
    const isAbsolute =
      /^[a-z]:\\/i.test(normalizedInput) || normalizedInput.startsWith("\\");
    const baseParts = isAbsolute
      ? []
      : currentDirectory === "C:\\"
        ? []
        : currentDirectory.slice(3).split("\\");
    const inputWithoutDrive = normalizedInput
      .replace(/^[a-z]:\\/i, "")
      .replace(/^\\+/, "");
    const parts = [...baseParts];
    inputWithoutDrive.split("\\").forEach((part) => {
      if (!part || part === ".") return;
      if (part === "..") {
        parts.pop();
        return;
      }
      parts.push(part);
    });
    return parts.length ? `C:\\${parts.join("\\")}` : "C:\\";
  }

  function getDirectory(path) {
    return path ? virtualDirectories.get(path.toLowerCase()) || null : null;
  }

  function getFile(path) {
    return path ? virtualFiles.get(path.toLowerCase()) || null : null;
  }

  function getDirectoryEntries(path) {
    const prefix = path === "C:\\" ? "C:\\" : `${path}\\`;
    const childEntries = new Map();
    virtualDirectories.forEach((canonicalPath) => {
      if (
        canonicalPath.toLowerCase() === path.toLowerCase() ||
        !canonicalPath.toLowerCase().startsWith(prefix.toLowerCase())
      )
        return;
      const remainder = canonicalPath.slice(prefix.length);
      if (remainder && !remainder.includes("\\"))
        childEntries.set(`${remainder.toLowerCase()}\\`, `${remainder}\\`);
    });
    virtualFiles.forEach((file) => {
      if (!file.path.toLowerCase().startsWith(prefix.toLowerCase())) return;
      const remainder = file.path.slice(prefix.length);
      if (remainder && !remainder.includes("\\"))
        childEntries.set(remainder.toLowerCase(), remainder);
    });
    return [...childEntries.values()].sort((left, right) =>
      left.localeCompare(right, i18n.language, { sensitivity: "base" }),
    );
  }

  function renderCommandPrompt() {
    commandPrompt.textContent = `${currentDirectory}>`;
  }

  function appendCommandLine(command, result = "", isError = false) {
    const line = document.createElement("div");
    line.className = "command-line";
    if (isError) line.classList.add("is-error");
    const prompt = document.createElement("span");
    prompt.className = "command-prompt-text";
    prompt.textContent = `${currentDirectory}> `;
    const entered = document.createElement("span");
    entered.className = "command-entered";
    entered.textContent = command;
    line.append(prompt, entered);
    commandOutput.append(line);
    if (result) {
      const output = document.createElement("div");
      output.className = isError ? "command-line is-error" : "command-line";
      output.textContent = result;
      commandOutput.append(output);
    }
    commandOutput.scrollTop = commandOutput.scrollHeight;
  }

  function tokenizeCommand(input) {
    return (input.match(/"[^"]*"|'[^']*'|\S+/g) || []).map((token) =>
      token.replace(/^(["'])(.*)\1$/, "$2"),
    );
  }

  function openCommandFile(file) {
    commandFileText.textContent = file.content;
    commandOutput.hidden = true;
    commandForm.hidden = true;
    commandFileView.hidden = false;
    commandFileOpen = true;
  }

  function openExecutable(path) {
    const file = getFile(path);
    if (!file) {
      appendCommandLine(path, i18n.t("cmd.executableNotFound", { path }), true);
      return;
    }
    if (file.type === "command") {
      appendCommandLine(path, i18n.t("cmd.alreadyRunning"));
      openWindow("command");
      return;
    }
    if (file.type === "project") {
      appendCommandLine(
        path,
        i18n.t("cmd.launching", { name: file.project.name }),
      );
      openProject(projectData.indexOf(file.project));
      return;
    }
    if (file.type === "settings") {
      appendCommandLine(path, i18n.t("cmd.launching", { name: "settings" }));
      openWindow("settings");
      return;
    }
    appendCommandLine(path, i18n.t("cmd.notExecutable", { path }), true);
  }

  function runCommand(input) {
    const args = tokenizeCommand(input);
    if (!args.length) return;
    const command = args[0].toLowerCase();
    const argument = args[1];
    if (command === "help") {
      appendCommandLine(
        input,
        [
          i18n.t("cmd.helpTitle"),
          i18n.t("cmd.helpCd"),
          i18n.t("cmd.helpLs"),
          i18n.t("cmd.helpSkan"),
          i18n.t("cmd.helpExe"),
          i18n.t("cmd.helpPwd"),
          i18n.t("cmd.helpClear"),
        ].join("\n"),
      );
      return;
    }
    if (command === "clear") {
      if (args.length > 1) {
        appendCommandLine(input, i18n.t("cmd.usageClear"), true);
        return;
      }
      commandOutput.replaceChildren();
      return;
    }
    if (command === "pwd") {
      appendCommandLine(
        input,
        args.length === 1 ? currentDirectory : i18n.t("cmd.usagePwd"),
        args.length > 1,
      );
      return;
    }
    if (command === "cd") {
      if (args.length > 2) {
        appendCommandLine(input, i18n.t("cmd.usageCd"), true);
        return;
      }
      const destination = getDirectory(
        canonicalizePath(argument || virtualRoot),
      );
      if (!destination) {
        appendCommandLine(
          input,
          i18n.t("cmd.notFoundDirectory", { path: argument || "" }),
          true,
        );
        return;
      }
      appendCommandLine(input);
      currentDirectory = destination;
      renderCommandPrompt();
      return;
    }
    if (command === "ls") {
      if (args.length > 2) {
        appendCommandLine(input, i18n.t("cmd.usageLs"), true);
        return;
      }
      const targetPath = canonicalizePath(argument || ".");
      const targetDirectory = getDirectory(targetPath);
      if (!targetDirectory) {
        appendCommandLine(
          input,
          i18n.t("cmd.notFoundDirectory", { path: argument || "" }),
          true,
        );
        return;
      }
      const entries = getDirectoryEntries(targetDirectory);
      appendCommandLine(
        input,
        entries.length ? entries.join("\n") : i18n.t("cmd.emptyDirectory"),
      );
      return;
    }
    if (command === "skan") {
      if (args.length !== 2) {
        appendCommandLine(input, i18n.t("cmd.usageSkan"), true);
        return;
      }
      const file = getFile(canonicalizePath(argument));
      if (!file || !file.path.toLowerCase().endsWith(".txt")) {
        appendCommandLine(
          input,
          i18n.t("cmd.fileNotFound", { path: argument }),
          true,
        );
        return;
      }
      appendCommandLine(input);
      openCommandFile(file);
      return;
    }
    if (args.length === 1 && command.endsWith(".exe")) {
      const path =
        command === "settings.exe" ? settingsPath : canonicalizePath(args[0]);
      if (
        (path && path.toLowerCase() === appPath.toLowerCase()) ||
        command === "kalgrid_cmd.exe"
      ) {
        appendCommandLine(input);
        openWindow("command");
        return;
      }
      if (path && path.toLowerCase() === settingsPath.toLowerCase()) {
        appendCommandLine(input);
        openWindow("settings");
        return;
      }
      openExecutable(path);
      return;
    }
    appendCommandLine(
      input,
      i18n.t("cmd.notRecognized", { command: args[0] }),
      true,
    );
  }

  function restoreCommandPrompt() {
    if (!commandFileOpen) return;
    commandFileOpen = false;
    commandFileView.hidden = true;
    commandOutput.hidden = false;
    commandForm.hidden = false;
    commandInput.focus();
  }

  function updateTaskbarState() {
    taskbarButtons.forEach((button, desktopWindow) => {
      button.classList.toggle(
        "is-active",
        !desktopWindow.hidden && desktopWindow.classList.contains("is-active"),
      );
      button.setAttribute(
        "aria-pressed",
        String(
          !desktopWindow.hidden &&
            desktopWindow.classList.contains("is-active"),
        ),
      );
    });
  }

  function activateWindow(desktopWindow) {
    topWindowIndex++;
    desktopWindow.style.zIndex = String(topWindowIndex);
    document.querySelectorAll(".desktop-window").forEach((windowElement) => {
      windowElement.classList.toggle(
        "is-active",
        windowElement === desktopWindow,
      );
    });
    updateTaskbarState();
  }

  function ensureTaskbarButton(desktopWindow) {
    let button = taskbarButtons.get(desktopWindow);
    if (button) return button;
    const title = desktopWindow
      .querySelector(".window-title")
      .textContent.split(" — ")[0];
    const icon = document.createElement("span");
    icon.className = "taskbar-app-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent =
      desktopWindow.dataset.window === "projects"
        ? "▰"
        : desktopWindow.dataset.window === "project-app"
          ? "EXE"
          : desktopWindow.dataset.window === "command"
            ? ">_"
            : desktopWindow.dataset.window === "settings"
              ? "CFG"
              : "TXT";
    const label = document.createElement("span");
    label.className = "taskbar-app-label";
    label.textContent = title;
    button = document.createElement("button");
    button.className = "taskbar-app";
    button.type = "button";
    button.title = title;
    button.setAttribute("aria-label", i18n.t("taskbar.show", { title }));
    button.setAttribute("aria-pressed", "false");
    button.append(icon, label);
    button.addEventListener("click", () => {
      if (desktopWindow.hidden) {
        desktopWindow.hidden = false;
        desktopWindow.classList.remove("is-opening");
        void desktopWindow.offsetWidth;
        desktopWindow.classList.add("is-opening");
        activateWindow(desktopWindow);
      } else if (desktopWindow.classList.contains("is-active")) {
        desktopWindow.hidden = true;
        desktopWindow.classList.remove("is-active");
        updateTaskbarState();
      } else {
        activateWindow(desktopWindow);
      }
    });
    taskbarApps.append(button);
    taskbarButtons.set(desktopWindow, button);
    return button;
  }

  function openWindow(name) {
    const desktopWindow = document.querySelector(`[data-window="${name}"]`);
    if (!desktopWindow) return;
    if (desktopWindow.hidden) {
      desktopWindow.hidden = false;
      const maxLeft = Math.max(
        8,
        desktopArea.clientWidth - desktopWindow.offsetWidth - 8,
      );
      const maxTop = Math.max(
        8,
        desktopArea.clientHeight - desktopWindow.offsetHeight - 8,
      );
      const initialLeft = Math.max(
        8,
        Math.min(
          maxLeft,
          Math.round(desktopArea.clientWidth * 0.22) + (openCount % 4) * 18,
        ),
      );
      const initialTop = Math.max(
        8,
        Math.min(maxTop, 18 + (openCount % 4) * 18),
      );
      desktopWindow.style.left = `${initialLeft}px`;
      desktopWindow.style.top = `${initialTop}px`;
      openCount++;
      desktopWindow.classList.remove("is-opening");
      void desktopWindow.offsetWidth;
      desktopWindow.classList.add("is-opening");
    }
    ensureTaskbarButton(desktopWindow);
    activateWindow(desktopWindow);
  }

  function openProject(index) {
    const project = projectData[index];
    if (!project) return;
    document.querySelector("#project-app-title").textContent =
      `${project.name}.exe — ${i18n.t("window.application")}`;
    document.querySelector("[data-project-name]").textContent = project.name;
    document.querySelector("[data-project-description]").textContent = i18n.t(
      project.descriptionKey,
    );
    const technologies = document.querySelector("[data-project-tech]");
    technologies.replaceChildren();
    project.technologies.forEach((technology) => {
      const tag = document.createElement("span");
      tag.textContent = technology;
      technologies.append(tag);
    });
    const repository = document.querySelector("[data-project-repo]");
    const unavailable = document.querySelector(
      "[data-project-repo-unavailable]",
    );
    repository.hidden = !project.repository;
    unavailable.hidden = Boolean(project.repository);
    if (project.repository) repository.href = project.repository;
    const existingTaskbarButton = taskbarButtons.get(projectApp);
    if (existingTaskbarButton) {
      const title = document
        .querySelector("#project-app-title")
        .textContent.split(" — ")[0];
      existingTaskbarButton.title = title;
      existingTaskbarButton.setAttribute(
        "aria-label",
        i18n.t("taskbar.show", { title }),
      );
      existingTaskbarButton.querySelector(".taskbar-app-label").textContent =
        title;
    }
    openWindow("project-app");
  }

  projectData.forEach((project, index) => {
    const fileButton = document.createElement("button");
    fileButton.className = "project-file";
    fileButton.type = "button";
    fileButton.setAttribute(
      "aria-label",
      i18n.t("project.open", { name: project.name }),
    );
    const icon = document.createElement("span");
    icon.className = "exe-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "EXE";
    const copy = document.createElement("span");
    copy.className = "project-file-copy";
    const name = document.createElement("strong");
    name.textContent = `${project.name}.exe`;
    const summary = document.createElement("small");
    summary.textContent = project.technologies.join(" · ");
    copy.append(name, summary);
    fileButton.append(icon, copy);
    fileButton.addEventListener("click", () => openProject(index));
    projectFiles.append(fileButton);
  });

  function setStartMenuOpen(isOpen) {
    startMenu.hidden = !isOpen;
    startButton.setAttribute("aria-expanded", String(isOpen));
  }

  startButton.addEventListener("click", () => {
    setStartMenuOpen(startMenu.hidden);
  });
  document
    .querySelector('[data-start-app="command"]')
    .addEventListener("click", () => {
      setStartMenuOpen(false);
      openWindow("command");
      window.setTimeout(() => commandInput.focus(), 0);
    });
  document
    .querySelector('[data-start-app="settings"]')
    .addEventListener("click", () => {
      setStartMenuOpen(false);
      openWindow("settings");
    });
  document.addEventListener("pointerdown", (event) => {
    if (
      !startMenu.hidden &&
      !startMenu.contains(event.target) &&
      !startButton.contains(event.target)
    ) {
      setStartMenuOpen(false);
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !startMenu.hidden) {
      setStartMenuOpen(false);
      startButton.focus();
    }
    if (event.ctrlKey && event.key.toLowerCase() === "c" && commandFileOpen) {
      event.preventDefault();
      event.stopPropagation();
      restoreCommandPrompt();
    }
  });
  commandForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = commandInput.value.trim();
    commandInput.value = "";
    if (input) runCommand(input);
    if (!commandFileOpen) commandInput.focus();
  });
  commandWindow.addEventListener("pointerdown", (event) => {
    if (!commandFileOpen && event.target.closest(".command-content"))
      commandInput.focus();
  });
  commandOutput.textContent = [
    "KALGRID CMD [version 1.0]",
    i18n.t("cmd.welcome"),
    "",
  ].join("\n");
  renderCommandPrompt();

  document.querySelectorAll(".desktop-icon").forEach((icon) => {
    icon.addEventListener("click", () => openWindow(icon.dataset.open));
  });
  document.querySelectorAll(".desktop-window").forEach((desktopWindow) => {
    desktopWindow.addEventListener("pointerdown", () =>
      activateWindow(desktopWindow),
    );
    desktopWindow
      .querySelector(".window-close")
      .addEventListener("click", () => {
        desktopWindow.hidden = true;
        desktopWindow.classList.remove("is-active");
        const taskbarButton = taskbarButtons.get(desktopWindow);
        if (taskbarButton) {
          taskbarButton.remove();
          taskbarButtons.delete(desktopWindow);
        }
        updateTaskbarState();
      });
    desktopWindow.addEventListener("animationend", (event) => {
      if (event.animationName === "window-open")
        desktopWindow.classList.remove("is-opening");
    });
    const titlebar = desktopWindow.querySelector(".window-titlebar");
    titlebar.addEventListener("pointerdown", (event) => {
      if (event.target.closest(".window-close") || event.button !== 0) return;
      activateWindow(desktopWindow);
      const areaBounds = desktopArea.getBoundingClientRect();
      draggingWindow = {
        element: desktopWindow,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        left: desktopWindow.offsetLeft,
        top: desktopWindow.offsetTop,
        areaBounds,
      };
      titlebar.setPointerCapture(event.pointerId);
      event.preventDefault();
    });
    titlebar.addEventListener("pointermove", (event) => {
      if (
        !draggingWindow ||
        draggingWindow.element !== desktopWindow ||
        draggingWindow.pointerId !== event.pointerId
      )
        return;
      const maxLeft = Math.max(
        0,
        desktopArea.clientWidth - desktopWindow.offsetWidth,
      );
      const maxTop = Math.max(
        0,
        desktopArea.clientHeight - desktopWindow.offsetHeight,
      );
      const left = Math.min(
        maxLeft,
        Math.max(
          0,
          draggingWindow.left + event.clientX - draggingWindow.startX,
        ),
      );
      const top = Math.min(
        maxTop,
        Math.max(0, draggingWindow.top + event.clientY - draggingWindow.startY),
      );
      desktopWindow.style.left = `${left}px`;
      desktopWindow.style.top = `${top}px`;
    });
    const endDrag = (event) => {
      if (
        draggingWindow &&
        draggingWindow.element === desktopWindow &&
        draggingWindow.pointerId === event.pointerId
      ) {
        draggingWindow = null;
      }
    };
    titlebar.addEventListener("pointerup", endDrag);
    titlebar.addEventListener("pointercancel", endDrag);
  });

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    let seed = 121177;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    stars = Array.from({ length: Math.round((width * height) / 4700) }, () => ({
      x: random() * width,
      y: random() * height * 0.48,
      radius: random() * 1.25 + 0.35,
      alpha: random() * 0.58 + 0.18,
    }));
    draw(0);
  }

  function drawSkyline(horizon) {
    const baseline = horizon;
    const buildings = [
      [0.0, 0.08, 0.1],
      [0.07, 0.035, 0.17],
      [0.1, 0.06, 0.09],
      [0.16, 0.035, 0.24],
      [0.2, 0.055, 0.18],
      [0.25, 0.035, 0.31],
      [0.29, 0.045, 0.48],
      [0.33, 0.035, 0.27],
      [0.37, 0.06, 0.4],
      [0.43, 0.035, 0.34],
      [0.47, 0.055, 0.58],
      [0.53, 0.035, 0.72],
      [0.57, 0.045, 0.43],
      [0.62, 0.06, 0.54],
      [0.68, 0.035, 0.35],
      [0.72, 0.05, 0.47],
      [0.78, 0.035, 0.27],
      [0.82, 0.06, 0.39],
      [0.89, 0.035, 0.2],
      [0.93, 0.07, 0.15],
    ];
    context.fillStyle = "#170626";
    context.beginPath();
    context.moveTo(0, baseline);
    for (const [position, buildingWidth, buildingHeight] of buildings) {
      const x = position * width;
      const w = buildingWidth * width;
      const top = baseline - buildingHeight * height * 0.16;
      context.lineTo(x, baseline);
      context.lineTo(x, top + 7);
      context.lineTo(x + w * 0.18, top + 7);
      context.lineTo(x + w * 0.18, top);
      context.lineTo(x + w * 0.34, top);
      context.lineTo(x + w * 0.34, top + 7);
      context.lineTo(x + w * 0.78, top + 7);
      context.lineTo(x + w * 0.78, baseline);
    }
    context.lineTo(width, baseline);
    context.closePath();
    context.fill();

    context.strokeStyle = "rgba(255, 126, 69, .78)";
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(0, baseline);
    context.lineTo(width, baseline);
    context.stroke();
  }

  function draw(time) {
    if (!width || !height) return;
    const vanishingX = width * 0.5;
    const sunRadius = Math.min(width * 0.205, height * 0.235, 180);
    const sunX = vanishingX;
    const sunY = height * 0.355;
    const horizon = sunY + sunRadius + height * 0.025;
    const groundDepth = height - horizon;
    const travel = (time / 1000) * 0.78;
    const phase = travel % 1;
    const rowCount = 26;
    context.clearRect(0, 0, width, height);

    const sky = context.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, "#10051f");
    sky.addColorStop(0.48, "#28103c");
    sky.addColorStop(0.55, "#ae145e");
    sky.addColorStop(0.64, "#321044");
    sky.addColorStop(1, "#10051f");
    context.fillStyle = sky;
    context.fillRect(0, 0, width, height);

    for (const star of stars) {
      context.globalAlpha = star.alpha;
      context.fillStyle = "#ff67d2";
      context.beginPath();
      context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 1;

    const sun = context.createLinearGradient(
      sunX,
      sunY - sunRadius,
      sunX,
      sunY + sunRadius,
    );
    sun.addColorStop(0, "#fff0ad");
    sun.addColorStop(0.34, "#ffc05b");
    sun.addColorStop(0.68, "#ff8048");
    sun.addColorStop(1, "#ff4c91");
    context.save();
    context.shadowColor = "rgba(255, 111, 48, .86)";
    context.shadowBlur = 44;
    context.fillStyle = sun;
    context.beginPath();
    context.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
    context.fill();
    context.restore();
    context.save();
    context.beginPath();
    context.arc(sunX, sunY, sunRadius - 1, 0, Math.PI * 2);
    context.clip();
    const stripeSpacing = Math.max(5, sunRadius * 0.105);
    const stripeHeight = Math.max(2, sunRadius * 0.027);
    const stripeOffset = ((time / 1000) * 13) % stripeSpacing;
    for (
      let stripeY = sunY + sunRadius * 0.16 + stripeOffset;
      stripeY < sunY + sunRadius;
      stripeY += stripeSpacing
    ) {
      const stripe = Math.floor((stripeY - sunY) / stripeSpacing) % 2 === 0;
      context.fillStyle = stripe ? "#c93654" : "#e14b3c";
      context.fillRect(sunX - sunRadius, stripeY, sunRadius * 2, stripeHeight);
    }
    context.restore();

    drawSkyline(horizon);

    const roadHalfWidth = Math.min(width * 0.24, height * 0.34);
    const roadLeftAtBottom = vanishingX - roadHalfWidth;
    const roadRightAtBottom = vanishingX + roadHalfWidth;
    const projectDepth = (unit) => Math.min(1, (unit / rowCount) ** 1.72);
    context.lineWidth = 1;
    for (let index = 1; index <= rowCount; index++) {
      const depth = projectDepth(index + phase);
      const y = horizon + groundDepth * depth;
      const glow = Math.min(1, 0.38 + depth * 0.65);
      context.strokeStyle = `rgba(255, 48, 168, ${glow})`;
      context.shadowColor = "rgba(255, 40, 172, .55)";
      context.shadowBlur = depth > 0.65 ? 7 : 2;
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }
    context.shadowBlur = 0;

    const verticalLines = 30;
    for (let index = -verticalLines; index <= verticalLines; index++) {
      const bottomX = vanishingX + (index / verticalLines) * width * 0.78;
      const isRoadEdge =
        Math.abs(bottomX - roadLeftAtBottom) < 2 ||
        Math.abs(bottomX - roadRightAtBottom) < 2;
      context.strokeStyle = isRoadEdge
        ? "rgba(87, 236, 255, .9)"
        : "rgba(113, 51, 191, .75)";
      context.lineWidth = isRoadEdge ? 1.7 : 0.8;
      context.beginPath();
      context.moveTo(vanishingX, horizon);
      context.lineTo(bottomX, height);
      context.stroke();
    }

    const road = context.createLinearGradient(0, horizon, 0, height);
    road.addColorStop(0, "rgba(26, 8, 40, .96)");
    road.addColorStop(1, "rgba(9, 5, 23, .99)");
    context.fillStyle = road;
    context.beginPath();
    context.moveTo(vanishingX, horizon);
    context.lineTo(roadRightAtBottom, height);
    context.lineTo(roadLeftAtBottom, height);
    context.closePath();
    context.fill();

    context.strokeStyle = "rgba(87, 236, 255, .9)";
    context.lineWidth = 1.8;
    context.shadowColor = "rgba(87, 236, 255, .8)";
    context.shadowBlur = 10;
    context.beginPath();
    context.moveTo(vanishingX, horizon);
    context.lineTo(roadLeftAtBottom, height);
    context.moveTo(vanishingX, horizon);
    context.lineTo(roadRightAtBottom, height);
    context.stroke();

    context.fillStyle = "rgba(255, 246, 211, .95)";
    context.shadowColor = "rgba(255, 246, 211, .9)";
    context.shadowBlur = 13;
    for (let index = 0; index < rowCount; index++) {
      const start = index + phase;
      const end = Math.min(rowCount, start + 0.62);
      const startDepth = projectDepth(start);
      const endDepth = projectDepth(end);
      if (startDepth >= 0.98) continue;
      const startY = horizon + groundDepth * startDepth;
      const endY = horizon + groundDepth * endDepth;
      const startWidth = Math.max(1, 1.5 + 3 * startDepth);
      const endWidth = Math.max(1, 1.5 + 3 * endDepth);
      context.beginPath();
      context.moveTo(vanishingX - startWidth / 2, startY);
      context.lineTo(vanishingX - endWidth / 2, endY);
      context.lineTo(vanishingX + endWidth / 2, endY);
      context.lineTo(vanishingX + startWidth / 2, startY);
      context.closePath();
      context.fill();
    }
    context.shadowBlur = 0;

    if (!reducedMotion.matches) {
      animationFrame = window.requestAnimationFrame(draw);
    }
  }

  function startAnimation() {
    window.cancelAnimationFrame(animationFrame);
    if (reducedMotion.matches) {
      draw(0);
      return;
    }
    lastFrameTime = performance.now();
    animationFrame = window.requestAnimationFrame((time) => {
      const elapsed = time - lastFrameTime;
      if (elapsed >= 16) {
        lastFrameTime = time;
        draw(time);
      } else {
        animationFrame = window.requestAnimationFrame(draw);
      }
    });
  }

  window.addEventListener("resize", resize);
  reducedMotion.addEventListener("change", startAnimation);
  resize();
  startAnimation();
})();
