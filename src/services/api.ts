import axios from 'axios';

const BASE_PATH = 'http://localhost:3000/api/v1';

const api = axios.create({
    baseURL: BASE_PATH, //TODO - change
});

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('Access-Token');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            const refreshToken = localStorage.getItem('Refresh-Token');
            if (refreshToken) {
                try {
                    const refreshResponse = await axios.post(
                        `${BASE_PATH}/auth/refresh-token`,
                        {},
                        {
                            headers: {
                                'Refresh-Token': refreshToken,
                                'Accept': '*/*',
                            },
                        }
                    );

                    const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data;
                    localStorage.setItem('Access-Token', accessToken);
                    localStorage.setItem('Refresh-Token', newRefreshToken);

                    error.config.headers['Authorization'] = `Bearer ${accessToken}`;
                    return api(error.config);
                } catch (refreshError) {
                    console.error('Erro ao atualizar token:', refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
);

export { api };
