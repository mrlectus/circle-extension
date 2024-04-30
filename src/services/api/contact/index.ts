import { BASE_URL } from "@/lib/config";
import { Contact, Contacts } from "./schema";

export const listContact = async ({ userId }: { userId: string }) => {
  const response = await fetch(`${BASE_URL}/contacts/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const contacts = await response.json();
  return contacts as Contacts;
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
