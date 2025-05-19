import PrimaryButton from "../components/PrimaryButton";

function JokerAction({ onSubmit, name }) {
  return (
    <div>
      <p>You are the <strong>Joker</strong>. Your goal is to get voted out.</p>
      <PrimaryButton onClick={() => onSubmit({joker: "joker"})} name={name} color="purple" />
    </div>
  );
}

export default JokerAction;
