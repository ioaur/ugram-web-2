import { baseURL } from "../api";

const authenticateWithGoogle = () => {
    window.location.href = baseURL + "/authentication/google";
};

export { authenticateWithGoogle };
