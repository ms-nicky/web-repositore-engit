import requests
import json
import os

API_KEY = "PvCxweeVWU"
API_ENDPOINT = "http://localhost:8080/api/download/tiktok"

def get_tiktok_slide_urls(tiktok_url):
    """Ambil video_nowm array dari API"""
    url = f"{API_ENDPOINT}?url={tiktok_url}&apikey={API_KEY}"
    response = requests.get(url)
    data = response.json()
    
    if not data.get("status"):
        raise Exception("Gagal ambil data dari API")
    
    return data["result"]["video_nowm"]

def save_to_json(filename, urls):
    """Simpan URL ke JSON, tambah kalau sudah ada"""
    if os.path.exists(filename):
        with open(filename, "r", encoding="utf-8") as f:
            try:
                existing_data = json.load(f)
            except json.JSONDecodeError:
                existing_data = []
    else:
        existing_data = []
    
    # Ambil url yang sudah ada
    existing_urls = {item["url"] for item in existing_data}
    
    # Tambahkan hanya URL baru
    for url in urls:
        if url not in existing_urls:
            existing_data.append({"url": url})
    
    # Simpan lagi ke file
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(existing_data, f, indent=2, ensure_ascii=False)

def main():
    tiktok_url = input("Masukkan URL TikTok slide: ").strip()
    filename = input("Masukkan nama file JSON (contoh: elaina.json): ").strip()
    
    try:
        urls = get_tiktok_slide_urls(tiktok_url)
        save_to_json(filename, urls)
        print(f"✅ Berhasil menambahkan {len(urls)} URL ke {filename}")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()
