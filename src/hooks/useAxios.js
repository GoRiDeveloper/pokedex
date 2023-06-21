import { useState, useEffect } from "react";
import axios from "axios";

const ERROR_TYPES = { AbortError: "Petición Cancelada." };

export const useAxios = ({ url }) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [controller, setController] = useState(null);

    useEffect(() => {

        const Abort = new AbortController();
        setController(Abort);

        (async() => {

            try {

                const res = await axios.get(url, { signal: Abort.signal });
                const { data } = res;

                setData(data);
                setError(false);
                
            } catch (e) {

                let error = {
                    errMessage: e.message,
                    status: e.response?.status
                };

                switch (e.name) {

                    case ERROR_TYPES.AbortError:
                        error.message = ERROR_TYPES.AbortError;
                    break;

                };

                if (!error) throw `No hay información del Error.`;

                setError(error);
                
            } finally { setLoading(false) };

        })();

    }, [url]);

    const handleCancel = () => {

        if (controller) {

            controller.abort();
            const error = {
                status: 200,
                message: ERROR_TYPES.AbortError
            };
            setError(error);

        };

    };

    return { data, loading, error, handleCancel };

};