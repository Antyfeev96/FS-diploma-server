const {Router} = require('express');
const {validationResult} = require('express-validator');
const Ticket = require('../models/Ticket');
const Hall = require('../models/Hall');
const router = Router();

router.get(
    '/tickets',
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Ошибка при попытке получения всех билетов"
                })
            }

            const tickets = await Ticket.find()

            if (!tickets) {
                res.status(400).json({"message": "Список билетов пуст"})
            }

            setTimeout(() => {
                res.status(201).json({
                    "message": "Список билетов получен",
                    "tickets": tickets
                })
            }, 2000)
        } catch (e) {
            res.status(500).json({"message": "Что-то пошло не так, попробуйте ещё раз."})
        }
    }
)

router.get(
    '/tickets/:id',
    async (req, res) => {
        try {
            const { id } = req.params
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Ошибка при попытке получения билета по ID"
                })
            }

            const ticket = await Ticket.findById(id)

            if (!ticket) {
                res.status(400).json({"message": `Билет с ID ${id} не найден`})
            }

            setTimeout(() => {
                res.status(200).json({
                    "message": `Билет ${id} получен`,
                    "ticket": ticket
                })
            }, 2000)
        } catch (e) {
            res.status(500).json({"message": "Что-то пошло не так, попробуйте ещё раз."})
        }
    }
)

router.post(
    '/tickets',
    async (req, res) => {
        try {
            const {filmId, hallId, seats, session} = req.body

            const ticket = new Ticket({
                film: filmId, hall: hallId, seats, session
            })

            await ticket.save()

            for (const { row, place } of seats) {
                const hallToUpdate = await Hall.findById(hallId)

                if (!hallToUpdate) {
                    res.status(400).json({"message": "Зал с данным id не найден"})
                }

                const {rows} = hallToUpdate

                await Hall.findByIdAndUpdate(hallId, {
                    rows: [
                        ...rows.slice(0, row),
                        [
                            ...rows[row].slice(0, place),
                            'disabled',
                            ...rows[row].slice(place + 1)
                        ],
                        ...rows.slice(row + 1)
                    ]
                });
            }

            setTimeout(() => {
                res.send({
                    "message": "Билет добавлен, список билетов обновлён",
                    "ticket": ticket
                })
            }, 2000)
        } catch (e) {
            res.status(500).json({"message": e})
        }
    }
)

router.delete(
    '/tickets/:id',
    async (req, res) => {
        try {
            const { seats, hall } = await Ticket.findById(req.params.id)

            for (const { row, place } of seats) {
                const hallToUpdate = await Hall.findById(hall)

                if (!hallToUpdate) {
                    res.status(400).json({"message": "Зал с данным id не найден"})
                }

                const {rows} = hallToUpdate

                await Hall.findByIdAndUpdate(hall, {
                    rows: [
                        ...rows.slice(0, row),
                        [
                            ...rows[row].slice(0, place),
                            'standart',
                            ...rows[row].slice(place + 1)
                        ],
                        ...rows.slice(row + 1)
                    ]
                });
            }

            await Ticket.findByIdAndDelete(req.params.id)

            const tickets = await Ticket.find()

            setTimeout(() => {
                res.status(201).json({
                    "message": "Билет удалён, список билетов обновлён",
                    "tickets": tickets
                })
            }, 2000)
        } catch (e) {
            res.status(500).json({"message": "Что-то пошло не так, попробуйте ещё раз."})
        }
    }
)

module.exports = router;
