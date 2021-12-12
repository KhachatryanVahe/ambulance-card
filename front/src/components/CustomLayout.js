import { Layout } from 'react-admin';
import { MenuBar } from './Menu';

export const CustomLayout = (props) => {
    return <Layout
        {...props}
        menu={MenuBar}
    />;
}