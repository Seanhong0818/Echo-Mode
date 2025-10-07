import React from "react";
type Score = {
    sync: number;
    res?: number;
    insight?: number;
    calm?: number;
};
type Props = {
    state: string;
    score: Score;
};
export declare const EchoHud: React.FC<Props>;
export {};
