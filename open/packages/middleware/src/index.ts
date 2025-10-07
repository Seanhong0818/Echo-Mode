// SPDX-License-Identifier: Apache-2.0
import type { Request, Response, NextFunction } from "express";

/** Adds x-echo-protocol: v1.3 header. */
export function echoMiddleware() {
  return (_req: Request, res: Response, next: NextFunction) => {
    res.setHeader("x-echo-protocol", "v1.3");
    next();
  };
}
