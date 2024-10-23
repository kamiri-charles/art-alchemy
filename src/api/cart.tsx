export const fetch_user_cart = async (id: string) => {
    const res = await fetch(`https://art-alchemy-7302d99f4202.herokuapp.com/api/cart/${id}`);
    const data = await res.json();
    return data;
}

export const fetch_user_cart_total = async (id: string) => {
    const res = await fetch(`https://art-alchemy-7302d99f4202.herokuapp.com/api/cart/${id}/total`);
    const data = await res.json();
    return data;
}

