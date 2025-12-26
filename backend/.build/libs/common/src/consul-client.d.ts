export declare class ConsulClient {
    private consulUrl;
    private serviceName;
    private servicePort;
    private serviceHost;
    private intervalId?;
    constructor();
    register(): Promise<void>;
    deregister(): Promise<void>;
    discoverService(serviceName: string): Promise<string | null>;
}
