async function addtocart(id, btn) {
  if (!btn) return;
  const originalContent = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<div class="drip-spinner-sm-theme"></div>';

  try {
    let res = await fetch("/api/user/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productid: id }),
    });

    let data = await res.json();
    if (!data.success) {
      alert(data.message);
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("Something went wrong. Please try again.");
  } finally {
    btn.disabled = false;
    btn.innerHTML = originalContent;
  }
}
