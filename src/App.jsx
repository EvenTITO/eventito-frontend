import './App.css'
import HomePage from './pages/HomePage'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import EventPage from './pages/EventPage'
import EventCalendar from './pages/EventCalendar'
import EventPresentations from './pages/EventPresentations'
import EventOrganization from './pages/EventOrganization'
import EventConfiguration from './pages/EventConfiguration'
import ProtectedLayout from './layouts/ProtectedLayout/ProtectedLayout'
import PublicLayout from './layouts/PublicLayout/PublicLayout'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import {AdministrationPage} from "@/pages/AdministrationPage.jsx";
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "@firebase/auth";
import {auth} from "@/services/firebase/firebaseAuth.js";
import {useDispatch} from "react-redux";
import {logout} from "@/services/state/user/userSlice.js";
import EventCreation from "@/pages/EventCreation.jsx";
import EventCreationCalendar from "@/pages/EventCreationCalendar.jsx";
import EventCreationPricing from "@/pages/EventCreationPricing.jsx";
import EventCreationWork from "@/pages/EventCreationWork.jsx";

function App() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setIsLoading(false);
            } else {
                dispatch(logout());
                setIsLoading(false);
            }
        });
        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <BrowserRouter>
            {isLoading === false ? (
                    <Routes>
                        <Route path="/" element={<PublicLayout/>}>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path="/register" element={<RegisterPage/>}/>
                        </Route>
                        <Route path="/" element={<AdminLayout/>}>
                            <Route path="administration" element={<AdministrationPage/>}/>
                        </Route>
                        <Route path="/" element={<ProtectedLayout/>}>
                            <Route index element={<HomePage/>}/>
                            <Route path="events" element={<HomePage/>}/>
                            <Route path="events/:id" element={<EventPage/>}/>
                            <Route path="events/:id/calendar" element={<EventCalendar/>}/>
                            <Route path="events/:id/presentations" element={<EventPresentations/>}/>
                            <Route path="events/:id/organization" element={<EventOrganization/>}/>
                            <Route path="events/:id/configuration" element={<EventConfiguration/>}/>
                            <Route path="events/creation/general" element={<EventCreation/>}/>
                            <Route path="events/creation/calendar" element={<EventCreationCalendar/>}/>
                            <Route path="events/creation/work" element={<EventCreationWork/>}/>
                            <Route path="events/creation/pricing" element={<EventCreationPricing/>}/>
                        </Route>
                    </Routes>
                ) :
                (<div></div>)
            }
        </BrowserRouter>
    )
}

export default App
