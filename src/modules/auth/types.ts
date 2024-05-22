export type CodeResponse = {
    jwt: string;
    pollTicket: string;
    url: string;
};

export type TokenResponse = {
    googleUserId: string;
    name: string;
    email: string;
    picture: string;
    accessToken: string;
    refreshToken: string;
};
