import { Provider } from "react-redux";
import { Screens } from "./screens";
import { setupStore } from "./store";
import "./styles.css";

const store = setupStore();

export const App = () => {
  return (
    <div className="app">
      <Provider store={store}>
        <Screens />
      </Provider>
    </div>
  );
};
