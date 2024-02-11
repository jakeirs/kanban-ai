"use client";

export default function ClientConsoleLog(props: {
  dataToLog: any;
  hide?: boolean;
}) {
  const { dataToLog, hide } = props;
  const content = JSON.stringify(dataToLog, null, 2);
  console.log("ClientConsoleLog ", `${content.substring(0, 8)}`, dataToLog);

  return (
    <div>
      <pre>{hide ? null : content}</pre>
    </div>
  );
}
