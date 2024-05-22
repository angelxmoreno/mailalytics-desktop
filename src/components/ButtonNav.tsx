import { FC } from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

type ButtonNavProps = Omit<ButtonProps, 'onClick'> & { href: string };
const ButtonNav: FC<ButtonNavProps> = ({ href, ...rest }) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate(href);
    };

    return <Button onClick={handleNavigation} {...rest} />;
};

export default ButtonNav;
