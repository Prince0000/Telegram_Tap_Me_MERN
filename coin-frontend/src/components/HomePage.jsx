import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

export default function HomePage() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation(); 

    useEffect(() => {
        // Simulate content loading and hide loader
        const handlePageLoad = () => setLoading(false);
        handlePageLoad();

        // Clean up if needed
        return () => window.removeEventListener('load', handlePageLoad);
    }, [location]);

    

    const handleNavigation = (path) => {
        setLoading(true);
        navigate(path);
    };

    return (
        <div className="container-fluid bg-dark min-vh-100">
            {loading ? (
                <div className="d-flex justify-content-center align-items-center min-vh-100">
                    <ClipLoader color="#fff" size={50} />
                </div>
            ) : (
                <>
                    <Outlet />
                    <div
                        className="text-white bg-dark border fixed-bottom"
                        style={{
                            bottom: '30px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '80%',
                            textAlign: 'center',
                            padding: '10px 0',
                            borderRadius: '10px',
                        }}
                    >
                        <div className="row">
                            <button 
                                onClick={() => handleNavigation('/')} 
                                className="col-4 btn text-white position-relative" 
                                role="button" 
                                aria-label="Home"
                            >
                                Home
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        right: 0,
                                        width: '1px',
                                        height: '50%',
                                        backgroundColor: 'white',
                                        transform: 'translateY(-50%)',
                                    }}
                                ></div>
                            </button>
                            <button 
                                onClick={() => handleNavigation('/boost')} 
                                className="col-4 btn text-white position-relative" 
                                role="button" 
                                aria-label="Boost"
                            >
                                Boost
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        right: 0,
                                        width: '1px',
                                        height: '50%',
                                        backgroundColor: 'white',
                                        transform: 'translateY(-50%)',
                                    }}
                                ></div>
                            </button>
                            <button 
                                className="col-4 btn text-white" 
                                role="button" 
                                aria-label="Status"
                            >
                                Status
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
