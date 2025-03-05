import { tagRepository } from "@repositories/TagRepository";
import { meetupTagsService } from "@services/meetupTags";

export const tagsService = {
  async createTags(tags: string[]) {
    const uniqueTags = Array.from(new Set(tags || []));
    const tagsData = uniqueTags.map((tag) => ({ name: tag }));

    await tagRepository.createMany(tagsData);

    const createdTags = await tagRepository.getByNames(uniqueTags);
    const tagsIds = createdTags.map((tag) => tag.id);

    return { tagsIds };
  },

  async checkAndDeleteUnusedTags(tagsToCheck: number[]) {
    for (const tagId of tagsToCheck) {
      const count = await meetupTagsService.countRecordsByTagId(tagId);

      if (count === 0) {
        await tagRepository.delete(tagId);
      }
    }
  },
};
