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
} from '@nextui-org/react';
import { FileText } from 'lucide-react';
import ThemeButton from './ThemeButton';

const Navigation: FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                    <span className='ml-4 font-bold'>Docu Nest</span>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className='hidden gap-4 sm:flex' justify='center'>
                <NavbarBrand>
                    <FileText />{' '}
                    <span className='ml-4 font-bold'>Docu Nest</span>
                </NavbarBrand>
                <NavbarItem className='ml-4'>
                    <Link color='foreground' href='#'>
                        Services
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href='#' aria-current='page'>
                        Pricing
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify='end'>
                <NavbarItem className='hidden lg:flex'>
                    <Link href='#'>Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color='warning' href='#' variant='flat'>
                        Sign Up
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <ThemeButton />
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                <NavbarMenuItem>
                    <Link className='w-full'>Services</Link>
                </NavbarMenuItem>

                <NavbarMenuItem>
                    <Link className='w-full'>Pricing</Link>
                </NavbarMenuItem>

                <NavbarMenuItem>
                    <Link className='w-full'>Login</Link>
                </NavbarMenuItem>

                <NavbarMenuItem>
                    <Link className='w-full'>Register</Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
};

export default Navigation;
