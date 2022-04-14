import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// HashRouter as BrowserRouter
// import SignIn from "../components/SignIn";

import history from "./history";
import { Users, NotFound,Doctor,Doctor_Sanaw,Markets,YolHatyBermek,
   Login,Ugurlar, Orders,KategoryOfBrands, OrderStatus,
    Slider, Config, ArchiveOrders, YatyrlanOrders, HideProducts, Posts,
     Notifications, Welayatlar, KategoryOfMarkets, Brands,SubKategories } from "../pages/index";
import Test from "../pages/test";
import ScrollIntoView from "./ScrollIntoView";
import { Loading } from "../components/loading";
 

const PrivateRoute = lazy(() => import("./PrivateRoute"));
const PublicRoute = lazy(() => import("./PublicRoute"));
// const AdminRoute = lazy(() => import("./AdminRoute"));
const App = () => {
  // history.listen((location, action) => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // });
  return (
    <BrowserRouter history={history}>
      <ScrollIntoView>
        <Suspense fallback={<Loading />}>
          <Switch>
            <PublicRoute
              restricted={true}
              component={Login}
              path="/"
              exact
            />

            <PublicRoute 
            restricted={false} 
            component={Login} 
            path="/" 
            exact 
            />
            
            <PrivateRoute
              restricted={false}
              component={Users}
              path="/users"
              exact
            />

 
             <PrivateRoute
              restricted={false}
              component={Doctor}
              path="/unit"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={Doctor_Sanaw}
              path="/products"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={HideProducts}
              path="/hideProducts"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={YolHatyBermek}
              path="/marketCategory"
              exact
            />
             <PrivateRoute
              restricted={false}
              component={SubKategories}
              path="/marketSubCategories"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={Markets}
              path="/markets"
              exact
            />
             
            {/* <PrivateRoute
              restricted={false}
              component={Ugurlar}
              path="/ugurlar"
              exact
            /> */}
            <PrivateRoute
              restricted={false}
              component={Orders}
              path="/orders"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={YatyrlanOrders}
              path="/canceledOrders"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={ArchiveOrders}
              path="/archiveOrders"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={OrderStatus}
              path="/orderStatus"
              exact
            />
            {/* <PrivateRoute
              restricted={false}
              component={Slider}
              path="/sliders"
              exact
            /> */}
            {/* <PrivateRoute
              restricted={false}
              component={Config}
              path="/config"
              exact
            /> */}
            {/* <PrivateRoute
              restricted={false}
              component={Posts}
              path="/posts"
              exact
            /> */}
            {/* <PrivateRoute
              restricted={false}
              component={Notifications}
              path="/notifications"
              exact
            /> */}
            {/* <PrivateRoute
              restricted={false}
              component={Welayatlar}
              path="/welayat"
              exact
            /> */}
            {/* <PrivateRoute
              restricted={false}
              component={KategoryOfMarkets}
              path="/kategoryOfMarkets"
              exact
            /> */}
            <PrivateRoute
              restricted={false}
              component={KategoryOfBrands}
              path="/brendKategory"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={Brands}
              path="/brendler"
              exact
            />

           

            <Route path="*" component={NotFound} />
          </Switch>
        </Suspense>
      </ScrollIntoView>
    </BrowserRouter>
  );
};

export default App;
