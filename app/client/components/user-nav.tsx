import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useCookies } from "react-cookie";
import avatar from "../public/avatar.png";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import { useLogOutQuery } from "@/lib/redux/features/auth/authApi";
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'
import UserAuth from './security/userAuth';



type Props = {
  user: { avatar: { url: any }, name: string, email: string, user: string }
}

export function UserNav({ user }: Props) {
  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);

  const [log, setLog] = useState("");


  const [logout, setLogout] = useState(false);

  const logi = useLogOutQuery(undefined, {

    skip: !logout ? true : false,

  });
  const getcookie = (name: any) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {return parts}
  }
  const handleContentChange = () => {
    setLogout(true)
    console.log("Logout")
    router.push("/login")
    toast.success('Lougout Successfully')
  };
  const isAuthenticated = UserAuth();
  useEffect(() => {
    
    console.log("Cookies", Cookies.get('access_token'))
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={user.avatar ? user.avatar.url : "/avatar.png"} alt='@avatar' />
            <AvatarFallback>EN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{user.name}</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/profile"}>Settings</Link>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className='' onClick={() => handleContentChange()}>Log out</button>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


function removeCookie(arg0: string, arg1: { path: string; domain: string; }) {
  throw new Error('Function not implemented.');
}
