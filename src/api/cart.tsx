export const fetch_user_cart = async (id: string) => {
    const res = await fetch(`https://art-alchemy-backend.onrender.com/api/cart/${id}`);
    const data = await res.json();
    return data;
}

export const fetch_user_cart_total = async (id: string) => {
    const res = await fetch(`https://art-alchemy-backend.onrender.com/api/cart/${id}/count`);
    const data = await res.json();
    return data;
}

