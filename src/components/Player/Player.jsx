import { useState } from "react";

export default function Player({ initialName, symbol, isActive }) {
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleEditClick() {
    setIsEditing((currentStatus) => !currentStatus);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            required
          />
        ) : (
          <span className="player-name">{name}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{!isEditing ? "Edit" : "Save"}</button>
    </li>
  );
}
