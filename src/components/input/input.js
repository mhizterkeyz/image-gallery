import styles from "./input.module.css";

export const Input = ({ type, placeholder, onChange, name, value }) => {
  return (
    <input
      className={styles.input}
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      value={value}
    />
  );
};
