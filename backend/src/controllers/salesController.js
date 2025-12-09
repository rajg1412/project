const salesService = require('../services/salesService');

const getSalesData = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      sortBy = 'date',
      sortOrder = 'desc',
      customerRegion,
      gender,
      minAge,
      maxAge,
      productCategory,
      tags,
      paymentMethod,
      startDate,
      endDate
    } = req.query;

    const filters = {
      customerRegion: customerRegion ? customerRegion.split(',') : [],
      gender: gender ? gender.split(',') : [],
      minAge: minAge ? parseInt(minAge) : null,
      maxAge: maxAge ? parseInt(maxAge) : null,
      productCategory: productCategory ? productCategory.split(',') : [],
      tags: tags ? tags.split(',') : [],
      paymentMethod: paymentMethod ? paymentMethod.split(',') : [],
      startDate: startDate || null,
      endDate: endDate || null
    };

    const result = await salesService.getFilteredSalesData({
      page: parseInt(page),
      limit: parseInt(limit),
      search,
      sortBy,
      sortOrder,
      filters
    });

    res.json(result);
  } catch (error) {
    console.error('Error in getSalesData:', error);
    res.status(500).json({ error: 'Failed to fetch sales data' });
  }
};

const getFilterOptions = async (req, res) => {
  try {
    const options = await salesService.getFilterOptions();
    res.json(options);
  } catch (error) {
    console.error('Error in getFilterOptions:', error);
    res.status(500).json({ error: 'Failed to fetch filter options' });
  }
};

module.exports = {
  getSalesData,
  getFilterOptions
};