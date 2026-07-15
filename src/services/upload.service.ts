import api from "../lib/axios";

export interface UploadImageResponse {
  url: string;
  publicId: string;
}

interface UploadResponse {
  success: boolean;
  message: string;
  data: string[];
}

class UploadService {
  async uploadPropertyImages(files: File[]): Promise<string[]> {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("images", file);
    });

    const { data } = await api.post<UploadResponse>(
      "/upload/property-images",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data.data;
  }
}

export default new UploadService();