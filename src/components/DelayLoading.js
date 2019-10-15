import React from 'react'
const  DelayLoading = ({ pastDelay, error }) => {
    if (pastDelay) {
        return <div>Loading...</div>
    } else if (error) {
        return <div>{error}</div>;
    } else {
        return null;
    }
}
export default DelayLoading