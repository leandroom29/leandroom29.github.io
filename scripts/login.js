(() => {
  const i18n = window.KalosI18n;
  const loginForm = document.querySelector(".login-form");
  const loginUser = document.querySelector("#login-user");
  const loginPassword = document.querySelector("#login-password");
  const loginDemoButton = document.querySelector(".login-demo");
  const loginMessage = document.querySelector(".login-message");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let isRedirecting = false;

  function enterDesktop() {
    if (isRedirecting) return;
    isRedirecting = true;
    document.querySelector(".login-screen").classList.add("is-exiting");
    window.setTimeout(() => { window.location.href = "./desktop.html"; }, reducedMotion.matches ? 0 : 320);
  }

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (isRedirecting) return;
    if (loginUser.value !== "guest" || loginPassword.value !== "kalos-84") {
      loginMessage.textContent = i18n.t("login.invalid");
      loginPassword.select();
      return;
    }
    loginMessage.textContent = "";
    enterDesktop();
  });

  loginDemoButton.addEventListener("click", () => {
    if (isRedirecting) return;
    loginMessage.textContent = "";
    [loginUser, loginPassword].forEach((input) => {
      input.classList.remove("is-filling");
      void input.offsetWidth;
    });
    loginUser.value = "guest";
    loginPassword.value = "kalos-84";
    [loginUser, loginPassword].forEach((input) => {
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.classList.add("is-filling");
    });
    window.setTimeout(() => loginForm.requestSubmit(), reducedMotion.matches ? 0 : 320);
  });
})();
