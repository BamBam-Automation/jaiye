import { Button } from "@material-tailwind/react";

const PrimaryButton = (props) => {
  return (
    <Button
      onClick={props.onClick}
      disabled={props.disabled}
      className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary text-white hover:bg-primary/75 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 transition-all"
    >
      {props.text}
    </Button>
  );
};

export default PrimaryButton;
