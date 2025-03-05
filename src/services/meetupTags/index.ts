import { Tag } from "@prisma/client";
import { meetupTagRepository } from "@repositories/MeetupTagRepository";
import { tagRepository } from "@repositories/TagRepository";
import { tagsService } from "@services/tag";

type AddMeetupTags = {
  meetupId: number;
  tagsIds: number[];
};

export const meetupTagsService = {
  async addMeetupTags({ meetupId, tagsIds }: AddMeetupTags) {
    const meetupTags = tagsIds.map((tagId) => ({
      meetupId,
      tagId,
    }));

    await meetupTagRepository.createMany(meetupTags);
  },

  async deleteManyByMeetupId(meetupId: number) {
    return await meetupTagRepository.deleteManyByMeetupId(meetupId);
  },

  async countRecordsByTagId(tagId: number) {
    return meetupTagRepository.countByTagId(tagId);
  },

  async updateTags(meetupId: number, oldTags: Tag[], newTagNames: string[]) {
    const existingTags = await tagRepository.getByNames(newTagNames);
    const existingTagsNames = existingTags.map((tag) => tag.name);

    const newTags = newTagNames.filter(
      (newTagName) => !existingTagsNames.includes(newTagName),
    );
    const tagsToRemove = oldTags.filter(
      (tag) => !newTagNames.includes(tag.name),
    );

    if (newTags.length > 0) {
      console.log(newTags);

      const { tagsIds } = await tagsService.createTags(newTags);

      await meetupTagsService.addMeetupTags({
        meetupId,
        tagsIds,
      });
    }

    if (tagsToRemove.length > 0) {
      console.log(tagsToRemove);

      const promises = tagsToRemove.map((tag) =>
        meetupTagRepository.delete(meetupId, tag.id),
      );
      await Promise.all(promises);

      const tagsIds = tagsToRemove.map((tag) => tag.id);
      await tagsService.checkAndDeleteUnusedTags(tagsIds);
    }
  },
};
