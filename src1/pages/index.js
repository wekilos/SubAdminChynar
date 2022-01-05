import { lazy } from "react";

// export const Users = lazy(() => import("./users/users"));  //old version
export const Users = lazy(()=>import('./users/users/ulanyjylar'));
export const NotFound = lazy(() => import("./404/404"));

export const Doctor = lazy(() => import("./lukman/lukman"));
export const Doctor_Sanaw=lazy(()=>import('./lukman/lukman_sanaw'));
export const Drivers = lazy(()=>import('./drivers/surujiler'));
export const Busses = lazy(()=>import('./buses/bus'));
export const Markets = lazy(()=>import('./ugrukdyryjy/yolHaty'));
export const YolHatyBermek = lazy(()=>import('./ugrukdyryjy/yolHatyBer'));
export const Mehanik = lazy(()=>import('./mehanik/mehanik'));
export const Mehanik_Sanaw = lazy(()=>import('./mehanik/Sanaw/mehanik_sanaw'));
export const UlanyjyHereket = lazy(()=>import('./ulanyjy Hereket/ulanyjyHereket'));
export const Garaz = lazy(()=>import('./garaz/garaz'));
export const UlanyjyGornush = lazy(()=>import('./ulanyjy Gornush/ulanyjyGornush'));
export const Login = lazy(()=>import('./login/login'));
export const Ugurlar = lazy(()=>import('./buses/ugurlar/ugurlar'));

export const Orders = lazy(()=>import('./Orders/lukman'));
export const ArchiveOrders = lazy(()=>import('./Orders/gowshurlanOrders'));
export const YatyrlanOrders = lazy(()=>import('./Orders/yatyrlanlar'));
export const OrderStatus = lazy(()=>import('./Orders/lukman_sanaw'));
export const Slider = lazy(()=>import('./Sliders/lukman_sanaw'));
export const Config = lazy(()=>import('./config/lukman_sanaw'));
export const HideProducts = lazy(()=>import('./lukman/hideProducts'));

export const Posts = lazy(()=>import('./posts/lukman_sanaw'));
export const Notifications = lazy(()=>import('./Notifications/lukman_sanaw'));



