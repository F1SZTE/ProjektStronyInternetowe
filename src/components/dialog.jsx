function Dialog({ title, message, onConfirm, onCancel, confirmText = "Potwierdź" }) {
  return (
    <div className="dialog-background">
      <div className="dialog">
        <h2>{title}</h2>
        <p>{message}</p>

        <div className="dialog-buttons">
          <button onClick={onCancel}>Anuluj</button>
          <button onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}

export default Dialog;