let cocktails = [];
let shownCocktails = [];

async function fetchData() {
  try {
    const response = await fetch("drank.json");
    if (!response.ok) {
      throw new Error("Failed to fetch cocktails");
    }
    cocktails = await response.json();
    showRandomUniqueCocktail();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function showRandomUniqueCocktail() {
  if (cocktails.length === 0) {
    alert("Geen cocktails beschikbaar.");
    return;
  }

  const remainingCocktails = cocktails.filter(
    (cocktail) => !shownCocktails.includes(cocktail)
  );

  if (remainingCocktails.length === 0) {
    shownCocktails = [];
  }

  const randomIndex = Math.floor(Math.random() * remainingCocktails.length);
  const randomCocktail = remainingCocktails[randomIndex];
  shownCocktails.push(randomCocktail);

  displayCocktail(randomCocktail);
}

function displayCocktail(cocktail) {
  document.getElementById("drinkName").textContent = cocktail.name;
  document.getElementById("drinkImg").src = `/img/${cocktail.img}`;

  const ingredientsList = document.querySelector("ul");
  ingredientsList.innerHTML = "";

  cocktail.ingredients.forEach(function (ingredient) {
    const listItem = document.createElement("li");
    listItem.textContent = ingredient;
    ingredientsList.appendChild(listItem);
  });
}

document.querySelector("button").addEventListener("click", showRandomUniqueCocktail);

fetchData();
