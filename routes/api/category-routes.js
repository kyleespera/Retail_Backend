const express = require('express');
const router = express.Router();
const { Category, Product } = require('../../models');

// Helper to wrap each route with a try-catch block
const asyncHandler = fn => 
  (req, res, next) =>
    Promise
      .resolve(fn(req, res, next))
      .catch(next);

// The `/api/categories` endpoint handlers
const getAllCategories = asyncHandler(async (req, res) => {
  const categoryData = await Category.findAll({ include: [Product] });
  res.status(200).json(categoryData);
});

const getCategoryById = asyncHandler(async (req, res) => {
  const categoryData = await Category.findByPk(req.params.id, { include: [Product] });
  if (!categoryData) throw new Error('No category found with that id!');
  res.status(200).json(categoryData);
});

const createCategory = asyncHandler(async (req, res) => {
  const categoryData = await Category.create(req.body);
  res.status(201).json(categoryData);
});

const updateCategory = asyncHandler(async (req, res) => {
  const [updateCount] = await Category.update(req.body, { where: { id: req.params.id } });
  if (!updateCount) throw new Error('No category found with that id!');
  res.status(200).json({ message: 'Category updated successfully', id: req.params.id });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const deleteCount = await Category.destroy({ where: { id: req.params.id } });
  if (!deleteCount) throw new Error('No category found with that id!');
  res.status(200).json({ message: 'Category deleted successfully', id: req.params.id });
});

// Routes chaining
router.route('/')
  .get(getAllCategories)
  .post(createCategory);

router.route('/:id')
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);

// Error handling middleware
router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = router;
