export interface ToolNextAction {
  waitForUserResponse: boolean;
  actImmediatelly: boolean;
  nextToolToUse?:
    | "confirmationTool"
    | "afterConfirmationTool"
    | "calendarTool"
    | "generalTool"
    | string;
}

export interface ToolResponse<T = any> {
  success: boolean;
  nextAction: ToolNextAction;
  context?: {
    data: T;
  };
  userResponse?: string;
}
