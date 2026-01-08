async function deleteproduct(id, des) {
    try {
        let fres = confirm(`Delete ${des}?`)
        if (!fres) return

        const res = await fetch('/api/admin/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productid: id })
        });

        const data = await res.json();
        if (data.success) {
            alert(data.message);
            location.reload();
        }

        else {
            alert("Something went wrong. Please try again.")
            throw new Error(`Server responded with status ${res.status}`);
        }

    } catch (error) {
        alert('Failed to delete the product. Please try again later.');
    }
}


async function deleteall() {
    try {
        const confirmed = confirm("Are you sure you want to delete all the products?");
        if (!confirmed) return;

        const res = await fetch("/api/admin/clear", {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await res.json();
        if (data.success) {
            alert(data.message);
            location.reload();
        }

        else {
            alert("Something went wrong. Please try again.")
            throw new Error(`Server responded with status ${res.status}`);
        }

    } catch (error) {
        alert('Failed to delete all products. Please try again later.');
    }
}