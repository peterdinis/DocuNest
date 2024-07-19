'use client';

import { FC, useState } from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    NavbarMenuItem,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from '@nextui-org/react';
import { FileText } from 'lucide-react';
import ThemeButton from './ThemeButton';
import { useSession, signOut } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Navigation: FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();
    const servicesScroll = () => {
        const serviceSection = document.querySelector(
            '#services',
        ) as unknown as HTMLElement;
        serviceSection.scrollIntoView({
            behavior: 'smooth',
        });
    };

    const pricingScroll = () => {
        const priceSection = document.querySelector(
            '#pricing',
        ) as unknown as HTMLElement;
        priceSection.scrollIntoView({
            behavior: 'smooth',
        });
    };

    const loggedUser = session?.user?.email;

    const logoutUser = () => {
        signOut({
            redirect: false,
        });
        toast.success('Successful logout');
        router.push('/login');
    };

    return (
        <Navbar
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarContent className='sm:hidden' justify='start'>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                />
            </NavbarContent>

            <NavbarContent className='pr-3 sm:hidden' justify='center'>
                <NavbarBrand>
                    <FileText />{' '}
                        <Link className='ml-4 font-bold' href='/'>Docu Nest</Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className='hidden gap-4 sm:flex' justify='center'>
                <NavbarBrand>
                    <FileText />{' '}
                    <Link className='ml-4 font-bold' href='/'>Docu Nest</Link>
                </NavbarBrand>
                {!loggedUser && (
                    <>
                        <NavbarItem className='ml-4'>
                            <Link color='foreground' onClick={servicesScroll}>
                                Services
                            </Link>
                        </NavbarItem>
                        <NavbarItem isActive>
                            <Link onClick={pricingScroll} aria-current='page'>
                                Pricing
                            </Link>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>

            {!loggedUser ? (
                <NavbarContent justify='end'>
                    <NavbarItem className='hidden lg:flex'>
                        <Link href='/login'>Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button
                            id="registerBtn"
                            as={Link}
                            color='warning'
                            href='/register'
                            variant='flat'
                        >
                            Sign Up
                        </Button>
                    </NavbarItem>
                    <NavbarItem>
                        <ThemeButton />
                    </NavbarItem>
                </NavbarContent>
            ) : (
                <NavbarContent justify='end'>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant='bordered'>Profile</Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label='Static Actions'>
                            <DropdownItem>{loggedUser}</DropdownItem>
                            <DropdownItem onClick={logoutUser}>
                                Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            )}

            <NavbarMenu>
                <NavbarMenuItem>
                    <Link href='/login' className='w-full'>
                        Login
                    </Link>
                </NavbarMenuItem>

                <NavbarMenuItem>
                    <Link href='/register' className='w-full'>
                        Register
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
};

export default Navigation;
