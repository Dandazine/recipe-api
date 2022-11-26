import { waitForElementToBeRemoved } from "@testing-library/react";
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
  const [search, setSearch] = useState("popular");

  // Runs the function fetch recipe when the "search" state is updated
  useEffect(() => {
    fetchRecipe();
  }, [search]);

  // Fetches data from the API to get an array of objects (recipes) and then initializes that array to the "recipe" state
  const fetchRecipe = async () => {
    // fetch response
    const response = await fetch(
      `https://api.edamam.com/search?q=${search}&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}&from=0&to=30`
    );
    // the data from the response and makes it into a json
    const data = await response.json();
    setRecipes(data.hits);
  };

  // Handles user content- everytime that input field is updated, it updates the "content" state and stores that difference in the content, then when user submits the form, it takes whatever that was in the content field and applies it to the search
  const handleContent = (e) => {
    setContent(e.target.value);
  };

  // Handles the Search- once user presses the submit button (or enter) to complete the form, it will 1. prevent the form from doing what normal forms do, then 2. find the content state to see what the user is trying to search for, then 3. it updates the search state which then triggers a useEffect that calls the fetch recipes function
  const handleSearch = (e) => {
    e.preventDefault();
    if (content.trim()) {
      setSearch(content);
    }
    setContent("");
  };

  // This could be removed, but this is essentially to make sure the api and all required functions are all properly mounted before it runs any of the html
  useEffect(() => {
    setMounted(true);
  }, [recipes]);

  return (
    <>
      {mounted ? (
        <>
          <main className="bg-[#12151d] text-[#fbfcfb] min-h-screen h-full">
            <section className="mx-auto sticky z-50 top-0 p-6 bg-[#171e2b] max-w-max grid grid-cols-1 rounded-b-3xl shadow-2xl border-current">
              <h1 className="text-center text-[#d6fa52]">
                Search for your recipes!
              </h1>
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={content}
                  onChange={handleContent}
                  className="px-3 py-1 text-[#12151d] rounded-md my-3"
                />
                <button
                  type="submit"
                  className="bg-[#ffe598] hover:bg-[#e0c576] text-[#12151d] py-1 px-6 rounded-xl block mx-auto"
                >
                  Search
                </button>
              </form>
            </section>
            <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center place-content-center md:max-w-[650px] lg:max-w-[1000px] mx-auto gap-6 py-6">
              {recipes.map((recipe) => (
                <Recipe
                  key={recipe.recipe.uri}
                  title={recipe.recipe.label}
                  img={recipe.recipe.image}
                  url={recipe.recipe.url}
                  host={recipe.recipe.source}
                />
              ))}
            </section>
          </main>
        </>
      ) : (
        "Please Wait"
      )}
    </>
  );
}

export default App;
