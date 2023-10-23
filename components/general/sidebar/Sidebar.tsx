import 'primeicons/primeicons.css';
import Image from 'next/image';
import './Sidebar.css';

interface SidebarProps {

}

const Sidebar: React.FC<SidebarProps> = ({}) => {

    return (
        <div className="sidebar">
            <div className="logo-details">
                <i className='bx bxl-c-plus-plus'></i>
                <span className="logo_name">LanGames</span>
            </div>
            <ul className="nav-links">
                <li>
                    <a href="#">
                    <i className='pi pi-th-large' ></i>
                    <span className="link_name">Dashboard</span>
                    </a>
                    <ul className="sub-menu blank">
                    <li><a className="link_name" href="#">Category</a></li>
                    </ul>
                </li>
                <li>
                    <div className="iocn-link">
                    <a href="#">
                        <i className='pi pi-star-fill' ></i>
                        <span className="link_name">Category</span>
                    </a>
                    <i className='pi pi-chevron-down arrow' ></i>
                    </div>
                    <ul className="sub-menu">
                    <li><a className="link_name" href="#">Category</a></li>
                    <li><a href="#">HTML & CSS</a></li>
                    <li><a href="#">JavaScript</a></li>
                    <li><a href="#">PHP & MySQL</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar