const {Router} = require('express');
const { validationResult } = require('express-validator');
const Hall = require('../models/Hall');
const router = Router();

// /halls
router.get(
    '/halls',
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Ошибка при попытке получения всех залов"
            })
        }

        const halls = await Hall.find()
        

        if (!halls) {
            res.status(400).json({"message": "Список залов пуст"})
        }

        res.status(201).json({
          "message": "Список залов получен",
          "halls": JSON.stringify(halls)
        })
    } catch (e) {
        res.status(500).json({"message": "Что-то пошло не так, попробуйте ещё раз."})
    }
  }
)

module.exports = router;