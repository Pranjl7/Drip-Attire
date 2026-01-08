async function addtocart(id) {
    try {
        let res = await fetch("/api/user/cart/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productid: id })
        })

        let data = await res.json()
        if (!data.success) {
            alert(data.message)
        }

        else {
            alert(data.message)
        }

    } catch (error) {
        alert("Something went wrong. Please try again.")
    }

}