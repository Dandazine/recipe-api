import { useEffect, useState } from "react";
import Recipe from "./Recipe";

function App() {
  // Makes sure everything is all prepared before rendering html
  const [mounted, setMounted] = useState(false);
  // Stores all the recipes in the array
  const [recipes, setRecipes] = useState([]);
  // Stores the search input value
  const [content, setContent] = useState("");
  // Stores the full finished search text
  const [search, setSearch] = useState("beef");

  useEffect(() => {
    fetchRecipe();
  }, [search]);

  const fetchRecipe = async () => {
    // fetch response
    const response = await fetch(
      `https://api.edamam.com/search?q=${search}&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}`
    );
    // the data from the response and makes it into a json
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  // Handles user content
  const handleContent = (e) => {
    setContent(e.target.value);
    console.log(content);
  };

  // Handles the Search
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(content);
    setContent("");
  };

  useEffect(() => {
    setMounted(true);
  }, [recipes]);

  return (
    <>
      {mounted ? (
        <>
          <main>
            <section>
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={content}
                  onChange={handleContent}
                />
                <button type="submit">Search</button>
              </form>
            </section>
            {recipes.map((recipe, i) => (
              <Recipe
                key={i}
                title={recipe.recipe.label}
                img={recipe.recipe.image}
                url={recipe.recipe.url}
              />
            ))}
          </main>
          <footer></footer>
        </>
      ) : (
        "Please Wait"
      )}
    </>
  );
}

export default App;
