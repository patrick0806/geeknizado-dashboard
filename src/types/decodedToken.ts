export type DecodedToken = {
    id: string;
    name: string;
    email: string;
    type: 'admin' | 'customer';
}