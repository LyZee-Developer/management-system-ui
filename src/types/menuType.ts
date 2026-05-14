export interface MenuConfigType {
  code: string;
  url: string;
  name: string;
  icon: string;
  type: string;
  sub: MenuProperties[];
}

export interface MenuProperties {
  code: string;
  type: string;
  url: string;
  name: string;
  icon: string;
}
