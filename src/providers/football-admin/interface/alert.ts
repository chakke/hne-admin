export interface Alert {
    type: string;
    message: string;
    isShowForever: boolean;
    timeout: number;
}