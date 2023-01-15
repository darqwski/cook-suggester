//@ts-nocheck
import { ISuggestion } from "../../types/suggestion";
import { IIngredient, IRecipeIngredient } from "../../types/ingredients";

export const suggestedRecipesExample: ISuggestion[] = [
  {
    recipeId: 78,
    recipeName: "Recipe 78",
    recipeUrl: "recipe-78",
    cuisineId: 6,
    recipeSuggestedTimes: 0,
    recipeIngredientsAverageCommonness: null,
    recipeComplexity: 1,
    recipeSuggestionScore: null,
    recipeTimeInMinutes: 1,
    obligatoryIngredientsAmount: 0,
    matchingIngredients: [
      {
        recipeIngredientId: 29,
        recipeId: 78,
        ingredientsInRecipe: 3,
        ingredientId: 13,
        ingredientAmount: 965,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 30,
        recipeId: 78,
        ingredientsInRecipe: 3,
        ingredientId: 2,
        ingredientAmount: 308,
        ingredientUnit: "g",
      },
    ],
    missingIngredients: [
      {
        recipeIngredientId: 31,
        recipeId: 78,
        ingredientsInRecipe: 3,
        ingredientId: 3,
        ingredientAmount: 332,
        ingredientUnit: "g",
      },
    ],
    suggestionScore: 0.6666666666666666,
  },
  {
    recipeId: 598,
    recipeName: "Recipe 598",
    recipeUrl: "recipe-598",
    cuisineId: 4,
    recipeSuggestedTimes: 0,
    recipeIngredientsAverageCommonness: null,
    recipeComplexity: 1,
    recipeSuggestionScore: null,
    recipeTimeInMinutes: 1,
    obligatoryIngredientsAmount: 0,
    matchingIngredients: [
      {
        recipeIngredientId: 41,
        recipeId: 598,
        ingredientsInRecipe: 3,
        ingredientId: 13,
        ingredientAmount: 406,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 43,
        recipeId: 598,
        ingredientsInRecipe: 3,
        ingredientId: 2,
        ingredientAmount: 324,
        ingredientUnit: "g",
      },
    ],
    missingIngredients: [
      {
        recipeIngredientId: 42,
        recipeId: 598,
        ingredientsInRecipe: 3,
        ingredientId: 23,
        ingredientAmount: 889,
        ingredientUnit: "g",
      },
    ],
    suggestionScore: 0.6666666666666666,
  },
  {
    recipeId: 754,
    recipeName: "Recipe 754",
    recipeUrl: "recipe-754",
    cuisineId: 7,
    recipeSuggestedTimes: 0,
    recipeIngredientsAverageCommonness: null,
    recipeComplexity: 1,
    recipeSuggestionScore: null,
    recipeTimeInMinutes: 1,
    obligatoryIngredientsAmount: 0,
    matchingIngredients: [
      {
        recipeIngredientId: 99,
        recipeId: 754,
        ingredientsInRecipe: 3,
        ingredientId: 2,
        ingredientAmount: 557,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 100,
        recipeId: 754,
        ingredientsInRecipe: 3,
        ingredientId: 13,
        ingredientAmount: 591,
        ingredientUnit: "g",
      },
    ],
    missingIngredients: [
      {
        recipeIngredientId: 98,
        recipeId: 754,
        ingredientsInRecipe: 3,
        ingredientId: 29,
        ingredientAmount: 964,
        ingredientUnit: "g",
      },
    ],
    suggestionScore: 0.6666666666666666,
  },
  {
    recipeId: 221,
    recipeName: "Recipe 221",
    recipeUrl: "recipe-221",
    cuisineId: 5,
    recipeSuggestedTimes: 0,
    recipeIngredientsAverageCommonness: null,
    recipeComplexity: 1,
    recipeSuggestionScore: null,
    recipeTimeInMinutes: 1,
    obligatoryIngredientsAmount: 0,
    matchingIngredients: [
      {
        recipeIngredientId: 32,
        recipeId: 221,
        ingredientsInRecipe: 2,
        ingredientId: 13,
        ingredientAmount: 712,
        ingredientUnit: "g",
      },
    ],
    missingIngredients: [
      {
        recipeIngredientId: 33,
        recipeId: 221,
        ingredientsInRecipe: 2,
        ingredientId: 17,
        ingredientAmount: 503,
        ingredientUnit: "g",
      },
    ],
    suggestionScore: 0.5,
  },
  {
    recipeId: 1326,
    recipeName: "Recipe 1326",
    recipeUrl: "recipe-1326",
    cuisineId: 3,
    recipeSuggestedTimes: 0,
    recipeIngredientsAverageCommonness: null,
    recipeComplexity: 1,
    recipeSuggestionScore: null,
    recipeTimeInMinutes: 1,
    obligatoryIngredientsAmount: 0,
    matchingIngredients: [
      {
        recipeIngredientId: 82,
        recipeId: 1326,
        ingredientsInRecipe: 4,
        ingredientId: 13,
        ingredientAmount: 721,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 83,
        recipeId: 1326,
        ingredientsInRecipe: 4,
        ingredientId: 2,
        ingredientAmount: 957,
        ingredientUnit: "g",
      },
    ],
    missingIngredients: [
      {
        recipeIngredientId: 84,
        recipeId: 1326,
        ingredientsInRecipe: 4,
        ingredientId: 3,
        ingredientAmount: 992,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 85,
        recipeId: 1326,
        ingredientsInRecipe: 4,
        ingredientId: 17,
        ingredientAmount: 741,
        ingredientUnit: "g",
      },
    ],
    suggestionScore: 0.5,
  },
  {
    recipeId: 1794,
    recipeName: "Recipe 1794",
    recipeUrl: "recipe-1794",
    cuisineId: 3,
    recipeSuggestedTimes: 0,
    recipeIngredientsAverageCommonness: null,
    recipeComplexity: 1,
    recipeSuggestionScore: null,
    recipeTimeInMinutes: 1,
    obligatoryIngredientsAmount: 0,
    matchingIngredients: [
      {
        recipeIngredientId: 59,
        recipeId: 1794,
        ingredientsInRecipe: 4,
        ingredientId: 13,
        ingredientAmount: 808,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 60,
        recipeId: 1794,
        ingredientsInRecipe: 4,
        ingredientId: 2,
        ingredientAmount: 53,
        ingredientUnit: "g",
      },
    ],
    missingIngredients: [
      {
        recipeIngredientId: 57,
        recipeId: 1794,
        ingredientsInRecipe: 4,
        ingredientId: 23,
        ingredientAmount: 782,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 58,
        recipeId: 1794,
        ingredientsInRecipe: 4,
        ingredientId: 3,
        ingredientAmount: 254,
        ingredientUnit: "g",
      },
    ],
    suggestionScore: 0.5,
  },
  {
    recipeId: 2262,
    recipeName: "Recipe 2262",
    recipeUrl: "recipe-2262",
    cuisineId: 3,
    recipeSuggestedTimes: 0,
    recipeIngredientsAverageCommonness: null,
    recipeComplexity: 1,
    recipeSuggestionScore: null,
    recipeTimeInMinutes: 1,
    obligatoryIngredientsAmount: 0,
    matchingIngredients: [
      {
        recipeIngredientId: 1,
        recipeId: 2262,
        ingredientsInRecipe: 4,
        ingredientId: 2,
        ingredientAmount: 558,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 4,
        recipeId: 2262,
        ingredientsInRecipe: 4,
        ingredientId: 13,
        ingredientAmount: 14,
        ingredientUnit: "g",
      },
    ],
    missingIngredients: [
      {
        recipeIngredientId: 2,
        recipeId: 2262,
        ingredientsInRecipe: 4,
        ingredientId: 3,
        ingredientAmount: 213,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 3,
        recipeId: 2262,
        ingredientsInRecipe: 4,
        ingredientId: 29,
        ingredientAmount: 769,
        ingredientUnit: "g",
      },
    ],
    suggestionScore: 0.5,
  },
  {
    recipeId: 10166,
    recipeName: "Recipe 10166",
    recipeUrl: "recipe-10166",
    cuisineId: 5,
    recipeSuggestedTimes: 0,
    recipeIngredientsAverageCommonness: null,
    recipeComplexity: 1,
    recipeSuggestionScore: null,
    recipeTimeInMinutes: 1,
    obligatoryIngredientsAmount: 0,
    matchingIngredients: [
      {
        recipeIngredientId: 128,
        recipeId: 10166,
        ingredientsInRecipe: 4,
        ingredientId: 13,
        ingredientAmount: 245,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 131,
        recipeId: 10166,
        ingredientsInRecipe: 4,
        ingredientId: 2,
        ingredientAmount: 300,
        ingredientUnit: "g",
      },
    ],
    missingIngredients: [
      {
        recipeIngredientId: 129,
        recipeId: 10166,
        ingredientsInRecipe: 4,
        ingredientId: 17,
        ingredientAmount: 99,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 130,
        recipeId: 10166,
        ingredientsInRecipe: 4,
        ingredientId: 23,
        ingredientAmount: 313,
        ingredientUnit: "g",
      },
    ],
    suggestionScore: 0.5,
  },
  {
    recipeId: 12818,
    recipeName: "Recipe 12818",
    recipeUrl: "recipe-12818",
    cuisineId: 2,
    recipeSuggestedTimes: 0,
    recipeIngredientsAverageCommonness: null,
    recipeComplexity: 1,
    recipeSuggestionScore: null,
    recipeTimeInMinutes: 1,
    obligatoryIngredientsAmount: 0,
    matchingIngredients: [
      {
        recipeIngredientId: 5,
        recipeId: 12818,
        ingredientsInRecipe: 4,
        ingredientId: 2,
        ingredientAmount: 41,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 6,
        recipeId: 12818,
        ingredientsInRecipe: 4,
        ingredientId: 13,
        ingredientAmount: 904,
        ingredientUnit: "g",
      },
    ],
    missingIngredients: [
      {
        recipeIngredientId: 7,
        recipeId: 12818,
        ingredientsInRecipe: 4,
        ingredientId: 29,
        ingredientAmount: 612,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 8,
        recipeId: 12818,
        ingredientsInRecipe: 4,
        ingredientId: 17,
        ingredientAmount: 768,
        ingredientUnit: "g",
      },
    ],
    suggestionScore: 0.5,
  },
  {
    recipeId: 17342,
    recipeName: "Recipe 17342",
    recipeUrl: "recipe-17342",
    cuisineId: 8,
    recipeSuggestedTimes: 0,
    recipeIngredientsAverageCommonness: null,
    recipeComplexity: 1,
    recipeSuggestionScore: null,
    recipeTimeInMinutes: 1,
    obligatoryIngredientsAmount: 0,
    matchingIngredients: [
      {
        recipeIngredientId: 89,
        recipeId: 17342,
        ingredientsInRecipe: 4,
        ingredientId: 13,
        ingredientAmount: 305,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 92,
        recipeId: 17342,
        ingredientsInRecipe: 4,
        ingredientId: 2,
        ingredientAmount: 353,
        ingredientUnit: "g",
      },
    ],
    missingIngredients: [
      {
        recipeIngredientId: 90,
        recipeId: 17342,
        ingredientsInRecipe: 4,
        ingredientId: 23,
        ingredientAmount: 180,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 91,
        recipeId: 17342,
        ingredientsInRecipe: 4,
        ingredientId: 29,
        ingredientAmount: 280,
        ingredientUnit: "g",
      },
    ],
    suggestionScore: 0.5,
  },
  {
    recipeId: 30498,
    recipeName: "Recipe 30498",
    recipeUrl: "recipe-30498",
    cuisineId: 6,
    recipeSuggestedTimes: 0,
    recipeIngredientsAverageCommonness: null,
    recipeComplexity: 1,
    recipeSuggestionScore: null,
    recipeTimeInMinutes: 1,
    obligatoryIngredientsAmount: 0,
    matchingIngredients: [
      {
        recipeIngredientId: 105,
        recipeId: 30498,
        ingredientsInRecipe: 5,
        ingredientId: 2,
        ingredientAmount: 104,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 107,
        recipeId: 30498,
        ingredientsInRecipe: 5,
        ingredientId: 13,
        ingredientAmount: 664,
        ingredientUnit: "g",
      },
    ],
    missingIngredients: [
      {
        recipeIngredientId: 106,
        recipeId: 30498,
        ingredientsInRecipe: 5,
        ingredientId: 17,
        ingredientAmount: 124,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 108,
        recipeId: 30498,
        ingredientsInRecipe: 5,
        ingredientId: 3,
        ingredientAmount: 373,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 109,
        recipeId: 30498,
        ingredientsInRecipe: 5,
        ingredientId: 23,
        ingredientAmount: 10,
        ingredientUnit: "g",
      },
    ],
    suggestionScore: 0.4,
  },
  {
    recipeId: 38454,
    recipeName: "Recipe 38454",
    recipeUrl: "recipe-38454",
    cuisineId: 6,
    recipeSuggestedTimes: 0,
    recipeIngredientsAverageCommonness: null,
    recipeComplexity: 1,
    recipeSuggestionScore: null,
    recipeTimeInMinutes: 1,
    obligatoryIngredientsAmount: 0,
    matchingIngredients: [
      {
        recipeIngredientId: 121,
        recipeId: 38454,
        ingredientsInRecipe: 5,
        ingredientId: 2,
        ingredientAmount: 706,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 124,
        recipeId: 38454,
        ingredientsInRecipe: 5,
        ingredientId: 13,
        ingredientAmount: 258,
        ingredientUnit: "g",
      },
    ],
    missingIngredients: [
      {
        recipeIngredientId: 120,
        recipeId: 38454,
        ingredientsInRecipe: 5,
        ingredientId: 3,
        ingredientAmount: 773,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 122,
        recipeId: 38454,
        ingredientsInRecipe: 5,
        ingredientId: 17,
        ingredientAmount: 387,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 123,
        recipeId: 38454,
        ingredientsInRecipe: 5,
        ingredientId: 29,
        ingredientAmount: 657,
        ingredientUnit: "g",
      },
    ],
    suggestionScore: 0.4,
  },
  {
    recipeId: 52026,
    recipeName: "Recipe 52026",
    recipeUrl: "recipe-52026",
    cuisineId: 6,
    recipeSuggestedTimes: 0,
    recipeIngredientsAverageCommonness: null,
    recipeComplexity: 1,
    recipeSuggestionScore: null,
    recipeTimeInMinutes: 1,
    obligatoryIngredientsAmount: 0,
    matchingIngredients: [
      {
        recipeIngredientId: 115,
        recipeId: 52026,
        ingredientsInRecipe: 5,
        ingredientId: 2,
        ingredientAmount: 774,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 119,
        recipeId: 52026,
        ingredientsInRecipe: 5,
        ingredientId: 13,
        ingredientAmount: 893,
        ingredientUnit: "g",
      },
    ],
    missingIngredients: [
      {
        recipeIngredientId: 116,
        recipeId: 52026,
        ingredientsInRecipe: 5,
        ingredientId: 29,
        ingredientAmount: 129,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 117,
        recipeId: 52026,
        ingredientsInRecipe: 5,
        ingredientId: 3,
        ingredientAmount: 166,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 118,
        recipeId: 52026,
        ingredientsInRecipe: 5,
        ingredientId: 23,
        ingredientAmount: 111,
        ingredientUnit: "g",
      },
    ],
    suggestionScore: 0.4,
  },
  {
    recipeId: 294814,
    recipeName: "Recipe 294814",
    recipeUrl: "recipe-294814",
    cuisineId: 10,
    recipeSuggestedTimes: 0,
    recipeIngredientsAverageCommonness: null,
    recipeComplexity: 1,
    recipeSuggestionScore: null,
    recipeTimeInMinutes: 1,
    obligatoryIngredientsAmount: 0,
    matchingIngredients: [
      {
        recipeIngredientId: 95,
        recipeId: 294814,
        ingredientsInRecipe: 5,
        ingredientId: 13,
        ingredientAmount: 196,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 97,
        recipeId: 294814,
        ingredientsInRecipe: 5,
        ingredientId: 2,
        ingredientAmount: 846,
        ingredientUnit: "g",
      },
    ],
    missingIngredients: [
      {
        recipeIngredientId: 93,
        recipeId: 294814,
        ingredientsInRecipe: 5,
        ingredientId: 17,
        ingredientAmount: 726,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 94,
        recipeId: 294814,
        ingredientsInRecipe: 5,
        ingredientId: 23,
        ingredientAmount: 700,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 96,
        recipeId: 294814,
        ingredientsInRecipe: 5,
        ingredientId: 29,
        ingredientAmount: 300,
        ingredientUnit: "g",
      },
    ],
    suggestionScore: 0.4,
  },
  {
    recipeId: 663,
    recipeName: "Recipe 663",
    recipeUrl: "recipe-663",
    cuisineId: 6,
    recipeSuggestedTimes: 0,
    recipeIngredientsAverageCommonness: null,
    recipeComplexity: 1,
    recipeSuggestionScore: null,
    recipeTimeInMinutes: 1,
    obligatoryIngredientsAmount: 0,
    matchingIngredients: [
      {
        recipeIngredientId: 80,
        recipeId: 663,
        ingredientsInRecipe: 3,
        ingredientId: 13,
        ingredientAmount: 148,
        ingredientUnit: "g",
      },
    ],
    missingIngredients: [
      {
        recipeIngredientId: 79,
        recipeId: 663,
        ingredientsInRecipe: 3,
        ingredientId: 3,
        ingredientAmount: 48,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 81,
        recipeId: 663,
        ingredientsInRecipe: 3,
        ingredientId: 17,
        ingredientAmount: 685,
        ingredientUnit: "g",
      },
    ],
    suggestionScore: 0.3333333333333333,
  },
  {
    recipeId: 897,
    recipeName: "Recipe 897",
    recipeUrl: "recipe-897",
    cuisineId: 6,
    recipeSuggestedTimes: 0,
    recipeIngredientsAverageCommonness: null,
    recipeComplexity: 1,
    recipeSuggestionScore: null,
    recipeTimeInMinutes: 1,
    obligatoryIngredientsAmount: 0,
    matchingIngredients: [
      {
        recipeIngredientId: 21,
        recipeId: 897,
        ingredientsInRecipe: 3,
        ingredientId: 13,
        ingredientAmount: 176,
        ingredientUnit: "g",
      },
    ],
    missingIngredients: [
      {
        recipeIngredientId: 19,
        recipeId: 897,
        ingredientsInRecipe: 3,
        ingredientId: 3,
        ingredientAmount: 339,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 20,
        recipeId: 897,
        ingredientsInRecipe: 3,
        ingredientId: 23,
        ingredientAmount: 908,
        ingredientUnit: "g",
      },
    ],
    suggestionScore: 0.3333333333333333,
  },
  {
    recipeId: 5083,
    recipeName: "Recipe 5083",
    recipeUrl: "recipe-5083",
    cuisineId: 7,
    recipeSuggestedTimes: 0,
    recipeIngredientsAverageCommonness: null,
    recipeComplexity: 1,
    recipeSuggestionScore: null,
    recipeTimeInMinutes: 1,
    obligatoryIngredientsAmount: 0,
    matchingIngredients: [
      {
        recipeIngredientId: 86,
        recipeId: 5083,
        ingredientsInRecipe: 3,
        ingredientId: 13,
        ingredientAmount: 797,
        ingredientUnit: "g",
      },
    ],
    missingIngredients: [
      {
        recipeIngredientId: 87,
        recipeId: 5083,
        ingredientsInRecipe: 3,
        ingredientId: 17,
        ingredientAmount: 885,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 88,
        recipeId: 5083,
        ingredientsInRecipe: 3,
        ingredientId: 23,
        ingredientAmount: 569,
        ingredientUnit: "g",
      },
    ],
    suggestionScore: 0.3333333333333333,
  },
  {
    recipeId: 6409,
    recipeName: "Recipe 6409",
    recipeUrl: "recipe-6409",
    cuisineId: 10,
    recipeSuggestedTimes: 0,
    recipeIngredientsAverageCommonness: null,
    recipeComplexity: 1,
    recipeSuggestionScore: null,
    recipeTimeInMinutes: 1,
    obligatoryIngredientsAmount: 0,
    matchingIngredients: [
      {
        recipeIngredientId: 38,
        recipeId: 6409,
        ingredientsInRecipe: 3,
        ingredientId: 13,
        ingredientAmount: 826,
        ingredientUnit: "g",
      },
    ],
    missingIngredients: [
      {
        recipeIngredientId: 39,
        recipeId: 6409,
        ingredientsInRecipe: 3,
        ingredientId: 17,
        ingredientAmount: 530,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 40,
        recipeId: 6409,
        ingredientsInRecipe: 3,
        ingredientId: 29,
        ingredientAmount: 820,
        ingredientUnit: "g",
      },
    ],
    suggestionScore: 0.3333333333333333,
  },
  {
    recipeId: 8671,
    recipeName: "Recipe 8671",
    recipeUrl: "recipe-8671",
    cuisineId: 4,
    recipeSuggestedTimes: 0,
    recipeIngredientsAverageCommonness: null,
    recipeComplexity: 1,
    recipeSuggestionScore: null,
    recipeTimeInMinutes: 1,
    obligatoryIngredientsAmount: 0,
    matchingIngredients: [
      {
        recipeIngredientId: 139,
        recipeId: 8671,
        ingredientsInRecipe: 3,
        ingredientId: 13,
        ingredientAmount: 28,
        ingredientUnit: "g",
      },
    ],
    missingIngredients: [
      {
        recipeIngredientId: 138,
        recipeId: 8671,
        ingredientsInRecipe: 3,
        ingredientId: 23,
        ingredientAmount: 695,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 140,
        recipeId: 8671,
        ingredientsInRecipe: 3,
        ingredientId: 29,
        ingredientAmount: 728,
        ingredientUnit: "g",
      },
    ],
    suggestionScore: 0.3333333333333333,
  },
  {
    recipeId: 884442,
    recipeName: "Recipe 884442",
    recipeUrl: "recipe-884442",
    cuisineId: 3,
    recipeSuggestedTimes: 0,
    recipeIngredientsAverageCommonness: null,
    recipeComplexity: 1,
    recipeSuggestionScore: null,
    recipeTimeInMinutes: 1,
    obligatoryIngredientsAmount: 0,
    matchingIngredients: [
      {
        recipeIngredientId: 136,
        recipeId: 884442,
        ingredientsInRecipe: 6,
        ingredientId: 13,
        ingredientAmount: 761,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 137,
        recipeId: 884442,
        ingredientsInRecipe: 6,
        ingredientId: 2,
        ingredientAmount: 218,
        ingredientUnit: "g",
      },
    ],
    missingIngredients: [
      {
        recipeIngredientId: 132,
        recipeId: 884442,
        ingredientsInRecipe: 6,
        ingredientId: 17,
        ingredientAmount: 743,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 133,
        recipeId: 884442,
        ingredientsInRecipe: 6,
        ingredientId: 29,
        ingredientAmount: 423,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 134,
        recipeId: 884442,
        ingredientsInRecipe: 6,
        ingredientId: 23,
        ingredientAmount: 591,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 135,
        recipeId: 884442,
        ingredientsInRecipe: 6,
        ingredientId: 3,
        ingredientAmount: 71,
        ingredientUnit: "g",
      },
    ],
    suggestionScore: 0.3333333333333333,
  },
  {
    recipeId: 15249,
    recipeName: "Recipe 15249",
    recipeUrl: "recipe-15249",
    cuisineId: 3,
    recipeSuggestedTimes: 0,
    recipeIngredientsAverageCommonness: null,
    recipeComplexity: 1,
    recipeSuggestionScore: null,
    recipeTimeInMinutes: 1,
    obligatoryIngredientsAmount: 0,
    matchingIngredients: [
      {
        recipeIngredientId: 34,
        recipeId: 15249,
        ingredientsInRecipe: 4,
        ingredientId: 13,
        ingredientAmount: 252,
        ingredientUnit: "g",
      },
    ],
    missingIngredients: [
      {
        recipeIngredientId: 35,
        recipeId: 15249,
        ingredientsInRecipe: 4,
        ingredientId: 17,
        ingredientAmount: 999,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 36,
        recipeId: 15249,
        ingredientsInRecipe: 4,
        ingredientId: 23,
        ingredientAmount: 649,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 37,
        recipeId: 15249,
        ingredientsInRecipe: 4,
        ingredientId: 3,
        ingredientAmount: 741,
        ingredientUnit: "g",
      },
    ],
    suggestionScore: 0.25,
  },
  {
    recipeId: 19227,
    recipeName: "Recipe 19227",
    recipeUrl: "recipe-19227",
    cuisineId: 3,
    recipeSuggestedTimes: 0,
    recipeIngredientsAverageCommonness: null,
    recipeComplexity: 1,
    recipeSuggestionScore: null,
    recipeTimeInMinutes: 1,
    obligatoryIngredientsAmount: 0,
    matchingIngredients: [
      {
        recipeIngredientId: 69,
        recipeId: 19227,
        ingredientsInRecipe: 4,
        ingredientId: 13,
        ingredientAmount: 363,
        ingredientUnit: "g",
      },
    ],
    missingIngredients: [
      {
        recipeIngredientId: 67,
        recipeId: 19227,
        ingredientsInRecipe: 4,
        ingredientId: 29,
        ingredientAmount: 54,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 68,
        recipeId: 19227,
        ingredientsInRecipe: 4,
        ingredientId: 17,
        ingredientAmount: 422,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 70,
        recipeId: 19227,
        ingredientsInRecipe: 4,
        ingredientId: 3,
        ingredientAmount: 432,
        ingredientUnit: "g",
      },
    ],
    suggestionScore: 0.25,
  },
  {
    recipeId: 26013,
    recipeName: "Recipe 26013",
    recipeUrl: "recipe-26013",
    cuisineId: 3,
    recipeSuggestedTimes: 0,
    recipeIngredientsAverageCommonness: null,
    recipeComplexity: 1,
    recipeSuggestionScore: null,
    recipeTimeInMinutes: 1,
    obligatoryIngredientsAmount: 0,
    matchingIngredients: [
      {
        recipeIngredientId: 65,
        recipeId: 26013,
        ingredientsInRecipe: 4,
        ingredientId: 13,
        ingredientAmount: 920,
        ingredientUnit: "g",
      },
    ],
    missingIngredients: [
      {
        recipeIngredientId: 63,
        recipeId: 26013,
        ingredientsInRecipe: 4,
        ingredientId: 23,
        ingredientAmount: 935,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 64,
        recipeId: 26013,
        ingredientsInRecipe: 4,
        ingredientId: 29,
        ingredientAmount: 230,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 66,
        recipeId: 26013,
        ingredientsInRecipe: 4,
        ingredientId: 3,
        ingredientAmount: 178,
        ingredientUnit: "g",
      },
    ],
    suggestionScore: 0.25,
  },
  {
    recipeId: 147407,
    recipeName: "Recipe 147407",
    recipeUrl: "recipe-147407",
    cuisineId: 5,
    recipeSuggestedTimes: 0,
    recipeIngredientsAverageCommonness: null,
    recipeComplexity: 1,
    recipeSuggestionScore: null,
    recipeTimeInMinutes: 1,
    obligatoryIngredientsAmount: 0,
    matchingIngredients: [
      {
        recipeIngredientId: 142,
        recipeId: 147407,
        ingredientsInRecipe: 4,
        ingredientId: 13,
        ingredientAmount: 984,
        ingredientUnit: "g",
      },
    ],
    missingIngredients: [
      {
        recipeIngredientId: 141,
        recipeId: 147407,
        ingredientsInRecipe: 4,
        ingredientId: 29,
        ingredientAmount: 689,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 143,
        recipeId: 147407,
        ingredientsInRecipe: 4,
        ingredientId: 23,
        ingredientAmount: 698,
        ingredientUnit: "g",
      },
      {
        recipeIngredientId: 144,
        recipeId: 147407,
        ingredientsInRecipe: 4,
        ingredientId: 17,
        ingredientAmount: 415,
        ingredientUnit: "g",
      },
    ],
    suggestionScore: 0.25,
  },
];

