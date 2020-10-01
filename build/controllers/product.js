"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const index_1 = require("./index");
class ProductController extends index_1.Controller {
    constructor(db) {
        super(db, 'products');
        this.model = new product_1.Product(db, null);
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.js.map