const FormInput = ({ label, type = "text", value, onChange, name, required = true }) => (
  <div className="mb-4">
    <label className="block text-sm text-text-secondary mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-3 py-2 rounded-md bg-surface border border-surface-border text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
    />
  </div>
);

export default FormInput;
