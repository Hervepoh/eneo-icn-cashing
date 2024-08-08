import React from "react"
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";

import { cn } from "@/lib/utils";
import { useLoadUserQuery } from "@/lib/redux/features/api/apiSlice";
import { style } from "@/config/layout.config";

import { Filters } from "@/components/filters";
import { HeaderLogo } from "@/components/header-logo";
import { Navigation } from "@/components/navigation";
import { WelcomeMsg } from "@/components/welcome-msg";
import ThemeSwitcher from "@/components/theme-switcher";
import Security from "@/components/security";
import avatar from "../public/avatar.png";
import { useSelector } from "react-redux";
import LocaleToggler from "./locale-toggler";


type Props = {}

export const Header = ({ }: Props) => {
    const { user } = useSelector((state: any) => state.auth);  // redux state

    return (
            <header className={cn(
                "px-4 py-8 pb-36  lg:px-14",
                style.linearGradiant,
                "dark:bg-lime-700"
            )}>
                <div className="max-w-screen-2xl mx-auto">
                    <div className="w-full flex items-center justify-between mb-14">
                        <div className="hidden lg:flex items-center  lg:gap-x-16">
                            <HeaderLogo />
                        </div>
                        <Navigation />
                        <div className="flex items-center justify-center">
                            <LocaleToggler />
                            <ThemeSwitcher />
                            {user ? (
                                <Link href={"/profile"}>
                                    <Image
                                        src={user.avatar ? user.avatar.url : avatar}
                                        alt=""
                                        width={30}
                                        height={30}
                                        className="w-[30px] h-[30px] rounded-full cursor-pointer"
                                    />
                                </Link>
                            ) : (
                                <HiOutlineUserCircle
                                    size={25}
                                    className="hidden 800px:block cursor-pointer dark:text-white text-black"
                                    onClick={() => ""}
                                />
                            )}
                        </div>

                    </div>
                    <div className="flex flex-col lg:flex-row items-center lg:justify-between">
                    <WelcomeMsg />
                    <Filters />
                    </div>
                </div>
            </header>
    );
}
