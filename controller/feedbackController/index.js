const logger = require("../../logger")
const FeedbackModel = require("../../model/Feedback.Model")
const UserModel = require("../../model/User.Model")
const { feedbackMail } = require("../../utils/sendMail")

module.exports = {
    feedback: async (req, res) => {
        try {
            const { message } = req.body
            const { _id, email } = req.user
            const result = await FeedbackModel.create({ _id: _id, message: message })
            let mail = await feedbackMail("v.palve777@gmail.com", email, "Feedback Mail", "send feedback mail succefully")
            res.json({ result, msg: "mail send.", mail: mail.response })
        } catch (error) {
            logger.warn(error)
            res.status(405).send({ msg: error })
        }
    },
    editFeedback: async (req, res, next) => {
        try {
            const { newMessage } = req.body
            const { _id, email } = req.user
            const result = await FeedbackModel.findOneAndUpdate({ _id: _id }, { message: newMessage })
            let mail = await feedbackMail(email, email, "Edit Feedback Mail", "edited feedback succefully")
            res.json({ result, msg: "feedback updated send.", mail: mail.response })
        } catch (error) {
            logger.warn(error)
            res.status(405).send({ msg: error })
        }
    },
    deleteFeedback: async (req, res, next) => {
        try {
            const { _id, email } = req.body
            let mail = await feedbackMail(email, email, "Edit Feedback Mail", "edited feedback succefully")
            await FeedbackModel.findOneAndDelete({ _id })
            res.json({ msg: "feedback deleted succefully.", })
        } catch (error) {
            logger.warn(error)
            res.status(405).send({ msg: error })
        }
    }
}