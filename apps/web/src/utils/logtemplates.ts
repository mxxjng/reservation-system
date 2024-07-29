export function generateEntityLogTemplate(
  entityName: string,
  userName: string,
  entityValue: string,
  type: "Auth" | "Create" | "Update" | "Delete"
) {
  return `User ${userName} ${generateActionWord(
    type
  )} ${entityName}: ${entityValue}`;
}

function generateActionWord(type: "Auth" | "Create" | "Update" | "Delete") {
  switch (type) {
    case "Auth":
      return "logged in";
    case "Create":
      return "created";
    case "Update":
      return "updated";
    case "Delete":
      return "deleted";
  }
}
