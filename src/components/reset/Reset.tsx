"use client";

import { defaultMenus } from "@/constants";
import { Button } from "../ui/button";

const Reset = () => {
    const HandleReset = (): void => {
        localStorage.setItem("menu", defaultMenus);
        localStorage.removeItem("orders");

        window.location.reload();
    };

    return (
        <Button
            className="text-white my-auto py-3 px-4 bg-red-800 rounded-md hover:bg-zinc-700"
            onClick={HandleReset}
        >
            Reset
        </Button>
    );
};

export default Reset;