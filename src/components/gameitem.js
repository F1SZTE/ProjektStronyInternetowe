export default function GameForm({ game = {}, onSave }) {
  const fields = ["title", "genre", "year", "rating"];

  return (
    <form onSubmit={e => {
      e.preventDefault();
      onSave(Object.fromEntries(
        fields.map(f => [f, f === "year" || f === "rating"
          ? Number(e.target[f].value) : e.target[f].value])
      ));
    }}>
      {fields.map(f => (
        <input key={f} name={f} placeholder={f}
          defaultValue={game[f] ?? ""} required />
      ))}
      <button type="submit">Zapisz</button>
    </form>
  );
}