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

  useEffect(() => {
    fetchRecipe();
  }, [search]);

  const fetchRecipe = async () => {
    // fetch response
    const response = await fetch(
      `https://api.edamam.com/search?q=${search}&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}&from=0&to=30`
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
    if (content.trim()) {
      setSearch(content);
    }
    setContent("");
  };

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
                  className="bg-[#ffe598] text-[#12151d] py-1 px-6 rounded-xl block mx-auto"
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
