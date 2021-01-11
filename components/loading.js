import { ScaleLoader } from "react-spinners";
import styles from "./loading.module.css";

function Loading({ loading }) {
  const stylesToggleDisplay = {
    display: loading ? "flex" : "none",
  };

  return (
    <div className={styles.loading} style={stylesToggleDisplay}>
      <ScaleLoader
        loading={loading}
        height={200}
        width={10}
        radius={2}
        margin={2}
      />
    </div>
  );
}

export default Loading;
