export type SideBarMenu = {
    name: string;
    icon: string;
    url?: string;
    items: SideBarMenuItem[];
}

type SideBarMenuItem = {
    name: string;
    url: string;
}