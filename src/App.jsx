import './App.css'
import HomePage from './pages/HomePage'
import {Route, Routes} from "react-router-dom"
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

function App() {
    return (
        <Routes>
            <Route path="/" element={<PublicLayout/>}>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
            </Route>
            <Route path="/" element={<AdminLayout/>}>
                <Route path="administration" element={<AdministrationPage/>}/>
                <Route path="administration/users" element={<AdministrationPage/>}/>
                <Route path="administration/requests" element={<AdministrationPage/>}/>
            </Route>
            <Route path="/" element={<ProtectedLayout/>}>
                <Route index element={<HomePage/>}/>
                <Route path="events" element={<HomePage/>}/>
                <Route path="events/:id" element={<EventPage/>}/>
                <Route path="events/:id/calendar" element={<EventCalendar/>}/>
                <Route path="events/:id/presentations" element={<EventPresentations/>}/>
                <Route path="events/:id/organization" element={<EventOrganization/>}/>
                <Route path="events/:id/configuration" element={<EventConfiguration/>}/>
            </Route>
        </Routes>
    );
}

function AuxComponent({displayName}) {
    return (
        <h2 className='font-bold text-3xl'>
            {displayName}
        </h2>
    );
}

export default App
