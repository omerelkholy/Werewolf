import PrimaryButton from "../components/PrimaryButton";

function DreamWolfAction({ onSubmit, name }) {
  return (
    <div>
      <p>You are the <strong>DreamWolf</strong>. You do not wake up at night and don't know the other Werewolves.</p>
      <PrimaryButton onClick={() => onSubmit({dreamWolf: "dreamWolf"})} name={name} color="gray" />
    </div>
  );
}

export default DreamWolfAction;