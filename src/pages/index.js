import { lazy } from "react";

// export const Users = lazy(() => import("./users/users"));  //old version
export const Users = lazy(()=>import('./users/users/ulanyjylar'));
export const NotFound = lazy(() => import("./404/404"));

export const Doctor = lazy(() => import("./products/lukman"));
export const Doctor_Sanaw=lazy(()=>import('./products/lukman_sanaw')); 
export const Markets = lazy(()=>import('./markets/yolHaty'));
export const YolHatyBermek = lazy(()=>import('./markets/yolHatyBer'));
export const SubKategories = lazy(()=>import("./markets/subKategoriya"))
export const Login = lazy(()=>import('./login/login'));

export const Orders = lazy(()=>import('./Orders/lukman'));
export const ArchiveOrders = lazy(()=>import('./Orders/gowshurlanOrders'));
export const YatyrlanOrders = lazy(()=>import('./Orders/yatyrlanlar'));
export const OrderStatus = lazy(()=>import('./Orders/lukman_sanaw'));
export const Slider = lazy(()=>import('./Sliders/lukman_sanaw'));
export const Config = lazy(()=>import('./config/lukman_sanaw'));
export const HideProducts = lazy(()=>import('./products/hideProducts'));

export const Posts = lazy(()=>import('./posts/lukman_sanaw'));
export const Notifications = lazy(()=>import('./Notifications/lukman_sanaw'));
export const Welayatlar = lazy(()=>import('./welayatlar/welayatlar'));
export const KategoryOfMarkets = lazy(()=>import('./kategoryOfMarkets/kategory'));
export const KategoryOfBrands = lazy(()=>import('./Brands Kategory/kategory'));
export const Brands = lazy(()=>import('./Brands/brands'));



