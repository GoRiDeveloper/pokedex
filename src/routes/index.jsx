import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { MainLayout } from "../layouts/main_layout/MainLayout";
import { Home } from "../pages/Home";
import { ItemDetail } from "../pages/ItemDetail";
import { PageNotFound } from "../pages/PageNotFound";

export const Index = () => {

    return (

        <Routes>

            <Route path="/login" element={<Login />} />
            <Route element={<MainLayout />} >
                <Route path="/" element={<Home />} />
                <Route path="/:name" element={<ItemDetail />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />

        </Routes>

    );

};