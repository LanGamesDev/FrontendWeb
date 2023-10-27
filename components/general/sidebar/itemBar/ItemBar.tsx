import Link from "next/link";

const ItemBar = ({}) => {

    return (
        <li>
            <Link href="/words">
                <i className='pi pi-th-large' ></i>
                <span className="link_name">Words</span>
            </Link>
            <ul className="sub-menu blank">
                <li><Link className="link_name" href="/words">Words</Link></li>
            </ul>
        </li>
    );

}

export default ItemBar;