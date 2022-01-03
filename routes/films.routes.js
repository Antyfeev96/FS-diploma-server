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
                    "films": films
                })
            }, 2000)
        } catch (e) {
            res.status(500).json({"message": "Что-то пошло не так, попробуйте ещё раз."})
        }
    }
)

router.get(
    '/films/:id',
    async (req, res) => {
        try {
            const { id } = req.params
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Ошибка при попытке получения фильма по ID"
                })
            }

            const film = await Film.findById(id)

            if (!film) {
                res.status(400).json({"message": "Фильма с данным id не существует"})
            }

            setTimeout(() => {
                res.status(200).json({
                    "message": `Фильм ${film?.name} получен`,
                    "film": film
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

            const description = 'Классный фильм!'

            const film = new Film({
                name, description, duration
            })

            await film.save()
            const films = await Film.find()

            setTimeout(() => {
                res.send({
                    "message": "Фильм добавлен, список фильмов обновлён",
                    "films": films
                })
            }, 2000)
        } catch (e) {
            res.status(500).json({"message": e.message})
        }
    }
)

module.exports = router;
