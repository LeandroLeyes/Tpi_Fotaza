function verPassword(inputId, iconId) {
  const passwordInput = document.getElementById(inputId);
  const toggleIcon = document.getElementById(iconId);

  if (!passwordInput || !toggleIcon) return;

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.classList.remove("bi-eye-slash");
    toggleIcon.classList.add("bi-eye");
  } else {
    passwordInput.type = "password";
    toggleIcon.classList.remove("bi-eye");
    toggleIcon.classList.add("bi-eye-slash");
  }
}
