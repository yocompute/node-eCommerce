"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseQuery = (req, res, next) => {
    const query = req.query;
    if (!query) {
        next();
    }
    if (query) {
        try {
            req.query = {
                where: JSON.parse(query.where),
                options: query.options ? JSON.parse(query.options) : {},
            };
        }
        catch (e) {
            console.log(e);
        }
    }
    next();
};
//# sourceMappingURL=parse-query.js.map