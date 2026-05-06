export interface ApiType {
  url: string;
  method: "get" | "post" | "delete" | "put";
  data: any;
}