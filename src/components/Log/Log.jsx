export default function Log({ turns }) {
  const orderedLog = [...turns].reverse();

  return (
    <ol id="log">
      {orderedLog.map((turn, index) => (
        <li key={`${turn.square.row}_${turn.square.col}`}>
          Turn {index + 1} = {turn.player} selected {turn.square.row},{" "}
          {turn.square.col}
        </li>
      ))}
    </ol>
  );
}
