import React from 'react'
import { useNavigate } from 'react-router-dom'
import './NotFound.css';

const NotFound = () => {
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate('/');
    }
    return (
        <>
            <div className="items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat">
                <div className="mx-auto text-center bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
                    <section className="page_404">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 ">
                                    <div className="col-sm-10 col-sm-offset-1  text-center">
                                        <div className="four_zero_four_bg">
                                            <h1 className="text-center ">404</h1>
                                        </div>
                                        <div className="contant_box_404">
                                            <h3 className="h2">
                                                Look like you're lost
                                            </h3>
                                            <p>the page you are looking for not avaible!</p>
                                            <a href="" className="link_404" onClick={() => handleNavigation()}>Go to Home</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default NotFound