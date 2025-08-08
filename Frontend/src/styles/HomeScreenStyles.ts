import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#1c2125",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#e2e6ea",
    marginBottom: 20,
    textAlign: "center",
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
  passwordItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#2e343a",
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#4a5157",
  },
  passwordDetails: {
    flex: 1,
  },
  serviceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f8f9fa",
  },
  usernameText: {
    fontSize: 16,
    color: "#adb5bd",
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    padding: 12,
    marginRight: 8,
    backgroundColor: "#007bff",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  editText: {
    color: "#fff",
    fontWeight: "bold",
  },
  deleteButton: {
    padding: 12,
    backgroundColor: "#dc3545",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#6c757d",
  },
  mainActionButton: {
    backgroundColor: "#007bff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  mainActionButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: 0,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
