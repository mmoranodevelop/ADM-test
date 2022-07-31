import logo from './logo.svg';
import './App.css';
import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import Home from "./components/home";
import AppSpinner from "./components/ui/AppSpinner";
import {Toast} from "primereact/toast";
import Footer from "./components/ui/Footer";

function App() {
    // Dispatcher
    const dispatch = useDispatch();
    // UI selector
    const overlay = useSelector(state => state.ui.overlay);
    const toastSelector = useSelector(state => state.ui.toast);
    // Utility toast hook Ref
    const toast = useRef(null);

    /**
     * OnStateChange: UI toast selector state change
     */
    useEffect(() => {
        if (toastSelector && toastSelector.severity && toastSelector.summary && toastSelector.detail) {
            toast.current.clear();
            toast.current.show(toastSelector);
        }
    }, [toastSelector])

    /**
     * Utility spinner control
     */
    let appSpinner;
    if (overlay.loading) {
        appSpinner = <AppSpinner message={overlay.message}/>
    }


    /**
     * APP.js base template return
     */
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
            </header>
            <Home/>
            {appSpinner}
            <Toast ref={toast} life={1000} baseZIndex={100000}/>
            <Footer />
        </div>
    );
}

export default App;
