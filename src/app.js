import { useState } from "react";
import gamesData from "./data";
import Dialog from "./Dialog";
import "./App.css";

export default function App() {
  const [games, setGames] = useState(gamesData);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("Wszystkie");
  const [sort, setSort] = useState("title");
  const [edit, setEdit] = useState(null);
  const [del, setDel] = useState(null);

  let list = games
    .filter(g => g.title.toLowerCase().includes(search.toLowerCase()))
    .filter(g => genre === "Wszystkie" || g.genre === genre);

  list.sort((a,b) =>
    sort === "title"
      ? a.title.localeCompare(b.title)
      : b.rating - a.rating
  );

  const save = g => {
    setGames(g.id
      ? games.map(x => x.id === g.id ? g : x)
      : [...games, {...g, id: Date.now()}]
    );
    setEdit(null);
  };

  return (
    <main>
      <h1>Biblioteka gier</h1>

      <input
        placeholder="Szukaj..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <select value={genre} onChange={e => setGenre(e.target.value)}>
        <option>Wszystkie</option>
        {[...new Set(games.map(g => g.genre))].map(g =>
          <option key={g}>{g}</option>
        )}
      </select>

      <select value={sort} onChange={e => setSort(e.target.value)}>
        <option value="title">Nazwa</option>
        <option value="rating">Ocena</option>
      </select>

      <button onClick={() => setEdit({})}>Dodaj</button>

      {list.map(g => (
        <article key={g.id}>
          <h2>{g.title}</h2>
          <p>{g.genre} | {g.year} | {g.rating}/10</p>
          <button onClick={() => setEdit(g)}>Edytuj</button>
          <button onClick={() => setDel(g.id)}>Usuń</button>
        </article>
      ))}

      {!list.length && <p>Brak wyników.</p>}

      {del && (
        <Dialog
          title="Usuń grę"
          message="Czy usunąć?"
          onCancel={() => setDel(null)}
          onConfirm={() => {
            setGames(games.filter(g => g.id !== del));
            setDel(null);
          }}
          confirmText="Usuń"
        />
      )}
    </main>
  );
}