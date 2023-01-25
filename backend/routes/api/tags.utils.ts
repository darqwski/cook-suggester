import { executeQuery } from "../../utils/database-utils";
import { ITag } from "../../../global-types/tags";

export const queryAllTags = (): Promise<ITag[]> => {
  return executeQuery<ITag>(
    "SELECT tagName, tagId, tagImage, tagDescription FROM tags"
  );
};
export const queryAllTagsWithValues = async (): Promise<ITag[]> => {
  const tagsWithRawValues = await executeQuery<ITag & { recipeId: number }>(
    "SELECT tags.tagName, tags.tagId, tags.tagImage, tags.tagDescription, tags_recipes.recipeId\n" +
      "FROM tags INNER JOIN tags_recipes ON tags_recipes.tagId = tags.tagId"
  );

  const tagsWithAggregatedRecipeIds = tagsWithRawValues.reduce<
    Record<number, ITag>
  >((acc, { recipeId, tagId, ...restTag }) => {
    if (!acc[tagId] || !acc[tagId].tagValues) {
      return {
        ...acc,
        [tagId]: { tagId, ...restTag, tagValues: [recipeId] },
      };
    }

    return {
      ...acc,
      [tagId]: { tagId, ...restTag, tagValues: [...acc[tagId].tagValues as number[], recipeId] },
    };
  }, {});

  return Object.values(tagsWithAggregatedRecipeIds);
};
