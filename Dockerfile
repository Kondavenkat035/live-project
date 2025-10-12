FROM python:3.11-slim
MAINTAINER Avnish <com.avnish@gmail.com>
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
COPY etawah/ /app/
RUN python manage.py collectstatic --noinput
EXPOSE 8000
CMD ["gunicorn", "etawah.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]