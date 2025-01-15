import { Header } from "./Header";

const headerProps = {
  title: "This is my note",
  duration: "strong",
  calories: 123,
};

export const NotesDetails = () => (
  <div>
    <Header {...headerProps} />
  </div>
);
