# Front state
FROM node:17.2-alpine AS front-stage

WORKDIR /app
COPY frontend/ ./
RUN npm i
RUN ls
RUN npm run build

# Backend state
FROM python:3.10-alpine3.15
WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DEBUG 0

COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY ./backend/ .
COPY --from=front-stage /app/dist/ frontend/templates/frontend/

# RUN python manage.py collectstatic --noinput

RUN adduser -D runner
USER runner

CMD gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT
