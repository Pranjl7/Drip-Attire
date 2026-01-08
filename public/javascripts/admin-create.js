document.getElementById("createProductForm").addEventListener("submit", async (e) => {
    e.preventDefault()

    let name = document.getElementById("name").value.trim();
    let description = document.getElementById("description").value.trim();
    let price = document.getElementById("price").value.trim();
    let fileInput = document.querySelector('input[type="file"]')

    if (name == '' || description == '' || price == '') {
        alert("FILL ALL THE REQUIRED FIELDS.");
    }
    else if (!fileInput.files || fileInput.files.length === 0) {
        alert("Please upload an image before creating the product.")
    }
    else {

        const form = e.target
        const formData = new FormData(form)

        try {
            const res = await fetch("/api/admin/create", {
                method: "POST",
                body: formData
            })

            const data = await res.json()

            if (res.ok) {
                alert(data.message)
                window.location.href = "/admin/account"
            } else {
                alert(data.message)
            }

        } catch (error) {
            alert("Server error. Try again.")
            console.error(error)
        }
    }
})