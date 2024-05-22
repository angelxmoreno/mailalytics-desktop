import AppIcon, { MDIIcon } from '@app/components/AppIcon.tsx';
import { FC } from 'react';
import { Link } from 'react-router-dom';

type SidePanelNavLinkProps = { href: string; iconName: MDIIcon; label: string };

const SidePanelNavLink: FC<SidePanelNavLinkProps> = ({ iconName, label, href }) => (
    <li className="nav-item">
        <Link to={href}>
            <a href="#" className="nav-link text-white d-flex" aria-current="page">
                <AppIcon name={iconName} />
                {label}
            </a>
        </Link>
    </li>
);
export default SidePanelNavLink;
