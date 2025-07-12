# Stage 1: Build frontend
FROM node:20 AS frontend-build

WORKDIR /app/front
COPY front/package*.json ./
RUN npm install
COPY front/ ./
RUN npm run build

# Stage 2: Build backend
FROM gradle:8.7-jdk21 AS backend-build

WORKDIR /app/back
COPY back/ ./
# Copy built frontend into Spring Boot static resources
COPY --from=frontend-build /app/front/dist ./src/main/resources/static
RUN gradle clean
RUN gradle build -x test

# Stage 3: Run the application
FROM eclipse-temurin:21-jre

WORKDIR /app
# Copy the built JAR from the backend build stage
COPY --from=backend-build /app/back/build/libs/*.jar app.jar

VOLUME /data
ENV SPRING_DATASOURCE_URL=jdbc:h2:file:/data/spring-boot-h2-db
ENV IMAGES_DATA_FOLDER=/data/images/
ENV DATA_FOLDER=/data/

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]