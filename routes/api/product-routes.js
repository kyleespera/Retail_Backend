const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// Helper function for error handling
const asyncHandler = fn => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Routes for products

// Get all products
router.get('/', asyncHandler(async (req, res) => {
    const productData = await Product.findAll({
        include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(productData);
}));

// Get a product by its ID
router.get('/:id', asyncHandler(async (req, res) => {
    const productData = await Product.findByPk(req.params.id, {
        include: [{ model: Category }, { model: Tag }],
    });
    if (!productData) {
        res.status(404).json({ message: 'No product found with that id!' });
        return;
    }
    res.status(200).json(productData);
}));

// Create a new product
router.post('/', asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);
    if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map(tag_id => ({
            product_id: product.id,
            tag_id,
        }));
        await ProductTag.bulkCreate(productTagIdArr);
    }
    res.status(200).json(product);
}));

// Update a product by its ID
router.put('/:id', asyncHandler(async (req, res) => {
    await Product.update(req.body, { where: { id: req.params.id } });
    if (req.body.tagIds && req.body.tagIds.length) {
        const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
        const productTagIds = productTags.map(({ tag_id }) => tag_id);
        const newProductTags = req.body.tagIds
            .filter(tag_id => !productTagIds.includes(tag_id))
            .map(tag_id => ({ product_id: req.params.id, tag_id }));
        const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
        await Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
        ]);
    }
    res.json({ message: 'Product updated successfully' });
}));

// Delete a product by its ID
router.delete('/:id', asyncHandler(async (req, res) => {
    const product = await Product.destroy({ where: { id: req.params.id } });
    if (!product) {
        res.status(404).json({ message: 'No product found with that id!' });
        return;
    }
    res.status(200).json({ message: 'Product deleted successfully' });
}));

module.exports = router;
