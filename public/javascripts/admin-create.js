document
  .getElementById("createProductForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let description = document.getElementById("description").value.trim();
    let price = document.getElementById("price").value.trim();
    let fileInput = document.querySelector('input[type="file"]');

    if (name == "" || description == "" || price == "") {
      alert("FILL ALL THE REQUIRED FIELDS.");
    } else if (!fileInput.files || fileInput.files.length === 0) {
      alert("Please upload an image before creating the product.");
    } else {
      const form = e.target;
      const formData = new FormData(form);

      try {
        const res = await fetch("/api/admin/create", {
          method: "POST",
          body: formData,
          credentials: "same-origin",
        });

        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          console.error(await res.text());
          alert("Server error. Try again.");
          return;
        }

        const data = await res.json();

        if (res.ok && data.success) {
          alert(data.message);
          window.location.href = "/admin/account";
        } else {
          alert(data.message || "Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error(error);
        alert("Server error. Try again.");
      }
    }
  });
