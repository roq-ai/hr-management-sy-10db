import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware, notificationHandlerMiddleware } from 'server/middlewares';
import { selectedMp3PlayersValidationSchema } from 'validationSchema/selected-mp-3-players';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  const allowed = await prisma.selected_mp_3_players
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  if (!allowed) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  switch (req.method) {
    case 'GET':
      return getSelectedMp3PlayersById();
    case 'PUT':
      return updateSelectedMp3PlayersById();
    case 'DELETE':
      return deleteSelectedMp3PlayersById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSelectedMp3PlayersById() {
    const data = await prisma.selected_mp_3_players.findFirst(
      convertQueryToPrismaUtil(req.query, 'selected_mp_3_players'),
    );
    return res.status(200).json(data);
  }

  async function updateSelectedMp3PlayersById() {
    await selectedMp3PlayersValidationSchema.validate(req.body);
    const data = await prisma.selected_mp_3_players.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
  async function deleteSelectedMp3PlayersById() {
    await notificationHandlerMiddleware(req, req.query.id as string);
    const data = await prisma.selected_mp_3_players.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
