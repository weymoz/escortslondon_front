import { MenuItem } from "@typedefs/app";

export class Menu {
  private _items = menuItems;

  get items() {
    return this._items;
  }

  addSubMenu(slug: string, subMenu: MenuItem[]) {
    const itemIndex = this._items.findIndex(
      (item) => item.slug.replace("/", "") === slug
    );
    this._items[itemIndex].subMenu = subMenu;
  }
}

const menuItems: MenuItem[] = [
  {
    title: "Girls",
    slug: "/",
  },
  {
    title: "Duo Girls",
    slug: "/duo-girls",
  },
  {
    title: "Girls by services",
    slug: "service",
    subMenu: [],
  },
  {
    title: "Blog",
    slug: "/blog",
  },
  {
    title: "Casting",
    slug: "/casting",
  },
  {
    title: "Terms of Service",
    slug: `/terms`,
  },
  {
    title: "FAQ",
    slug: "/faq",
  },
];
