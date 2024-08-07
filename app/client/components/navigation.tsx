"use client"
import React, { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { useMedia } from 'react-use';
import { NavButton } from '@/components/nav-button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button';
import { CgMenuLeft } from "react-icons/cg";
import { Logo } from '@/components/Logo';
import { navbarRoutes as routes } from '@/config/route.config';


type Props = {}

export const Navigation = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();
    const pathname = usePathname();
    const isMobile = useMedia("(max-width: 1024px)", false);
    const onClick = (href: string) => {
        router.push(href);
        setIsOpen(false);
    }

    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger>
                    <Button
                        variant="outline"
                        size="sm"
                        className="font-normal bg-white/10 border-none outline-none text-white
                    hover:bg-white/20 hover:text-white 
                    focus-visible:ring-offset-0 focus-visible:ring-transparent  focus:bg-white/30 transition"
                    >
                        <CgMenuLeft className='size-4' />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="px-2">
                    <div className='flex items-center gap-x-2'>
                      <Logo fill='#1d4ed8' />
                      <p className='font-bold text-2xl bg-gradient-to-r from-blue-700 to-blue-500 text-transparent bg-clip-text'>BiFinance</p>
                    </div>
                    
                    <nav className='flex flex-col gap-y-2 pt-6'>
                        {
                            routes.map((route, index) => (
                                <Button
                                    key={index}
                                    variant={route.href === pathname ? "secondary" : "ghost"}
                                    onClick={() => onClick(route.href)}
                                    className='w-full justify-start'
                                >
                                    {route.label}
                                </Button>
                            ))
                        }
                    </nav>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <nav className='hidden lg:flex items-center gap-x-2 overflow-x-auto'>
            {
                routes.map((route, index) => (
                    <NavButton
                        key={index}
                        label={route.label}
                        href={route.href}
                        isActive={pathname === route.href}
                    />
                ))
            }

        </nav>

    );
}
