import { redirect } from "next/navigation";
import UserAuth from "./userAuth";
import React from "react";

interface ProtectedProps{
    children: React.ReactNode;
}

export default function UserProtected({children}: ProtectedProps){
    const isAuthenticated = UserAuth();

    return isAuthenticated ? children : redirect("/login");
}