import 'primeicons/primeicons.css';
import Image from 'next/image';
import './Sidebar.css';
import {useEffect} from 'react';
import Link from 'next/link';

interface SidebarProps {

}

const Sidebar: React.FC<SidebarProps> = ({}) => {

    useEffect(() => {
        const arrows = document.querySelectorAll(".arrow");
        for (let i = 0; i < arrows.length; i++) {
        arrows[i].addEventListener("click", (e) => {
            const target = e.target as HTMLElement;
            if (target.parentElement) {
                let arrowParent = target.parentElement.parentElement;
                arrowParent!.classList.toggle("showMenu");
            }
        });
        }

        const sidebar = document.querySelector(".sidebar");
        const sidebarBtn = document.querySelector(".bx-menu");

        (sidebarBtn) && sidebarBtn.addEventListener("click", () => {
        sidebar!.classList.toggle("close");
        });
    }, [])
    

    return (
        <div className="sidebar">
            <div className='btnSidebar'><button className='bx-menu'>asdf</button></div>
            <div className="logo-details">
                <i className='bx bxl-c-plus-plus'></i>
                <span className="logo_name">LanGames</span>
            </div>
            <ul className="nav-links">
                <li>
                    <Link href="/words">
                        <i className='pi pi-th-large' ></i>
                        <span className="link_name">Words</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><Link className="link_name" href="/words">Words</Link></li>
                    </ul>
                </li>
                <li>
                    <div className="iocn-link">
                    <a href="#">
                        <i className='pi pi-star-fill' ></i>
                        <span className="link_name">Games</span>
                    </a>
                    <i className='pi pi-chevron-down arrow' ></i>
                    </div>
                    <ul className="sub-menu">
                        <li><a className="link_name" href="#">Games</a></li>
                        <li><Link href="/games/new">New Game</Link></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar