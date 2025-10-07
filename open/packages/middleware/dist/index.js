/** Adds x-echo-protocol: v1.3 header. */
export function echoMiddleware() {
    return (_req, res, next) => {
        res.setHeader("x-echo-protocol", "v1.3");
        next();
    };
}
