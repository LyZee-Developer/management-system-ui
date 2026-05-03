import { useRoute, useRouter } from "vue-router";
import { StringConstant } from "../constants/stringConstant";
import { useHeaderStore } from "../store/headerStore";

export const RouteUtil = () => {
  const route = useRoute();
  const router = useRouter();
  const headerStore = useHeaderStore();
  const MAX_LENGTH_0 = 0;

  const getParams = (): string[] => {
    let pathUrl: string[] = route.params.pathMatch as [];
    return pathUrl;
  };

  const getPath = (): string => {
    let path = route.path;
    return path;
  };

  const goBack = () => {
    router.back();
  };

  const getPathList = (): string[] => {
    let path = getPath();
    let pathUrls = path.split(StringConstant.SLASH);
    let allPath = pathUrls.filter((s) => s !== "") ?? [];
    return allPath;
  };

  const setNewRoute = (url: string) => {
    router.push(url);
  };

  const checkBreadCrumb = () => {
    let allPath = getPathList();
    let isHasPath = allPath.length > MAX_LENGTH_0;
    //**************show breadcrumb below header when true**************
    headerStore.setIsShowBreadcrumb(isHasPath);
  };
  return { getParams, getPathList, checkBreadCrumb, getPath, goBack, setNewRoute};
};
