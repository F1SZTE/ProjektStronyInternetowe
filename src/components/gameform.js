export default function GameCard({ game, onEdit, onDelete }) {
  return (
    <article>
      <h2>{game.title}</h2>
      <p>{game.genre} | {game.year} | {game.rating}/10</p>
      <button onClick={() => onEdit(game)}>Edytuj</button>
      <button onClick={() => onDelete(game.id)}>Usuń</button>
    </article>
  );
}