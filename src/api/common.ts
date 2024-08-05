export async function doGet(url: string) {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return await response.json();
}

export async function doPost(url: string, payload: Record<string, any>) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return await response.json();
}
