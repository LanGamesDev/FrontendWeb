import 'primeicons/primeicons.css';
import Image from 'next/image';
import './Sidebar.css';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import { SideBarMenu } from '../../../../types/general/SideBarMenu';
import ItemBar from '../itemBar/ItemBar';

interface SidebarProps {

}

const Sidebar: React.FC<SidebarProps> = ({}) => {

    const [collapse, setCollapse] = useState(false);

    const onCollapseClick = () => {
        setCollapse(oldState => !oldState)
    }

    const menus: SideBarMenu[] = [
        {
            name: "Words",
            icon: "pi pi-th-large",
            url: "/words",
            items: []
        },
        {
            name: "Games",
            icon: "pi pi-star-fill",
            items: [
                {
                    name: "New Game",
                    url: "/games/new"
                }
            ]
        }
    ]

    return (
        <div className={`sidebar ${(collapse) ? "close" : ""}`}>
            <div className='btnSidebar'><button className='bx-menu' onClick={onCollapseClick}>Menu</button></div>
            <div className="logo-details">
                <i className='bx bxl-c-plus-plus'></i>
                <span className="logo_name">LanGames</span>
            </div>
            <ul className="nav-links">
                {menus.map((item, index) => (
                    <ItemBar item={item} key={index}></ItemBar>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar