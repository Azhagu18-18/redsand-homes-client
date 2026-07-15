import api from "../lib/axios";

export interface SubscribeNewsletterPayload {
  email: string;
}

export interface SubscribeNewsletterResponse {
  success: boolean;
  message: string;
}

const newsletterService = {
  async subscribe(
    payload: SubscribeNewsletterPayload
  ): Promise<SubscribeNewsletterResponse> {
    const { data } = await api.post<SubscribeNewsletterResponse>(
      "/newsletter/subscribe",
      payload
    );

    return data;
  },
};

export default newsletterService;