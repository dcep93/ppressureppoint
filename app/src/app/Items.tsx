var startTime = Date.now();

export default function Items() {
  return <div>{startTime}</div>;
}

export function setStartTime(_startTime: number | null = null) {
  startTime = _startTime || Date.now();
}
