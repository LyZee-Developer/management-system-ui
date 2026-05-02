export interface MenuConfigType {
  code: string;
  url: string;
  name: string;
  icon: string;
  sub: MenuProperties[];
}

export interface MenuProperties {
  code: string;
  url: string;
  name: string;
  icon: string;
}
