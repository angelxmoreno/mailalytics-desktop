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
        try {
            const { data } = await http.get<CodeResponse>('/auth/login');
            await open(data.url);
            setIsPolling(true);
            await startPolling(data, Date.now());
        } catch (e) {
            const err = e as Error;
            setError(err);
            console.error(`Unable to init login service due to "${err.message}"`, err);
        }
    };

    const startPolling = async ({ pollTicket, jwt }: CodeResponse, startTime: number) => {
        const timeout = 5 * 60 * 1000; // 5 minutes
        const interval = 5000; // 5 seconds

        const poll = async () => {
            if (Date.now() - startTime >= timeout) {
                setIsPolling(false);
                setError(new Error('Polling timed out'));
                return;
            }

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

            setTimeout(poll, interval);
        };

        await poll();
    };

    return { isPolling, error, init };
};
