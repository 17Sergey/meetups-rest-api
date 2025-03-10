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
    const oldTagNames = oldTags.map((tag) => tag.name);

    /* find old that are no more in meetup */
    const leftOldTags = oldTags.filter(
      (oldTag) => !newTagNames.includes(oldTag.name),
    );
    /* find new to be added */
    const newTagsToAdd = newTagNames.filter(
      (newTagName) => !oldTagNames.includes(newTagName),
    );

    /* delete link for old and check for unused */
    if (leftOldTags.length > 0) {
      const promises = leftOldTags.map((leftOldTag) =>
        meetupTagRepository.delete(meetupId, leftOldTag.id),
      );
      await Promise.all(promises);

      const tagsIds = leftOldTags.map((tag) => tag.id);
      await tagsService.checkAndDeleteUnusedTags(tagsIds);
    }

    /* create links with meetup for new */
    if (newTagsToAdd.length > 0) {
      /* check if there are exisiting tags from new ones */
      const existingTags = await tagRepository.getByNames(newTagsToAdd);
      const existingTagNames = existingTags.map((tag) => tag.name);

      const newTagsToCreate = newTagsToAdd.filter(
        (newTagToAdd) => !existingTagNames.includes(newTagToAdd),
      );

      /* create tags and link them */
      const { tagsIds: newTagsIds } =
        await tagsService.createTags(newTagsToCreate);

      const existingTagsIds = existingTags.map((tag) => tag.id);
      const existingAndNewTagsIds = [...existingTagsIds, ...newTagsIds];

      await meetupTagsService.addMeetupTags({
        meetupId,
        tagsIds: existingAndNewTagsIds,
      });
    }
  },
};
