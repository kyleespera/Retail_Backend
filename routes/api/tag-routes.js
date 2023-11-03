const router = require('express').Router();
const { Tag, Product } = require('../../models');

// Helper function for error handling
const asyncHandler = fn => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Routes for tags

// Get all tags

router.get('/', asyncHandler(async (req, res) => {
    const tagData = await Tag.findAll({ include: [{ model: Product }] });
    res.status(200).json(tagData);
}));

// Get a tag by its ID
router.get('/:id', asyncHandler(async (req, res) => {
    const tagData = await Tag.findByPk(req.params.id, { include: [{ model: Product }] });
    if (!tagData) {
        res.status(404).json({ message: 'No tag found with that id!' });
        return;
    }
    res.status(200).json(tagData);
}));

// Create a new tag
router.post('/', asyncHandler(async (req, res) => {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
}));

// Update a tag by its ID
router.put('/:id', asyncHandler(async (req, res) => {
    const [updatedRows] = await Tag.update(req.body, { where: { id: req.params.id } });
    if (!updatedRows) {
        res.status(404).json({ message: 'No tag found with that id!' });
        return;
    }
    res.status(200).json({ message: 'Tag updated successfully' });
}));

// Delete a tag by its ID
router.delete('/:id', asyncHandler(async (req, res) => {
    const deletedRows = await Tag.destroy({ where: { id: req.params.id } });
    if (!deletedRows) {
        res.status(404).json({ message: 'No tag found with that id!' });
        return;
    }
    res.status(200).json({ message: 'Tag deleted successfully' });
}));

module.exports = router;
