const router = require('express').Router();
const { authenticateToken, isAgent } = require('../../utils/jwtToken');
const {feedback, editFeedback, deleteFeedback} = require('../../controller/feedbackController')

router.post('/feedback', authenticateToken, feedback);
router.put('/edit-feedback', authenticateToken, editFeedback);
router.delete('/delete-feedback', authenticateToken, isAgent, deleteFeedback);
module.exports = router
