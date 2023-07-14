import React from 'react'
import Loader from "react-loader-spinner";

const LoadingBeforeViewData = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height:"100%" }}>
            <Loader
                type="ThreeDots"
                color="#cccccc"
                height={90}
                width={90}
            />
        </div>
    )
}

export default LoadingBeforeViewData
