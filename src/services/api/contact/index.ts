import { BASE_URL } from "@/lib/config";
import { Contact, Contacts } from "./schema";

// This function fetches a list of contacts associated with the specified user ID from the server.
// It handles errors gracefully and returns the fetched contacts if successful.
// Parameters:
// - userId: The ID of the user for whom contacts are being fetched.
export const listContact = async ({ userId }: { userId: string }) => {
  try {
    // Send a GET request to the server to fetch contacts for the specified user ID
    const response = await fetch(`${BASE_URL}/contacts/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      // If the response is not ok, throw an error with the appropriate message
      throw new Error(`Failed to fetch contacts. Status: ${response.status}`);
    }

    // Parse the JSON response
    const contacts = await response.json();

    // Return the fetched contacts
    return contacts as Contacts;
  } catch (error) {
    // If an error occurs during the fetch operation, log the error and re-throw it
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

// Function to add a new contact to the user's contact list
export const addContact = async ({
  name,
  walletAddress,
  tags,
  userId,
}: Omit<Contact, "id" | "count" | "tags"> & { tags: string }) => {
  try {
    // Send a POST request to the server to add the contact
    const response = await fetch(`${BASE_URL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, walletAddress, tags, userId }),
    });

    // Check if the request was successful
    if (!response.ok) {
      const error = await response.json();
      // Throw an error if the request was not successful
      throw new Error(error.message);
    }

    // Parse the response body as JSON
    const contact = await response.json();

    // Return the newly added contact
    return contact;
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error adding contact:");
    throw error; // Re-throw the error to be handled by the caller
  }
};
