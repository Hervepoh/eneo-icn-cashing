"use client"
import React from 'react'
import Image from "next/image";
import { cn } from '@/lib/utils';
import { style } from '@/config/layout.config';
import ThemeSwitcher from '@/components/theme-switcher';
import LanguageSwitcher from '@/components/language-switcher';
import Metadata from '@/components/metadata';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type Props = {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
    const { user } = useSelector((state: any) => state.auth);  // redux state
    const router = useRouter();
    if (user) {
        router.back();
        return 
    }

    return (
        <>
            <Metadata
                title="ICN CASHING"
                description="Plateforme moderne et sécurisée de gestion des avis de credit internes (ACI)"
                keywords="Prograaming,MERN,Redux,Machine Learning"
            />
            <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
                {/** First Column of the grid */}
                <div className="h-full lg:flex flex-col items-center justify-center px-4">
                    {children}
                </div>
                {/** Second Column of the grid */}
                <div className={cn(
                    "h-full hidden lg:flex items-center justify-center",
                    style.linearGradiant,
                    "dark:bg-lime-700"
                )}>
                    <Image src="/logo_eneo.png" alt="logo" height={500} width={500} />
                </div>
                <div className='absolute flex right-5 top-5'>
                    <ThemeSwitcher />
                </div>
                <div className='absolute flex right-5 bottom-5'>
                    <LanguageSwitcher />
                </div>
            </div>
        </>

    );
}