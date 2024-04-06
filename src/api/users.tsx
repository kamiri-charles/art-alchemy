import { UserSignInType, UserSignUpType } from "../assets/utils/custom_types";

export const sign_in_user = async (userData: UserSignInType) => {
    const res = await fetch("https://art-alchemy-7302d99f4202.herokuapp.com//api/users/sign-in", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    return data;
};


export const sign_up_user = async (userData: UserSignUpType) => {
    const res = await fetch("https://art-alchemy-7302d99f4202.herokuapp.com//api/users/sign-up", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    return data;
};