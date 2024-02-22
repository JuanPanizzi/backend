export interface DataUser {
        token: { access_token: string };
        userProps: {
            username: string;
            fechaInicio: Date | null | string;
        }
}