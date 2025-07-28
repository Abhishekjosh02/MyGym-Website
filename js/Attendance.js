function validateCode() {
  const codeInput = document.getElementById('code');
  const errorMsg = document.getElementById('errorMsg');
  const code = codeInput.value.trim();

  if (!/^\d{4}$/.test(code)) {
    errorMsg.textContent = "Please enter a valid 4-digit numeric code.";
    return false;
  }

  errorMsg.textContent = "";
  return true;
}
