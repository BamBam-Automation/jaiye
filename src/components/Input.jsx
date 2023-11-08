const Input = (props) => {
  return (
    <div className="bg-gradient-to-b rounded-lg relative from-[#EB7C4C] to-[#A03484] p-0.5">
      <input
        type={props.type}
        className={`focus:outline-none focus:border-none focus:ring-0 placeholder-transparent peer bg-[#F9F9F9] w-full h-10 px-4 py-3 rounded ${
          props.type === "password" ? "pr-14" : ""
        }`}
        autoComplete={props.autoComplete}
        name=""
        id={props.id}
        placeholder={props.label}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
      />
      <label
        className="absolute text-base -top-3 left-4 px-1 bg-[#f9f9f9] peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:left-4 peer-placeholder-shown:text-lg peer-focus:text-base peer-focus:-top-3 peer-focus:left-4 peer-focus:px-1 peer-focus:bg-[#F9F9F9] transition-all"
        htmlFor={props.id}
      >
        {props.label}
      </label>
    </div>
  );
};

export default Input;
