import { StyleSheet } from "react-native";

export const registerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#1c2125",
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  logo: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#e2e6ea",
  },
  slogan: {
    fontSize: 16,
    color: "#6c757d",
    marginTop: 8,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#333a40",
    borderColor: "#4a5157",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    color: "#f8f9fa",
  },
  buttonContainer: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 16,
    alignItems: "center",
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#2e343a",
    padding: 16,
    alignItems: "center",
    borderRadius: 12,
  },
  secondaryButtonText: {
    color: "#007bff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
