import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Profilepro } from "./pages/profilepro";
import { Profileclient } from "./pages/profileclient";
import { Busqueda } from "./pages/busqueda";
import { Faq } from "./pages/faq";
import { Sobrenosotros } from "./pages/sobrenosotros";
import { TablonDeAnuncios } from "./pages/tablonDeAnuncios";
import { Vista } from "./pages/map"
import { Messages } from "./component/messages";
import injectContext from "./store/appContext";
import { Context } from "./store/appContext";


// create your first component
const Layout = () => {
    // the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "")
        return <BackendURL />;

    const { store } = useContext(Context);
    const isLoggedIn = false; // Indica si el usuario está logueado


    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar isLoggedIn={isLoggedIn} />
                    <Routes>
                        <Route element={<Vista />} path="/map" />
                        {isLoggedIn && store.role === "Empresa" && (
                            <Route element={<TablonDeAnuncios />} path="/tablon-de-anuncios" />
                        )}
                        <Route element={<Home isLoggedIn={isLoggedIn} />} path="/" />
                        <Route element={<Messages />} path="/mensajes" />
                        <Route element={<Demo />} path="/demo" />

                        {isLoggedIn && store.role === "Empresa" && (<Route element={<Profilepro />} path="/perfil-profesional" />
                        )}

                        {isLoggedIn && store.role === "Cliente" && (<Route element={<Profileclient />} path="/perfil-cliente" />
                        )}

                        {/* <Route element={<Profile />} path="/profile/:theid" /> */}

                        {(isLoggedIn || store.role === "Cliente") && (
                            <Route element={<Busqueda />} path="/buscador" />
                        )}

                        <Route element={<Faq />} path="/preguntas-frecuentes" />
                        <Route element={<Sobrenosotros />} path="/sobre-nosotros" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer isLoggedIn={isLoggedIn} />
                </ScrollToTop>

            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
