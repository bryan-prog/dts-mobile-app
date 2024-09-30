Document Tracking System (DTS)
Overview
The Document Tracking System (DTS) is designed to streamline the process of tracking and managing documents within an organization. This system ensures that every document is accounted for, processed efficiently, and can be easily retrieved, enhancing operational efficiency and security.

Features
Document Creation & Management: Users can create, update, and manage documents with ease.
Track Document Progress: Monitor the status and movement of documents through different departments or stages.
QR Code Generation: Automatically generate QR codes for each document, facilitating easy identification and tracking.
User Role Management: Different levels of access for admins, users, and guests to ensure data security.
Search & Filter: Advanced search and filter capabilities for quickly finding specific documents.
Notification System: Get alerts when documents require attention or approval.
REST API Integration: Communicates seamlessly with the mobile app via a REST API built with Laravel Sanctum for secure authentication.
Technology Stack
Backend: Laravel (PHP 8) with Sanctum for authentication
Frontend: Mobile app developed using React Native with TypeScript
Database: MySQL
API: RESTful API for mobile communication
QR Code: Integrated QR code generation and scanning
SSL: Secured with ZeroSSL certificates
Installation
Prerequisites
PHP 8.x
MySQL
Composer
Node.js & npm
Expo CLI (for mobile development)
Backend Setup (Laravel)
Clone the repository.
bash
Copy code
git clone https://github.com/your-repo.git
Navigate to the backend directory.
bash
Copy code
cd dts-backend
Install dependencies.
bash
Copy code
composer install
Set up the environment file.
bash
Copy code
cp .env.example .env
Generate the application key.
bash
Copy code
php artisan key:generate
Set up the database in .env.
Run migrations.
bash
Copy code
php artisan migrate
Mobile App Setup (Expo React Native)
Navigate to the mobile app directory.
bash
Copy code
cd dts-mobile-app
Install dependencies.
bash
Copy code
npm install
Run the app using Expo CLI.
bash
Copy code
expo start
Usage
Log in to the system with your credentials.
Use the dashboard to manage, track, and process documents.
QR codes can be generated for each document, which can be scanned by the mobile app for fast tracking.
Users will receive notifications for pending tasks or document statuses.
API Documentation
Detailed API documentation can be found here.

License
This project is licensed under the MIT License.