const clearCart = document.getElementById("clearcart");
const checkoutBtn = document.getElementById("checkout-btn");
const emptyCart = document.getElementById("empty-cart");
const msgBox = document.getElementById("msg-box");
const msg = document.getElementById("cart-msg");
const cartBlock = document.getElementById("cart-block");
const template = document.getElementById("cart-item");

async function loadCart() {
  const response = await fetch("/api/user/cart");
  const data = await response.json();

  cartBlock.innerHTML = "";
  cartBlock.appendChild(template);

  emptyCart.classList.add("hidden");
  msgBox.classList.add("hidden");
  clearCart.classList.add("hidden");
  checkoutBtn.classList.add("hidden");

  if (!response.ok) {
    msgBox.classList.remove("hidden");
    msgBox.classList.add("flex");
    msg.innerText = "Signin to Access Cart!";
    return;
  }

  const user = data.message;
  const cart = user.cart;

  if (cart.length === 0) {
    cartBlock.classList.add("hidden");
    clearCart.classList.add("hidden");
    checkoutBtn.classList.add("hidden");

    document.getElementById("subtotal").innerText = "₹0.00";
    document.getElementById("delivery").innerText = "₹0.00";
    document.getElementById("total").innerText = "₹0.00";

    emptyCart.classList.remove("hidden");
    emptyCart.classList.add("flex");
    return;
  }

  cartBlock.classList.remove("hidden");
  cartBlock.classList.add("flex");
  clearCart.classList.remove("hidden");
  checkoutBtn.classList.remove("hidden");

  let visited = [];
  let subtotal = 0;

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    subtotal += item.price;

    if (visited.includes(item._id)) continue;
    visited.push(item._id);

    let qty = 0;
    let total = 0;

    for (let j = 0; j < cart.length; j++) {
      if (cart[j]._id === item._id) {
        qty++;
        total += cart[j].price;
      }
    }

    const node = template.cloneNode(true);
    node.classList.remove("hidden");
    node.classList.add("flex");

    node.querySelector("#cart-image").src = item.image;
    node.querySelector("#cart-desc").innerText = item.description;
    node.querySelector("#cart-name").innerText = item.name;
    node.querySelector("#cart-price").innerText = `₹${total}.00`;
    node.querySelector("#cart-qty").innerText = qty;

    node
      .querySelector(".plus-btn")
      ?.addEventListener("click", (e) => addbtn(item._id, e.currentTarget));
    node
      .querySelector(".minus-btn")
      ?.addEventListener("click", (e) => subbtn(item._id, e.currentTarget));
    node
      .querySelector(".delete-btn")
      ?.addEventListener("click", (e) => delproduct(item._id, e.currentTarget));

    cartBlock.appendChild(node);
  }

  const delivery = cart.length === 0 ? 0 : 100;
  document.getElementById("subtotal").innerText = `₹${subtotal}.00`;
  document.getElementById("delivery").innerText = `₹${delivery}.00`;
  document.getElementById("total").innerText = `₹${subtotal + delivery}.00`;
}

async function subbtn(id, btn) {
  if (!btn) return;
  const originalContent = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<div class="drip-spinner-sm-theme" style="width: 14px; height: 14px; border-width: 1.5px;"></div>';

  try {
    let res = await fetch(`/api/user/cart/decreement`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productid: id }),
    });

    let data = await res.json();
    if (!data.success) {
      alert(data.message);
      btn.disabled = false;
      btn.innerHTML = originalContent;
    } else {
      await loadCart();
    }
  } catch (error) {
    alert("Press One At a Time.");
    btn.disabled = false;
    btn.innerHTML = originalContent;
  }
}

async function addbtn(id, btn) {
  if (!btn) return;
  const originalContent = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<div class="drip-spinner-sm-theme" style="width: 14px; height: 14px; border-width: 1.5px;"></div>';

  try {
    let res = await fetch(`/api/user/cart/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productid: id }),
    });

    let data = await res.json();
    if (!data.success) {
      alert(data.message);
      btn.disabled = false;
      btn.innerHTML = originalContent;
    } else {
      await loadCart();
    }
  } catch (error) {
    alert("Press One At a Time.");
    btn.disabled = false;
    btn.innerHTML = originalContent;
  }
}

async function delproduct(id, btn) {
  if (!btn) return;
  const originalContent = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<div class="drip-spinner-sm-theme" style="width: 16px; height: 16px; border-width: 2px;"></div>';

  try {
    let res = await fetch("/api/user/cart/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productid: id }),
    });

    let data = await res.json();
    if (!data.success) {
      alert(data.message);
      btn.disabled = false;
      btn.innerHTML = originalContent;
    } else {
      await loadCart();
    }
  } catch (error) {
    alert("Something went wrong. Please try again.");
    btn.disabled = false;
    btn.innerHTML = originalContent;
  }
}

document.getElementById("clearcart").addEventListener("click", async (e) => {
  try {
    let result = confirm("All Products Will Be Deleted.");
    if (result) {
      const clearBtn = e.currentTarget;
      const originalText = clearBtn.innerHTML;
      clearBtn.disabled = true;
      clearBtn.innerHTML = '<span class="drip-spinner-sm"></span>';

      try {
        let res = await fetch("/api/user/cart/clear", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        let data = await res.json();

        if (!data.success) {
          alert(data.message);
        } else {
          await loadCart();
        }
      } finally {
        clearBtn.disabled = false;
        clearBtn.innerHTML = originalText;
      }
    }
  } catch (error) {
    alert("Something went wrong. Please try again.");
  }
});

loadCart();
