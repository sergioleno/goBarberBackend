import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    const isProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });
    if (!isProvider) {
      return res
        .status(400)
        .json({ error: 'Only prividers can load notifications.' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' }) // ordena por data de criação e ordem decrescente, não por hora
      .limit(20);

    return res.json(notifications);
  }
}

export default new NotificationController();