export const ingredientsExample: IIngredient[] = [
  {
    ingredientId: 2,
    ingredientName: "Ingredient2",
    ingredientCategoryId: 1,
    appearanceInRecipesTimes: 0,
    commonnessFromUsers: 0,
    additionScore: 0,
    defaultUnit: "g",
  },
  {
    ingredientId: 3,
    ingredientName: "Ingredient3",
    ingredientCategoryId: 1,
    appearanceInRecipesTimes: 0,
    commonnessFromUsers: 0,
    additionScore: 0,
    defaultUnit: "g",
  },
  {
    ingredientId: 13,
    ingredientName: "Ingredient13",
    ingredientCategoryId: 2,
    appearanceInRecipesTimes: 0,
    commonnessFromUsers: 0,
    additionScore: 0,
    defaultUnit: "g",
  },
  {
    ingredientId: 17,
    ingredientName: "Ingredient17",
    ingredientCategoryId: 2,
    appearanceInRecipesTimes: 0,
    commonnessFromUsers: 0,
    additionScore: 0,
    defaultUnit: "g",
  },
  {
    ingredientId: 23,
    ingredientName: "Ingredient23",
    ingredientCategoryId: 3,
    appearanceInRecipesTimes: 0,
    commonnessFromUsers: 0,
    additionScore: 0,
    defaultUnit: "g",
  },
  {
    ingredientId: 29,
    ingredientName: "Ingredient29",
    ingredientCategoryId: 3,
    appearanceInRecipesTimes: 0,
    commonnessFromUsers: 0,
    additionScore: 0,
    defaultUnit: "g",
  },
];
