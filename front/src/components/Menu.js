import * as React from 'react';
import { Menu, MenuItemLink } from 'react-admin';
import IconPerson from '@material-ui/icons/Person';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import HealingTwoTone from '@material-ui/icons/HealingTwoTone';

import translation from "../translation.json";

export const MenuBar = (props) => (
    <Menu {...props}>
        <MenuItemLink to="/patients" primaryText={translation.patient.patientsTitle} leftIcon={<IconPerson />}/>
        <MenuItemLink to="/visits" primaryText={translation.visit.visitsTitle} leftIcon={<HealingTwoTone />}/>
        <MenuItemLink to="/queue" primaryText={translation.queue.queueTitle} leftIcon={<PeopleAlt />}/>
    </Menu>
);