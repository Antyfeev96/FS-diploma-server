const {Router} = require('express');
const {validationResult} = require('express-validator');
const Film = require('../models/Film');
const router = Router();
const auth = require('../middleware/auth.middleware')
const config = require('config')

// /films
router.get(
    '/films',
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Ошибка при попытке получения всех фильмов"
                })
            }

            const films = await Film.find()

            if (!films) {
                res.status(400).json({"message": "Список фильмов пуст"})
            }

            setTimeout(() => {
                res.status(200).json({
                    "message": "Список фильмов получен",
                    "films": JSON.stringify(films)
                })
            }, 2000)
        } catch (e) {
            res.status(500).json({"message": "Что-то пошло не так, попробуйте ещё раз."})
        }
    }
)

router.post(
    '/films',
    async (req, res) => {
        try {
            const { name } = req.body

            const duration = 120

            const film = new Film({
                name, duration
            })

            await film.save()
            const films = await Film.find()

            setTimeout(() => {
                res.send({
                    "message": "Фильм добавлен, список фильмов обновлён",
                    "films": JSON.stringify(films)
                })
            }, 2000)
        } catch (e) {
            res.status(500).json({"message": e.message})
        }
    }
)

module.exports = router;
