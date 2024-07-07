import React, { useState, useEffect } from 'react';

const NoConnectionWrapper = (props) => {
    const [isOnline, setisOnline] = useState(true);
    
    useEffect(() => {
        setisOnline(navigator.onLine);
    }, []);

    window.addEventListener('online', () => {
        setisOnline(true);
    });

    window.addEventListener('offline', () => {
        setisOnline(false);
    });


  if (isOnline) {
        return props.children
  }
    
    else {
        return (
            <div className="authincation h-100 p-meddle">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center ">
                        <div className="col-md-5">
                            <div className="form-input-content text-center error-page">
                                <h1 className="error-text font-weight-bold">503</h1>
                                <h4>
                                    <i className="fa fa-exclamation-triangle text-warning" />{" "}
                                    You Have No Active Internet Connection.
                                </h4>
                                <p>
                                   Please Check Your Internet Connectivity. 
                                </p>
                                <div>
                                    {/* <Link className="btn btn-primary" to="/dashboard">
                                    Back to Home
                                    </Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default NoConnectionWrapper
