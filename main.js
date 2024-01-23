const complatePassword = (password, confirmPassword) => {
  if (password === confirmPassword) return true;
  return false;
};

const collectFormData = (target) => {
  return {
    fullname: target.querySelector("#fullname").value,
    email: target.querySelector("#email").value,
    status: target.querySelector("#status").value,
    username: target.querySelector("#username").value,
    password: target.querySelector("#password").value,
    confirmPassword: target.querySelector("#confirm__password").value,
  };
};

const sendDataToServer = (data) => {
  fetch("http://localhost:3000/registration", {
    method: "post",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => console.log("success", data))
    .catch((err) => console.error("Error", err));
};

document.querySelector("#registration").addEventListener("submit", (e) => {
  e.preventDefault();

  let target = e.target;

  let passwordInput = target.querySelector("#password").value;
  let confirmPasswordInput = target.querySelector("#confirm__password").value;

  let confirmPasswordLabel = target.querySelector("#confirm__password__label");
  let errorSpan = confirmPasswordLabel.querySelector(".error__message");

  if (!complatePassword(passwordInput, confirmPasswordInput)) {
    errorSpan.textContent = "Passwords did not match";
    errorSpan.classList.add("visible");
  } else {
    errorSpan.textContent = "";
    errorSpan.classList.remove("visible");
  }

  const data = collectFormData(target);
  sendDataToServer(data);
});
