import { update } from "./update";
import { create } from "./create";
import { getById } from "./getById";
import { deleteMeetup } from "./delete";
import { getAll } from "./getAll";

export const meetupService = {
  getAll,
  getById,
  create,
  update,
  deleteMeetup,
};
