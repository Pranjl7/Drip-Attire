async function deleteproduct(id, des, btn) {
  let originalContent;
  try {
    let fres = confirm(`Delete ${des}?`);
    if (!fres) return;

    if (btn) {
      originalContent = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<div class="drip-spinner-sm-theme" style="width: 18px; height: 18px;"></div>';
    }

    const res = await fetch("/api/admin/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productid: id }),
    });

    const data = await res.json();
    if (data.success) {
      alert(data.message);
      location.reload();
    } else {
      alert("Something went wrong. Please try again.");
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalContent;
      }
      throw new Error(`Server responded with status ${res.status}`);
    }
  } catch (error) {
    alert("Failed to delete the product. Please try again later.");
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalContent;
    }
  }
}

async function deleteall(btn) {
  let originalContent;
  try {
    const confirmed = confirm(
      "Are you sure you want to delete all the products?",
    );
    if (!confirmed) return;

    if (btn) {
      originalContent = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<span class="drip-spinner-sm"></span>';
    }

    const res = await fetch("/api/admin/clear", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (data.success) {
      alert(data.message);
      location.reload();
    } else {
      alert("Something went wrong. Please try again.");
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalContent;
      }
      throw new Error(`Server responded with status ${res.status}`);
    }
  } catch (error) {
    alert("Failed to delete all products. Please try again later.");
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalContent;
    }
  }
}
