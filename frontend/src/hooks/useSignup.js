import React, { useState } from "react";

const useSignup = () => {
    const [loading, setLoading] = useState(false);

    const signup = async ({fullname, username, password, confirmPassword, gender}) => {

        const success = handleInputErrors({fullname, username, password, confirmPassword, gender});
        if (!success) return;
    };
};

export default useSignup;
