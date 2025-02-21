import { Request, Response } from "express";
import { prisma } from "src/server";

export const getAllMeetups = async (req: Request, res: Response) => {
  try {
    const meetups = await prisma.meetup.findMany();
    res.json(meetups);
  } catch (error) {
    res.status(500).json({ error: "Ошибка получения митапов" });
  }
};

export const getMeetupById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const meetup = await prisma.meetup.findUnique({
      where: { id: Number(id) },
    });
    if (meetup) {
      res.json(meetup);
    } else {
      res.status(404).json({ error: "Митап не найден" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка получения митапа" });
  }
};

export const createMeetup = async (req: Request, res: Response) => {
  const { title, description, dateTime, location } = req.body;
  try {
    const newMeetup = await prisma.meetup.create({
      data: {
        title,
        description,
        dateTime: new Date(dateTime),
        location,
      },
    });
    res.status(201).json(newMeetup);
  } catch (error) {
    res.status(500).json({ error: "Ошибка создания митапа" });
  }
};

export const updateMeetup = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, dateTime, location } = req.body;
  try {
    const updatedMeetup = await prisma.meetup.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        dateTime: new Date(dateTime),
        location,
      },
    });
    res.json(updatedMeetup);
  } catch (error) {
    res.status(500).json({ error: "Ошибка обновления митапа" });
  }
};

export const deleteMeetup = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.meetup.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Ошибка удаления митапа" });
  }
};
