# Fleetify Absensi - Backend

Aplikasi backend absensi karyawan berbasis **Laravel 12** dengan database **MySQL**.  
Dikerjakan oleh **Izamul Fikri** untuk test masuk Fleetify.

---

## Fitur Utama

- **Manajemen Karyawan**
  - CRUD (Create, Read, Update, Delete)
- **Manajemen Departemen**
  - CRUD
- **Absensi Karyawan**
  - Check-in (absen masuk)
  - Check-out (absen keluar)
  - Log absensi:
    - filter by tanggal
    - filter by range tanggal
    - filter by bulan
    - filter by tahun
    - filter by departemen
- **Seeder Demo Data**
  - Data dummy karyawan & departemen
- **Pengujian API**
  - Script `test_api.bat` untuk test via `curl.exe`

---

## Persyaratan

- PHP >= 8.1
- Composer
- MySQL >= 8.0
- Node.js & npm (opsional untuk integrasi FE)
- Git (opsional)

---

## Setup Project

1. **Clone Repository**
   ```sh
   git clone <url-repo>
   cd folder
   ```

2. **Install Dependency**
   ```sh
   composer install
   ```

3. **Copy File Environment**
   ```sh
   cp .env.example .env
   ```

4. **Generate Key**
   ```sh
   php artisan key:generate
   ```

5. **Konfigurasi Database (MySQL)**
   Edit `.env`:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=absensi_fleetify
   DB_USERNAME=root
   DB_PASSWORD=yourpassword
   ```

6. **Migrasi & Seeder**
   ```sh
   php artisan migrate --seed
   ```

7. **Jalankan Server**
   ```sh
   php artisan serve
   ```
   Aplikasi berjalan di `http://127.0.0.1:8000`

---

## Database Dump

Untuk memudahkan setup, tersedia file SQL dump hasil migrasi & seeder:  
`/database/dumps/absensi_fleetify.sql`

Cara import ke MySQL:
```sh
mysql -u root -p absensi_fleetify < database/dumps/absensifleetifydb.sql
```

Atau buat manual:
```sql
CREATE DATABASE absensi_fleetify;
```
Lalu jalankan perintah import di atas.

---

## Uji Coba API

### Otomatis
1. Pastikan server jalan (`php artisan serve`)
2. Jalankan:
   ```sh
   test_api.bat
   ```

### Manual (contoh curl Windows PowerShell / CMD)
- **List Employees**
  ```powershell
  curl.exe -X GET "http://127.0.0.1:8000/api/employees" -H "Accept: application/json"
  ```
- **Check-in**
  ```powershell
  curl.exe -X POST "http://127.0.0.1:8000/api/attendance/check-in" `
    -H "Content-Type: application/json" -H "Accept: application/json" `
    -d "{ \"employee_id\": \"EMP-001\" }"
  ```

---

## Struktur API

### 🔹 Employees
- `GET /api/employees`
- `POST /api/employees`
- `GET /api/employees/{id}`
- `PUT /api/employees/{id}`
- `DELETE /api/employees/{id}`

### 🔹 Departements
- `GET /api/departements`
- `POST /api/departements`
- `GET /api/departements/{id}`
- `PUT /api/departements/{id}`
- `DELETE /api/departements/{id}`

### 🔹 Attendance
- `POST /api/attendance/check-in`
- `PUT /api/attendance/check-out`
- `GET /api/attendance/logs`
  - Parameter:
    - `date=YYYY-MM-DD`
    - `start_date=YYYY-MM-DD&end_date=YYYY-MM-DD`
    - `month=MM&year=YYYY`
    - `departement_id=ID`

---

## Seeder Demo

Seeder otomatis menambahkan:
- 2 departemen: Vehicle Engineering, Maintenance & Repair
- 4 karyawan dummy:
  - EMP-001 (Vehicle Engineering)
  - EMP-002 (Vehicle Engineering)
  - EMP-003 (Maintenance & Repair)
  - EMP-004 (Maintenance & Repair)

---


## 📝 Catatan

- Gunakan **MySQL >= 8.0** disarankan aja sih.
- Dokumentasi API detail dapat dilihat di `routes/api.php` dan setiap Controller.

---

© 2025 Izamul Fikri
