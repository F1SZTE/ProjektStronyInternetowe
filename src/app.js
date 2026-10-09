import { useState } from "react";
import gamesData from "./data";
import Dialog from "./Dialog";
import GameForm from "./GameForm";
import GameItem from "./GameItem";
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

  list.sort((a, b) => sort === "title"
    ? a.title.localeCompare(b.title)
    : b.rating - a.rating
  );

  const save = g => {
    setGames(g.id
      ? games.map(x => x.id === g.id ? g : x)
      : [...games, { ...g, id: Date.now() }]
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

      {edit !== null && (
        <GameForm
          game={edit}
          onSave={save}
          onCancel={() => setEdit(null)}
        />
      )}

      {list.map(g => (
        <GameItem
          key={g.id}
          game={g}
          onEdit={setEdit}
          onDelete={setDel}
        />
      ))}

      {!list.length && <p>Brak wyników.</p>}

      {del !== null && (
        <Dialog
          title="Usuń grę"
          message="Czy na pewno chcesz usunąć tę grę?"
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