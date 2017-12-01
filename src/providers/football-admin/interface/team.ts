import { Player } from "./player";

export interface Team {
    id: string;
    name: string;
    logo: string;
    slogan: string;
    players: Array<Player>;
}