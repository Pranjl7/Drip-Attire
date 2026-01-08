document.getElementById("userSigninForm").addEventListener("submit", async (e) => {
    e.preventDefault()

    const emailid = document.getElementById("signup-email").value.trim()
    const password = document.getElementById("signup-password").value.trim()

    if (!emailid || !password) {
        alert("Please fill all fields")
        return
    }

    try {
        const res = await fetch("/api/user/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ emailid, password })
        })

        const data = await res.json()

        if (res.ok) {
            alert(data.message)
            window.location.href = "/"
        } else {
            alert(data.message)
        }

    } catch (err) {
        console.error(err)
        alert("Server error. Please try again.")
    }
})