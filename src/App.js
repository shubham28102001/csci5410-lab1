import { BrowserRouter,Routes,Route} from "react-router-dom";
import ListNotes from "./ListNotes";
import EditNote from "./EditNote";
import CreateNote from "./CreateNote";
import ViewNote from "./ViewNote";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<ListNotes />}></Route>
        <Route path="/edit" element={<EditNote />}></Route>
        <Route path="/create" element={<CreateNote />}></Route>
        <Route path="/view" element={<ViewNote />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
