document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault()

    const form = e.target
    const formData = new FormData(form)

    if (!formData.get("name") || !formData.get("emailid") || !formData.get("password")) {
        alert("Please fill all required fields")
        return
    }

    try {
        const res = await fetch("/api/user/signup", {
            method: "POST",
            body: formData
        })

        const data = await res.json()

        if (res.ok) {
            alert(data.message)
            form.reset()
            window.location.href = "/"
        } else {
            alert(data.message)
        }

    } catch (error) {
        console.error(error)
        alert("Server error. Please try again.")
    }
})