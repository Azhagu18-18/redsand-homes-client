import api from "../lib/axios";
import { ContactFormValues } from "../lib/validations/contact.schema";

export interface ContactResponse {
  success: boolean;
  message: string;
}

class ContactService {
  async sendMessage(
    data: ContactFormValues
  ): Promise<ContactResponse> {
    const response = await api.post<ContactResponse>(
      "/contact",
      data
    );

    return response.data;
  }
}

export const contactService = new ContactService();