import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';

class AppointmentController {
  async index(req, res) {
    const {
      page = 1,
    } = req.query; /** se não for informado, automaticamente pg 1 */

    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date'],
      limit: 20, // qtos registros quero carregar
      offset: (page - 1) * 20, // qtos registros pular a cada pagina
      include: [
        {
          model: User,
          as: 'provider',
          /** como tenho 2 relacionamentos
          tenho que informar qual desejo utilizar */
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
              /** tem que ter id e path do contrário, o model file
               * não saberá qual o valor do path pra gerar a URL
               */
            },
          ],
        },
      ],
    });

    return res.json(appointments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { provider_id, date } = req.body;
    /**
     * check if provider_id is a provider
     */
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });
    if (!isProvider) {
      return res
        .status(400)
        .json({ error: 'You can only create appointments with providers' });
    }

    /**
     * parseISO transforma em um objeto date
     * startofhour recebe um objeto date e pega apenas o inicio da hora
     * sem minutos e segundos
     */
    const hourStart = startOfHour(parseISO(date));

    // verifica se a data selecionada já passou
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted.' });
    }

    /** verifica se a data está disponível */

    const checkAvaliability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null, // se o agendamento tiver sido cancelado, o horário está livre
        date: hourStart,
      },
    });

    if (checkAvaliability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not avaliable.' });
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date: hourStart, // nenhum compromisso em hora "quebrada"
    });

    const user = await User.findByPk(req.userId);
    /** o que estiver entre aspas simples não será alterado pelo datefns */
    const formatedDate = format(hourStart, "'dia' dd 'de' MMMM', às' H:mm'h'", {
      locale: pt,
    });
    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formatedDate}`,
      user: provider_id,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
