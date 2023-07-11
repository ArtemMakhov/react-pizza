import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import { Header } from "./components/Header";
import { Home } from "./pages/Home";

import "./scss/app.scss";

const Cart = lazy(() => import("./pages/Cart"));
const FullPizza = lazy(() => import("./pages/FullPizza"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<div>Loading ...</div>}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="/pizza/:id"
            element={
              <Suspense fallback={<div>Loading ...</div>}>
                <FullPizza />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
