import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import { NavLink, Outlet, type NavLinkProps } from 'react-router';

export default function Component() {
  return (
    <div className="container mx-auto p-4 prose flex flex-col gap-4">
      <h1>
        SSR Date Hydrations using <code>Intl.DateTimeFormat</code>
      </h1>
      <NavMenu>
        <MenuLink to="/">Home</MenuLink>
        <MenuLink to="/with-fix">With Fix</MenuLink>
      </NavMenu>

      <Outlet />
    </div>
  );
}

function NavMenu({ children }: PropsWithChildren<{}>) {
  return (
    <nav>
      <ul className="flex flex-row gap-2 list-none m-0 p-0">{children}</ul>
    </nav>
  );
}

function MenuLink({ className, ...rest }: NavLinkProps) {
  return (
    <li className="m-0 p-0">
      <NavLink
        reloadDocument
        className={({ isActive }) =>
          clsx(
            'text-blue-500',
            isActive && 'decoration-2',
            !isActive && 'decoration-[0.5px]',
            className
          )
        }
        {...rest}
      />
    </li>
  );
}
