import type { Request, Response, NextFunction } from "express";
/** Adds x-echo-protocol: v1.3 header. */
export declare function echoMiddleware(): (_req: Request, res: Response, next: NextFunction) => void;
