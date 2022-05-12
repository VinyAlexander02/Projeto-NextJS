import calc from "../libs/calc";

export default function Calculo() {
  async function handleSum() {
    const calc = (await import("../libs/calc")).default;
    alert(calc.sum(8, 2));
  }

  return (
    <>
      <h1> Calculo </h1>
      <button onClick={handleSum}>Somar</button>
    </>
  );
}
