document
  .getElementById("adminSigninForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailid = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="drip-spinner-sm"></span>';

    try {
      const res = await fetch("/api/admin/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailid, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        window.location.href = "/admin/account";
      } else {
        alert(data.message);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again.");
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
