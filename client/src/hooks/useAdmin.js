import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useAdmin = () => {
    const { user } = useContext(AuthContext);

    const isAdmin = user.role === 'admin' ? true : false
    return [isAdmin]
}

export default useAdmin;