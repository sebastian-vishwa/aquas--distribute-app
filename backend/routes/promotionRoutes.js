const express = require('express');
const router = express.Router();

const Promotion = require('../models/Promotion');


// ==========================================
// GET ALL PROMOTIONS
// ==========================================

router.get('/', async (req, res) => {

  try {

    const promotions = await Promotion.find()
      .populate('eligibleProducts')
      .sort({ createdAt: -1 });

    res.json(promotions);

  } catch (error) {

    console.error(
      'Error fetching promotions:',
      error
    );

    res.status(500).json({
      message: 'Failed to fetch promotions'
    });

  }

});


// ==========================================
// CREATE PROMOTION
// ==========================================

router.post('/', async (req, res) => {

  try {

    const {
      promotionName,
      discountType,
      discountValue,
      minimumOrderValue,
      eligibleProducts,
      startDate,
      endDate,
      scheduledDate
    } = req.body;


    // Generate PROMO ID

    const lastPromotion =
      await Promotion.findOne()
        .sort({ createdAt: -1 });


    let nextNumber = 1;


    if (
      lastPromotion &&
      lastPromotion.promotionId
    ) {

      const number = parseInt(
        lastPromotion.promotionId
          .replace('PROMO-', '')
      );

      if (!isNaN(number)) {
        nextNumber = number + 1;
      }

    }


    const promotionId =
      `PROMO-${String(nextNumber).padStart(3, '0')}`;


    // Determine status

    const now = new Date();

    const start =
      new Date(startDate);

    const end =
      new Date(endDate);


    let status = 'Scheduled';


    if (now >= start && now <= end) {
      status = 'Active';
    }


    if (now > end) {
      status = 'Expired';
    }


    // Create promotion

    const promotion =
      new Promotion({

        promotionId,

        promotionName,

        discountType,

        discountValue,

        minimumOrderValue,

        eligibleProducts,

        startDate,

        endDate,

        scheduledDate,

        status

      });


    const savedPromotion =
      await promotion.save();


    // Return product information too

    const populatedPromotion =
      await Promotion.findById(
        savedPromotion._id
      ).populate('eligibleProducts');


    res.status(201).json(
      populatedPromotion
    );


  } catch (error) {

    console.error(
      'Error creating promotion:',
      error
    );

    res.status(500).json({

      message:
        'Failed to create promotion',

      error:
        error.message

    });

  }

});


// ==========================================
// DELETE PROMOTION
// ==========================================

router.delete('/:id', async (req, res) => {

  try {

    await Promotion.findByIdAndDelete(
      req.params.id
    );


    res.json({

      message:
        'Promotion deleted successfully'

    });


  } catch (error) {

    console.error(
      'Error deleting promotion:',
      error
    );


    res.status(500).json({

      message:
        'Failed to delete promotion'

    });

  }

});


module.exports = router;