SELECT 'CREATE DATABASE prospector_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'prospector_db')\gexec