"use client";
import clsx from 'clsx'
import Link from "next/link";
import {AlignJustify, BellPlus, BookOpen, DoorClosed, DoorOpen, LayoutDashboard, Loader, MessageCircle, Moon, Plus,
    Search, Settings, SunMedium, User } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Sheet, SheetTrigger, SheetHeader, SheetTitle, SheetContent, SheetFooter, SheetDescription, SheetClose } from "./ui/sheet";
import {usePathname} from "next/navigation";
import {useAuth} from "@/hooks/useAuth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {useState} from "react";
import {Input} from "@/components/ui/input";

const morelinks = [
    {
        id:1,
        title:"Nouveau document",
        href: "/dashboard/newdocument",
    },
    {
        id:2,
        title:"Nouvel article",
        href:"/dashboard/newarticle"
    },
    {
        id:3,
        title:"Nouveau forum",
        href:"/dashboard/newforum"
    },
    {
        id:4,
        title:"Tableau de bord",
        href:"/dashboard"
    },
    {
        id:5,
        title:"Profil",
        href:"/dashboard/profile"
    },
    {
        id:6,
        title:"Paramètres",
        href:"/dashboard/settings"
    }
];

const navlinks = [
    {
        id:1,
        title:"Accueil",
        href: "/",
    },
    {
        id:2,
        title:"Documents",
        href:"/documents"
    },
    {
        id:3,
        title:"Articles",
        href:"/articles"
    },
    {
        id:4,
        title:"A propos",
        href:"/about"
    }
];

