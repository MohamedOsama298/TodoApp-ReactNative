import Router from "./src/Routes";
import {store} from "./src/Redux/Store";
import { Provider } from "react-redux";
export default function App() {
  return (
    <>
    <Provider store={store}>
      <Router />
    </Provider>
    </>
  );
}