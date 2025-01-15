import { Header } from "./Header";

const headerProps = {
  title: "This is my note",
  lastVisit: "12 days since last visit",
  readingTime: "5m reading",
};

export const NotesDetails = () => (
  <div>
    <Header {...headerProps} />
  </div>
);
