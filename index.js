const { initializeDatabase } = require('./db/db.connect');
const Recipe = require('./models/recipe.models');
const PORT = 3000;
const express = require('express');
const app = express();

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

initializeDatabase();
app.use(express.json());

async function createRecipe(newRecipe) {
  try {
    const recipe = new Recipe(newRecipe);
    const saveRecipe = await recipe.save();
    console.log(saveRecipe);
    return saveRecipe;
  } catch (error) {
    console.log(error);
  }
}

app.post('/recipes', async (req, res) => {
  try {
    const saveRecipe = await createRecipe(req.body);
    res
      .status(201)
      .json({ message: 'New recipe added successfully', recipe: saveRecipe });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add a new recipe' });
  }
});

//6
async function readAllRecipes() {
  try {
    const allRecipes = await Recipe.find();
    return allRecipes;
  } catch (error) {
    console.log(error);
  }
}

app.get('/recipes', async (req, res) => {
  try {
    const allRecipes = await readAllRecipes();
    if (allRecipes.length != 0) {
      res.json(allRecipes);
    } else {
      res.status(404).json({ error: 'No recipe found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch all recipes' });
  }
});

//7
async function readRecipeByTitle(recipeTitle) {
  try {
    const recipe = await Recipe.findOne({ title: recipeTitle });
    // console.log(recipe);
    return recipe;
  } catch (error) {
    console.log(error);
  }
}

app.get('/recipes/:recipeTitle', async (req, res) => {
  try {
    const recipe = await readRecipeByTitle(req.params.recipeTitle);
    if (recipe) {
      res.status(200).json({ message: `recipe found`, recipe: recipe });
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get a recipe' });
  }
});

//8
async function readRecipeByAuthor(recipeAuthor) {
  try {
    const recipe = await Recipe.findOne({ author: recipeAuthor });
    // console.log(recipe);
    return recipe;
  } catch (error) {
    console.log(error);
  }
}

app.get('/recipes/author/:recipeAuthor', async (req, res) => {
  try {
    const recipe = await readRecipeByAuthor(req.params.recipeAuthor);
    if (recipe) {
      res.status(200).json({ message: `recipe found`, recipe: recipe });
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get a recipe' });
  }
});

//9
async function readRecipyByDifficulty(difficultyLevel) {
  try {
    const recipe = await Recipe.find({ difficulty: difficultyLevel });
    // console.log(recipe);
    return recipe;
  } catch (error) {
    console.log(error);
  }
}

app.get('/recipes/difficulty/:level', async (req, res) => {
  try {
    const recipes = await readRecipyByDifficulty(req.params.level);
    if (recipes.length != 0) {
      res.status(200).json({ message: `recipes found`, recipe: recipes });
    } else {
      res.status(404).json({ error: 'Recipes not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get a recipe' });
  }
});

//10
async function updateRecipe(recipeId, dataToUpdate) {
  try {
    const recipe = await Recipe.findByIdAndUpdate(recipeId, dataToUpdate, {
      new: true,
    });
    // console.log(recipe);
    return recipe;
  } catch (error) {
    console.log(error);
  }
}

app.post('/recipes/difficulty/:recipeId', async (req, res) => {
  try {
    const recipe = await updateRecipe(req.params.recipeId, req.body);
    if (recipe) {
      res
        .status(200)
        .json({ message: 'Recipe updated successfully', recipe: recipe });
    } else {
      res.status(404).json({ error: 'Recipes not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update a recipe' });
  }
});

//11
async function updateRecipeTime(recipeTitle, dataToUpdate) {
  try {
    const recipe = await Recipe.findOneAndUpdate(
      { title: recipeTitle },
      dataToUpdate,
      { new: true }
    );
    return recipe;
  } catch (error) {
    console.log(error);
  }
}

app.post('/recipes/time/:recipeTitle', async (req, res) => {
  try {
    const recipe = await updateRecipeTime(req.params.recipeTitle, req.body);
    if (recipe) {
      res
        .status(200)
        .json({ message: 'Recipe updated successfully', recipe: recipe });
    } else {
      res.status(404).json({ error: 'Recipes not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update a recipe' });
  }
});

//12
async function deleteRecipe(recipeId) {
  try {
    const recipe = await Recipe.findByIdAndDelete(recipeId);
    console.log(recipe);
    return recipe;
  } catch (error) {
    console.log(error);
  }
}

app.delete('/recipes/deletedata/:recipeId', async (req, res) => {
  try {
    const recipe = await deleteRecipe(req.params.recipeId);
    if (recipe) {
      res
        .status(200)
        .json({ message: 'Recipe deleted successfully', recipe: recipe });
    } else {
      res.status(404).json({ error: 'Recipes not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete a recipe' });
  }
});
