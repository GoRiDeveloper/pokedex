import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "../../components/Header";

export const MainLayout = () => {

    const { username } = useSelector(store => store.user);

    if (!username) {
        return <Navigate to="/login" />
    };

    return (

        <main className="mainLayout">
            <Header />
            <section className="mainLayout__content">
                <Outlet />
            </section>
        </main>

    );

};