export default function Navigation(){

    const {theme, setTheme} = useTheme();
    const pathname = usePathname();
    const {user, signOut, loading} = useAuth();
    const [isSearching, setIsSearching] = useState(false);

    return(
        <nav className="z-[30] w-full sticky top-0 backdrop-blur-sm bg-white/90 dark:bg-neutral-950/90 transition">
            <section className="max-w-[1340px] mx-auto px-2">
                <section className="flex items-center justify-between h-[65px] lg:h-[75px]">
                    <section className="flex items-center gap-5">
                        <Link href="/" className="mx-2 flex items-center gap-0 text-lg md:text-xl lg:text-2xl font-serif">
                            E-BIBLIO
                        </Link>
                        <div className="items-center hidden md:flex">
                            {navlinks.map((nlink, index)=>(
                                <Link
                                    key={index}
                                    href={nlink.href}
                                    className={clsx(pathname == nlink.href ? "text-green-600" : "text-gray-600 dark:text-neutral-50" ,"font-medium hover:text-green-600 dark:hover:text-green-600 px-4 py-1 text-sm lg:text-base")}
                                >
                                    {nlink.title}
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section className="flex items-center gap-3">
                        {/* Modal de la barre de recherche */}
                        {/* <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" className="flex justify-between items-center bg-opacity-80 mx-2 w-full lg:w-[300px] bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                                <span className="flex gap-1 items-center">
                                    <Search size={15}/>
                                    <span className="text-sm hidden xs:block">Rechercher</span>
                                </span>
                                    CTRL + K
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle asChild>
                                        <Input  className="mt-5 placeholder:text-sm" placeholder="Entrez le titre d'un article ou d'un document..." type="search"/>
                                    </DialogTitle>
                                </DialogHeader>
                                <div>
                                    {isSearching ? (
                                        <div>
                                            <DialogDescription>
                                                <Loader size={20} className="animate-spin"/>
                                            </DialogDescription>
                                        </div>
                                    ) : (
                                        <div className="">
                                            <div
                                                className="flex flex-col gap-4 items-center justify-center p-4 border border-dashed border-neutral-400 dark:border-neutral-600 rounded-md">
                                                <Search size={40} className="text-neutral-500"/>
                                                <div>
                                                    Aucune recherche pour l{"'"}instant
                                                </div>
                                            </div>
                                            <div className="text-green-600 text-sm flex justify-end pt-4">
                                                Search by Algolia
                                            </div>
                                        </div>

                                    )}
                                </div>
                            </DialogContent>
                        </Dialog> */}

                        <Button size={"icon"} className="relative rounded-full" variant="ghost" onClick={() => {
                            setTheme(theme === "light" ? "dark" : "light")
                        }}>
                            <SunMedium className="dark:scale-0 scale-100 rotate-45 transition-all dark:rotate-0" size={20}/>
                            <Moon className="absolute dark:scale-100 scale-0 rotate-45 transition-all dark:rotate-0" size={20}/>
                        </Button>
                        <div className="hidden md:flex gap-2">
                            <div className={`text-sm md:text-base flex gap-3 items-center font-medium ${user ? "hidden":"flex"}`}>
                                <Link href={"/signin"} className="text-green-600 hover:text-green-600/90 flex">Se connecter</Link>
                                ●
                                <Link href={"/signup"} className="hover:text-opacity-90">S{"'"}inscrire</Link>
                            </div>
                            <div className={`flex gap-4 ${user ? "flex" : "hidden"}`}>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="px-2 py-2 rounded-full">
                                            <Plus/>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent aria-label="Static Actions" className="rounded-md mr-3 w-[200px]">
                                        <DropdownMenuItem asChild className="rounded-md">
                                            <Link href="/dashboard/newdocument" className="flex gap-2 items-center w-full h-full py-2 cursor-pointer">
                                                <BookOpen size={20}/>
                                                Nouveau document
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild className="rounded-md">
                                            <Link href="/dashboard/newarticle" className="flex gap-2 items-center w-full h-full py-2 cursor-pointer">
                                                <BellPlus size={20}/>
                                                Nouvel article
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild className="rounded-md">
                                            <Link href="/dashboard/newforum" className="flex gap-2 items-center w-full h-full py-2 cursor-pointer">
                                                <MessageCircle size={20}/>
                                                Nouvelle discussion
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="rounded-full">
                                        <Avatar className="hover:bg-opacity-80 flex items-center justify-center">
                                            {loading ? <Loader size={20} className="animate-spin"/> :
                                                user && user?.photoURL === "" || user?.photoURL === undefined || user?.photoURL === null
                                                    ? (
                                                        <AvatarFallback className="font-bold">{user?.displayName?.charAt(0).toUpperCase()}</AvatarFallback>
                                                    ) : (
                                                        <AvatarImage src={user?.photoURL}/>
                                                    )
                                            }
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent aria-label="Static Actions" className="mr-3 rounded-md w-[200px]">
                                        <DropdownMenuLabel className="text-xs line-clamp-2">Connecté en tant que <br /> {user?.email}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="rounded-md" asChild>
                                            <Link href="/dashboard" className="flex gap-2 items-center w-full h-full py-2 cursor-pointer">
                                                <LayoutDashboard size={20}/>
                                                Tableau de bord
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="rounded-md" asChild>
                                            <Link href="/dashboard/profile" className="flex gap-2 items-center w-full h-full py-2 cursor-pointer">
                                                <User size={20}/>
                                                Profil
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="rounded-md" asChild>
                                            <Link href="/dashboard/settings" className="flex gap-2 items-center w-full h-full py-2 cursor-pointer">
                                                <Settings size={20}/>
                                                Paramètres
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="rounded-md text-red-600 hover:text-red-600 flex gap-2 items-center w-full h-full" onClick={()=>{signOut()}} >
                                            <DoorOpen size={20}/>
                                            Se déconnecter
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </section>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="ghost" className="flex md:hidden">
                                <AlignJustify/>
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>ESIAC-BIBLIO</SheetTitle>
                                <SheetDescription>Votre bibliothèque numérique</SheetDescription>
                            </SheetHeader>
                            <div className="flex flex-col gap-3 mt-4">
                                {navlinks.map((navlink) => (
                                    <>
                                        <SheetClose key={navlink.id} asChild>
                                            <Link
                                                href={navlink.href}
                                                className={clsx(pathname == navlink.href ? "text-green-600" : "text-gray-600 dark:text-neutral-50", "font-medium hover:text-green-600 dark:hover:text-green-600 px-4 py-1 text-sm")}>
                                                {navlink.title}
                                            </Link>
                                        </SheetClose>
                                    </>
                                ))}
                            </div>
                            <div className={`flex-col mt-4 gap-3 ${user ? "flex" : "hidden"}`}>
                                {morelinks.map((navlink) => (
                                    <>
                                        <SheetClose key={navlink.id} asChild>
                                            <Link
                                                href={navlink.href}
                                                className={clsx(pathname == navlink.href ? "text-green-600" : "text-gray-600 dark:text-neutral-50", "font-medium hover:text-green-600 dark:hover:text-green-600 px-4 py-1 text-sm")}>
                                                {navlink.title}
                                            </Link>
                                        </SheetClose>
                                    </>
                                ))}
                                <SheetClose>
                                    <button
                                        className="font-medium text-red-600 hover:text-red-400 w-full py-3 text-sm flex justify-start gap-2">
                                        <DoorClosed size={20}/>
                                        Se déconnecter
                                    </button>
                                </SheetClose>
                            </div>
                            <div className={`text-sm flex-col gap-3 font-medium ml-4 mt-3 ${user ? "hidden" : "flex"}`}>
                                <SheetClose asChild>
                                    <Link href={"/signin"} className="text-green-600 hover:text-green-600/90 flex">
                                        Se connecter
                                    </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link href={"/signup"} className="hover:text-opacity-90">
                                        S{"'"}inscrire
                                    </Link>
                                </SheetClose>
                            </div>
                        </SheetContent>
                    </Sheet>
                </section>
            </section>
        </nav>
    )
}