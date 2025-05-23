export const fetch_art_by_id = async (id: string) => {
    const res = await fetch(`https://art-alchemy-backend.onrender.com/api/art/${id}`);
    const data = await res.json();
    return data;
};


export const fetch_art_image_data = async (id: string) => {
    const res = await fetch(`https://art-alchemy-backend.onrender.com/api/art/${id}/images`);
		const data = await res.json();
		return data;
}