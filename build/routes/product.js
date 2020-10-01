"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../controllers/product");
const parse_query_1 = require("../middlewares/parse-query");
function ProductRoute(db) {
    const router = express_1.default.Router();
    const controller = new product_1.ProductController(db);
    router.get('/:id', [parse_query_1.parseQuery], (req, res) => { controller.getById(req, res); });
    router.get('/', [parse_query_1.parseQuery], (req, res) => { controller.find(req, res); });
    return router;
}
exports.ProductRoute = ProductRoute;
//# sourceMappingURL=product.js.map