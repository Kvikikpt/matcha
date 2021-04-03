import React from "react";
import {useHistory} from "react-router-dom";

export default function () {
    let history = useHistory();
    React.useEffect(() => {
        if (!localStorage.token) {
            history.push('/auth');
        }
    }, [localStorage.token]);

    return <div> Index</div>
}