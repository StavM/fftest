type NavigationItem = {
  name: string;
  appId?: string;
  isMenu?: boolean;
  items?: NavigationItem[];
  subMenuItems?: NavigationItem[];
};

const navigationItems: NavigationItem[] = [
  {
    name: "Clients",
    items: [
      { name: "clients-1", appId: "clients-1" },
      { name: "clients-2", appId: "clients-2" }
    ]
  },
  {
    name: "Portfolios",
    isMenu: true,
    items: [
      { name: "port-1", appId: "port-1" },
      { name: "port-2", appId: "port-2" }
    ]
  },
  {
    name: "Services",
    items: [
      { name: "serv-1", appId: "serv-1" },
      {
        name: "serv-2",
        appId: "serv-2",
        isMenu: true,
        subMenuItems: [
          { name: "serv-sub-1", appId: "serv-sub-1" },
          { name: "serv-sub-2", appId: "serv-sub-2" }
        ]
      }
    ]
  }
];

function getMenuItemsMap(items: NavigationItem[], parent: NavigationItem | null = null): Record<string, NavigationItem> {
  const result: Record<string, NavigationItem> = {};

  for (const item of items) {
    if (item.isMenu && item.items) {
      for (const subItem of item.items) {
        if (subItem.appId) {
          result[subItem.appId] = item;
        }
      }
    }

    if (item.subMenuItems && item.isMenu) {
      for (const subItem of item.subMenuItems) {
        if (subItem.appId) {
          result[subItem.appId] = item;
        }
      }
    }

    if (item.items) {
      const subResult = getMenuItemsMap(item.items, item);
      Object.assign(result, subResult);
    }

    if (item.subMenuItems) {
      const subResult = getMenuItemsMap(item.subMenuItems, item);
      Object.assign(result, subResult);
    }
  }

  return result;
}

const menuItemsMap = getMenuItemsMap(navigationItems);
console.log(menuItemsMap);
