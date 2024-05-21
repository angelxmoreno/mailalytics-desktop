import { useAuthStore } from '@app/modules/auth/AuthStore.ts';
import { CodeResponse, TokenResponse } from '@app/modules/auth/types.ts';
import { open } from '@tauri-apps/plugin-shell';
import axios from 'axios';
import { useState } from 'react';

const http = axios.create({
    baseURL: import.meta.env.VITE_BE_URL,
    validateStatus: status => status > 199 && status < 500,
});

export const useLogInService = () => {
    const [isPolling, setIsPolling] = useState(false);
    const [error, setError] = useState<Error | undefined>(undefined);
    const { login } = useAuthStore();
    const init = async () => {
        const { data } = await http.get<CodeResponse>('/auth/login');
        await open(data.url);
        await startPolling(data);
    };

    const startPolling = async ({ pollTicket, jwt }: CodeResponse) => {
        setIsPolling(true);
        setError(undefined);

        const timeout = 5 * 60 * 1000; // 5 minutes
        const interval = 5000; // 5 seconds
        const endTime = Date.now() + timeout;

        while (Date.now() < endTime) {
            try {
                const { data, status } = await http.request({
                    method: 'post',
                    url: '/auth/token',
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                    data: {
                        ticket: pollTicket,
                    },
                });

                if (status === 200) {
                    login(data as TokenResponse);
                    setIsPolling(false);
                    return;
                }

                if (status >= 400) {
                    setError(data as Error);
                    setIsPolling(false);
                    return;
                }
            } catch (err) {
                setError(err as Error);
                setIsPolling(false);
                return;
            }

            await new Promise(resolve => setTimeout(resolve, interval));
        }

        setIsPolling(false);
    };

    return { isPolling, error, init };
};
