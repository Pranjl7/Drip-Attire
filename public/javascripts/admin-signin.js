document.getElementById("adminSigninForm").addEventListener("submit", async (e) => {
    e.preventDefault()

    const emailid = document.getElementById("signup-email").value
    const password = document.getElementById("signup-password").value

    const res = await fetch("/api/admin/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailid, password })
    })

    const data = await res.json()

    if (res.ok) {
        alert(data.message)
        window.location.href = "/admin/account"
    } else {
        alert(data.message)
    }
})