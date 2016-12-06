// @flow

export type Next = () => Promise<any>;

export type ListenOptions = {
    port?: number;
    host?: string;
    backlog?: number;
    path?: string;
    exclusive?: boolean;
}