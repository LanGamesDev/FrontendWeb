import Link from "next/link";
import { SideBarMenu } from "../../../../types/general/SideBarMenu";
import { useState } from 'react';

interface ItemBarProps {
    item: SideBarMenu
}
const ItemBar: React.FC<ItemBarProps> = ({item}) => {

    const [active, setActive] = useState(false);

    const handleActive = () => {
        setActive(oldState => !oldState)
    }

    return (
        <li className={`${(active && !item.url) ? "showMenu" : ""}`} onClick={handleActive}>
            {
            (item.url) ?
                <Link href={item.url!}>
                    <i className={item.icon} ></i>
                    <span className="link_name">{item.name}</span>
                </Link>
            :
                <div className="iocn-link">
                    <div>
                        <i className={item.icon} ></i>
                        <span className="link_name">{item.name}</span>
                    </div>
                    <i className='pi pi-chevron-down arrow' ></i>
                </div>
            } 

            <ul className="sub-menu">
                <li>
                {
                (item.url) ?
                    <Link className="link_name" href={item.url!}>{item.name}</Link>
                :
                    <div className="link_name">{item.name}</div>
                }
                </li>

                {item.items.map((item, index) => (
                    <li key={index}><Link href={item.url}>{item.name}</Link></li>
                ))}
            </ul>
        </li>
    );

}

export default ItemBar;