export function getBaseURL() {
  const environment = import.meta.env.VITE_ENVIRONMENT;
  switch (environment) {
    case "dev":
      return "http://localhost:8000";
    case "stage":
      return "http://127.0.0.1:3000";
    case "prod":
      return "http://127.0.0.1:3000"; // Change production url later
    default:
      throw new Error(`Invalid environment: ${environment}`);
  }
}
