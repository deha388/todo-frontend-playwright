# Todo Frontend Application

Next.js ile geliştirilmiş basit bir Todo uygulaması.

## 🚀 Özellikler

- ✅ Todo ekleme
- ✅ Todo listesi görüntüleme
- ✅ Güzel, responsive UI
- ✅ Backend entegrasyonu

## 🛠️ Teknolojiler

- **Framework:** Next.js 14
- **Dil:** TypeScript  
- **Test:** Jest, React Testing Library, Playwright, Pact.js
- **Container:** Docker

## 🏃‍♂️ Hızlı Başlangıç

### Local Development

```bash
# Bağımlılıkları yükle
npm install

# Development server'ı başlat
npm run dev

# Browser'da aç
open http://localhost:3000
```

### Backend ile Birlikte

Backend'in `http://localhost:8083` adresinde çalıştığından emin ol veya environment variable ayarla:

```bash
export NEXT_PUBLIC_API_URL=http://your-backend-url:port
npm run dev
```

## 🧪 Testler

```bash
# Tüm testler
npm test

# E2E testler (Playwright)
npm run test:e2e

# Contract testler (Pact.js) 
npm run test:contracts
```

## 🐳 Docker ile Çalıştırma

### 1. Docker Image Oluştur
```bash
docker build -t todo-frontend .
```

### 2. Container Çalıştır
```bash
# Basit çalıştırma
docker run -p 3000:3000 todo-frontend

# Backend URL ile
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://your-backend:8083 todo-frontend

# Docker Compose ile
docker-compose up
```

## ☁️ Cloud Deployment

### Seçenek A: VM Deployment (Docker)
```bash
# 1. VM oluştur (Ubuntu 20.04+)
# 2. SSH ile bağlan
# 3. Deploy script'ini çalıştır:

curl -O https://raw.githubusercontent.com/your-username/todo-frontend/main/deploy.sh
chmod +x deploy.sh
BACKEND_URL=http://your-backend-server:8083 ./deploy.sh
```

### Seçenek B: Kubernetes Deployment
```bash
# 1. Kubernetes cluster'ına bağlan
# 2. Docker image'ı build et ve registry'e push et:

docker build -t your-registry/todo-frontend:latest .
docker push your-registry/todo-frontend:latest

# 3. Kubernetes'e deploy et:
kubectl apply -f k8s-simple.yaml

# 4. External IP al:
kubectl get service todo-frontend-service

# 5. Backend URL'i güncelle (gerekirse):
kubectl edit deployment todo-frontend
```

### Seçenek C: Manuel VM Setup
```bash
# VM'de Docker kur
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Projeyi klonla
git clone https://github.com/your-username/todo-frontend.git
cd todo-frontend

# Environment variable ayarla
export NEXT_PUBLIC_API_URL=http://your-backend-server:8083

# Çalıştır
docker-compose up -d
```

## 🚀 CI/CD Pipeline

GitHub'a push ettiğinde otomatik çalışır:
```
build → test → dockerize → deploy
```

- **build**: Next.js derler
- **test**: Unit + Component + Contract + E2E testler
- **dockerize**: Docker image oluşturur
- **deploy**: Production'a yayınlar (manuel onay ile)

## 📁 Proje Yapısı

```
todo-frontend-playwright/
├── src/
│   ├── app/              # Next.js sayfaları
│   ├── components/       # React bileşenleri  
│   ├── hooks/            # Custom React hooks
│   └── services/         # API servisleri
├── tests/                # Tüm testler
├── .github/workflows/    # CI/CD pipeline
├── Dockerfile            # Docker container
├── docker-compose.yml    # Docker orchestration
├── k8s-simple.yaml       # Kubernetes deployment
├── deploy.sh             # VM deployment script
└── package.json
```

## 🌐 Backend Bağlantısı

Frontend otomatik olarak `http://localhost:8083` adresindeki backend'e bağlanır.

### API Endpoints
- `GET /api/todos` - Tüm todo'ları getir
- `POST /api/todos` - Yeni todo oluştur

### Environment Variables
- `NEXT_PUBLIC_API_URL`: Backend API URL'i

## 🎯 TDD Süreci

Bu proje Test-Driven Development ile geliştirildi:
1. **Red:** Başarısız testler yaz
2. **Green:** Testi geçecek minimum kod yaz
3. **Refactor:** Kodu temizle ve optimize et

Tüm özellikler kapsamlı test coverage'a sahip. 