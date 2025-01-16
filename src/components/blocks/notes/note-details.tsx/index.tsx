import { BodyNote } from "./BodyNote";
import { exampleBodyNoteProps } from "./BodyNote/props";
import { Details } from "./Details";
import { detailsProps } from "./Details/props";
import { Header } from "./Header";
import { Eye, TestTube } from "lucide-react";

const tabs = [
  {
    value: "view",
    icon: Eye,
  },
  {
    value: "labs",
    icon: TestTube,
  },
];

const headerProps = {
  title: "This is my note",
  lastVisit: "12 days since last visit",
  readingTime: "5m reading",
};

export const NotesDetails = () => (
  <div className="min-h-screen flex flex-col">
    <Header {...headerProps} />
    <Details {...detailsProps} />
    <BodyNote {...exampleBodyNoteProps} className="flex-1" />
  </div>
);
