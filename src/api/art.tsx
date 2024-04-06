export const fetch_art_by_id = async (id: string) => {
    const res = await fetch(`https://art-alchemy-7302d99f4202.herokuapp.com//api/art/${id}`);
    const data = await res.json();
    return data;
};


export const fetch_art_by_ids = async (ids: string[]) => {
    const res = await fetch("https://art-alchemy-7302d99f4202.herokuapp.com//api/art/ids", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(ids),
		});

    const data = await res.json();

    return data;
}