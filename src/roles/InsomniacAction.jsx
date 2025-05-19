import PrimaryButton from "../components/PrimaryButton";

function InsomniacAction({ onSubmit, name }) {
  return (
    <div>
      <p>You are the <strong>Insomniac</strong>.</p>
      <p>You will wake up at the end of the night to see what your role has become.</p>

      <PrimaryButton onClick={() => onSubmit({insomniac: "insomniac"})} name={name} color="blue" />
    </div>
  );
}

export default InsomniacAction;
