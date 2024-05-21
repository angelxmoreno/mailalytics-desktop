import * as mdiIcons from '@mdi/js';
import Icon from '@mdi/react';
import { IconProps } from '@mdi/react/dist/IconProps';
import { FC } from 'react';

export type MDIIcon = keyof typeof mdiIcons;
interface AppIconProps extends Omit<IconProps, 'path'> {
    name: MDIIcon;
}

const AppIcon: FC<AppIconProps> = ({ name, size = 1, ...rest }) => {
    const iconPath = mdiIcons[name];

    return <Icon path={iconPath} size={size} {...rest} className="me-2" />;
};

export default AppIcon;
