import React from "react";
import styles from "./errorMessage.module.css";

function ErrorMessage({ error }) {
  return (
    error && (
      <div className={styles.errorMessage}>
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    )
  );
}

export default ErrorMessage;
