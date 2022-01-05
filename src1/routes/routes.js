import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// HashRouter as BrowserRouter
// import SignIn from "../components/SignIn";

import history from "./history";
import { Users, NotFound,Doctor,Doctor_Sanaw,Drivers,Busses,Markets,YolHatyBermek,Mehanik,Mehanik_Sanaw,
   UlanyjyHereket, Garaz,UlanyjyGornush,Login,Ugurlar, Orders, OrderStatus, Slider, Config, ArchiveOrders, YatyrlanOrders, HideProducts, Posts, Notifications } from "../pages/index";
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
            {/* <PrivateRoute
              restricted={false}
              component={Drivers}
              path="/drivers"
              exact
            />
             <PrivateRoute
              restricted={false}
              component={Busses}
              path="/busses"
              exact
            /> */}
            <PrivateRoute
              restricted={false}
              component={YolHatyBermek}
              path="/marketCategory"
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
              component={Mehanik}
              path="/mehanik"
              exact
            /> */}
             {/* <PrivateRoute
              restricted={false}
              component={Mehanik_Sanaw}
              path="/mehanik_sanaw"
              exact
            /> */}
            {/* <PrivateRoute
              restricted={false}
              component={UlanyjyHereket}
              path="/ulanyjy_hereket"
              exact
            /> */}
             {/* <PrivateRoute
              restricted={false}
              component={Garaz}
              path="/garaz_hasabat"
              exact
            /> */}
             <PrivateRoute
              restricted={false}
              component={UlanyjyGornush}
              path="/users_type"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={Ugurlar}
              path="/ugurlar"
              exact
            />
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
            <PrivateRoute
              restricted={false}
              component={Slider}
              path="/sliders"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={Config}
              path="/config"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={Posts}
              path="/posts"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={Notifications}
              path="/notifications"
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
