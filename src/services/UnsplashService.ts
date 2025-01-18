export class UnsplashService {
  private readonly accessKey: string;

  constructor(accessKey: string) {
    this.accessKey = accessKey;
  }

  async fetchRandomPhoto(query: string): Promise<string> {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&client_id=${this.accessKey}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch image from Unsplash");
    }

    const data = await response.json();
    return data.urls.small;
  }
}
