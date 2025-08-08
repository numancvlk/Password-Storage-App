import { StyleSheet } from "react-native";

export const passwordDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#1c2125",
  },
  serviceTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#e2e6ea",
    marginBottom: 20,
    textAlign: "center",
  },
  detailCard: {
    backgroundColor: "#2e343a",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#4a5157",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#adb5bd",
    marginBottom: 8,
  },
  value: {
    fontSize: 18,
    color: "#f8f9fa",
    flexShrink: 1,
  },
  copyableContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  passwordText: {
    fontSize: 18,
    color: "#f8f9fa",
    flexShrink: 1,
  },
  eyeIcon: {
    paddingHorizontal: 12,
  },
  buttonContainer: {
    marginTop: 20,
  },
  editButton: {
    backgroundColor: "#007bff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
