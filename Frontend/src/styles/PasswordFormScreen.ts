import { StyleSheet } from "react-native";

export const passwordFormStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#1c2125",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#e2e6ea",
    marginBottom: 24,
    textAlign: "center",
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
  saveButton: {
    backgroundColor: "#007bff",
    padding: 16,
    alignItems: "center",
    borderRadius: 12,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
