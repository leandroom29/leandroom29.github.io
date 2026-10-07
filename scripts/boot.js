(() => {
  const i18n = window.KalosI18n;
  const bootIntro = document.querySelector(".boot-intro");
  const bootRunning = document.querySelector(".boot-running");
  const bootLog = document.querySelector(".boot-log");
  const bootProgress = document.querySelector(".boot-progress");
  const bootProgressFill = document.querySelector(".boot-progress-fill");
  const bootPercentage = document.querySelector("#boot-percentage");
  const bootStatus = document.querySelector("#boot-status");
  const bootLoader = document.querySelector(".boot-loader");
  const bootStage = document.querySelector("#boot-stage");
  const bootAudio = document.querySelector(".boot-audio");
  const bootStartButton = document.querySelector(".boot-start");
  const bootError = document.querySelector(".boot-error");
  const bootFallback = document.querySelector(".boot-fallback");
  const languageSelect = document.querySelector(".language-select");
  const bootPhases = [
    { start: 0, end: 2, title: "boot.powerOnTitle", status: "boot.powerOnStatus", stage: "boot.powerOnStage", message: "boot.powerOnMessage", progressStart: 0, progressEnd: 18 },
    { start: 2, end: 6, title: "boot.fansTitle", status: "boot.fansStatus", stage: "boot.fansStage", message: "boot.fansMessage", progressStart: 18, progressEnd: 53 },
    { start: 6, end: 8, title: "boot.floppyTitle", status: "boot.floppyStatus", stage: "boot.floppyStage", message: "boot.floppyMessage", progressStart: 53, progressEnd: 53, waiting: true },
    { start: 8, end: 9, title: "boot.postTitle", status: "boot.postStatus", stage: "boot.postStage", message: "boot.postMessage", progressStart: 53, progressEnd: 66 },
    { start: 9, end: 11, title: "boot.diskTitle", status: "boot.diskStatus", stage: "boot.diskStage", message: "boot.diskMessage", progressStart: 66, progressEnd: 95 }
  ];
  const bootLoaderFrames = ["_/\\_/\\_", "/\\_/\\_/", "\\_/\\_/_", "/\\_/\\_"];
  let bootFinished = false;
  let bootStarted = false;
  let bootMessageIndex = -1;
  let bootAnimationFrame = 0;

  function addBootMessage(message) {
    const line = document.createElement("li");
    line.textContent = message;
    bootLog.append(line);
  }

  function updateBootProgress() {
    if (!bootStarted || bootFinished) return;
    const elapsed = bootAudio.currentTime;
    const phaseIndex = bootPhases.findIndex((phase) => elapsed < phase.end);
    const currentPhaseIndex = phaseIndex === -1 ? bootPhases.length - 1 : phaseIndex;
    const currentPhase = bootPhases[currentPhaseIndex];
    if (currentPhaseIndex !== bootMessageIndex) {
      bootMessageIndex = currentPhaseIndex;
      addBootMessage(i18n.t(currentPhase.message));
    }
    const phaseProgress = currentPhase.waiting
      ? 0
      : Math.max(0, Math.min(1, (elapsed - currentPhase.start) / (currentPhase.end - currentPhase.start)));
    const progress = elapsed >= 11 && !bootAudio.ended
      ? 95
      : Math.round(currentPhase.progressStart + (currentPhase.progressEnd - currentPhase.progressStart) * phaseProgress);
    bootProgressFill.style.width = `${progress}%`;
    bootProgress.setAttribute("aria-valuenow", String(progress));
    bootPercentage.textContent = `${String(progress).padStart(2, "0")}%`;
    const waitingForDisk = elapsed >= 11 && !bootAudio.ended;
    bootStatus.textContent = waitingForDisk ? i18n.t("boot.waitingDisk") : i18n.t(currentPhase.status);
    bootStage.textContent = `${i18n.t(currentPhase.title)} \u00b7 ${i18n.t(currentPhase.stage)}`;
    bootLoader.hidden = !currentPhase.waiting && !waitingForDisk;
    if (currentPhase.waiting || waitingForDisk) {
      bootLoader.textContent = bootLoaderFrames[Math.floor(elapsed * 9) % bootLoaderFrames.length];
    }
    bootAnimationFrame = window.requestAnimationFrame(updateBootProgress);
  }

  function finishBoot(skipped = false) {
    if (bootFinished) return;
    bootFinished = true;
    window.cancelAnimationFrame(bootAnimationFrame);
    if (skipped) {
      bootAudio.pause();
      if (!bootAudio.error) bootAudio.currentTime = 0;
      addBootMessage(i18n.t("boot.skippedMessage"));
    } else {
      addBootMessage(i18n.t("boot.loadedMessage"));
    }
    bootProgressFill.style.width = "100%";
    bootProgress.setAttribute("aria-valuenow", "100");
    bootPercentage.textContent = "100%";
    bootStatus.textContent = i18n.t(skipped ? "boot.skipped" : "boot.ready");
    bootStage.textContent = i18n.t("boot.readyStage");
    bootLoader.hidden = true;
    window.setTimeout(() => { window.location.href = "./login.html"; }, 220);
  }

  function showBootAudioError(error) {
    if (bootFinished || (!bootStarted && !bootError.hidden)) return;
    bootStarted = false;
    window.cancelAnimationFrame(bootAnimationFrame);
    bootAudio.pause();
    bootRunning.hidden = true;
    bootIntro.hidden = false;
    bootStartButton.disabled = false;
    bootStartButton.textContent = i18n.t("bios.retry");
    bootError.textContent = `${i18n.t("boot.audioError")}: ${error.message || i18n.t("boot.unsupportedAudio")}`;
    bootError.hidden = false;
    bootFallback.hidden = false;
    console.error("Could not start KalOS audio.", error);
  }

  async function startBoot() {
    if (bootStarted || bootFinished) return;
    bootStartButton.disabled = true;
    bootError.hidden = true;
    bootFallback.hidden = true;
    bootError.textContent = "";
    try {
      bootAudio.currentTime = 0;
      await bootAudio.play();
      bootStarted = true;
      bootIntro.hidden = true;
      bootRunning.hidden = false;
      bootStartButton.textContent = i18n.t("bios.start");
      updateBootProgress();
    } catch (error) {
      showBootAudioError(error);
    }
  }

  function continueWithoutAudio() {
    bootError.hidden = true;
    bootFallback.hidden = true;
    bootStarted = true;
    bootIntro.hidden = true;
    bootRunning.hidden = false;
    finishBoot(true);
  }

  bootStartButton.addEventListener("click", startBoot);
  bootAudio.addEventListener("ended", () => finishBoot());
  bootAudio.addEventListener("error", () => {
  showBootAudioError(bootAudio.error || new Error(i18n.t("boot.loadAudioError")));
  });
  bootFallback.addEventListener("click", continueWithoutAudio);
  languageSelect.addEventListener("change", () => i18n.setLanguage(languageSelect.value));
  document.querySelector(".boot-skip").addEventListener("click", () => finishBoot(true));
  document.addEventListener("keydown", (event) => {
    if (!bootStarted && !bootFinished && event.key === "Enter") {
      event.preventDefault();
      startBoot();
    } else if (bootStarted && !bootFinished && event.key === "Escape") {
      event.preventDefault();
      finishBoot(true);
    }
  });
})();
