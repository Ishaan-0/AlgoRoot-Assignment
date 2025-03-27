"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong, faDownLong } from "@fortawesome/free-solid-svg-icons";

export default function Home() {

  const [user, setUser] = useState<any>(null);

  const [recipes, setRecipes] = useState<any>(null);

  const [page, setPage] = useState<number>(1);
  
  const [search, setSearch] = useState<string>("");
  const [filteredRecipes, setFilteredRecipes] = useState<any>(null);
  
  useEffect(()=>{
    const name = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    if (name && email) {
      setUser({ name, email });
    } else {
      window.location.href = "/login";
    }
    
    // Fetch recipes data from the API
     fetch('https://dummyjson.com/recipes')
    .then((response) => {return response.json()})
    .then((data) => {
      const recipesData = data;
      console.log(recipesData);
      setRecipes(recipesData.recipes);
      setFilteredRecipes(recipesData.recipes);
    })
    // use id, name, difficult and preptime
  }, [])

  useEffect(() => {
    const filtered = recipes?.filter((recipe: any) => {
      return recipe.name.toLowerCase().includes(search.toLowerCase())
    });
    setFilteredRecipes(filtered);
    if (search == '') {
      setFilteredRecipes(recipes);
    }
  }, [search]);

  function sortAsc() {
    const sorted = [...filteredRecipes].sort((a: any, b: any) => {
      return a.prepTimeMinutes - b.prepTimeMinutes;
    }
    );
    setFilteredRecipes(sorted);
  }

  function sortDesc() {
    const sorted = [...filteredRecipes].sort((a: any, b: any) => {
      return b.prepTimeMinutes - a.prepTimeMinutes;
    }
    );
    setFilteredRecipes(sorted);
  }

  return (
    <div className="h-screen w-screen overflow-auto bg-gray-200">
      {user && <Navbar user={user} /> }
      <Sidebar active="details" />
      <div className="pt-24 md:pl-52 md:pr-24 px-6">
        <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." className="border border-gray-300 rounded-md p-2 mb-4" />
        <table className="w-full">
          <thead> 
            <tr> 
              <th className="px-4 py-2 border">ID</th> 
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Difficulty</th>
              <th className="px-4 py-2 border">Prep Time 
                <FontAwesomeIcon icon={faDownLong} onClick={sortAsc} className="ml-2 cursor-pointer" />
                <FontAwesomeIcon icon={faUpLong} onClick={sortDesc} className="ml-2 cursor-pointer" />
              </th>
            </tr>
          </thead>
          <tbody> 
            {filteredRecipes &&
              filteredRecipes
              .slice((page - 1) * 10, page * 10)
              .map((recipe: any) => (
                <tr key={recipe.id}>
                <td className="border px-4 py-2">{recipe.id}</td>
                <td className="border px-4 py-2">{recipe.name}</td>
                <td className="border px-4 py-2">{recipe.difficulty}</td>
                <td className="border px-4 py-2">{recipe.prepTimeMinutes}</td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="border px-4 text-center py-2">
                <button onClick={() => setPage(page - 1)} disabled={page === 1} className="bg-gray-300 px-4 py-2 mr-2 rounded-md">Previous</button>
                <button onClick={() => setPage(page + 1)} disabled={filteredRecipes?.length <= page * 10} className="bg-gray-300 px-4 py-2 rounded-md">Next</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
