const {Router} = require('express');
const {validationResult} = require('express-validator');
const Hall = require('../models/Hall');
const router = Router();
const auth = require('../middleware/auth.middleware')
const config = require('config')

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

            setTimeout(() => {
                res.status(201).json({
                    "message": "Список залов получен",
                    "halls": JSON.stringify(halls)
                })
            }, 2000)
        } catch (e) {
            res.status(500).json({"message": "Что-то пошло не так, попробуйте ещё раз."})
        }
    }
)

router.post(
    '/halls',
    async (req, res) => {
        try {
            const { name } = req.body

            const rows = Array(8).fill(null).map(() => Array(8).fill('standart'))

            const hall = new Hall({
                name, rows, checked: false
            })

            await hall.save()
            const halls = await Hall.find()

            setTimeout(() => {
                res.status(201).json({
                    "message": "Зал добавлен, список залов обновлён",
                    "halls": JSON.stringify(halls)
                })
            }, 2000)
        } catch (e) {
            res.status(500).json({"message": "Что-то пошло не так, попробуйте ещё раз."})
        }
    }
)

router.delete(
    '/halls/:id',
    async (req, res) => {
        try {
            await Hall.findByIdAndDelete(req.params.id)

            const halls = await Hall.find()

            setTimeout(() => {
                res.status(201).json({
                    "message": "Зал удалён, список залов обновлён",
                    "halls": JSON.stringify(halls)
                })
            }, 2000)
        } catch (e) {
            res.status(500).json({"message": "Что-то пошло не так, попробуйте ещё раз."})
        }
    }
)

module.exports = router;