const {Router} = require('express');
const {validationResult} = require('express-validator');
const Session = require('../models/Session');
const Hall = require('../models/Hall');
const router = Router();

router.get(
    '/sessions',
    async (req, res) => {
        try {

            const sessions = await Session.find()

            setTimeout(() => {
                res.send({
                    "message": "Список сеансов получен",
                    "sessions": sessions
                })
            }, 2000)

        } catch (e) {
            res.status(500).json({"message": e.message})
        }
    }
)

router.get(
    '/sessions/byFilm/:id',
    async (req, res) => {
        try {
            const { id } = req.params
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Ошибка при попытке получения сеансов по фильму"
                })
            }

            const sessions = await Session.find()

            let halls = {}

            const result = sessions
                .filter(session => session.film._id === id)
        
            result.forEach(item => {
                console.log(item);
                if (!halls[item.hall._id]) {
                    halls[item.hall._id] = []
                }
                halls[item.hall._id].push(item.start_time)
            })

            Object.values(halls).map(hall => {
                hall.sort((a,b) => {
                    const A = +a.split(':')
                    const B = +b.split(':')
                    return A > B ? 1 : -1
                })
            })

            setTimeout(() => {
                res.send({
                    "message": `Сеансы фильма ${id} получены`,
                    "sessions": result,
                    "halls": halls
                })
            }, 2000)
        } catch (e) {
            res.status(500).json({"message": e.message})
        }
    }
)

router.get(
    '/sessions/byHall/:id',
    async (req, res) => {
        try {
            const { id } = req.params
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: ""
                })
            }

            const sessions = await Session.find()

            const result = sessions
                .filter(session => session.film === id)

            setTimeout(() => {
                res.send({
                    "message": `Сеансы фильма ${id} получены`,
                    "sessions": result
                })
            }, 2000)
        } catch (e) {
            res.status(500).json({"message": e.message})
        }
    }
)

router.post(
    '/sessions',
    async (req, res) => {
        try {
            const { film, hall, start_time } = req.body

            const session = new Session({
                film, hall, start_time
            })

            await session.save()

            const updatingHall = await Hall.findById(hall._id)
            const newSessions = Object.assign({}, updatingHall.sessions, { [start_time]: film.name })

            await Hall.findByIdAndUpdate(hall._id, {
                sessions: newSessions
            })

            setTimeout(() => {
                res.send({
                    "message": "Сеанс создан, список сеансов обновлён"
                })
            }, 2000)
        } catch (e) {
            res.status(500).json({"message": e.message})
        }
    }
)

module.exports = router;
