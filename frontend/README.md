# Bula

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.4.

# Installation
Use the dockerfile to build a docker image and start the frontend of the application on a docker container.

```bash
docker build -t frontend_bula .
docker run -p 80:80 frontend_bula
```

Once the container is running, all you need to do is open a web browser and go to 127.0.0.1 to access Bula.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
